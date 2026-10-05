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
  const header = `New portfolio message\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nReceived: ${time} (UTC+07:00)\n\n`;
  const suffix = "\n\n[Message shortened. Full message is in your email.]";
  const text =
    header.length + data.message.length <= 4096
      ? header + data.message
      : header +
        data.message
          .slice(0, 4096 - header.length - suffix.length)
          .replace(/[\uD800-\uDBFF]$/, "") +
        suffix;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
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
