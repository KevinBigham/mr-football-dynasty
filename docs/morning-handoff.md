# Morning Handoff — Playable Checkpoint Fast (Claude-Safe)

## Outcome
- `npm test`: PASS (180 files / 804 tests)
- `npm run verify:playable`: PASS
- `npm run verify:all`: PASS
- `npm run ci:local`: PASS
- `npm run verify:lane`: PASS (strict lane `codex-playable`)

## Release Decision
- Status: **GREEN**
- Blockers: none in implementation artifacts.

## What Changed
- New launcher architecture under `src/app/**`:
  - `Play Now` iframe route to legacy runtime (`/legacy/index.html`)
  - `Module Status` route preserving async runtime validation dashboard semantics
- Entry refactor:
  - `src/main.jsx` now mounts `LauncherShell`
- New playable build/smoke scripts:
  - `sync:legacy-assets`, `verify:playable-build`, `playable:smoke`, `verify:playable`
- CI/Nightly updates:
  - Added playable verification and artifact uploads
- Docs + ledger:
  - Playable runbook, smoke contract, QA checklist, rollback, lane ownership, artifact index

## Artifact Index
- `dist/preload-report.json`
- `dist/perf-profile.json`
- `dist/playable-build-report.json`
- `dist/playable-smoke-report.json`
- `docs/overnight-summary.md`
- `docs/overnight-run-results.md`
- `docs/playable-100-slice-ledger.md`
- `docs/playable-change-index.md`

## Exact File Change Index (this stream)
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
- `scripts/sync-legacy-assets.mjs`
- `scripts/check-playable-build.mjs`
- `scripts/smoke-play-now.mjs`
- `scripts/verify-no-gameplay-delta.mjs`
- `scripts/allowlists/overnight-safe-paths.json`
- `scripts/ci/write-job-summary.mjs`
- `.github/workflows/ci.yml`
- `.github/workflows/nightly.yml`
- `package.json`
- `docs/playable-100-slice-ledger.md`
- `docs/playable-checkpoint.md`
- `docs/playable-smoke-contract.md`
- `docs/playable-qa-checklist.md`
- `docs/playable-known-issues.md`
- `docs/playable-rollback-plan.md`
- `docs/collab-lane-ownership.md`
- `docs/playable-release-template.md`
- `docs/playable-artifact-index.md`
- `docs/index.md`
- `docs/codex-claude-collab-protocol.md`
- `docs/morning-handoff-template.md`
- `docs/overnight-run-results.md`
- `docs/morning-handoff.md`
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

## Recommended Next Moves
1. Run a quick manual `Play Now` QA pass using `docs/playable-qa-checklist.md`.
2. Open a PR scoped to launcher/playable infrastructure only.
3. Keep Claude extraction stream isolated to `src/systems/**` and `src/data/**` while this merges.
