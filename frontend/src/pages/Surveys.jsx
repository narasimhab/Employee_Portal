import React, { useState, useEffect } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Surveys() {
  const [surveysData, setSurveysData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPollOption, setSelectedPollOption] = useState(null)

  useEffect(() => {
    fetchSurveysData()
  }, [])

  const fetchSurveysData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to fetch from API, fallback to static data
      const response = await api.get('/surveys').catch(() => null)

      setSurveysData(response?.data || {
        surveys: [
          {
            id: 1,
            icon: 'fa-building-user',
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            title: 'Q4 Work Culture Sentiment',
            time: '5 mins',
            reward: 50,
            description: 'We want to understand how the new hybrid work policy is affecting your work-life balance and team productivity.',
            expires: 'Oct 30',
            isAnonymous: true,
            isActive: true
          },
          {
            id: 2,
            icon: 'fa-utensils',
            iconColor: 'text-purple-600',
            bgColor: 'bg-purple-50',
            title: 'Office Cafeteria Menu Refresh',
            time: '2 mins',
            reward: 20,
            description: 'Vote for the new seasonal menu options for the upcoming winter quarter.',
            expires: 'Nov 05',
            isAnonymous: false,
            isActive: false
          }
        ],
        quickPoll: {
          question: 'How are you feeling about the new "Flex-Friday" initiative?',
          options: ['🤩 Loving it!', '👍 It\'s alright', '😐 No preference', '👎 Need more info'],
          votes: 428
        },
        rewards: {
          points: 1450,
          nextReward: '50 points away from a $25 Amazon Gift Voucher!'
        },
        recentParticipation: [
          'Annual HR Review',
          'IT Tools Satisfaction'
        ]
      })
    } catch (err) {
      setError('Failed to load surveys data')
      console.error('Surveys fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleStartSurvey = (surveyId) => {
    console.log('Starting survey:', surveyId)
    // In a real app, this would navigate to the survey
    alert(`Starting survey: ${surveysData.surveys.find(s => s.id === surveyId)?.title}`)
  }

  const handlePollVote = (optionIndex) => {
    setSelectedPollOption(optionIndex)
    console.log('Voted for option:', optionIndex)
    // In a real app, this would submit the vote
    alert('Vote submitted!')
  }

  const handleRedeemRewards = () => {
    console.log('Redeeming rewards')
    // In a real app, this would open the rewards redemption modal
    alert('Rewards redemption feature coming soon!')
  }

  if (loading) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Surveys & Insights</h1>
          <p className="text-sm text-slate-400 font-medium">Your voice shapes our culture. Share your feedback anonymously.</p>
        </div>
        <Loading message="Loading surveys..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Surveys & Insights</h1>
          <p className="text-sm text-slate-400 font-medium">Your voice shapes our culture. Share your feedback anonymously.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Surveys</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchSurveysData}
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
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800">Surveys & Insights</h1>
        <p className="text-sm text-slate-400 font-medium">Your voice shapes our culture. Share your feedback anonymously.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {surveysData.surveys.map((survey) => (
            <div key={survey.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${survey.bgColor} ${survey.iconColor} rounded-2xl flex items-center justify-center text-xl`}>
                    <i className={`fa-solid ${survey.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800">{survey.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated time: {survey.time}</p>
                  </div>
                </div>
                <span className="reward-badge">+{survey.reward} Points</span>
              </div>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">{survey.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Expires: {survey.expires}</div>
                  {survey.isAnonymous && (
                    <div className="text-[10px] font-black text-emerald-500 uppercase">Anonymous</div>
                  )}
                </div>
                <button
                  onClick={() => handleStartSurvey(survey.id)}
                  className={`px-8 py-3 rounded-xl text-xs font-black transition-colors ${
                    survey.isActive
                      ? 'bg-[#04228c] text-white hover:bg-[#031a6b]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Start Survey
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Quick Poll</h4>
            <p className="text-sm font-bold text-slate-800 mb-6">{surveysData.quickPoll.question}</p>
            <div className="space-y-3">
              {surveysData.quickPoll.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handlePollVote(index)}
                  className={`poll-option ${selectedPollOption === index ? 'border-blue-400 bg-blue-50' : ''}`}
                >
                  {option}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-6 text-center">{surveysData.quickPoll.votes} employees have voted</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-[2.5rem] text-white">
            <h4 className="text-[10px] font-black uppercase opacity-80 mb-2">Engagement Rewards</h4>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-black">{surveysData.rewards.points.toLocaleString()}</span>
              <span className="text-sm font-bold opacity-80 mb-1">Points</span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed mb-6">{surveysData.rewards.nextReward}</p>
            <button
              onClick={handleRedeemRewards}
              className="w-full py-3 bg-white text-orange-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-orange-50 transition-colors"
            >
              Redeem Rewards
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Recent Participation</h4>
            <div className="space-y-4">
              {surveysData.recentParticipation.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-500"></i>
                  <span className="text-xs font-bold text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
