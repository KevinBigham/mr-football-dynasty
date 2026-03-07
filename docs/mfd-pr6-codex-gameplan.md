# MFD Codex Go-Order Plan (Post-PR5)

## Objective
Ship the next safe, high-leverage Codex slice after PR5 with strict lane discipline, fast verification, and clean handoff for parallel agent work.

## Request Intake → Plan Translation
Because external IDE-local files are not present in this container, this plan is grounded in repository contracts and current runbooks:
- launcher/playable lane constraints
- hybrid v4 gate sequence
- morning handoff + artifact expectations

## Operating Principles
1. **Keep gameplay behavior frozen** while advancing launcher/runtime reliability.
2. **Stay in Codex lane** (`src/app/*`, `src/dev/*`, `scripts/*`, docs/tests for those areas).
3. **Gate every slice** with contract and lane checks before handoff.
4. **Favor additive changes** over risky rewrites.

## Execution Order (Go-Order)

### 0) Handshake + Scope Lock (start of slice)
- Confirm this slice touches only lane-owned files.
- Record intent in branch/commit summary as `PR6-S###` slice IDs.
- Explicitly defer any gameplay extraction work (`src/systems/*`, `src/data/*`).

### 1) Baseline Safety Snapshot
Run before coding:
- `npm run verify:lane`
- `npm run verify:playable`
- `npm test`

If any baseline fails, log as pre-existing and fix only if inside Codex lane.

### 2) Implement One Thin Vertical Slice
Prioritize in this order:
1. launcher recovery/resilience improvements
2. runtime validation clarity (status + diagnostics)
3. build/smoke script robustness
4. docs/runbook updates that match behavior changes

Rules:
- cap each slice to one theme
- keep diff reviewable
- add/update tests with the behavior change

### 3) Verification Gates (post-change)
Run in this order:
1. `npm run verify:lane`
2. `npm test`
3. `npm run verify:playable`
4. `npm run verify:all` (if time permits before handoff)

### 4) Artifact + Handoff Pack
Refresh and publish references when produced:
- `dist/preload-report.json`
- `dist/perf-profile.json`
- `dist/playable-build-report.json`
- `dist/playable-smoke-report.json`
- `docs/overnight-summary.md` (or morning-handoff equivalent)

### 5) Baton Pass Protocol
For the next agent:
- summarize completed slice IDs
- list deferred items + risk level
- identify any shared-window file needs
- propose exactly 3 next moves

## Coordination Handshake Template
Use this at slice open/close.

### Open Handshake
- **Lane:** Codex playable/runtime
- **Scope:** [files/modules]
- **Risk:** low/med/high
- **Blocked by:** none or dependency
- **Exit criteria:** tests + gates + artifacts

### Close Handshake
- **Delivered:** [slice IDs + summary]
- **Checks:** lane/test/playable/all status
- **Artifacts:** [paths generated]
- **Deferred:** [items]
- **Next 3 moves:** [ordered list]

## Definition of Done (PR6 slice)
- lane ownership maintained
- tests updated and passing
- playable verification passing
- docs updated for any behavior/runbook drift
- handoff note ready for immediate continuation

## Quick Start Command Block
```bash
npm run verify:lane && npm test && npm run verify:playable
```
