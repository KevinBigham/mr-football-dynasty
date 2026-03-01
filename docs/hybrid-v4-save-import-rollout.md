# Hybrid v4 Save Import/Export Rollout

## Feature Flag
- Env key: `VITE_ENABLE_SAVE_IMPORT_EXPORT`
- Enabled when value is exactly `1`.

## Launcher Behavior
- Status mode remains unchanged regardless of flag state.
- Play mode shows a non-blocking beta card when flag is enabled.
- Legacy boot path is unaffected when flag is disabled.

## Validation Checklist
1. Boot default launcher -> status panel unchanged.
2. Open `?mode=play` with flag disabled -> no beta card.
3. Open `?mode=play` with flag enabled -> beta card visible.
4. Run `npm run verify:save-import` and inspect report artifact.

## Rollback
Set `VITE_ENABLE_SAVE_IMPORT_EXPORT=0` (or unset) to hide the feature immediately.
