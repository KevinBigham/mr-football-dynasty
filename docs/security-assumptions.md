# Security Assumptions (Hybrid v4)

1. Legacy runtime is served from same origin under `/legacy` only.
2. Playable build checks reject any external/protocol-relative refs from legacy HTML.
3. URI schemes like `javascript:` and `data:` are blocked by playable build checks.
4. Launcher direct-open links use `rel="noopener noreferrer"` and `referrerPolicy="no-referrer"`.
5. Legacy iframe is constrained by an explicit sandbox policy and no-referrer policy.
6. Save import payloads are schema-validated, checksum-checked, and size-bounded.
7. Security reports use `security-report.v2` schema and are emitted as CI artifacts.
