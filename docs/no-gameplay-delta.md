# No Gameplay Delta Guard

Use this guard during overnight stability/performance streams to ensure changed files do not include gameplay behavior paths.

## Command
- `npm run verify:no-gameplay-delta`
- `npm run verify:lane`
- `npm run verify:lane:codex`
- `npm run verify:lane:claude`

## When It Should Fail
- Any changed file starts with `src/systems/`
- Any changed file starts with `src/data/`

## Inputs
- `CHANGED_FILES` environment variable (comma-separated), or
- `--files` CLI arg (comma-separated), or
- `--files-from` path to newline-delimited file list.

## Notes
- Unknown paths are reported but do not fail by default.
- Strict-lane mode fails on unknown paths and shared-file edits outside approved windows.
- Use `--shared-window-profile <name>` to enable approved shared-file windows.
- Use `--report dist/lane-report.json` to emit lane JSON output.
- Use `--shared-audit dist/shared-window-audit.json` to emit shared-window audit output.
- This is a guardrail, not a replacement for code review.
