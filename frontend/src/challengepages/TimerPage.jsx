import { useEffect, useRef, useState } from 'react'
import back from '../assets/back.png'
import threechips from '../assets/threechips.png'
import hourglass from '../assets/hourglass.png'
import leaderboard from '../assets/leaderboard.png'
import ChallengePage from './ChallengePage'
import ScoreboardPage from './ScoreboardPage'
import { updateChallengeScore } from '../lib/challengeLogic'

export default function TimerPage({ onBack, sessionLoaded, userEmail, highestScore, setHighestScore }) {
    const [activeView, setActiveView] = useState('Challenge')
    const [challengeCount, setChallengeCount] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [timerStarted, setTimerStarted] = useState(false)
    const [isPopping, setIsPopping] = useState(false)
    const timerRef = useRef(null)
    const scoreSavedRef = useRef(false)
    const isScoreboard = activeView === 'Scoreboard'

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current)
            }
        }
    }, [])

    const startTimer = () => {
        if (timerStarted) return

        setTimerStarted(true)
        setTimeLeft(30)
        scoreSavedRef.current = false

        timerRef.current = window.setInterval(() => {
            setTimeLeft((currentTime) => {
                if (currentTime <= 1) {
                    if (timerRef.current) {
                        window.clearInterval(timerRef.current)
                        timerRef.current = null
                    }
                    return 0
                }

                return currentTime - 1
            })
        }, 1000)
    }

    const resetTimer = () => {
        if (timerRef.current) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
        }

        setTimerStarted(false)
        setTimeLeft(30)
        scoreSavedRef.current = false
    }

    useEffect(() => {
        const saveScore = async () => {
            if (!userEmail || scoreSavedRef.current || !timerStarted || timeLeft !== 0) {
                return
            }

            scoreSavedRef.current = true

            if (challengeCount > highestScore) {
                const { error } = await updateChallengeScore(userEmail, challengeCount)
                if (!error) {
                    setHighestScore(challengeCount)
                }
            }
        }

        saveScore()
    }, [challengeCount, highestScore, setHighestScore, timeLeft, timerStarted, userEmail])

    const handleCanClick = () => {
        if (timeLeft === 0) return

        startTimer()
        setChallengeCount((prev) => prev + 1)
        setIsPopping(true)
        window.setTimeout(() => setIsPopping(false), 120)
    }

    if (!sessionLoaded) {
        return null
    }

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
                        <ChallengePage
                            counter={challengeCount}
                            timeLeft={timeLeft}
                            timerStarted={timerStarted}
                            isPopping={isPopping}
                            onCanClick={handleCanClick}
                        />
                    )}

                    {activeView === 'Scoreboard' && (
                        <ScoreboardPage />
                    )}
                </div>

                <div className="stats-bar flex items-center gap-6">
                    {userEmail && (
                        <div className="flex items-center gap-3">
                            <span className="challenge-highest">Score: {highestScore}</span>
                        </div>
                    )}
                    {activeView === 'Challenge' && (
                        <button
                            type="button"
                            onClick={resetTimer}
                            className="flex items-center gap-3 bg-transparent border-0 p-0 text-left"
                            aria-label="Reset timer"
                        >
                            <img src={hourglass} alt="time left" className="w-8 h-auto" />
                            <span className="text-xl font-serif">
                                {timerStarted ? `${timeLeft}s left` : 'Ready to start'}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
