# CAREINTAKEAI — Netlify package

Production-ready Next.js package for the CAREINTAKEAI website.

## Deploy with Netlify

1. Upload this project to a private GitHub repository.
2. In Netlify, choose **Add new project → Import an existing project → GitHub**.
3. Select the repository. Netlify will use `npm run build` automatically.
4. In **Site configuration → Environment variables**, add `AIRTABLE_LEAD_WEBHOOK` with the private Airtable automation webhook URL.
5. Deploy to the temporary `netlify.app` address and test Jotform Lea, the Calendly inline scheduler, and the booking flow before connecting the production domain.

The Jotform AI agent is installed globally and appears on every public page. The Calendly booking page uses Calendly's supported inline widget, with a direct booking link as a fallback.

## Recommended domain structure

- `careintakeai.com` — complete website
- `start.careintakeai.com` — existing lead-capture page

Move the existing lead page to the subdomain before assigning the primary domain to this project.

## Local verification

```bash
npm ci
npm test
```

Copy `.env.example` to `.env.local` only for local development. Never commit the real webhook URL.
