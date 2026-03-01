# Playable Change Index (Grouped)

## App / Launcher
- `src/main.jsx`
- `src/app/boot-mode.js`
- `src/app/launcher-copy.js`
- `src/app/legacy-manifest.js`
- `src/app/legacy-url.js`
- `src/app/playability-check.js`
- `src/app/diagnostics.js`
- `src/app/status-screen.jsx`
- `src/app/play-screen.jsx`
- `src/app/launcher-shell.jsx`

## Build / Verification Scripts
- `scripts/sync-legacy-assets.mjs`
- `scripts/check-playable-build.mjs`
- `scripts/smoke-play-now.mjs`
- `scripts/verify-no-gameplay-delta.mjs`
- `scripts/allowlists/overnight-safe-paths.json`
- `scripts/ci/write-job-summary.mjs`

## CI Workflows
- `.github/workflows/ci.yml`
- `.github/workflows/nightly.yml`

## Package Wiring
- `package.json`

## Documentation
- `docs/playable-100-slice-ledger.md`
- `docs/playable-checkpoint.md`
- `docs/playable-smoke-contract.md`
- `docs/playable-qa-checklist.md`
- `docs/playable-known-issues.md`
- `docs/playable-rollback-plan.md`
- `docs/collab-lane-ownership.md`
- `docs/playable-release-template.md`
- `docs/playable-artifact-index.md`
- `docs/playable-change-index.md`
- `docs/index.md`
- `docs/codex-claude-collab-protocol.md`
- `docs/morning-handoff-template.md`
- `docs/performance-baseline.md`
- `docs/overnight-run-results.md`
- `docs/morning-handoff.md`
- `docs/overnight-summary.md`

## Tests
- `tests/boot-mode.test.js`
- `tests/legacy-manifest.test.js`
- `tests/legacy-manifest-contract.test.js`
- `tests/legacy-url.test.js`
- `tests/playability-check.test.js`
- `tests/launcher-copy.test.js`
- `tests/diagnostics.test.js`
- `tests/launcher-integration.test.jsx`
- `tests/play-screen-integration.test.jsx`
- `tests/status-screen-regression.test.jsx`
- `tests/sync-legacy-assets.test.js`
- `tests/playable-build-script.test.js`
- `tests/playable-smoke-script.test.js`
- `tests/ci-summary.test.js`
- `tests/main-entrypoint.test.js`
- `tests/verify-no-gameplay-delta.test.js`
