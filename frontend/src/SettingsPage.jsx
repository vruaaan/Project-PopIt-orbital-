import back from './assets/back.png'

export default function SettingsPage({ onBack }) {
  return (
    <div className="page-base">
      <div className="main-card max-w-5xl">
        <div className="flex items-start justify-between w-full">
          <h1 className="title-huge">Settings.</h1>
          <button
            type="button"
            onClick={onBack}
            className="bg-transparent border-0 transition-transform hover:scale-105"
            aria-label="Go back"
          >
            <img src={back} alt="back" className="back-img" />
          </button>
        </div>
      </div>
    </div>
  )
}
