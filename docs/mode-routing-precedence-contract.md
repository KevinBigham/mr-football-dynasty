# Mode Routing Precedence Contract

## Precedence
1. Query `?mode=`
2. Hash `#mode=` / `#play` / `#status`
3. Persisted storage value
4. Default mode

## Canonical Modes
- `play`
- `status`

Invalid values are coerced to default.
