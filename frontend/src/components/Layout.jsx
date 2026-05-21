import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, hasRole } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      manager: 'bg-blue-100 text-blue-700',
      employee: 'bg-green-100 text-green-700',
    }
    return colors[role] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 h-[72px] bg-gradient-to-r from-[#02145d] to-[#04228c] shadow-lg">
        <div className="h-full px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="grid grid-cols-3 gap-1 bg-white/10 p-2 rounded-lg">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              </div>
              <span className="font-black tracking-tight text-lg uppercase text-white">CorpLink</span>
            </div>

            <nav className="hidden xl:flex items-center gap-1">
              <button
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                Dashboard
              </button>

              {/* People Menu */}
              <div className="relative group">
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white/80 hover:bg-white/10 flex items-center gap-2 transition-all">
                  People <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-slate-100 mb-2">People and Organization</p>
                  <a
                    onClick={() => navigate('/directory')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-address-book text-blue-500 w-4"></i>
                    Employee Directory
                  </a>
                  <a
                    onClick={() => navigate('/orgchart')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-sitemap text-purple-500 w-4"></i>
                    Org Chart
                  </a>
                  <a
                    onClick={() => navigate('/announcements')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-bullhorn text-orange-500 w-4"></i>
                    Announcements
                  </a>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border-t border-slate-100 mt-2">Project Management</p>
                  <a
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-list-check text-emerald-500 w-4"></i>
                    Projects
                  </a>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border-t border-slate-100 mt-2">Engagement</p>
                  <a
                    onClick={() => navigate('/surveys')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-square-poll-vertical text-pink-500 w-4"></i>
                    Surveys
                  </a>
                  <a
                    onClick={() => navigate('/certifications')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-certificate text-yellow-500 w-4"></i>
                    Certifications
                  </a>
                </div>
              </div>

              {/* Management Menu */}
              {(hasRole(['manager', 'admin'])) && (
                <div className="relative group">
                  <button className="px-4 py-2 rounded-xl text-xs font-bold text-white/80 hover:bg-white/10 flex items-center gap-2 transition-all">
                    Management <i className="fa-solid fa-chevron-down text-[10px]"></i>
                  </button>
                  <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-slate-100 mb-2">User Management</p>
                    <a
                      onClick={() => navigate('/performance')}
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                    >
                      <i className="fa-solid fa-gauge-high text-blue-500 w-4"></i>
                      Performance
                    </a>
                    <a
                      onClick={() => navigate('/leaves')}
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                    >
                      <i className="fa-solid fa-calendar-minus text-red-500 w-4"></i>
                      Leaves
                    </a>
                    <a
                      onClick={() => navigate('/assets')}
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                    >
                      <i className="fa-solid fa-laptop text-slate-500 w-4"></i>
                      Assets
                    </a>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 border-t border-slate-100 mt-2">Policies</p>
                    <a
                      onClick={() => navigate('/policies')}
                      className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                    >
                      <i className="fa-solid fa-shield-halved text-indigo-500 w-4"></i>
                      Policies
                    </a>
                  </div>
                </div>
              )}

              {/* Attendance Menu */}
              <div className="relative group">
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white/80 hover:bg-white/10 flex items-center gap-2 transition-all">
                  Attendance <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </button>
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 pb-2 border-b border-slate-100 mb-2">Scheduling</p>
                  <a
                    onClick={() => navigate('/timesheet')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-clock text-blue-500 w-4"></i>
                    Timesheet Entry
                  </a>
                  <a
                    onClick={() => navigate('/holidays')}
                    className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 cursor-pointer transition-all"
                  >
                    <i className="fa-solid fa-umbrella-beach text-teal-500 w-4"></i>
                    Holidays
                  </a>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 mr-4 border-r border-white/20 pr-6">
              <a href="#" className="flex items-center gap-2 text-[10px] font-extrabold text-blue-300 hover:text-white uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-all">
                <i className="fa-solid fa-receipt"></i> Payroll
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-extrabold text-blue-300 hover:text-white uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-all">
                <i className="fa-solid fa-heart-pulse"></i> Wellness
              </a>
            </div>
            <button className="text-white hover:text-blue-300 transition-colors">
              <i className="fa-regular fa-bell text-lg"></i>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src={user?.avatar_url || 'https://i.pravatar.cc/100?img=12'}
                  className="h-9 w-9 rounded-xl border-2 border-white/20 object-cover"
                  alt="Avatar"
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-600 uppercase">Account</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/employee/${user.id}`)
                      setShowUserMenu(false)
                    }}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fa-solid fa-user mr-2 text-primary-600"></i>
                    My Profile
                  </button>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fa-solid fa-gear mr-2 text-primary-600"></i>
                    Settings
                  </a>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-sm text-red-600 hover:text-red-700 font-bold"
                    >
                      <i className="fa-solid fa-sign-out mr-2"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1600px] px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
