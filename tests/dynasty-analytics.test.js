import { describe, expect, it } from 'vitest';

import {
  ALMANAC_SCHEMA_VERSION,
  calcDominanceScore,
  calcDynastyIndex,
  calcLongevity,
  calcPeakPower,
  buildHallOfSeasons,
  generateEraCards,
  generateIdentityTags,
} from '../src/systems/dynasty-analytics.js';

describe('dynasty-analytics.js', () => {
  it('calculates dominance score from wins, playoffs, point diff, ranks, and title', () => {
    const tr = { id: 1, wins: 12, losses: 5, playoffWins: 2, pf: 400, pa: 300, offRank: 1, defRank: 1 };
    const h = { winnerId: 1 };
    expect(calcDominanceScore(tr, h)).toBe(112);
  });

  it('computes dynasty index formula and handles missing seasons', () => {
    expect(calcDynastyIndex({ seasons: 0 })).toBe(0);
    expect(
      calcDynastyIndex({
        seasons: 4,
        wins: 40,
        losses: 24,
        titles: 1,
        playoffWins: 5,
        mvps: 1,
        dpoys: 1,
        rivalryDominance: 2,
      }),
    ).toBe(365);
  });

  it('finds the best 5-year peak power window', () => {
    const history = [
      { year: 2020, winnerId: 2, teamRecords: [{ id: 1, wins: 5, losses: 11, pf: 250, pa: 300 }] },
      { year: 2021, winnerId: 2, teamRecords: [{ id: 1, wins: 6, losses: 10, pf: 260, pa: 310 }] },
      {
        year: 2022,
        winnerId: 1,
        teamRecords: [{ id: 1, wins: 12, losses: 5, playoffWins: 2, pf: 420, pa: 280, offRank: 1, defRank: 2 }],
      },
      {
        year: 2023,
        winnerId: 2,
        teamRecords: [{ id: 1, wins: 11, losses: 6, playoffWins: 1, pf: 390, pa: 300, offRank: 2, defRank: 1 }],
      },
      {
        year: 2024,
        winnerId: 1,
        teamRecords: [{ id: 1, wins: 13, losses: 4, playoffWins: 3, pf: 430, pa: 290, offRank: 1, defRank: 1 }],
      },
      { year: 2025, winnerId: 2, teamRecords: [{ id: 1, wins: 10, losses: 7, pf: 360, pa: 330, offRank: 3, defRank: 4 }] },
    ];

    const peak = calcPeakPower(history, 1);
    expect(peak.startYear).toBe(2021);
    expect(peak.endYear).toBe(2025);
    expect(peak.score).toBeGreaterThan(0);
  });

  it('calculates longevity score and consistency fields', () => {
    const history = [
      { year: 2020, winnerId: 2, teamRecords: [{ id: 1, wins: 5, losses: 11, playoffWins: 0, pf: 250, pa: 300 }] },
      { year: 2021, winnerId: 2, teamRecords: [{ id: 1, wins: 6, losses: 10, playoffWins: 0, pf: 260, pa: 310 }] },
      { year: 2022, winnerId: 1, teamRecords: [{ id: 1, wins: 12, losses: 5, playoffWins: 2, pf: 420, pa: 280, offRank: 1 }] },
      { year: 2023, winnerId: 2, teamRecords: [{ id: 1, wins: 11, losses: 6, playoffWins: 1, pf: 390, pa: 300, defRank: 1 }] },
      { year: 2024, winnerId: 1, teamRecords: [{ id: 1, wins: 13, losses: 4, playoffWins: 3, pf: 430, pa: 290, offRank: 1, defRank: 1 }] },
      { year: 2025, winnerId: 2, teamRecords: [{ id: 1, wins: 10, losses: 7, playoffWins: 0, pf: 360, pa: 330 }] },
    ];

    const out = calcLongevity(history, 1);
    expect(out.winningSzns).toBe(4);
    expect(out.playoffAppearances).toBe(3);
    expect(out.consistency).toBe(67);
    expect(out.score).toBeGreaterThan(600);
  });

  it('generates up to three identity tags in priority order', () => {
    const tr = { id: 1, abbr: 'AAA', wins: 12, losses: 5, pf: 500, pa: 300, offRank: 1, defRank: 2 };
    const h = { winnerId: 1, mvp: { tm: 'AAA' } };
    const tags = generateIdentityTags(tr, h);

    expect(tags).toHaveLength(3);
    expect(tags.map((t) => t.id)).toEqual(['lockdown', 'airraid', 'dominant']);
  });

  it('builds and finalizes era cards after sustained decline', () => {
    const history = [
      { year: 2020, winnerId: 2, teamRecords: [{ id: 1, abbr: 'AAA', wins: 10, losses: 6, playoffWins: 0 }] },
      { year: 2021, winnerId: 2, teamRecords: [{ id: 1, abbr: 'AAA', wins: 11, losses: 5, playoffWins: 1 }] },
      { year: 2022, winnerId: 2, teamRecords: [{ id: 1, abbr: 'AAA', wins: 7, losses: 10, playoffWins: 0 }] },
      { year: 2023, winnerId: 2, teamRecords: [{ id: 1, abbr: 'AAA', wins: 6, losses: 11, playoffWins: 0 }] },
    ];
    const teams = [{ abbr: 'AAA', id: 1, icon: '🅰️' }];

    const eras = generateEraCards(history, teams);
    expect(eras).toHaveLength(1);
    expect(eras[0]).toMatchObject({ abbr: 'AAA', start: 2020, end: 2021, seasons: 2, totalDom: 71 });
  });

  it('builds hall-of-seasons cards sorted by dominance and stamped schema version', () => {
    const teams = [
      { abbr: 'AAA', icon: '🅰️' },
      { abbr: 'BBB', icon: '🅱️' },
    ];

    const history = [
      {
        year: 2025,
        winnerId: 1,
        topGames: [{ week: 9, hAbbr: 'AAA', aAbbr: 'BBB', hScore: 31, aScore: 27, margin: 4 }],
        mvp: { name: 'Ace QB', pos: 'QB', tm: 'AAA' },
        teamRecords: [
          { id: 1, abbr: 'AAA', wins: 12, losses: 5, playoffWins: 2, pf: 410, pa: 290, offRank: 1, defRank: 1 },
          { id: 2, abbr: 'BBB', wins: 8, losses: 9, playoffWins: 0, pf: 330, pa: 340, offRank: 10, defRank: 12 },
        ],
      },
      {
        year: 2024,
        winnerId: 2,
        topGames: [{ week: 2, hAbbr: 'BBB', aAbbr: 'AAA', hScore: 24, aScore: 20, margin: 4 }],
        allPro1st: { WR: [{ name: 'Top WR', tm: 'BBB' }] },
        teamRecords: [{ id: 2, abbr: 'BBB', wins: 10, losses: 7, playoffWins: 1, pf: 360, pa: 320, offRank: 5, defRank: 6 }],
      },
    ];

    const hall = buildHallOfSeasons(history, teams);
    expect(hall[0].abbr).toBe('AAA');
    expect(hall[0].schemaV).toBe(ALMANAC_SCHEMA_VERSION);
    expect(hall[0].plaque).toContain('Elite 12-5');
    expect(hall[0].plaque).toContain('🏆 Champions');
    expect(hall[0].idTags.length).toBeLessThanOrEqual(3);
  });
});
