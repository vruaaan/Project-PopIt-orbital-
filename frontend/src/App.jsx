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
import { updateChips, updateClickUpgrades, updateSpecialUpgrades, updateCosmetics } from './lib/gameplayLogic'
import { updateParticles } from './gameengine/physics'
import { getPopResult, createPopParticles } from './gameengine/popLogic'
import { CLICK_POWER_BASE } from './lib/gameConstants'
import { CLICK_UPGRADE_BALANCE, CLICK_UPGRADES, COSMETICS } from './lib/shopConstants'
import { ANIMALS } from './lib/animalLogic'
import { DEFAULT_SETTINGS, setActiveSettings } from './lib/gameSettings'

const DEFAULT_COSMETIC_OWNED = { 1: true, 2: false, 3: false, 4: false } // if user dont log in

function getDefaultAnimalLevels() {
  return ANIMALS.reduce((levels, animal) => {
    levels[animal.id] = { chanceLvl: 0, multLvl: 0, owned: false }
    return levels
  }, {})
}

function calcClickPower(clickLevels) {
  const basePower = CLICK_POWER_BASE +
    (clickLevels[1] ?? 0) * CLICK_UPGRADE_BALANCE[1].powerPerLevel +
    (clickLevels[2] ?? 0) * CLICK_UPGRADE_BALANCE[2].powerPerLevel
  const multiplierLevel = clickLevels[3] ?? 0
  return multiplierLevel > 0 ? basePower * 2 ** multiplierLevel : basePower
}

function getClickLevelsFromProfile(profile) { // converts the database field for click_upgrades into something usable for code
  const upgrades = profile.click_upgrades ?? {} // default to empty dictionary if not present 
  return CLICK_UPGRADES.reduce((levels, upgrade) => ({ // loops through the dictionary 
    ...levels, // maps the data from database into an object that can be used 
    [upgrade.id]: upgrades[upgrade.dbKey] ?? 0
  }), {}) 
}

function getClickUpgradesForProfile(clickLevels) { // converts dictionary into database update
  return CLICK_UPGRADES.reduce((upgrades, upgrade) => {
    const level = clickLevels[upgrade.id] ?? 0
    if (level > 0) { // safeguard so that entry only created when level > 0
      upgrades[upgrade.dbKey] = level
    }
    return upgrades
  }, {})
}

function getAnimalLevelsFromProfile(profile) { //converts the database field for special_upgrades into something usable for code
  const upgrades = profile.special_upgrades ?? {}
  return ANIMALS.reduce((levels, animal) => {
    const upgrade = upgrades[animal.dbKey] ?? {}
    levels[animal.id] = {
      owned: Boolean(upgrades[animal.dbKey]),
      chanceLvl: upgrade.prob ?? 0,
      multLvl: upgrade.cp ?? 0
    }
    return levels
  }, {})
}

function getSpecialUpgradesForProfile(animalLevels) { // converts dictionary into database update
  return ANIMALS.reduce((upgrades, animal) => {
    const level = animalLevels[animal.id]
    if (level?.owned) {
      upgrades[animal.dbKey] = {
        prob: level.chanceLvl ?? 0,
        cp: level.multLvl ?? 0
      }
    }
    return upgrades
  }, {})
}

function getCosmeticOwnedFromProfile(profile) { // converts the database field for cosmetic_upgrades into something usable for code
  const upgrades = profile.cosmetic_upgrades ?? {}
  return COSMETICS.reduce((owned, item) => ({
    ...owned,
    [item.id]: Boolean(owned[item.id] || upgrades[item.dbKey])
  }), { ...DEFAULT_COSMETIC_OWNED })
}

function getEquippedCosmeticFromProfile(profile) { // reads the equipped cosmetic from database
  const upgrades = profile.cosmetic_upgrades ?? {}
  const equippedKey = Object.entries(upgrades).find(([, equipped]) => equipped)?.[0]
  const equippedItem = COSMETICS.find((item) => item.dbKey === equippedKey)
  return Number(equippedItem?.id ?? 1)
}

