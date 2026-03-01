# Save Slots Schema

## Slot Shape
- `slotId: string`
- `createdAt: number`
- `updatedAt: number`
- `meta: object`
- `payload: object`
- `checksum: string`

## Store Key
- localStorage key: `mfd.saveSlots.v1`

## Behavior
- List sorted by recency.
- Load validates checksum and payload structure.
- Delete supports soft and hard modes.
