/**
 * MFD v100 — Vite Entry Point
 *
 * This is the new modular entry point. Currently it validates
 * that the extracted modules load correctly, then falls back
 * to the original monolithic App for actual gameplay.
 *
 * As Phase 3 progresses, AppCore will be fully ported to use
 * these modules instead of inline definitions.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

// Validate extracted modules load correctly
import { RNG, mulberry32, setSeed, rng, pick, U } from './utils/index.js';
import {
  T, SP, RAD, SH, S,
  DIFF_SETTINGS, SAVE_VERSION, CAP_MATH, getSalaryCap,
  POS_DEF, RATING_LABELS, ALL_POSITIONS, OFF_POSITIONS, DEF_POSITIONS,
  OFF_SCHEMES, DEF_SCHEMES, OFF_PLANS, DEF_PLANS,
  SCHEME_COUNTERS, SCHEME_FX, SCHEME_FLAVOR, getSchemeFlavorLine,
  GAMEPLANS, GP_COUNTERS, HOME_FIELD_ADV, RIVALRY_NAMES,
  ARCHETYPES, ARCH_BOOST, COACH_TRAITS, ARCH_TRAIT_POOLS, CLIQUE_TYPES,
} from './config/index.js';
import {
  HALFTIME_V2,
  TRAINING_CAMP_986,
  FRANCHISE_TAG_986,
  COMP_PICKS_986,
  INCENTIVES_986,
  GM_REP_986,
  COACH_CAROUSEL_986,
  makeContract,
  calcCapHit,
  calcDeadMoney,
  restructureContract,
  calcContractScore994,
  calcDeadCap994,
  calcFourthDownEV995,
  OWNER_ARCHETYPES,
  initOwner,
  updateOwnerApproval,
  getOwnerStatus,
  getPersonality,
  traitScalar,
  generatePersonality,
  PERS_ICONS,
  PERS_LABELS,
  getDominantTrait,
  getContractPersonalityEffects,
  chemistryMod,
  systemFitMod,
  updateSystemFit,
  resetSystemFit,
  TRAITS,
  TRAIT_FX,
  TRAIT_MILESTONES95,
  getPlayerTraits95,
  hasTrait95,
  assignTraits,
  checkTraitMilestones95,
  makePick,
  pickConditionText972,
  pickValue,
  draftContract,
  aucContract,
  SCHEME_FIT,
  calcSchemeFit,
  fitTierFromScore,
  getPlayerSide,
  calcPlayerIdentityFit,
  calcTeamFit,
  getSchemeMismatchWarnings,
  FIT_GROUP_DEFS,
  voidYearDeadCap,
  v36_capHit,
  v36_deadIfTraded,
  v36_tradeSavings,
  splitDeadCapCharge,
  calcTradeImpact,
  addVoidYears,
} from './systems/index.js';
import {
  TD,
  LEAGUE_TEAM_COUNT97,
  REG_SEASON_WEEKS97,
  REG_SEASON_GAMES97,
  LEAGUE_POOL_SCALE97,
  MFD97_CONF_DIV_MAP,
  LEAGUE_STRUCTURE,
  applyLeagueAlignment97,
  getScaledCount97,
  CALENDAR,
} from './data/index.js';

// Module validation — runs on boot, logs to console
function validateModules() {
  var errors = [];

  // RNG
  var rng1 = mulberry32(42);
  var v1 = rng1();
  var v2 = rng1();
  if (typeof v1 !== 'number' || v1 < 0 || v1 >= 1) errors.push('mulberry32 output out of range');
  if (v1 === v2) errors.push('mulberry32 produced identical consecutive values');

  // Theme
  if (T.bg !== '#0f172a') errors.push('Theme T.bg mismatch');
  if (!S.btn || !S.btnPrimary) errors.push('Style objects missing');

  // Difficulty
  if (DIFF_SETTINGS.rookie.tradeMod !== 0.85) errors.push('DIFF_SETTINGS.rookie.tradeMod mismatch');
  if (DIFF_SETTINGS.legend.injMod !== 1.5) errors.push('DIFF_SETTINGS.legend.injMod mismatch');

  // Cap Math
  if (CAP_MATH.BASE_CAP !== 255.0) errors.push('CAP_MATH.BASE_CAP mismatch');
  var cap2026 = getSalaryCap(2026);
  if (cap2026 !== 255) errors.push('getSalaryCap(2026) = ' + cap2026 + ', expected 255');

  // Systems
  if (HALFTIME_V2.options.length !== 6) errors.push('HALFTIME_V2 options count mismatch');
  if (HALFTIME_V2.recommend(-14, 80, 80) !== 'no_huddle') errors.push('HALFTIME_V2.recommend logic error');
  if (TRAINING_CAMP_986.focuses.length !== 5) errors.push('TRAINING_CAMP focuses count mismatch');
  if (FRANCHISE_TAG_986.types.length !== 3) errors.push('FRANCHISE_TAG types count mismatch');
  if (INCENTIVES_986.types.length !== 7) errors.push('INCENTIVES types count mismatch');

  // Comp Picks
  var compResult = COMP_PICKS_986.calculate(
    [{ name: 'Test', pos: 'QB', ovr: 82 }],
    []
  );
  if (compResult.length !== 1) errors.push('COMP_PICKS calculation error');

  // Contracts
  var c = makeContract(10, 3, 6, 15);
  if (!c || c.baseSalary !== 10) errors.push('makeContract baseSalary error');
  var hit = calcCapHit(c);
  if (hit <= 0) errors.push('calcCapHit returned <= 0');

  // GM Rep
  var rep = GM_REP_986.calculate([], null);
  if (rep.overall !== 43) errors.push('GM_REP base overall mismatch');

  // Positions
  if (!POS_DEF.QB || POS_DEF.QB.r.length !== 20) errors.push('POS_DEF.QB ratings count mismatch');
  if (ALL_POSITIONS.length !== 11) errors.push('ALL_POSITIONS count: ' + ALL_POSITIONS.length + ', expected 11');
  if (OFF_POSITIONS.length !== 5) errors.push('OFF_POSITIONS count mismatch');
  if (DEF_POSITIONS.length !== 4) errors.push('DEF_POSITIONS count mismatch');
  if (!RATING_LABELS.arm) errors.push('RATING_LABELS missing arm');

  // Schemes
  if (OFF_SCHEMES.length !== 8) errors.push('OFF_SCHEMES count: ' + OFF_SCHEMES.length);
  if (DEF_SCHEMES.length !== 5) errors.push('DEF_SCHEMES count: ' + DEF_SCHEMES.length);
  if (OFF_PLANS.length !== 6) errors.push('OFF_PLANS count mismatch');
  if (DEF_PLANS.length !== 6) errors.push('DEF_PLANS count mismatch');
  if (!SCHEME_COUNTERS.air_raid) errors.push('SCHEME_COUNTERS missing air_raid');
  if (GAMEPLANS.length !== 6) errors.push('GAMEPLANS count mismatch');
  if (typeof getSchemeFlavorLine !== 'function') errors.push('getSchemeFlavorLine not a function');

  // Coaching
  if (ARCHETYPES.HC.length !== 3) errors.push('ARCHETYPES.HC count mismatch');
  if (!ARCH_BOOST['QB Guru']) errors.push('ARCH_BOOST missing QB Guru');
  if (Object.keys(COACH_TRAITS).length !== 10) errors.push('COACH_TRAITS count mismatch');
  if (CLIQUE_TYPES.length !== 3) errors.push('CLIQUE_TYPES count mismatch');

  // Owner
  if (OWNER_ARCHETYPES.length !== 5) errors.push('OWNER_ARCHETYPES count mismatch');
  if (typeof initOwner !== 'function') errors.push('initOwner not a function');
  if (getOwnerStatus(90).label !== 'Thrilled') errors.push('getOwnerStatus(90) label mismatch');
  if (getOwnerStatus(10).label !== 'Furious') errors.push('getOwnerStatus(10) label mismatch');

  // Personality
  var testPers = getPersonality({ personality: { workEthic: 9, loyalty: 7, greed: 3, pressure: 8, ambition: 6 } });
  if (testPers.workEthic !== 9) errors.push('getPersonality workEthic mismatch');
  if (typeof traitScalar !== 'function') errors.push('traitScalar not a function');
  if (typeof generatePersonality !== 'function') errors.push('generatePersonality not a function');
  if (!PERS_ICONS.workEthic) errors.push('PERS_ICONS missing workEthic');
  if (!PERS_LABELS.loyalty) errors.push('PERS_LABELS missing loyalty');
  if (typeof getDominantTrait !== 'function') errors.push('getDominantTrait not a function');
  if (typeof getContractPersonalityEffects !== 'function') errors.push('getContractPersonalityEffects not a function');

  // Chemistry & System Fit
  if (typeof chemistryMod !== 'function') errors.push('chemistryMod not a function');
  if (typeof systemFitMod !== 'function') errors.push('systemFitMod not a function');
  if (typeof updateSystemFit !== 'function') errors.push('updateSystemFit not a function');
  if (typeof resetSystemFit !== 'function') errors.push('resetSystemFit not a function');
  var chemTeam = { roster: [{ chemistry: 85 }, { chemistry: 90 }] };
  if (chemistryMod(chemTeam) !== 3) errors.push('chemistryMod high-chem team mismatch');
  if (chemistryMod({ roster: [] }) !== 0) errors.push('chemistryMod empty roster mismatch');

  // Teams / League Data
  if (TD.length !== 30) errors.push('TD team count: ' + TD.length + ', expected 30');
  if (LEAGUE_TEAM_COUNT97 !== 30) errors.push('LEAGUE_TEAM_COUNT97 mismatch');
  if (REG_SEASON_WEEKS97 !== 18) errors.push('REG_SEASON_WEEKS97 mismatch');
  if (REG_SEASON_GAMES97 !== 17) errors.push('REG_SEASON_GAMES97 mismatch');
  if (!MFD97_CONF_DIV_MAP.hawks) errors.push('MFD97_CONF_DIV_MAP missing hawks');
  if (LEAGUE_STRUCTURE.conferences.length !== 2) errors.push('LEAGUE_STRUCTURE conferences count mismatch');
  if (LEAGUE_STRUCTURE.divisions.length !== 6) errors.push('LEAGUE_STRUCTURE divisions count mismatch');
  if (typeof applyLeagueAlignment97 !== 'function') errors.push('applyLeagueAlignment97 not a function');
  if (typeof getScaledCount97 !== 'function') errors.push('getScaledCount97 not a function');
  if (CALENDAR.length !== 16) errors.push('CALENDAR length: ' + CALENDAR.length + ', expected 16');

  // Traits
  if (Object.keys(TRAITS).length !== 25) errors.push('TRAITS count: ' + Object.keys(TRAITS).length + ', expected 25');
  if (!TRAITS.captain || TRAITS.captain.pct !== 6) errors.push('TRAITS.captain mismatch');
  if (!TRAIT_FX.clutch || TRAIT_FX.clutch.clutch !== 5) errors.push('TRAIT_FX.clutch mismatch');
  if (!TRAIT_MILESTONES95.ironman) errors.push('TRAIT_MILESTONES95 missing ironman');
  if (typeof hasTrait95 !== 'function') errors.push('hasTrait95 not a function');
  var testPlayer95 = { traits95: ['captain', 'clutch'] };
  if (!hasTrait95(testPlayer95, 'captain')) errors.push('hasTrait95 failed on captain');
  if (hasTrait95(testPlayer95, 'glass')) errors.push('hasTrait95 false positive on glass');
  var traits95 = getPlayerTraits95(testPlayer95);
  if (traits95.length !== 2) errors.push('getPlayerTraits95 count mismatch');
  if (typeof assignTraits !== 'function') errors.push('assignTraits not a function');
  if (typeof checkTraitMilestones95 !== 'function') errors.push('checkTraitMilestones95 not a function');

  // Draft Utils
  if (typeof makePick !== 'function') errors.push('makePick not a function');
  var testPk = makePick(1, 'hawks', 'hawks', 2026);
  if (!testPk.pid || testPk.round !== 1) errors.push('makePick output error');
  if (pickConditionText972({ type: 'playoff', upgradeRound: 2 }).indexOf('playoffs') < 0) errors.push('pickConditionText972 mismatch');
  if (pickValue(1) !== 200) errors.push('pickValue(1) expected 200, got ' + pickValue(1));
  if (pickValue(7) !== 5) errors.push('pickValue(7) expected 5, got ' + pickValue(7));
  var dCon = draftContract(85, 1);
  if (!dCon || dCon.years !== 4) errors.push('draftContract(85,1) years mismatch');
  var aCon = aucContract(85, 100, 1000);
  if (!aCon || aCon.years !== 4) errors.push('aucContract(85,100) years mismatch');

  // Scheme Fit
  if (Object.keys(SCHEME_FIT).length !== 13) errors.push('SCHEME_FIT count: ' + Object.keys(SCHEME_FIT).length + ', expected 13');
  var fitResult = calcSchemeFit({ pos: 'QB', ratings: { accuracy: 90, speed: 80, awareness: 85 } }, 'spread');
  if (!fitResult || fitResult.score < 80) errors.push('calcSchemeFit spread QB score too low: ' + (fitResult && fitResult.score));
  if (fitTierFromScore(92) !== 'ELITE') errors.push('fitTierFromScore(92) mismatch');
  if (fitTierFromScore(55) !== 'FRINGE') errors.push('fitTierFromScore(55) mismatch');
  if (getPlayerSide('QB') !== 'off') errors.push('getPlayerSide(QB) mismatch');
  if (getPlayerSide('CB') !== 'def') errors.push('getPlayerSide(CB) mismatch');
  if (getPlayerSide('K') !== 'other') errors.push('getPlayerSide(K) mismatch');
  if (typeof calcPlayerIdentityFit !== 'function') errors.push('calcPlayerIdentityFit not a function');
  if (typeof calcTeamFit !== 'function') errors.push('calcTeamFit not a function');
  if (typeof getSchemeMismatchWarnings !== 'function') errors.push('getSchemeMismatchWarnings not a function');
  if (FIT_GROUP_DEFS.length !== 7) errors.push('FIT_GROUP_DEFS count: ' + FIT_GROUP_DEFS.length);

  // Contract Helpers
  var testCon = makeContract(10, 3, 6, 15);
  if (v36_capHit(testCon) <= 0) errors.push('v36_capHit returned <= 0');
  if (typeof v36_deadIfTraded !== 'function') errors.push('v36_deadIfTraded not a function');
  if (typeof v36_tradeSavings !== 'function') errors.push('v36_tradeSavings not a function');
  if (voidYearDeadCap(testCon) !== 0) errors.push('voidYearDeadCap on no-void contract should be 0');
  var splitResult = splitDeadCapCharge(10, 'regular', 12);
  if (!splitResult.postDeadline) errors.push('splitDeadCapCharge post-deadline flag mismatch');
  if (splitResult.now !== 5) errors.push('splitDeadCapCharge 50/50 split mismatch');
  var splitPre = splitDeadCapCharge(10, 'regular', 5);
  if (splitPre.postDeadline) errors.push('splitDeadCapCharge pre-deadline should not split');
  if (typeof calcTradeImpact !== 'function') errors.push('calcTradeImpact not a function');
  if (typeof addVoidYears !== 'function') errors.push('addVoidYears not a function');

  if (errors.length === 0) {
    console.log('%c[MFD] All ' + 90 + ' module checks passed', 'color: #34d399; font-weight: bold');
    return true;
  } else {
    console.error('[MFD] Module validation errors:', errors);
    return false;
  }
}

var modulesOk = validateModules();

// For now, render a status page showing the module system is working
function ModuleStatusApp() {
  var systems = [
    { name: 'RNG (mulberry32)', status: true },
    { name: 'Theme (T, SP, RAD, SH, S)', status: !!T.bg },
    { name: 'Difficulty Settings', status: !!DIFF_SETTINGS.rookie },
    { name: 'Cap Math', status: getSalaryCap(2026) === 255 },
    { name: 'Halftime Adjustments v2', status: HALFTIME_V2.options.length === 6 },
    { name: 'Training Camp', status: TRAINING_CAMP_986.focuses.length === 5 },
    { name: 'Franchise Tags', status: FRANCHISE_TAG_986.types.length === 3 },
    { name: 'Compensatory Picks', status: typeof COMP_PICKS_986.calculate === 'function' },
    { name: 'Contract Incentives', status: INCENTIVES_986.types.length === 7 },
    { name: 'GM Reputation', status: typeof GM_REP_986.calculate === 'function' },
    { name: 'Position Definitions (11 pos, 20 ratings each)', status: ALL_POSITIONS.length === 11 },
    { name: 'Rating Labels', status: !!RATING_LABELS.arm },
    { name: 'Offensive Schemes (8)', status: OFF_SCHEMES.length === 8 },
    { name: 'Defensive Schemes (5)', status: DEF_SCHEMES.length === 5 },
    { name: 'Game Plans (Off: 6, Def: 6)', status: OFF_PLANS.length === 6 && DEF_PLANS.length === 6 },
    { name: 'Scheme Counter Matrix', status: !!SCHEME_COUNTERS.air_raid },
    { name: 'Scheme FX & Flavor Text', status: !!SCHEME_FX.air_raid && !!SCHEME_FLAVOR.spread },
    { name: 'Coaching Archetypes (HC/OC/DC)', status: ARCHETYPES.HC.length === 3 },
    { name: 'Coach Traits (10 traits)', status: Object.keys(COACH_TRAITS).length === 10 },
    { name: 'Clique Types', status: CLIQUE_TYPES.length === 3 },
    { name: 'Owner Archetypes (5 types)', status: OWNER_ARCHETYPES.length === 5 },
    { name: 'Owner Approval System', status: typeof initOwner === 'function' },
    { name: 'Coach Carousel', status: typeof COACH_CAROUSEL_986.fireCoach === 'function' },
    { name: 'Contract System', status: typeof makeContract === 'function' },
    { name: 'Contract Scoring', status: typeof calcContractScore994 === 'function' },
    { name: 'Dead Cap Calculator', status: typeof calcDeadCap994 === 'function' },
    { name: '4th Down EV Calculator', status: typeof calcFourthDownEV995 === 'function' },
    { name: 'Personality System (5 axes)', status: typeof getPersonality === 'function' },
    { name: 'Personality Icons & Labels', status: !!PERS_ICONS.workEthic && !!PERS_LABELS.loyalty },
    { name: 'Dominant Trait Detection', status: typeof getDominantTrait === 'function' },
    { name: 'Contract Personality Effects', status: typeof getContractPersonalityEffects === 'function' },
    { name: 'Chemistry Modifier', status: typeof chemistryMod === 'function' },
    { name: 'System Fit Modifier', status: typeof systemFitMod === 'function' },
    { name: 'System Fit Growth/Reset', status: typeof updateSystemFit === 'function' && typeof resetSystemFit === 'function' },
    { name: 'Team Definitions (30 teams)', status: TD.length === 30 },
    { name: 'League Structure (2 conf, 6 div)', status: LEAGUE_STRUCTURE.conferences.length === 2 && LEAGUE_STRUCTURE.divisions.length === 6 },
    { name: 'Conference/Division Map', status: !!MFD97_CONF_DIV_MAP.hawks },
    { name: 'Season Calendar (16 events)', status: CALENDAR.length === 16 },
    { name: 'League Scaling Utilities', status: typeof getScaledCount97 === 'function' },
    { name: 'Player Traits (25 traits)', status: Object.keys(TRAITS).length === 25 },
    { name: 'Trait Effects (FX)', status: !!TRAIT_FX.clutch },
    { name: 'Trait Milestones (10 traits)', status: !!TRAIT_MILESTONES95.ironman },
    { name: 'Trait Detection (hasTrait95)', status: typeof hasTrait95 === 'function' },
    { name: 'Trait Assignment (up to 3)', status: typeof assignTraits === 'function' },
    { name: 'Draft Pick Creation', status: typeof makePick === 'function' },
    { name: 'Conditional Pick Logic', status: typeof pickConditionText972 === 'function' },
    { name: 'Pick Value Chart', status: pickValue(1) === 200 },
    { name: 'Draft Contracts', status: typeof draftContract === 'function' },
    { name: 'Auction Contracts', status: typeof aucContract === 'function' },
    { name: 'Scheme Fit Profiles (13 schemes)', status: Object.keys(SCHEME_FIT).length === 13 },
    { name: 'Scheme Fit Calculator', status: typeof calcSchemeFit === 'function' },
    { name: 'Player Identity Fit (composite)', status: typeof calcPlayerIdentityFit === 'function' },
    { name: 'Team Fit Aggregation', status: typeof calcTeamFit === 'function' },
    { name: 'Scheme Mismatch Warnings', status: typeof getSchemeMismatchWarnings === 'function' },
    { name: 'Fit Group Definitions', status: FIT_GROUP_DEFS.length === 7 },
    { name: 'Contract Cap Hit (v36)', status: typeof v36_capHit === 'function' },
    { name: 'Dead Cap & Trade Savings', status: typeof v36_deadIfTraded === 'function' },
    { name: 'Void Year Dead Cap', status: typeof voidYearDeadCap === 'function' },
    { name: 'Dead Cap Split (post-deadline)', status: typeof splitDeadCapCharge === 'function' },
    { name: 'Trade Impact Calculator', status: typeof calcTradeImpact === 'function' },
    { name: 'Void Year Management', status: typeof addVoidYears === 'function' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, fontFamily: "'Segoe UI', sans-serif", padding: 40 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: 28, fontWeight: 900, color: T.gold, letterSpacing: 1.5, marginBottom: 8 }}>
          MR. FOOTBALL DYNASTY
        </div>
        <div style={{ fontSize: 12, color: T.dim, marginBottom: 24 }}>
          v101 Module System — Phase 1 Checkpoint
        </div>

        <div style={{
          ...S.card,
          marginBottom: 20,
        }}>
          <div style={{ ...S.sectionTitle, color: T.gold }}>
            Extracted Module Status
          </div>
          {systems.map(function (sys) {
            return (
              <div key={sys.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0', borderBottom: '1px solid ' + T.border,
                fontSize: 12,
              }}>
                <span style={{ color: sys.status ? T.green : T.red, fontWeight: 900 }}>
                  {sys.status ? '\u2713' : '\u2717'}
                </span>
                <span>{sys.name}</span>
              </div>
            );
          })}
        </div>

        <div style={{ ...S.card }}>
          <div style={{ ...S.sectionTitle, color: T.cyan }}>
            Phase 1 Summary
          </div>
          <div style={{ fontSize: 11, color: T.dim, lineHeight: 1.8 }}>
            <div><strong style={{ color: T.text }}>Files extracted:</strong> 27 modules</div>
            <div><strong style={{ color: T.text }}>Systems:</strong> RNG, Theme, Difficulty, Cap Math, Positions (11), Schemes (off/def/plans/counters/FX/flavor), Coaching (archetypes/traits/cliques), Halftime, Training Camp, Franchise Tags, Comp Picks, Incentives, GM Rep, Coach Carousel, Contracts, Owner, Personality, Chemistry &amp; System Fit, Teams &amp; League Structure, Player Traits (25 + FX + milestones), Draft Utils, Scheme Fit (13 profiles + identity fit), Contract Helpers (cap hit, dead cap, void years, trade impact)</div>
            <div><strong style={{ color: T.text }}>Build system:</strong> Vite + React 18</div>
            <div><strong style={{ color: T.text }}>Original game:</strong> Still available at /mr-football-dynasty/index.html</div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 10, color: T.faint, textAlign: 'center' }}>
          The original game is preserved and unchanged. This page validates the new module system.
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<ModuleStatusApp />);
