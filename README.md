# Panchkruti Skin Guide

An improved version of the supplied Replit app. React + TypeScript + Vite + Tailwind; Wouter routes. No backend or account is required.

## Run
Use Node 22.18+ (Node 24 tested) and pnpm.
1. pnpm install --frozen-lockfile
2. pnpm dev
3. Open http://127.0.0.1:5173

Checks:
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
- pnpm serve (production preview at http://127.0.0.1:4173)

The build writes dist/public, including pre-rendered route HTML. The esbuild tool runner compiles test/prerender TypeScript using Node-based source resolution. The Vite dependency resolver also supports restricted Windows environments.

## Deploy
Upload dist/public to a static host that serves directory index.html files. A Netlify-compatible 404 fallback is included. The local preview server serves generated route documents and responds with HTTP 404 for unknown paths. Configure the chosen host the same way. Replit can run pnpm dev --host 0.0.0.0 for development or serve dist/public as a static production build. The supplied artifact metadata has been updated for this standalone folder; host-specific import settings still need verification. Do not use the development server for production.

BASE_PATH defaults to /. Set it at build time if serving under a subdirectory; router links and assets use this prefix. PORT defaults to 5173 for development. Do not add a final domain or canonical links until the deployment URL is known.

## Key routes
/guide, /concerns, /concerns/:slug, /routine-builder, /routine-results, /routine/pigmentation, /my-routine, /products, /product/:slug, /ingredients, /ingredients/:slug, /compatibility.

## Edit content
- src/data/catalogue.json: product content and provenance.
- src/data/ingredients.json: ingredient references.
- src/data/concerns.ts: available concerns.
- src/data/questionnaire.ts: questionnaire configuration.
- src/data/routineRules.ts: routine templates, disclosure rules and content version.
- src/data/compatibility.ts: reviewed pair rules (currently empty).
- src/domain: schemas and recommendation engine.
- src/services: storage, analytics and commerce adapters.

Keep full ingredients separate from partial lists. Unknown facts remain null. Increment CONTENT_VERSION when published guidance changes so saved routines are rebuilt. Add reviewed compatibility records only with a source and review date. Adding a concern or product uses the data layer; no new page component is required.

Analytics defaults to a no-op and sends nothing. configureAnalytics accepts a provider adapter if later authorised. Stored routines contain questionnaire answers in localStorage only after an explicit Save action. No raw answers are included in analytics payloads. Buyers are not redirected anywhere until verified HTTPS ecommerce URLs are supplied.

## Review before commercial launch
Read MISSING_DATA.md, PRODUCT_DATA_NOTES.md and REPOSITORY_AUDIT.md. This release provides functional guidance modules while deliberately withholding unsupported usage directions, claims and purchase links. No live site has been published.

## Gift-box guide
The gift selector is embedded on /guide and /concerns. /gift-guide provides a direct entry for packaging or a QR destination. Users can select active products, read available usage data, view the supplied routine as a reference and check a pair of selected products. Copy my guide link includes only validated product IDs; it can be revisited to restore a selection. Selecting products never creates a new routine or asserts compatibility. Unknown instructions and pairings remain explicitly unconfirmed.
