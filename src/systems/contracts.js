/**
 * MFD Contract System
 *
 * Contract creation, restructuring, backloading, extensions,
 * dead cap calculations, and cap hit math.
 */

import { MIN_SALARY, getMinSalary } from '../config/cap-math.js';

export function makeContract(salary, years, signingBonus, guaranteed) {
  var sb = signingBonus || 0;
  var yrs = Math.max(years || 1, 1);
  var base = Math.max(salary || MIN_SALARY, MIN_SALARY);
  var pro = yrs > 0 ? Math.round((sb / yrs) * 10) / 10 : 0;
  var hit = Math.round((base + pro) * 10) / 10;
  return {
    baseSalary: base,
    years: yrs,
    signingBonus: sb,
    prorated: pro,
    guaranteed: guaranteed || 0,
    restructured: false,
    originalYears: yrs,
    salary: hit, // v35: .salary = capHit for backward compat
  };
}

export function calcCapHit(c) {
  if (!c) return 0;
  if (c.baseSalary !== undefined)
    return Math.round((c.baseSalary + (c.prorated || 0)) * 10) / 10;
  return c.salary || 0;
}

export function calcDeadMoney(c) {
  if (!c || !c.prorated) return 0;
  return Math.round(c.prorated * c.years * 10) / 10;
}

export function restructureContract(p) {
  var c = p.contract;
  if (!c || c.baseSalary === undefined)
    return { ok: false, msg: 'Contract not v35-shaped.' };
  if (c.years <= 1)
    return { ok: false, msg: 'Cannot restructure \u2014 1 year or less remaining.' };
  if (c.restructured)
    return { ok: false, msg: 'Already restructured this contract.' };
  var yoe = Math.max((p.age || 22) - 22, 0);
  var minBase = getMinSalary(yoe);
  if (c.baseSalary < minBase + 1.0)
    return {
      ok: false,
      msg:
        'Base salary too low to restructure ($' +
        (minBase + 1.0).toFixed(1) +
        'M minimum).',
    };
  var converted = Math.round((c.baseSalary - minBase) * 10) / 10;
  var spreadYrs = Math.min(c.years, 5);
  var addedPro = Math.round((converted / spreadYrs) * 10) / 10;
  var oldHit = calcCapHit(c);
  c.baseSalary = Math.round(minBase * 10) / 10;
  c.prorated = Math.round((c.prorated + addedPro) * 10) / 10;
  c.signingBonus = Math.round((c.signingBonus + converted) * 10) / 10;
  c.restructured = true;
  c.salary = calcCapHit(c);
  var newHit = calcCapHit(c);
  var savings = Math.round((oldHit - newHit) * 10) / 10;
  return {
    ok: true,
    savings: savings,
    addedPro: addedPro,
    years: spreadYrs,
    newHit: newHit,
    msg:
      'Restructured: saved $' +
      savings +
      'M this year. +$' +
      addedPro +
      'M/yr dead cap for ' +
      spreadYrs +
      ' years.',
  };
}

export function backloadContract973(p, voidYears) {
  var c = p && p.contract;
  if (!c || c.baseSalary === undefined)
    return { ok: false, msg: 'Contract not v35-shaped.' };
  if (c.years <= 1)
    return { ok: false, msg: 'Cannot backload \u2014 1 year or less remaining.' };
  if (c.backloaded) return { ok: false, msg: 'Already backloaded.' };
  var maxVoid = Math.min(voidYears || 2, 3);
  var converted = Math.round(c.baseSalary * 0.4 * 10) / 10;
  if (converted <= 0)
    return { ok: false, msg: 'No base salary available to backload.' };
  var spreadYrs = Math.max(1, (c.years || 1) + maxVoid);
  var addedPro = Math.round((converted / spreadYrs) * 10) / 10;
  var oldHit = calcCapHit(c);
  c.baseSalary = Math.round((c.baseSalary - converted) * 10) / 10;
  c.prorated = Math.round(((c.prorated || 0) + addedPro) * 10) / 10;
  c.backloaded = true;
  c.voidYears = Math.max(c.voidYears || 0, maxVoid);
  c.salary = calcCapHit(c);
  var newHit = calcCapHit(c);
  var savings = Math.round((oldHit - newHit) * 10) / 10;
  return {
    ok: true,
    savings: savings,
    voidYears: maxVoid,
    newHit: newHit,
    msg:
      'Backloaded: saved $' +
      savings +
      'M this year. ' +
      maxVoid +
      ' void year' +
      (maxVoid > 1 ? 's' : '') +
      ' of $' +
      addedPro +
      'M dead cap added.',
  };
}

