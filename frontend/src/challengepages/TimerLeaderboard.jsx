import back from '../assets/back.png'

const timerLeaderboardData = [
  { rank: 1, user: 'Player 1', time: '00:30', score: 0 },
  { rank: 2, user: 'Player 2', time: '00:30', score: 0 },
  { rank: 3, user: 'Player 3', time: '00:30', score: 0 },
]

export default function TimerLeaderboard({ onBack }) {
  return (
    <div className="page-base">
      {/* Main container */}
      <div className="main-card max-w-6xl">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          {/* Title */}
          <h1 className="title-huge">Timer Leaderboard.</h1>
          {/* Back button */}
          <button type="button" onClick={onBack} className="bg-transparent border-0">
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>

        {/* Table */}
        <div className="mt-10 flex-1">
          {/* Headers */}
          <div className="grid grid-cols-[120px_1fr_1fr_120px] items-center table-headers mb-6">
            <div>Rankings</div>
            <div>User</div>
            <div>Time</div>
            <div className="text-right">Score</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-5">
            {timerLeaderboardData.map((entry) => (
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
                {/* Time */}
                <div>{entry.time}</div>
                {/* Score */}
                <div className="text-right">{entry.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button className="btn-upgrade px-14 py-3 text-xl">load more</button>
        </div>
      </div>
    </div>
  )
}
