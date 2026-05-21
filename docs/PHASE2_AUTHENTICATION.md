# Employee Portal Phase 2 - Authentication & User Management

## Overview
Phase 2 implements a secure authentication system with JWT tokens, role-based access control, and session management. Users can now log in with different permission levels (Admin, Manager, Employee).

## What's New

### Frontend Features ✅
- **Login Page** - Secure login interface with email/password
- **Authentication Context** - Global auth state management
- **Protected Routes** - Routes require authentication
- **Role-Based Navigation** - Menu items shown based on user role
- **User Dropdown Menu** - Profile info and logout button
- **Session Management** - Auto-logout on token expiry

### Backend Features ✅
- **JWT Authentication** - Token-based authentication system
- **Login Endpoint** - POST /api/auth/login
- **Logout Endpoint** - POST /api/auth/logout
- **Profile Endpoint** - GET /api/auth/profile
- **Session Tracking** - Tracks user sessions in database
- **Password Hashing** - bcryptjs for secure password storage
- **Role-Based Permissions** - Three roles: Admin, Manager, Employee

### Database Updates ✅
- **user_sessions table** - Tracks active sessions
- **roles table** - Role definitions with permissions
- **audit_logs table** - Tracks user actions
- **Password hashes** - Updated with bcrypt hashed demo passwords

## Setup Instructions

### Step 1: Update Database

```bash
# Run the auth schema update to create new tables
mysql -u root -p employee_portal < database/auth_schema_update.sql

# Update demo account passwords
mysql -u root -p employee_portal < database/auth_seed_update.sql
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This adds Winston logger support for production logging.

### Step 3: Configure Environment Variables

**Backend (.env)** - Already configured with:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=employee_portal
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

### Step 4: Start Services

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:3000
```

**Database:**
MySQL should be running automatically

### Step 5: Test Login

#### Demo Credentials

**Admin Account:**
- Email: `john.smith@company.com`
- Password: `password123`
- Role: admin
- Access: Full system access

**Manager Account:**
- Email: `sarah.johnson@company.com`
- Password: `password123`
- Role: manager
- Access: Team approvals, performance reviews

**Employee Account:**
- Email: `michael.chen@company.com`
- Password: `password123`
- Role: employee
- Access: Own data only

## Architecture

### Authentication Flow

```
┌─────────────┐
│  React App  │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│  AuthContext Provider    │
├──────────────────────────┤
│ - user state             │
│ - login() function       │
│ - logout() function      │
│ - hasRole() check        │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Protected Routes         │
├──────────────────────────┤
│ - Check authentication   │
│ - Verify role            │
│ - Redirect to login      │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────┐
│   Backend API Endpoints      │
├──────────────────────────────┤
│ POST /api/auth/login         │
│ POST /api/auth/logout        │
│ GET  /api/auth/profile       │
│ POST /api/auth/change-pwd    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────┐
│   MySQL Database         │
├──────────────────────────┤
│ - users table            │
│ - user_sessions table    │
│ - roles table            │
│ - audit_logs table       │
└──────────────────────────┘
```

### Role Permissions

| Action | Employee | Manager | Admin |
|--------|----------|---------|-------|
| View own data | ✅ | ✅ | ✅ |
| View team data | ❌ | ✅ | ✅ |
| Approve requests | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| System settings | ❌ | ❌ | ✅ |

## Frontend Implementation

### AuthContext
Located in `frontend/src/context/AuthContext.jsx`

**Key Functions:**
- `login(email, password)` - Authenticate user
- `logout()` - End session
- `getProfile()` - Fetch user profile
- `hasRole(roles)` - Check if user has role(s)
- `hasPermission(permission)` - Check permission

**Available State:**
- `user` - Current user object
- `loading` - Loading state
- `error` - Error message
- `isAuthenticated` - Boolean auth status
- `isAdmin`, `isManager`, `isEmployee` - Role shortcuts

### useAuth Hook
Located in `frontend/src/hooks/useAuth.js`

```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, logout, hasRole } = useAuth()
  
  if (hasRole('admin')) {
    // Show admin features
  }
  
  return <div>{user?.first_name}</div>
}
```

### ProtectedRoute Component
Located in `frontend/src/components/ProtectedRoute.jsx`

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

