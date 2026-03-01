# Playable Known Issues

## Current
- Legacy gameplay is loaded through iframe from `/legacy/index.html` and remains a separate runtime.
- Cross-runtime state sharing between launcher and legacy app is intentionally minimal.
- Playability banner is non-blocking; users can still switch to `Module Status`.

## Environment
- Local `git` workflows may be blocked if Xcode license is not accepted on macOS.

## Deferred
- Deep integration of extracted systems into launcher runtime.
- Performance budgets as hard CI gates.
