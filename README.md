# SMEY Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, and Motion.

## Scripts

- `npm run dev` starts the local development server on port `3000`
- `npm run build` creates the production build
- `npm run preview` serves the production build locally
- `npm run clean` removes the `dist` folder
- `npm run test:e2e` checks mobile/tablet/desktop layouts, project dialogs, CV downloads, and contact form behavior in Chromium
- `npm run images:optimize` regenerates WebP assets from the original PNGs using Sharp

## Project Structure

- `src/config` stores site-wide settings and profile metadata
- `src/content` stores translations
- `src/data` stores section content and reusable datasets
- `src/components` stores layout and shared UI components
- `src/pages` stores the top-level portfolio sections
- `src/hooks` stores reusable React hooks

## Run Locally

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env`
3. Add your EmailJS keys to the `.env` file
4. Start the app with `npm run dev`

## Contact Form Setup

The contact form submits email through EmailJS. Optional Telegram alerts use the included Vercel Function.

1. Create an EmailJS email service
2. Create an EmailJS template
3. Copy your `Service ID`, `Template ID`, and `Public Key`
4. Paste them into `.env` as:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Suggested EmailJS template variables for this form:

- `{{name}}`
- `{{email}}`
- `{{subject}}`
- `{{message}}`

If any EmailJS value is missing, the site will show a message telling visitors to email directly instead.

## Contact notification design

The replacement EmailJS notification is in `email-templates/contact.html`. Paste its HTML into the existing EmailJS template's code editor and save it. This repository file does not update the hosted EmailJS template automatically.

- Subject: `New portfolio inquiry: {{subject}}`
- From Name: `{{name}} via SMEY Portfolio`
- To Email: `reaksmeysan.official@gmail.com`
- From Email: enable the default email address of your connected service
- Reply-To: `{{reply_to}}`
- Cc and Bcc: leave empty
- Keep your existing Template ID, which is already configured in Vercel.

The design uses the form's `name`, `email`, `subject`, `time`, and `message` variables. The submission time uses UTC+07:00. The form also sends `title` as an alias of `subject` for EmailJS's pre-built Contact Us template. Double-brace variables escape submitted HTML. The message preserves line breaks, and the layout does not depend on a remote profile image.

## Telegram alerts on Vercel

After EmailJS accepts a message, the form calls `/api/telegram`. The Vercel Function sends the sender's name, email, subject, message, and server receipt time (UTC+07:00) to your fixed Telegram chat. Long messages are shortened to Telegram's 4096-character limit; the email contains the full message. Telegram failures do not change email success or ask visitors to resend. Alerts are best-effort, with no automatic retries or delivery guarantee.

1. Open the verified [BotFather](https://t.me/BotFather) in Telegram and use `/newbot`. Keep the bot token private.
2. Open your new bot and press **Start**, then send it a message.
3. Use Telegram's [getUpdates](https://core.telegram.org/bots/api#getupdates) endpoint with your bot token locally to find `result[].message.chat.id` for your own chat. The chat ID is a number, not your Telegram username. Do not share the token or commit it.
4. In **Vercel → Project → Settings → Environment Variables**, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to Production. Do not use a `VITE_` prefix. Keep your three existing EmailJS variables.
5. Deploy this code or redeploy after changing the environment variables. Submit a contact message on the deployed site to verify both email and Telegram delivery.

Vercel automatically deploys `api/telegram.js` as a [Node.js Function](https://vercel.com/docs/functions/runtimes/node-js); no separate server is needed. Plain `npm run dev` only runs Vite, so Telegram requires Vercel or `vercel dev` locally. Missing Telegram configuration disables alerts without disabling email.

The endpoint validates input, rejects cross-origin browser requests, uses plain text, and limits each IP to one attempt per minute within a function instance. This is a public endpoint: the origin check does not authenticate callers or prove EmailJS delivery, and the in-memory throttle is not shared across Vercel instances. Configure a Vercel Firewall rate limit for `/api/telegram` if you need distributed abuse protection. Delivery failures appear as a generic message in Vercel Function logs, without tokens or contact contents.

Run `node --test server-tests/telegram.test.mjs` for server checks. Browser tests mock both EmailJS and Telegram; no real notifications are sent.

## Running browser checks

Run `npx playwright install chromium` once if Chromium is not installed, then `npm run test:e2e`. Tests start local Vite servers on ports 5174 and 5175. EmailJS requests are intercepted: these checks never send real emails or use hosted credentials.

To verify delivery on the deployed site, submit a message there and confirm it reaches the configured inbox. Configure the EmailJS template's reply-to field to use `{{reply_to}}`. Hosted environment variables must be present when building the site.

Keep the original PNGs when replacing screenshots, then run `npm run images:optimize` to update the WebP files used by the app.
