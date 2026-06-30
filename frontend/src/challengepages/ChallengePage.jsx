import { useState } from 'react'
import can from '../assets/plain can.webp'

export default function ChallengePage() {
  const [counter, setCounter] = useState(0)
  const [isPopping, setIsPopping] = useState(false)

  const handleCanClick = () => {
    setCounter((prev) => prev + 1)
    setIsPopping(true)
    window.setTimeout(() => setIsPopping(false), 120)
  }

  return (
    <div className="flex min-h-[32rem] flex-col items-center justify-center gap-8 py-12">
      <div className="text-center">
        <p className="font-serif text-7xl leading-none text-[var(--text-h)]">{counter}</p>
        <p className="mt-3 font-serif text-3xl text-[var(--text)]">Score</p>
      </div>

      <button
        type="button"
        onClick={handleCanClick}
        className="p-0 bg-transparent border-0 focus:outline-none rounded-full"
      >
        <span className="block shrink-0 w-44">
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
