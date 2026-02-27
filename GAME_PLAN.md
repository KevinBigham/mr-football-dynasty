# Mr. Football Dynasty — Master Refactoring & Enhancement Game Plan

## 🏈 Mission Statement

Transform MFD from a brilliant but monolithic 46K-line single-file game into a modular, testable, maintainable codebase — without breaking a single feature — by distributing work across a team of AI assistants, each playing to their strengths.

---

## 📊 Current State Assessment

| Metric | Current | Target |
|--------|---------|--------|
| Source files | 1 (mr-football-v100.jsx) | 40-60 modules |
| Lines in main file | 46,127 | < 500 (entry point only) |
| useState hooks in AppCore | 269 | 0 (moved to stores/reducers) |
| Test coverage | 0% | 80%+ on core simulation |
| Build system | None (manual transpile) | Vite with HMR |
| CSS approach | Inline objects | CSS Modules |
| Accessibility | Minimal | WCAG 2.1 AA |
| Save system | localStorage only | localStorage + IndexedDB + file export |
| Config centralization | Scattered magic numbers | Single GAME_BALANCE config |

---

## 🤖 AI Team Roster & Assignments

Each AI assistant is assigned work that plays to their strengths:

### CLAUDE (Architect & Orchestrator)
**Role:** Lead architect, code splitter, integration lead
**Why:** Deep context of the full codebase from this review session; strong at large-scale refactoring and maintaining correctness across changes.

**Responsibilities:**
- Phase 1: Build system setup (Vite)
- Phase 1: File splitting — decompose the monolith into modules
- Phase 3: State management migration (useState → useReducer + Context)
- Integration testing across all phases
- Final assembly and merge validation

---

### CODEX (OpenAI Codex)
**Role:** Test suite architect & formula validator
**Why:** Excellent at generating exhaustive unit tests from function signatures; fast at producing boilerplate test code.

**Responsibilities:**
- Phase 2: Write unit tests for ALL math/formula functions
- Phase 2: Write unit tests for RNG determinism
- Phase 2: Write integration tests for game simulation
- Phase 5: Regression test suite for save/load

#### Specific Test Targets (with line references from source):

```
PRIORITY 1 — Financial Math (12 functions)
├── calcContractScore994()     [line 1626]  — Contract fairness A-F grading
├── calcDeadCap994()           [line 1680]  — Dead cap impact calculation
├── calcFourthDownEV995()      [line 1703]  — 4th down go/fg/punt EV
├── calcCapHit()               [line 1766]  — Annual cap hit from contract
├── calcDeadMoney()            [line 1767]  — Dead money from cut/trade
├── restructureContract()      [line 1778]  — Cap restructuring math
├── backloadContract973()      [line 1797]  — Backload with void years
├── extendAndRestructure973()  [line 1818]  — Extension + restructure
├── makeContract()             [line 1759]  — Contract generation
├── COMP_PICKS_986.calculate() [line 246]   — Compensatory pick formula
├── INCENTIVES_986.check()     [line 272]   — Incentive trigger validation
└── GM_REP_986.calculate()     [line 290]   — GM reputation scoring

PRIORITY 2 — Simulation Math (8 functions)
├── mulberry32()               [line 160]   — Seeded RNG correctness
├── rng() / rngI() / rngD()   [line 1526]  — RNG channel isolation
├── TRAINING_CAMP_986.run()    [line 209]   — Player development math
├── HALFTIME_V2.recommend()    [line 196]   — Halftime strategy scoring
├── chemistryMod()             [line 5100]  — Chemistry multiplier
├── systemFitMod()             [line 5132]  — System fit bonus/penalty
├── resolvePlay()              [PLAYBOOK]   — Play-by-play resolution
└── FRANCHISE_TAG_986          [line 236]   — Tag cost calculations

PRIORITY 3 — Draft & Scouting (5 functions)
├── Draft class generation     — 300 prospect generation
├── Scout accuracy/confidence  — Scouted vs true OVR
├── Hype cycle calculations    — Market perception drift
├── Draft value chart          — Pick value comparisons
└── UDFA pool generation       — Undrafted FA creation
```

