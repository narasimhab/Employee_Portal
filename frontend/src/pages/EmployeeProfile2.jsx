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

      const response = await api.get(`/employees/${id}`).catch(() => null)

      if (response?.data) {
        setEmployee(response.data)
      } else {
        const allEmployees = [
          { id: 1, name: 'Sarah Jenkins', role: 'Lead UI/UX Designer', department: 'Design', location: 'New York Office', email: 'sarah.jenkins@corp.com', phone: '+1-555-0101', avatar: 'https://i.pravatar.cc/150?img=32', status: 'online', joinDate: '2022-03-15', bio: 'Creative designer with 5+ years of experience crafting user-centered digital experiences.', team: 'Design Team', manager: 'Elena Rodriguez' },
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

        const foundEmployee = allEmployees.find(emp => emp.id === parseInt(id || '1')) // Defaulting to 1 for example match
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
      <div className="fade-in p-8">
        <Loading message="Loading employee profile..." />
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="fade-in p-8">
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

  return (
    <div className="fade-in min-h-screen bg-slate-50/50 p-8 font-sans">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to People
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
        {/* Main Profile Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {/* Gradient Banner Background */}
            <div className="h-44 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 relative">
              {/* Subtle background decorative element to mimic screenshot */}
              <div className="absolute right-0 bottom-0 opacity-10 w-48 h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>
              
              <div className="absolute -bottom-14 left-8">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-36 h-36 rounded-3xl border-4 border-white shadow-md object-cover"
                  />
                  <span className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-white ${
                    employee.status === 'online' ? 'bg-green-500' : 'bg-amber-500'
                  }`}></span>
                </div>
              </div>
            </div>
            
            {/* Profile Core Details */}
            <div className="px-8 pt-20 pb-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold tracking-wide uppercase">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    YOUR PROFILE
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-blue-600 mb-3">{employee.role}</h2>
                <p className="text-slate-500 text-sm max-w-xl leading-relaxed">{employee.bio}</p>
              </div>

              {/* Info Matrix Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 my-6 border-y border-slate-100">
                <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</span>
                    <span className="text-sm font-bold text-slate-800">{employee.department}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                    <span className="text-sm font-bold text-slate-800">{employee.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joined</span>
                    <span className="text-sm font-bold text-slate-800">
                      {new Date(employee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Org Hierarchy Units */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                {/* Team Info block */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">TEAM</span>
                  <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                    <div className="bg-blue-600/10 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm">{employee.team}</h4>
                      <p className="text-xs text-slate-400 font-medium">8 Members</p>
                      <button className="text-blue-600 hover:text-blue-700 font-bold text-xs mt-1 flex items-center gap-1 transition-all">
                        View Team <span className="text-[14px]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Manager Info block */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">MANAGER</span>
                  <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" alt={employee.manager} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm">{employee.manager}</h4>
                      <p className="text-xs text-slate-400 font-medium">Head of {employee.department}</p>
                      <button className="text-blue-600 hover:text-blue-700 font-bold text-xs mt-1 flex items-center gap-1 transition-all">
                        View Profile <span className="text-[14px]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Side Actions & Contact Information Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 space-y-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-md font-bold text-slate-800">Contact Information</h3>
              <button className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Email Block */}
              <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/70">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                  <a href={`mailto:${employee.email}`} className="text-xs font-semibold text-blue-600 hover:underline break-all">
                    {employee.email}
                  </a>
                </div>
              </div>

              {/* Phone Block */}
              <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/70">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                  <a href={`tel:${employee.phone}`} className="text-xs font-semibold text-blue-600 hover:underline">
                    {employee.phone}
                  </a>
                </div>
              </div>

              {/* Status Block */}
              <div className="flex items-center gap-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/70">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm ${
                  employee.status === 'online' ? 'bg-green-500 shadow-green-500/20' : 'bg-amber-500 shadow-amber-500/20'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border mt-0.5 ${
                    employee.status === 'online' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${employee.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    {employee.status === 'online' ? 'Online' : 'Away'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Partition Section */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Actions</span>
              <button className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-500/10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Send Email
              </button>
              <button className="w-full py-3.5 bg-white border border-slate-200 text-blue-600 rounded-xl font-bold text-sm hover:bg-slate-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}