export function extendAndRestructure973(p, addYears) {
  var c = p && p.contract;
  if (!c || c.baseSalary === undefined)
    return { ok: false, msg: 'Contract not v35-shaped.' };
  var maxAdd = Math.min(addYears || 2, 3);
  if (maxAdd <= 0) return { ok: false, msg: 'Invalid extension length.' };
  var raise = Math.round(c.baseSalary * 0.1 * maxAdd * 10) / 10;
  c.years = Math.max(1, (c.years || 1) + maxAdd);
  c.baseSalary = Math.round((c.baseSalary + raise) * 10) / 10;
  c.guaranteed = Math.round(((c.guaranteed || 0) + raise * 0.5) * 10) / 10;
  c.salary = calcCapHit(c);
  var result = restructureContract(p);
  if (result.ok) {
    return {
      ok: true,
      msg: 'Extended ' + maxAdd + 'yr + restructured: ' + result.msg,
      savings: result.savings,
      addedYears: maxAdd,
      newHit: result.newHit,
    };
  }
  return {
    ok: true,
    msg: 'Extended ' + maxAdd + 'yr. Raise: +$' + raise + 'M/yr.',
    savings: 0,
    addedYears: maxAdd,
    newHit: calcCapHit(c),
  };
}

// v99.4: Contract scoring — grades a contract A+ through F
export function calcContractScore994(ovr, pos, age, years, totalValue, capTotal) {
  var tier;
  if (ovr >= 90) tier = 'elite';
  else if (ovr >= 75) tier = 'starter';
  else tier = 'backup';

  // Get base market rate from table (fallback to 0.05)
  var marketRate =
    typeof CONTRACT_VALUE_TABLE_994 !== 'undefined' &&
    CONTRACT_VALUE_TABLE_994[pos]
      ? CONTRACT_VALUE_TABLE_994[pos][tier]
      : 0.05;

  // Age multiplier
  var ageIndex = Math.min(38, Math.max(21, age)) - 21;
  var ageMult =
    typeof AGE_VALUE_CURVE_994 !== 'undefined' && AGE_VALUE_CURVE_994[pos]
      ? AGE_VALUE_CURVE_994[pos][ageIndex]
      : 0.8;

  // Length penalty: 2% per year beyond 3
  var lengthPenalty = 1 - 0.02 * Math.max(0, years - 3);

  var fairAnnual = capTotal * marketRate * ageMult * lengthPenalty;
  var actualAnnual = totalValue / years;
  var fairTotal = fairAnnual * years;
  var surplus = fairTotal - totalValue;

  var grade;
  if (surplus > 15) grade = 'A+';
  else if (surplus >= 8) grade = 'A';
  else if (surplus >= 2) grade = 'B';
  else if (surplus >= -5) grade = 'C';
  else if (surplus >= -15) grade = 'D';
  else grade = 'F';

  var score = 50 + surplus * 2;
  score = Math.min(100, Math.max(0, score));

  return {
    score: Math.round(score),
    grade: grade,
    surplus: Math.round(surplus * 10) / 10,
    annualCapPct: Math.round((actualAnnual / capTotal) * 1000) / 1000,
    fairValue: Math.round(fairAnnual * 10) / 10,
  };
}

