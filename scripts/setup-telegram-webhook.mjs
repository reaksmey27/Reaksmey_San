import "dotenv/config";
import { webhookSecret } from "../server/telegram-language.js";

let failure =
  "Provide your HTTPS website URL: node scripts/setup-telegram-webhook.mjs https://smey-dev.site";

try {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const site = new URL(process.argv[2]);
  if (site.protocol !== "https:") throw new Error();
  failure = "TELEGRAM_BOT_TOKEN is missing from your local .env file.";
  if (!token) throw new Error();
  const webhookUrl = new URL("/api/telegram-webhook", site.origin).href;
  failure =
    "Cannot reach the live webhook. Check your connection and website URL.";
  const probe = await fetch(webhookUrl, {
    redirect: "error",
    signal: AbortSignal.timeout(10000),
  });
  if (probe.status !== 405) {
    failure =
      probe.status === 404
        ? "The live webhook returns 404. Commit and push the new api/telegram-webhook.js and server/telegram-language.js files, wait for the Vercel production deployment to finish, then run this command again."
        : `The live webhook returned HTTP ${probe.status}; expected 405 for this GET check. Check the Vercel deployment, redirects, and deployment protection.`;
    throw new Error();
  }
  failure =
    "Could not connect to Telegram. Check your connection and try again.";
  const response = await fetch(
    `https://api.telegram.org/bot${token}/setWebhook`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        secret_token: webhookSecret(token),
        allowed_updates: ["callback_query"],
      }),
      signal: AbortSignal.timeout(10000),
    },
  );
  const result = await response.json();
  if (!response.ok || !result.ok) {
    failure =
      response.status === 401 || response.status === 404
        ? "Telegram rejected the bot token. Update TELEGRAM_BOT_TOKEN in .env and Vercel with the same valid token, redeploy, and try again."
        : `Telegram could not register the webhook (HTTP ${response.status}). Check the public HTTPS domain and try again.`;
    throw new Error();
  }
  console.log("Telegram language buttons connected to " + site.origin);
} catch {
  // Never print raw fetch errors: their URLs may contain the bot token.
  console.error("Setup failed. " + failure);
  process.exitCode = 1;
}
