# MR. FOOTBALL DYNASTY — Handoff Bible v2
## For the Next AI Collaborator (Codex, Claude Code, or any agent)
**Date:** March 11, 2026 | **Author:** Claude (Opus 4.6) | **Human Director:** Kevin Bigham
**Repo:** https://github.com/KevinBigham/mr-football-dynasty
**Live Site:** https://kevinbigham.github.io/mr-football-dynasty/

---

## 1. WHAT THIS GAME IS

MFD is a browser-based football GM/dynasty simulation. No server. No install. Open a URL, play. 63,414 lines of gameplay in a legacy monolith (`mr-football-dynasty/game.js`), wrapped by a modern Vite+React launcher (`src/`), with a live event spine connecting them.

The player is a General Manager who drafts, trades, signs free agents, manages a $255M salary cap, hires coaching staff, scouts prospects, navigates ownership, builds rivalries, and chases a dynasty legacy across 30+ seasons. The game has a full in-game TV network (MFSN) with 3 broadcast anchors, 4 draft analysts with unique personalities, press conferences, locker room scenes, and championship voice systems.

**North Star:** "Build the greatest football universe generator in gaming: believable football, franchise decisions with long shadows, human drama, football-theater presentation, and infinite replayability."

---

## 2. THE ARCHITECTURE

### Two Worlds Connected by an Event Spine

**World 1 — The Monolith** (`mr-football-dynasty/game.js`)
- 63,414 lines, 675 functions, 3.8MB
- Contains ALL gameplay: sim engine, UI, draft, trades, scouting, MFSN, press conferences, coaching, rivalries, chemistry, salary cap, story arcs, etc.
- Loaded inside an iframe by the launcher via `public/legacy/index.html`
- **GOLDEN RULE:** Never edit `public/legacy/game.js` directly. Edit `mr-football-dynasty/game.js`, then run `node scripts/sync-legacy-assets.mjs`

**World 2 — The Modern Launcher** (`src/`)
- 188 files: Vite + React, organized into `app/`, `systems/`, `data/`, `config/`, `components/`, `dev/`
- 90+ extracted game system modules (mirrors of monolith logic, independently tested)
- Event spine infrastructure: parent-bridge, emitter, envelope, consumer
- Postgame Autopsy panel with narrative engine
- Command Desk with pre-game intelligence

**The Bridge — Event Spine (LIVE as of March 11, 2026)**
- Game emits `mfd:game-event` (game_start, game_end) via `window.parent.postMessage`
- Game emits `mfd:consumer-packet` with box score, leaders, quarters, weather, coach impact, key plays
- Launcher receives events, transitions `sourceState` from fixture → live
- Postgame Autopsy renders "Why You Won/Lost" in football English
- Command Desk shows pre-game matchup intelligence

### Key File Map

| File | What It Does |
|------|-------------|
| `mr-football-dynasty/game.js` | THE GAME. Edit source here. |
| `public/legacy/game.js` | Deployed copy. NEVER edit directly. |
| `scripts/sync-legacy-assets.mjs` | Copies source → deployed. Run after every edit. |
| `src/app/play-screen.jsx` | Launcher Play screen (hosts iframe + Autopsy) |
| `src/app/postgame-autopsy-view.jsx` | Postgame Autopsy UI component |
| `src/app/live-event-consumer.js` | Event spine consumer (validates, tracks state) |
| `src/app/playability-check.js` | basePath-aware asset probe |
| `src/systems/events/` | Event spine producer-side (envelope, emitter, bridge) |
| `docs/mfd-event-consumer-packet-v1.md` | Event spine contract spec |
| `vite.config.js` | Vite config (base: `/mr-football-dynasty/`) |
| `package.json` | Dependencies and 40+ npm scripts |

### Message Contracts (Frozen at v0.1.0)

**Per-event:** `{ type: "mfd:game-event", envelope: { schemaVersion, eventName, seq, gameId, timestamp, quarter, clock, possession, fieldPos, down, yardsToGo, homeScore, awayScore, payload } }`

**Consumer packet:** `{ type: "mfd:consumer-packet", packet: { schemaVersion, context, envelope, weeklyHook, postgameAutopsy } }`

The `postgameAutopsy` field now contains: `summary`, `won`, `score`, `quarters`, `box`, `leaders`, `weather`, `coachImpact`, `halftime`, `log` (first 30 entries), `keyPlays` (TDs, INTs, FUMs, SACKs).

---

## 3. WHAT'S WORKING (Verified March 11, 2026)

