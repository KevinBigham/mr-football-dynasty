# Runtime Validation Architecture

## Goal
Keep `src/main.jsx` lightweight by loading validation/runtime status data asynchronously while preserving existing UI behavior.

## Module Map
- `src/main.jsx`
  - Bootstraps app and triggers runtime import.
- `src/dev/import-with-timeout.js`
  - Timeout wrapper for async runtime module import.
- `src/dev/runtime-loader.js`
  - Normalizes runtime snapshot payload and fallbacks.
- `src/dev/module-validation-runtime.js`
  - Public API façade and orchestrator.
- `src/dev/module-validation/contracts.js`
  - Shared constants and result contracts.
- `src/dev/module-validation/check-runner.js`
  - Check counter/error collector and group execution.
- `src/dev/module-validation/checks-config.js`
  - Config-oriented check groups.
- `src/dev/module-validation/checks-systems.js`
  - Systems-oriented check groups.
- `src/dev/module-validation/checks-data.js`
  - Data-oriented check groups.
- `src/dev/module-validation/checks-runtime-ui.js`
  - Status-row shape/duplicate/failure checks.
- `src/dev/module-validation/status-rows.js`
  - Extracted status row construction.
- `src/dev/module-validation/summary.js`
  - Extracted summary payload.

## Data Flow
1. Entrypoint calls `importWithTimeout(() => import('./dev/module-validation-runtime.js'))`.
2. `resolveRuntimePayload` normalizes runtime exports into `{ validation, systems, summary, error }`.
3. UI renders loading / error / success state without changing wording semantics.
4. Runtime validation internally executes grouped checks and row-validation checks.

## Non-Goals
- Gameplay behavior changes.
- Rebalancing systems/data.
- Replacing existing module contracts used by current tests.
