# Hybrid v4 Perf Thresholds

## Config
Source: `scripts/perf-thresholds.json`

```json
{
  "schemaVersion": "hybrid-perf-thresholds.v1",
  "softMs": { "p95": 1500, "max": 3000 },
  "catastrophicMs": { "p95": 5000, "max": 12000 }
}
```

## Verifier
Command:
```bash
npm run verify:perf
```

Output:
- `dist/perf-threshold-report.json`

## Semantics
- Soft threshold breach -> warning (non-fatal)
- Catastrophic threshold breach -> failure (fatal)

## CI
- CI `perf` job runs `verify:perf`.
- Nightly also runs `verify:perf` and publishes the threshold report artifact.