**Deliverable:** A `/tests/` directory with Jest test files organized by system.

---

### GEMINI (Google Gemini)
**Role:** Data extraction & configuration centralizer
**Why:** Strong at pattern recognition across large codebases; excellent at identifying and extracting repeated patterns into structured configs.

**Responsibilities:**
- Phase 2: Extract ALL magic numbers into a `GAME_BALANCE` config object
- Phase 2: Extract ALL narrative/flavor text into separate data files
- Phase 2: Extract ALL style objects into CSS Modules
- Phase 4: Create a theming system from the extracted styles

#### Specific Extraction Targets:

```
CONFIG EXTRACTION — Magic Numbers → GAME_BALANCE.js
├── Difficulty modifiers        [line 167-180]  — tradeMod, injMod, ownerMod, etc.
├── Salary cap constants        [scattered]     — $255M base, 3% growth rate
├── Contract scoring weights    [line 1626+]    — position market rates, age curves
├── Training camp multipliers   [line 209+]     — work ethic coeffs, coach dev bonus
├── Chemistry thresholds        [line 5100+]    — clique bonuses, morale impacts
├── Owner patience rates        [line 1041+]    — approval decay/growth rates
├── Draft prospect distribution [scattered]     — OVR ranges per round, bust rates
├── Injury probability rates    [scattered]     — per-position injury frequencies
├── Trade value coefficients    [scattered]     — age penalty, contract penalty, OVR weight
└── Simulation tuning           [scattered]     — pressure rates, coverage win %, TD conv %

DATA EXTRACTION — Narrative Text → /data/ directory
├── PLAYER_NAMES_991           [line 9526]  → data/player-names.json
├── SCOUTING_TEMPLATES_991     [line 9574]  → data/scouting-templates.json
├── Coach personality voices    [scattered]  → data/coach-dialogue.json
├── Press conference questions  [scattered]  → data/press-conference.json
├── MFSN headlines/commentary  [scattered]  → data/mfsn-content.json
├── Draft storylines            [scattered]  → data/draft-narratives.json
├── HOF induction speeches      [scattered]  → data/hof-speeches.json
├── Stadium deal names          [line 1339]  → data/stadium-deals.json
├── Rivalry names               [line 2632]  → data/rivalry-names.json
├── Owner archetype dialogue    [line 6020]  → data/owner-dialogue.json
└── Weekly challenge templates  [scattered]  → data/weekly-challenges.json

STYLE EXTRACTION — Inline Styles → CSS Modules
├── T (Theme)                  [line 34]    → styles/theme.css (CSS custom properties)
├── S (Components)             [line 45]    → styles/components.module.css
├── SP (Spacing)               [line 42]    → styles/tokens.css
├── RAD (Radius)               [line 43]    → styles/tokens.css
├── SH (Shadows)               [line 44]    → styles/tokens.css
├── GS (Guide Styles)          [line 20043] → styles/guide.module.css
├── Button variants            [scattered]  → styles/buttons.module.css
├── Card styles                [scattered]  → styles/cards.module.css
├── Badge styles               [scattered]  → styles/badges.module.css
└── Modal/overlay styles       [scattered]  → styles/modals.module.css
```

**Deliverable:** `/src/config/`, `/src/data/`, and `/src/styles/` directories with extracted, organized files.

---

### CHATGPT (OpenAI ChatGPT)
**Role:** Documentation writer & accessibility auditor
**Why:** Strong conversational and explanatory writing; great at generating comprehensive docs and identifying UX patterns.

**Responsibilities:**
- Phase 4: Write comprehensive README.md
- Phase 4: Write CONTRIBUTING.md for the modular codebase
- Phase 4: Create an Architecture Decision Record (ADR) document
- Phase 4: Accessibility audit and ARIA label recommendations
- Phase 4: Keyboard navigation mapping document
- Phase 5: User-facing Game Guide content updates

