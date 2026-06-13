import { useState } from 'react'
import back from '../assets/back.png'

export default function ResetPasswordPage({ onBack, onResetPassword }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address.')
      setSuccess('')
      return
    }
    const result = await onResetPassword(email)
    if (!result || !result.success) {
      setError(result?.message || 'Failed to send reset email.')
      setSuccess('')
      return
    }
    setError('')
    setSuccess('Password reset email sent! Check your inbox.')
    setEmail('')
  }

  return (
    <div className="page-base">
      <div className="main-card max-w-5xl justify-center gap-8">
        <div className="flex items-start justify-between gap-4 w-full">
          <h1 className="title-huge">Reset Password.</h1>
          <button type="button" onClick={onBack} className="bg-transparent border-0">
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>
        <div className="mt-12 flex-1 flex items-start">
          <form className="flex w-full max-w-xl flex-col gap-4 text-left">
            <p className="text-xl font-serif text-[#8d3f26] max-w-2xl">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div className="grid gap-4 rounded-[1.5rem] border border-[#d8c7b0] bg-[rgba(255,255,255,0.18)] p-6 shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
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
              {error ? <p className="text-base text-[#9f352a]">{error}</p> : null}
              {success ? <p className="text-base text-[#6b7c3a]">{success}</p> : null}
            </div>

            <div className="flex justify-center gap-4 mt-2">
              <button type="button" onClick={handleSubmit} className="btn-upgrade px-14 py-3 text-xl">
                send reset email
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <p className="text-base font-serif text-[#8d3f26]">Remember your password?</p>
              <button type="button" onClick={onBack} className="btn-upgrade px-14 py-3 text-xl">
                back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
