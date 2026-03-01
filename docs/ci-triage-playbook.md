# CI Triage Playbook

## Fast Classification
1. `test` job failure
  - Run `npm test` locally with Node 20.
2. `build` job failure
  - Run `npm run build` and inspect bundling/import errors.
3. `perf` job failure
  - Run `npm run verify-preload` and `npm run profile:dist`.

## Local Triage Sequence
1. `npm ci`
2. `npm test`
3. `npm run build`
4. `npm run verify-preload`
5. `npm run profile:dist`
6. Optional compare: `npm run profile:compare -- --base dist/perf-profile-baseline.json --current dist/perf-profile.json`

## Nightly Workflow Ownership
- Owner: gameplay infra/quality maintainers.
- Workflow: `.github/workflows/nightly.yml`.
- Artifacts to inspect first:
  - `nightly-summary`
  - `nightly-preload-report`
  - `nightly-dist-perf-profile`

## Nightly Failure Triage Flow
1. Open `nightly-summary` artifact to classify failure domain quickly.
2. If preload issue, inspect `nightly-preload-report`.
3. If profile issue, inspect `nightly-dist-perf-profile`.
4. Reproduce locally using the Local Triage Sequence.

## Fail-Class Decision Tree
- Unit assertion mismatch: update test or implementation contract.
- Import/runtime boot failure: inspect `src/main.jsx` and `src/dev/runtime-loader.js`.
- Preload violation: inspect `dist/index.html` and forbidden token config.
- Profile schema/output mismatch: inspect `scripts/report-dist-profile.mjs`.
