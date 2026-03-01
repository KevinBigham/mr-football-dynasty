# Hybrid v4 Contract Drift Escalation

## Triage Flow
1. Confirm drift in `dist/contracts-report.json`.
2. Identify drift type and fixture ID.
3. Map ownership:
   - `changed-threshold` in gameplay fixture -> Claude lane
   - parser/schema/reporting failure -> Codex lane
4. Open fix issue with due date and lane owner.

## Severity
- `P0`: widespread shape drift, missing critical fixture set
- `P1`: isolated threshold drift without gameplay blocker
- `P2`: docs/template mismatch

## Required Artifacts for Escalation
- contracts JSON report
- contracts markdown summary
- fixture checksum or commit reference

## Policy
Contract drift blocks RC when running in strict mode. Optional mode is allowed only before Claude fixtures are delivered.
Tolerant mode may be used only for declared fixture quirks and must be time-boxed.
