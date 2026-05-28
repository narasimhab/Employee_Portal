---
title: Dashboard API
description: Stats and announcements endpoints used by the dashboard page.
---

# Dashboard API

All routes under `/api/dashboard` require a valid JWT. Source: `backend/src/routes/dashboard.js`.

---

## GET `/api/dashboard/stats`

Return aggregate counts for the dashboard widgets.

### Request

```bash
curl http://localhost:3000/api/dashboard/stats \
  -H "Authorization: Bearer <token>"
```

### Response

```json
// 200 OK
{
  "success": true,
  "data": {
    "totalEmployees": 10,
    "activeProjects": 5,
    "pendingLeaves": 2,
    "upcomingHolidays": 3
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `totalEmployees` | number | Count of active users. |
| `activeProjects` | number | Projects with status = `Active`. |
| `pendingLeaves` | number | Visible only to managers and admins; employees see their own pending count. |
| `upcomingHolidays` | number | Holidays in the next 30 days. |

---

## GET `/api/dashboard/announcements`

Return the latest announcements, newest first.

### Request

```bash
curl http://localhost:3000/api/dashboard/announcements \
  -H "Authorization: Bearer <token>"
```

### Query Parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | `10` | Maximum number of announcements to return. |
| `category` | string | — | Filter by category (e.g. `HR`, `IT`, `General`). |

### Response

```json
// 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Quarterly All-Hands",
      "body": "Join us Friday at 3 PM in the main auditorium...",
      "category": "General",
      "created_at": "2026-05-20T10:00:00Z",
      "created_by": {
        "id": 4,
        "name": "Sarah Johnson"
      }
    }
  ]
}
```

### Errors

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid JWT |
| 500 | Database error (check logs) |
