---
sidebar_position: 2
title: Phase 2 — Authentication
description: JWT login, role-based access control, and audit logging.
---

# Phase 2 — Authentication

:::info
Full details in `docs/PHASE2_AUTHENTICATION.md` at the repo root. This page is the executive summary.
:::

## Status: ✅ Complete

## Highlights

| | |
|---|---|
| 🔑 **JWT Auth** | `POST /api/auth/login` issues a 7-day JWT. The frontend stores it in `localStorage` and attaches it to every Axios request. |
| 🔒 **bcrypt Hashing** | All passwords are hashed with bcryptjs. Plain-text passwords never touch the database. |
| 🛡️ **Role-Based Access** | Three roles enforced in middleware AND in `ProtectedRoute` on the frontend. |
| 📋 **Audit Logging** | `audit_logs` table records login attempts, password changes, and role updates. |

## New Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/login` | Authenticate and get JWT |
| POST | `/api/auth/logout` | Invalidate session |
| GET | `/api/auth/profile` | Get current user |
| POST | `/api/auth/change-password` | Update password |

See [Authentication API](/docs/api-reference/auth) for the full reference.

## New Tables

- `user_sessions` — tracks active JWTs server-side
- `roles` — role definitions
- `audit_logs` — security event log

## Frontend Pieces

- `AuthContext` (global auth state)
- `useAuth()` custom hook
- `Login.jsx` with form validation
- `ProtectedRoute` component
- Role-based nav in `Layout.jsx`

## Up Next

**Phase 3** focuses on the employee directory, leave workflow, timesheet submission, and performance reviews.
