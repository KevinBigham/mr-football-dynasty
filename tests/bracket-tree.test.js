import { describe, expect, it } from 'vitest';

import { buildBracketTree } from '../src/systems/bracket-tree.js';

describe('bracket-tree.js', () => {
  it('returns null for empty playoff input', () => {
    expect(buildBracketTree([], [])).toBeNull();
  });

  it('builds round nodes with team info, scores, and winner resolution', () => {
    const teams = [
      { id: 1, abbr: 'BUF', icon: '🦬' },
      { id: 2, abbr: 'KC', icon: '🪓' },
      { id: 3, abbr: 'SF', icon: '⛏️' },
      { id: 4, abbr: 'DAL', icon: '⭐' },
    ];

    const games = [
      { round: 'wildcard', home: 1, away: 2, homeSeed: 3, awaySeed: 6, played: true, result: { homeScore: 27, awayScore: 20 } },
      { round: 'divisional', home: 3, away: 4, homeSeed: 1, awaySeed: 2, played: true, result: { homeScore: 24, awayScore: 31 } },
    ];

    const tree = buildBracketTree(games, teams);
    expect(tree.wildcard).toHaveLength(1);
    expect(tree.divisional).toHaveLength(1);
    expect(tree.confChamp).toHaveLength(0);

    expect(tree.wildcard[0]).toMatchObject({
      home: { id: 1, abbr: 'BUF', icon: '🦬', seed: 3 },
      away: { id: 2, abbr: 'KC', icon: '🪓', seed: 6 },
      homeScore: 27,
      awayScore: 20,
      played: true,
      winnerId: 1,
    });

    expect(tree.divisional[0].winnerId).toBe(4);
  });

  it('falls back to unknown markers when team metadata is missing', () => {
    const tree = buildBracketTree(
      [{ round: 'superBowl', home: 99, away: 100, played: false }],
      [],
    );

    expect(tree.superBowl[0].home).toEqual({ id: 99, abbr: '?', icon: '?', seed: 0 });
    expect(tree.superBowl[0].away).toEqual({ id: 100, abbr: '?', icon: '?', seed: 0 });
    expect(tree.superBowl[0].winnerId).toBeNull();
  });
});
