# Hybrid v4 Save Import/Export Contract

## Module
`src/app/save-import-export.js`

## API
- `exportSlotToFile(slotId, options?)`
- `importSlotFromPayload(input, options?)`
- `validateImportPayload(input)`
- `mapImportExportError(code)`

## Envelope Schema
```json
{
  "schemaVersion": "mfd-save-slot.v1",
  "exportedAt": "ISO-8601",
  "slot": {
    "slotId": "string",
    "meta": {},
    "payload": {},
    "checksum": "hex"
  }
}
```

## Guardrails
- Max import size is enforced (`MAX_IMPORT_BYTES`).
- Payload must pass legacy autosave payload validation.
- Checksum mismatches are rejected.

## Safety Script
`npm run verify:save-import` -> `dist/import-safety-report.json`