### Test Suite
- 243 test files, 61+ suites currently running
- All passing (0 failures)
- Key test files: `live-event-consumer.test.js` (35 tests), `playability-check.test.js` (9 tests), `consumer-packet-emission.test.js` (16 tests)
- Run: `npx vitest run`

### Deployed Features (Live on GitHub Pages)
- Full game loads and plays in iframe
- Event spine fires game_start + game_end + consumer-packet on every user game
- Live Feed Source transitions fixture → live correctly
- Postgame Autopsy with "Why You Won/Lost" narrative engine
- Command Desk with pre-game intelligence (best player, weak position group, injuries, form, recommended speech/halftime combo)
- Coach Tips system (11 contextual gold toasts at first-time moments)
- "This Week" guidance card on Home dashboard (changes per week/phase)
- No false Playability Check warnings on GitHub Pages
- Non-game messages (Chrome extensions, DevTools) don't poison sourceState
- Sim Week works through halftime (lg crash fixed)

---

## 4. EXISTING GAME FEATURES (Complete Inventory)

### Core Gameplay
- Full season sim: preseason (3 wk) → cut day → 17-week regular → playoffs (3 rounds) → offseason
- Drive-by-drive sim with trench battles, pressure, coverage, scheme counters, weather, home field, fatigue, momentum, overtime
- 6 pre-game speeches (Fire Up, Lock In, Personal, Rivalry, Championship, Back Against Wall)
- 6 halftime adjustments (Stay Course, Open Up, Control Clock, Desperation, Protect Lead, Two-Minute)
- Postgame locker room with player voice reactions
- 4 weekly practice focus options (Opponent Scout, Dev Camp, Recovery, Full Pads)

### Franchise Management
- $255M salary cap with ~5%/yr growth
- Contract tools: restructure, backload, extend, franchise tag, cut
- Dead money tracking and cap cliff mechanics
- Free agency with 4 offer types (Pay Up ~95%, Market ~80%, Lowball ~60%, League Min ~40%)
- Trade engine with AI valuation, counter-offers, conditional picks, multi-player packages
- Trade deadline (Week 10)
- 7-round draft with war room, scouting, and on-the-clock trades
- Scouting economy: 1,000 pts/season, 3 test types (Measurables, Interview, Film Study)

### Coaching & Staff
- OC/DC coordinator hiring with archetypes and specialties
- Coaching Clinic XP perk tree (Leadership, Analytics, Development, Conditioning)
- Front Office staff (Assistant GM, Scout Director, Analytics Coordinator)
- Coach trait mods affecting sim (stallReduction, pressureBoost, pocketBoost, etc.)

### Player Systems
- 95+ personality traits with gameplay effects
- Chemistry system, morale system, holdout system
- Dev traits (Superstar 1.5x, Star 1.2x, Normal 1x)
- Position battles in training camp, breakout candidates
- Mentor system, aging/decline curves (position-specific)
- System knowledge (compounds with stable schemes)

### Narrative & Presentation
- MFSN Network: 3 anchors (Marcus Cole, Diana Chen, Big Trev), weekly show with segments
- 4 draft analysts (Rod Pemberton, Diane Holloway, Marcus Steele, Lena Voss) with 8 reaction categories each
- 207 MFSN references, 72 broadcast references, expanded drive commentary
- Press conferences with tone-based answers affecting morale/owner/media
- Locker room scenes, crowd reactions (home/away/blowout), coach reactions (challenge/furious/celebrating)
- FA narrative (big signings, bidding wars, holdouts, market updates)
- Champion voice system (5 coach archetypes: Grinder, Professor, Hothead, Zen, Visionary, Firestarter + Dynasty Coach)
- Story arc engine with templates, rivalry sagas, dynasty eras

### Dynasty & Legacy
- Legacy Score (6 dimensions: Win%, Championships, Playoffs, Draft Hits, Cap Mgmt, Player Dev)
- 12 career milestones
- Dynasty era detection ("The Dynasty" for 3+ rings in 3 years)
- Hall of Fame (Season 6+, 10+ season careers)
- Ring of Honor, All-Time Records
- Rivalry trophies (8 templates, auto-generated at heat 60+)

### Infrastructure
- 4 difficulty levels (Rookie, Pro, All-Pro, Legend)
- God Mode (full sandbox control)
- League DNA sliders (trade frequency, injury rate, bust rate, etc.)
- Save/load with compatibility, import/export
- Keyboard shortcuts
- Tab unlock progression
- Stadium upgrades, franchise relocation (10 cities)
- Stadium naming rights deals

---

## 5. WHAT WAS SHIPPED ON MARCH 11, 2026

