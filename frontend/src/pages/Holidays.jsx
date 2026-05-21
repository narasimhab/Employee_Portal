import React, { useState, useEffect, useMemo } from 'react'
import api from '../services/api'
import Loading from '../components/Loading'

export default function Holidays() {
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState('All Locations')

  useEffect(() => {
    fetchHolidays()
  }, [])

  const fetchHolidays = async () => {
    try {
      setLoading(true)
      setError(null)
      // Assuming there's an API endpoint for holidays
      const response = await api.get('/holidays')
      setHolidays(response.data || [])
    } catch (err) {
      // If API doesn't exist, use static data
      setHolidays([
        {
          id: 1,
          name: 'Veterans Day',
          date: '2026-11-11',
          day: 'Wednesday',
          type: 'Mandatory',
          scope: 'Global',
          location: 'All Locations'
        },
        {
          id: 2,
          name: 'Thanksgiving Day',
          date: '2026-11-26',
          day: 'Thursday',
          type: 'Mandatory',
          scope: 'US Region',
          location: 'United States'
        },
        {
          id: 3,
          name: 'Christmas Day',
          date: '2026-12-25',
          day: 'Friday',
          type: 'Mandatory',
          scope: 'Global',
          location: 'All Locations'
        },
        {
          id: 4,
          name: 'New Year\'s Day',
          date: '2027-01-01',
          day: 'Friday',
          type: 'Mandatory',
          scope: 'Global',
          location: 'All Locations'
        },
        {
          id: 5,
          name: 'Sankranthi (Pongal)',
          date: '2026-01-14',
          day: 'Wednesday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 6,
          name: 'Republic Day',
          date: '2026-01-26',
          day: 'Monday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 7,
          name: 'Ugadi / Gudi Padwa',
          date: '2026-03-19',
          day: 'Thursday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 8,
          name: 'May Day',
          date: '2026-05-01',
          day: 'Friday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 9,
          name: 'Ganesh Chaturthi',
          date: '2026-09-14',
          day: 'Monday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 10,
          name: 'Gandhi Jayanti',
          date: '2026-10-02',
          day: 'Friday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 11,
          name: 'Dussehra / Vijaya Dashami',
          date: '2026-10-20',
          day: 'Tuesday',
          type: 'Mandatory',
          scope: 'India',
          location: 'India'
        },
        {
          id: 12,
          name: 'Holi',
          date: '2026-03-03',
          day: 'Tuesday',
          type: 'Optional',
          scope: 'India',
          location: 'India'
        },
        {
          id: 13,
          name: 'Ramzan / Eid-ul-Fitr',
          date: '2026-03-20',
          day: 'Friday',
          type: 'Optional',
          scope: 'India',
          location: 'India'
        },
        {
          id: 14,
          name: 'Ram Navami',
          date: '2026-03-26',
          day: 'Thursday',
          type: 'Optional',
          scope: 'India',
          location: 'India'
        },
        {
          id: 15,
          name: 'Good Friday',
          date: '2026-04-03',
          day: 'Friday',
          type: 'Optional',
          scope: 'India',
          location: 'India'
        },
        {
          id: 16,
          name: 'Eid-ul-Adha / Bakrid',
          date: '2026-05-27',
          day: 'Wednesday',
          type: 'Optional',
          scope: 'India',
          location: 'India'
        },
        {
          id: 17,
          name: 'Independence Day',
          date: '2026-08-15',
          day: 'Saturday',
          type: 'Weekend Holiday',
          scope: 'India',
          location: 'India'
        },
        {
          id: 18,
          name: 'Diwali / Deepavali',
          date: '2026-11-08',
          day: 'Sunday',
          type: 'Weekend Holiday',
          scope: 'India',
          location: 'India'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredHolidays = useMemo(() => {
    if (selectedLocation === 'All Locations') return holidays
    return holidays.filter(holiday => holiday.location === selectedLocation)
  }, [holidays, selectedLocation])

  const upcomingHoliday = {
    name: 'Winter Festive Break',
    daysUntil: 42,
    startDate: 'Dec 24, 2026',
    daysOff: 4,
    year: 2026
  }

  if (loading) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Holidays</h1>
        <Loading message="Loading holidays..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="fade-in">
        <h1 className="text-3xl font-black mb-8">Holidays</h1>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">Error Loading Holidays</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchHolidays}
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
      <div className="bg-gradient-to-br from-indigo-900 to-blue-700 rounded-[3rem] p-10 text-white mb-10 flex flex-col md:flex-row justify-between items-center shadow-2xl">
        <div className="mb-6 md:mb-0">
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 mb-4 inline-block">
            Upcoming Break
          </span>
          <h1 className="text-4xl font-black mb-2">{upcomingHoliday.name}</h1>
          <p className="text-blue-100 font-medium">
            Starts in <span className="text-white font-black">{upcomingHoliday.daysUntil} days</span> • {upcomingHoliday.startDate}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] text-center border border-white/10 min-w-[120px]">
            <p className="text-3xl font-black">{upcomingHoliday.daysOff.toString().padStart(2, '0')}</p>
            <p className="text-[10px] font-bold uppercase opacity-60">Days Off</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] text-center border border-white/10 min-w-[120px]">
            <p className="text-3xl font-black">{upcomingHoliday.year}</p>
            <p className="text-[10px] font-bold uppercase opacity-60">Calendar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800">Remaining Holidays</h2>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white border-none rounded-xl text-xs font-bold px-4 py-2 shadow-sm outline-none"
            >
              <option>All Locations</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>India</option>
            </select>
          </div>

          <div className="bg-white rounded-[2rem] p-4 space-y-2 shadow-sm border border-slate-100">
            {filteredHolidays.map((holiday) => {
              const date = new Date(holiday.date)
              const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
              const day = date.getDate()
              const isUpcoming = date > new Date()

              return (
                <div key={holiday.id} className="flex items-center justify-between p-4 rounded-[1.25rem] hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl font-black text-xs ${isUpcoming ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                      <span className="text-[9px] opacity-70 uppercase">{month}</span>
                      <span className="text-lg">{day}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800">{holiday.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{holiday.day} • {holiday.type}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase ${
                    holiday.scope === 'Global' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {holiday.scope}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Holiday Types</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">Mandatory</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">Optional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-600">Floating</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-200">
            <i className="fa-solid fa-calendar-days text-2xl mb-4 opacity-50"></i>
            <h4 className="text-sm font-black mb-2">Holiday Calendar</h4>
            <p className="text-[10px] text-blue-100 font-medium leading-relaxed mb-4">
              Regional holidays are determined by your primary office location. Floating holidays can be requested via the Leaves page.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase hover:bg-blue-50 transition-colors">
              View Full Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* 
India  
List of Holidays: 2026
S. No Date Day Occasion
1 01 Jan 2026 Thursday New Year’s Day
2 14 Jan 2026 Wednesday Sankranthi (Pongal)

Makar Sankranti/ Magha Bihu/ Pongal

3 26 Jan 2026 Monday Republic Day
4 19 Mar 2026 Thursday Ugadi/Gudi Padwa
5 01 May 2026 Friday May Day
6 14 Sep 2026 Monday Ganesh Chaturthi
7 02 Oct 2026 Friday Gandhi Jayanti
8 20 Oct 2026 Tuesday Dussehra / Vijaya Dashami
9 25 Dec 2026 Friday Christmas Day

Optional Holidays
(avail any 3 only)

03 Mar 2026 Tuesday Holi
20 Mar 2026 Friday Ramzan/Eid-ul-Fitr
26 Mar 2026 Thursday Ram Navami
03 Apr 2026 Friday Good Friday
27 May 2026 Wednesday Eid-ul-Adha / Bakrid

Weekend Holidays

15 Aug 2026 Saturday Independence Day
08 Nov 2026 Sunday Diwali / Deepavali 
*/