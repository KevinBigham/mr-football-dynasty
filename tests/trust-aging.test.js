import { describe, expect, it } from 'vitest';

import { AGING_V2, TRUST, TRUST_TREND } from '../src/systems/trust-aging.js';

describe('trust-aging.js', () => {
  it('returns directional trend arrows from trust deltas', () => {
    expect(TRUST_TREND.getArrow(50)).toBe('➡️');
    expect(TRUST_TREND.getArrow(60, 54)).toBe('📈');
    expect(TRUST_TREND.getArrow(40, 46)).toBe('📉');
    expect(TRUST_TREND.getArrow(53, 50)).toBe('↗️');
    expect(TRUST_TREND.getArrow(47, 50)).toBe('↘️');
    expect(TRUST_TREND.getArrow(51, 50)).toBe('➡️');
  });

  it('computes aging multipliers by rating class and phase', () => {
    expect(AGING_V2.getMultiplier('awareness', 'peak', 2)).toBe(-0.5);
    expect(AGING_V2.getMultiplier('awareness', 'decline', 2)).toBe(0);

    expect(AGING_V2.getMultiplier('speed', 'peak', 2)).toBe(0);
    expect(AGING_V2.getMultiplier('speed', 'decline', 6)).toBe(1.5);
    expect(AGING_V2.getMultiplier('speed', 'decline', 4)).toBe(2);

    expect(AGING_V2.getMultiplier('shortAccuracy', 'twilight', 2)).toBe(0.5);
    expect(AGING_V2.getMultiplier('unknown_skill', 'decline', 2)).toBe(1);
  });

  it('returns null snapshot when trust data is missing', () => {
    expect(TRUST.leagueSnapshot({}, [])).toBeNull();
  });

  it('builds trust snapshot tiers and labels for high-average league trust', () => {
    const teams = [
      { id: 1, abbr: 'USR', isUser: true },
      { id: 2, abbr: 'A' },
      { id: 3, abbr: 'B' },
      { id: 4, abbr: 'C' },
    ];

    const out = TRUST.leagueSnapshot(
      {
        gmTrustByTeam: { 2: 90, 3: 80, 4: 70 },
        recentTrades: [{ classification: 'fleece' }, { classification: 'fleece' }],
      },
      teams,
    );

    expect(out.avgTrust).toBe(80);
    expect(out.reputation).toBe('Legendary');
    expect(out.tiers).toEqual({ high: 3, mid: 0, low: 0 });
    expect(out.friendliest).toMatchObject({ id: 2, label: 'A', val: 90 });
    expect(out.coldest).toMatchObject({ id: 4, label: 'C', val: 70 });
  });

  it('uses trade pattern reputations when average trust is neutral band', () => {
    const teams = [
      { id: 1, abbr: 'USR', isUser: true },
      { id: 2, abbr: 'A' },
      { id: 3, abbr: 'B' },
      { id: 4, abbr: 'C' },
    ];

    const out = TRUST.leagueSnapshot(
      {
        gmTrustByTeam: { 2: 55, 3: 50, 4: 45 },
        recentTrades: [
          { classification: 'fleece' },
          { classification: 'fleece' },
          { classification: 'fair' },
        ],
      },
      teams,
    );

    expect(out.avgTrust).toBe(50);
    expect(out.reputation).toBe('Shark');
    expect(out.recentPattern).toEqual({ fleeceCount: 2, fairCount: 1, overpayCount: 0 });
  });
});
