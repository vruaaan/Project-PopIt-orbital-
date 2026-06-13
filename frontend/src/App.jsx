import './App.css'
import { useEffect, useRef, useState } from 'react'
import threechips from './assets/threechips.png'
import chip1 from './assets/chip1.png'
import shop from './assets/shop.png'
import loginIcon from './assets/Login.png'
import leaderboard from './assets/leaderboard.png'
import can from './assets/plain can.png'
import ShopPage from './shoppages/ShopPage'
import LeaderboardPage from './userpages/LeaderboardPage'
import LoginPage from './userpages/LoginPage'
import CreateAccountPage from './userpages/CreateAccountPage'
import ResetPasswordPage from './userpages/ResetPasswordPage'

import { getCurrentUser, resetPassword, signInWithEmail, signOutUser, signUpWithEmail } from './lib/firebase'
import { updateChips, updateClickPower, updateAutoPopper, updateSeal, updateCow, updateDol } from './lib/gameplayLogic'
import { createChipParticles, updateParticles } from './physics/physics'


export default function App() {
  const [count, setCount] = useState(0)
  const [cumCount, setCumCount] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [page, setPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState(null)
  const [profile, setProfile] = useState(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [clickLevels, setClickLevels] = useState({ 1: 0, 2: 0, 3: 0 })
  const [cosmeticOwned, setCosmeticOwned] = useState({ 1: false, 2: false })
  const [animalLevels, setAnimalLevels] = useState({
    1: { chanceLvl: 0, multLvl: 0, owned: false },
    2: { chanceLvl: 0, multLvl: 0, owned: false },
    3: { chanceLvl: 0, multLvl: 0, owned: false }
  })
  const [particles, setParticles] = useState([])
  const [isPopping, setIsPopping] = useState(false)
  const overlayRef = useRef(null)
  const canRef = useRef(null)
  const popTimeoutRef = useRef(null)

  useEffect(() => {
    const loadSession = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        setSessionLoaded(true)
        return
      }
      setIsLoggedIn(true)
      setUserEmail(currentUser.email)
      const { data: profile, error: profileError } = await loadProfile(currentUser.email)
      if (!profileError && profile) {
        setProfile(profile)
        setCount(profile.curr_count ?? 0)
        setCumCount(profile.cum_count ?? 0)
        setClickPower(profile.click_pow ?? 1)
      }
      setSessionLoaded(true)
    }
    loadSession()
  }, [])

  const handleLogin = async (email, password) => {
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
    if (!profileError && profile) { // loading user data
      setProfile(profile)
      setCount(profile.curr_count ?? 0)
      setCumCount(profile.cum_count ?? 0)
      setClickPower(profile.click_power ?? 1)
      setAutoClicker(profile.auto_popper ?? 0)
      setAnimalLevels({ 
        1: {owned: profile.seal_prob > 0, chanceLvl: profile.seal_prob ?? 0, multLvl: profile.seal_cp ?? 0 },
        2: {owned: profile.cow_prob > 0, chanceLvl: profile.cow_prob ?? 0, multLvl: profile.cow_cp ?? 0 },
        3: {owned: profile.dol_prob > 0, chanceLvl: profile.dol_prob ?? 0, multLvl: profile.dol_cp ?? 0 }
      })
    }
    setPage('leaderboard')
    return { success: true }
  }

  const handleCreateAccount = async (username, email, password) => {
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
    const { error: profileError } = await createProfile(user.email, username.trim(), user.uid)
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

  const handleResetPassword = async (email) => {
    const { error } = await resetPassword(email)
    if (error) {
      return { success: false, message: error.message || 'Failed to send reset email.' }
    }
    return { success: true }
  }

  const handleLogout = async () => {
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
    setCount(newCount)
    if (userEmail) updateChips(userEmail, newCount, cumCount)
  }

  const handleSetClickPower = (updater) => {
    setClickPower((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateClickPower(userEmail, next)
      return next
    })
  }
  
  const handleSetAutoClicker = (updater) => {
    setClickLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateAutoPopper(userEmail, next[1] ?? 0)
      return next
    })
  }

  const handleSetAnimalLevels = (updater) => {
    setAnimalLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) {
        updateSeal(userEmail, next[1].chanceLvl, next[1].multLvl)
        updateCow(userEmail, next[2].chanceLvl, next[2].multLvl)
        updateDol(userEmail, next[3].chanceLvl, next[3].multLvl)
      }
      return next
    })
  }

  // NAVIGATION
  if (page === 'shop') {
      return (
        <ShopPage
          onBack={() => setPage('home')}
          count={count}
          setCount={handleSpendChips}
          clickPower={clickPower}
          setClickPower={handleSetClickPower}
          clickLevels={clickLevels} 
          setClickLevels={setClickLevels} 
          animalLevels={animalLevels}
          setAnimalLevels={setAnimalLevels}
          cosmeticOwned={cosmeticOwned} 
          setCosmeticOwned={setCosmeticOwned}
          profile = {profile}
        />
      )
  }
  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} onLogin={handleLogin} onToCreateAccount={() => setPage('createAccount')} onToResetPassword={() => setPage('resetPassword')} />
  }
  if (page === 'resetPassword') {
    return <ResetPasswordPage onBack={() => setPage('login')} onResetPassword={handleResetPassword} />
  }
  if (page === 'createAccount') {
    return <CreateAccountPage onBack={() => setPage('login')} onCreateAccount={handleCreateAccount} />
  }
  if (page === 'leaderboard') {
    return <LeaderboardPage onBack={() => setPage('home')} onLogout={handleLogout} />
  }

  return (
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