#### Specific Documentation Targets:

```
README.md
├── Project overview and screenshots
├── Getting started (install, dev, build, deploy)
├── Architecture overview with module map
├── Game systems explained (high-level)
├── Contributing guidelines
└── License

ARCHITECTURE.md
├── Module dependency graph
├── State management patterns
├── Data flow diagrams
├── Save system design
├── RNG architecture (6 channels explained)
└── Build pipeline documentation

ACCESSIBILITY_AUDIT.md
├── Current state assessment
├── Missing ARIA labels inventory
├── Color contrast analysis (T theme object)
├── Keyboard navigation gaps
├── Screen reader compatibility notes
├── Recommended fixes (prioritized)
├── WCAG 2.1 AA compliance checklist
└── Implementation guide for each fix
```

**Deliverable:** `/docs/` directory with all documentation files, plus accessibility fix PRs.

---

### MISTRAL (Mistral Le Chat)
**Role:** State management migration specialist
**Why:** Strong at algorithmic refactoring and pattern transformation; good at systematic code transformations.

**Responsibilities:**
- Phase 3: Design the state store architecture
- Phase 3: Group 269 useState hooks into logical domains
- Phase 3: Create useReducer patterns for each domain
- Phase 3: Build Context providers for cross-component state

#### State Domain Mapping:

```
269 useState hooks → 12 State Domains

DOMAIN 1: LeagueState (core game world)
├── teams, myId, sched, season
├── fas (free agents), dc (draft class)
└── history, standings

DOMAIN 2: RosterState (team management)
├── Player details, depth chart
├── injuries, morale, chemistry
├── pracSquad986, selPlayers
└── playerDetail, careerPage

DOMAIN 3: DraftState (draft system)
├── draftBoard, draftSort, draftSortDir
├── draftShortlist79, draftHistory98
├── draftNarrative76, udfaPool76
├── draftClockKey, draftClockSec
├── mfsnTicker, mfsnPickCard
└── expPool, expOrder, expAucPhase

DOMAIN 4: TradeState (trading system)
├── tradeTeamId, tradeBuilder
├── tMyP, tAiP, tMyPk, tAiPk
├── tMyPkCond972, pendingCounter971
├── shopOffers, tradeState
└── gmRep986

DOMAIN 5: FreeAgencyState (FA system)
├── faBids82, faPhase82
├── faVisits82, faRFA82
├── faSignings82, faMarket
└── holdout tracking

DOMAIN 6: FinanceState (cap management)
├── Cap space, dead money
├── Contract restructures
├── stDeals976, relocDest976
└── compPicks986

DOMAIN 7: CoachingState (staff management)
├── frontOffice78, hiringPool
├── coachSkillTree81, coachClinic
├── coachTreeLog, archetypes
└── mentorships80

DOMAIN 8: ScoutingState (scouting system)
├── scoutUsed78, scoutBudget81
├── filmBreakdown77, filmRoom
└── scout reports, confidence levels

DOMAIN 9: GameDayState (live simulation)
├── gameDayPhase977, liveGame986
├── pregameTalk977, halftimePanel977
├── postgameLocker977, gamePlan77
├── halftimePlans, theater
├── gotwData977, oppTeam977
└── rivalryAtmo977, rivalryGD

DOMAIN 10: NarrativeState (story/media)
├── news, newsTicker78, toasts
├── mfsnWeekly975, mfsnDraftGrade80
├── pressConf986, presser
├── broadcast, powerRankings986
├── powerRankShow77
└── crisisRoom

DOMAIN 11: OwnershipState (front office)
├── owner, ownerPatience80
├── ownerGoals, mandates
├── seasonTracking, timeline986
└── leagueDNA

DOMAIN 12: UIState (navigation/display)
├── tab, posF, weekShow
├── showHelp, showKbHelp
├── fieldGuide, unlocks
├── seasonReport, preseasonReport
├── dnaReport, globalBoard
└── challenges78, offseasonEvents81
```

