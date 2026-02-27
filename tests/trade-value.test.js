import { describe, expect, it } from 'vitest';

import { calcPickValue, calcTradeValue, evaluateTradePackage } from '../src/systems/trade-value.js';

describe('trade-value.js', () => {
  it('calculates player trade value with age, position, upside, and contract modifiers', () => {
    expect(calcTradeValue(null)).toBe(0);

    const youngQB = calcTradeValue({
      ovr: 80,
      age: 23,
      pos: 'QB',
      pot: 92,
      contract: { salary: 6 },
    });
    expect(youngQB).toBe(201);

    const expensiveVet = calcTradeValue({
      ovr: 75,
      age: 33,
      pos: 'WR',
      pot: 75,
      contract: { salary: 16 },
    });
    expect(expensiveVet).toBe(124);
  });

  it('enforces minimum trade value floor', () => {
    const min = calcTradeValue({ ovr: 1, age: 36, pos: 'P', contract: { salary: 50 } });
    expect(min).toBe(5);
  });

  it('maps draft pick value by round', () => {
    expect(calcPickValue(1)).toBe(80);
    expect(calcPickValue(2)).toBe(50);
    expect(calcPickValue(3)).toBe(30);
    expect(calcPickValue(7)).toBe(15);
  });

  it('evaluates trade packages into verdict bands and acceptance flag', () => {
    const myAssets = [
      { type: 'player', player: { ovr: 70, age: 28, pos: 'WR', contract: { salary: 5 } } },
      { type: 'pick', round: 3 },
    ];
    const theirAssets = [{ type: 'pick', round: 1 }];

    const out = evaluateTradePackage(myAssets, theirAssets);

    expect(out).toMatchObject({
      myVal: 170,
      theirVal: 80,
      diff: 90,
      verdict: 'OVERPAY',
      willAccept: true,
    });
  });

  it('classifies favorable incoming deals as steals and can reject low offers', () => {
    const myAssets = [{ type: 'pick', round: 4 }];
    const theirAssets = [{ type: 'player', player: { ovr: 88, age: 25, pos: 'QB', pot: 92, contract: { salary: 7 } } }];

    const out = evaluateTradePackage(myAssets, theirAssets);
    expect(out.verdict).toBe('STEAL');
    expect(out.willAccept).toBe(false);
  });
});
