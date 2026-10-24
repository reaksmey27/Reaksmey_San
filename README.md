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

## Firebase project admin

After sign-in, `/admin` opens a dashboard with a desktop sidebar and a mobile menu. **Overview** shows actual project counts, the five newest projects, category totals, and the most-used technologies. Select a latest-project row to edit it. **Projects** contains the existing searchable project collection and editor; **Appearance** controls the saved light/dark theme and shows your signed-in account. Sidebar shortcuts open a new project, visit the public portfolio, or sign out. Navigation away from an open editor asks before discarding unsaved changes.

Open `/admin` to add, edit, or delete projects. The editor supports English and Khmer text, category, project dates, image URL, technologies, project links, and a newest badge. Projects sort automatically by date, newest first, in both the admin and public portfolio. Blank Khmer fields use the English text. Images currently use hosted URLs; file uploads are not included.

Only the title, short English description, and a cover for new projects are required. When editing, a blank image URL keeps the current cover. Optional details, translations, and display settings are grouped in expandable sections. Blank badges use the category name, blank link labels use the link type, and links with empty URLs are skipped. These defaults work with the existing Firestore rules.

Use the **Technologies & tools** picker to search and select items with their icons, filter by technologies or tools, and remove selected chips. Unlisted names can be added with a generic code icon. Icons are shared between the editor, admin cards, and public project cards/details. Existing technology names and aliases (such as JS/JavaScript and Tailwind/Tailwind CSS) remain supported. No Firestore rules changes are needed.

Optional **Start date** and **End date** pickers generate the portfolio date label in English and Khmer. A start without an end displays “Present”; an end alone displays that date. End dates cannot precede start dates. Exact ISO dates are saved as `date.start` and `date.end` alongside the existing `date.en` and `date.km` labels, so the existing Firestore rules still apply. Old custom labels are preserved until dates are chosen. Clear both pickers to enter a custom date label again.

Sorting uses the end date, then the start date when no end is set. Older English labels such as `Jul 3 - 30 2026`, `Mar - Apr 2026`, and `Dec 2025` are recognized; month-only labels sort at the end of that month. Unrecognized or empty dates sort last. Equal dates use a stable project-ID tie-breaker. Adding or editing dates immediately updates the order; changing other fields does not change the project date. The old numeric `order` field is retained for compatibility with deployed Firestore rules but no longer controls sorting.

1. Create a Firebase project and register a web app in Project settings. Copy its `apiKey`, `authDomain`, `projectId`, and `appId` into the corresponding `VITE_FIREBASE_*` variables shown in `.env.example`. Add them to your hosting environment too, then restart Vite or rebuild the deployed site. Web config is public; never put service account credentials in a `VITE_` variable.
2. Enable **Authentication → Sign-in method → Email/Password**. Create your account in Authentication → Users and copy its UID. Add your website domain to Authentication → Settings → Authorized domains as needed.
3. Create a Cloud Firestore database (default database, production mode). Publish the contents of `firestore.rules` in its Rules tab. Alternatively, with Firebase CLI installed and signed in, run `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`.
4. In Firestore's Data tab, create the `admins` collection and a document whose ID is exactly your Authentication UID. Add a field such as `name` with your name. Document existence grants access. Only the Firebase console or trusted server tooling can grant this role; browser clients cannot create admin records. Delete the admin document to revoke access.
5. Visit `/admin` and sign in. Add a test project, check it on the public portfolio, edit it, then delete it. Also verify an account without an admin document cannot edit projects. Real Firebase sign-in and rules require this external setup and are not covered by the offline browser tests.

The public website listens to the `projects` collection. Existing bundled projects appear immediately and remain the baseline; editing one saves an override using its existing ID. Deletion writes a `{ deleted: true }` marker so bundled projects do not reappear. Do not manually remove deletion markers unless you want to restore the original project. New projects use generated IDs. All project documents are publicly readable, including deletion markers; do not store private content in this collection. On connection failure, the public page keeps its last loaded data (or bundled projects on initial load); the admin displays an error and blocks editing until reload.

Bundled project images stay tied to the current build when their Image URL field is blank. Use an externally hosted image URL for new projects or replacement images. Vercel rewrites for `/admin` are included; on other hosts, configure `/admin` to serve `index.html`.

Reference: [Firebase password authentication](https://firebase.google.com/docs/auth/web/password-auth) and [Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started).

## Automatic Khmer translation

In the project editor, expand **Khmer translations** and click **Auto-translate to Khmer**. It sends only English fields with blank Khmer translations to Gemini. Review the generated text before clicking Save; translation does not save or publish the project. Existing Khmer text is never overwritten. To retranslate a field, clear its Khmer text first. Blank optional English fields are skipped.

Set `GEMINI_API_KEY` in the server environment, without a `VITE_` prefix. The optional `GEMINI_TRANSLATION_MODEL` defaults to `gemini-2.5-flash`. Keep the four existing Firebase web config variables available as well. For local development, use `.env` and restart `npm run dev`; Vite serves the local translation endpoint. For Vercel, add the server key in the project's Environment Variables and redeploy. Static hosting alone cannot run this feature; it needs the included `/api/translate-project` server function. Never commit the API key or put it in browser code.

The endpoint validates Firebase sign-in and checks `admins/{UID}` with the existing Firestore rules before calling Gemini. It limits input to 12,000 characters per request, applies a best-effort 15-second per-user throttle per server instance, and returns quota/configuration errors without changing your text. Gemini usage and free-tier availability depend on the selected model and account; see [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing). No Firestore rules update is needed.

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

## Telegram language buttons

New alerts include **English**, **ខ្មែរ**, and **EN / ខ្មែរ** buttons. These change the labels of that alert; submitted messages are not translated, and the default for new alerts stays bilingual. Old alerts do not gain buttons automatically.

After deploying, connect the button webhook once from your project folder:

```sh
node scripts/setup-telegram-webhook.mjs https://smey-dev.site
```

The script reads `TELEGRAM_BOT_TOKEN` privately from `.env`; it must match Vercel. It registers `/api/telegram-webhook` with a derived secret so only authenticated Telegram callbacks can edit alerts in your configured private chat. No extra environment variable is required. Re-run after changing the bot token or domain. Telegram must be able to access the deployment without Vercel login protection. This replaces any existing webhook for this bot; `getUpdates` cannot be used while the webhook is active. See the [Telegram webhook API](https://core.telegram.org/bots/api#setwebhook).

Send a new contact message after deploying, then tap each button to verify. Local automated tests mock these calls and do not register a webhook or send messages.

## Running browser checks

Run `npx playwright install chromium` once if Chromium is not installed, then `npm run test:e2e`. Tests start local Vite servers on ports 5174 and 5175. EmailJS requests are intercepted: these checks never send real emails or use hosted credentials.

To verify delivery on the deployed site, submit a message there and confirm it reaches the configured inbox. Configure the EmailJS template's reply-to field to use `{{reply_to}}`. Hosted environment variables must be present when building the site.

Keep the original PNGs when replacing screenshots, then run `npm run images:optimize` to update the WebP files used by the app.
