import React, { createContext, useState, useCallback, useEffect } from 'react'
import axiosInstance from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (err) {
        console.error('Auth initialization failed:', err)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    setLoading(true)

    try {
      const response = await axiosInstance.post('/auth/login', { email, password })

      const { token, user: userData } = response

      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(userData))

      setUser(userData)
      return { success: true, user: userData }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout')
    } catch (err) {
      console.error('Logout API call failed:', err)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      setUser(null)
      setError(null)
    }
  }, [])

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/auth/profile')
      const userData = response

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (err) {
      setError(err.message || 'Failed to fetch profile')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const hasRole = useCallback((roles) => {
    if (!user) return false
    if (!Array.isArray(roles)) roles = [roles]
    return roles.includes(user.role)
  }, [user])

  const hasPermission = useCallback((permission) => {
    if (!user) return false

    const rolePermissions = {
      admin: ['view_all', 'edit_all', 'delete_all', 'manage_users', 'manage_roles'],
      manager: ['view_team', 'edit_team', 'approve_requests'],
      employee: ['view_own'],
    }

    const permissions = rolePermissions[user.role] || []
    return permissions.includes(permission)
  }, [user])

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'
  const isManager = user?.role === 'manager'
  const isEmployee = user?.role === 'employee'

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isManager,
    isEmployee,
    login,
    logout,
    getProfile,
    hasRole,
    hasPermission,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
