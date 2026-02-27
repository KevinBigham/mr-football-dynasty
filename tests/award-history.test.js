import { beforeEach, describe, expect, it } from 'vitest';

import {
  AWARD_HISTORY_LOG,
  buildCareerPage,
  getMultiTimeWinners,
  getTrophyName,
  recordAwardHistory,
  setTrophyNameForRivalry,
} from '../src/systems/award-history.js';

describe('award-history.js', () => {
  beforeEach(() => {
    AWARD_HISTORY_LOG.length = 0;
  });

  it('records award snapshots by year', () => {
    recordAwardHistory(
      {
        mvp: { name: 'Pat Ace', pos: 'QB', team: 'KC' },
        dpoy: { name: 'Max Rush', pos: 'DL', team: 'PIT' },
      },
      2026,
    );

    expect(AWARD_HISTORY_LOG).toHaveLength(1);
    expect(AWARD_HISTORY_LOG[0]).toMatchObject({
      year: 2026,
      mvp: { name: 'Pat Ace', pos: 'QB', team: 'KC' },
      dpoy: { name: 'Max Rush', pos: 'DL', team: 'PIT' },
      roy: null,
      coty: null,
    });
  });

  it('returns only multi-time winners for a given award key', () => {
    recordAwardHistory({ mvp: { name: 'Pat Ace', pos: 'QB', team: 'KC' } }, 2024);
    recordAwardHistory({ mvp: { name: 'Pat Ace', pos: 'QB', team: 'KC' } }, 2025);
    recordAwardHistory({ mvp: { name: 'Joe Star', pos: 'QB', team: 'BUF' } }, 2026);

    const winners = getMultiTimeWinners('mvp');
    expect(winners).toHaveLength(1);
    expect(winners[0]).toMatchObject({ name: 'Pat Ace', pos: 'QB', count: 2, years: [2024, 2025] });
  });

  it('gets/sets rivalry trophy names with sorted team keys and delete behavior', () => {
    const updated = setTrophyNameForRivalry({}, 'KC', 'BUF', 'Lake Effect Trophy');
    expect(getTrophyName(updated, 'BUF', 'KC')).toBe('Lake Effect Trophy');

    const removed = setTrophyNameForRivalry(updated, 'BUF', 'KC', '   ');
    expect(getTrophyName(removed, 'KC', 'BUF')).toBeNull();
  });

  it('builds a player career page with aggregated stats, teams, and awards', () => {
    recordAwardHistory({ mvp: { name: 'Joe Star', pos: 'QB', team: 'NYG' } }, 2024);

    const history = [
      {
        year: 2025,
        teams: [
          {
            abbr: 'NYG',
            icon: '🗽',
            roster: [
              {
                name: 'Joe Star',
                pos: 'QB',
                ovr: 86,
                age: 24,
                stats: { passYds: 3900, passTD: 28, rushYds: 220 },
              },
            ],
          },
        ],
        mvp: { name: 'Joe Star' },
      },
      {
        year: 2026,
        teams: [
          {
            abbr: 'NYG',
            icon: '🗽',
            roster: [
              {
                name: 'Joe Star',
                pos: 'QB',
                ovr: 89,
                age: 25,
                stats: { passYds: 4200, passTD: 31, rushYds: 180 },
              },
            ],
          },
        ],
        roy: { name: 'Someone Else' },
      },
    ];

    const out = buildCareerPage('Joe Star', history, []);
    expect(out).toBeTruthy();
    expect(out.yearsPlayed).toBe(2);
    expect(out.teams).toEqual(['NYG']);
    expect(out.career).toMatchObject({ passYds: 8100, passTD: 59, rushYds: 400 });
    expect(out.awards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ year: 2024, award: '🏆 MVP' }),
        expect.objectContaining({ year: 2025, award: '🏆 MVP' }),
      ]),
    );
  });

  it('returns null when player is not present in history', () => {
    const out = buildCareerPage('No Player', [{ year: 2026, teams: [] }], []);
    expect(out).toBeNull();
  });
});
