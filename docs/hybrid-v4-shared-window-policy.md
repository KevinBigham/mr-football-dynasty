# Hybrid v4 Shared-Window Policy

## Purpose
Shared-window profiles allow controlled edits to shared files without breaking strict lane ownership.

## Default State
- Active profile: `closed`
- Behavior: shared-file edits are rejected.

## Profiles
1. `closed`
   - enabled: `false`
   - allowed shared files: none
2. `contracts-integration`
   - enabled: `true`
   - intended for gameplay contract fixture integration
3. `final-contracts`
   - enabled: `true`
   - intended for final contract/doc references before RC decision

Definitions are stored in:
- `scripts/allowlists/overnight-safe-paths.json`

## Commands
- Codex lane default:
  - `npm run verify:lane`
- Explicit profile:
  - `node scripts/verify-no-gameplay-delta.mjs --strict-lane --lane codex-hybrid-v4 --shared-window-profile contracts-integration --report dist/lane-report.json --shared-audit dist/shared-window-audit.json`

## Reports
- Lane report: `dist/lane-report.json`
- Shared-window audit: `dist/shared-window-audit.json`

## Enforcement
- Unknown profile names fail lane checks.
- Shared-file edits are allowed only when profile is enabled and file is in profile allowlist.