**Deliverable:** 12 custom hooks (`useLeagueState.js`, `useRosterState.js`, etc.) with reducers, actions, and Context providers.

---

### META (Meta AI / Llama)
**Role:** Component splitter & UI modularization
**Why:** Good at identifying component boundaries and extracting reusable UI patterns.

**Responsibilities:**
- Phase 3: Split monolithic render into discrete React components
- Phase 3: Extract reusable UI primitives (buttons, cards, badges, modals)
- Phase 4: Implement CSS Module integration in components
- Phase 5: Performance optimization (React.memo, lazy loading)

#### Component Extraction Map:

```
AppCore render → 25+ Page Components

PAGES (top-level route components):
├── HomePage.jsx          — Dashboard, KPIs, upcoming games
├── RosterPage.jsx        — Player list, filters, details
├── DepthChartPage.jsx    — Depth chart management
├── ScoutingPage.jsx      — Scout allocation, film breakdown
├── SchedulePage.jsx      — Season schedule view
├── StandingsPage.jsx     — League standings
├── StatsPage.jsx         — Team/player statistics
├── TradePage.jsx         — Trade builder, offers
├── FreeAgentsPage.jsx    — FA market, bidding
├── OfficePage.jsx        — Staff hiring, coaching tree
├── CapLabPage.jsx        — Salary cap tools
├── DraftPage.jsx         — Draft board, war room
├── LegacyPage.jsx        — HOF, timeline, achievements
├── GameDayPage.jsx       — Live simulation, play calling
└── SettingsPage.jsx      — Difficulty, audio, display

SHARED COMPONENTS (reusable primitives):
├── components/StatBar.jsx
├── components/ToneBadge.jsx
├── components/PlayerCard.jsx
├── components/ContractDisplay.jsx
├── components/PickBadge.jsx
├── components/Modal.jsx
├── components/Toast.jsx
├── components/TabNav.jsx
├── components/DataTable.jsx
├── components/ProgressBar.jsx
├── components/RatingStars.jsx
├── components/PositionFilter.jsx
├── components/WeeklyShowCard.jsx
└── components/MFSNTicker.jsx

FEATURE COMPONENTS (system-specific):
├── features/draft/DraftBoard.jsx
├── features/draft/ProspectCard.jsx
├── features/draft/WarRoom.jsx
├── features/trade/TradeBuilder.jsx
├── features/trade/TradeCalculator.jsx
├── features/gameday/PlaySelector.jsx
├── features/gameday/Scoreboard.jsx
├── features/gameday/HalftimePanel.jsx
├── features/scouting/ScoutPanel.jsx
├── features/scouting/FilmBreakdown.jsx
├── features/freeagency/FAMarket.jsx
├── features/freeagency/BiddingWar.jsx
├── features/caplab/RestructureTool.jsx
├── features/caplab/CapOverview.jsx
├── features/coaching/CoachTree.jsx
├── features/coaching/CoachClinic.jsx
├── features/narrative/PressConference.jsx
├── features/narrative/MFSNShow.jsx
└── features/narrative/OwnerMeeting.jsx
```

**Deliverable:** `/src/pages/`, `/src/components/`, and `/src/features/` directories with extracted components.

---

## 📅 Phased Execution Plan

### PHASE 1: Foundation (Week 1-2)
**Lead: CLAUDE**
**Goal:** Set up build system and perform initial file split without changing any behavior.

