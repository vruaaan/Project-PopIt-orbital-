import { useState, useEffect } from 'react'
import back from '../assets/back.png'
import {getLeaderboardDefault} from '../lib/leaderboardLogic'


export default function LeaderboardPage({ onBack, onLogout }) {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [hasMorePlayers, setHasMorePlayers] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetch = async () => {
      const { data, hasMore, error } = await getLeaderboardDefault()
      if (!error) {
        setLeaderboardData(data)
        setHasMorePlayers(hasMore)
      }
      setLoading(false)
    }
    fetch()
  }, []) // empty array meaning this runs once when the component mounts
  if (loading) return <p>Loading...</p>
  return (
    <div className="page-base">
      {/* Main container */}
      <div className="main-card max-w-6xl">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          {/* Title */}
          <h1 className="title-huge">Leaderboard.</h1>
          <div className="flex items-center gap-3">
            {onLogout ? (
              <button type="button" onClick={onLogout} className="btn-upgrade px-6 py-3 text-lg">
                log out
              </button>
            ) : null}
            {/* Back button */}
            <button type="button" onClick={onBack} className="bg-transparent border-0">
              <img src={back} alt="back" className="back-img" />
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="mt-10 flex-1">
          {/* Headers */}
          <div className="grid grid-cols-[120px_1fr_1fr_120px] items-center table-headers mb-6">
            <div>Rankings</div>
            <div>User</div>
            <div>Cosmetics unlocked</div>
            <div className="text-right">Popped!</div>
          </div>
          {/* Rows */}
          <div className="flex flex-col gap-5">
            {leaderboardData.map((entry) => (
              <div key={entry.rank} className="grid grid-cols-[120px_1fr_1fr_120px] items-center text-2xl font-serif row-hover">
                {/* Rank + triangle */}
                <div className="flex items-center gap-4">
                  {entry.selected && (
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-[#b55334]"/>
                    )}
                    <span>{entry.rank}</span>
                </div>
                {/* User */}
                <div>{entry.user}</div>
                {/* Cosmetics */}
                <div>{entry.cosmetics}</div>
                {/* Score */}
                <div className="text-right">{entry.Chips}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Load More Button */}
        {hasMorePlayers && (
          <div className="flex justify-center mt-12">
            <button className="btn-upgrade px-14 py-3 text-xl">load more</button>
          </div>
        )}
      </div>
    </div>
  )
}
