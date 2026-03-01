# Overnight Run Results — Playable Checkpoint v2

## Scope
- Stream: Hybrid Play Now (Claude-safe)
- Constraint: No gameplay behavior changes in `src/systems/*` and `src/data/*`
- Date: 2026-02-28

## Verification Commands Run
1. `npm test`
- Result: PASS
- Totals: 180 test files, 804 tests passing.

2. `npm run build`
- Result: PASS
- Build output: 181 modules transformed.

3. `npm run verify:playable`
- Result: PASS
- Includes `sync:legacy-assets`, `build`, `verify:playable-build`, `playable:smoke`.

4. `npm run verify:all`
- Result: PASS
- Includes `test + build + verify-preload + profile:dist + verify:playable`.

5. `npm run ci:local`
- Result: PASS
- Mirrors CI order and gates.

6. `npm run verify:lane -- --files ...`
- Result: PASS
- Strict lane `codex-playable` accepted all tested changed paths.

7. `npm run verify:playable-build`
- Result: PASS

8. `npm run playable:smoke`
- Result: PASS

## Build + Perf Snapshot
- `vite build` transformed: 181 modules
- `dist/index.html`: 741 bytes (gzip 471)
- `dist` assets: 7 JS/CSS assets
- modulepreloads in `dist/index.html`: 1 (`vendor`)

## Playable Gate Snapshot
- `dist/playable-build-report.json`:
  - `ok: true`
  - `missingFiles: []`
  - `badRefs: []`
- `dist/playable-smoke-report.json`:
  - `ok: true`
  - `checks: 8/8 passed`

## Generated Artifacts
- `dist/preload-report.json`
- `dist/perf-profile.json`
- `dist/playable-build-report.json`
- `dist/playable-smoke-report.json`
- `docs/overnight-summary.md`
- `docs/playable-100-slice-ledger.md`
- `docs/overnight-run-results.md`

## Notes
- Legacy gameplay assets are now copied to `public/legacy` by `sync:legacy-assets` and shipped to `dist/legacy` on build.
- Launcher routes users between `Play Now` and `Module Status` without touching gameplay systems/data modules.
