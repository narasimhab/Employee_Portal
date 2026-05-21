import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Assets() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming there's an API endpoint for assets
      const response = await api.get('/assets')
      setAssets(response.data || [])
    } catch (err) {
      // Fallback to static data
      setAssets([
        {
          id: 1,
          name: 'MacBook Pro 16" M3',
          type: 'laptop',
          serial: 'C02XJ4KLJG5',
          status: 'Active',
          statusColor: 'emerald',
          assignedDate: 'Jan 12, 2024',
          condition: 'Excellent',
          icon: 'fa-laptop'
        },
        {
          id: 2,
          name: 'Dell UltraSharp 27"',
          type: 'monitor',
          assetTag: '#MON-0042',
          status: 'Active',
          statusColor: 'emerald',
          assignedDate: 'Mar 05, 2024',
          icon: 'fa-desktop',
          hasIssueButton: true
        },
        {
          id: 3,
          name: 'Adobe Creative Cloud',
          type: 'software',
          license: 'Enterprise',
          status: 'Digital',
          statusColor: 'blue',
          renewalDate: 'Dec 2024',
          renewalStatus: 'Auto-Renew',
          icon: 'fa-key'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const pendingRequests = [
    {
      name: 'Noise Cancelling HQ',
      status: 'Review',
      requestedDays: 2
    }
  ]

  const quickHelpItems = [
    { icon: 'fa-headset', text: 'Lost or Stolen?' },
    { icon: 'fa-screwdriver-wrench', text: 'Repair Request' },
    { icon: 'fa-rotate', text: 'Hardware Refresh' }
  ]

  const reportIssue = (assetId) => {
    console.log('Report issue for asset:', assetId)
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Assets</h1>
        <Loading message="Loading assets..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Assets</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Assets</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchAssets}
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
          <h1 className="text-3xl font-extrabold text-slate-800">Assets & Equipment</h1>
          <p className="text-sm text-slate-400 font-medium">
            Manage your company-issued hardware, software, and peripherals.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-colors">
            Inventory Report
          </button>
          <button className="px-6 py-3 bg-blue-900 rounded-2xl text-xs font-black text-white hover:bg-blue-800 transition-colors">
            + Request New Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="asset-card p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-500 hover:transform hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  asset.statusColor === 'emerald' ? 'bg-slate-50 text-slate-400' :
                  asset.statusColor === 'blue' ? 'bg-blue-50 text-blue-600' :
                  'bg-slate-50 text-slate-400'
                }`}>
                  <i className={`fa-solid ${asset.icon}`}></i>
                </div>
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${
                  asset.statusColor === 'emerald' ? 'text-emerald-500 bg-emerald-50' :
                  asset.statusColor === 'blue' ? 'text-blue-500 bg-blue-50' :
                  'text-slate-500 bg-slate-50'
                }`}>
                  {asset.status}
                </span>
              </div>
              <h3 className="font-black text-slate-800 text-sm mb-1">{asset.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">
                {asset.serial ? `Serial: ${asset.serial}` :
                 asset.assetTag ? `Asset Tag: ${asset.assetTag}` :
                 `License: ${asset.license}`}
              </p>
              <div className="pt-4 border-t border-slate-50 space-y-2">
                {asset.assignedDate && (
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-slate-400">Assigned</span>
                    <span className="font-black text-slate-600">{asset.assignedDate}</span>
                  </div>
                )}
                {asset.condition && (
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-slate-400">Condition</span>
                    <span className="font-black text-slate-600">{asset.condition}</span>
                  </div>
                )}
                {asset.renewalDate && (
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-slate-400">Renewal</span>
                    <span className="font-black text-slate-600">{asset.renewalDate}</span>
                  </div>
                )}
                {asset.renewalStatus && (
                  <div className="flex justify-between text-[10px]">
                    <span className="font-bold text-slate-400">Status</span>
                    <span className="font-black text-emerald-500">{asset.renewalStatus}</span>
                  </div>
                )}
                {asset.hasIssueButton && (
                  <button
                    onClick={() => reportIssue(asset.id)}
                    className="w-full mt-2 py-2 bg-slate-50 text-slate-400 text-[9px] font-black uppercase rounded-lg hover:text-red-500 transition-colors"
                  >
                    Report Issue
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Pending Requests</h4>
            <div className="space-y-4">
              {pendingRequests.map((request, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-slate-800">{request.name}</span>
                    <span className="text-[9px] font-black text-orange-500 uppercase">{request.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Requested {request.requestedDays} days ago</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] p-8 text-white">
            <h4 className="text-[10px] font-black uppercase opacity-60 mb-4">Quick Help</h4>
            <div className="space-y-3">
              {quickHelpItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <i className={`fa-solid ${item.icon} text-blue-400`}></i>
                  <span className="text-xs font-bold">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

