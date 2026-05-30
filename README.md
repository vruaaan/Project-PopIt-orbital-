# PopIt

PopIt is an idle interactive, satisfying, idle game where users tap on a virtual "can" to generate collectible items. This project is interesting because it combines:
  1. Real-time user interaction (frontend)
  2. Game logic and probability systems
  3. Persistent user data (backend)
  4. Upgrade and progression mechanics

This allows us to explore full-stack development while keeping the project fun and motivating to build.

## Level of Achievement:
- Gemini

## Link of Hosted Web Game:
- https://project-pop-it-orbital.vercel.app/

## Progress by Milestones:

### Milestone 1:
- Setup the 4 core pages:
  1. Home Page
  2. Shop Page
  3. Login Page
  4. Leaderboard Page
- Setup Navigation rules between the 4 pages so that users can navigate between them
- Setup basic 'popping' logic to increase counter on home page when the virtual can is clicked

### Milestone 2:
- Implement buying logic so that the shop is functioning 
- Setup advanced 'popping' logic so that items will pop out of the can
- Setup game physics so that the items popped will fall after popping out of the can
- Wire up backend features to the Supabase databsae so that:
  1. Users can create their account to save progress
  2. Users can login back to their account to access their previous progress
  3. Leaderboard functions properly
 
### Milestone 3:
- Populate the shop with cosmetics and gameplay upgrades
- Finetune the game physics to make the popping logic more realistic
- Implement user testing to check for bugs


### Project Structure:
```
project-root/
│
├── backend/
|
├── frontend/
│    ├── public/
|    ├── src/
|    |    ├── assets/
|    |    |    ├── back.png
|    |    |    ├── chip1.png
|    |    |    ├── chip2.png
|    |    |    ├── chip3.png
|    |    |    ├── cow.png
|    |    |    ├── dolphin.png
|    |    |    ├── home-icon.png
|    |    |    ├── leaderboard.png
|    |    |    ├── login.png
|    |    |    ├── plain-can.png
|    |    |    ├── seal-can.png
|    |    |    ├── shop.png
|    |    |    └── threechips.png
|    |    |
|    |    ├── lib/
|    |    |    ├── playerService.js
|    |    |    └── supabase.js
|    |    |
|    |    ├── App.css
|    |    ├── App.jsx
|    |    ├── index.css
|    |    ├── Leaderboard.jsx
|    |    ├── LoginPage.jsx
|    |    ├── main.jsx
|    |    └── ShopPage.jsx
|    |
│    ├── .env
│    ├── eslint.config.js
|    ├── index.html
|    ├── package-lock.json
|    ├── package.json
|    └── vite.config.jst
│   
├── .gitignore
├── package-lock.json
└── README.md
```

