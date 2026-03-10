import { describe, expect, it } from 'vitest';
import fixturePacket from './fixtures/game-events/golden-consumer-packet.json';

import {
  adaptConsumerViewModel,
  CONSUMER_PACKET_MESSAGE_TYPE,
  createConsumerPacketReceiver,
  createGameEventReceiver,
  createLiveEventConsumer,
  GAME_EVENT_MESSAGE_TYPE,
  SOURCE_STATE,
  validateConsumerPacket,
  validateConsumerPacketMessage,
  validateGameEventEnvelope,
  validateGameEventMessage,
} from '../src/app/live-event-consumer.js';

function createWindowStub() {
  const handlers = new Set();
  return {
    addEventListener(name, fn) {
      if (name === 'message') handlers.add(fn);
    },
    removeEventListener(name, fn) {
      if (name === 'message') handlers.delete(fn);
    },
    post(data) {
      handlers.forEach((fn) => fn({ data }));
    },
  };
}

function toConsumerPacket(overrides = {}) {
  return {
    schemaVersion: fixturePacket.schemaVersion,
    context: fixturePacket.context,
    envelope: { ...fixturePacket.envelope, eventName: 'game_end', seq: 55 },
    weeklyHook: fixturePacket.weeklyHook,
    postgameAutopsy: fixturePacket.postgameAutopsy,
    ...overrides,
  };
}

