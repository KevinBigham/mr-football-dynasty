import { describe, expect, it } from 'vitest';

import { AGENT_TYPES, assignAgentType, getAgentTypeObj } from '../src/systems/agent-types.js';

describe('agent-types.js', () => {
  it('exposes stable agent type catalog', () => {
    expect(AGENT_TYPES).toHaveLength(5);
    expect(AGENT_TYPES.map((t) => t.id)).toEqual([
      'loyal',
      'mercenary',
      'ring_chaser',
      'hometown',
      'spotlight',
    ]);
  });

  it('returns existing player agent type without rerolling', () => {
    const player = { age: 29, agentType: 'hometown' };
    expect(assignAgentType(player, () => 0)).toBe('hometown');
  });

  it('assigns age 31+ players via veteran threshold table', () => {
    expect(assignAgentType({ age: 33 }, () => 0.2)).toBe('ring_chaser');
    expect(assignAgentType({ age: 33 }, () => 0.4)).toBe('mercenary');
    expect(assignAgentType({ age: 33 }, () => 0.7)).toBe('loyal');
    expect(assignAgentType({ age: 33 }, () => 0.85)).toBe('hometown');
    expect(assignAgentType({ age: 33 }, () => 0.95)).toBe('spotlight');
  });

  it('assigns age 28-30 players via mid-career thresholds', () => {
    expect(assignAgentType({ age: 29 }, () => 0.1)).toBe('mercenary');
    expect(assignAgentType({ age: 29 }, () => 0.3)).toBe('loyal');
    expect(assignAgentType({ age: 29 }, () => 0.5)).toBe('ring_chaser');
    expect(assignAgentType({ age: 29 }, () => 0.7)).toBe('hometown');
    expect(assignAgentType({ age: 29 }, () => 0.95)).toBe('spotlight');
  });

  it('assigns under-28 players via youth thresholds', () => {
    expect(assignAgentType({ age: 23 }, () => 0.2)).toBe('mercenary');
    expect(assignAgentType({ age: 23 }, () => 0.4)).toBe('spotlight');
    expect(assignAgentType({ age: 23 }, () => 0.6)).toBe('loyal');
    expect(assignAgentType({ age: 23 }, () => 0.75)).toBe('hometown');
    expect(assignAgentType({ age: 23 }, () => 0.95)).toBe('ring_chaser');
  });

  it('resolves agent type objects with fallback to first entry', () => {
    expect(getAgentTypeObj('ring_chaser').id).toBe('ring_chaser');
    expect(getAgentTypeObj('missing').id).toBe(AGENT_TYPES[0].id);
  });
});
