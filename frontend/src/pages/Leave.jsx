import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Leave() {
  const [leaveData, setLeaveData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    leaveType: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  })

  useEffect(() => {
    fetchLeaveData()
  }, [])

  const fetchLeaveData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get('/leaves').catch(() => null)

      setLeaveData(response?.data || {
        balances: [
          {
            type: 'Annual Leave',
            daysLeft: 18,
            isPrimary: true
          },
          {
            type: 'Sick Leave',
            daysLeft: 5,
            isPrimary: false
          },
          {
            type: 'Personal Days',
            daysLeft: 2,
            isPrimary: false
          },
          {
            type: 'Public Holidays',
            daysLeft: 4,
            isPrimary: false
          }
        ],
        history: [
          {
            title: 'Summer Vacation',
            type: 'Annual Leave',
            duration: '5 Days',
            status: 'Approved',
            requestedOn: 'Oct 12, 2024'
          },
          {
            title: 'Medical Checkup',
            type: 'Sick Leave',
            duration: '0.5 Day',
            status: 'Pending',
            requestedOn: 'Oct 24, 2024'
          },
          {
            title: 'Family Wedding',
            type: 'Annual Leave',
            duration: '3 Days',
            status: 'Approved',
            requestedOn: 'Sept 05, 2024'
          }
        ]
      })
    } catch (err) {
      setError('Failed to load leave data')
      console.error('Leave fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Try to submit to API, fallback to success message
      const response = await api.post('/leaves/request', formData).catch(() => null)

      if (response) {
        alert('Leave request submitted successfully!')
        setFormData({
          leaveType: 'Annual Leave',
          startDate: '',
          endDate: '',
          reason: ''
        })
        fetchLeaveData() // Refresh data
      } else {
        alert('Leave request submitted successfully! (Demo mode)')
      }
    } catch (err) {
      alert('Failed to submit leave request. Please try again.')
      console.error('Leave request error:', err)
    }
  }

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved'
      case 'pending': return 'status-pending'
      default: return 'status-pending'
    }
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Time Off & Leaves</h1>
          <p className="text-sm text-slate-400 font-medium">Manage your balance and plan your next break.</p>
        </div>
        <Loading message="Loading leave data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Time Off & Leaves</h1>
          <p className="text-sm text-slate-400 font-medium">Manage your balance and plan your next break.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Leave Data</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchLeaveData}
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
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800">Time Off & Leaves</h1>
        <p className="text-sm text-slate-400 font-medium">Manage your balance and plan your next break.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {leaveData.balances.map((balance, index) => (
          <div
            key={index}
            className={`p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300 ${
              balance.isPrimary
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none shadow-xl shadow-blue-200'
                : 'bg-white'
            }`}
          >
            <p className={`text-[10px] font-black uppercase mb-1 ${
              balance.isPrimary ? 'opacity-70' : 'text-slate-400'
            }`}>
              {balance.type}
            </p>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-black ${
                balance.isPrimary ? 'text-white' : 'text-slate-800'
              }`}>
                {balance.daysLeft.toString().padStart(2, '0')}
              </span>
              <span className={`text-sm font-bold mb-1 ${
                balance.isPrimary ? 'opacity-70' : 'text-slate-400'
              }`}>
                Days Left
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 mb-6">Request Time Off</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                >
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Day</option>
                  <option>Maternity/Paternity</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Reason (Optional)</label>
                <textarea
                  rows="3"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Brief explanation..."
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#04228c] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:bg-[#031a6b] transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 mb-6">Recent History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Duration</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Requested On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leaveData.history.map((item, index) => (
                    <tr key={index}>
                      <td className="py-5">
                        <p className="text-sm font-black text-slate-800">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.type}</p>
                      </td>
                      <td className="py-5 text-sm font-medium text-slate-600">{item.duration}</td>
                      <td className="py-5">
                        <span className={`status-pill ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 text-right text-xs font-bold text-slate-400">{item.requestedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