function getCosmeticUpgradesForProfile(cosmeticOwned, equippedCosmetic) { // converts the database field for  
  return COSMETICS.reduce((upgrades, item) => { // loops over every cosmetic definition
    const owned = cosmeticOwned[item.id] // uses local app state by id
    if (owned) { // if owned == True
      upgrades[item.dbKey] = item.id === equippedCosmetic  // adds a boolean to indicate if that cosmetic is equipped or not
    }
    return upgrades
  }, {})
}



export default function App() {
    const [count, setCount] = useState(0) // equal to doing count = 0
    const [cumCount, setCumCount] = useState(0) // equal to doing cumCount = cumCount = 0
    const [page, setPage] = useState('home') // default home page
    const [isLoggedIn, setIsLoggedIn] = useState(false) // default not logged in
    const [userEmail, setUserEmail] = useState(null) // email is null by default
    const [sessionLoaded, setSessionLoaded] = useState(false) // 
    const [clickLevels, setClickLevels] = useState({ 1: 0, 2: 0, 3: 0 })
    const [purchaseCount, setPurchaseCount] = useState(0)
    const [cosmeticOwned, setCosmeticOwned] = useState(DEFAULT_COSMETIC_OWNED)
    const [animalLevels, setAnimalLevels] = useState(getDefaultAnimalLevels)
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
    const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    setActiveSettings(settings)
  }, [settings])

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
        setCount(profile.curr_count ?? 0)
        setCumCount(profile.cum_count ?? 0)
        setPurchaseCount(profile.purchase_count ?? 0)
        setClickLevels(getClickLevelsFromProfile(profile))
        setAnimalLevels(getAnimalLevelsFromProfile(profile))
        setCosmeticOwned(getCosmeticOwnedFromProfile(profile))
        setEquippedCosmetic(getEquippedCosmeticFromProfile(profile))
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
      setCount(profile.curr_count ?? 0)
      setCumCount(profile.cum_count ?? 0)
      setPurchaseCount(profile.purchase_count ?? 0)
      setClickLevels(getClickLevelsFromProfile(profile))
      setAnimalLevels(getAnimalLevelsFromProfile(profile))
      setCosmeticOwned(getCosmeticOwnedFromProfile(profile))
      setEquippedCosmetic(getEquippedCosmeticFromProfile(profile))
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
    setPurchaseCount(0)
    setClickLevels({ 1: 0, 2: 0, 3: 0 })
    setAnimalLevels(getDefaultAnimalLevels())
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
      const nextPurchaseCount = next < prev ? purchaseCount + 1 : purchaseCount
      if (nextPurchaseCount !== purchaseCount) {
        setPurchaseCount(nextPurchaseCount)
      }
      if (userEmail) updateChips(userEmail, next, cumCount, nextPurchaseCount)
      return next
    })
  }

  const handleSetAutoClicker = (updater) => {
    setClickLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) {
        updateClickUpgrades(userEmail, getClickUpgradesForProfile(next))
      }
      return next
    })
  }

  const handleSetAnimalLevels = (updater) => {
    setAnimalLevels(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) {
        updateSpecialUpgrades(userEmail, getSpecialUpgradesForProfile(next))
      }
      return next
    })
  }

  const handleSetCosmeticOwned = (updater) => {
    setCosmeticOwned((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateCosmetics(userEmail, getCosmeticUpgradesForProfile(next, equippedCosmetic))
      return next
    })
  }

  const handleSetEquippedCosmetic = (updater) => {
    setEquippedCosmetic((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (userEmail) updateCosmetics(userEmail, getCosmeticUpgradesForProfile(cosmeticOwned, next))
      return next
    })
  }

  const canSizeClass = 'w-44'

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
            equippedCosmetic={equippedCosmetic}
            setEquippedCosmetic={handleSetEquippedCosmetic}
        />
      )
  }
  if (page === 'settings') {
      return (
        <SettingsPage
            onBack={() => setPage('home')}
            settings={settings}
            setSettings={setSettings}
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
            className="absolute bottom-0 left-1/2 -translate-x-1/2 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className={`block shrink-0 ${canSizeClass}`}>
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
