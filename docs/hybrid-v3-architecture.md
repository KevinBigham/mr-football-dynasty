# Hybrid v3 Architecture

## Goal
Ship a stable playable hybrid release by combining:
1. Legacy gameplay runtime (`/legacy/index.html`) for immediate play.
2. React launcher/runtime checks for reliability and operability.

## Lanes
1. Codex: launcher/runtime/infra (`src/app`, `src/dev`, `scripts`, CI/docs).
2. Claude: gameplay depth (`src/systems`, `src/data`, gameplay behavior tests).

## Runtime Layers
1. Launcher shell (`src/app/launcher-shell.jsx`): mode routing + diagnostics.
2. Status screen (`src/app/status-screen.jsx`): async module validation.
3. Play screen (`src/app/play-screen.jsx`): legacy iframe + playability checks.
4. Hybrid checks (`scripts/*`): build/smoke/save/report gates.

## Reports
1. `dist/playable-build-report.json`
2. `dist/playable-smoke-report.json`
3. `dist/legacy-save-report.json`
4. `dist/legacy-session-smoke-report.json`
5. `dist/playability-report.json`
