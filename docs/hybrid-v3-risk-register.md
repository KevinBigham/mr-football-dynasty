# Hybrid v3 Risk Register

| Risk | Lane | Severity | Mitigation | Status |
|---|---|---|---|---|
| Lane overlap on shared files | Shared | High | enforce `verify:lane` + window log | Open |
| Legacy iframe load instability | Codex | High | retry + direct-open fallback + smoke gate | Open |
| Save decode incompatibility | Codex | High | LZW roundtrip tests + safe parse guards | Open |
| Gameplay contract drift | Shared | High | add `verify:contracts` gate | Open |
