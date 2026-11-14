# jack-portfolio

Personal site. A static Next.js export served by a Cloudflare Worker, which also
handles the contact form. No email address or phone
number appears anywhere on the public page.

## How it fits together

- **`src/`**: the Next.js app (`output: "export"`). `next build` writes plain
  files to `out/`.
- **`worker/index.ts`**: the Cloudflare Worker. It serves `out/` as static
  assets and only runs its own code for `/api/*`:
  - `POST /api/contact`: checks Turnstile, the rate limit and the input, then
    emails the message to `CONTACT_TO` with the visitor as reply-to.
- **`public/resume.pdf`**: the resume, served as a normal static file at
  `/resume.pdf`. It opens in the browser's PDF viewer and is kept out of search
  results (`public/_headers`). It's committed, so only use a copy without your
  phone number or other private details; old versions stay in git history.
- **`wrangler.jsonc`**: Worker config (assets, rate limiter).

Content lives in `src/data/projects.ts`, `src/data/experience.ts` and
`src/lib/site.ts`.

## Local development

```bash
npm install
cp .dev.vars.example .dev.vars  # Worker secrets for local runs
npm run dev                     # UI only, at http://localhost:3000 (no /api)
npm run preview                 # full site + Worker via wrangler dev
```

`npm run dev` and `npm run preview` use Cloudflare's always-pass Turnstile test
key (`.env.development`, and inline in the preview script). `.dev.vars.example`
has the matching test secret. To test sending for real, put a real Resend key in
`.dev.vars`.

Checks: `npm run lint` and `npm run typecheck`.

## Deploying

The site is served at **jacksonmoores.com** (and www), set in `wrangler.jsonc`.
Once set up, every push to `main` builds and deploys automatically through
Cloudflare Workers Builds. `npm run deploy` still works for deploying from your
machine.

### One-time setup

1. `npx wrangler login`
2. **Turnstile** (the spam check on the contact form): dashboard → Turnstile →
   Add widget, mode "Managed", hostnames `jacksonmoores.com` and
   `www.jacksonmoores.com`. Put the **site key** in `.env.production` (copy
   `.env.production.example`) and commit it; it's public. Keep the **secret
   key** for step 4.
3. **Resend:** add the domain `jacksonmoores.com` and let it add its DNS
   records to Cloudflare (they live on a `send.` subdomain). Create an API key
   with "Sending access" only.
4. Set the Worker's secrets. Each command prompts for the value; the first one
   offers to create the Worker, say yes.
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY   # Turnstile secret key
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put CONTACT_TO             # inbox that receives messages (stays private)
   npx wrangler secret put CONTACT_FROM           # e.g. Portfolio <hello@jacksonmoores.com>
   ```
5. **Free up the domain:** dashboard → jacksonmoores.com → DNS → Records.
   Delete the old Vercel records (the `A` record on `jacksonmoores.com` and the
   `CNAME` on `www`). Custom domains can't attach while they exist.
6. First deploy: `npm run deploy`. It checks the site key, resume and secrets,
   does a clean build, and attaches both hostnames.
7. **Connect GitHub:** dashboard → Workers & Pages → jack-portfolio → Settings →
   Builds → Connect. Repository `jcmcode/jack-portfolio`, branch `main`.
   - Build command: `npm run build:cf` (fails the build if the site key or
     resume is missing)
   - Deploy command: `npx wrangler deploy`
   - Turn off builds for non-production branches.
8. Optional: Rules → Redirect Rules → template "Redirect from WWW to root".

Secrets live on the Worker, not in GitHub, so Git deploys keep using them.

### Day to day

Edit, commit, push to `main`. To change the resume, replace
`public/resume.pdf` and push. It's cached for up to 5 minutes.
