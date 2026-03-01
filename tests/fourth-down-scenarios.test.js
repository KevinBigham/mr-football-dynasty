import { describe, expect, it } from 'vitest';

import { calcFourthDownEV995 } from '../src/systems/contracts.js';

describe('fourth-down scenarios', () => {
  it('Scenario 1: 4th-and-1 at midfield recommends go', () => {
    var out = calcFourthDownEV995(1, 50, 0, 2, 900);
    expect(out.recommendation).toBe('go');
  });

  it('Scenario 2: 4th-and-15 at own 20 recommends punt', () => {
    var out = calcFourthDownEV995(15, 20, 0, 2, 900);
    expect(out.recommendation).toBe('punt');
    expect(out.fieldGoal.applicable).toBe(false);
  });

  it('Scenario 3: 4th-and-4 at opponent 30 recommends field goal', () => {
    var out = calcFourthDownEV995(4, 70, 0, 2, 900);
    expect(out.recommendation).toBe('fg');
    expect(out.fieldGoal.applicable).toBe(true);
  });

  it('Scenario 4: 4th-and-2 at opponent 20 down 8 late recommends go', () => {
    var out = calcFourthDownEV995(2, 80, -8, 4, 90);
    expect(out.recommendation).toBe('go');
  });

  it('Scenario 5: 4th-and-8 at opponent 45 down 10 late recommends go', () => {
    var out = calcFourthDownEV995(8, 55, -10, 4, 120);
    expect(out.recommendation).toBe('go');
  });

  it('Scenario 6: 4th-and-10 at own 25 while leading late recommends punt', () => {
    var out = calcFourthDownEV995(10, 25, 7, 4, 120);
    expect(out.recommendation).toBe('punt');
  });
});
