# Playability Report Schema v1

## File
- `dist/playability-report.json`

## Top-Level Fields
- `schemaVersion`
- `generatedAt`
- `overallOk`
- `sections` (`launcher`, `save`, `bridge`, `build`, `smoke`)
- `metrics` (`sampleCount`, `p50Ms`, `p95Ms`, `samples`)
- `summary` (`sectionCount`, `totalChecks`, `failedChecks`, `failedSections`)
- `artifacts`
