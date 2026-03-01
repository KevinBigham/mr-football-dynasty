# Hybrid v4 Shared-Window Approval Flow

## Approval Rules
1. Shared window must be explicitly named (`contracts-integration` or `final-contracts`).
2. Requested edits must be limited to profile-allowed files.
3. Window must be time-bounded and closed after the intended change set.

## Required Inputs
- Requested profile name
- Planned file list
- Owning lane (`codex-hybrid-v4` or `claude-gameplay-v4`)
- Link to active ledger/checkpoint entry

## Approval Steps
1. Open request using the log template (`docs/hybrid-v4-shared-window-log-template.md`).
2. Confirm profile and files match allowlist.
3. Execute lane check with profile:
   - `node scripts/verify-no-gameplay-delta.mjs --strict-lane --lane <lane> --shared-window-profile <profile> --report dist/lane-report.json --shared-audit dist/shared-window-audit.json`
4. Merge and close window in logs.

## Audit Expectations
- CI and nightly upload `dist/shared-window-audit.json`.
- Job summary prints active shared-window profile.
