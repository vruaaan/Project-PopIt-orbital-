import './App.css'
import { useState } from 'react'
import threechips from './assets/threechips.png'
import shop from './assets/shop.png'
import leaderboard from './assets/leaderboard.png'
import can from './assets/plain can.png'
import ShopPage from './ShopPage'
import LeaderboardPage from './LeaderboardPage'


export default function App() { // defines and exports a react component (reusable UI block)
  const [count, setCount] = useState(0)
  const [clickPower, setClickPower] = useState(1) 
  const [page, setPage] = useState('home')
  if (page === 'shop') {
    return <ShopPage 
    onBack={() => setPage('home')}
    count = {count}
    setCount = {setCount}
    clickPower = {clickPower}
    setClickPower = {setClickPower} />
  }
  if (page === 'leaderboard') {
    return <LeaderboardPage onBack={() => setPage('home')} />
  }

  return (
    <div className="min-h-screen px-6 py-6 text-[var(--text)]">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 rounded-[2rem] border border-[var(--border)] bg-[rgba(238,230,216,0.72)] p-8 shadow-[var(--shadow)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div />
        </div>
        <div className="flex flex-1 items-end justify-center pb-0 relative">
          <div className="fixed left-21 top-4"> {/*positions the counter on the top left */}
              <div className="counter-badge">{count}</div>
          </div>
          
          <div className="fixed left-4 top-4"> {/* stacked chips icon*/} 
            <img src={threechips} alt="3 chips stacked" className="w-16 h-auto"/>
          </div>

          <button
            type="button"
            onClick={() => setCount(c => c + clickPower)} // include game logic of popping animation later on
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full fixed bottom-0 left-1/2 -translate-x-1/2">
            <span className="block w-44 shrink-0">
              <img src={can} alt="PopIt Can" className="block w-full h-110 origin-center hover:scale-105 transition-transform"/>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPage('shop')} // open the shop page
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-4 top-4">
              <img src={shop} alt="shop icon" className="block w-20 h-auto  origin-center hover:scale-105 transition-transform"/>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPage('leaderboard')} // open the leaderboard page
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-3 top-26">
              <img src={leaderboard} alt="leaderboard icon" className="block w-20 h-auto  origin-center hover:scale-105 transition-transform"/>
            </span>
          </button>

          
        </div>
      </div>
    </div>
  )
}


