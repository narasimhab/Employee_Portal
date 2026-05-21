import React, { useState, useEffect, useMemo } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Certifications() {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All Types')

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming there's an API endpoint for certifications
      const response = await api.get('/certifications')
      setCertifications(response.data || [])
    } catch (err) {
      // Fallback to static data
      setCertifications([
        {
          id: 1,
          title: 'AWS Solutions Architect',
          issuer: 'Amazon Web Services',
          status: 'Verified',
          statusClass: 'badge-verified',
          issuedDate: 'Jan 2024',
          icon: 'fa-brands fa-aws',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600'
        },
        {
          id: 2,
          title: 'Cyber Security Pro',
          issuer: 'CompTIA',
          status: 'Expired',
          statusClass: 'badge-expired',
          expiredDate: 'Oct 2024',
          icon: 'fa-solid fa-shield-halved',
          iconBg: 'bg-orange-50',
          iconColor: 'text-orange-600',
          hasRenewButton: true
        },
        {
          id: 3,
          title: 'Agile Project Management',
          issuer: 'Scrum Alliance',
          status: 'Under Review',
          statusClass: 'badge-pending',
          uploadedDate: '2 days ago',
          icon: 'fa-solid fa-people-roof',
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-600'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    'All Types',
    'Technical',
    'Leadership',
    'Compliance'
  ]

  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'All Types') return certifications
    // Map categories to certification types
    const categoryMap = {
      'Technical': ['AWS Solutions Architect', 'Cyber Security Pro'],
      'Leadership': ['Agile Project Management'],
      'Compliance': []
    }
    return certifications.filter(cert => categoryMap[selectedCategory]?.includes(cert.title))
  }, [certifications, selectedCategory])

  const recommendedCourses = [
    {
      title: 'Advanced Machine Learning Foundations',
      modules: '6 Modules',
      hours: '12 Hours',
      icon: 'fa-microchip'
    },
    {
      title: 'Executive Communication Masterclass',
      modules: '4 Modules',
      hours: '8 Hours',
      icon: 'fa-comments'
    }
  ]

  const progressStats = {
    activeCerts: 8,
    pointsEarned: 1200
  }

  const viewFile = (certId) => {
    console.log('View file for certification:', certId)
  }

  const renewCertification = (certId) => {
    console.log('Renew certification:', certId)
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Certifications</h1>
        <Loading message="Loading certifications..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Certifications</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Certifications</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchCertifications}
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Certifications</h1>
          <p className="text-sm text-slate-400 font-medium">Manage your professional credentials and learning path</p>
        </div>
        <button className="px-6 py-3 bg-blue-900 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors">
          <i className="fa-solid fa-cloud-arrow-up mr-2"></i> Add New Certification
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Your Progress</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-600">Active Certs</span>
                <span className="text-xl font-black text-blue-600">{progressStats.activeCerts.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-600">Points Earned</span>
                <span className="text-xl font-black text-emerald-500">{progressStats.pointsEarned.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
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
        </aside>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div key={cert.id} className="cert-card p-6 rounded-[2rem] bg-white border border-slate-100 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${cert.iconBg} ${cert.iconColor}`}>
                    <i className={cert.icon}></i>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${cert.statusClass}`}>
                    {cert.status}
                  </span>
                </div>
                <h3 className="font-black text-slate-800 mb-1">{cert.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">{cert.issuer}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <p className={`text-[10px] font-bold ${
                    cert.expiredDate ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {cert.issuedDate ? `Issued: ${cert.issuedDate}` :
                     cert.expiredDate ? `Expired: ${cert.expiredDate}` :
                     cert.uploadedDate ? `Uploaded: ${cert.uploadedDate}` : ''}
                  </p>
                  {cert.hasRenewButton ? (
                    <button
                      onClick={() => renewCertification(cert.id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase hover:bg-red-100 transition-colors"
                    >
                      Renew Now
                    </button>
                  ) : (
                    <button
                      onClick={() => viewFile(cert.id)}
                      className="text-blue-600 font-black text-[10px] uppercase hover:underline"
                    >
                      View File
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-[2.5rem] p-8 border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-800">Recommended for You</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Based on your career path</p>
              </div>
              <button className="text-blue-600 text-xs font-black uppercase hover:text-blue-700 transition-colors">
                Explore All Courses
              </button>
            </div>
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <i className={`fa-solid ${course.icon} text-slate-400`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{course.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{course.modules} • {course.hours}</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-chevron-right text-slate-300"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

