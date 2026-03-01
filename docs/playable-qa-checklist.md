# Playable QA Checklist (5-Minute Pass)

1. Launch `npm run dev`.
2. Confirm top nav shows `Play Now` and `Module Status`.
3. Open `?mode=play` and verify legacy game loads in iframe.
4. Click `Open legacy directly` and verify standalone legacy page loads.
5. Open `?mode=status` and verify runtime checks render.
6. Confirm status labels remain unchanged:
   - `Loading Module Validation`
   - `Module Validation Error`
   - `Runtime Validation`
   - `Extracted Module Status`
   - `Phase 1 Summary`
7. Verify mode toggle still works after reload (storage persistence).
8. Run `npm run verify:playable` and confirm pass.
