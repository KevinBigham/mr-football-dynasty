import { describe, expect, it } from 'vitest';

import { buildCapVisualization } from '../src/systems/cap-visualization.js';

describe('cap-visualization.js', () => {
  it('returns null when team is missing', () => {
    expect(buildCapVisualization(null)).toBeNull();
  });

  it('builds cap breakdown, top hits, projections, and cap room', () => {
    const team = {
      deadCap: 10,
      roster: [
        { name: 'QB One', pos: 'QB', ovr: 82, age: 29, contract: { salary: 22, years: 3 } },
        { name: 'WR Alpha', pos: 'WR', ovr: 78, age: 27, contract: { salary: 14, years: 1 } },
        { name: 'WR Beta', pos: 'WR', ovr: 65, age: 24, contract: { salary: 6, years: 0 } },
        { name: 'RB One', pos: 'RB', ovr: 72, age: 26, contract: { salary: 8, years: 2 } },
        { name: 'Depth DL', pos: 'DL', ovr: 60 },
      ],
    };

    const out = buildCapVisualization(team);

    expect(out.totalUsed).toBe(50);
    expect(out.deadCap).toBe(10);
    expect(out.capRoom).toBe(90);

    expect(out.breakdown.map((b) => [b.pos, b.cap, b.pct])).toEqual([
      ['QB', 22, 44],
      ['WR', 20, 40],
      ['RB', 8, 16],
    ]);

    expect(out.topHits).toHaveLength(4);
    expect(out.topHits[0]).toMatchObject({ name: 'QB One', value: '✅ Fair' });
    expect(out.topHits.find((h) => h.name === 'RB One').value).toBe('⚠️ Watch');
    expect(out.topHits.find((h) => h.name === 'WR Beta').value).toBe('❌ Overpay');

    expect(out.projections).toEqual([
      { year: 'Y+1', committed: 44, expiring: 6, space: 106, warning: '' },
      { year: 'Y+2', committed: 30, expiring: 20, space: 120, warning: '' },
      { year: 'Y+3', committed: 22, expiring: 28, space: 128, warning: '' },
    ]);
  });
});
