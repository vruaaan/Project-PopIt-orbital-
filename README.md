# PopIt

PopIt is an idle clicker game where users tap a virtual can to pop chips, earn currency, and spend it on upgrades. The project combines real-time user interaction, game logic with probability systems, persistent cloud-saved progress, and a full upgrade/cosmetics shop.

## Level of Achievement
- Gemini

## Hosted Web Game
- https://project-pop-it-orbital.vercel.app/

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Backend**: Firebase (Authentication, Firestore)
- **Deployment**: Vercel

## Features
- Click the can to pop chips and earn currency
- Chip particles fly out of the can with physics-based animations
- Shop with three upgrade tabs:
  - **Pop!** — auto-clicker and click power upgrades
  - **Specials** — unlock animals (seal, cow, dolphin) with spawn chance and chip value upgrades
  - **Cosmetics** — unlock alternate can skins
- Firebase Authentication (sign up, log in, log out, password reset)
- Cloud-saved progress via Firestore — chip count, upgrades, and cosmetics persist across sessions
- Global leaderboard showing top players by total chips popped

## Progress by Milestones

### Milestone 1
- Set up the 4 core pages: Home, Shop, Login, Leaderboard
- Implemented navigation between pages using state-based routing
- Basic popping logic to increment chip counter on click

### Milestone 2
- Implemented shop buying logic with cost scaling per upgrade level
- Chip particles spawn and fall from the can on each click (physics engine)
- Wired up Firebase backend:
  - Account creation and login with email/password
  - Firestore profile creation and data persistence
  - Leaderboard reads live data from Firestore

### Milestone 3
- Populated the shop with gameplay upgrades (auto-clicker, click power) and special animal upgrades
- Added cosmetics tab with alternate can skins in a vertical card grid layout
- Added password reset page connected to Firebase
- Replaced text price labels with chip icon across all shop tabs
- Extracted repeated layout patterns into shared CSS classes
- Fine-tuned game physics for more realistic chip animations
- User testing and bug fixes

## Project Structure
```
project-root/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images (chips, cans, animals, icons)
│   │   │
│   │   ├── lib/
│   │   │   ├── firebase.js      # Firebase init, auth functions
│   │   │   ├── playerService.js # Firestore read/write for user profiles
│   │   │   └── gameplayLogic.js # Firestore updates for game state
│   │   │
│   │   ├── physics/
│   │   │   └── physics.js       # Chip particle animation engine
│   │   │
│   │   ├── shoppages/
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ClickUpgrades.jsx
│   │   │   ├── SpecialUpgrades.jsx
│   │   │   └── CosmeticUpgrades.jsx
│   │   │
│   │   ├── userpages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── CreateAccountPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   └── LeaderboardPage.jsx
│   │   │
│   │   ├── App.jsx              # Root component with routing and game state
│   │   ├── App.css
│   │   ├── index.css            # Global styles and shared CSS classes
│   │   └── main.jsx
│   │
│   ├── functions/               # Firebase Cloud Functions
│   ├── .env                     # Firebase config (not committed)
│   ├── firebase.json
│   ├── firestore.rules
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package-lock.json
└── README.md
```
