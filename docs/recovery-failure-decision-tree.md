# Recovery Failure Decision Tree

1. iframe error detected.
2. Try `reload_iframe`.
3. If still failing, offer `open_direct`.
4. If save context exists, attempt `restore_last_good_slot`.
5. Final fallback: status mode.

Throttle is applied to avoid recovery loops.
