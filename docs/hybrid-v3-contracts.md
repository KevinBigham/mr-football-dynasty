# Hybrid v3 Contracts

## App Contracts
1. `startLegacyBridge(options)`, `stopLegacyBridge()`, `onLegacyEvent(handler)`.
2. `readAutosaveMeta()`, `readAutosavePayload()`, `writeAutosavePayload(payload)`, `verifyAutosavePayload(payload)`.
3. `listSlots()`, `saveSlot(slotId, payload, meta)`, `loadSlot(slotId)`, `deleteSlot(slotId)`.
4. `buildPlayabilityReport(input)`, `summarizePlayabilityChecks(report)`.

## Script Contracts
1. `npm run verify:legacy-save`
2. `npm run smoke:legacy-session`
3. `npm run report:playability`
4. `npm run verify:hybrid`
5. `npm run ci:release-candidate`
6. `npm run verify:security`
7. `npm run playability:compare`

## CI Contracts
1. `playable` job remains mandatory.
2. `hybrid` job is mandatory and uploads hybrid artifacts.
3. Nightly runs include hybrid verification and report publishing.
