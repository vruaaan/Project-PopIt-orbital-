import back from '../assets/back.png'
import hourglass from '../assets/hourglass.png'
import leaderboard from '../assets/leaderboard.png'
import can from '../assets/plain can.webp'

export default function TimerPage({ onBack, onLeaderboard }) {
  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="text-left">
            <h1 className="title-huge">Every Second Counts.</h1>
            <p className="mt-2 text-sm text-left text-[var(--text)]/80">
              Pop as many chips as you can before the timer runs out.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="bg-transparent border-0 transition-transform hover:scale-105"
              aria-label="Go back">
              <img src={back} alt="back" className="back-img" />
            </button>

            <button
              type="button"
              onClick={onLeaderboard}
              className="bg-transparent border-0 transition-transform hover:scale-105"
              aria-label="Go leaderboard">
              <img src={leaderboard} alt="leaderboard" className="back-img" />
            </button>
          </div>

        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 py-12">
          <img src={can} alt="" className="w-24 h-auto" />

          <div className="text-center">
            <p className="font-serif text-7xl leading-none text-[var(--text-h)]">00:30</p>
            <p className="mt-3 font-serif text-3xl text-[var(--text)]">Score: 0</p>
          </div>

          <button type="button" className="btn-upgrade min-w-40 justify-center">
            Start
          </button>
        </div>
      </div>
    </div>
  )
}
