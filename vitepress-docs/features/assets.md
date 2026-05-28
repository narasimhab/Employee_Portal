---
title: Assets
description: Track laptops, phones, and other company-issued equipment.
---

# Assets

`Assets.jsx` shows the equipment assigned to the current user, with admin-level views for full inventory.

## Page Behavior

- Employees see **their own** assigned assets
- Managers see assets of their team
- Admins see the full inventory and can assign/un-assign

## Asset Fields

| Field | Description |
|-------|-------------|
| `id` | Unique asset ID (e.g. `AST-00123`) |
| `type` | Laptop / Phone / Monitor / Headset / etc. |
| `model` | Manufacturer + model |
| `serial_number` | Serial / IMEI |
| `assigned_to` | User ID |
| `assigned_date` | When it was issued |
| `condition` | New / Good / Fair / Damaged |
| `notes` | Free-form |

## Source

`frontend/src/pages/Assets.jsx`

::: info
Asset CRUD endpoints land in **Phase 4** (Asset & Expense Management). For now the page renders sample data.
:::
