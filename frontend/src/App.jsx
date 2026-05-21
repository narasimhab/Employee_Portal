import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Directory from './pages/Directory'
import EmployeeProfile from './pages/EmployeeProfile'
import OrgChart from './pages/OrgChart'
import Projects from './pages/Projects'
import Announcements from './pages/Announcements'
import Leave from './pages/Leave'
import Timesheet from './pages/Timesheet'
import Performance from './pages/Performance'
import Assets from './pages/Assets'
import Policies from './pages/Policies'
import Certifications from './pages/Certifications'
import Surveys from './pages/Surveys'
import Holidays from './pages/Holidays'
import Expenses from './pages/Expenses'
import Rewards from './pages/Rewards'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="directory" element={<Directory />} />
            <Route path="employee/:id" element={<EmployeeProfile />} />
            <Route path="orgchart" element={<OrgChart />} />
            <Route path="projects" element={<Projects />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="leaves" element={<Leave />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="performance" element={<ProtectedRoute requiredRole="manager"><Performance /></ProtectedRoute>} />
            <Route path="assets" element={<Assets />} />
            <Route path="policies" element={<Policies />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="surveys" element={<Surveys />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
