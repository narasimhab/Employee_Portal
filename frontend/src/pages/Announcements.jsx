import React, { useState, useEffect, useMemo } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All News')

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/dashboard/announcements')
      setAnnouncements(response.data || [])
    } catch (err) {
      // Fallback to static data
      setAnnouncements([
        {
          id: 1,
          title: 'Annual Global Town Hall 2024: Q4 Strategy & Vision',
          category: 'Featured',
          content: 'Join our CEO and Executive Leadership team this Friday for our final Town Hall of the year. We will be discussing our expansion into the EMEA market and revealing the new employee wellness initiatives.',
          author: 'Jonathan Sterling',
          authorRole: 'CEO',
          authorAvatar: 'https://i.pravatar.cc/150?img=68',
          date: '2 hours ago',
          isFeatured: true,
          hasAction: true,
          actionText: 'Register Now'
        },
        {
          id: 2,
          title: 'Updated Remote Work & Hybrid Policy',
          category: 'Operations',
          content: 'Following the recent feedback survey, we are officially transitioning to a "Flex-First" model. Team members can now choose their core office days in coordination with their managers...',
          date: 'Yesterday',
          hasLink: true
        },
        {
          id: 3,
          title: 'Scheduled Maintenance: Central Servers',
          category: 'IT & Security',
          content: 'Please note that the internal VPN and Payroll systems will be offline this Saturday from 02:00 AM to 06:00 AM EST for critical security patching.',
          date: 'Oct 24, 2024'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'All News',
    'Company Events',
    'HR Updates',
    'IT Announcements'
  ]

  const filteredAnnouncements = useMemo(() => {
    if (selectedCategory === 'All News') return announcements
    // Map categories to announcement categories
    const categoryMap = {
      'Company Events': 'Featured',
      'HR Updates': 'Operations',
      'IT Announcements': 'IT & Security'
    }
    return announcements.filter(announcement => announcement.category === categoryMap[selectedCategory])
  }, [announcements, selectedCategory])

  const upcomingEvents = [
    {
      title: 'Design Sprint Q4',
      date: 'Oct 28',
      time: '10:00 AM • Zoom',
      color: 'blue'
    },
    {
      title: 'Halloween Party',
      date: 'Nov 02',
      time: '05:00 PM • Roof Terrace',
      color: 'purple'
    }
  ]

  const markAllAsRead = () => {
    // Implementation for marking all as read
    console.log('Mark all as read')
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Announcements</h1>
        <Loading message="Loading announcements..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Announcements</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Announcements</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchAnnouncements}
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
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Announcements</h1>
          <p className="text-sm text-slate-400 font-medium">Stay updated with the latest company news and events</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Mark all as read
          </button>
          <button className="px-6 py-3 bg-blue-900 rounded-2xl text-xs font-bold text-white shadow-lg shadow-blue-900/20">
            <i className="fa-solid fa-plus mr-2"></i> Create Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`announcement-card p-8 rounded-[2rem] border transition-all hover:shadow-lg ${
                announcement.isFeatured
                  ? 'bg-gradient-to-br from-blue-600 to-blue-900 text-white border-none shadow-xl shadow-blue-200'
                  : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`category-tag ${
                  announcement.category === 'Featured' ? 'bg-white/20 text-white' :
                  announcement.category === 'Operations' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {announcement.category}
                </span>
                <span className={`text-[10px] font-bold ${
                  announcement.isFeatured ? 'opacity-60' : 'text-slate-400'
                }`}>
                  {announcement.date}
                </span>
              </div>
              <h2 className={`text-2xl font-black mb-4 ${
                announcement.isFeatured ? 'text-white' : 'text-slate-800'
              }`}>
                {announcement.title}
              </h2>
              <p className={`text-sm leading-relaxed mb-8 ${
                announcement.isFeatured ? 'text-blue-100' : 'text-slate-500'
              }`}>
                {announcement.content}
              </p>
              <div className="flex items-center justify-between">
                {announcement.author && (
                  <div className="flex items-center gap-3">
                    <img
                      src={announcement.authorAvatar}
                      alt={announcement.author}
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <p className="text-xs font-bold">{announcement.author}</p>
                      <p className="text-[10px] opacity-60 uppercase">{announcement.authorRole}</p>
                    </div>
                  </div>
                )}
                {announcement.hasAction && (
                  <button className="px-5 py-2.5 bg-white text-blue-900 rounded-xl text-xs font-black hover:bg-blue-50 transition-colors">
                    {announcement.actionText}
                  </button>
                )}
                {announcement.hasLink && (
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold cursor-pointer hover:underline">
                    Read full policy <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Filter by Category</h4>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Upcoming Events</h4>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 ${
                    event.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                  }`}>
                    <span className="text-[10px] font-black uppercase">{event.date.split(' ')[0]}</span>
                    <span className="text-lg font-black">{event.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">{event.title}</p>
                    <p className="text-[10px] text-slate-400">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase hover:border-blue-200 hover:text-blue-600 transition-all">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

