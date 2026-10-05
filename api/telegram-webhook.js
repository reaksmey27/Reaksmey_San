import { timingSafeEqual } from "node:crypto";
import { localizeAlert, webhookSecret } from "../server/telegram-language.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).end();
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return res.status(503).end();
  const supplied = Buffer.from(
    String(req.headers["x-telegram-bot-api-secret-token"] || ""),
  );
  const expected = Buffer.from(webhookSecret(token));
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    return res.status(403).end();
  let update;
  try {
    update = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).end();
  }
  const query = update?.callback_query;
  if (!query) return res.status(200).end();
  // This portfolio bot is for the owner's private chat only.
  if (
    String(query.from?.id) !== chatId ||
    String(query.message?.chat?.id) !== chatId
  )
    return res.status(200).end();
  const language = /^language:(en|km|both)$/.exec(query.data || "")?.[1];
  if (!language || query.message?.from?.id?.toString() !== token.split(":")[0])
    return res.status(200).end();

  async function call(method, payload) {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/${method}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      },
    );
    const result = await response.json();
    if (
      !result.ok &&
      !(
        method === "editMessageText" &&
        result.description?.includes("message is not modified")
      )
    )
      throw new Error("Telegram request failed");
  }
  try {
    await call("answerCallbackQuery", { callback_query_id: query.id });
    const content = localizeAlert(query.message, language);
    if (content.text !== query.message.text) {
      await call("editMessageText", {
        chat_id: chatId,
        message_id: query.message.message_id,
        ...content,
      });
    }
    return res.status(200).end();
  } catch {
    console.error("Telegram language switch failed");
    return res.status(502).end();
  }
}
