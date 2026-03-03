# UI Emoji Overhaul — Phase 1 Audit (2026-03-03)

## Goal
Remove emoji usage from the user-facing experience while preserving feature clarity and visual hierarchy.

## Scan Method
- Command: `rg -n --pcre2 "\\p{Extended_Pictographic}"`
- Excluded: `node_modules`, `dist`, `.git`
- Scope: full repo

## Baseline Counts
- Total emoji-bearing lines: `3940`
- `mr-football-v100.jsx` emoji-bearing lines: `3207` (`81.4%` of total)
- `src` + `tests` + `docs` emoji-bearing lines: `712`

## Top Hotspot Files
1. `mr-football-v100.jsx` (`3207`)
2. `src/data/mfsn-network.js` (`109`)
3. `src/systems/playbook.js` (`44`)
4. `src/systems/locker-events.js` (`36`)
5. `src/systems/story-templates.js` (`30`)
6. `src/systems/player-archetypes.js` (`30`)
7. `src/systems/rivalry-game-day.js` (`28`)
8. `src/systems/postgame-presser.js` (`26`)
9. `src/systems/rivalry-engine.js` (`24`)
10. `src/systems/front-office.js` (`22`)

## Most Frequent Symbols in Monolith (Top 20)
- 🔥 178
- 🏈 153
- ⚡ 142
- 🏆 135
- 📋 120
- ✅ 120
- ⭐ 101
- 🎯 97
- ⚠ 92
- 📊 82
- ❌ 77
- 💰 65
- 📈 62
- 📺 56
- 🛡 55
- 🌟 53
- 🔍 46
- 💥 46
- 🔄 44
- 🤝 41

## Findings
- Emoji usage is deeply embedded in:
  - button labels and nav chips
  - status badges and alerts
  - card headers and section markers
  - generated feed copy and storyline text
  - data/config content rendered in UI (not just component markup)
- A simple search/replace is risky. We need a layered approach:
  - component-level icon abstraction
  - content rewrite for data-driven strings
  - guardrails to prevent regressions

## Proposed Migration Sequence
1. Create an icon abstraction (`src/components/Icon.jsx`) using SVG icons.
2. Replace emojis in core UI surfaces first:
   - title screen
   - nav/tab bars
   - home dashboard cards
   - onboarding flow modals/cards/overlays
3. Replace emoji-heavy status/notification strings in `mr-football-v100.jsx`.
4. Remove emojis from data-driven content (`src/data/*`, `src/systems/*`) where displayed to users.
5. Update tests and snapshots for changed strings.
6. Add CI guardrail to fail on new emoji in runtime UI strings.

## Definition of Done (Phase 2+)
- No emoji in primary UI labels, buttons, badges, notifications, or modals.
- No emoji in user-facing generated copy unless explicitly allowed by an exception list.
- New regression test/guardrail prevents reintroduction.
