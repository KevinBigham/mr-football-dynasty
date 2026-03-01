# Hybrid v3 Rollback Drill

## Objective
Verify release rollback can be executed quickly with documented evidence.

## Drill Steps
1. Capture current artifact set.
2. Simulate `verify:hybrid` failure state.
3. Roll back to last known-good tag.
4. Re-run `ci:release-candidate`.
5. Confirm playability artifacts regenerate and pass.

## Success Criteria
1. Rollback completed within agreed SLA.
2. No lane policy violations introduced during rollback.