## Backend Implementation

### Auth Controller
Located in `backend/src/controllers/authController.js`

**Endpoints:**

**POST /api/auth/login**
```bash
Request:
{
  "email": "john.smith@company.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@company.com",
    "role": "admin"
  }
}
```

**POST /api/auth/logout**
```bash
Headers:
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

**GET /api/auth/profile**
```bash
Headers:
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@company.com",
    "role": "admin",
    "phone": "+1234567890",
    "status": "active",
    "avatar_url": "...",
    "department": "Engineering"
  }
}
```

**POST /api/auth/change-password**
```bash
Headers:
Authorization: Bearer <token>

Request:
{
  "currentPassword": "password123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}

Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Authentication Middleware
Located in `backend/src/middleware/auth.js`

```javascript
// Verify JWT token and attach user to request
app.use(authenticate, (req, res, next) => {
  console.log(req.user) // { id, email, role }
  next()
})

// Check for specific roles
app.use(authorize(['admin', 'manager']), (req, res, next) => {
  // Only admins and managers can access
  next()
})
```

## Database Schema

### users table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('admin', 'manager', 'employee'),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  status ENUM('active', 'inactive', 'on_leave'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### user_sessions table
```sql
CREATE TABLE user_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  token_hash VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  expires_at DATETIME,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### roles table
```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(100) UNIQUE,
  description TEXT,
  permissions JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Security Features

✅ **Password Hashing** - bcryptjs with salt rounds
✅ **JWT Tokens** - Secure token-based auth
✅ **Session Tracking** - Database session records
✅ **Token Expiry** - 7-day token expiration
✅ **CORS** - Cross-origin protection
✅ **Role-Based Access** - Multi-level authorization
✅ **Audit Logging** - Track all user actions
✅ **Secure Middleware** - Auth and error handling

## Testing Checklist

- [ ] Login with admin credentials
- [ ] Login with manager credentials
- [ ] Login with employee credentials
- [ ] Logout functionality works
- [ ] Token persists across page refresh
- [ ] Unauthorized access redirects to login
- [ ] Role-based menu items show/hide correctly
- [ ] Performance page only accessible to managers
- [ ] User dropdown menu displays correctly
- [ ] Change password functionality works
- [ ] Session expires after 7 days

## Troubleshooting

### "Invalid email or password" on correct credentials
- Verify password hash in database
- Check if user status is 'active'
- Ensure database was updated with correct seed data

### "Cannot authenticate" after login
- Check JWT_SECRET in .env matches backend
- Verify token is being stored in localStorage
- Check browser console for auth errors

### "Access Denied" on authorized page
- Verify user role in database
- Check ProtectedRoute component has correct requiredRole
- Review role permissions logic

### Session expires too quickly
- Check JWT_EXPIRE setting in .env
- Verify token expiry date in user_sessions table
- Check frontend token storage

## Next Steps (Phase 3)

- [ ] Employee directory with full profiles
- [ ] Leave management system
- [ ] Leave approval workflow
- [ ] Timesheet submission and approval
- [ ] Performance review system
- [ ] Dashboard analytics
- [ ] Real-time notifications
- [ ] File uploads and attachments

## Files Modified/Created

**Frontend:**
- `src/context/AuthContext.jsx` - Auth state management
- `src/hooks/useAuth.js` - Auth hook
- `src/pages/Login.jsx` - Login page
- `src/components/ProtectedRoute.jsx` - Protected route wrapper
- `src/components/Layout.jsx` - Updated with user menu
- `src/App.jsx` - Updated routing with auth

**Backend:**
- `src/controllers/authController.js` - Auth logic
- `src/routes/auth.js` - Auth endpoints
- `src/validators/authValidator.js` - Input validation
- `src/middleware/auth.js` - Updated with authorization
- `src/config/logger.js` - Updated with Winston setup
- `src/server.js` - Added auth routes
- `package.json` - Added winston

**Database:**
- `database/auth_schema_update.sql` - New tables for auth
- `database/auth_seed_update.sql` - Update demo passwords

---

**Status:** ✅ PHASE 2 COMPLETE
**Created:** May 12, 2024
**Features:** Secure login, JWT authentication, role-based access
