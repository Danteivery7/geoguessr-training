# GeoMastery Trainer

GeoMastery Trainer is a standalone GeoGuessr-style geography clue trainer. It does not connect to GeoGuessr, Google accounts, Google Maps scraping, GeoHints, Plonk It, or any outside user account. Progress is stored locally in browser save-slot profiles, and starter trainer content is bundled directly into the static site.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## Deploy

### Vercel

1. Import the GitHub repository.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.

### Netlify

1. Connect the GitHub repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages

This app uses hash-style navigation and `base: "./"` in `vite.config.ts`, so the static `dist/` files can be hosted from GitHub Pages.

## Add New Questions

Starter content lives in `src/data/questions.ts`. Add a `Question` with:

- `id`
- `type`
- `disciplineId`
- `categoryId`
- `difficulty`
- `prompt`
- `answers`
- `correctAnswer`
- `explanation`
- `giveaway`
- `commonMistake`
- `relatedCountries`
- `tags`
- `points`

Image-based questions must include an `imageSource` object with source type, attribution, license, URL/API reference when applicable, country, and clue tags.

## Add Image Assets Legally

Use the Asset Manager in the app or add local files under `public/assets/training/`.

Allowed source patterns:

- User-uploaded or user-owned images.
- Local images you have permission to use.
- Wikimedia Commons or other openly licensed images with exact attribution and license.
- Optional Mapillary image IDs/API integration with visible attribution.
- Optional Google Street View Static API references, used only under Google Maps Platform terms.

Do not scrape Google Maps, GeoGuessr, GeoHints, Plonk It, Geomastr, or copyrighted image libraries.

## Export / Import Progress

Profiles work like local video game save files.

- Use the first-load profile screen to create, select, rename, delete, export, and import profiles.
- Use Asset Manager to export/import the active profile progress JSON.
- Uploaded image blobs are stored in browser IndexedDB. Asset metadata can be exported as JSON, but uploaded files should be reattached on another device.

## Project Structure

```text
src/
  components/         Reusable UI and training screens
  data/               Starter disciplines, lessons, questions, duels, roads, badges
  hooks/              Local storage, profiles, progress, quiz state
  utils/              Scoring, progress formulas, map distance, question generation
  types.ts            Public TypeScript model
```

## Content Note

Starter visual cards use local generated training visuals unless a source is explicitly verified. These are built into the app bundle so the trainer does not need live image APIs at startup. Uncertain real-world clue claims are treated as starter training material and should be verified before publishing with real images.

External image URLs are treated as source/attribution references, not as auto-loaded media. To display real media without network calls, place files in `public/assets/training/` and reference those local paths.

## Network Behavior

The app is static and client-only. It has no backend, scheduled jobs, live GeoGuessr connection, scraping, serverless functions, or background API polling.

The map trainer uses a local static coordinate surface and stored challenge coordinates. It makes no map tile requests, API requests, Netlify/Vercel function calls, or background refreshes.
