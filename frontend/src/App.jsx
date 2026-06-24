import './App.css'
import { useEffect, useRef, useState } from 'react'
// png used for static renders
import threechips from './assets/threechips.png'
import loginIcon from './assets/Login.png'
import shop from './assets/shop.png'
import leaderboard from './assets/leaderboard.png'
import gear from './assets/gear.png'

// webP files for repeated renders
import chip1 from './assets/chip1.webp'
import chip2 from './assets/chip2.webp'
import chip3 from './assets/chip3.webp'

// webP files for cans as the images are smaller in scale than png
import plainCan from './assets/plain can.webp' 
import sealCan from './assets/sealcan.webp' 
import cowCan from './assets/cowcan.webp'
import dolphinCan from './assets/dolphincan.webp'

import ShopPage from './shoppages/ShopPage'
import LeaderboardPage from './userpages/LeaderboardPage'
import LoginPage from './userpages/LoginPage'
import CreateAccountPage from './userpages/CreateAccountPage'
import ResetPasswordPage from './userpages/ResetPasswordPage'
import SettingsPage from './SettingsPage'

import { getCurrentUser, resetPassword, signInWithEmail, signOutUser, signUpWithEmail } from './lib/firebase'
import { loadProfile, createProfile } from './lib/playerService'
import { updateChips, updateClickPower, updateAutoPopper, updateSeal, updateCow, updateDol, updateCosmetics } from './lib/gameplayLogic'
import { updateParticles } from './gameengine/physics'
import { getPopResult, createPopParticles } from './gameengine/popLogic'
import { CLICK_POWER_BASE, DEFAULT_ANIMALS_UNLOCKED } from './lib/gameConstants'
import { CLICK_UPGRADE_BALANCE } from './lib/shopConstants'

const DEFAULT_COSMETIC_OWNED = { 1: true, 2: false, 3: false, 4: false } // if user dont log in

function calcClickPower(clickLevels) {
  return CLICK_POWER_BASE +
    (clickLevels[1] ?? 0) * CLICK_UPGRADE_BALANCE[1].powerPerLevel +
    (clickLevels[2] ?? 0) * CLICK_UPGRADE_BALANCE[2].powerPerLevel
}

function getAnimalLevelsFromProfile(profile) {
  const seal = profile.seal ?? {}
  const cow = profile.cow ?? {}
  const dol = profile.dol ?? {}
  return {
    1: {
      owned: seal.owned ?? false,
      chanceLvl: seal.prob ?? 0,
      multLvl: seal.cp ?? 0
    },
    2: {
      owned: cow.owned ?? false,
      chanceLvl: cow.prob ?? 0,
      multLvl: cow.cp ?? 0
    },
    3: {
      owned: dol.owned ?? false,
      chanceLvl: dol.prob ?? 0,
      multLvl: dol.cp ?? 0
    }
  }
}

function getCosmeticOwnedFromProfile(profile) {
  return { ...DEFAULT_COSMETIC_OWNED, ...(profile.cosmetic_owned ?? {}) }
}



