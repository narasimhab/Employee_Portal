import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, loading, error: authError } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      setIsLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      setIsLoading(false)
      return
    }

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error || 'Login failed')
    }

    setIsLoading(false)
  }

  const displayError = error || authError

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl font-black text-primary-600">CL</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">CorpLink</h1>
          <p className="text-white/70 text-sm">Employee Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>

          {displayError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5"></i>
              <p className="text-sm text-red-700">{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" disabled={isLoading} />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary-600 hover:text-primary-700 font-bold">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">Demo Accounts</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Demo Accounts Info */}
          <div className="space-y-2 text-xs text-gray-600">
            <p className="font-bold mb-2">Try these demo credentials:</p>
            <div className="bg-gray-50 p-3 rounded-lg space-y-1">
              <p><strong>Admin:</strong> john.smith@company.com / password123</p>
              <p><strong>Manager:</strong> sarah.johnson@company.com / password123</p>
              <p><strong>Employee:</strong> michael.chen@company.com / password123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 text-xs">
          © 2024 CorpLink. All rights reserved.
        </p>
      </div>
    </div>
  )
}
