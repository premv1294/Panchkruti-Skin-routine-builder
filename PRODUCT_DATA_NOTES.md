# Product data notes
Date: 2026-09-19

## Precedence
1. Explicit user updates and subsequent clarifications.
2. Current formulation records confirmed by the user.
3. Supplied workbook facts, with mapping and ambiguities recorded.
4. Existing app copy is not automatically an approved usage instruction or claim.

User clarification: “Replit formulas are current” for Acne Defense Gel and sunscreen.

## Prices and sizes
SKU MASTER LIST.xlsx / Sheet2 / D2:E14 supplies sizes (header: Size (ml)) and MRP, not selling prices. Row-to-product aliases are retained in catalogue.json:
2 Acne Defense Face Wash; 3 Spotless Radiance Facewash; 4 Vitamin C Facewash; 5 Hydra Dew Facewash; 6 Vitamin C Face Serum; 7 Barrier Plus Face Serum; 8 Dark Spot Serum; 9 discontinued Acne Defense Serum; 10 Rose Toner; 11 Cera Dew Spray Moisturiser; 12 sunscreen; 13 Dark Spot Cream; 14 Acne Defense Gel.
These descriptive-name mappings are editorial mappings, not newly verified SKU identities. Review them against packaging before commerce integration.

User MRP overrides: Dark Spot Cream ₹499 (sheet ₹349), sunscreen ₹499 (sheet ₹599), Acne Defense Gel ₹499 (sheet ₹349).
All other MRP values use column E. Current selling prices remain null. Sizes retain the sheet’s ml unit; confirm whether cream/gel packs should instead be labelled in grams.

## Formulations
List of Products,Name, Ingredients.xlsx / Panchkruti / D:E:
- Row 2 Acne Defense Face Wash.
- Row 5 Spotless Radiance Facewash.
- Row 6 Dark Spot Cream.
- Row 7 Rose Toner.
- Row 8 Cera Dew Spray Moisturiser.
- Row 10 Hydra Dew Facewash.
Raw ingredient strings are preserved. Hero ingredient strings are source selections, not efficacy endorsements.

Dark Spot Serum uses the complete formulation explicitly supplied in the user brief. “AHAs 2%” is not expanded into individual acids. The masterlist’s Glycolic Acid product title is retained only as an alias, not as evidence for the current formulation.

Acne Defense Gel and sunscreen use the Replit formula entries, confirmed current by the user. Those records are partial lists: fullIngredients remains null.
- Current gel includes Salicylic Acid 0.5% and Succinic Acid 0.5%. Workbook row 4’s 0.2% Salicylic + 1% Mandelic formula is superseded.
- Current sunscreen record includes zinc oxide and named organic filters. Workbook row 9’s alternate sunscreen formula is superseded.
- Retained the current Replit sunscreen display name. The “Mineral” name in the brief/masterlist is not used to claim an exclusively mineral formula.

Acne Defense Serum remains a discontinued archival product. Its presence or stock value in older spreadsheets does not reactivate it.
Sarvopathy shampoo in the ingredient workbook is excluded from this Panchkruti skincare catalogue.

## Source ambiguities and withheld material
- Cera Dew raw INCI contains “4% 2% Basil Ext.”; no concentration correction has been guessed.
- Dark Spot Cream raw INCI has apparent typographical errors including “Bri) 58” and “Helianthue”; preserved pending final label.
- Hydra Dew contains “0,4% Ceramide Complex”; preserved as supplied.
- Full Vitamin C facewash/serum and Barrier Plus serum formulations are absent. Marketing descriptions do not substitute for INCI.
- Marketing claims (72 hours, fast results, flawless skin, microbiome, blue light, no white cast and sensitive-skin suitability) are not published as verified claims.
- Private cost, margin, stock, sales, ratings, strategic role and internal QC columns are not included in the public data bundle.
- Workbook internal QC notes for serum/cream require the owner’s product review; no medical conclusion is inferred.
- Ingredient type labels are editorial organisation. Function and usage considerations remain pending, without efficacy assertions.

## Routine and compatibility
The user-supplied AM/PM sequence is the only published routine template. No optional moisturiser was added to it. Time-of-day placement is not a daily frequency instruction.
Old application instructions such as “3 nights/week”, dosing and generic approved-pair claims were removed unless established by the user’s supplied sequence.
The compatibility rule array is intentionally empty until a reviewed source is supplied. Unknown does not mean safe or unsafe.

## Ingredient families — 2026-09-22
User-requested grouping: glycolic acid and lactic acid under AHA; salicylic acid under BHA. Family membership organises navigation only. Product formulation references remain unchanged, and an unspecified AHA entry is not assigned to an individual acid.

## Gift-box guide
Gift selection filters active catalogue products and uses existing usage records. The complete supplied routine remains a reference, with unselected steps marked. Co-occurrence in a source sequence is not treated as reviewed compatibility. No dosing or pairing rules were invented. Shared links contain product IDs only.
