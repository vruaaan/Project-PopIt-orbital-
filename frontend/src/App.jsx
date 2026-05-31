import './App.css'
import { useEffect, useState } from 'react' //useEffect runs code when the components load or updates, useState stores data that can change
// import png images
import threechips from './assets/threechips.png'
import shop from './assets/shop.png'
import loginIcon from './assets/Login.png'
import leaderboard from './assets/leaderboard.png'
import can from './assets/plain can.png'
// import other react components (screens)
import ShopPage from './ShopPage'
import LeaderboardPage from './LeaderboardPage'
import LoginPage from './LoginPage'

// import supabase stuff
import { supabase } from './lib/supabase'
import { loadProfile } from './lib/playerService'


export default function App() { // defines and exports a react component, everything within function runs when react renders the page
  const [count, setCount] = useState(0) // default value for the count 
  const [clickPower, setClickPower] = useState(1)  // default value for click power
  const [page, setPage] = useState('home') // default page to start at (home page)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // default login status (not logged in)

  useEffect(() => { // checking login on page load
    const loadSession = async () => { 
      const { data, error } = await supabase.auth.getSession() // fetches the current auth session
      if (error) {
        return
      }
      const session = data.session
      setIsLoggedIn(Boolean(session)) // if data.session is null, it sets to false, else it sets to true

      // if user is logged in, load their profile (chips, click power)
      if (session) {
        const { data: profile, error: profileError } = await loadProfile(session.user.id)
        if (!profileError && profile) {
          setCount(profile.chips ?? 0)
          setClickPower(profile.click_power ?? 1)
        }
      }
    }
    loadSession()
  }, [])

  const handleLogin = async (username, email, password) => { // takes in the username, email and password
    const { data, error } = await supabase.auth.signInWithPassword({ // calls supabase, sign in 
      email: email.trim(),
      password,
    })
    if (error) { // if error triggered
      return { success: false, message: error.message || 'Invalid username or password.' }
    }

    const session = data?.session
    if (!session) {
      // No active session; often happens when email confirmation is required
      return { success: false, message: 'No active session. Check your email for a confirmation link.' }
    }

    setIsLoggedIn(true)

    const { data: profile, error: profileError } = await loadProfile(session.user.id)
    if (!profileError && profile) {
      setCount(profile.chips ?? 0)
      setClickPower(profile.click_power ?? 1)
    }

    setPage('leaderboard') // page set to leaderboard
    return { success: true }
  }

  const handleCreateAccount = async (username, email, password) => { // creates an account
    if (!username.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: 'Enter a username, email, and password to create an account.' }
    }
    const { data, error } = await supabase.auth.signUp({ 
      email: email.trim(),
      password,
      options: {
        data: {
          username: username.trim(),
        },
      },
    })
    if (error) {
      return { success: false, message: error.message || 'Failed to create account.' }
    }
    const session = data?.session
    setIsLoggedIn(Boolean(session))
    if (session) { // if true
      const { data: profile, error: profileError } = await loadProfile(session.user.id)
      if (!profileError && profile) {
        setCount(profile.chips ?? 0)
        setClickPower(profile.click_power ?? 1)
      }
      setPage('leaderboard') // set page to leaderboard
    }
    return { success: true, userId: data?.user?.id, username: username.trim(), session }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    setPage('home')
  }

  if (page === 'shop') {
    return <ShopPage 
    onBack={() => setPage('home')}
    count = {count}
    setCount = {setCount}
    clickPower = {clickPower}
    setClickPower = {setClickPower} />
  }
  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} onLogin={handleLogin} onCreateAccount={handleCreateAccount} />
  }
  if (page === 'leaderboard') {
    return <LeaderboardPage onBack={() => setPage('home')} onLogout={handleLogout} />
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
            onClick={() => (isLoggedIn ? setPage('leaderboard') : setPage('login'))}
            className="mt-8 p-0 bg-transparent border-0 focus:outline-none rounded-full">
            <span className="fixed right-3 top-26">
              <img
                src={isLoggedIn ? leaderboard : loginIcon}
                alt={isLoggedIn ? 'leaderboard icon' : 'login icon'}
                className="block w-20 h-auto  origin-center hover:scale-105 transition-transform"
              />
            </span>
          </button>

          
        </div>
      </div>
    </div>
  )
}


