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

export default function LeaderboardPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#e7dfd2] px-6 py-6 text-[#b55334]">
      {/* Main container */}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col rounded-[2rem] border border-[#d8c7b0] bg-[rgba(238,230,216,0.72)] p-10 shadow-lg">
        {/* Top bar */}
        <div className="flex items-start justify-between">

          {/* Title */}
          <h1 className="
              text-6xl
              font-serif
              drop-shadow-[0_3px_2px_rgba(0,0,0,0.2)]
            "
          >
            Leaderboard.
          </h1>

          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className="bg-transparent border-0"
          >
            <img
              src={back}
              alt="back"
              className="w-20 hover:scale-105 transition-transform"
            />
          </button>
        </div>

        {/* Table */}
        <div className="mt-10 flex-1">

          {/* Headers */}
          <div
            className="
              grid
              grid-cols-[120px_1fr_1fr_120px]
              items-center
              text-3xl
              font-serif
              mb-6
            "
          >
            <div>Rankings</div>
            <div>User</div>
            <div>Cosmetics unlocked</div>
            <div className="text-right">Score</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-5">

            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className="
                  grid
                  grid-cols-[120px_1fr_1fr_120px]
                  items-center
                  text-2xl
                  font-serif
                "
              >

                {/* Rank + triangle */}
                <div className="flex items-center gap-4">

                  {entry.selected && (
                    <div
                      className="
                        w-0
                        h-0
                        border-t-[12px]
                        border-t-transparent
                        border-b-[12px]
                        border-b-transparent
                        border-l-[20px]
                        border-l-[#b55334]
                      "
                    />
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
          <button
            className="
              rounded-full
              bg-[#b55334]
              px-14
              py-3
              text-white
              text-xl
              font-serif
              hover:scale-105
              transition-transform
            "
          >
            load more
          </button>
        </div>
      </div>
    </div>
  )
}