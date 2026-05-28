---
sidebar_position: 3
title: Project Structure
description: Where to find what in the CorpLink monorepo.
---

# Project Structure

```
Employee_Portal/
├── frontend/                  # React SPA (Vite)
│   ├── src/
│   │   ├── App.jsx            # Router definitions
│   │   ├── main.jsx           # Entry point
│   │   ├── components/        # Layout, ProtectedRoute, Loading
│   │   ├── pages/             # 18 page components
│   │   ├── context/           # AuthContext
│   │   ├── hooks/             # useAuth, etc.
│   │   ├── services/          # Axios API wrappers
│   │   ├── utils/             # Helpers
│   │   └── styles/            # Global CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                   # Express REST API
│   ├── src/
│   │   ├── server.js          # App entry point
│   │   ├── config/            # logger, db pool
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # auth, errorHandler, requestLogger, validate
│   │   ├── routes/            # auth, dashboard, health
│   │   ├── validators/        # Joi schemas
│   │   ├── utils/             # password, errors
│   │   └── models/            # (reserved for ORM)
│   ├── logs/                  # Winston output
│   └── package.json
│
├── database/                  # SQL files
│   ├── schema.sql             # 16 base tables
│   ├── auth_schema_update.sql # 3 auth tables
│   ├── seed.sql               # Sample data
│   └── auth_seed_update.sql   # Hashed demo passwords
│
├── docs/                      # Mintlify docs
├── vitepress-docs/            # VitePress docs
├── docusaurus-docs/           # Docusaurus docs (this site)
│
├── README.md                  # High-level project overview
├── PROJECT_STATUS.md          # Phase-by-phase progress
├── start.bat / start.sh       # Convenience launchers
└── *.html                     # Original static prototypes
```

## Frontend Pages

Each page in `frontend/src/pages/` maps to a route in `App.jsx`:

| Route | Page | Notes |
|-------|------|-------|
| `/login` | `Login.jsx` | Public |
| `/` | `Dashboard.jsx` | Default after login |
| `/directory` | `Directory.jsx` | Searchable employee list |
| `/employee/:id` | `EmployeeProfile.jsx` | Profile detail |
| `/orgchart` | `OrgChart.jsx` | Visualization |
| `/projects` | `Projects.jsx` | |
| `/announcements` | `Announcements.jsx` | |
| `/leaves` | `Leave.jsx` | |
| `/timesheet` | `Timesheet.jsx` | |
| `/performance` | `Performance.jsx` | **Manager-only** |
| `/assets` | `Assets.jsx` | |
| `/policies` | `Policies.jsx` | |
| `/certifications` | `Certifications.jsx` | |
| `/surveys` | `Surveys.jsx` | |
| `/holidays` | `Holidays.jsx` | |
| `/expenses` | `Expenses.jsx` | |
| `/rewards` | `Rewards.jsx` | |

## Backend Modules

Routers wired up in `backend/src/server.js`:

```js
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
```

See the [API Reference](/docs/api-reference/introduction) for endpoint details.