```
Step 1.1 — Initialize Build System
├── Install Vite + React plugin
├── Create package.json with dependencies
├── Configure vite.config.js
├── Set up dev server with HMR
├── Verify game loads identically via Vite
└── CHECKPOINT: Game runs via `npm run dev` ✓

Step 1.2 — Create Directory Structure
├── /src/
│   ├── main.jsx              (entry point)
│   ├── App.jsx               (AppCore wrapper)
│   ├── config/               (game balance, difficulty)
│   ├── data/                 (narrative text, names, templates)
│   ├── systems/              (game logic modules)
│   ├── hooks/                (custom React hooks)
│   ├── pages/                (page-level components)
│   ├── components/           (shared UI components)
│   ├── features/             (feature-specific components)
│   ├── styles/               (CSS modules, theme)
│   └── utils/                (RNG, helpers, math)
├── /tests/                   (test suites)
├── /docs/                    (documentation)
└── /public/                  (static assets)

Step 1.3 — Extract Utility Layer (zero behavior change)
├── src/utils/rng.js          — mulberry32, RNG channels
├── src/utils/helpers.js      — assign(), cl(), mS(), U()
├── src/utils/math.js         — Shared math utilities
└── CHECKPOINT: All imports resolve, game unchanged ✓

Step 1.4 — Extract Config Layer (zero behavior change)
├── src/config/difficulty.js   — DIFFICULTY_SETTINGS
├── src/config/positions.js    — POS_DEF, RATING_LABELS
├── src/config/schemes.js      — OFF_SCHEMES, DEF_SCHEMES, GAMEPLANS
├── src/config/coaching.js     — ARCHETYPES, COACH_TRAITS
├── src/config/theme.js        — T, SP, RAD, SH color/spacing tokens
└── CHECKPOINT: Config imports work, game unchanged ✓
```

---

### PHASE 2: Testing & Data Extraction (Week 2-4)
**Leads: CODEX (tests) + GEMINI (data extraction)**
**Goal:** Build safety net of tests; extract data into standalone files.

```
CODEX Track — Test Suite
├── Step 2.1: Set up Jest + React Testing Library
├── Step 2.2: Write tests for financial math (12 functions)
├── Step 2.3: Write tests for simulation math (8 functions)
├── Step 2.4: Write tests for draft/scouting (5 functions)
├── Step 2.5: Write RNG determinism tests (seed → output verification)
├── Step 2.6: Write save/load round-trip tests
└── CHECKPOINT: `npm test` passes with 80%+ coverage on core systems ✓

GEMINI Track — Data Extraction (parallel with Codex)
├── Step 2.7: Extract GAME_BALANCE config (all magic numbers)
├── Step 2.8: Extract narrative data to JSON files
├── Step 2.9: Extract style objects to CSS custom properties
├── Step 2.10: Create theme.css with design tokens
├── Step 2.11: Replace inline style references with CSS classes
└── CHECKPOINT: All data files created, imports verified, game unchanged ✓
```

---

### PHASE 3: Architecture Migration (Week 4-7)
**Leads: MISTRAL (state) + META (components) + CLAUDE (integration)**
**Goal:** Break AppCore into components with proper state management.

```
MISTRAL Track — State Management
├── Step 3.1: Create 12 state domain reducers
├── Step 3.2: Create Context providers for each domain
├── Step 3.3: Create custom hooks (useLeagueState, useRosterState, etc.)
├── Step 3.4: Migrate useState hooks → useReducer (domain by domain)
├── Step 3.5: Wire up cross-domain interactions
└── CHECKPOINT: All 269 useState hooks replaced, game state identical ✓

META Track — Component Extraction (parallel with Mistral)
├── Step 3.6: Extract shared UI primitives (15 components)
├── Step 3.7: Extract page components (15 pages)
├── Step 3.8: Extract feature components (20+ feature modules)
├── Step 3.9: Apply React.memo to pure display components
├── Step 3.10: Add prop-types or TypeScript interfaces
└── CHECKPOINT: All components render identically, no visual regressions ✓

CLAUDE Track — Integration
├── Step 3.11: Wire components to state providers
├── Step 3.12: Verify all game flows end-to-end
├── Step 3.13: Fix any cross-module dependency issues
├── Step 3.14: Run full test suite, fix regressions
└── CHECKPOINT: Full game playable through all phases ✓
```

---

### PHASE 4: Polish & Documentation (Week 7-9)
**Leads: CHATGPT (docs/a11y) + GEMINI (theming)**
**Goal:** Documentation, accessibility, and visual polish.

