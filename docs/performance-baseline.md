# Performance Baseline — Stability + Performance Sprint

## Scope
This baseline compares bundle/chunk output and HTML modulepreload behavior:
- **Pre-refactor (before async runtime validation extraction)**
- **Post-refactor (after async runtime validation extraction)**

All values below are from local `vite build` output.

## Pre-Refactor Snapshot

### Chunk Profile
- `dist/index.html`: `1.06 kB` (gzip `0.54 kB`)
- `dist/assets/game-utils-*.js`: `1.54 kB` (gzip `0.77 kB`)
- `dist/assets/game-config-*.js`: `18.68 kB` (gzip `6.32 kB`)
- `dist/assets/index-*.js`: `59.48 kB` (gzip `17.35 kB`)
- `dist/assets/data-packs-*.js`: `107.25 kB` (gzip `38.01 kB`)
- `dist/assets/vendor-*.js`: `142.82 kB` (gzip `45.75 kB`)
- `dist/assets/game-systems-*.js`: `229.08 kB` (gzip `82.44 kB`)

### HTML Modulepreload Links
`dist/index.html` included eager modulepreload links for:
- `vendor`
- `game-utils`
- `game-config`
- `game-systems`
- `data-packs`

## Post-Refactor Snapshot

### Chunk Profile
- `dist/index.html`: `0.74 kB` (gzip `0.47 kB`)
- `dist/assets/index-*.js`: `7.31 kB` (gzip `2.57 kB`)
- `dist/assets/module-validation-runtime-*.js`: `57.27 kB` (gzip `16.48 kB`)
- `dist/assets/game-utils-*.js`: `1.54 kB` (gzip `0.77 kB`)
- `dist/assets/game-config-*.js`: `18.14 kB` (gzip `5.99 kB`)
- `dist/assets/data-packs-*.js`: `113.08 kB` (gzip `40.28 kB`)
- `dist/assets/vendor-*.js`: `142.83 kB` (gzip `45.76 kB`)
- `dist/assets/game-systems-*.js`: `229.08 kB` (gzip `82.45 kB`)

### HTML Modulepreload Links
`dist/index.html` now eagerly preloads only:
- `vendor`

No eager preload remains for:
- `game-systems`
- `data-packs`

## Observed Effect
- Initial entry chunk dropped from `59.48 kB` to `7.31 kB`.
- Heavy runtime validation dependencies now sit behind async import in `module-validation-runtime`.
- Eager preload pressure on startup is reduced by removing `game-systems` and `data-packs` preloads.

## Next Targets (Non-Gating)
1. Route-level lazy loading for non-critical views.
2. Additional preload auditing for future chunk additions.
3. Optional CI perf budget checks once thresholds are agreed.

## Playable Checkpoint Snapshot (Post-Launcher)
- `dist/index.html`: `0.74 kB` (gzip `0.47 kB`)
- `dist/assets/index-*.js`: `19.18 kB` (gzip `6.09 kB`)
- `dist/assets/module-validation-runtime-*.js`: `58.89 kB` (gzip `17.62 kB`)
- `dist/assets/game-systems-*.js`: `229.10 kB` (gzip `82.45 kB`)
- `dist/assets/data-packs-*.js`: `113.11 kB` (gzip `40.30 kB`)
- modulepreload links: `1` (vendor only)
- playable gate reports:
  - `dist/playable-build-report.json` => `ok: true`
  - `dist/playable-smoke-report.json` => `ok: true` (8/8 checks)

## Verification Commands
- `npm run verify-preload`
  - Checks built `dist/index.html` and fails if eager modulepreload includes `game-systems` or `data-packs`.
- `npm run build:verify-preload`
  - Runs a fresh build and then executes preload verification.
- `npm run profile:dist`
  - Writes `dist/perf-profile.json` with current asset size/gzip profile and modulepreload list.
- `npm run build:profile`
  - Runs a fresh build, then emits `dist/perf-profile.json`.
- `npm run ci:local`
  - Mirrors CI gates locally: test, build, preload verification, dist profile generation.
- `npm run verify:all`
  - Canonical verification chain: test, build, preload guard, dist profile.

## CI Artifacts
- `performance-baseline`
  - Uploads this baseline markdown for quick PR/job reference.
- `dist-perf-profile`
  - Uploads `dist/perf-profile.json` (latest built asset/gzip and preload snapshot).
- `preload-report`
  - Uploads `dist/preload-report.json` with modulepreload links and violations.
- `overnight-summary`
  - Uploads `docs/overnight-summary.md` with human-readable CI perf summary.
