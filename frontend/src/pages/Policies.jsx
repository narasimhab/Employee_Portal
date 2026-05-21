import React, { useState, useEffect, useMemo } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Policies() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Documents')

  useEffect(() => {
    fetchPolicies()
  }, [])

  const fetchPolicies = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming there's an API endpoint for policies
      const response = await api.get('/policies')
      setPolicies(response.data || [])
    } catch (err) {
      // If API doesn't exist, use static data
      setPolicies([
        {
          id: 1,
          title: '2026 Remote Work Framework',
          category: 'HR & Employment',
          description: 'Our updated guidelines on hybrid work schedules, home office stipends, and global connectivity.',
          updatedDate: 'Jan 2026',
          icon: 'fa-house-laptop'
        },
        {
          id: 2,
          title: 'Code of Conduct',
          category: 'Code of Conduct',
          description: 'Professional standards, ethical guidelines, and workplace behavior expectations.',
          updatedDate: 'Dec 2025',
          icon: 'fa-handshake'
        },
        {
          id: 3,
          title: 'IT Security Policy',
          category: 'IT & Security',
          description: 'Security compliance procedures, VPN access setup, and password policies.',
          updatedDate: 'Nov 2025',
          icon: 'fa-shield-halved'
        },
        {
          id: 4,
          title: 'Expense Reimbursement Guidelines',
          category: 'Finance & Expenses',
          description: 'Travel, entertainment, and business expense policies and approval processes.',
          updatedDate: 'Oct 2025',
          icon: 'fa-credit-card'
        },
        {
          id: 5,
          title: 'Health & Safety Protocols',
          category: 'Health & Safety',
          description: 'Workplace safety standards, emergency procedures, and wellness programs.',
          updatedDate: 'Sep 2025',
          icon: 'fa-heartbeat'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'All Documents',
    'HR & Employment',
    'Code of Conduct',
    'IT & Security',
    'Finance & Expenses',
    'Health & Safety'
  ]

  const filteredPolicies = useMemo(() => {
    let filtered = policies

    if (selectedCategory !== 'All Documents') {
      filtered = filtered.filter(policy => policy.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(policy =>
        policy.title?.toLowerCase().includes(query) ||
        policy.description?.toLowerCase().includes(query) ||
        policy.category?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [policies, selectedCategory, searchQuery])

  const featuredPolicy = {
    title: '2026 Remote Work Framework',
    description: 'Our updated guidelines on hybrid work schedules, home office stipends, and global connectivity.',
    updatedDate: 'Jan 2026',
    icon: 'fa-house-laptop'
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Policies</h1>
        <Loading message="Loading policies..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Policies</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Policies</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchPolicies}
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Corporate Policies</h1>
          <p className="text-sm text-slate-400 font-medium">
            Access the latest guidelines, handbooks, and compliance standards.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-[1rem] pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors"
            placeholder="Search policies (e.g. Remote Work)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-200">
            <i className="fa-solid fa-circle-question text-2xl mb-4 opacity-50"></i>
            <h4 className="text-sm font-black mb-2">Need clarification?</h4>
            <p className="text-[10px] text-blue-100 font-medium leading-relaxed mb-4">
              If you have questions regarding any policy, please contact the Compliance Team.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase hover:bg-blue-50 transition-colors">
              Open Ticket
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Featured & Recent</h2>

          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <span className="px-3 py-1 bg-blue-500 rounded-lg text-[9px] font-black uppercase mb-4 inline-block">
                Updated {featuredPolicy.updatedDate}
              </span>
              <h3 className="text-2xl font-black mb-2">{featuredPolicy.title}</h3>
              <p className="text-slate-400 text-sm max-w-md">{featuredPolicy.description}</p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
                <i className={`fa-solid ${featuredPolicy.icon} text-3xl text-white`}></i>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="policy-card bg-white p-6 rounded-[1.5rem] border border-slate-100 hover:border-blue-500 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fa-solid ${policy.icon} text-blue-600 text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-800">{policy.title}</h3>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-black rounded-lg uppercase">
                        {policy.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{policy.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        Updated {policy.updatedDate}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-bold">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <i className="fa-solid fa-file-circle-xmark text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">No policies match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

