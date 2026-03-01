# Hybrid v4 Contract Gate

## Command
```bash
npm run verify:contracts
```

## Script
- `scripts/verify-contracts.mjs`

## Modes
- `optional`: passes with `skipped=true` when no fixtures are present.
- `strict`: fails when fixtures are absent.
- `tolerant`: allows declared fixture quirks (for explicitly documented temporary drift).

## Input
- Fixtures dir: `tests/fixtures/contracts`
- Actual map: `dist/contracts-actual.json`

## Output
- `dist/contracts-report.json`
- `dist/contracts-report.md`

## Fixture Mapping
Reports include `fixtureModuleMap` to map fixture ids to gate domains:
- `sim-output`
- `draft-thresholds`
- `trade-thresholds`
- `chemistry`
- `rivalry`
- `unmapped`

## Drift Types
- `missing`
- `changed-shape`
- `changed-threshold`

## Quirk Policy
- Quirks must be declared in fixture JSON under `quirk`.
- Tolerant mode only applies declared quirks.
- Strict mode ignores quirk tolerance and treats drift as blocking.

## Ownership
- Codex maintains gate infrastructure and report formatting.
- Claude owns gameplay fixture production and update cadence.
