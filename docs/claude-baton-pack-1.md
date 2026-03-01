# Claude Baton Pack 1 (Hybrid v4)

## Purpose
Provide a ready contract fixture package for Claude’s gameplay lane to publish fixture v1 without cross-lane overlap.

## Required Fixture Files
Place fixtures under `tests/fixtures/contracts/` (not `templates/`):

1. `sim-output.shape.json`
2. `draft-thresholds.json`
3. `trade-thresholds.json`
4. `chemistry.shape.json`
5. `rivalry.shape.json`

## Required Fixture IDs
Each file must contain exactly one fixture object with the listed `id`.

1. `sim.output.contract.v1`
2. `draft.thresholds.contract.v1`
3. `trade.thresholds.contract.v1`
4. `chemistry.contract.v1`
5. `rivalry.contract.v1`

## Schema Contracts
### Sim Output (`sim.output.contract.v1`)
- `contractType`: `shape`
- Expected object keys:
  - `result.home` (number)
  - `result.away` (number)
  - `result.winnerId` (string)
  - `summary.turnovers` (number)
  - `summary.totalYards` (number)

### Draft Thresholds (`draft.thresholds.contract.v1`)
- `contractType`: `shape`
- Expected keys:
  - `r1EliteMin` (number)
  - `r1SolidMin` (number)
  - `r2StealMin` (number)
  - `r2SolidMin` (number)
  - `r3GemMin` (number)

### Trade Thresholds (`trade.thresholds.contract.v1`)
- `contractType`: `shape`
- Expected keys:
  - `easy.acceptanceFloor` (number)
  - `normal.acceptanceFloor` (number)
  - `hard.acceptanceFloor` (number)

### Chemistry (`chemistry.contract.v1`)
- `contractType`: `shape`
- Expected keys:
  - `keepRateBase` (number)
  - `systemFitDefaultMod` (number)
  - `captainBonus` (number)

### Rivalry (`rivalry.contract.v1`)
- `contractType`: `shape`
- Expected keys:
  - `heat.min` (number)
  - `heat.max` (number)
  - `trophy.enabled` (boolean)

## Quirk Notes
If any gameplay behavior is intentionally non-intuitive, add:
- `docs/hybrid-v4-contract-quirks.md` entry with:
  - fixture id
  - reason
  - tolerance/handling expectation

## Validation Commands
1. Generate/update `dist/contracts-actual.json` in gameplay lane.
2. Run:
   - `npm run verify:contracts`
3. Attach:
   - `dist/contracts-report.json`
   - `dist/contracts-report.md`
   - fixture checksums list