describe('live event consumer', () => {
  it('validates only canonical game-event messages', () => {
    const ok = validateGameEventMessage({ type: GAME_EVENT_MESSAGE_TYPE, envelope: fixturePacket.envelope });
    const badType = validateGameEventMessage({ type: 'other', envelope: fixturePacket.envelope });
    const badSchema = validateGameEventEnvelope({ ...fixturePacket.envelope, schemaVersion: '9.9.9' });
    expect(ok.ok).toBe(true);
    expect(badType.ok).toBe(false);
    expect(badSchema.reason).toBe('schema_version_mismatch');
  });

  it('validates consumer packet messages', () => {
    const packet = toConsumerPacket();
    const ok = validateConsumerPacketMessage({ type: CONSUMER_PACKET_MESSAGE_TYPE, packet });
    const badType = validateConsumerPacketMessage({ type: GAME_EVENT_MESSAGE_TYPE, packet });
    const badPacket = validateConsumerPacket({ ...packet, weeklyHook: null });
    expect(ok.ok).toBe(true);
    expect(badType.ok).toBe(false);
    expect(badPacket.reason).toBe('packet_weekly_hook_missing_or_not_object');
  });

  it('receiver rejects invalid and forwards validated envelopes', () => {
    const win = createWindowStub();
    const valid = [];
    const invalid = [];
    const off = createGameEventReceiver({
      target: win,
      onEnvelope(envelope) { valid.push(envelope); },
      onInvalid(diag) { invalid.push(diag.reason); },
    });

    win.post({ type: GAME_EVENT_MESSAGE_TYPE, envelope: fixturePacket.envelope });
    win.post({ type: GAME_EVENT_MESSAGE_TYPE, envelope: { ...fixturePacket.envelope, payload: null } });

    off();

    expect(valid).toHaveLength(1);
    expect(valid[0].seq).toBe(1);
    expect(invalid).toEqual(['invalid_payload']);
  });

  it('consumer packet receiver rejects invalid and forwards validated packets', () => {
    const win = createWindowStub();
    const valid = [];
    const invalid = [];
    const off = createConsumerPacketReceiver({
      target: win,
      onPacket(packet) { valid.push(packet); },
      onInvalid(diag) { invalid.push(diag.reason); },
    });

    win.post({ type: CONSUMER_PACKET_MESSAGE_TYPE, packet: toConsumerPacket() });
    win.post({ type: CONSUMER_PACKET_MESSAGE_TYPE, packet: toConsumerPacket({ postgameAutopsy: null }) });

    off();

    expect(valid).toHaveLength(1);
    expect(valid[0].schemaVersion).toBe('0.1.0');
    expect(invalid).toEqual(['packet_postgame_autopsy_missing_or_not_object']);
  });

  it('stays on fixture until validated active session game_start arrives', () => {
    const consumer = createLiveEventConsumer({ fixturePacket });
    const nonStart = {
      ...fixturePacket.envelope,
      eventName: 'drive_start',
      seq: 2,
      payload: { driveNum: 1 },
    };

    const blocked = consumer.ingestMessage({ type: GAME_EVENT_MESSAGE_TYPE, envelope: nonStart });
    expect(blocked.ok).toBe(false);
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.FIXTURE);

    const started = consumer.ingestMessage({ type: GAME_EVENT_MESSAGE_TYPE, envelope: fixturePacket.envelope });
    expect(started.ok).toBe(true);
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.LIVE);
  });

  it('transitions from live to stale when event stream goes quiet', () => {
    let tick = 0;
    const consumer = createLiveEventConsumer({ fixturePacket, staleAfterMs: 1000, now: () => tick });
    consumer.ingestMessage({ type: GAME_EVENT_MESSAGE_TYPE, envelope: fixturePacket.envelope });
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.LIVE);
    tick = 1001;
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.STALE);
  });

  it('switches weeklyHook and postgameAutopsy to live packet when packet arrives', () => {
    const consumer = createLiveEventConsumer({ fixturePacket });
    const packet = toConsumerPacket({
      weeklyHook: { ...fixturePacket.weeklyHook, result: 'W 99-0' },
      postgameAutopsy: { ...fixturePacket.postgameAutopsy, summary: 'LIVE AUTOPSY' },
    });

    consumer.ingestConsumerPacketMessage({ type: CONSUMER_PACKET_MESSAGE_TYPE, packet });
    const view = consumer.getViewModel();

    expect(view.packetSource).toBe('live-packet');
    expect(view.commandDesk.weeklyHook.result).toBe('W 99-0');
    expect(view.postgameAutopsy.autopsy.summary).toBe('LIVE AUTOPSY');
  });

  it('has parity for fixture and live shells through one adapter', () => {
    const fixtureView = adaptConsumerViewModel({ fixturePacket, sourceState: SOURCE_STATE.FIXTURE });
    const liveView = adaptConsumerViewModel({
      fixturePacket,
      liveEnvelope: fixturePacket.envelope,
      liveConsumerPacket: toConsumerPacket(),
      sourceState: SOURCE_STATE.LIVE,
    });

    expect(Object.keys(fixtureView).sort()).toEqual(Object.keys(liveView).sort());
    expect(Object.keys(fixtureView.commandDesk).sort()).toEqual(Object.keys(liveView.commandDesk).sort());
    expect(Object.keys(fixtureView.postgameAutopsy).sort()).toEqual(Object.keys(liveView.postgameAutopsy).sort());
  });

  it('keeps adapted payload save/import safe and non-mutating', () => {
    const before = JSON.stringify(fixturePacket);
    const view = adaptConsumerViewModel({ fixturePacket, sourceState: SOURCE_STATE.FIXTURE });
    const roundTrip = JSON.parse(JSON.stringify(view));

    expect(roundTrip.commandDesk.weeklyHook.week).toBe(fixturePacket.weeklyHook.week);
    expect(JSON.stringify(fixturePacket)).toBe(before);
  });

  it('marks invalid source with diagnostics when malformed game envelope arrives pre-live', () => {
    const consumer = createLiveEventConsumer({ fixturePacket });
    const out = consumer.ingestMessage({ type: GAME_EVENT_MESSAGE_TYPE, envelope: { ...fixturePacket.envelope, seq: 'bad' } });
    expect(out.ok).toBe(false);
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.INVALID);
    expect(consumer.diagnostics.invalidCount).toBe(1);
    expect(consumer.diagnostics.lastInvalidReason).toBe('invalid_numeric_field:seq');
  });

  it('tracks invalid consumer packet diagnostics without breaking game-event source state', () => {
    const consumer = createLiveEventConsumer({ fixturePacket });
    const out = consumer.ingestConsumerPacketMessage({ type: CONSUMER_PACKET_MESSAGE_TYPE, packet: { schemaVersion: '0.1.0' } });
    expect(out.ok).toBe(false);
    expect(consumer.diagnostics.packetInvalidCount).toBe(1);
    expect(consumer.getSourceState()).toBe(SOURCE_STATE.FIXTURE);
  });
});
