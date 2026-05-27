import back from './assets/back.png'
const leaderboardData = [
  {rank: '01', user: 'seapanda47', cosmetics: 15, score: 305},
  {rank: '02', user: 'FakeSlimShady1', cosmetics: 10, score: 259},
  {rank: '03', user: 'sphericow', cosmetics: 5, score: 214},
  {rank: '04', user: 'ethanwje', cosmetics: 3, score: 200},
  {rank: '05', user: '-', cosmetics: '-', score: '-'},
  {rank: '06', user: '-', cosmetics: '-', score: '-'},
  {rank: '07', user: '-', cosmetics: '-', score: '-'},
  {rank: '08', user: '-', cosmetics: '-', score: '-'},
  {rank: '09', user: '-', cosmetics: '-', score: '-'},
  {rank: '10', user: '-', cosmetics: '-', score: '-',}]

export default function LeaderboardPage({ onBack, onLogout }) {
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
            <div className="text-right">Score</div>
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