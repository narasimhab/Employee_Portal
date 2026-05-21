import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Rewards() {
  const [rewards, setRewards] = useState([])
  const [recognitions, setRecognitions] = useState([])
  const [userPoints, setUserPoints] = useState(2840)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    fetchRewardsData()
  }, [])

  const fetchRewardsData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const [rewardsResponse, recognitionsResponse, pointsResponse] = await Promise.all([
        api.get('/rewards/catalog').catch(() => null),
        api.get('/rewards/recognitions').catch(() => null),
        api.get('/rewards/points').catch(() => null)
      ])

      setRewards(rewardsResponse?.data || [
        {
          id: 1,
          title: 'Amazon Gift Card',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400',
          points: 500,
          description: 'A $25 digital voucher sent directly to your work email.',
          category: 'Digital'
        },
        {
          id: 2,
          title: 'Company Hoodie',
          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400',
          points: 1200,
          description: 'Premium heavyweight hoodie with the CorpLink logo.',
          category: 'Experience'
        },
        {
          id: 3,
          title: 'Extra Personal Day',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
          points: 3000,
          description: 'Redeem for one additional day of paid leave.',
          category: 'Experience'
        }
      ])

      setRecognitions(recognitionsResponse?.data || [
        {
          id: 1,
          from: { name: 'Elena Rodriguez', avatar: 'https://i.pravatar.cc/150?img=32' },
          to: 'Sarah J.',
          message: 'Amazing job on the Q4 visuals, Sarah! You really went above and beyond for the launch.',
          tags: ['#TeamWork', '#Innovation'],
          borderColor: 'blue'
        },
        {
          id: 2,
          from: { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?img=11' },
          to: 'The Devs',
          message: 'The server migration was flawless. Huge thanks to everyone who stayed late to monitor the transition!',
          tags: [],
          borderColor: 'emerald'
        }
      ])

      setUserPoints(pointsResponse?.data?.points || 2840)
    } catch (err) {
      setError('Failed to load rewards data')
      console.error('Rewards fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredRewards = rewards.filter(reward => {
    if (activeFilter === 'All') return true
    return reward.category === activeFilter
  })

  const canRedeem = (points) => userPoints >= points

  const handleRedeem = (rewardId) => {
    console.log('Redeeming reward:', rewardId)
    // In a real app, this would call an API
    alert('Reward redeemed successfully!')
  }

  const handleGiveRecognition = () => {
    console.log('Opening recognition modal')
    // In a real app, this would open a modal
    alert('Recognition feature coming soon!')
  }

  if (loading) {
    return (
      <div className="fade-in">
        <Loading message="Loading rewards..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Rewards</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchRewardsData}
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
      <div className="bg-gradient-to-br from-[#04228c] to-blue-600 rounded-[3rem] p-10 text-white mb-10 flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-blue-200">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl font-black mb-2">Your Rewards Hub</h1>
          <p className="text-blue-100 font-medium max-w-md">You've earned points for great work, survey participation, and milestones. Turn them into real-world rewards.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-center min-w-[240px]">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Available Balance</p>
          <div className="flex items-center justify-center gap-3">
            <i className="fa-solid fa-coins text-yellow-400 text-3xl"></i>
            <span className="text-5xl font-black">{userPoints.toLocaleString()}</span>
          </div>
          <button className="mt-6 w-full py-3 bg-white text-blue-900 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-all">
            Claim a Reward
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800">Catalog</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('Digital')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'Digital'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                Digital
              </button>
              <button
                onClick={() => setActiveFilter('Experience')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === 'Experience'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                Experience
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRewards.map((reward) => (
              <div key={reward.id} className="reward-card bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <img src={reward.image} alt="" className="h-40 w-full object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-black text-slate-800">{reward.title}</h3>
                    <span className="points-tag bg-orange-50 text-orange-700 border-orange-200">
                      {reward.points} Pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-6">{reward.description}</p>
                  <button
                    onClick={() => canRedeem(reward.points) ? handleRedeem(reward.id) : null}
                    disabled={!canRedeem(reward.points)}
                    className={`w-full py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                      canRedeem(reward.points)
                        ? 'bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white'
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    {canRedeem(reward.points) ? 'Redeem' : 'Insufficient Points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Wall of Fame</h4>
            <div className="space-y-6">
              {recognitions.map((recognition) => (
                <div key={recognition.id} className={`recognition-bubble bg-white rounded-[1.5rem] p-5 border-l-4 border-${recognition.borderColor}-500`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={recognition.from.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-[10px] font-black text-slate-800">{recognition.from.name}</p>
                      <p className="text-[8px] text-slate-400 uppercase">recognized {recognition.to}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic">"{recognition.message}"</p>
                  {recognition.tags.length > 0 && (
                    <div className="mt-3 flex gap-2">
                      {recognition.tags.map((tag, index) => (
                        <span key={index} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleGiveRecognition}
              className="w-full mt-8 py-4 bg-[#04228c] text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:bg-[#031a6b] transition-colors"
            >
              Give Recognition
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

