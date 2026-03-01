# No Gameplay Change Checklist

Run before each push in stability/perf streams.

- [ ] Changed files avoid `src/systems/*` gameplay behavior edits.
- [ ] Changed files avoid `src/data/*` behavior edits.
- [ ] `npm run verify:no-gameplay-delta` passes (with provided changed file list).
- [ ] Validation UI wording remains stable.
- [ ] Existing runtime API exports remain compatible.
