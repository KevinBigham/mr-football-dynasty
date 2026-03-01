# Hybrid v4 Failure Class Matrix

| Gate | Failure Class | Default Owner | Notes |
|---|---|---|---|
| `verify:toolchain` | environment | Codex | Node/npm/Xcode/git readiness |
| `verify:lane` | lane policy | Codex | forbidden/shared-window edits |
| `verify:hybrid` | runtime/playability | Codex | launcher + legacy bridge path |
| `e2e:launcher` | UI/runtime | Codex | mode routing, tab behavior, fallbacks |
| `verify:security` | security policy | Codex | sanitizer/sandbox/link policy |
| `verify:perf` | perf threshold | Codex | catastrophic fails block RC |
| `verify:contracts` | gameplay contract drift | Claude/Codex | fixture drift -> Claude, parser infra -> Codex |
