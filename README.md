# SMEY Portfolio

A personal portfolio built with React, Vite, Tailwind CSS, and Motion.

## Scripts

- `npm run dev` starts the local development server on port `3000`
- `npm run build` creates the production build
- `npm run preview` serves the production build locally
- `npm run clean` removes the `dist` folder

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
