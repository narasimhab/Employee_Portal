import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading, hasRole } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block">
            <i className="fa-solid fa-spinner text-4xl text-primary-600 animate-spin"></i>
          </div>
          <p className="mt-4 text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <i className="fa-solid fa-lock text-2xl text-red-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Required role: {requiredRole}
          </p>
          <a
            href="/"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }

  return children
}
