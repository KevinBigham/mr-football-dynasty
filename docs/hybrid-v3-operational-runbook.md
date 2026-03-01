# Hybrid v3 Operational Runbook

## Preflight
1. `npm run verify:lane`
2. `npm test`
3. `npm run verify:hybrid`

## Release Candidate
1. `npm run ci:release-candidate`
2. Collect artifacts from `dist/`.
3. Publish summary in `docs/release-candidate-summary.md`.
4. Legacy session smoke in `verify:hybrid` uses one retry policy (`scripts/ci/retry-once.mjs`).

## Failure Recovery
1. Review `dist/playability-report.json` summary.
2. Route failures by lane ownership.
3. Re-run targeted gate then full `verify:hybrid`.
