# UI Emoji Overhaul — Phase 2 Progress (2026-03-03)

## Scope Implemented
- Added reusable SVG icon abstraction:
  - `src/components/Icon.jsx`
  - exported via `src/components/index.js`
- Replaced emoji labels in high-traffic onboarding/title surfaces in `mr-football-v100.jsx`:
  - Press Start
  - Continue Dynasty
  - Import Save
  - Jukebox
  - Guide
  - Rookie coach card actions
  - Rookie completion modal heading + target status text
  - Header support button icon
- Replaced several settings/FAB labels with emoji-free text/icon treatment:
  - Game Settings / Visual Preferences headings
  - Ko-fi support CTA label
  - CRT scanline toggle labels
  - How to Play button
  - FAB action labels (sim/playoff/scout/etc.)
  - Keyboard Shortcuts title
- Added regression wiring test:
  - `tests/emoji-phase2-wiring.test.js`

## Count Snapshot (line-based)
- Before Phase 2 start:
  - Repo emoji-bearing lines: `3940`
  - `mr-football-v100.jsx`: `3207`
- After this pass:
  - Repo emoji-bearing lines: `3932`
  - `mr-football-v100.jsx`: `3179`

## Notes
- Reduction is modest because emoji usage is deeply data-driven across narrative/system strings.
- The key Phase 2 objective (icon system + top-surface replacement) is complete.

## Next Phase Targets
1. Convert shared high-volume UI modules (`WeeklyShowCard`, settings panels, overlays) to iconized labels.
2. Migrate user-facing strings in `src/data/*` and `src/systems/*` away from emoji prefixes.
3. Add a stricter guardrail test to block new emoji in runtime UI labels.
