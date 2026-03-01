# Collaboration Lane Ownership

## Codex Lane (Hybrid Runtime/Infra)
- `src/app/**`
- `src/dev/**`
- `src/main.jsx`
- `scripts/**`
- `.github/workflows/**`
- `docs/**`
- infrastructure/tests around above

## Claude Lane (Gameplay Systems/Data)
- `src/systems/**`
- `src/data/**`
- gameplay-focused tests tied to systems/data

## Shared Files (window-only coordination)
- `package.json`
- `docs/index.md`
- `docs/hybrid-v3-integration-contract.md`
- `docs/hybrid-v4-integration-contract.md`
- `tests/gameplay-contract-*.test.js`

## Guardrails
- Run `npm run verify:lane` before push.
- Shared-file edits outside approved conflict windows are lane violations.
- If a change must cross lanes, log it in `docs/hybrid-v4-380-slice-ledger.md` first.
- Default profile is `closed`; open named profiles only for approved shared windows.
