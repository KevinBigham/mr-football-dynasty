import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { RNG } from '../src/utils/index.js';
import {
  DC_SPECIALTIES,
  OC_SPECIALTIES,
  assignCoordSpecialty,
} from '../src/systems/coordinator-specialties.js';

describe('coordinator-specialties.js', () => {
  let originalAI;

  beforeEach(() => {
    originalAI = RNG.ai;
  });

  afterEach(() => {
    RNG.ai = originalAI;
  });

  it('returns null for missing staff member', () => {
    expect(assignCoordSpecialty(null, 'OC')).toBeNull();
  });

  it('does not overwrite existing specialty assignment', () => {
    const existing = { id: 'run_guru' };
    const coach = { specialty75: existing };

    RNG.ai = () => 0.99;
    expect(assignCoordSpecialty(coach, 'OC')).toBe(existing);
    expect(coach.specialty75).toBe(existing);
  });

  it('assigns OC specialties using ai RNG channel', () => {
    const coach = {};
    RNG.ai = () => 0;

    const out = assignCoordSpecialty(coach, 'OC');
    expect(out).toEqual(OC_SPECIALTIES[0]);
    expect(coach.specialty75).toEqual(OC_SPECIALTIES[0]);
  });

  it('assigns DC specialties for non-OC roles', () => {
    const coach = {};
    RNG.ai = () => 0.999;

    const out = assignCoordSpecialty(coach, 'DC');
    expect(out).toEqual(DC_SPECIALTIES[DC_SPECIALTIES.length - 1]);
    expect(coach.specialty75.id).toBe('situational');
  });
});
