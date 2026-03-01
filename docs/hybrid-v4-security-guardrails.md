# Hybrid v4 Security Guardrails

## Scope
- Launcher/runtime lane only (`src/app/**`, `scripts/**`, workflow checks).
- Legacy gameplay runtime remains read-only for this phase.

## Enforced Checks
1. `scripts/check-playable-build.mjs` rejects:
   - protocol-relative refs (`//...`)
   - any explicit scheme refs (`http:`, `https:`, `javascript:`, `data:`, etc.)
2. `scripts/check-security-guardrails.mjs` enforces:
   - iframe sandbox policy in play screen
   - direct-open links with `rel="noopener noreferrer"`
   - direct-open and iframe `referrerPolicy="no-referrer"`
   - guardrail report schema `security-report.v2`

## Artifacts
- `dist/security-report.json`
- `dist/playable-build-report.json`

## CI/Nightly Behavior
- `verify:security` is required in CI.
- Nightly uploads security report and includes summary line in job summary.

## Failure Handling
1. Treat failing security gate as RC blocker.
2. Fix in Codex lane only (no gameplay lane edits).
3. Re-run `verify:security` and attach updated report.
