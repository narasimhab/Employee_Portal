---
title: Projects
description: Active projects, members, and timelines.
---

# Projects

`Projects.jsx` lists all projects the user is involved with.

## Fields per Project

| Field | Example |
|-------|---------|
| `id` | `PRJ-005` |
| `name` | CorpLink v2 |
| `description` | Internal employee portal |
| `manager_id` | 7 |
| `members` | `[1, 4, 8, 12]` |
| `start_date` | 2026-01-15 |
| `end_date` | 2026-12-31 |
| `status` | Active / On Hold / Completed |

## Views

::: code-group

```text [Card View]
Grid of project cards with progress, owner, and member avatars.
```

```text [List View]
Sortable table with name, status, dates, member count.
```

```text [Timeline]
Gantt-style timeline for active projects.
```

:::

## Source

`frontend/src/pages/Projects.jsx`
