import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({ onTrack: 142, atRisk: 12 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProjectsData()
  }, [])

  const fetchProjectsData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const [projectsResponse, statsResponse] = await Promise.all([
        api.get('/projects').catch(() => null),
        api.get('/projects/stats').catch(() => null)
      ])

      setProjects(projectsResponse?.data || [
        {
          id: 1,
          title: 'Mobile App Revamp v2.0',
          description: 'Migrating core architecture to React Native and updating UI kit.',
          category: 'Development',
          progress: 75,
          dueDate: '2024-12-12',
          status: 'on-track',
          team: [
            'https://i.pravatar.cc/100?img=1',
            'https://i.pravatar.cc/100?img=2'
          ],
          teamCount: 4
        },
        {
          id: 2,
          title: 'Global Brand Identity',
          description: 'Redefining visual language for the EMEA and APAC expansion.',
          category: 'Marketing',
          progress: 40,
          dueDate: '2025-01-05',
          status: 'delayed',
          team: [
            'https://i.pravatar.cc/100?img=3',
            'https://i.pravatar.cc/100?img=4'
          ],
          teamCount: 2
        },
        {
          id: 3,
          title: 'AI Integration Study',
          description: 'Feasibility report on implementing LLMs for customer support.',
          category: 'Research',
          progress: 92,
          dueDate: '2024-10-30',
          status: 'near-completion',
          team: [
            'https://i.pravatar.cc/100?img=5'
          ],
          teamCount: 1
        }
      ])

      setStats(statsResponse?.data || { onTrack: 142, atRisk: 12 })
    } catch (err) {
      setError('Failed to load projects data')
      console.error('Projects fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-emerald-500'
      case 'delayed': return 'text-orange-500'
      case 'near-completion': return 'text-emerald-500'
      default: return 'text-slate-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return 'fa-circle-check'
      case 'delayed': return 'fa-triangle-exclamation'
      case 'near-completion': return 'fa-circle-check'
      default: return 'fa-circle'
    }
  }

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'development': return 'bg-blue-50 text-blue-600'
      case 'marketing': return 'bg-purple-50 text-purple-600'
      case 'research': return 'bg-orange-50 text-orange-600'
      default: return 'bg-slate-50 text-slate-600'
    }
  }

  const getProgressColor = (category) => {
    switch (category.toLowerCase()) {
      case 'development': return 'bg-blue-600'
      case 'marketing': return 'bg-purple-500'
      case 'research': return 'bg-orange-500'
      default: return 'bg-slate-500'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleNewProject = () => {
    console.log('Opening new project modal')
    // In a real app, this would open a modal
    alert('New project feature coming soon!')
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Project Management</h1>
            <p className="text-sm text-slate-400 font-medium">Tracking 184 active initiatives across all departments</p>
          </div>
        </div>
        <Loading message="Loading projects..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Project Management</h1>
            <p className="text-sm text-slate-400 font-medium">Tracking 184 active initiatives across all departments</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Projects</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchProjectsData}
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
          <h1 className="text-3xl font-extrabold text-slate-800">Project Management</h1>
          <p className="text-sm text-slate-400 font-medium">Tracking 184 active initiatives across all departments</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-6 py-2 border-r border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase">On Track</p>
            <p className="text-xl font-black text-emerald-500">{stats.onTrack}</p>
          </div>
          <div className="px-6 py-2">
            <p className="text-[10px] font-black text-slate-400 uppercase">At Risk</p>
            <p className="text-xl font-black text-orange-500">{stats.atRisk}</p>
          </div>
          <button
            onClick={handleNewProject}
            className="ml-4 px-6 py-3 bg-[#04228c] rounded-xl text-xs font-bold text-white hover:bg-[#031a6b] transition-colors"
          >
            + New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-card bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <span className={`status-tag ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <div className="flex -space-x-3">
                  {project.team.slice(0, 2).map((avatar, index) => (
                    <img key={index} src={avatar} className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                  {project.teamCount > 2 && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                      +{project.teamCount - 2}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">{project.title}</h3>
              <p className="text-xs text-slate-400 font-medium mb-6">{project.description}</p>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Progress</span>
                  <span className="text-[10px] font-black text-slate-800">{project.progress}%</span>
                </div>
                <div className="progress-bar h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`progress-fill h-full rounded-full transition-all duration-1000 ${getProgressColor(project.category)}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400">
                  <i className="fa-regular fa-calendar mr-1"></i> {formatDate(project.dueDate)}
                </span>
                <span className={`text-[10px] font-bold ${getStatusColor(project.status)}`}>
                  <i className={`fa-solid ${getStatusIcon(project.status)} mr-1`}></i>
                  {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Critical Deadlines</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-xs font-black text-slate-800">Server Migration</p>
                  <p className="text-[10px] text-slate-400">Due in 2 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-xs font-black text-slate-800">Q3 Audit Report</p>
                  <p className="text-[10px] text-slate-400">Due in 5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-xs font-black text-slate-800">Product Launch</p>
                  <p className="text-[10px] text-slate-400">Due in 1 week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Project Categories</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Development</span>
                <span className="text-xs font-black text-slate-800">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Marketing</span>
                <span className="text-xs font-black text-slate-800">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Research</span>
                <span className="text-xs font-black text-slate-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600">Operations</span>
                <span className="text-xs font-black text-slate-800">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
