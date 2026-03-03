# AddiScan

## Current State
The draft has expired and needs to be rebuilt from scratch. Previous version (v10-v11) had:
- Ingredient/additive scanner (text input + partial match search)
- Encyclopedia tab listing all additives
- Admin page to add/edit/delete additives with fields: name, e-number, category, description, health effects, common products, alternatives
- 10 pre-seeded default additives
- Backend used mutable HashMap with stable var upgrade persistence
- Auto-seed on load if database is empty

## Requested Changes (Diff)

### Add
- Nothing new — full rebuild of the working v11 feature set

### Modify
- Nothing — rebuild as-is with all fixes applied

### Remove
- Nothing

## Implementation Plan

### Backend (Motoko)
- Stable var for additive storage (persist across upgrades)
- CRUD: addAdditive, updateAdditive, deleteAdditive, getAllAdditives, searchAdditives
- searchAdditives does bidirectional case-insensitive partial match on name and e-number
- 10 default additives seeded in `system func init()`
- Additive record fields: id, name, eNumber, category, description, healthEffects, commonProducts, alternatives

### Frontend
- Tab navigation: Scan, Encyclopedia, Admin
- Scan tab: text input for ingredient list, search button, results grid showing matched additives with name, e-number, category, description, health effects, common products, and alternatives
- Encyclopedia tab: list all additives with full detail cards, auto-seed if empty
- Admin tab: form to add new additive (all fields including alternatives), list of existing additives with edit and delete actions
- Partial match: both directions — input contains additive name OR additive name contains input (case-insensitive)
- Data always fetched fresh (no stale cache)