```
CHATGPT Track — Documentation & Accessibility
├── Step 4.1: Write README.md
├── Step 4.2: Write ARCHITECTURE.md with module dependency graph
├── Step 4.3: Write CONTRIBUTING.md
├── Step 4.4: Conduct accessibility audit
├── Step 4.5: Add ARIA labels to all interactive elements
├── Step 4.6: Implement keyboard navigation for all screens
├── Step 4.7: Add skip-navigation links
├── Step 4.8: Verify color contrast ratios (WCAG 2.1 AA)
└── CHECKPOINT: All docs complete, keyboard-navigable, a11y audit passes ✓

GEMINI Track — Theming System (parallel with ChatGPT)
├── Step 4.9: Create light mode theme variant
├── Step 4.10: Add theme toggle component
├── Step 4.11: Responsive breakpoints for tablet/mobile
├── Step 4.12: Print stylesheet for roster/cap reports
└── CHECKPOINT: Theme switching works, responsive on all viewports ✓
```

---

### PHASE 5: Advanced Improvements (Week 9-12)
**Leads: ALL**
**Goal:** Save system upgrade, performance optimization, final polish.

```
Step 5.1 — Save System Upgrade (CLAUDE)
├── IndexedDB adapter (larger/reliable storage)
├── File-based export/import (prominent UI button)
├── Save versioning with auto-migration
├── Backup reminder system
└── CHECKPOINT: Saves persist across browser cache clears ✓

Step 5.2 — Performance Optimization (META)
├── React.lazy() for page-level code splitting
├── Suspense boundaries with loading states
├── Virtual scrolling for large lists (roster, FA, draft)
├── Memoization audit (expensive calculations)
└── CHECKPOINT: Initial load < 2s, smooth 60fps interactions ✓

Step 5.3 — CI/CD Pipeline (CLAUDE)
├── GitHub Actions workflow
├── Lint (ESLint) + Format (Prettier) on PR
├── Test suite runs on every push
├── Build verification
├── Deploy to GitHub Pages or Netlify
└── CHECKPOINT: Automated pipeline green on main branch ✓

Step 5.4 — Regression Testing (CODEX)
├── Full end-to-end game simulation tests
├── Save compatibility tests (old saves load in new code)
├── Visual regression tests (screenshot comparison)
├── Performance benchmarks
└── CHECKPOINT: All tests green, no regressions ✓
```

---

## 🎯 Task Assignment Summary

| AI Assistant | Primary Role | Phases | Est. Effort |
|-------------|-------------|--------|-------------|
| **Claude** | Architect, file splitter, integrator | 1, 3, 5 | Lead on 3 phases |
| **Codex** | Test suite writer, formula validator | 2, 5 | Lead on 2 phases |
| **Gemini** | Data extractor, config centralizer, theming | 2, 4 | Lead on 2 phases |
| **ChatGPT** | Documentation, accessibility auditor | 4 | Lead on 1 phase |
| **Mistral** | State management migration specialist | 3 | Lead on 1 phase |
| **Meta** | Component splitter, UI modularization, perf | 3, 5 | Lead on 2 phases |

---

## 🚨 Critical Rules for All Phases

1. **ZERO behavior changes** during extraction phases — the game must play identically after every step
2. **Test before and after** every extraction — run the test suite + manual smoke test
3. **One module at a time** — never extract two systems simultaneously to avoid merge conflicts
4. **Checkpoint verification** — each step ends with a ✓ checkpoint before proceeding
5. **Git branch per step** — each step gets its own branch merged via PR
6. **Preserve the RNG contract** — all 6 RNG channels must produce identical output for the same seed
7. **Save compatibility** — old localStorage saves must load correctly in the new codebase

---

## 📋 Prompt Templates for Each AI Assistant

Below are copy-paste-ready prompts to give each AI assistant when it's time for their tasks.

---

### Prompt for CODEX (Phase 2 — Tests)