// v99.4: Dead cap impact calculator
export function calcDeadCap994(totalGuaranteed, yearsRemaining, yearsCut) {
  yearsRemaining = Math.max(1, yearsRemaining);
  yearsCut = Math.min(yearsCut, yearsRemaining);
  var remainingAfterCut = Math.max(0, yearsRemaining - yearsCut);
  var deadCapHit = (totalGuaranteed * remainingAfterCut) / yearsRemaining;
  var annualGuaranteed = totalGuaranteed / yearsRemaining;
  var capSavings = annualGuaranteed * remainingAfterCut;
  var netCapImpact = capSavings - deadCapHit;

  return {
    deadCapHit: Math.round(deadCapHit * 10) / 10,
    capSavings: Math.round(capSavings * 10) / 10,
    netCapImpact: Math.round(netCapImpact * 10) / 10,
  };
}

// v100: 4th Down Expected Value Calculator (DeepSeek)
export function calcFourthDownEV995(yards, fieldPos, score, quarter, timeLeft) {
  var convRate;
  if (yards === 1) convRate = 0.72;
  else if (yards === 2) convRate = 0.63;
  else if (yards === 3) convRate = 0.55;
  else if (yards === 4) convRate = 0.48;
  else if (yards === 5) convRate = 0.43;
  else if (yards >= 6 && yards <= 10) convRate = 0.35;
  else if (yards >= 11 && yards <= 15) convRate = 0.22;
  else convRate = 0.14;

  var fgDistance = 100 - fieldPos + 17;
  var fgSuccess;
  if (fgDistance <= 30) fgSuccess = 0.97;
  else if (fgDistance <= 35) fgSuccess = 0.93;
  else if (fgDistance <= 40) fgSuccess = 0.87;
  else if (fgDistance <= 45) fgSuccess = 0.79;
  else if (fgDistance <= 50) fgSuccess = 0.69;
  else fgSuccess = 0.52;

  var puntField = fieldPos - 40;
  if (puntField < 10) puntField = 10;

  // Expected points lookup (uses getEP993 from main game — will be wired later)
  var getEP =
    typeof getEP993 !== 'undefined'
      ? getEP993
      : function () {
          return 2.5;
        };

  var epOpp = getEP(1, 10, 100 - fieldPos);
  var convertField = fieldPos + yards;
  var epConvert;
  if (convertField >= 100) epConvert = 7;
  else epConvert = getEP(1, 10, convertField);

  var goEV = convRate * epConvert + (1 - convRate) * -epOpp;
  var fgEV = fgSuccess * 3 + (1 - fgSuccess) * -epOpp;
  var puntEV = -getEP(1, 10, 100 - puntField);

  var isDesperate = quarter === 4 && timeLeft < 180 && score <= -8;
  var isProtecting = quarter === 4 && timeLeft < 180 && score >= 7;
  var goAdj = 0;
  if (isDesperate) goAdj = 0.5;
  if (isProtecting) goAdj = -0.5;

  var goEV_adj = goEV + goAdj;
  var fgEV_adj = fgEV;
  var puntEV_adj = puntEV;

  var bestEV = goEV_adj;
  var bestAction = 'go';
  if (fgEV_adj > bestEV) {
    bestEV = fgEV_adj;
    bestAction = 'fg';
  }
  if (puntEV_adj > bestEV) {
    bestEV = puntEV_adj;
    bestAction = 'punt';
  }

  var vals = [goEV_adj, fgEV_adj, puntEV_adj].sort(function (a, b) {
    return b - a;
  });
  var margin = vals[0] - vals[1];
  var confidence;
  if (margin > 0.75) confidence = 'clear';
  else if (margin > 0.25) confidence = 'close';
  else confidence = 'situational';

  return {
    goForIt: { ev: Math.round(goEV * 100) / 100, desc: 'Go for it' },
    fieldGoal: {
      ev: Math.round(fgEV * 100) / 100,
      desc: 'Field goal attempt',
      applicable: fgDistance <= 65,
    },
    punt: { ev: Math.round(puntEV * 100) / 100, desc: 'Punt' },
    recommendation: bestAction,
    confidence: confidence,
  };
}
