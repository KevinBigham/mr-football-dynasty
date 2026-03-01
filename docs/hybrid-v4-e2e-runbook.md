# Hybrid v4 E2E Launcher Runbook

## Scope
This runbook covers launcher-focused e2e smoke checks for the hybrid playable path.

## Command
```bash
npm run e2e:launcher
```

## Optional Browser Mode
Browser checks are optional and run only when a base URL is provided and Playwright is available.

```bash
node scripts/e2e/run-launcher-smoke.mjs \
  --dist dist \
  --base-url http://127.0.0.1:4173 \
  --report dist/e2e-launcher-report.json \
  --summary dist/e2e-launcher-summary.md \
  --retries 2
```

Use `--no-browser` to force static-only checks.

## What Is Checked
- Dist artifact presence and launcher bundle tokens
- Query/hash/storage mode precedence contract
- Forced mode lock behavior contract
- Status wording freeze and play-screen recovery copy
- Accessibility/tab keyboard hooks
- Optional browser path checks for launcher boot and tab interactions

## Artifacts
- `dist/e2e-launcher-report.json`
- `dist/e2e-launcher-summary.md`
- `dist/e2e-artifacts/*.png` (only on browser failure screenshot capture)

## CI Integration
The `ci` workflow `e2e` job runs `npm run e2e:launcher` and uploads report + summary artifacts.

## Failure Triage
1. Open `dist/e2e-launcher-summary.md` for quick failing check list.
2. Inspect `dist/e2e-launcher-report.json` for details and skip/fail classification.
3. If browser mode failed and screenshot exists, inspect `dist/e2e-artifacts/`.
4. Verify lane boundaries before fixing (`npm run verify:lane`).

## Non-Blocking Skip Rules
- Browser checks are marked `SKIP` when `--base-url` is not provided.
- Browser checks are marked `SKIP` when Playwright is unavailable.
- Save-slot smoke is marked `SKIP` if save-slot UI is not present in launcher build.