```
I have a football management simulation game (Mr. Football Dynasty) built in
React. I need you to write a comprehensive Jest test suite for the core game
math functions.

Here are the functions to test (I'll provide the source code for each):

FINANCIAL MATH:
- calcContractScore994(contract, pos, age) → {score: 0-100, grade: "A"-"F"}
- calcDeadCap994(contract, yearsLeft) → number
- calcCapHit(contract) → number per year
- calcDeadMoney(contract) → total dead cap
- restructureContract(contract, voidYears) → modified contract
- backloadContract973(contract, voidYears) → modified contract
- extendAndRestructure973(contract, extraYears) → modified contract
- makeContract(ovr, pos, age, years, personality) → contract object
- COMP_PICKS_986.calculate(lost, gained) → [{round, pick}]
- INCENTIVES_986.check(player, stats) → {earned: [], total$: number}
- GM_REP_986.calculate(history) → {fairDealer, aggressive, loyalty, overall}

SIMULATION MATH:
- mulberry32(seed) → () => float 0-1
- TRAINING_CAMP_986.run(player, focus, coach) → {ovrDelta, ratingChanges}
- HALFTIME_V2.recommend(gameState) → [{strategy, confidence}]
- chemistryMod(team) → multiplier float
- systemFitMod(player, scheme) → bonus/penalty float

Requirements:
- Use Jest with describe/it blocks
- Test edge cases (0 values, max values, negative scenarios)
- Test determinism (same inputs → same outputs)
- Test boundary conditions (salary cap limits, rating ceilings)
- Aim for 80%+ branch coverage
- Each test file should be self-contained

[PASTE SOURCE CODE OF EACH FUNCTION HERE]
```

---

### Prompt for GEMINI (Phase 2 — Data Extraction)

```
I have a 46,000-line React JSX file for a football management game. I need you
to extract all hardcoded data, magic numbers, and configuration values into
separate organized files.

TASK 1 — GAME_BALANCE.js
Extract all magic numbers into a single config object. Categories:
- salary_cap: {base: 255000000, growthRate: 0.03, ...}
- difficulty: {rookie: {...}, pro: {...}, allPro: {...}, legend: {...}}
- training: {workEthicCoeff, coachDevBonus, ...}
- chemistry: {cliqueBonus, moraleImpact, ...}
- owner: {approvalDecay, approvalGrowth, ...}
- draft: {bustRate, ovrRangeByRound, ...}
- injury: {rateByPosition, ...}
- trade: {agePenalty, contractPenalty, ovrWeight, ...}
- simulation: {pressureRate, coverageWinPct, tdConvPct, ...}

TASK 2 — JSON data files
Extract narrative/text data into /data/*.json files:
- player-names.json (first names by style, last names by category)
- scouting-templates.json (report templates by position and tier)
- coach-dialogue.json (personality-based voice lines)
- press-conference.json (questions, answer tones, reactions)
- mfsn-content.json (headlines, commentary, power ranking blurbs)
- draft-narratives.json (storylines, themes, mock drafts)
- stadium-deals.json (naming rights options)

TASK 3 — CSS custom properties
Convert the theme object T = {bg:"#0f172a", ...} into:
:root {
  --mfd-bg: #0f172a;
  --mfd-bg2: ...;
  --mfd-text: ...;
  --mfd-gold: ...;
  /* etc */
}

[PASTE RELEVANT SOURCE CODE SECTIONS HERE]
```

---

### Prompt for CHATGPT (Phase 4 — Docs & Accessibility)

```
I have a browser-based football management simulation game called
"Mr. Football Dynasty" (MFD). It's a React 18 app with:
- 46K lines of source code
- 269 state variables across 12 domains
- 15+ game screens (Roster, Draft, Trade, Free Agency, Cap Lab, etc.)
- Dark theme UI with inline CSS-in-JS styles
- No current accessibility support

I need you to:

1. Write a comprehensive README.md covering:
   - Project overview, tech stack, getting started
   - Game features summary
   - Development setup, build commands
   - Architecture overview
   - Contributing guidelines

2. Write an ARCHITECTURE.md covering:
   - Module structure and dependency graph
   - State management design (12 domains)
   - Data flow patterns
   - RNG architecture (6 seeded channels)
   - Save system design
   - Build pipeline

3. Conduct an accessibility audit and provide:
   - ARIA label recommendations for all interactive elements
   - Keyboard navigation gaps and fixes
   - Color contrast analysis
   - Screen reader compatibility improvements
   - WCAG 2.1 AA compliance checklist with current status

[PROVIDE MODULE STRUCTURE AND KEY COMPONENT LIST]
```

