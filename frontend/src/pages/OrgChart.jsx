import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function OrgChart() {
  const [orgData, setOrgData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchOrgData()
  }, [])

  const fetchOrgData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get('/orgchart').catch(() => null)

      setOrgData(response?.data || {
        ceo: {
          name: 'Jonathan Sterling',
          title: 'Chief Executive Officer',
          avatar: 'https://i.pravatar.cc/150?img=68',
          role: 'Executive'
        },
        departments: [
          {
            head: {
              name: 'Alex Rivera',
              title: 'Chief Tech Officer',
              avatar: 'https://i.pravatar.cc/150?img=11',
              role: 'Department Head'
            },
            teams: [
              {
                name: 'Sarah Jenkins',
                title: 'Frontend Lead',
                role: 'Team Lead',
                members: [
                  { name: 'Mia Carter', title: 'Senior Frontend Engineer', role: 'Team Member' },
                  { name: 'Avery Kim', title: 'UI/UX Designer', role: 'Team Member' }
                ]
              },
              {
                name: 'David Miller',
                title: 'Backend Lead',
                role: 'Team Lead',
                members: [
                  { name: 'Noah Patel', title: 'Senior Backend Engineer', role: 'Team Member' },
                  { name: 'Lina Chen', title: 'Database Administrator', role: 'Team Member' }
                ]
              },
              {
                name: 'Priya Singh',
                title: 'QA Lead',
                role: 'Team Lead',
                members: [
                  { name: 'Elise Moore', title: 'QA Analyst', role: 'Team Member' }
                ]
              }
            ]
          },
          {
            head: {
              name: 'Elena Rodriguez',
              title: 'Marketing Director',
              avatar: 'https://i.pravatar.cc/150?img=32',
              role: 'Department Head'
            },
            teams: [
              {
                name: 'Mark Johnson',
                title: 'Digital Manager',
                role: 'Team Lead',
                members: [
                  { name: 'Sofia Turner', title: 'Content Strategist', role: 'Team Member' },
                  { name: 'Caleb Brooks', title: 'SEO Specialist', role: 'Team Member' }
                ]
              },
              {
                name: 'Amina Hassan',
                title: 'Brand Lead',
                role: 'Team Lead',
                members: [
                  { name: 'Oliver Price', title: 'Social Media Coordinator', role: 'Team Member' }
                ]
              }
            ]
          },
          {
            head: {
              name: 'Maria Gonzalez',
              title: 'Chief Operations Officer',
              avatar: 'https://i.pravatar.cc/150?img=44',
              role: 'Department Head'
            },
            teams: [
              {
                name: 'Tina Brooks',
                title: 'HR Manager',
                role: 'Team Lead',
                members: [
                  { name: 'Jayden Ross', title: 'Recruitment Specialist', role: 'Team Member' }
                ]
              },
              {
                name: 'Victor Ellis',
                title: 'Finance Manager',
                role: 'Team Lead',
                members: [
                  { name: 'Nina Patel', title: 'Payroll Analyst', role: 'Team Member' }
                ]
              }
            ]
          },
          {
            head: {
              name: 'Sofia Brooks',
              title: 'Chief Product Officer',
              avatar: 'https://i.pravatar.cc/150?img=37',
              role: 'Department Head'
            },
            teams: [
              {
                name: 'Isaac Turner',
                title: 'Product Lead',
                role: 'Team Lead',
                members: [
                  { name: 'Hannah Lewis', title: 'Product Designer', role: 'Team Member' }
                ]
              }
            ]
          }
        ]
      })
    } catch (err) {
      setError('Failed to load organization data')
      console.error('OrgChart fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Executive': return 'bg-slate-900 text-white'
      case 'Department Head': return 'bg-blue-100 text-blue-600'
      case 'Team Lead': return 'bg-blue-50 text-blue-400'
      case 'Team Member': return 'bg-slate-100 text-slate-600'
      default: return 'bg-slate-100 text-slate-600'
    }
  }

  const handleZoom = () => {
    console.log('Zoom functionality')
    // In a real app, this would zoom the org chart
    alert('Zoom feature coming soon!')
  }

  const handleExport = () => {
    console.log('Export functionality')
    // In a real app, this would export the org chart
    alert('Export feature coming soon!')
  }

  const handleFilter = () => {
    console.log('Filter functionality')
    // In a real app, this would open filter options
    alert('Filter feature coming soon!')
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="max-w-[1440px] mx-auto px-8 pt-8">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8">
            <div>
              <h1 className="text-xl font-black text-slate-800">Organization Chart</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Hierarchy</p>
            </div>
          </div>
        </div>
        <Loading message="Loading organization chart..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="max-w-[1440px] mx-auto px-8 pt-8">
          <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8">
            <div>
              <h1 className="text-xl font-black text-slate-800">Organization Chart</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Hierarchy</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mx-8">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Organization Chart</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchOrgData}
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
      <div className="max-w-[1440px] mx-auto px-8 pt-8">
        <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8">
          <div>
            <h1 className="text-xl font-black text-slate-800">Organization Chart</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Hierarchy</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleZoom}
              className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass-plus mr-2"></i> Zoom
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              <i className="fa-solid fa-download mr-2"></i> Export
            </button>
            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-[#04228c] text-white text-xs font-bold rounded-xl hover:bg-[#031a6b] transition-colors"
            >
              <i className="fa-solid fa-filter mr-2"></i> Filter View
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-auto pb-8">
        <div className="tree-container">
          <div className="tree">
            <ul>
              <li>
                <div className="node bg-white border border-slate-100 p-4 rounded-3xl w-60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
                  <span className={`role-tag ${getRoleColor(orgData.ceo.role)}`}>
                    {orgData.ceo.role}
                  </span>
                  <img src={orgData.ceo.avatar} className="mx-auto w-12 h-12 rounded-2xl object-cover mb-3" alt={`${orgData.ceo.name} avatar`} />
                  <h4 className="text-sm font-black text-slate-800">{orgData.ceo.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{orgData.ceo.title}</p>
                </div>
                <ul>
                  {orgData.departments.map((dept, deptIndex) => (
                    <li key={deptIndex}>
                      <div className="node bg-white border border-slate-100 p-4 rounded-3xl w-60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
                        <span className={`role-tag ${getRoleColor(dept.head.role)}`}>
                          {dept.head.role}
                        </span>
                        <img src={dept.head.avatar} className="mx-auto w-12 h-12 rounded-2xl object-cover mb-3" alt={`${dept.head.name} avatar`} />
                        <h4 className="text-sm font-black text-slate-800">{dept.head.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{dept.head.title}</p>
                      </div>
                      {dept.teams.length > 0 && (
                        <ul>
                          {dept.teams.map((team, teamIndex) => (
                            <li key={teamIndex}>
                              <div className="node bg-white border border-slate-100 p-4 rounded-3xl w-60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
                                <span className={`role-tag ${getRoleColor(team.role)}`}>
                                  {team.role}
                                </span>
                                <h4 className="text-sm font-black text-slate-800">{team.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold">{team.title}</p>
                              </div>
                              {team.members?.length > 0 && (
                                <ul>
                                  {team.members.map((member, memberIndex) => (
                                    <li key={memberIndex}>
                                      <div className="node bg-white border border-slate-100 p-4 rounded-3xl w-60 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300">
                                        <span className={`role-tag ${getRoleColor(member.role)}`}>
                                          {member.role}
                                        </span>
                                        <h4 className="text-sm font-black text-slate-800">{member.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold">{member.title}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
