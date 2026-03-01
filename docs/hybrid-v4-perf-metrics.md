# Hybrid v4 Perf Metrics Contract

## Module
`src/app/perf-metrics.js`

## API
- `startPerfSpan(name, meta?) -> spanId`
- `endPerfSpan(spanId, meta?) -> { ok, reason, sample }`
- `collectPerfStats(samples) -> { p50, p95, max, count }`
- `getPerfSamples() -> sample[]`
- `clearPerfSamples()`

## Sample Shape
```json
{
  "id": "span_1",
  "name": "launcher_boot",
  "durationMs": 123,
  "startedAt": 0,
  "endedAt": 123,
  "meta": {
    "result": "ok"
  }
}
```

## Reporting
- `scripts/report-hybrid-metrics.mjs` writes `dist/hybrid-metrics.json`.
- `scripts/verify-perf-thresholds.mjs` evaluates the metrics report against thresholds.

## Notes
- Percentiles are deterministic nearest-rank values.
- Metrics are additive and non-gating by default until threshold checks classify failures.
