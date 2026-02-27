import { describe, expect, it } from 'vitest';

import {
  CREDIBILITY_MATH,
  MEDIA_TAGS,
  PRESS_TAG_MAP,
  RIVALRY_MATH,
  getMediaPersona,
} from '../src/systems/media-persona.js';

describe('media-persona.js', () => {
  it('needs enough history and repeat tags to resolve a persona', () => {
    expect(getMediaPersona(['swagger', 'stoic'])).toBeNull();
    expect(getMediaPersona(['unknown', 'unknown', 'unknown', 'swagger'])).toBeNull();

    const persona = getMediaPersona(['swagger', 'stoic', 'swagger', 'accountability']);
    expect(persona).toEqual(MEDIA_TAGS.swagger);
  });

  it('uses only the most recent six tags for persona detection', () => {
    const history = ['accountability', 'accountability', 'stoic', 'swagger', 'swagger', 'stoic', 'stoic'];
    const persona = getMediaPersona(history);
    expect(persona).toEqual(MEDIA_TAGS.stoic);
  });

  it('maps credibility deltas by tag and game context', () => {
    expect(CREDIBILITY_MATH.calcDelta('accountability', -3)).toBe(4);
    expect(CREDIBILITY_MATH.calcDelta('deflector', -21)).toBe(-4);
    expect(CREDIBILITY_MATH.calcDelta('swagger', -1)).toBe(-5);
    expect(CREDIBILITY_MATH.calcDelta('tough_love', -18)).toBe(-2);
    expect(CREDIBILITY_MATH.calcDelta('stoic', 7)).toBe(2);
    expect(CREDIBILITY_MATH.calcDelta('players_coach', -7)).toBe(1);
  });

  it('computes rivalry heat deltas with cap', () => {
    expect(RIVALRY_MATH.calcDelta(24, true, true, 4)).toBe(12);
    expect(RIVALRY_MATH.calcDelta(3, false, false, 0)).toBe(3);
    expect(RIVALRY_MATH.calcDelta(6, false, false, 0)).toBe(2);
  });

  it('contains expected press tag mappings', () => {
    expect(PRESS_TAG_MAP.own_it).toBe('accountability');
    expect(PRESS_TAG_MAP.swagger).toBe('swagger');
    expect(PRESS_TAG_MAP.next_up).toBe('stoic');
  });
});
