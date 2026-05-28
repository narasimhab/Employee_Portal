---
sidebar_position: 1
title: Dashboard
description: Home page with stats, recent activity, and announcements.
---

# Dashboard

The dashboard is the landing page after login (`/`). It surfaces the most important information for the logged-in user.

## What's on the Dashboard

| Section | Purpose |
|---------|---------|
| 📊 **User Stats** | Total employees, active projects, pending leaves, upcoming holidays. |
| 📢 **Recent Announcements** | Latest company-wide announcements with timestamps. |
| ⚡ **Quick Actions** | Shortcuts to submit leave, log timesheet, view profile. |
| ✅ **My Tasks** | Items needing user attention (pending approvals for managers). |

## Data Sources

The dashboard hits two endpoints on mount:

```js
GET /api/dashboard/stats
GET /api/dashboard/announcements
```

Both require a valid JWT in the `Authorization: Bearer <token>` header.

See the [Dashboard API](/docs/api-reference/dashboard) reference.

## Source

The page lives at `frontend/src/pages/Dashboard.jsx` and is rendered as the index route inside the protected `Layout`.
