# Playable Rollback Plan

## Trigger Conditions
- `verify:playable` fails on mainline branch.
- Production build loses ability to load legacy game.
- Status dashboard behavior regresses.

## Rollback Steps
1. Revert launcher-only changes in `src/app/**` and `src/main.jsx`.
2. Revert playable scripts and package script wiring.
3. Revert CI playable job additions.
4. Keep runtime validation/perf hardening pieces already known-good.

## Verification After Rollback
- `npm test`
- `npm run build`
- `npm run verify-preload`
- `npm run profile:dist`

## Owner
- Runtime/perf lane owner (Codex stream).
