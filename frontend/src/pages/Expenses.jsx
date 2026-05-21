import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    category: 'Travel & Transport',
    date: '',
    amount: '',
    description: '',
    receipt: null
  })

  useEffect(() => {
    fetchExpensesData()
  }, [])

  const fetchExpensesData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const [statsResponse, expensesResponse] = await Promise.all([
        api.get('/expenses/stats').catch(() => null),
        api.get('/expenses/recent').catch(() => null)
      ])

      setStats(statsResponse?.data || {
        pendingAmount: 1240.50,
        pendingCount: 3,
        approvedThisMonth: 850.00,
        annualTotal: 4120.25
      })

      setExpenses(expensesResponse?.data || [
        {
          id: 1,
          title: 'Flights to London (Q4 Summit)',
          date: '2024-10-20',
          category: 'Travel',
          amount: 840.00,
          status: 'pending'
        },
        {
          id: 2,
          title: 'Adobe CC Subscription',
          date: '2024-10-12',
          category: 'Software',
          amount: 52.99,
          status: 'paid'
        },
        {
          id: 3,
          title: 'Client Dinner - Blue Fin',
          date: '2024-10-05',
          category: 'Hospitality',
          amount: 215.40,
          status: 'paid'
        }
      ])
    } catch (err) {
      setError('Failed to load expenses data')
      console.error('Expenses fetch error:', err)
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

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      receipt: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // In a real app, this would submit to the API
      console.log('Submitting expense claim:', formData)
      alert('Expense claim submitted successfully!')
      // Reset form
      setFormData({
        category: 'Travel & Transport',
        date: '',
        amount: '',
        description: '',
        receipt: null
      })
    } catch (err) {
      console.error('Submit error:', err)
      alert('Failed to submit expense claim')
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'paid': return 'status-paid'
      case 'pending': return 'status-pending'
      case 'rejected': return 'status-rejected'
      default: return 'status-pending'
    }
  }

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Expense Management</h1>
          <p className="text-sm text-slate-400 font-medium">Submit and track your professional reimbursements.</p>
        </div>
        <Loading message="Loading expenses..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Expense Management</h1>
          <p className="text-sm text-slate-400 font-medium">Submit and track your professional reimbursements.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Expenses</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchExpensesData}
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
        <h1 className="text-3xl font-extrabold text-slate-800">Expense Management</h1>
        <p className="text-sm text-slate-400 font-medium">Submit and track your professional reimbursements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pending Reimbursement</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">${stats?.pendingAmount?.toFixed(2) || '1,240.50'}</span>
            <span className="text-xs font-bold text-orange-500">{stats?.pendingCount || 3} Requests</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Approved this Month</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">${stats?.approvedThisMonth?.toFixed(2) || '850.00'}</span>
            <span className="text-xs font-bold text-emerald-500">Paid Oct 15</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annual Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">${stats?.annualTotal?.toFixed(2) || '4,120.25'}</span>
            <span className="text-xs font-bold text-blue-500">FY 2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm sticky top-28">
            <h3 className="font-black text-slate-800 mb-6">New Expense Claim</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Expense Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Travel & Transport</option>
                  <option>Client Hospitality</option>
                  <option>Software & Subscriptions</option>
                  <option>Office Supplies</option>
                  <option>Other Professional Expenses</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Amount ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Client lunch at The Bistro"
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Receipt Upload</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <i className="fa-solid fa-cloud-arrow-up text-slate-300 text-2xl mb-2 block"></i>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Drop PDF or Image here</p>
                    {formData.receipt && (
                      <p className="text-xs text-blue-600 mt-2">{formData.receipt.name}</p>
                    )}
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#04228c] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:bg-[#031a6b] transition-colors"
              >
                Submit Claim
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800">Recent Claims</h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All History</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="pb-4">Details</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="py-6">
                        <p className="text-sm font-black text-slate-800">{expense.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {new Date(expense.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </td>
                      <td className="py-6">
                        <span className="text-xs font-bold text-slate-600">{expense.category}</span>
                      </td>
                      <td className="py-6 font-black text-slate-800">${expense.amount.toFixed(2)}</td>
                      <td className="py-6">
                        <span className={`status-pill ${getStatusClass(expense.status)}`}>
                          {getStatusText(expense.status)}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                          <i className="fa-solid fa-file-invoice"></i>
                        </button>
                      </td>
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

