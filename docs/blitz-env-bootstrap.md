# Blitz Environment Bootstrap

## Required Toolchain
1. Node 20+
2. npm
3. git (with Xcode license accepted on macOS)

## Local Readiness
1. Run `npm run verify:toolchain`.
2. Inspect `dist/toolchain-readiness-report.json`.
3. Resolve any failing checks before running blitz gates.

## macOS Note
If git reports Xcode license blocking, run:
- `sudo xcodebuild -license`

## Expected Follow-up
After toolchain is healthy:
1. `npm test`
2. `npm run verify:hybrid`
3. `npm run ci:release-candidate`
