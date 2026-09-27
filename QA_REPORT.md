# QA report
Date: 2026-09-19

## Automated checks
- TypeScript strict type check: passed, including the retained UI component library.
- ESLint: passed for application, scripts and tests. Unmodified generated UI primitives and original hooks are excluded from lint.
- 12 domain regression tests: passed.
- Production Vite build and static prerender: passed; 44 route documents.
- Static audit: all 44 documents have one H1 and populated metadata; 40 distinct internal destinations resolve.
- Chrome headless: 27 responsive checks across 1440px, 768px and 375px, covering home, concerns, products, product detail, ingredient index/detail, routine, compatibility and builder. No horizontal overflow.
- Complete builder journey with sensitivity/prescription/beginner notices: passed.
- Save, direct revisit, reload and removal: passed.
- Product search empty state and filter reset: passed.
- Unknown compatibility and discontinued-product noindex: passed.
- Missing-route UI and HTTP 404 response: passed.
- Keyboard skip link is the first focusable control on home; activating it focuses main content.
- QR routine rendered and readable with JavaScript disabled: passed.
- No uncaught browser page errors during the production checks.
- Development server smoke test: passed, including client navigation and questionnaire continuation.

## Visual review
Desktop and mobile home screenshots and mobile QR page reviewed. Original palette and font families retained. AM and PM are distinct. The QR page exposes both sequences near the top. The layout uses semantic headings, labelled radio controls/selects, native details/summary, focus indicators, a skip link, reduced-motion support and zoom-enabled viewport.

## Environment issues resolved
The exported package relied on missing Replit workspace config. Standalone dependency versions and a lockfile now replace those references.
Native esbuild folder enumeration failed inside the Windows sandbox even after read access was granted. The Vite config runner and Node-based source/dependency resolution allow production builds, tests and the development server to run.
Vite preview did not serve the generated clean-URL directory pages as expected. The included static preview server serves those files and proper HTTP 404s.

## Limits
This is not a full assistive-technology audit or a measured Lighthouse/Core Web Vitals certification. Safari, Firefox and physical-device testing were not performed. External Google Fonts remain from the supplied design; local fallbacks are provided. Public-host deployment and Shopify/cart integration are not tested because no target host or verified commerce connection was supplied.
See MISSING_DATA.md for product content awaiting review. Missing product information is not silently filled in.

## Ingredient family update — 2026-09-22
- Type checking and lint passed. All 14 domain tests passed, including child-name search and preserving unspecified AHA references.
- AHA and BHA family navigation retains individual ingredient URLs and deduplicates product associations.
- Production build passed (45 static documents). Chrome checks passed at 1440px and 375px for family navigation, child search, unique product counts, grouped chips, preserved URLs and no page errors.

## Gift-box guide update — 2026-09-22
- Type checking, lint and all 17 domain tests passed.
- Production build generated 46 static documents. All have one H1 and populated metadata; 42 distinct internal destinations resolve.
- Chrome desktop (1440px) and mobile (375px): inline open, checkbox selection, disabled empty submit, usage cards, source sequence, selected-product pairing, clipboard link, editing/reset, search empty state and shared-link restoration passed.
- Invalid and discontinued IDs in shared links are ignored. Single-product and unreviewed-order states passed. No browser page errors or horizontal overflow.
- No new dermatological compatibility or dosing claims were introduced.
