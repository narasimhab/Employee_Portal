---
sidebar_position: 1
title: API Introduction
description: How to authenticate against and call the CorpLink backend.
---

# API Introduction

The CorpLink backend is a REST API served by Express on **port 3000** (in dev). All endpoints are prefixed with `/api`.

## Base URL

| Environment | URL |
|-------------|-----|
| Local dev | `http://localhost:3000/api` |
| Production | _(set via your hosting provider)_ |

## Authentication

Every endpoint except `POST /api/auth/login` and `GET /api/health` requires a **JWT** in the `Authorization` header:

```
Authorization: Bearer <token>
```

You get a token from `POST /api/auth/login`. Tokens expire after **7 days** (configurable via `JWT_EXPIRE`).

## Response Envelope

All responses use a consistent envelope:

```json
{
  "success": true,
  "data": { },
  "message": "Optional human-readable message"
}
```

Errors:

```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "ErrorCode (debug only)"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad request / validation failure |
| 401 | Missing or invalid JWT |
| 403 | Authenticated but not authorized for this resource |
| 404 | Not found |
| 500 | Server error (check `backend/logs/`) |

## Endpoints

| | Endpoint |
|---|---|
| 💓 | [Health](/docs/api-reference/health) — Liveness check |
| 🔑 | [Authentication](/docs/api-reference/auth) — Login, logout, profile, change password |
| 📊 | [Dashboard](/docs/api-reference/dashboard) — Stats and announcements |
