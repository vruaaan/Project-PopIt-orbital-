import back from './assets/back.png'
import { DEFAULT_SETTINGS, SETTING_DEFINITIONS } from './lib/gameSettings'

export default function SettingsPage({ onBack, settings, setSettings }) {
  const handleOptionChange = (key, value) => {
    if (setSettings) {
      setSettings((prev) => ({ ...prev, [key]: value }))
    }
  }

  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">
        <div className="mb-8 flex w-full items-start justify-between gap-4">
          <div className="text-left">
            <h1 className="title-huge">Settings.</h1>
            <p className="mt-2 text-sm text-left text-[var(--text)]/80">Pick a feel for the can and the particle motion.</p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="bg-transparent border-0 transition-transform hover:scale-105"
            aria-label="Go back"
          >
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>

        <div className="w-full space-y-4">
          {SETTING_DEFINITIONS.map((setting) => (
            <div key={setting.key} className="rounded-[1.25rem] border border-[var(--border)] bg-white/70 p-4 shadow-sm">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
                <div className="min-w-0 text-left">
                  <h2 className="text-lg font-semibold">{setting.label}</h2>
                  <p className="text-sm text-left text-[var(--text)]/75">{setting.description}</p>
                </div>
                <div className="w-full lg:w-[320px] lg:justify-self-start">
                  <div className="grid w-full max-w-[320px] grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOptionChange(setting.key, setting.options[0].value)}
                      className={`flex h-auto w-[72px] items-center justify-center rounded-full border px-2 py-1 text-sm font-medium leading-none transition ${settings?.[setting.key] === setting.options[0].value
                        ? 'border-transparent bg-[var(--accent)] text-white shadow-sm'
                        : 'border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-white/80'}`}
                    >
                      {setting.options[0].label}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOptionChange(setting.key, setting.options[1].value)}
                      className={`flex h-auto w-[72px] items-center justify-center rounded-full border px-2 py-1 text-sm font-medium leading-none transition ${settings?.[setting.key] === setting.options[1].value
                        ? 'border-transparent bg-[var(--accent)] text-white shadow-sm'
                        : 'border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-white/80'}`}
                    >
                      {setting.options[1].label}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOptionChange(setting.key, setting.options[2].value)}
                      className={`flex h-auto w-[72px] items-center justify-center rounded-full border px-2 py-1 text-sm font-medium leading-none transition ${settings?.[setting.key] === setting.options[2].value
                        ? 'border-transparent bg-[var(--accent)] text-white shadow-sm'
                        : 'border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-white/80'}`}
                    >
                      {setting.options[2].label}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setSettings?.(DEFAULT_SETTINGS)}
            className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-white"
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  )
}
