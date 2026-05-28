---
title: Environment Variables
description: All env vars consumed by the frontend and backend.
---

# Environment Variables

## Backend (`backend/.env`)

```bash
# --- Server ---
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug

# --- Database ---
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_portal

# --- Auth ---
JWT_SECRET=my_employee_portal_secret_2026
JWT_EXPIRE=7d

# --- API ---
CORS_ORIGIN=http://localhost:5173
API_VERSION=v1
```

| Variable | Required | Default | Notes |
|----------|:--------:|---------|-------|
| `PORT` | ❌ | `3000` | Express listen port |
| `NODE_ENV` | ❌ | `development` | Switches logging verbosity |
| `LOG_LEVEL` | ❌ | `debug` | `error`, `warn`, `info`, `debug` |
| `DB_HOST` | ✅ | — | MySQL host |
| `DB_PORT` | ❌ | `3306` | MySQL port |
| `DB_USER` | ✅ | — | MySQL user |
| `DB_PASSWORD` | ✅ | — | MySQL password |
| `DB_NAME` | ✅ | — | Database name |
| `JWT_SECRET` | ✅ | — | Secret used to sign JWTs. **Rotate in production.** |
| `JWT_EXPIRE` | ❌ | `7d` | JWT lifetime, e.g. `15m`, `12h`, `30d` |
| `CORS_ORIGIN` | ✅ | — | Frontend origin allowed by CORS |

::: warning
Never commit `.env` to source control. The repo already has it in `.gitignore`.
:::

---

## Frontend (`frontend/.env`)

```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CorpLink
VITE_APP_VERSION=1.0.0
```

| Variable | Required | Default | Notes |
|----------|:--------:|---------|-------|
| `VITE_API_URL` | ✅ | — | Base URL the Axios client points at |
| `VITE_APP_NAME` | ❌ | `CorpLink` | Shown in the layout / title bar |
| `VITE_APP_VERSION` | ❌ | `1.0.0` | Displayed in footer |

::: info
Vite only exposes variables prefixed with `VITE_` to the client. Do **not** put secrets here — they ship to the browser.
:::
