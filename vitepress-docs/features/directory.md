---
title: Employee Directory
description: Searchable list of all employees, with detail profiles.
---

# Employee Directory

The Directory module gives users a quick way to find colleagues.

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/directory` | `Directory.jsx` | Searchable, filterable list |
| `/employee/:id` | `EmployeeProfile.jsx` | Individual profile detail |

## Capabilities

- **Search** by name, email, or department
- **Filter** by role, location, or status
- **Click-through** to a full profile (`/employee/:id`)
- Profile shows contact info, manager, projects, certifications, leave balance

## Profile Tabs

| Tab | Contents |
|-----|----------|
| **Overview** | Personal info, manager, department, hire date. |
| **Projects** | All projects the employee is currently assigned to. |
| **Skills & Certifications** | Pulled from the `certifications` table. |
| **Leave** | Available balance + history. |

## Source Files

- `frontend/src/pages/Directory.jsx`
- `frontend/src/pages/EmployeeProfile.jsx`
- `frontend/src/pages/EmployeeProfile2.jsx` (alternate layout)

::: info
Directory endpoints will be added in **Phase 3** (see [Project Status](/phase-guides/phase-1-setup) for roadmap).
:::
