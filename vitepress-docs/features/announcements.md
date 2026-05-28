---
title: Announcements
description: Company-wide announcements feed.
---

# Announcements

`Announcements.jsx` provides a chronological feed of company news.

## Page Behavior

- Loads on mount via `GET /api/dashboard/announcements`
- Sortable by date (newest first by default)
- Filter by category (HR, IT, General, etc.)
- Admins can create/edit/delete announcements (UI gated behind role check)

## API

```bash
GET /api/dashboard/announcements
Authorization: Bearer <jwt>
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Quarterly All-Hands",
      "body": "Join us Friday at 3 PM...",
      "category": "General",
      "created_at": "2026-05-20T10:00:00Z",
      "created_by": "Sarah Johnson"
    }
  ]
}
```

## Source

`frontend/src/pages/Announcements.jsx`

## Related

- [Dashboard API](/api-reference/dashboard) — shared announcement endpoint
- [Roles & Permissions](/development/roles-and-permissions) — who can create announcements
