import { describe, expect, it } from 'vitest';

import { SCOUT } from '../src/systems/scout-perception.js';

describe('scout-perception.js', () => {
  it('gaussian is deterministic for identical seed inputs', () => {
    const a = SCOUT.gaussian(75, 4, 1234);
    const b = SCOUT.gaussian(75, 4, 1234);
    expect(a).toBeCloseTo(b, 10);
  });

  it('getPerceived is deterministic and clamps values to 30-99', () => {
    const first = SCOUT.getPerceived(85, 8, 'p42', 3);
    const second = SCOUT.getPerceived(85, 8, 'p42', 3);
    expect(first).toBe(second);

    expect(SCOUT.getPerceived(5, 0, 'p1', 1)).toBeGreaterThanOrEqual(30);
    expect(SCOUT.getPerceived(130, 10, 'p9', 2)).toBeLessThanOrEqual(99);
  });

  it('returns range window and confidence flags by scout level', () => {
    const lowScout = SCOUT.getRange(80, 1);
    const eliteScout = SCOUT.getRange(80, 10);

    expect(lowScout).toMatchObject({ lo: 64, hi: 97, display: '64–97', confident: false });
    expect(eliteScout).toMatchObject({ lo: 77, hi: 83, display: '77–83', confident: true });
  });

  it('builds grade ranges from numeric range endpoints', () => {
    expect(SCOUT.getGradeRange(90, 10)).toBe('A – A+');
    expect(SCOUT.getGradeRange(55, 0)).toBe('F – C+');
  });
});
