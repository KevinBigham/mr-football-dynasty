# Legacy Bridge Contract

## API
1. `startLegacyBridge(options)`
2. `stopLegacyBridge()`
3. `onLegacyEvent(handler)`

## Events
1. `legacy_loaded`
2. `legacy_unresponsive`
3. `legacy_recovered`

## Behavior
- Start/stop are idempotent.
- Unresponsive detection uses threshold + backoff.
