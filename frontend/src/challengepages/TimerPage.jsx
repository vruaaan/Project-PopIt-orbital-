import { useState } from 'react'
import back from '../assets/back.png'
import hourglass from '../assets/hourglass.png'
import leaderboard from '../assets/leaderboard.png'
import ChallengePage from './ChallengePage'
import ScoreboardPage from './ScoreboardPage'

export default function TimerPage({ onBack }) {
  const [activeView, setActiveView] = useState('Challenge')
  const isScoreboard = activeView === 'Scoreboard'

  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">
        <div className="flex items-start justify-between w-full">
          <h1 className="title-huge">Every Second Counts.</h1>

          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-transparent border-0 transition-transform hover:scale-105"
              aria-label="Go back">
              <img src={back} alt="back" className="back-img" />
            </button>

            <button
              type="button"
              onClick={() => setActiveView(isScoreboard ? 'Challenge' : 'Scoreboard')}
              className="relative left-3 bg-transparent border-0 transition-transform hover:scale-105"
              aria-label={isScoreboard ? 'Go challenge' : 'Go scoreboard'}>
              <img
                src={isScoreboard ? hourglass : leaderboard}
                alt={isScoreboard ? 'challenge' : 'scoreboard'}
                className={isScoreboard ? 'w-16 h-auto' : 'w-20 h-auto'}
              />
            </button>
          </div>
        </div>

        <div className="flex-1 mt-8 overflow-x-auto">
          {activeView === 'Challenge' && (
            <ChallengePage />
          )}

          {activeView === 'Scoreboard' && (
            <ScoreboardPage />
          )}
        </div>
      </div>
    </div>
  )
}
