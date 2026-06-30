import { useEffect, useState } from 'react'
import back from '../assets/back.png'
import { getTimerLeaderboard } from '../lib/timerLogic'

export default function TimerLeaderboard({ onBack }) {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [hasMorePlayers, setHasMorePlayers] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, hasMore, error } = await getTimerLeaderboard()
      if (!error) {
        setLeaderboardData(data)
        setHasMorePlayers(hasMore)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="page-base">
      {/* Main container */}
      <div className="main-card max-w-6xl">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          {/* Title */}
          <h1 className="title-huge">Scoreboard.</h1>
          {/* Back button */}
          <button type="button" onClick={onBack} className="bg-transparent border-0">
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>

        {/* Table */}
        <div className="mt-10 flex-1">
          {/* Headers */}
          <div className="grid grid-cols-[120px_1fr_120px] items-center table-headers mb-6">
            <div>Rankings</div>
            <div>User</div>
            <div className="text-right">Score</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-5">
            {leaderboardData.map((entry) => (
              <div key={entry.rank} className="grid grid-cols-[120px_1fr_120px] items-center text-2xl font-serif row-hover">
                {/* Rank + triangle */}
                <div className="flex items-center gap-4">
                  {entry.selected && (
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-[#b55334]"/>
                  )}
                  <span>{entry.rank}</span>
                </div>

                {/* User */}
                <div>{entry.user}</div>
                {/* Score */}
                <div className="text-right">{entry.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
