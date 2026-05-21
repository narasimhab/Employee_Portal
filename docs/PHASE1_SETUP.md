# Employee Portal - Phase 1 Setup Guide

## Project Overview
CorpLink is a comprehensive Employee Portal built with React (Vite), Node.js (Express), and MySQL. Phase 1 focuses on project initialization and foundational setup.

## Project Structure

```
employee-portal/
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Helper functions
│   │   ├── context/       # React context
│   │   ├── styles/        # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── config/        # Database, JWT, Logger config
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Authentication, logging, error handling
│   │   ├── utils/         # Helper functions
│   │   ├── validators/    # Input validation
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── logs/
│
├── database/              # MySQL database setup
│   ├── schema.sql         # Database schema
│   ├── seed.sql           # Sample data
│   └── README.md
│
└── docs/                  # Project documentation
    └── SETUP.md
```

## Phase 1: Project Initialization

### Prerequisites
- Node.js v18+ and npm
- MySQL 8.0+
- Git
- VS Code (recommended)

### Frontend Setup

#### 1. Navigate to Frontend Directory
```bash
cd frontend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
```

#### 4. Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

**Key Features:**
- ✅ Vite configuration with React plugin
- ✅ Tailwind CSS with custom theme colors
- ✅ React Router setup for navigation
- ✅ Axios HTTP client with interceptors
- ✅ Custom hooks (useFetch, useLocalStorage)
- ✅ Theme utilities and color system
- ✅ Page templates for all routes

### Backend Setup

#### 1. Navigate to Backend Directory
```bash
cd backend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create `.env`:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=employee_portal
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

#### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

**Key Features:**
- ✅ Express server with CORS
- ✅ MySQL connection pooling
- ✅ JWT authentication middleware
- ✅ Error handling middleware
- ✅ Request logging with Winston
- ✅ Environment configuration
- ✅ Health check endpoint

### Database Setup

#### 1. Create Database
```bash
mysql -u root -p < database/schema.sql
```

#### 2. Seed Sample Data
```bash
mysql -u root -p employee_portal < database/seed.sql
```

#### 3. Verify Setup
```bash
mysql -u root -p
USE employee_portal;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

**Database Tables (14 total):**
- users - Employee information
- departments - Department management
- projects - Project tracking
- announcements - Company announcements
- leaves - Leave requests and tracking
- timesheets - Work hour tracking
- performance_reviews - Performance evaluations
- assets - Equipment and asset management
- policies - Company policies
- certifications - Employee certifications
- surveys - Employee surveys
- survey_responses - Survey responses
- holidays - Company holidays
- expenses - Expense tracking
- rewards - Recognition and rewards
- org_hierarchy - Organization structure

---

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running"
}
```

### 2. Test Database Connection
Check backend logs for successful connection message:
```
Database connection successful on port 3306
```

### 3. Test Frontend
Navigate to `http://localhost:5173` and verify:
- Dashboard loads without errors
- Navigation menu is visible
- No console errors

---

## Available Routes (Phase 1)

### Frontend Routes
- `/` - Dashboard
- `/directory` - Employee Directory
- `/orgchart` - Organization Chart
- `/projects` - Projects
- `/announcements` - Announcements
- `/leaves` - Leave Management
- `/timesheet` - Timesheet Entry
- `/performance` - Performance Reviews
- `/assets` - Asset Management
- `/policies` - Company Policies
- `/certifications` - Certifications
- `/surveys` - Surveys
- `/holidays` - Holidays
- `/expenses` - Expenses
- `/rewards` - Rewards

### API Endpoints (Phase 1)
- `GET /api/health` - Health check
- `GET /api/dashboard/stats` - Dashboard statistics (requires auth)
- `GET /api/dashboard/announcements` - Announcements (requires auth)

---

## Development Workflow

### Starting All Services
1. **Terminal 1 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Terminal 2 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Database:**
   MySQL should be running (usually starts automatically)

### Common Commands

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint check
```

**Backend:**
```bash
npm run dev      # Development server with nodemon
npm start        # Production server
npm run test     # Run tests (when configured)
npm run lint     # ESLint check
```

---

## Theme & Styling

### Color Palette
Located in `frontend/src/utils/theme.js`:

**Primary Colors:**
- Primary 600: `#02145d` (Dark Blue)
- Primary 500: `#04228c` (Main Blue)
- Accent: Orange, Pink, Purple, Teal, Emerald

**Usage in Components:**
```jsx
<div className="bg-primary-600 text-white rounded-lg p-4">
  Primary Button
</div>
```

### Tailwind Configuration
- Custom theme colors
- Extended border radius
- Box shadow utilities
- Font family: Inter

---

## Environment Variables Reference

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=employee_portal
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

---

## Troubleshooting

### Frontend Issues

**Module not found error:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
```bash
# Kill the process on port 5173
lsof -i :5173
kill -9 <PID>
```

### Backend Issues

**Cannot connect to database:**
- Verify MySQL is running: `mysql -u root -p`
- Check database credentials in `.env`
- Ensure database exists: `mysql -u root -p employee_portal`

**Port 3000 already in use:**
```bash
# Kill the process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Database Issues

**Schema import failed:**
```bash
# Try with explicit encoding
mysql -u root -p --default-character-set=utf8mb4 < database/schema.sql
```

**Seed data import failed:**
```bash
# Check error log
mysql -u root -p employee_portal < database/seed.sql 2>&1 | tail -20
```

---

## Next Steps (Phase 2)

- [ ] User authentication (login/logout)
- [ ] Authorization & role-based access
- [ ] Employee directory features
- [ ] Leave management system
- [ ] Timesheet functionality
- [ ] Performance review system
- [ ] Dashboard analytics
- [ ] Real-time notifications

---

## Support & Documentation

- React: https://react.dev
- Vite: https://vitejs.dev
- Express: https://expressjs.com
- MySQL: https://dev.mysql.com
- Tailwind CSS: https://tailwindcss.com

---

**Created:** May 2024
**Status:** Phase 1 - Initial Setup Complete ✅
