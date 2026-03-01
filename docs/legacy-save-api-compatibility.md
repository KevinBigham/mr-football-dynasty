# Legacy Save API Compatibility

## Sources
1. IndexedDB: DB `MrFootballDynasty`, store `saves`, key `autosave`.
2. Fallback localStorage: `mr-football-save`.

## Encoding
- Prefix: `LZW1:`
- Payload: JSON compressed with LZW and base64 encoded.

## Safety
- Corrupt payloads fail safely with explicit errors.
