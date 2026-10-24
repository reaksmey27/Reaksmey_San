import test from "node:test";
import assert from "node:assert/strict";
import { createTranslationHandler } from "../server/translate-project.js";

const env = {
  GEMINI_API_KEY: "server-secret",
  VITE_FIREBASE_API_KEY: "public-key",
  VITE_FIREBASE_PROJECT_ID: "test-project",
};
const response = (status, data) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => data,
});
const success = {
  candidates: [
    {
      finishReason: "STOP",
      content: {
        parts: [{ text: JSON.stringify({ description: "គម្រោងថ្មី" }) }],
      },
    },
  ],
};
function setup(
  replies = [
    response(200, { users: [{ localId: "admin-uid" }] }),
    response(200, {}),
    response(200, success),
  ],
  options = {},
) {
  const calls = [];
  const handler = createTranslationHandler({
    env,
    now: () => 100,
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      const next = replies.shift();
      if (!next) throw new Error("Unexpected request");
      return next;
    },
    ...options,
  });
  async function request(overrides = {}) {
    const res = {
      code: 200,
      headers: {},
      setHeader(key, value) {
        this.headers[key] = value;
      },
      status(code) {
        this.code = code;
        return this;
      },
      json(data) {
        this.body = data;
        return this;
      },
    };
    await handler(
      {
        method: "POST",
        headers: {
          origin: "https://portfolio.example",
          host: "portfolio.example",
          authorization: "Bearer user-token",
          "content-type": "application/json",
        },
        body: { fields: { description: "New project" } },
        ...overrides,
      },
      res,
    );
    return res;
  }
  return { request, calls };
}

test("translation denies unauthenticated, cross-origin and invalid requests before provider use", async () => {
  const { request, calls } = setup();
  assert.equal((await request({ method: "GET" })).code, 405);
  assert.equal(
    (
      await request({
        headers: {
          origin: "https://portfolio.example",
          host: "portfolio.example",
        },
      })
    ).code,
    401,
  );
  assert.equal(
    (
      await request({
        headers: {
          origin: "https://attacker.example",
          host: "portfolio.example",
        },
      })
    ).code,
    403,
  );
  assert.equal(
    (await request({ body: { fields: { title: "Not a supported field" } } }))
      .code,
    400,
  );
  assert.equal(
    (await request({ body: { fields: { description: "" } } })).code,
    400,
  );
  assert.equal(
    (
      await request({
        body: {
          fields: {
            description: "a".repeat(9000),
            longDescription: "b".repeat(9000),
          },
        },
      })
    ).code,
    400,
  );
  assert.equal(calls.length, 0);
});

test("invalid users and users without admin role cannot call Gemini", async () => {
  const invalid = setup([response(400, {})]);
  assert.equal((await invalid.request()).code, 401);
  assert.equal(invalid.calls.length, 1);
  const denied = setup([
    response(200, { users: [{ localId: "normal-user" }] }),
    response(404, {}),
  ]);
  assert.equal((await denied.request()).code, 403);
  assert.equal(denied.calls.length, 2);
});

test("admin translation uses private server key, validates structured output, and throttles repeat requests", async () => {
  const { request, calls } = setup([
    response(200, { users: [{ localId: "admin-uid" }] }),
    response(200, {}),
    response(200, success),
    response(200, { users: [{ localId: "admin-uid" }] }),
    response(200, {}),
  ]);
  const result = await request();
  assert.equal(result.code, 200);
  assert.deepEqual(result.body, {
    translations: { description: "គម្រោងថ្មី" },
  });
  assert.equal(result.headers["Cache-Control"], "no-store");
  assert.match(calls[1].url, /documents\/admins\/admin-uid$/);
  assert.equal(calls[1].init.headers.Authorization, "Bearer user-token");
  assert.equal(calls[2].init.headers["x-goog-api-key"], "server-secret");
  assert.equal(JSON.stringify(result.body).includes("server-secret"), false);
  assert.equal((await request()).code, 429);
  assert.equal(calls.length, 5);
});

test("quota, missing config, and malformed provider responses fail without partial text", async () => {
  const missing = setup([], { env: {} });
  assert.equal((await missing.request()).code, 503);
  for (const [providerResponse, expected] of [
    [response(429, {}), 429],
    [response(403, { error: "server-secret" }), 502],
    [response(200, { candidates: [{ finishReason: "MAX_TOKENS" }] }), 502],
    [
      response(200, {
        candidates: [
          { finishReason: "STOP", content: { parts: [{ text: "{}" }] } },
        ],
      }),
      502,
    ],
  ]) {
    const { request } = setup([
      response(200, { users: [{ localId: "admin" }] }),
      response(200, {}),
      providerResponse,
    ]);
    const result = await request();
    assert.equal(result.code, expected);
    assert.equal(result.body.translations, undefined);
    assert.equal(JSON.stringify(result.body).includes("server-secret"), false);
  }
});
