# 🤖 AI Saathi — Elderly AI Adoption App

## 🌐 Live Demo

> **Access the app here → [https://hemu26.github.io/elderly-ai-adoption-app/](https://hemu26.github.io/elderly-ai-adoption-app/)**

The app is automatically deployed to **GitHub Pages** on every push to `main`. No installation needed — just open the link above in any browser on your phone or computer.

---

An accessible, multilingual AI companion app designed to help elderly people in India discover and use Artificial Intelligence in their daily lives.

## 🌟 Features

| Feature | Description |
|---|---|
| 🧠 **What is AI?** | Simple, visual explanation of AI for first-time users |
| 🎤 **Voice Helper** | Speak your questions and get spoken answers using the Web Speech API |
| 💬 **Ask Questions** | Chat interface with quick-tap suggestion buttons for common queries |
| ❤️ **Health Tips** | Daily health tips (diet, exercise, sleep, mental wellness) + medicine reminders |
| 📰 **News & Weather** | City weather and curated news headlines relevant to senior citizens |

## 🌐 Supported Languages

- 🇬🇧 English
- 🇮🇳 Hindi (हिंदी)
- 🇮🇳 Tamil (தமிழ்)
- 🇮🇳 Telugu (తెలుగు)
- 🇮🇳 Bengali (বাংলা)

## ♿ Accessibility Design

- **Large fonts** (18px base) for easy reading
- **Big touch targets** for arthritis-friendly navigation
- **High contrast** colours meeting WCAG guidelines
- **Screen reader** support with proper ARIA labels
- **Voice input/output** for users who cannot type
- **One-tap suggestions** to avoid typing for common queries

## 🚀 Getting Started

### Option 1 — Access Online (recommended)

Open the live app directly in your browser — no installation required:

👉 **[https://hemu26.github.io/elderly-ai-adoption-app/](https://hemu26.github.io/elderly-ai-adoption-app/)**

### Option 2 — Run Locally

#### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with language selector
│   └── FeatureCard.jsx     # Home page navigation cards
├── pages/
│   ├── Home.jsx            # Home screen with feature tiles
│   ├── WhatIsAI.jsx        # AI explainer for first-time users
│   ├── VoiceAssistant.jsx  # Voice-based Q&A feature
│   ├── Chat.jsx            # Text-based AI chat
│   ├── HealthTips.jsx      # Health tips & medicine reminders
│   └── NewsWeather.jsx     # News headlines & city weather
├── i18n/
│   ├── index.js            # i18next configuration
│   └── locales/            # Translation files (en, hi, ta, te, bn)
├── aiResponses.js          # Rule-based AI response engine
└── test/                   # Vitest + Testing Library tests
```

## 🤝 Target Users

This app is designed for:
- Elderly people in India aged 60+
- First-time smartphone users
- People with no prior AI knowledge
- Users who prefer regional language interfaces

## 📱 Technology Stack

- **React 19** + **Vite** — Fast, modern frontend
- **React Router** — Client-side navigation
- **i18next** — Multilingual support
- **Web Speech API** — Voice input and output (browser built-in)
- **Vitest** + **Testing Library** — Unit and component tests