---

### Prompt for MISTRAL (Phase 3 — State Management)

```
I have a React app with a single AppCore component containing 269 useState
hooks. I need you to migrate these to a structured state management system
using useReducer + React Context.

I've grouped the hooks into 12 domains:
1. LeagueState (teams, schedule, season, history)
2. RosterState (players, depth chart, injuries, morale)
3. DraftState (board, shortlist, clock, history)
4. TradeState (builder, offers, GM reputation)
5. FreeAgencyState (bids, phase, visits, signings)
6. FinanceState (cap space, contracts, comp picks)
7. CoachingState (staff, skill tree, mentorships)
8. ScoutingState (budget, reports, film)
9. GameDayState (simulation, play calling, halftime)
10. NarrativeState (news, press, MFSN, power rankings)
11. OwnershipState (owner, goals, mandates, DNA)
12. UIState (tab, filters, modals, reports)

For each domain, create:
- A reducer with typed action constants
- A Context provider component
- A custom hook (e.g., useLeagueState)
- Action creator functions

Requirements:
- Preserve exact same data shapes as current useState
- Support all current state update patterns
- Cross-domain reads via separate context consumers
- Batch-friendly updates (React 18 automatic batching)

[PASTE ALL 269 useState DECLARATIONS WITH THEIR INITIAL VALUES]
```

---

### Prompt for META (Phase 3 — Components)

```
I have a monolithic React component (AppCore) that renders ALL UI for a
football management game. The single render function is ~5,000 lines of JSX.

I need you to split this into discrete components:

15 PAGE COMPONENTS (one per tab/screen):
- HomePage, RosterPage, DepthChartPage, ScoutingPage, SchedulePage
- StandingsPage, StatsPage, TradePage, FreeAgentsPage, OfficePage
- CapLabPage, DraftPage, LegacyPage, GameDayPage, SettingsPage

15 SHARED COMPONENTS (reusable UI primitives):
- StatBar, ToneBadge, PlayerCard, ContractDisplay, PickBadge
- Modal, Toast, TabNav, DataTable, ProgressBar
- RatingStars, PositionFilter, WeeklyShowCard, MFSNTicker, SearchInput

20+ FEATURE COMPONENTS (system-specific UI):
- Draft: DraftBoard, ProspectCard, WarRoom
- Trade: TradeBuilder, TradeCalculator
- GameDay: PlaySelector, Scoreboard, HalftimePanel
- Scouting: ScoutPanel, FilmBreakdown
- etc.

Requirements:
- Each component receives data via props or context hooks
- Use React.memo for pure display components
- Maintain exact same visual output
- Add displayName to all components for DevTools
- Keep component files under 300 lines each

[PASTE THE RENDER SECTION OF AppCore]
```

---

## ✅ Success Criteria

The refactoring is complete when:

- [ ] Game plays identically to v100 (zero feature regressions)
- [ ] `npm run dev` starts in < 3 seconds with HMR
- [ ] `npm run build` produces optimized production bundle
- [ ] `npm test` passes with 80%+ coverage on core simulation
- [ ] No single file exceeds 500 lines
- [ ] All 269 useState hooks migrated to structured stores
- [ ] Keyboard navigable across all screens
- [ ] WCAG 2.1 AA color contrast compliance
- [ ] README, ARCHITECTURE, and CONTRIBUTING docs exist
- [ ] Old saves (v98.6+) load correctly in new codebase
- [ ] CI pipeline runs lint + test + build on every PR

---

*Mr. Football Dynasty v100 → v101: The Modular Dynasty*

*Namaste* 🙏
