# CODEX HANDOFF BIBLE — Mr. Football Dynasty v101 Modularization

## What You're Walking Into

Mr. Football Dynasty (MFD) is a 46,127-line single-file React football management sim. We're breaking it into ~50 clean modules. **Phase 1 is done** — I (Claude) set up Vite, extracted 15 core modules, wrote 34 passing validation tests, and verified the build. The original game still works untouched.

You (Codex) are now my partner on this. It's just us two for a while, so I've reassigned the full plan between us. Read this whole doc before you start.

---

## Repo Layout (After Phase 1)

```
mr-football-dynasty/
├── mr-football-dynasty/          ← ORIGINAL GAME (DO NOT TOUCH)
│   ├── index.html                   original entry point
│   ├── game.js                      original compiled game
│   ├── react.min.js                 bundled React
│   └── react-dom.min.js            bundled ReactDOM
├── mr-football-v100.jsx          ← THE MONOLITH (46,127 lines — source of truth)
├── GAME_PLAN.md                  ← Master plan doc
├── CODEX_HANDOFF.md              ← THIS FILE (you are here)
│
├── index.html                    ← NEW Vite entry point
├── package.json                  ← Vite 6 + React 18 + Vitest
├── vite.config.js
├── .gitignore
│
├── src/
│   ├── main.jsx                  ← Vite entry, module validation on boot
│   ├── utils/
│   │   ├── index.js              ← barrel export
│   │   ├── rng.js                ← mulberry32, 6 RNG channels, pick/U
│   │   └── helpers.js            ← assign, mS, cl, sum, avg
│   ├── config/
│   │   ├── index.js              ← barrel export
│   │   ├── theme.js              ← T, SP, RAD, SH, S (colors/styles)
│   │   ├── difficulty.js         ← DIFF_SETTINGS (4 tiers), SAVE_VERSION
│   │   └── cap-math.js           ← CAP_MATH, getSalaryCap, getMinSalary
│   ├── systems/
│   │   ├── index.js              ← barrel export
│   │   ├── halftime.js           ← HALFTIME_V2 (6 tactical options)
│   │   ├── training-camp.js      ← TRAINING_CAMP_986
│   │   ├── franchise-tag.js      ← FRANCHISE_TAG_986 (3 tag types)
│   │   ├── comp-picks.js         ← COMP_PICKS_986.calculate()
│   │   ├── incentives.js         ← INCENTIVES_986 (7 types + check())
│   │   ├── gm-reputation.js      ← GM_REP_986 (3 axes + labels)
│   │   ├── coach-carousel.js     ← COACH_CAROUSEL_986 (fired pool)
│   │   └── contracts.js          ← makeContract, calcCapHit, calcDeadMoney,
│   │                                restructureContract, backloadContract973,
│   │                                extendAndRestructure973, calcContractScore994,
│   │                                calcDeadCap994, calcFourthDownEV995
│   ├── data/                     ← EMPTY (your territory — JSON data files)
│   ├── components/               ← EMPTY (future: shared UI components)
│   ├── features/                 ← EMPTY (future: feature components)
│   ├── hooks/                    ← EMPTY (future: state management hooks)
│   ├── pages/                    ← EMPTY (future: page components)
│   └── styles/                   ← EMPTY (future: CSS modules)
│
├── tests/
│   └── phase1-validation.js      ← 34 passing module tests (node ESM)
│
├── docs/                         ← EMPTY (future: documentation)
└── public/                       ← EMPTY (future: static assets)
```

---

## Branch & Git Rules

**Branch:** `claude/game-review-feedback-alXYq`
- All work goes on this branch
- Commit often with descriptive messages
- Always end commit messages with the session URL line

