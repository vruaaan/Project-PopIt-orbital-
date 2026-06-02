import { useState } from 'react'
import back from './assets/back.png'

export default function CreateAccountPage({ onBack, onCreateAccount }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCreateAccount = async (event) => {
    event.preventDefault()
    const result = await onCreateAccount(username, email, password)
    if (!result || !result.success) {
      setError(result?.message || 'Enter a username, email, and password to create an account.')
      setSuccess('')
      return
    }
    setError('')
    setSuccess('Account created successfully, check your email for confirmation link before logging in')
  }

  return (
    <div className="page-base">
      <div className="main-card max-w-5xl justify-center gap-8">
        <div className="flex items-start justify-between gap-4 w-full">
          <h1 className="title-huge">Create Account.</h1>
          <button type="button" onClick={onBack} className="bg-transparent border-0">
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>
        <div className="mt-12 flex-1 flex items-start">
          <form className="flex w-full max-w-xl flex-col gap-4 text-left">
            <p className="text-xl font-serif text-[#8d3f26] max-w-2xl">
              Create a new account to join the leaderboard.
            </p>
            <div className="grid gap-4 rounded-[1.5rem] border border-[#d8c7b0] bg-[rgba(255,255,255,0.18)] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
              <label className="flex flex-col gap-2 text-lg font-serif text-[#8d3f26]">
                Username
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="rounded-2xl border border-[#cfae94] bg-[rgba(255,255,255,0.35)] px-4 py-3 text-xl text-[#8d3f26] outline-none transition focus:border-[#b55334]"
                  placeholder="Choose a username"
                />
              </label>

              <label className="flex flex-col gap-2 text-lg font-serif text-[#8d3f26]">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-2xl border border-[#cfae94] bg-[rgba(255,255,255,0.35)] px-4 py-3 text-xl text-[#8d3f26] outline-none transition focus:border-[#b55334]"
                  placeholder="Enter your email"
                />
              </label>

              <label className="flex flex-col gap-2 text-lg font-serif text-[#8d3f26]">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-2xl border border-[#cfae94] bg-[rgba(255,255,255,0.35)] px-4 py-3 text-xl text-[#8d3f26] outline-none transition focus:border-[#b55334]"
                  placeholder="Enter your password"
                />
              </label>
              {error ? <p className="text-base text-[#9f352a]">{error}</p> : null}
              {success ? <p className="text-base text-[#6b7c3a]">{success}</p> : null}
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <button type="button" onClick={handleCreateAccount} className="btn-upgrade px-14 py-3 text-xl">
                create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
