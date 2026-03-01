# Runtime Validation Contract

## Public API
- `runModuleValidation(prebuiltStatusRows?) => { ok, errors, checkCount }`
- `buildModuleStatusRows() => Array<{ name, status }>`
- `buildModuleValidationSnapshot() => { validation, statusRows, summary }`
- `PHASE1_SUMMARY` (frozen object)
- `MIN_EXPECTED_CHECK_COUNT` (numeric lower bound guard)

## Invariants
1. Result keys from `runModuleValidation` are exactly `ok`, `errors`, `checkCount`.
2. `errors` is always an array.
3. `checkCount` is numeric and computed from executed checks.
4. Duplicate status row names fail validation.
5. Non-boolean `status` values fail validation.
6. Any `status: false` row fails validation.

## Compatibility
- Existing consumers should continue importing from `src/dev/module-validation-runtime.js`.
- Internal files under `src/dev/module-validation/*` are implementation detail.