**Never:**
- Touch anything under `mr-football-dynasty/` (the original game subfolder)
- Force push
- Delete or rename `mr-football-v100.jsx` (it's the source of truth until fully decomposed)

---

## The Two-Team Plan (Claude + Codex)

### What Changed From the Original 6-AI Plan

Originally there were 6 AIs. Now it's just us two. Here's how I redistributed:

| Original AI | Original Role | Now Assigned To |
|-------------|--------------|-----------------|
| Claude | Architect, file splitting, integration | **Claude** (unchanged) |
| Codex | Test suites, formula validation | **Codex** (expanded — see below) |
| Gemini | Data extraction, config centralization | **Codex** (data extraction) + **Claude** (config) |
| Mistral | State management migration | **Claude** (later phase) |
| Meta | Component splitting, UI modularization | **Claude** (later phase) |
| ChatGPT | Documentation, accessibility | **Claude** (later phase) |

### Your Assignments, Codex (in priority order):

#### TRACK A: Test Suite (Your Core Strength)
Write comprehensive Vitest test suites for all extracted modules. These tests are our safety net — nothing else can proceed until we have them.

#### TRACK B: Data Extraction (Formerly Gemini's Job)
Extract all narrative text, player names, scouting templates, and dialogue from the monolith into structured JSON files under `src/data/`.

#### TRACK C: Additional Financial/Sim Tests
Once Tracks A and B are done, write deeper tests for the simulation engine functions that are still inside the monolith (I'll extract them and you test them).

### My Assignments, Claude:

#### Continuing extraction from the monolith:
- Position definitions (POS_DEF)
- Offensive/defensive schemes
- Player generation engine
- Draft system
- Trade AI
- Game simulation engine
- Save/load system
- All UI components (Phase 3+)
- State management migration (Phase 3+)
- Documentation (Phase 4)

---

## TRACK A: Test Suite — Detailed Instructions

### Setup

The project already has Vitest in `devDependencies`. Tests go in `/tests/` using this pattern:

```
tests/
├── phase1-validation.js          ← EXISTS (34 basic checks)
├── rng.test.js                   ← YOU WRITE THIS
├── helpers.test.js               ← YOU WRITE THIS
├── contracts.test.js             ← YOU WRITE THIS
├── cap-math.test.js              ← YOU WRITE THIS
├── difficulty.test.js            ← YOU WRITE THIS
├── halftime.test.js              ← YOU WRITE THIS
├── training-camp.test.js         ← YOU WRITE THIS
├── comp-picks.test.js            ← YOU WRITE THIS
├── incentives.test.js            ← YOU WRITE THIS
├── gm-reputation.test.js         ← YOU WRITE THIS
├── coach-carousel.test.js        ← YOU WRITE THIS
└── franchise-tag.test.js         ← YOU WRITE THIS
```

### Test File Template

```js
import { describe, it, expect } from 'vitest';
import { functionName } from '../src/systems/module-name.js';

describe('ModuleName', () => {
  describe('functionName', () => {
    it('handles normal case', () => {
      expect(functionName(input)).toBe(expectedOutput);
    });

    it('handles edge case: zero values', () => {
      // ...
    });

    it('handles edge case: max values', () => {
      // ...
    });

    it('handles edge case: null/undefined inputs', () => {
      // ...
    });
  });
});
```

### Priority 1: RNG Tests (`tests/rng.test.js`)

Test these functions from `src/utils/rng.js`:

```
mulberry32(seed)        → Returns a function that produces floats in [0, 1)
setSeed(s)              → Resets all 6 RNG channels
reseedWeek(yr, wk)      → Reseeds play/injury/ai/dev/trade channels
reseedSeason(yr)        → Reseeds draft channel
rng(a, b)               → Random int in [a, b] using RNG.play
rngI(a, b)              → Random int using RNG.injury
rngD(a, b)              → Random int using RNG.draft
rngAI(a, b)             → Random int using RNG.ai
rngT(a, b)              → Random int using RNG.trade
rngDev(a, b)            → Random int using RNG.dev
pick(array)             → Random element using RNG.play
pickD(array)            → Random element using RNG.draft
U()                     → Deterministic unique ID string using RNG.ui
```

**Critical tests to include:**
1. **Determinism:** Same seed → same sequence, every time, for every channel
2. **Range:** mulberry32 output is always in [0, 1), never negative, never >= 1
3. **Distribution:** Over 10,000 samples, mean should be ~0.5 (±0.05)
4. **Channel isolation:** Calling RNG.play() does not affect RNG.draft() sequence
5. **Reseed consistency:** reseedWeek(2026, 5) always produces same play channel
6. **rng(a, b) range:** Output is always in [a, b] inclusive, for various a/b
7. **pick() correctness:** Returns element from array, never undefined
8. **U() uniqueness:** 1000 IDs have no duplicates

### Priority 2: Contract Tests (`tests/contracts.test.js`)

Test these functions from `src/systems/contracts.js`:

```
makeContract(salary, years, signingBonus, guaranteed)
  → {baseSalary, years, signingBonus, prorated, guaranteed, restructured, originalYears, salary}

calcCapHit(contract)
  → baseSalary + prorated (or contract.salary for legacy format)

calcDeadMoney(contract)
  → prorated * years

restructureContract(player)
  → {ok, savings, addedPro, years, newHit, msg} or {ok:false, msg}

backloadContract973(player, voidYears)
  → {ok, savings, voidYears, newHit, msg} or {ok:false, msg}

extendAndRestructure973(player, addYears)
  → {ok, msg, savings, addedYears, newHit} or {ok:false, msg}

calcContractScore994(ovr, pos, age, years, totalValue, capTotal)
  → {score: 0-100, grade: "A+"|"A"|"B"|"C"|"D"|"F", surplus, annualCapPct, fairValue}

calcDeadCap994(totalGuaranteed, yearsRemaining, yearsCut)
  → {deadCapHit, capSavings, netCapImpact}

calcFourthDownEV995(yards, fieldPos, score, quarter, timeLeft)
  → {goForIt: {ev}, fieldGoal: {ev, applicable}, punt: {ev}, recommendation, confidence}
```

**Critical tests to include:**
1. **makeContract math:** prorated = signingBonus / years, salary = baseSalary + prorated
2. **MIN_SALARY floor:** salary never goes below 0.5
3. **restructureContract guards:** Fails on 1-year deals, already-restructured, low base salary
4. **restructureContract math:** Verify savings = oldHit - newHit, prorated increases correctly
5. **backloadContract973 guards:** Fails on 1-year deals, already-backloaded
6. **backloadContract973 math:** converted = baseSalary * 0.4, spread over years + voidYears
7. **extendAndRestructure973:** Extends years, applies raise, then restructures
8. **calcDeadCap994 math:** deadCapHit = guaranteed * remainingAfterCut / yearsRemaining
9. **calcFourthDownEV995:** 4th-and-1 at the 50 recommends "go", 4th-and-15 from own 20 recommends "punt"
10. **Edge cases:** 0 salary, 0 years, null contracts, max void years

### Priority 3: Cap Math Tests (`tests/cap-math.test.js`)

Test from `src/config/cap-math.js`:

```
getSalaryCap(year)   → floor(255 * 1.05^(year - 2026))
getCapFloor(year)    → floor(getSalaryCap(year) * 0.9)
getMinSalary(yoe)    → 0.795 (rookie), 1.125 (1-3 yoe), 1.21 (4+ yoe)
```

### Priority 4: Game Systems Tests

For each of these, write 5-10 focused tests:

- **halftime.test.js:** `HALFTIME_V2.recommend()` returns correct strategy for each score differential scenario. Verify all 6 options have required properties.
- **comp-picks.test.js:** Test 0 losses, 1 loss, 4+ losses (max 4 picks), OVR thresholds for round assignment.
- **incentives.test.js:** Test each incentive type triggers correctly, test no incentives, test partial hits.
- **gm-reputation.test.js:** Test empty log, test with trades/signings, test trust averaging, test label boundaries.
- **coach-carousel.test.js:** Test fire, test pool max size (20), test coach data preservation.
- **franchise-tag.test.js:** Verify 3 types exist with correct salary multipliers.
- **training-camp.test.js:** Hard to unit test in isolation (depends on POS_DEF and calcOvr which are still in monolith). Write structural tests for now — verify focuses array, verify run() is a function that accepts (team, focus, rng).
- **helpers.test.js:** Test assign, mS, sum, avg with normal and edge cases.
- **difficulty.test.js:** Verify all 4 tiers have all required keys, verify value relationships (legend > allpro > pro > rookie for injMod, etc.).

---

## TRACK B: Data Extraction — Detailed Instructions

The monolith contains thousands of lines of narrative text that should live in JSON files under `src/data/`. Here's exactly what to extract and where to find it:

### File 1: `src/data/fa-narrative.json`
**Source:** `mr-football-v100.jsx`, search for `var FA_NARRATIVE_993`
**Location:** ~line 327
**Structure:** Object with arrays of template strings containing `[PLAYER]`, `[TEAM]`, `[YEARS]`, `[AMOUNT]` placeholders.
**Keys:** `bigSigning`, `biddingWar`, `playerHoldout`, `marketUpdate`, `quietPeriodOver`, `bustedSigning`, `veteranRelease`

### File 2: `src/data/press-conference.json`
**Source:** Search for `var PRESS_CONFERENCE_993`
**Location:** ~line 328-329
**Structure:** `{questions: {topic: [{text, tone}]}, answers: {topic: [{text, tone, moraleEffect, ownerEffect, mediaEffect}]}, mediaReaction: [strings]}`

### File 3: `src/data/locker-room.json`
**Source:** Search for `var LOCKER_ROOM_994`
**Location:** ~line 332-475+
**Structure:** Deeply nested object with `newArrival`, `tradeAway`, `chemistry`, `coachClash` sections, each containing arrays of template strings.

### File 4: `src/data/coach-player-voice.json`
**Source:** Search for `var COACH_PLAYER_VOICE_994`
**Location:** After LOCKER_ROOM_994
**Structure:** Object with personality-based voice lines and synergy quotes.

### File 5: `src/data/mfsn-drives.json`
**Source:** Search for `var MFSN_DRIVES_994`
**Location:** After COACH_PLAYER_VOICE_994
**Structure:** Broadcasting commentary lines organized by game situation (momentum, scoring, turnovers).

### How To Extract

For each data block:

1. Find the `var VARNAME = { ... };` in `mr-football-v100.jsx`
2. Copy the data structure (just the value, not the `var` declaration)
3. Convert to valid JSON (quote all keys, remove trailing commas, escape special chars)
4. Save as the corresponding `.json` file under `src/data/`
5. The original monolith stays unchanged — we'll wire imports later

**Important:** These are READ-ONLY extractions. Do NOT modify `mr-football-v100.jsx`. The JSON files are copies we'll use when the modular code replaces the monolith.

---

## What NOT To Do

1. **Don't touch `mr-football-v100.jsx`** — it's the running game. Extract FROM it, never edit it.
2. **Don't touch `mr-football-dynasty/`** subfolder — that's the deployed original game.
3. **Don't change any existing extracted module** in `src/` unless you find a bug (and if you do, note it clearly in your commit message).
4. **Don't install new dependencies** without noting it. Vitest is already there. You shouldn't need anything else for testing.
5. **Don't worry about TypeScript** — this codebase is plain JS and will stay that way for now.

---

## How To Run Things

```bash
# Install dependencies (already done, but just in case)
npm install

# Run existing validation tests
node tests/phase1-validation.js

# Run vitest tests (once you write them)
npm test                    # single run
npm run test:watch          # watch mode

# Build check
npm run build               # should complete in <1s with 0 errors
```

---

## The Monolith Map (What's Left — For Context)

Here's what's still inside `mr-football-v100.jsx` that I'll be extracting in parallel while you write tests. You don't need to extract these — just know they exist:

| Line Range | What's There | Status |
|-----------|-------------|--------|
| 1-32 | React bootstrap, crash handler | Not yet extracted |
| 34-74 | Theme (T, SP, RAD, SH, S) | **EXTRACTED** → `src/config/theme.js` |
| 76-159 | StatBar, ToneBadge, WeeklyShowCard components | Not yet extracted |
| 160-166 | RNG system | **EXTRACTED** → `src/utils/rng.js` |
| 167-183 | Difficulty settings | **EXTRACTED** → `src/config/difficulty.js` |
| 187-323 | v98.6 systems (Halftime, Training, Tags, etc.) | **EXTRACTED** → `src/systems/*.js` |
| 327-1500 | Narrative text (FA, Press Conf, Locker Room, etc.) | **YOUR JOB** → Track B |
| 1526-1835 | Financial math, contracts | **EXTRACTED** → `src/systems/contracts.js` |
| 1836-5000 | More game logic (trades, draft value, schemes) | Claude will extract |
| 5000-9500 | Simulation engine, game day, coaching | Claude will extract |
| 9500-19940 | Player gen, names, scouting, draft class gen | Claude will extract |
| 19944-46127 | AppCore (269 useState + 25K lines of JSX) | Phase 3 (later) |

---

## Acceptance Criteria

Your work is done when:

- [ ] `npm test` runs 12+ test files with 150+ individual tests
- [ ] Every exported function from `src/utils/` and `src/systems/` has test coverage
- [ ] RNG determinism is proven across all 6 channels
- [ ] Contract math edge cases are covered (0 values, max values, null inputs)
- [ ] 5+ JSON data files exist in `src/data/` with valid JSON
- [ ] All tests pass on a fresh `npm install && npm test`
- [ ] No changes to existing source files (only new files added)

---

## Communication Protocol

After you finish each test file or data extraction file:
1. Commit with a clear message: `test: add rng.test.js — 28 tests, all passing`
2. Or for data: `data: extract FA_NARRATIVE_993 → src/data/fa-narrative.json`
3. Push to `claude/game-review-feedback-alXYq`
4. I'll integrate and continue extraction from my end

---

*Welcome to the team. Let's break this monolith apart.*

*— Claude (Architect)*
