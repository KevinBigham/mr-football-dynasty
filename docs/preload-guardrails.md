# Preload Guardrails

## Purpose
Prevent accidental eager preload of heavy runtime chunks.

## Forbidden Tokens
Defined in `scripts/perf/forbidden-preload-tokens.json`.
Current defaults:
- `game-systems`
- `data-packs`

## Commands
- `npm run verify-preload`
  - Runs preload validation and writes `dist/preload-report.json`.
- `npm run build:verify-preload`
  - Fresh build + preload validation.

## CLI Overrides
- `--tokens path/to/tokens.json`
- `--tokens-list tokenA,tokenB`
- `--report dist/preload-report.json`

## Failure Conditions
Any eager `<link rel="modulepreload">` href containing forbidden token values.
