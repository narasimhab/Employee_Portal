import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Loading from '../components/Loading'
import { useAuth } from '../hooks/useAuth'

export default function Directory() {
  const navigate = useNavigate()
  const { isAdmin, user } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Employees')
  const [selectedLocations, setSelectedLocations] = useState(['New York, US', 'London, UK'])

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming there's an API endpoint for employees
      const response = await api.get('/employees')
      setEmployees(response.data || [])
    } catch (err) {
      // Fallback to static data - comprehensive employee list
      setEmployees([
        { id: 1, name: 'Sarah Jenkins', role: 'Lead UI/UX Designer', location: 'New York Office', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', department: 'Design' },
        { id: 2, name: 'Alex Rivera', role: 'Senior Backend Engineer', location: 'London Office', avatar: 'https://i.pravatar.cc/150?img=11', status: 'away', department: 'Engineering' },
        { id: 3, name: 'Maria Gonzalez', role: 'Human Resources Manager', location: 'Madrid Office', avatar: 'https://i.pravatar.cc/150?img=44', status: 'online', department: 'Human Resources' },
        { id: 4, name: 'David Miller', role: 'Backend Lead', location: 'London Office', avatar: 'https://i.pravatar.cc/150?img=12', status: 'online', department: 'Engineering' },
        { id: 5, name: 'Elena Rodriguez', role: 'Marketing Director', location: 'New York Office', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', department: 'Marketing' },
        { id: 6, name: 'James Chen', role: 'DevOps Engineer', location: 'Remote', avatar: 'https://i.pravatar.cc/150?img=13', status: 'online', department: 'Engineering' },
        { id: 7, name: 'Sophie Martin', role: 'Product Manager', location: 'Paris Office', avatar: 'https://i.pravatar.cc/150?img=33', status: 'away', department: 'Product' },
        { id: 8, name: 'Michael Park', role: 'Senior Frontend Engineer', location: 'Tokyo Office', avatar: 'https://i.pravatar.cc/150?img=14', status: 'online', department: 'Engineering' },
        { id: 9, name: 'Lisa Anderson', role: 'Quality Assurance Lead', location: 'New York Office', avatar: 'https://i.pravatar.cc/150?img=34', status: 'online', department: 'Engineering' },
        { id: 10, name: 'Carlos Sanchez', role: 'Sales Manager', location: 'Madrid Office', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online', department: 'Sales' },
        { id: 11, name: 'Priya Patel', role: 'Data Analyst', location: 'Remote', avatar: 'https://i.pravatar.cc/150?img=35', status: 'online', department: 'Analytics' },
        { id: 12, name: 'Yuki Tanaka', role: 'UX Researcher', location: 'Tokyo Office', avatar: 'https://i.pravatar.cc/150?img=36', status: 'away', department: 'Design' },
        { id: 13, name: 'Thomas Müller', role: 'Infrastructure Engineer', location: 'Berlin Office', avatar: 'https://i.pravatar.cc/150?img=16', status: 'online', department: 'Engineering' },
        { id: 14, name: 'Amelia Brooks', role: 'Content Strategist', location: 'London Office', avatar: 'https://i.pravatar.cc/150?img=37', status: 'online', department: 'Marketing' },
        { id: 15, name: 'Rajesh Kumar', role: 'Business Analyst', location: 'Bangalore Office', avatar: 'https://i.pravatar.cc/150?img=17', status: 'online', department: 'Analytics' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const departments = [
    { name: 'All Employees', count: 15 },
    { name: 'Marketing', count: 2 },
    { name: 'Engineering', count: 6 },
    { name: 'Design', count: 2 },
    { name: 'Human Resources', count: 1 },
    { name: 'Sales', count: 1 },
    { name: 'Analytics', count: 2 },
    { name: 'Product', count: 1 }
  ]

  const locations = [
    'New York, US',
    'London, UK',
    'Remote'
  ]

  const filteredEmployees = useMemo(() => {
    let filtered = employees

    // Admins can view all employees without department or location filters
    if (!isAdmin) {
      if (selectedDepartment !== 'All Employees') {
        filtered = filtered.filter(employee => employee.department === selectedDepartment)
      }

      if (selectedLocations.length > 0) {
        filtered = filtered.filter(employee => selectedLocations.some(loc => employee.location.includes(loc.split(',')[0])))
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(employee =>
        employee.name?.toLowerCase().includes(query) ||
        employee.role?.toLowerCase().includes(query) ||
        employee.location?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [employees, selectedDepartment, selectedLocations, searchQuery, isAdmin])

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

  const sendMessage = (employeeId) => {
    console.log('Send message to employee:', employeeId)
  }

  const sendEmail = (employeeId) => {
    console.log('Send email to employee:', employeeId)
  }

  const viewProfile = (employeeId) => {
    navigate(`/employee/${employeeId}`)
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Employee Directory</h1>
        <Loading message="Loading employees..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Employee Directory</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Employees</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchEmployees}
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
      <div className="flex gap-8">
        <aside className="directory-sidebar hidden lg:block">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-full overflow-y-auto">
            {isAdmin && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  <i className="fa-solid fa-shield-halved mr-1"></i> Admin View
                </p>
                <p className="text-[9px] text-blue-500 mt-1">All employees visible</p>
              </div>
            )}
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Departments</h3>
            <nav className="space-y-1">
              {departments.map((dept) => (
                <button
                  key={dept.name}
                  onClick={() => setSelectedDepartment(dept.name)}
                  disabled={isAdmin}
                  className={`w-full flex justify-between items-center px-4 py-3 rounded-2xl text-xs font-bold transition-colors ${
                    isAdmin
                      ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-400'
                      : selectedDepartment === dept.name
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{dept.name}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                    selectedDepartment === dept.name
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400'
                  }`}>
                    {dept.count}
                  </span>
                </button>
              ))}
            </nav>

            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mt-10 mb-6">Location</h3>
            <div className="space-y-3 px-2">
              {locations.map((location) => (
                <label key={location} className={`flex items-center gap-3 text-xs font-bold cursor-pointer ${
                  isAdmin ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-600'
                }`}>
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                    disabled={isAdmin}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {location}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-slate-800">Employee Directory</h1>
                {isAdmin && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <i className="fa-solid fa-shield-halved mr-1"></i>Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 font-medium">
                {isAdmin ? 'Viewing all employees across the organization' : 'Manage and connect with your global team'}
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, role or email..."
                  className="w-full pl-11 pr-6 py-3 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                <i className="fa-solid fa-filter"></i>
              </button>
            </div>
          </div>

          {user && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-3xl border border-blue-100 cursor-pointer hover:shadow-lg transition-all" onClick={() => viewProfile(user.id)}>
              <div className="flex items-center gap-4">
                <img src={user.avatar || 'https://i.pravatar.cc/150?img=1'} alt={user.name} className="w-16 h-16 rounded-2xl" />
                <div className="flex-1">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Your Profile</p>
                  <h3 className="text-lg font-black text-slate-800">{user.name || 'View My Profile'}</h3>
                  <p className="text-sm text-slate-500">{user.role}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="employee-card p-6 rounded-[2rem] bg-white border border-slate-100 hover:transform hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer" onClick={() => viewProfile(employee.id)}>
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-20 h-20 rounded-3xl object-cover grayscale-[0.2]"
                    />
                    <div className={`status-indicator ${employee.status === 'online' ? 'status-online' : 'status-away'}`}></div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors" onClick={(e) => e.stopPropagation()}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-black text-slate-800">{employee.name}</h4>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{employee.role}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    <i className="fa-solid fa-location-dot mr-1"></i> {employee.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      sendMessage(employee.id)
                    }}
                    className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Message
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      sendEmail(employee.id)
                    }}
                    className="px-4 py-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <i className="fa-solid fa-envelope"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-black text-xs">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-50">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-50">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

