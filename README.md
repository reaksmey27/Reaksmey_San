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

The contact form is wired to submit through EmailJS, so you do not need your own backend.

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

## Browser checks

Run `npx playwright install chromium` once if Chromium is not installed, then `npm run test:e2e`. Tests start local Vite servers on ports 5174 and 5175. EmailJS requests are intercepted: these checks never send real emails or use hosted credentials.

To verify delivery on the deployed site, submit a message there and confirm it reaches the configured inbox. Configure the EmailJS template's reply-to field to use `{{reply_to}}`. Hosted environment variables must be present when building the site.

Keep the original PNGs when replacing screenshots, then run `npm run images:optimize` to update the WebP files used by the app.
