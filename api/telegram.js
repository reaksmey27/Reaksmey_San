import { languageKeyboard } from "../server/telegram-language.js";

// Vercel Node.js function. These secrets must never use the VITE_ prefix.
const attempts = new Map();

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return res.status(204).end();

  // Block cross-site browser submissions; this is not authentication.
  try {
    if (new URL(req.headers.origin).host !== req.headers.host)
      throw new Error();
  } catch {
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (!req.headers["content-type"]?.startsWith("application/json")) {
    return res.status(415).json({ error: "JSON required" });
  }

  let data;
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const limits = { name: 160, email: 254, subject: 160, message: 5000 };
    data = Object.fromEntries(
      Object.entries(limits).map(([key, limit]) => {
        if (typeof body?.[key] !== "string") throw new Error();
        const value = body[key].trim();
        if (!value || value.length > limit) throw new Error();
        return [key, value];
      }),
    );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error();
  } catch {
    return res.status(400).json({ error: "Invalid contact details" });
  }

  // Best-effort per-instance throttle. Use Vercel Firewall for distributed limits.
  const now = Date.now();
  for (const [key, expiry] of attempts) if (expiry <= now) attempts.delete(key);
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  )
    .split(",")[0]
    .trim();
  if (attempts.has(ip) || attempts.size >= 10000) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "Please try later" });
  }
  attempts.set(ip, now + 60000);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
  // Explicit entities style only our labels; visitor text remains literal.
  let header = "";
  const entities = [];
  function append(value, type) {
    if (type)
      entities.push({ type, offset: header.length, length: value.length });
    header += value;
  }
  append("📩 សារទំនាក់ទំនងថ្មី | New contact message", "bold");
  append("\nSMEY Portfolio\n\n");
  append("ពី / From: ", "bold");
  append(data.name.replace(/[\r\n]+/g, " "));
  append("\nអ៊ីមែល / Email: ", "bold");
  append(data.email, "email");
  append("\n\nប្រធានបទ / Subject\n", "bold");
  append(data.subject.replace(/[\r\n]+/g, " "));
  append("\n\nសារ / Message\n", "bold");
  const footer = `\n\n🕒 ទទួលបាន / Received: ${time}\nម៉ោងកម្ពុជា / Cambodia (UTC+07:00)`;
  const suffix =
    "\n\n[សារត្រូវបានកាត់ខ្លី។ សូមអានសារពេញក្នុងអ៊ីមែល។]\n[Message shortened. Full message is in your email.]";
  const text =
    header.length + data.message.length + footer.length <= 4096
      ? header + data.message + footer
      : header +
        data.message
          .slice(0, 4096 - header.length - suffix.length - footer.length)
          .replace(/[\uD800-\uDBFF]$/, "") +
        suffix +
        footer;
  entities.push({
    type: "italic",
    offset: text.length - footer.length + 2,
    length: footer.length - 2,
  });

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          entities,
          reply_markup: languageKeyboard(),
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error();
    return res.status(200).json({ ok: true });
  } catch {
    // Do not log upstream errors: the request URL contains the bot token.
    console.error("Telegram contact notification failed");
    return res.status(502).json({ error: "Notification unavailable" });
  }
}
