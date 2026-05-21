import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [statsResponse, announcementsResponse] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/announcements')
      ])

      setStats(statsResponse.data)
      setAnnouncements(announcementsResponse.data)
    } catch (err) {
      const message = err?.message || err?.error || 'Failed to load dashboard data'
      setError(message)
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery.trim()) return announcements
    const query = searchQuery.toLowerCase()
    return announcements.filter((announcement) =>
      announcement.title?.toLowerCase().includes(query) ||
      announcement.content?.toLowerCase().includes(query)
    )
  }, [announcements, searchQuery])

  const statCards = [
    {
      label: 'Total Employees',
      value: stats?.totalEmployees ?? '0',
      change: '+12% this month',
      icon: '👥'
    },
    {
      label: 'Active Projects',
      value: stats?.activeProjects ?? '0',
      change: '+8 new projects',
      icon: '📋'
    },
    {
      label: 'Pending Requests',
      value: stats?.pendingRequests ?? '0',
      change: 'Awaiting approvals',
      icon: '⏳'
    },
    {
      label: 'Overall Satisfaction',
      value: stats?.overallSatisfaction ?? '0%',
      change: 'Employee engagement',
      icon: '⭐'
    },
  ]

  const certificationItems = [
    { label: 'GDPR', score: '85%', borderColor: 'border-blue-500', textColor: 'text-blue-500' },
    { label: 'Marketing', scoreIcon: 'fa-solid fa-check', borderColor: 'border-green-500', textColor: 'text-green-500' },
    { label: 'Project', scoreIcon: 'fa-solid fa-clock', borderColor: 'border-orange-300', textColor: 'text-orange-400' },
  ]

  const birthdayPeople = [
    { name: 'Sarah Chen', date: 'Oct 22', avatar: 'https://i.pravatar.cc/100?img=5' },
    { name: 'Liam Patel', date: 'Oct 24', avatar: 'https://i.pravatar.cc/100?img=15' },
  ]

  const anniversary = {
    name: 'Sarah Chen',
    years: '5 Years',
    avatar: 'https://i.pravatar.cc/100?img=5',
  }

  const rewards = {
    points: '1,450 XP',
    badge: 'Star of Month',
  }

  const policyLinks = [
    'Links to Remote Work',
    'Code of Conduct',
  ]

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <Loading message="Loading dashboard data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Dashboard</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchDashboardData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-6 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"><i className="fa-solid fa-magnifying-glass"></i></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">{stat.label}</p>
            <h2 className="text-3xl font-black text-slate-900">{stat.value}</h2>
            <p className={`text-xs font-bold mt-1 ${stat.label === 'Pending Requests' ? 'text-orange-500' : 'text-green-600'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 text-4xl"><i className="fa-solid fa-bullhorn"></i></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#172554]">ANNOUNCEMENTS</h3>
              <button
                type="button"
                onClick={() => navigate('/announcements')}
                className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                View All
              </button>
            </div>
            <ul className="space-y-3 text-sm font-medium">
              {filteredAnnouncements.slice(0, 3).map((announcement) => (
                <li key={announcement.id} className="flex justify-between gap-3">
                  <span>• {announcement.title}</span>
                  <span className="text-slate-400">{new Date(announcement.created_at).toLocaleDateString()}</span>
                </li>
              ))}
              {filteredAnnouncements.length === 0 && (
                <li className="text-sm text-slate-500">No announcements match your search.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600 text-4xl"><i className="fa-solid fa-award"></i></div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#172554] mb-4">CERTIFICATIONS</h3>
            <div className="flex justify-between">
              {certificationItems.map((item) => (
                <div key={item.label} className="text-center">
                  <div className={`h-14 w-14 rounded-full border-4 ${item.borderColor} flex items-center justify-center text-xs font-black`}>
                    {item.score || <i className={`${item.scoreIcon} ${item.textColor}`}></i>}
                  </div>
                  <p className="text-[10px] mt-2 font-bold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-pink-50 flex items-center justify-center text-pink-500 text-4xl"><i className="fa-solid fa-cake-candles"></i></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#172554]">BIRTHDAY GREETINGS</h3>
              <button
                type="button"
                onClick={() => navigate('/directory')}
                className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                View All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {birthdayPeople.map((person) => (
                <div key={person.name} className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl min-w-[140px]">
                  <img src={person.avatar} alt={person.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <p className="text-xs font-bold">{person.name}</p>
                    <p className="text-[10px] text-pink-500">{person.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-500 text-4xl"><i className="fa-solid fa-trophy"></i></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#172554]">REWARDS</h3>
              <button className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                Give Bravo
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Points</p>
                <h4 className="text-2xl font-black text-blue-600">{rewards.points}</h4>
              </div>
              <div className="text-center">
                <i className="fa-solid fa-medal text-3xl text-orange-400"></i>
                <p className="text-[10px] font-bold mt-1">{rewards.badge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-teal-50 flex items-center justify-center text-teal-500 text-4xl"><i className="fa-regular fa-calendar"></i></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#172554]">WORK ANNIVERSARY</h3>
              <button
                type="button"
                onClick={() => navigate('/directory')}
                className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                View All
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src={anniversary.avatar} alt={anniversary.name} className="h-10 w-10 rounded-full" />
              <div>
                <p className="text-xs font-bold">{anniversary.name}</p>
                <p className="text-[10px] text-teal-600 font-bold">{anniversary.years}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex gap-6">
          <div className="h-24 w-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-4xl"><i className="fa-regular fa-file-lines"></i></div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-[#172554]">POLICIES</h3>
              <button
                type="button"
                onClick={() => navigate('/policies')}
                className="text-xs font-bold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
              >
                View All
              </button>
            </div>
            <ul className="text-xs font-bold text-slate-600 space-y-2">
              {policyLinks.map((policy) => (
                <li key={policy} className="flex justify-between hover:text-blue-600 cursor-pointer">
                  <span>{policy}</span>
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
