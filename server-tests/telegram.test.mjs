import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/telegram.js";

test("Telegram endpoint validates, limits and safely delivers notifications", async () => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;
  const originalChat = process.env.TELEGRAM_CHAT_ID;
  let calls = [];
  let fail = false;
  globalThis.fetch = async (url, options) => {
    calls.push(JSON.parse(options.body));
    return {
      ok: !fail,
      json: async () => ({ ok: !fail, description: "secret error" }),
    };
  };
  let ip = 0;
  async function request(overrides = {}) {
    const res = {
      code: 200,
      headers: {},
      body: null,
      setHeader(key, value) {
        this.headers[key] = value;
      },
      status(code) {
        this.code = code;
        return this;
      },
      json(body) {
        this.body = body;
        return this;
      },
      end() {
        return this;
      },
    };
    await handler(
      {
        method: "POST",
        headers: {
          origin: "https://portfolio.example",
          host: "portfolio.example",
          "content-type": "application/json",
          "x-forwarded-for": String(++ip),
        },
        body: {
          name: " Test ",
          email: "test@example.com",
          subject: "Hello",
          message: "<b>Hello</b>",
        },
        ...overrides,
      },
      res,
    );
    return res;
  }
  try {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123";
    assert.equal((await request({ method: "GET" })).code, 405);
    assert.equal(
      (
        await request({
          headers: {
            origin: "https://other.example",
            host: "portfolio.example",
          },
        })
      ).code,
      403,
    );
    assert.equal((await request({ body: "invalid json" })).code, 400);
    assert.equal((await request({ body: { name: "" } })).code, 400);
    assert.equal(calls.length, 0);
    assert.equal((await request()).code, 200);
    assert.equal(calls[0].chat_id, "123");
    assert.ok(calls[0].text.includes("Name: Test\n"));
    assert.ok(calls[0].text.includes("(UTC+07:00)"));
    assert.ok(calls[0].text.includes("<b>Hello</b>"));
    assert.equal(calls[0].parse_mode, undefined);
    const long = {
      name: "Test",
      email: "test@example.com",
      subject: "Hello",
      message: "😀".repeat(2500),
    };
    assert.equal((await request({ body: long })).code, 200);
    assert.ok(calls[1].text.length <= 4096);
    assert.ok(calls[1].text.endsWith("Full message is in your email.]"));
    const headers = {
      origin: "https://portfolio.example",
      host: "portfolio.example",
      "content-type": "application/json",
      "x-forwarded-for": "repeat",
    };
    assert.equal((await request({ headers })).code, 200);
    assert.equal((await request({ headers })).code, 429);
    fail = true;
    const failed = await request();
    assert.equal(failed.code, 502);
    assert.equal(JSON.stringify(failed.body).includes("secret"), false);
    delete process.env.TELEGRAM_BOT_TOKEN;
    assert.equal((await request()).code, 204);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = originalToken;
    if (originalChat === undefined) delete process.env.TELEGRAM_CHAT_ID;
    else process.env.TELEGRAM_CHAT_ID = originalChat;
  }
});