| PR | Feature |
|----|---------|
| #14 closed | Stale PR cleanup |
| #16 | basePath playability fix |
| #17 | Launcher truthfulness (noise filter, state poison fix) |
| #18 | Event spine wiring (game talks to launcher) |
| #19 | Postgame Autopsy v1 |
| #20 | Enriched consumer-packet + narrative engine |
| Direct commit | "Why You Won/Lost" + human-readable coaching labels |
| #22 | Onboarding Phase 1 + Command Desk |

---

## 6. HOW TO WORK ON THIS PROJECT

### Before Any Edit
```bash
git status --short --branch
git checkout main && git pull origin main
npm install
npx vitest run
```

### Editing Gameplay (the monolith)
1. Edit `mr-football-dynasty/game.js`
2. Run `node scripts/sync-legacy-assets.mjs`
3. Verify: `diff mr-football-dynasty/game.js public/legacy/game.js`
4. Run: `npx vitest run tests/legacy-halftime-lg-regression.test.js tests/sync-legacy-assets.test.js`

### Editing Launcher (src/)
1. Edit files in `src/`
2. Run: `npx vitest run`
3. Test locally: `npm run dev` → open localhost:3000

### Deploying
Push/merge to main. GitHub Pages auto-deploys via GitHub Actions.

### Critical Rules
- NEVER edit `public/legacy/game.js` directly
- NEVER use `Math.random()` — always use the seeded RNG
- NEVER rename/widen the 14 frozen envelope fields without a schema version bump
- NEVER add new event names casually
- DO NOT let non-MFD window messages poison sourceState
- One branch per feature. One PR per feature.
- Trust the repo over old chat logs

---

## 7. STALE BRANCHES TO CLEAN UP

These 8 remote branches are all superseded or abandoned:
- `claude/continue-football-game-QMRI5`
- `claude/game-review-feedback-alXYq`
- `claude/phone-bootstrap-setup-Dhrbb`
- `codex/build-launcher-consumer-for-event-spine`
- `codex/build-launcher-consumer-for-event-spine-9h1uo5`
- `codex/create-development-plan-for-franchise-sim`
- `codex/track-a-b`
- `docs/architect-pack-v1`

Safe to delete all of them.

---

## 8. KNOWN ISSUES & TECH DEBT

1. **README test count inflation** — Claims 2,446 tests but only ~300 currently run through vitest. Many test files exist but aren't wired to the runner.
2. **243 test files, 61 suites running** — The gap means ~180 test files exist but may have import issues or dependencies on unextracted monolith code.
3. **Event spine only emits game_start + game_end** — No per-play events yet (play_call, play_result, score, etc.). These are defined in the schema but not wired.
4. **Reduced-fidelity metrics** — weeklyHook metrics (pressureRate, coverageWin, runLaneAdv, rzEff) are approximate grades, not precise stats. Should be rendered as grades/bars, not fake-precision numbers.
5. **Module validation errors on boot** — Console shows "[MFD] Module validation errors" with mismatches. These are from the modular system not yet fully replacing monolith code.
6. **Missing favicon/icon** — `icon-192.png` returns 404 on GitHub Pages.
7. **Monolith is 63K lines** — Long-term, the GAME_PLAN.md envisions decomposing this into ~50 modules. The modular mirrors exist in `src/systems/` but haven't replaced the monolith yet.

---

## 9. THE FUTURE OF MR. FOOTBALL DYNASTY

### Ready-to-Build Queue (Immediate)

**A. Expand Postgame Autopsy Narrative**
- Add roster advice: "You need an EDGE rusher — watch for one in the draft"
- Add scheme advice: "Their zone defense shredded your Air Raid. Consider switching to West Coast against zone teams."
- Reference player traits in analysis: "Your Clutch trait QB came through in Q4"

**B. MFSN as Teacher (Onboarding Phase 3)**
- Use Marcus Cole, Diana Chen, and Big Trev to deliver onboarding through the broadcast
- Week 1 MFSN: "Welcome to the league, Coach" segment
- First trade: "BREAKING: [TEAM] makes first trade under new GM"
- Win streak: "Diana Chen with a special segment on [TEAM]'s new GM"

**C. GM Playbook Redesign (Onboarding Phase 2)**
- Convert the 5,000-word manual into ordered Lessons that unlock as you play
- Lesson 1 available immediately, Lesson 8 unlocks Season 3+
- Completion checkmarks, "Try It Now" buttons
- Existing content is well-written — restructure, don't rewrite

**D. Wire Per-Play Events**
- The event spine schema defines 13 event types (game_start through game_end)
- Currently only game_start and game_end are wired
- Adding play_call, play_result, score, turnover, etc. enables a live play-by-play viewer

### Medium-Term Features

