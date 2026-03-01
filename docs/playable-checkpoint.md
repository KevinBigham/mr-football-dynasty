# Playable Checkpoint Runbook

## Goal
Deliver a fast playable route (`Play Now`) while retaining the module validation dashboard (`Module Status`).

## Local Flow
1. `npm run sync:legacy-assets`
2. `npm run build`
3. `npm run verify:playable-build`
4. `npm run playable:smoke`

Or run one command:
- `npm run verify:playable`

## Pass Conditions
- `dist/legacy/index.html` + required legacy JS files exist.
- Legacy HTML references resolve to files present in `dist/legacy`.
- Bundle contains launcher mode labels and legacy route token.
- Status screen labels/semantics remain unchanged.

## Fail Conditions
- Missing legacy artifacts after build.
- Broken script/link refs in `dist/legacy/index.html`.
- Smoke checks missing launcher tokens.

## Artifacts
- `dist/playable-build-report.json`
- `dist/playable-smoke-report.json`
