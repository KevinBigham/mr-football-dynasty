# Hybrid v4 RC Bundle Index

## Builder
- Script: `scripts/ci/build-rc-bundle.mjs`
- Command: `npm run rc:bundle`
- Output: `dist/rc-bundle-manifest.json`

## Manifest Fields
- `schemaVersion`
- `generatedAt`
- `ok`
- `included[]` with `path`, `bytes`, `sha256`
- `missing[]`

## RC Workflow Integration
`release-candidate.yml` runs `npm run rc:bundle` before packaging artifacts.