**E. Live Game Viewer**
- Instead of instant sim, watch drives play out with animation
- Event spine already supports per-play data — needs producer-side wiring + consumer-side renderer
- Would transform the game from "click and read results" to "watch your team play"

**F. Deeper Playoff Experience**
- Bracket visualization between rounds
- Press conferences between playoff games
- Championship week special events
- Super Bowl week media day

**G. Player Relationship System**
- Deeper mentor/mentee bonds that affect development
- Friendship/conflict between players
- Agent relationships affecting negotiations
- "Best Friend" pairings that boost chemistry

**H. Media Narrative Tracking**
- Stories that follow your franchise across seasons
- "The Rebuild" narrative when you tank for picks
- "The Cinderella Run" when an underdog makes the playoffs
- National media vs local media perspectives

### Dream Features (Long-Term)

**I. Mobile Optimization**
- Responsive design for phone play
- Touch-optimized UI for key actions
- Offline capability via Service Worker

**J. Multiplayer/Online Leagues**
- Share save files to compete against friends
- Async league play (take turns, compare results)
- Leaderboards by seed for comparing GM strategies

**K. Custom Team Creator**
- Design your own franchise: name, city, colors, logo
- Import into existing 30-team league
- Custom rival assignments

**L. Historical Mode**
- Start from different eras with era-appropriate rules
- Salary cap evolution, rule changes over decades
- "What if" scenarios

**M. Modding Support**
- Custom teams, narratives, broadcast voices via JSON configs
- The modular architecture (already partially built in `src/systems/`) enables this

**N. Architecture Migration**
- Gradually replace monolith functions with tested modular versions
- Start with low-risk systems (weather, RNG, helpers)
- End state: monolith shrinks to <500 lines (entry point only)
- This unlocks: proper state management, component splitting, CSS modules, accessibility

### Unimplemented Ideas Found in Codebase

From `GAME_PLAN.md`:
- **State management migration** — 269 useState hooks → useReducer + Context, grouped into 6 domains (Season, Roster, Draft, Trade, Free Agency, Game Day)
- **Component extraction** — Split monolithic render into ~25 page components with reusable primitives
- **CSS Modules** — Extract inline styles into proper CSS
- **Accessibility audit** — WCAG 2.1 AA compliance
- **Performance optimization** — React.memo, lazy loading, code splitting

From `HANDOFF_BIBLE.md`:
- **Shareable Moments** — Share cards, golden seeds, dynasty histories
- **Community layer** — Seeds, strategies, dynasty story sharing
- **Modding** — Custom teams, narratives, broadcast voices via JSON

From existing code (built but underutilized):
- **Seeded determinism** — Golden seeds are already implemented but not surfaced to players as a feature
- **League DNA sliders** — Exist but could be expanded with more presets and community sharing
- **4 draft analysts** — Massive content (Rod Pemberton, Diane Holloway, Marcus Steele, Lena Voss) with 8 reaction types × 8-10 variants each. Under-surfaced in the UI.
- **Champion voice system** — 6 coach archetypes with win/loss quotes. Could be expanded into a full coaching personality system.
- **War room chatter** — 50+ lines of draft night drama text. Could be expanded into real-time draft experience.

---

## 10. WORKING WITH KEVIN

Kevin is the director. He builds the vision, you build the code.

- He's a high school Personal Finance teacher and swim coach, not a developer
- He applies code changes via the GitHub web editor (pencil icon → paste → commit)
- Package deliverables as complete replacement files with clear naming: `FILE1--path--filename.js`
- Give step-by-step instructions: "Create branch → edit file → commit → merge"
- He operates in two energy modes: **LFG** (ship fast, keep building) and **Namaste** (reflective, strategic)
- He cares deeply about the game teaching football to players, not just showing numbers
- His north star: "A player should never ask 'what do I do now?'"

### Delivery Preferences
- Artifact first, rationale second
- Ship strong draft now; note assumptions briefly
- End with concrete next step
- Anti-stall: pick reasonable default, label it, proceed
- No fluff, empty hype, or excessive disclaimers

---

## 11. COMMANDS REFERENCE

```bash
# Dev server
npm run dev

# Run tests
npx vitest run

# Sync legacy assets after editing game.js
node scripts/sync-legacy-assets.mjs

# Verify sync
diff mr-football-dynasty/game.js public/legacy/game.js

# Build for production
npm run build

# Run specific test files
npx vitest run tests/live-event-consumer.test.js tests/playability-check.test.js

# Full CI-equivalent
npm run verify:all
```

---

**The game already has 50+ deep features, 675 functions, and the soul of a football universe. Your job is to make it the GOAT. LFG.** 🏈