export default function App() {
    const [count, setCount] = useState(0) // equal to doing count = 0
    const [cumCount, setCumCount] = useState(0) // equal to doing cumCount = cumCount = 0
    const [page, setPage] = useState('home') // default home page
    const [isLoggedIn, setIsLoggedIn] = useState(false) // default not logged in
    const [userEmail, setUserEmail] = useState(null) // email is null by default
    const [profile, setProfile] = useState(null) // profile is null by default
    const [sessionLoaded, setSessionLoaded] = useState(false) // 
    const [clickLevels, setClickLevels] = useState({ 1: 0, 2: 0, 3: 0 })
    const [cosmeticOwned, setCosmeticOwned] = useState(DEFAULT_COSMETIC_OWNED)
    const [animalLevels, setAnimalLevels] = useState(DEFAULT_ANIMALS_UNLOCKED)
    const [particles, setParticles] = useState([])
    const [isPopping, setIsPopping] = useState(false)
    const clickPower = calcClickPower(clickLevels)
    const overlayRef = useRef(null)
    const canRef = useRef(null)
    const popTimeoutRef = useRef(null)
    const CHIP_IMGS = [chip1, chip2, chip3]

    const CAN_IMAGES = {
        1: plainCan,
        2: sealCan,
        3: cowCan,
        4: dolphinCan,
    }
    const [equippedCosmetic, setEquippedCosmetic] = useState(1)

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
        setClickLevels({ 1: profile.auto_popper ?? 0, 2: profile.click_pow ?? 0 })
        setAnimalLevels(getAnimalLevelsFromProfile(profile))
        setCosmeticOwned(getCosmeticOwnedFromProfile(profile))
        setEquippedCosmetic(profile.equipped_cosmetic ?? 1)
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
      setClickLevels({ 1: profile.auto_popper ?? 0, 2: profile.click_pow ?? 0 })
      setAnimalLevels(getAnimalLevelsFromProfile(profile))
      setCosmeticOwned(getCosmeticOwnedFromProfile(profile))
      setEquippedCosmetic(profile.equipped_cosmetic ?? 1)
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
    setCumCount(0)
    setClickLevels({ 1: 0, 2: 0, 3: 0 })
    setAnimalLevels({
      1: { chanceLvl: 0, multLvl: 0, owned: false },
      2: { chanceLvl: 0, multLvl: 0, owned: false },
      3: { chanceLvl: 0, multLvl: 0, owned: false }
    })
    setCosmeticOwned(DEFAULT_COSMETIC_OWNED)
    setEquippedCosmetic(1)
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
    setProfile(null)
    setCosmeticOwned(DEFAULT_COSMETIC_OWNED)
    setEquippedCosmetic(1)
    setPage('home')
  }

  const handlePop = () => {
    if (!overlayRef.current || !canRef.current) return

    const overlayRect = overlayRef.current.getBoundingClientRect()
    const canRect = canRef.current.getBoundingClientRect()
    const originX = canRect.left - overlayRect.left + canRect.width / 2
    const originY = canRect.top - overlayRect.top + canRect.height * 0.12

    const { earned, animalImages } = getPopResult(clickPower, animalLevels)
    setParticles((prev) => [...prev, ...createPopParticles(originX, originY, CHIP_IMGS, animalImages)])
    setIsPopping(true)
    clearTimeout(popTimeoutRef.current)
    popTimeoutRef.current = window.setTimeout(() => setIsPopping(false), 120)

    const nextCount = count + earned
    const nextCum = cumCount + earned
    setCount(nextCount)
    setCumCount(nextCum)
    if (userEmail) updateChips(userEmail, nextCount, nextCum)
  }

  useEffect(() => {
    let rafId
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.03)
      lastTime = now
      const floorY = overlayRef.current
        ? overlayRef.current.getBoundingClientRect().height - 50
        : undefined
      setParticles((prev) => updateParticles(prev, dt, floorY))
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(popTimeoutRef.current)
    }
  }, [])

  const handleSpendChips = (updater) => {
    setCount((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateChips(userEmail, next, cumCount)
      return next
    })
  }

  const handleSetAutoClicker = (updater) => {
    setClickLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) {
        updateAutoPopper(userEmail, next[1] ?? 0)
        updateClickPower(userEmail, next[2] ?? 0)
      }
      return next
    })
  }

  const handleSetAnimalLevels = (updater) => {
    setAnimalLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) {
        updateSeal(userEmail, next[1].chanceLvl, next[1].multLvl, next[1].owned)
        updateCow(userEmail, next[2].chanceLvl, next[2].multLvl, next[2].owned)
        updateDol(userEmail, next[3].chanceLvl, next[3].multLvl, next[3].owned)
      }
      return next
    })
  }

  const handleSetCosmeticOwned = (updater) => {
    setCosmeticOwned((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateCosmetics(userEmail, next, equippedCosmetic)
      return next
    })
  }

  const handleSetEquippedCosmetic = (updater) => {
    setEquippedCosmetic((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateCosmetics(userEmail, cosmeticOwned, next)
      return next
    })
  }

  // NAVIGATION
  if (!sessionLoaded) {
    return <div className="page-base">Loading...</div>
  }

  if (page === 'shop') {
      return (
        <ShopPage
            onBack={() => setPage('home')}
            count={count}
            setCount={handleSpendChips}
            clickPower={clickPower}
            clickLevels={clickLevels}
            setClickLevels={handleSetAutoClicker}
            animalLevels={animalLevels}
            setAnimalLevels={handleSetAnimalLevels}
            cosmeticOwned={cosmeticOwned} 
            setCosmeticOwned={handleSetCosmeticOwned}
            profile = {profile}
            equippedCosmetic={equippedCosmetic}
            setEquippedCosmetic={handleSetEquippedCosmetic}
        />
      )
  }
  if (page === 'settings') { // to be completed later 
      return (
        <SettingsPage
            onBack={() => setPage('home')}
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
            src={particle.type}
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
                src={CAN_IMAGES[equippedCosmetic]}
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

          <button
            type="button"
            onClick={() => setPage('settings')}
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-25 top-4">
              <img src={gear} alt="settings" className="block w-20 h-auto origin-center hover:scale-105 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
