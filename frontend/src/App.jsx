import './App.css'
import { useEffect, useRef, useState } from 'react'
import threechips from './assets/threechips.png'
import chip1 from './assets/chip1.png'
import shop from './assets/shop.png'
import loginIcon from './assets/Login.png'
import leaderboard from './assets/leaderboard.png'
import can from './assets/plain can.png'
import ShopPage from './ShopPage'
import LeaderboardPage from './LeaderboardPage'
import LoginPage from './LoginPage'
import CreateAccountPage from './CreateAccountPage'

import { getCurrentUser, signInWithEmail, signOutUser, signUpWithEmail } from './lib/firebase'
import { createProfile, loadProfile} from './lib/playerService'
import { updateChips, updateClickPower } from './lib/gameplayLogic'
import { createChipParticles, updateParticles } from './physics/physics'


export default function App() {
  const [count, setCount] = useState(0)        // curr_count
  const [cumCount, setCumCount] = useState(0)  // cum_count
  const [clickPower, setClickPower] = useState(1)
  const [page, setPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState(null)
  const [animalLevels, setAnimalLevels] = useState(
  { 1: { chanceLvl: 0, multLvl: 0, owned: false },
    2: { chanceLvl: 0, multLvl: 0, owned: false } }
);
  const [particles, setParticles] = useState([])
  const [isPopping, setIsPopping] = useState(false)
  const overlayRef = useRef(null)
  const canRef = useRef(null)
  const popTimeoutRef = useRef(null)

 useEffect(() => {
  const loadSession = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      setSessionLoaded(true) //no user, but still done loading
      return
    }
    setIsLoggedIn(true)
    setUserEmail(currentUser.email)
    const { data: profile, error: profileError } = await loadProfile(currentUser.email)
    if (!profileError && profile) {
      setCount(profile.curr_count ?? 0)
      setCumCount(profile.cum_count ?? 0)
      setClickPower(profile.click_pow ?? 1)
    }
    setSessionLoaded(true) //done loading, safe to write
  }
  loadSession()
}, [])

  const handleLogin = async (email, password) => { // handle logging in 
    const { user, error } = await signInWithEmail(email, password)
    if (error) {
      return { success: false, message: error.message || 'Invalid email or password.' }
    }
    if (!user) {
      return { success: false, message: 'Unable to create an active session.' }
    }
    setIsLoggedIn(true)
    setUserEmail(user.email)
    const { data: profile, error: profileError } = await loadProfile(user.email)
    if (!profileError && profile) {
      setCount(profile.curr_count ?? 0)
      setCumCount(profile.cum_count ?? 0)
      setClickPower(profile.click_power ?? 1)
    }
    setPage('leaderboard') // login page becomes leaderboard after logging in
    return { success: true }
  }

  const handleCreateAccount = async (username, email, password) => { // handle creating account 
    if (!username.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: 'Enter a username, email, and password to create an account.' }
    }
    const { user, error } = await signUpWithEmail(username, email, password)
    if (error) {
      return { success: false, message: error.message || 'Failed to create account.' }
    }
    if (!user) {
      return { success: false, message: 'Account created, but user session was not initialized.' }
    }
    const { error: profileError } = await createProfile(user.email, username.trim(), user.uid) // Create the Firestore document, keyed by email
    if (profileError) {
      console.error('Failed to create Firestore profile:', profileError)
    }
    setIsLoggedIn(true)
    setUserEmail(user.email)
    setCount(0)
    setClickPower(1)
    setPage('leaderboard')
    return { success: true }
  }

  const handleLogout = async () => { // handle what happens when user logs out
    await signOutUser()
    setIsLoggedIn(false)
    setUserEmail(null)
    setPage('home')
  }

const handleSetCount = (isEarning = false) => {
  const earned = clickPower
  const nextCount = count + earned
  const nextCum = isEarning ? cumCount + earned : cumCount
  setCount(nextCount)
  if (isEarning) setCumCount(nextCum)
  if (userEmail) updateChips(userEmail, nextCount, nextCum)
}

