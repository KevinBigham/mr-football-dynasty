# Hybrid v4 Blitz Gate Flow

## Orchestrator
- Script: `scripts/verify-blitz.mjs`
- Command: `npm run verify:blitz`
- Report: `dist/blitz-gate-report.json`

## Gate Order
1. `verify:toolchain`
2. `verify:lane` (profile `closed` + shared-window audit artifact)
3. `verify:hybrid`
4. `e2e:launcher`
5. `verify:security`
6. `verify:perf`
7. `verify:contracts`

## Failure Class Matrix
- Toolchain/lane failures: infra ownership (Codex)
- Hybrid/e2e/security failures: launcher/runtime lane (Codex)
- Contracts drift: gameplay fixture ownership (Claude)
- Perf catastrophic failures: codex perf gate + release risk escalation
