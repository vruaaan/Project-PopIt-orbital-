import { useEffect, useState } from 'react'
import { getScoreboard } from '../lib/scoreboardLogic'

export default function ScoreboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getScoreboard()
      if (!error) {
        setLeaderboardData(data)
      }
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return <p className="mt-10 text-center text-2xl font-serif">Loading...</p>

  return (
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
  )
}
