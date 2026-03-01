# Lane Failure Triage

## Purpose
Use this guide when `verify:lane` fails in strict split mode.

## Failure Classes
1. `forbidden`: changed path is in another lane's protected prefix.
2. `strictUnknown`: changed path is outside declared safe prefixes.
3. `sharedWindowViolations`: shared file was edited outside an approved conflict window.

## Triage Steps
1. Open `dist/lane-report.json`.
2. Confirm lane name (`codex-hybrid-v4` or `claude-gameplay-v4`).
3. Classify each failing file by type.
4. Move file to correct lane or defer edit.
5. Re-run `npm run verify:lane`.

## Shared-Window Procedure
1. Log the decision in `docs/hybrid-v4-380-slice-ledger.md`.
2. Re-run lane check with `--shared-window-profile <profile>` for approved windows.
3. Inspect `dist/shared-window-audit.json` and attach it to CI evidence.
4. Close window after merge.
