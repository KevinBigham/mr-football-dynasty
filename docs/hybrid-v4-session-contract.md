# Hybrid v4 Legacy Session Health Contract

## Module
`src/app/legacy-session-api.js`

## API
- `startSessionProbe(options)`
- `stopSessionProbe()`
- `getSessionHealth()`

## Health States
- `starting`
- `healthy`
- `unresponsive`
- `recovered`
- `stopped`

## Behavior
- Probe checks heartbeats on `intervalMs`.
- If heartbeat timeout exceeds `unresponsiveAfterMs`, state becomes `unresponsive`.
- If heartbeat resumes from unresponsive, state transitions through `recovered` and `healthy`.

## Integration
- Recovery mapping is in `src/app/recovery-controller.js` via `mapSessionHealthToRecoveryAction`.
- Legacy session smoke report now includes derived `sessionHealth` data.
- Playability report includes `sessionHealth` summary field.
