# Hybrid v3 Failure Modes

## Launcher/Mode Routing
1. Invalid query/hash mode values.
2. Local storage read/write failures.
3. Forced mode lock drift.

## Legacy Runtime
1. Missing legacy assets.
2. Broken script refs in `legacy/index.html`.
3. iframe load failure or unresponsive runtime.

## Save Paths
1. Corrupt LZW payloads.
2. IndexedDB unavailable.
3. Local storage fallback write/read failures.
4. Save-slot checksum mismatch.

## Guardrails
1. Lane policy failure (`verify:lane`).
2. Playability gate failure (`verify:hybrid`).