useEffect(() => {
  let rafId
  let lastTime = performance.now()

  const tick = (now) => {
    const dt = Math.min((now - lastTime) / 1000, 0.03)
    lastTime = now
    setParticles((prev) => updateParticles(prev, dt))
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
  return () => {
    cancelAnimationFrame(rafId)
    clearTimeout(popTimeoutRef.current)
  }
}, [])

const spawnChipParticles = () => {
  if (!overlayRef.current || !canRef.current) return

  const overlayRect = overlayRef.current.getBoundingClientRect()
  const canRect = canRef.current.getBoundingClientRect()
  const originX = canRect.left - overlayRect.left + canRect.width / 2
  const originY = canRect.top - overlayRect.top + canRect.height * 0.12

  setParticles((prev) => [...prev, ...createChipParticles(originX, originY, 1)])
  setIsPopping(true)
  clearTimeout(popTimeoutRef.current)
  popTimeoutRef.current = window.setTimeout(() => setIsPopping(false), 120)
}

const handlePop = () => {
  spawnChipParticles()
  handleSetCount(true)
}

const handleSpendChips = (newCount) => {
  setCount(newCount);
  if (userEmail) updateChips(userEmail, newCount, cumCount);
}

  const handleSetClickPower = (updater) => { // handle setting 
    setClickPower((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateClickPower(userEmail, next)
      return next
    })
  }

  if (page === 'shop') {
    return (
      <ShopPage
        onBack={() => setPage('home')}
        count={count}
        setCount={handleSpendChips}
        clickPower={clickPower}
        setClickPower={handleSetClickPower}
        setAnimalLevels={setAnimalLevels}
        animalLevels={animalLevels}
      />
    )
  }
  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} onLogin={handleLogin} onToCreateAccount={() => setPage('createAccount')} />
  }
  if (page === 'createAccount') {
    return <CreateAccountPage onBack={() => setPage('login')} onCreateAccount={handleCreateAccount} />
  }
  if (page === 'leaderboard') {
    return <LeaderboardPage onBack={() => setPage('home')} onLogout={handleLogout} />
  }

  return ( // constructing page
    <div className="min-h-screen px-6 py-6 text-[var(--text)] relative">
      <div ref={overlayRef} className="particle-overlay">
        {particles.map((particle) => (
          <img
            key={particle.id}
            src={chip1}
            alt=""
            className="chip-particle"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: 1 - particle.life / particle.duration,
              transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${1.05 - particle.life / particle.duration * 0.3})`,
            }}
          />
        ))}
      </div>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 rounded-[2rem] border border-[var(--border)] bg-[rgba(238,230,216,0.72)] p-8 shadow-[var(--shadow)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div />
        </div>
        <div className="flex flex-1 items-end justify-center pb-0 relative">
          <div className="fixed left-21 top-4">
            <div className="counter-badge">{count}</div>
          </div>

          <div className="fixed left-4 top-4">
            <img src={threechips} alt="3 chips stacked" className="w-16 h-auto" />
          </div>

          <button
            type="button"
            onClick={handlePop}
            ref={canRef}
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full fixed bottom-0 left-1/2 -translate-x-1/2">
            <span className="block w-44 shrink-0">
              <img
                src={can}
                alt="PopIt Can"
                className={`block w-full h-110 origin-center hover:scale-105 transition-transform ${isPopping ? 'pop-can-active' : ''}`}
              />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPage('shop')}
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-4 top-4">
              <img src={shop} alt="shop icon" className="block w-20 h-auto origin-center hover:scale-105 transition-transform" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => (isLoggedIn ? setPage('leaderboard') : setPage('login'))}
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-3 top-26">
              <img
                src={isLoggedIn ? leaderboard : loginIcon}
                alt={isLoggedIn ? 'leaderboard icon' : 'login icon'}
                className="block w-20 h-auto origin-center hover:scale-105 transition-transform"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}