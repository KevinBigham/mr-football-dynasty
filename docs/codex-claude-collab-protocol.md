# Codex + Claude Collaboration Protocol

## Goal
Minimize merge conflicts while parallelizing work.

## File Ownership by Stream
- Runtime/perf tooling stream:
  - `src/dev/*`, `scripts/*`, `.github/workflows/*`, `docs/*`, related tests.
- Gameplay/content stream:
  - `src/systems/*`, `src/data/*`, gameplay-focused tests.

## Branch & PR Rules
- Use short-lived branch slices.
- Keep PRs small and theme-consistent.
- Rebase frequently before touching shared files (`src/main.jsx`, `package.json`, CI workflows).

## Conflict Mitigation
- Lock shared file edits to one stream per short window.
- Prefer additive modules over in-place rewrites.
- Record deferred risky edits in a ledger before handoff.

## Strict Lane Map
- Codex playable lane:
  - `src/app/*`, `src/dev/*`, `src/main.jsx`, `scripts/*`, workflow/docs updates.
- Claude extraction lane:
  - `src/systems/*`, `src/data/*`, gameplay behavior tests.
- Guard check:
  - `npm run verify:lane` (strict lane mode, profile `closed`) before push on playable stream.
  - Open named shared-window profiles only for approved shared-file windows.
