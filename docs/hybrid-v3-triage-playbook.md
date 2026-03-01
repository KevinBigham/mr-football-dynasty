# Hybrid v3 Triage Playbook

## Priority Rules
1. P0: cannot enter play mode or hard crash.
2. P1: save corruption/loss risk, broken recovery path.
3. P2: UX degradation with workaround.
4. P3: copy/polish issues.

## Ownership Routing
1. Codex lane: launcher/runtime/infra failures.
2. Claude lane: gameplay/systems behavior failures.
3. Shared: contract drift and RC gating issues.

## Close Criteria
1. P0/P1 resolved before `GREEN`.
2. P2/P3 can ship in `YELLOW` only with documented mitigations.
