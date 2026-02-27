import { describe, expect, it } from 'vitest';

import { ROLE_DEFS, assignDefaultRoles, getRoleSnapPct } from '../src/systems/role-defs.js';

describe('role-defs.js', () => {
  it('assigns roles by position depth chart and skips injured players', () => {
    const roster = [
      { id: 'rb1', pos: 'RB', ovr: 88 },
      { id: 'rb2', pos: 'RB', ovr: 79 },
      { id: 'rb3', pos: 'RB', ovr: 95, injury: { games: 2 } },
      { id: 'wr1', pos: 'WR', ovr: 87 },
      { id: 'wr2', pos: 'WR', ovr: 82 },
      { id: 'wr3', pos: 'WR', ovr: 78 },
      { id: 'wr4', pos: 'WR', ovr: 72 },
      { id: 'qb1', pos: 'QB', ovr: 90 },
    ];

    assignDefaultRoles(roster);

    expect(roster.find((p) => p.id === 'rb1').role).toBe('rb1');
    expect(roster.find((p) => p.id === 'rb2').role).toBe('3rd_down');
    expect(roster.find((p) => p.id === 'rb3').role).toBeUndefined();

    expect(roster.find((p) => p.id === 'wr1').role).toBe('wr_x');
    expect(roster.find((p) => p.id === 'wr2').role).toBe('wr_slot');
    expect(roster.find((p) => p.id === 'wr3').role).toBe('wr_deep');
    expect(roster.find((p) => p.id === 'wr4').role).toBe('wr_deep');

    expect(roster.find((p) => p.id === 'qb1').role).toBeUndefined();
  });

  it('increments roleWeeks when role is unchanged and resets on role change', () => {
    const roster = [
      { id: 'a', pos: 'RB', ovr: 80, role: 'rb1', roleWeeks: 2 },
      { id: 'b', pos: 'RB', ovr: 79, role: 'rb1', roleWeeks: 4 },
      { id: 'c', pos: 'RB', ovr: 70 },
    ];

    assignDefaultRoles(roster);

    expect(roster.find((p) => p.id === 'a')).toMatchObject({ role: 'rb1', roleWeeks: 3 });
    expect(roster.find((p) => p.id === 'b')).toMatchObject({ role: '3rd_down', roleWeeks: 0 });
    expect(roster.find((p) => p.id === 'c')).toMatchObject({ role: 'goal_line', roleWeeks: 0 });
  });

  it('returns configured snap percentages and sane fallbacks', () => {
    expect(getRoleSnapPct('RB', 'rb1')).toBe(65);
    expect(getRoleSnapPct('RB', 'missing')).toBe(50);
    expect(getRoleSnapPct('QB', 'starter')).toBe(100);
    expect(ROLE_DEFS.WR.map((r) => r.id)).toEqual(['wr_x', 'wr_slot', 'wr_deep']);
  });
});
