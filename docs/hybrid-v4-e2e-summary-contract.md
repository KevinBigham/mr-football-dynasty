# Hybrid v4 E2E Summary Contract

## Artifacts
- `dist/e2e-launcher-report.json`
- `dist/e2e-launcher-summary.md`

## Report Schema (v1)
- `version`
- `generatedAt`
- `ok`
- `distDir`
- `baseUrl`
- `checks[]` with fields: `name`, `pass`, `detail`, `skipped`, `durationMs`
- `summary` with fields: `total`, `passed`, `failed`, `skipped`

## Summary Markdown
The markdown summary is table-based and deterministic:
- Header: `# Launcher E2E Summary`
- Table columns: `Check`, `Result`, `Detail`
- Result labels: `PASS`, `FAIL`, `SKIP`

## Skip Policy
Checks can be marked `SKIP` for optional browser flows when:
- base URL is not supplied
- Playwright is unavailable
- optional UI surfaces are not present (save slots panel)
