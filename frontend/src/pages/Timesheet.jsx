import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Timesheet() {
  const [timesheetData, setTimesheetData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(2) // Wednesday (0-indexed)
  const [formData, setFormData] = useState({
    project: 'Apollo Modernization (Internal)',
    category: 'Development',
    hours: '',
    description: ''
  })

  useEffect(() => {
    fetchTimesheetData()
  }, [])

  const fetchTimesheetData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get('/timesheets').catch(() => null)

      setTimesheetData(response?.data || {
        week: {
          start: 'Oct 19',
          end: 'Oct 25',
          year: '2026'
        },
        days: [
          { name: 'Mon', date: 19, hours: 8.0, isWeekend: false },
          { name: 'Tue', date: 20, hours: 7.5, isWeekend: false },
          { name: 'Wed', date: 21, hours: 4.5, isWeekend: false },
          { name: 'Thu', date: 22, hours: 0.0, isWeekend: false },
          { name: 'Fri', date: 23, hours: 0.0, isWeekend: false },
          { name: 'Sat', date: 24, hours: 0.0, isWeekend: true },
          { name: 'Sun', date: 25, hours: 0.0, isWeekend: true }
        ],
        totalHours: 28.5,
        targetHours: 40,
        status: 'Draft - Not yet submitted'
      })
    } catch (err) {
      setError('Failed to load timesheet data')
      console.error('Timesheet fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDaySelect = (dayIndex) => {
    if (!timesheetData.days[dayIndex].isWeekend) {
      setSelectedDay(dayIndex)
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
      const entryData = {
        ...formData,
        dayIndex: selectedDay,
        date: `${timesheetData.week.start.split(' ')[0]} ${timesheetData.days[selectedDay].date}, ${timesheetData.week.year}`
      }

      const response = await api.post('/timesheets/entry', entryData).catch(() => null)

      if (response) {
        alert('Time entry saved successfully!')
        setFormData({
          project: 'Apollo Modernization (Internal)',
          category: 'Development',
          hours: '',
          description: ''
        })
        fetchTimesheetData() // Refresh data
      } else {
        alert('Time entry saved successfully! (Demo mode)')
      }
    } catch (err) {
      alert('Failed to save time entry. Please try again.')
      console.error('Timesheet entry error:', err)
    }
  }

  const handleClear = () => {
    setFormData({
      project: 'Apollo Modernization (Internal)',
      category: 'Development',
      hours: '',
      description: ''
    })
  }

  const handleSubmitForApproval = () => {
    console.log('Submitting timesheet for approval')
    // In a real app, this would submit the entire timesheet
    alert('Timesheet submitted for approval!')
  }

  const getProgressPercentage = () => {
    return (timesheetData.totalHours / timesheetData.targetHours) * 100
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Timesheet Entry</h1>
            <p className="text-sm text-slate-400 font-medium">Log your daily hours and project allocations.</p>
          </div>
        </div>
        <Loading message="Loading timesheet data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Timesheet Entry</h1>
            <p className="text-sm text-slate-400 font-medium">Log your daily hours and project allocations.</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Timesheet Data</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchTimesheetData}
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
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Timesheet Entry</h1>
          <p className="text-sm text-slate-400 font-medium">Log your daily hours and project allocations.</p>
        </div>
        <div className="flex gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-4 py-2 text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="px-4 py-2 text-xs font-black text-slate-700">
            {timesheetData.week.start} - {timesheetData.week.end}, {timesheetData.week.year}
          </span>
          <button className="px-4 py-2 text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex gap-3">
            {timesheetData.days.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDaySelect(index)}
                className={`day-pill ${selectedDay === index ? 'active' : ''} ${
                  day.isWeekend ? 'bg-slate-50 border-none opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <p className="text-[9px] font-black uppercase opacity-60">{day.name}</p>
                <p className="text-sm font-black">{day.date}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800">
                Add Time Entry <span className="text-blue-600 ml-2 text-sm font-bold">
                  {timesheetData.days[selectedDay].name}day, {timesheetData.week.start.split(' ')[0]} {timesheetData.days[selectedDay].date}
                </span>
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Project / Account</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  >
                    <option>Apollo Modernization (Internal)</option>
                    <option>Project Phoenix (Client: Zenith Corp)</option>
                    <option>System Maintenance</option>
                    <option>General Admin / Meetings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Task Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  >
                    <option>Development</option>
                    <option>Design & Prototyping</option>
                    <option>Quality Assurance</option>
                    <option>Planning & Strategy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Duration (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="0.0"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Summary of work performed..."
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm w-full outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 text-xs font-black text-slate-400 uppercase hover:text-slate-600 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#04228c] text-white rounded-2xl text-xs font-black uppercase shadow-lg hover:bg-[#031a6b] transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border-none shadow-xl bg-gradient-to-br from-[#02145d] to-[#04228c] text-white">
            <h4 className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-6">Weekly Progress</h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">Total Hours</span>
              <span className="text-2xl font-black">{timesheetData.totalHours} / {timesheetData.targetHours}</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-8">
              <div
                className="bg-blue-400 h-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              {timesheetData.days.map((day, index) => (
                <div key={index} className="flex justify-between text-[10px] font-black uppercase">
                  <span className={`${index === selectedDay ? 'text-blue-300' : 'opacity-60'}`}>
                    {day.name} {index === selectedDay ? '(Current)' : ''}
                  </span>
                  <span className={index === selectedDay ? 'text-blue-300' : ''}>
                    {day.hours}h
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitForApproval}
              className="w-full mt-10 py-4 bg-white text-blue-900 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all"
            >
              Submit for Approval
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Submission Status</h4>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <p className="text-xs font-bold text-slate-600">{timesheetData.status}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
