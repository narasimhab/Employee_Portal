---
title: Roles & Permissions
description: RBAC matrix and how access is enforced on both sides.
---

# Roles & Permissions

CorpLink has three roles: **Admin**, **Manager**, **Employee**. Access is enforced on **both** the frontend (`ProtectedRoute`) and the backend (`authenticate` + role middleware).

## Permission Matrix

| Capability | Employee | Manager | Admin |
|------------|:--------:|:-------:|:-----:|
| View own profile | ✅ | ✅ | ✅ |
| Edit own profile | ✅ | ✅ | ✅ |
| View team profiles | ❌ | ✅ | ✅ |
| View all profiles | ❌ | ❌ | ✅ |
| Submit leave | ✅ | ✅ | ✅ |
| Approve leave | ❌ | ✅ | ✅ |
| Submit timesheet | ✅ | ✅ | ✅ |
| Approve timesheet | ❌ | ✅ | ✅ |
| View team performance | ❌ | ✅ | ✅ |
| Conduct performance review | ❌ | ✅ | ✅ |
| Create announcements | ❌ | ❌ | ✅ |
| Manage policies | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| Manage assets inventory | ❌ | ❌ | ✅ |

## Frontend Enforcement

```jsx
<Route
  path="performance"
  element={
    <ProtectedRoute requiredRole="manager">
      <Performance />
    </ProtectedRoute>
  }
/>
```

`ProtectedRoute`:

1. Checks for a token in `localStorage`
2. Optionally checks `user.role` against `requiredRole`
3. Redirects to `/login` (no token) or `/` (insufficient role)

## Backend Enforcement

The backend treats the frontend gate as a UX optimization only — it re-validates roles in middleware:

```js
// authenticate parses the JWT and attaches req.user
router.post('/logout', authenticate, logout)

// Role-restricted endpoints add a second middleware:
router.get('/admin/users', authenticate, authorize('admin'), listUsers)
```

::: danger
**Never rely solely on frontend role checks.** A user can edit their JS at runtime — backend middleware is the source of truth.
:::

## Adding a New Role

1. Add a row in the `roles` table.
2. Add the role to the `requiredRole` prop accepted by `ProtectedRoute`.
3. Update the navigation menu in `Layout.jsx`.
4. Update backend `authorize()` checks where appropriate.
5. Update this doc!
