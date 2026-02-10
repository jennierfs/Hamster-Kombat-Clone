# 🦅 Falco-X

A fully functional Telegram Mini App — Falco-X Tap to Earn game, built with React, TypeScript, and Vite.

## ✨ Features

### Core Gameplay
- **Tap to Earn**: Tap the falcon to earn coins with satisfying animations
- **Energy System**: Limited taps that regenerate over time
- **Level Progression**: 10 levels from Bronze to Lord
- **Passive Income**: Earn coins automatically based on your profit per hour

### Sections
- **Exchange**: Main tap-to-earn screen with daily bonuses
- **Mine**: Purchase upgrades to increase your profit per hour
- **Friends**: Referral system with shareable invite links
- **Earn**: Complete tasks and achievements for bonus rewards
- **Airdrop**: Track your eligibility for the token airdrop

### Daily Bonuses
- **Daily Reward**: Login streaks up to 10 days with increasing rewards
- **Daily Cipher**: Solve word puzzles for 1M coins
- **Daily Combo**: Find 3 specific upgrade cards for 5M coins

### Technical Features
- **Telegram Integration**: Full Telegram Web App SDK support
- **Persistent Storage**: All progress saved to localStorage
- **Responsive Design**: Optimized for mobile devices
- **Haptic Feedback**: Vibration on tap (when supported)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/falco-x.git
cd falco-x

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📱 Deploying to Telegram

### 1. Create a Bot
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot with `/newbot`
3. Save your bot token

### 2. Set Up Mini App
1. Message @BotFather again
2. Use `/newapp` to create a new web app
3. Link it to your bot
4. Provide your deployed URL (HTTPS required)

### 3. Deploy Your App
You can deploy to any static hosting service:

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

**Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
1. Push to GitHub
2. Enable Pages in repository settings
3. Set base URL in `vite.config.ts`

### 4. Configure Bot Menu Button
```
/setmenubutton
```
Select your bot and provide your app URL.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Telegram Web App SDK** - Telegram integration

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── data/           # Static data (upgrades, tasks)
├── icons/          # SVG icon components
├── images/         # Image assets
├── pages/          # Page components
├── store/          # Zustand store
└── utils/          # Utility functions & types
```

## 🎮 Game Mechanics

### Levels
| Level | Required Points |
|-------|----------------|
| Bronze | 0 |
| Silver | 5,000 |
| Gold | 25,000 |
| Platinum | 100,000 |
| Diamond | 1,000,000 |
| Epic | 2,000,000 |
| Legendary | 10,000,000 |
| Master | 50,000,000 |
| GrandMaster | 100,000,000 |
| Lord | 1,000,000,000 |

### Upgrades
- **Markets**: Trading pairs and token listings
- **PR & Team**: Staff and marketing improvements
- **Legal**: Licenses and compliance
- **Specials**: Premium features

## 📄 License

This project is Falco-X — a Tap to Earn game. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For any inquiries, please contact me in Telegram: [Mykola](https://t.me/mykola49).

