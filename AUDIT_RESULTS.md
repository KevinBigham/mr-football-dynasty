# Mr. Football Dynasty — Pre-Release Audit Results

Date: 2026-03-01
Branch audited: `claude/game-review-feedback-alXYq`
Audit workspace: `/Users/kevin/Downloads/Mr_Football/audit_run/mr-football-dynasty`

## Baseline
- `npm test`: 928/928 passing before changes.
- `npm run build`: FAILED before changes due to duplicate symbol (`getPosMarketTier86`) in `mr-football-v100.jsx`.
- `CODEX_AUDIT_BIBLE.md`: not present on this branch. I used `CODEX_HANDOFF.md`, `HANDOFF_BIBLE.md`, and `COWORK_HANDOFF_BIBLE.md` for full instructions/context.

## Issues Found and Fixed

### 1) Build blocker in monolith import scope
- Problem: duplicate declaration of `getPosMarketTier86` broke production build.
- Fix: removed conflicting import binding from monolith top-level import list.
- Result: `npm run build` now succeeds.

### 2) Non-deterministic RNG usage in modular code
- Problem: `Math.random()` was still used in modular files (`src/data/broadcast.js`, `src/data/draft-analyst.js`, `src/systems/game-sim-math.js`).
- Fix: migrated to seeded RNG channels (`RNG.play` / `RNG.draft`) and deterministic fallback handling.
- Result: `src/` now has zero `Math.random()` usage.

### 3) 4th-down recommendation bug
- Problem: `calcFourthDownEV995` could recommend FG even when FG was not applicable; logic also lacked stronger late-game context handling.
- Fix:
  - Non-applicable FG is excluded from recommendation selection.
  - Improved opponent EP handling for fail/miss/punt contexts.
  - Added situational adjustments for desperation/protecting game states and territory/yardage.
- Result: long-yardage deep own-territory now recommends punt; six explicit scenario tests added and passing.

### 4) Premium feature wiring gaps (partial)
- Problem: premium module existed, but gameplay wiring was incomplete.
- Fixes shipped:
  - `godMode` now initializes from `PREMIUM.isUnlocked('godMode')`.
  - `extraScouting` bonus now applied at initial scout point allocation paths.
  - `extraSaves` now enforced in save-slot store (`3` base, `8` with premium unlock).
- Result: premium wiring tests added and passing.

## New Tests Added

### Sim engine + validation
- `tests/sim-validation.test.js`
  - Season stat range assertions
  - Play distribution checks (ground vs air)
  - Scheme-counter impact validation
  - Rating→performance correlation checks
  - Clock monotonicity / bounds checks
  - NaN-propagation guard checks

### Coverage gap tests requested
- `tests/save-load-compat.test.js`
- `tests/premium-wiring.test.js`
- `tests/fourth-down-scenarios.test.js`
- `tests/scheme-counters.test.js`
- `tests/rng-channel-isolation.test.js`
- `tests/trade-ai-validation.test.js`
- `tests/cap-validation.test.js`

### Existing tests updated for corrected behavior
- `tests/contracts.test.js`
- `tests/broadcast-behavior.test.js`

## Sim Engine Validation Results (Track 1)
- Deterministic season simulation harness built around `PLAYBOOK_986.resolvePlay` + scheme matrix.
- Assertions now cover:
  - season totals in sane bounds,
  - no NaN/Infinity propagation,
  - expected directional behavior for run/pass distribution,
  - positive scheme edge outperforming negative edge,
  - higher-rated roster outperforming lower-rated roster,
  - clock decrement integrity.

## Final Verification
- `npm test`: **960 passed**.
- `npm run build`: **0 errors**.

## Remaining Concerns for Kevin
1. `CODEX_AUDIT_BIBLE.md` is missing in this branch; if that file contains additional hard requirements/scenario definitions, those should be reconciled explicitly.
2. The legacy monolith (`mr-football-v100.jsx`) still contains extensive `Math.random()` usage in non-extracted paths. Modular `src/` code is now clean, but full monolith conversion to seeded RNG remains a significant follow-up.
3. Premium wiring is improved (godMode default, extra scouting, extra saves), but `quickSim` and `advancedAnalytics` are still not deeply integrated into monolith gameplay/UI pathways and should be completed in a dedicated pass.
4. Cross-browser/perf/a11y checklist items in the mission were not fully bench-tested via real browser automation in this run.
