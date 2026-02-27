import { describe, expect, it } from 'vitest';

import {
  attributeCause,
  calcFatigueMultiplier,
  calcGameScriptMult,
  calcWeekDeltas,
} from '../src/systems/game-helpers.js';

describe('game-helpers.js', () => {
  it('calculates fatigue multipliers by usage bands', () => {
    expect(calcFatigueMultiplier(10, 0)).toBe(1);
    expect(calcFatigueMultiplier(70, 100)).toBe(1);
    expect(calcFatigueMultiplier(71, 100)).toBe(0.96);
    expect(calcFatigueMultiplier(86, 100)).toBe(0.92);
  });

  it('applies game script multipliers for specific score/role scenarios', () => {
    expect(calcGameScriptMult(31, 10, 'RB', 'rb1')).toBe(1.15);
    expect(calcGameScriptMult(31, 10, 'WR', 'wr_deep')).toBe(0.85);

    expect(calcGameScriptMult(10, 31, 'WR', 'wr_x')).toBe(1.12);
    expect(calcGameScriptMult(10, 31, 'RB', '3rd_down')).toBe(1.1);
    expect(calcGameScriptMult(10, 31, 'RB', 'rb1')).toBe(0.88);

    expect(calcGameScriptMult(14, 21, 'WR', 'wr_slot')).toBe(1.06);
    expect(calcGameScriptMult(21, 21, 'QB', 'starter')).toBe(1);
  });

  it('returns meaningful week deltas only and handles invert-good metrics', () => {
    const current = { pressureRate: 70, turnovers: 14, rzEff: 50, coverageWin: 71 };
    const prev = { pressureRate: 65, turnovers: 10, rzEff: 48, coverageWin: 67 };

    const deltas = calcWeekDeltas(current, prev);
    expect(deltas).toHaveLength(3);

    const pressure = deltas.find((d) => d.key === 'pressureRate');
    const turnovers = deltas.find((d) => d.key === 'turnovers');
    const coverage = deltas.find((d) => d.key === 'coverageWin');

    expect(pressure).toMatchObject({ delta: 5, good: true });
    expect(turnovers).toMatchObject({ delta: 4, good: false });
    expect(coverage).toMatchObject({ delta: 4, good: true });
  });

  it('returns null deltas when inputs are missing or changes are too small', () => {
    expect(calcWeekDeltas(null, {})).toBeNull();
    expect(calcWeekDeltas({ pressureRate: 65 }, { pressureRate: 63 })).toBeNull();
  });

  it('attributes natural variance when no causal events exist', () => {
    const out = attributeCause({ key: 'pressureRate' }, []);
    expect(out).toEqual({ cause: 'Natural variance', confidence: 'LOW', proofs: [] });
  });

  it('prioritizes high-relevance causes and returns up to 3 proofs', () => {
    const ledger = [
      { type: 'FIX_APPLIED', detail: { fix: 'quick_pass' }, id: 1 },
      { type: 'TRADE', id: 2 },
      { type: 'SCHEME_CHANGE', id: 3 },
      { type: 'INJURY', detail: { name: 'CB Ace' }, id: 4 },
      { type: 'LOCKER_CHOICE', id: 5 },
    ];

    const out = attributeCause({ key: 'pressureRate' }, ledger);
    expect(['Fix: quick_pass', 'Injury: CB Ace']).toContain(out.cause);
    expect(out.confidence).toBe('HIGH');
    expect(out.proofs.length).toBeLessThanOrEqual(3);
    expect(out.proofs.map((p) => p.id)).toContain(1);
  });
});
