# Panchkruti source review
Date: 2026-09-19

## Original export
Source: panchkruti-skin-guide-source.zip, artifacts/panchkruti-skin-guide.
React, TypeScript, Vite, Tailwind v4, Wouter (installed but unused), Lucide and shadcn/Radix primitives. A single App.tsx handled section navigation, product modal, shelf selection and routine rendering. Content lived in products.ts, routineRules.ts and compatibility.ts. No backend, working commerce integration, authentication or analytics provider was found.

## Build defects
- package.json used catalog: and workspace:* entries without the parent workspace/catalog.
- tsconfig.json extended a missing ../../tsconfig.base.json and referenced a missing API client.
- Vite required PORT and BASE_PATH even for a build.
- No lockfile or application tests were included.
- Metadata contained Replit placeholders and viewport disabled zoom.

## Behaviour and content defects
- Owned-product filtering could stack multiple cleansers and unreviewed active treatments into one routine.
- Compatibility data claimed reviewed pairings despite no source/reviewer, and treated unknown pairings as instructions to separate.
- Product data omitted prices, sizes, provenance, discontinued lifecycle, commerce destinations and full-versus-partial ingredient distinction.
- No real route pages, ingredient library, six-question builder or routine persistence.
- Product modal lacked keyboard focus management. Replaced with directly linkable product pages.
- QR area was a decorative placeholder; clipboard copied only source=corporate.
- Existing guidance prescribed roughly three nights per week for serum without a verified source.
- Concern selection was embedded in the UI.

## Reuse
Retained React/TypeScript/Vite/Tailwind, Wouter routing capability, existing colour variables, Cambria/Georgia display family, Lato/Roboto text families, Lucide icons, error boundary and original UI component library. Rebuilt only the Skin Guide feature. No assets, authenticated APIs, checkout system or real logo were in the export; the supplied P monogram remains.

## Architecture implemented
src/data: catalogue JSON, ingredient JSON, concern definitions, questionnaire and reviewed routine template.
src/domain: recommendation engine and content schemas.
src/services: local routine storage, no-op analytics adapter, commerce URL adapter.
src/components/guide: shell, shared cards, ingredient chips, routine timeline and accordions.
src/pages: home, concerns, builder, routine, products, ingredients, compatibility.
src/seo.ts and scripts/prerender.tsx: per-route metadata and static HTML.
tests: source integrity, routine boundaries, storage failures and commerce/analytics safeguards.

## Milestones
1. Audit and content reconciliation.
2. Standalone build and content layer.
3. Routed guide, builder and local saved routines.
4. Product/ingredient/QR/compatibility modules.
5. Static SEO, automated tests and responsive browser QA.

The implementation request supplied with the files authorises improvements. Conflicting current formulas were explicitly clarified by the user: Replit formulas are current.

## Remaining limits
No verified selling prices or purchase links; no invented checkout. Other concern routines, ingredient efficacy text, introduction schedules and contraindications await review. Public deployment still requires a target host/domain. Static hosts must serve generated directories and return an appropriate 404 for unknown routes.
