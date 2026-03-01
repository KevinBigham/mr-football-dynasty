# Playable Smoke Contract

## Script
- Entry: `scripts/smoke-play-now.mjs`
- API: `runPlayableSmoke(distDir)`
- API: `runPlayableSmokeWithReport(distDir, reportPath)`

## Output Shape
```json
{
  "ok": true,
  "checks": [
    { "name": "...", "pass": true, "detail": "..." }
  ],
  "distDir": "..."
}
```

## Required Checks
- `dist/index.html` exists.
- `dist/legacy/index.html` exists.
- `dist/legacy/game.js` exists.
- `dist/legacy/react.min.js` exists.
- `dist/legacy/react-dom.min.js` exists.
- built JS bundle contains `Play Now`.
- built JS bundle contains `Module Status`.
- built JS bundle contains `legacy/index.html`.

## Failure Behavior
- CLI exits non-zero if any check fails.
- JSON report written to `dist/playable-smoke-report.json`.
