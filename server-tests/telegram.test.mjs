import { test } from "node:test";
import assert from "node:assert/strict";
import handler from "../api/telegram.js";
import webhookHandler from "../api/telegram-webhook.js";
import { localizeAlert, webhookSecret } from "../server/telegram-language.js";

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
    assert.ok(calls[0].text.includes("From: Test\n"));
    assert.ok(calls[0].text.includes("(UTC+07:00)"));
    assert.ok(calls[0].text.includes("<b>Hello</b>"));
    assert.equal(calls[0].parse_mode, undefined);
    assert.equal(
      calls[0].reply_markup.inline_keyboard[0][0].callback_data,
      "language:en",
    );
    const khmer = localizeAlert(calls[0], "km");
    assert.ok(khmer.text.startsWith("📩 សារទំនាក់ទំនងថ្មី\n"));
    assert.ok(khmer.text.includes("<b>Hello</b>"));
    const english = localizeAlert(khmer, "en");
    assert.ok(english.text.startsWith("📩 New contact message\n"));
    assert.ok(english.text.includes("From: Test\n"));
    assert.equal(localizeAlert(english, "both").text, calls[0].text);
    assert.equal(calls[0].entities[0].type, "bold");
    assert.equal(
      calls[0].text.slice(0, calls[0].entities[0].length),
      "📩 សារទំនាក់ទំនងថ្មី | New contact message",
    );
    const emailEntity = calls[0].entities.find(
      (entity) => entity.type === "email",
    );
    assert.equal(
      calls[0].text.slice(
        emailEntity.offset,
        emailEntity.offset + emailEntity.length,
      ),
      "test@example.com",
    );
    const long = {
      name: "Test",
      email: "test@example.com",
      subject: "Hello",
      message: "😀".repeat(2500),
    };
    assert.equal((await request({ body: long })).code, 200);
    assert.ok(calls[1].text.length <= 4096);
    assert.ok(calls[1].text.includes("Full message is in your email.]"));
    for (const entity of calls[1].entities) {
      assert.ok(entity.offset + entity.length <= calls[1].text.length);
    }
    assert.equal(
      localizeAlert(localizeAlert(calls[1], "km"), "both").text,
      calls[1].text,
    );
    // Callback authentication and edits: never contact Telegram in tests.
    const methods = [];
    globalThis.fetch = async (url, options) => {
      methods.push({
        method: url.split("/").at(-1),
        payload: JSON.parse(options.body),
      });
      return { ok: true, json: async () => ({ ok: true }) };
    };
    const callback = {
      id: "test-callback",
      from: { id: 123 },
      data: "language:km",
      message: {
        ...calls[0],
        message_id: 42,
        chat: { id: 123 },
        from: { id: "test-token" },
      },
    };
    const webhookResponse = {
      code: 200,
      setHeader() {},
      status(code) {
        this.code = code;
        return this;
      },
      end() {
        return this;
      },
    };
    await webhookHandler(
      { method: "POST", headers: {}, body: { callback_query: callback } },
      webhookResponse,
    );
    assert.equal(webhookResponse.code, 403);
    assert.equal(methods.length, 0);
    const webhookRequest = {
      method: "POST",
      headers: {
        "x-telegram-bot-api-secret-token": webhookSecret("test-token"),
      },
      body: { callback_query: callback },
    };
    await webhookHandler(webhookRequest, webhookResponse);
    assert.equal(webhookResponse.code, 200);
    assert.deepEqual(
      methods.map((entry) => entry.method),
      ["answerCallbackQuery", "editMessageText"],
    );
    assert.equal(methods[1].payload.text, khmer.text);
    callback.from.id = 456;
    await webhookHandler(webhookRequest, webhookResponse);
    assert.equal(methods.length, 2);
    globalThis.fetch = async (url, options) => {
      calls.push(JSON.parse(options.body));
      return { ok: !fail, json: async () => ({ ok: !fail }) };
    };
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
