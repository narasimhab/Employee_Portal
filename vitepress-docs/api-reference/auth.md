---
title: Authentication API
description: Login, logout, profile, and password endpoints.
---

# Authentication API

All authentication routes live under `/api/auth`. Source: `backend/src/routes/auth.js`.

---

## POST `/api/auth/login`

Authenticate a user and receive a JWT.

### Request

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.smith@company.com",
    "password": "password123"
  }'
```

### Body

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `email` | string | ✅ | User's email address. |
| `password` | string | ✅ | Plain-text password. Validated against a bcrypt hash in the DB. |

### Response

```json
// 200 OK
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": 1,
      "email": "john.smith@company.com",
      "name": "John Smith",
      "role": "admin",
      "avatar_url": "/avatars/1.png"
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `token` | string | Bearer JWT, valid for `JWT_EXPIRE` (default 7 days). |
| `user` | object | Public user profile (no password hash). |

### Errors

| Status | Reason |
|--------|--------|
| 400 | Missing email or password |
| 401 | Invalid credentials |

---

## POST `/api/auth/logout`

Invalidate the current session row in `user_sessions`.

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <token>"
```

**Returns:** `{ "success": true, "message": "Logged out" }`

---

## GET `/api/auth/profile`

Return the currently authenticated user's profile.

```bash
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.smith@company.com",
    "name": "John Smith",
    "role": "admin",
    "department": "Engineering",
    "hire_date": "2023-04-12"
  }
}
```

---

## POST `/api/auth/change-password`

Update the password for the authenticated user.

```bash
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "password123",
    "newPassword": "MyNewStrongPass!2026"
  }'
```

### Body

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `currentPassword` | string | ✅ | Existing password, re-verified for safety. |
| `newPassword` | string | ✅ | New password. Minimum 8 characters (enforced by Joi validator). |

**Response:** `{ "success": true, "message": "Password updated" }`

### Errors

| Status | Reason |
|--------|--------|
| 400 | Validation failure (too short, missing field) |
| 401 | Current password is wrong |
