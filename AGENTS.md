# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single Next.js 16 App Router app (`portfolio-app`) at the repo root. No monorepo, Docker Compose, or external database. All `/api/*` route handlers run in-process with the Next.js server.

### Services

| Service | Required? |
|---------|-----------|
| `npm run dev` (or `npm run build` + `npm run start`) | Yes — default http://localhost:3000 |
| PostgreSQL / Supabase / Redis / email / LLM APIs | No — mocked or stubbed in route handlers |

### Commands (from repo root)

See `package.json` and `README.md` for standard scripts:

- Install: `npm ci`
- Dev: `npm run dev`
- Lint: `npm run lint` (may report pre-existing ESLint issues; `npm run build` still succeeds)
- Typecheck: `npx tsc --noEmit` (also runs during `next build`)
- Build / prod: `npm run build`, `npm run start`
- Tests: none configured (no `test` script or test runner)

### API smoke checks

Use these payloads when verifying APIs locally:

- **Chat** (`POST /api/chat`): body must include `messages` array, e.g. `{"messages":[{"role":"user","content":"Tell me about ISDN logistics"}]}`
- **Contact** (`POST /api/contact`): `projectType` must be one of `Web Development`, `Mobile App`, `AI Integration`, `UI/UX Design` (see `src/lib/validations.ts`)

### Gotchas

- **CSP / images**: `src/middleware.ts` allows specific image hosts; `picsum.photos` (used on `/blog`) is not in `img-src`, so blog gallery images may fail under middleware while pages still load.
- **Next config warning**: build may log `turbopack.root should be absolute` — non-blocking.
- **Outbound network**: optional for full visuals (Unsplash, CDNs, etc.); core mocked APIs work offline.
