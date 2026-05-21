import React, { useState, useEffect, useRef } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Performance() {
  const [performanceData, setPerformanceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const radarChartRef = useRef(null)
  const chartInstanceRef = useRef(null)

  useEffect(() => {
    fetchPerformanceData()
  }, [])

  useEffect(() => {
    if (performanceData && radarChartRef.current) {
      initializeChart()
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [performanceData])

  const fetchPerformanceData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get('/performance').catch(() => null)

      setPerformanceData(response?.data || {
        kpis: [
          {
            name: 'Project Delivery',
            percentage: 85,
            status: 'On track for Q4 goals',
            color: '#3b82f6'
          },
          {
            name: 'Client Retention',
            percentage: 62,
            status: 'Needs minor focus',
            color: '#8b5cf6'
          },
          {
            name: 'Technical Debt',
            percentage: 92,
            status: 'Exceeding expectations',
            color: '#10b981'
          }
        ],
        reviews: [
          {
            cycle: 'Annual Review 2023',
            reviewer: 'Alex Rivera (CTO)',
            status: 'Completed',
            grade: 'Exceeds (4.8/5.0)'
          },
          {
            cycle: 'Mid-Year Check-in 2024',
            reviewer: 'Alex Rivera (CTO)',
            status: 'Completed',
            grade: 'Meets (4.2/5.0)'
          }
        ],
        skills: {
          labels: ['Leadership', 'Technical Skill', 'Communication', 'Innovation', 'Ownership', 'Teamwork'],
          self: [85, 95, 75, 90, 88, 82],
          manager: [80, 92, 85, 85, 90, 88]
        }
      })
    } catch (err) {
      setError('Failed to load performance data')
      console.error('Performance fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const initializeChart = async () => {
    try {
      // Dynamically import Chart.js
      const Chart = (await import('chart.js/auto')).default

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      const ctx = radarChartRef.current.getContext('2d')
      chartInstanceRef.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: performanceData.skills.labels,
          datasets: [
            {
              label: 'Self Assessment',
              data: performanceData.skills.self,
              fill: true,
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              borderColor: '#3b82f6',
              pointBackgroundColor: '#3b82f6',
            },
            {
              label: 'Manager Review',
              data: performanceData.skills.manager,
              fill: true,
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              borderColor: '#8b5cf6',
              pointBackgroundColor: '#8b5cf6',
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: { display: false }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: { weight: 'bold', family: 'Inter' },
                usePointStyle: true
              }
            }
          }
        }
      })
    } catch (err) {
      console.error('Failed to initialize chart:', err)
    }
  }

  const handleDownloadReport = () => {
    console.log('Downloading full report')
    // In a real app, this would download a PDF report
    alert('Report download feature coming soon!')
  }

  const handleScheduleCheckin = () => {
    console.log('Scheduling check-in')
    // In a real app, this would open a scheduling modal
    alert('Check-in scheduling feature coming soon!')
  }

  const handleViewPDF = (cycle) => {
    console.log('Viewing PDF for:', cycle)
    // In a real app, this would open the PDF
    alert(`Opening PDF for ${cycle}`)
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Performance Overview</h1>
            <p className="text-sm text-slate-400 font-medium">Review Cycle: Q4 2024 (In Progress)</p>
          </div>
        </div>
        <Loading message="Loading performance data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Performance Overview</h1>
            <p className="text-sm text-slate-400 font-medium">Review Cycle: Q4 2024 (In Progress)</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Performance Data</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchPerformanceData}
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
          <h1 className="text-3xl font-extrabold text-slate-800">Performance Overview</h1>
          <p className="text-sm text-slate-400 font-medium">Review Cycle: Q4 2024 (In Progress)</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadReport}
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Download Full Report
          </button>
          <button
            onClick={handleScheduleCheckin}
            className="px-6 py-3 bg-[#04228c] rounded-2xl text-xs font-black text-white shadow-lg hover:bg-[#031a6b] transition-colors"
          >
            Schedule Check-in
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-800">Skill Competency Map</h3>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase">Self vs. Manager</span>
          </div>
          <div className="h-[400px]">
            <canvas ref={radarChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
          <h3 className="font-black text-slate-800 mb-8">Active KPIs</h3>
          <div className="space-y-8">
            {performanceData.kpis.map((kpi, index) => (
              <div key={index} className="flex items-center gap-6">
                <div
                  className="kpi-circle shrink-0 flex items-center justify-center relative"
                  style={{
                    '--p': `${kpi.percentage}%`,
                    background: `conic-gradient(${kpi.color} var(--p), #f1f5f9 0)`
                  }}
                >
                  <div className="absolute w-16 h-16 bg-white rounded-full"></div>
                  <span className="relative text-xs font-black text-slate-800">{kpi.percentage}%</span>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800">{kpi.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{kpi.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-800 mb-6">Review Timeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4">Cycle</th>
                  <th className="pb-4">Reviewer</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Final Grade</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {performanceData.reviews.map((review, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-6 font-bold text-slate-800">{review.cycle}</td>
                    <td className="py-6 font-medium text-slate-500">{review.reviewer}</td>
                    <td className="py-6">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg uppercase">
                        {review.status}
                      </span>
                    </td>
                    <td className="py-6 font-black text-slate-800">{review.grade}</td>
                    <td className="py-6 text-right">
                      <button
                        onClick={() => handleViewPDF(review.cycle)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        View PDF
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
  )
}
