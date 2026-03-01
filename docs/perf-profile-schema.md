# Perf Profile Schema (`dist/perf-profile.json`)

## Top-Level
- `generatedAt: string (ISO date-time)`
- `distDir: string`
- `index: object`
- `assets: array`
- `topAssets: array (up to 5 largest assets)`

## `index`
- `file: "index.html"`
- `bytes: number`
- `gzipBytes: number`
- `modulePreloads: string[]`
- `modulePreloadsCount: number`

## `assets[]`
- `file: string`
- `bytes: number`
- `gzipBytes: number`

## Compare Output (`dist/perf-profile-compare.json`)
- `summary.totalBytesDelta`
- `summary.totalGzipBytesDelta`
- `preloadDelta.added[]`
- `preloadDelta.removed[]`
- `assetDeltas[]` with per-file byte/gzip deltas and status (`added|removed|changed`)
