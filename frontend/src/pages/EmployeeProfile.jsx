import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import Loading from '../components/Loading'
import { useAuth } from '../hooks/useAuth'

export default function EmployeeProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEmployeeProfile()
  }, [id])

  const fetchEmployeeProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get(`/employees/${id}`).catch(() => null)

      if (response?.data) {
        setEmployee(response.data)
      } else {
        // Fallback data - comprehensive employee list
        const allEmployees = [
          { id: 1, name: 'Sarah Jenkins', role: 'Lead UI/UX Designer', department: 'Design', location: 'New York Office', email: 'sarah.jenkins@corp.com', phone: '+1-555-0101', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', joinDate: '2022-03-15', bio: 'Creative designer with 5+ years of experience', team: 'Design Team', manager: 'Elena Rodriguez' },
          { id: 2, name: 'Alex Rivera', role: 'Senior Backend Engineer', department: 'Engineering', location: 'London Office', email: 'alex.rivera@corp.com', phone: '+44-20-7123-4567', avatar: 'https://i.pravatar.cc/150?img=11', status: 'away', joinDate: '2021-06-20', bio: 'Backend specialist, Python & Node.js expert', team: 'Platform Team', manager: 'David Miller' },
          { id: 3, name: 'Maria Gonzalez', role: 'Human Resources Manager', department: 'Human Resources', location: 'Madrid Office', email: 'maria.gonzalez@corp.com', phone: '+34-91-123-4567', avatar: 'https://i.pravatar.cc/150?img=44', status: 'online', joinDate: '2020-01-10', bio: 'HR leader managing talent and culture', team: 'People Team', manager: 'Jonathan Sterling' },
          { id: 4, name: 'David Miller', role: 'Backend Lead', department: 'Engineering', location: 'London Office', email: 'david.miller@corp.com', phone: '+44-20-7234-5678', avatar: 'https://i.pravatar.cc/150?img=12', status: 'online', joinDate: '2020-08-05', bio: 'Technical leader with 8+ years backend experience', team: 'Backend Team', manager: 'Alex Rivera' },
          { id: 5, name: 'Elena Rodriguez', role: 'Marketing Director', department: 'Marketing', location: 'New York Office', email: 'elena.rodriguez@corp.com', phone: '+1-555-0102', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', joinDate: '2019-11-12', bio: 'Strategic marketing leader', team: 'Marketing Team', manager: 'Jonathan Sterling' },
          { id: 6, name: 'James Chen', role: 'DevOps Engineer', department: 'Engineering', location: 'Remote', email: 'james.chen@corp.com', phone: '+1-555-0103', avatar: 'https://i.pravatar.cc/150?img=13', status: 'online', joinDate: '2021-02-18', bio: 'Cloud infrastructure specialist', team: 'Platform Team', manager: 'David Miller' },
          { id: 7, name: 'Sophie Martin', role: 'Product Manager', department: 'Product', location: 'Paris Office', email: 'sophie.martin@corp.com', phone: '+33-1-1234-5678', avatar: 'https://i.pravatar.cc/150?img=33', status: 'away', joinDate: '2021-09-01', bio: 'Product strategy and management', team: 'Product Team', manager: 'Elena Rodriguez' },
          { id: 8, name: 'Michael Park', role: 'Senior Frontend Engineer', department: 'Engineering', location: 'Tokyo Office', email: 'michael.park@corp.com', phone: '+81-3-1234-5678', avatar: 'https://i.pravatar.cc/150?img=14', status: 'online', joinDate: '2020-05-22', bio: 'Frontend expert with React specialization', team: 'Frontend Team', manager: 'Sarah Jenkins' },
          { id: 9, name: 'Lisa Anderson', role: 'Quality Assurance Lead', department: 'Engineering', location: 'New York Office', email: 'lisa.anderson@corp.com', phone: '+1-555-0104', avatar: 'https://i.pravatar.cc/150?img=34', status: 'online', joinDate: '2019-07-08', bio: 'QA automation expert', team: 'QA Team', manager: 'David Miller' },
          { id: 10, name: 'Carlos Sanchez', role: 'Sales Manager', department: 'Sales', location: 'Madrid Office', email: 'carlos.sanchez@corp.com', phone: '+34-91-234-5678', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online', joinDate: '2020-03-15', bio: 'Enterprise sales specialist', team: 'Sales Team', manager: 'Jonathan Sterling' },
          { id: 11, name: 'Priya Patel', role: 'Data Analyst', department: 'Analytics', location: 'Remote', email: 'priya.patel@corp.com', phone: '+91-99123-45678', avatar: 'https://i.pravatar.cc/150?img=35', status: 'online', joinDate: '2021-10-05', bio: 'Business intelligence and data analytics', team: 'Analytics Team', manager: 'Elena Rodriguez' },
          { id: 12, name: 'Yuki Tanaka', role: 'UX Researcher', department: 'Design', location: 'Tokyo Office', email: 'yuki.tanaka@corp.com', phone: '+81-3-2345-6789', avatar: 'https://i.pravatar.cc/150?img=36', status: 'away', joinDate: '2022-01-20', bio: 'User research and testing specialist', team: 'Design Team', manager: 'Sarah Jenkins' },
          { id: 13, name: 'Thomas Müller', role: 'Infrastructure Engineer', department: 'Engineering', location: 'Berlin Office', email: 'thomas.muller@corp.com', phone: '+49-30-1234-5678', avatar: 'https://i.pravatar.cc/150?img=16', status: 'online', joinDate: '2020-12-10', bio: 'Cloud and infrastructure specialist', team: 'Platform Team', manager: 'James Chen' },
          { id: 14, name: 'Amelia Brooks', role: 'Content Strategist', department: 'Marketing', location: 'London Office', email: 'amelia.brooks@corp.com', phone: '+44-20-3456-7890', avatar: 'https://i.pravatar.cc/150?img=37', status: 'online', joinDate: '2021-04-12', bio: 'Content strategy and creation', team: 'Marketing Team', manager: 'Elena Rodriguez' },
          { id: 15, name: 'Rajesh Kumar', role: 'Business Analyst', department: 'Analytics', location: 'Bangalore Office', email: 'rajesh.kumar@corp.com', phone: '+91-80-1234-5678', avatar: 'https://i.pravatar.cc/150?img=17', status: 'online', joinDate: '2020-09-01', bio: 'Business process analysis and optimization', team: 'Analytics Team', manager: 'Priya Patel' }
        ]

        const foundEmployee = allEmployees.find(emp => emp.id === parseInt(id))
        if (foundEmployee) {
          setEmployee(foundEmployee)
        } else {
          setError('Employee not found')
        }
      }
    } catch (err) {
      setError('Failed to load employee profile')
      console.error('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fade-in">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <Loading message="Loading employee profile..." />
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="fade-in">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-bold text-red-800">{error || 'Employee not found'}</h3>
          <button
            onClick={() => navigate('/directory')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Return to Directory
          </button>
        </div>
      </div>
    )
  }

  const isOwnProfile = user?.id === employee.id

  return (
    <div className="fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header Background */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-500 relative">
              <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-40 h-40 rounded-3xl border-4 border-white shadow-lg object-cover"
                  />
                  <div className={`absolute bottom-4 right-4 w-6 h-6 rounded-full border-3 border-white ${
                    employee.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
              </div>
            </div>
            
            <div className="px-8 pb-8 pt-24">
              {/* Header Section with Profile Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-5xl font-black text-slate-900">{employee.name}</h1>
                    {isOwnProfile && (
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                        <i className="fa-solid fa-star"></i>Your Profile
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-slate-500">Employee ID: {employee.id}</p>
                </div>
              </div>

              {/* Role and Bio */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <p className="text-2xl font-bold text-blue-600 mb-2">{employee.role}</p>
                <p className="text-slate-600 text-base leading-relaxed">{employee.bio}</p>
              </div>

              {/* Info Grid - Enhanced with Cards */}
              <div className="grid grid-cols-3 gap-4 pb-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                      <i className="fa-solid fa-building text-sm"></i>
                    </div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Department</p>
                  </div>
                  <p className="font-bold text-slate-900 text-lg">{employee.department}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                      <i className="fa-solid fa-location-dot text-sm"></i>
                    </div>
                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Location</p>
                  </div>
                  <p className="font-bold text-slate-900 text-lg">{employee.location}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white">
                      <i className="fa-solid fa-calendar text-sm"></i>
                    </div>
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Joined</p>
                  </div>
                  <p className="font-bold text-slate-900 text-lg">{new Date(employee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                </div>
              </div>

              {/* Team and Manager Section - Enhanced */}
              <div className="grid grid-cols-2 gap-8">
                {/* Team Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Team</p>
                      <h3 className="font-black text-slate-900 text-lg">{employee.team}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <i className="fa-solid fa-users text-blue-600"></i>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
                      <div className="w-9 h-9 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">B</div>
                      <div className="w-9 h-9 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">C</div>
                      <div className="w-9 h-9 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">+5</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">8 team members total</p>
                  <button className="w-full py-2.5 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 border border-blue-200">
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>View Team
                  </button>
                </div>
                
                {/* Manager Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reports To</p>
                      <h3 className="font-black text-slate-900 text-lg">{employee.manager}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                      <i className="fa-solid fa-user-tie text-amber-600"></i>
                    </div>
                  </div>
                  
                  <img src="https://i.pravatar.cc/150?img=32" alt={employee.manager} className="w-12 h-12 rounded-xl mb-4 border-2 border-white shadow-md" />
                  <p className="text-sm text-slate-600 mb-4">Head of {employee.department}</p>
                  <button className="w-full py-2.5 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 border border-blue-200">
                    <i className="fa-solid fa-user-plus text-xs"></i>View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Actions Card */}
        <div>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sticky top-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-blue-600"></i>Contact Details
              </h3>
            </div>
            
            {/* Contact Items */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                  <i className="fa-solid fa-envelope text-blue-600 text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                  <a href={`mailto:${employee.email}`} className="text-blue-600 hover:text-blue-700 font-semibold break-all block mb-2">
                    {employee.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0 border-2 border-green-200">
                  <i className="fa-solid fa-phone text-green-600 text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                  <a href={`tel:${employee.phone}`} className="text-blue-600 hover:text-blue-700 font-semibold block">
                    {employee.phone}
                  </a>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                  employee.status === 'online'
                    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                    : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    employee.status === 'online' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                  <span className={`inline-block font-bold px-3 py-1 rounded-full text-sm ${
                    employee.status === 'online'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {employee.status === 'online' ? '🟢 Online' : '🟡 Away'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
              
              <button className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                <i className="fa-solid fa-envelope group-hover:scale-110 transition-transform"></i>Send Email
              </button>
              
              <button className="w-full py-3.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group border border-slate-300">
                <i className="fa-solid fa-comment group-hover:scale-110 transition-transform"></i>Send Message
              </button>
              
              <button className="w-full py-3.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group border border-slate-300">
                <i className="fa-solid fa-phone group-hover:scale-110 transition-transform"></i>Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
