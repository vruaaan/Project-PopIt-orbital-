import can from '../assets/plain can.webp'
import threechips from '../assets/threechips.webp'

export default function ChallengePage({
    counter,
    timeLeft,
    timerStarted,
    isPopping,
    onCanClick,
}) {
    return (
        <div className="relative flex min-h-[24rem] w-full items-center justify-center">
            <div className="challenge-badge">
                <img src={threechips} alt="3 chips stacked" className="w-12 h-auto" />
            </div>
            <p className="challenge-counter">
                {counter}
            </p>

            <button
                type="button"
                onClick={onCanClick}
                disabled={timeLeft === 0}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border-0 bg-transparent p-0 focus:outline-none"
            >
                <span className="block shrink-0 w-30">
                    <img
                        src={can}
                        alt="PopIt Can"
                        className={`block w-full h-auto origin-center hover:scale-105 transition-transform ${isPopping ? 'pop-can-active' : ''}`}
                    />
                </span>
            </button>
        </div>
    )
}
