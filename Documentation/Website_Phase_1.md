# Broken Horizon — Official Website — Phase 1.5 Architecture & Run Guide

Welcome to the official web repository for **Broken Horizon**, an original open-world action-adventure game set across a fictionalized Rajasthan, India.

---

## 1. Project Technology Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (strict module resolution)
- **Styling**: Modern Vanilla CSS, CSS Grid, Flexbox, custom CSS variables, and glassmorphism
- **Typography**: Google Fonts ([Cinzel](https://fonts.google.com/specimen/Cinzel), [Outfit](https://fonts.google.com/specimen/Outfit), [Inter](https://fonts.google.com/specimen/Inter))
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: CSS Keyframes, CSS Transitions, `IntersectionObserver`
- **State**: Decoupled static configuration and data modules (zero backend required for Phase 1.5)

---

## 2. How to Run Locally

### Prerequisites
- Node.js v18+ (tested on v22.17.0)
- npm v9+ (tested on v10.9.2)

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

Development server runs on: `http://localhost:5173/` (or `http://127.0.0.1:5173/`).

---

## 3. Directory Layout

```text
Broken_Horizon_Interactive_Site/
├── Documentation/
│   ├── Website_Phase_1.md
│   ├── Asset_Guide.md
│   └── Website_Content_Guide.md
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── audio/
│       │   └── website-opening.mp3
│       ├── icons/
│       │   └── favicon.svg
│       ├── images/
│       │   ├── hero/
│       │   │   ├── hero-desert-road.jpg
│       │   │   └── hero-jaipur-road.jpg
│       │   ├── world/
│       │   │   ├── world-jaipur.jpg
│       │   │   ├── world-jodhpur.jpg
│       │   │   ├── world-jaisalmer.jpg
│       │   │   └── world-dausa.jpg
│       │   ├── characters/
│       │   │   ├── character-arjun.jpg
│       │   │   └── character-kavya.jpg
│       │   ├── screenshots/
│       │   │   ├── screenshot-01.jpg through screenshot-08.jpg
│       │   ├── artwork/
│       │   ├── ui/
│       │   └── trailer-poster.jpg
│       └── videos/
│           ├── broken-horizon-trailer.mp4
│           └── website-opening.mp4
├── src/
│   ├── components/
│   │   ├── CinematicIntro/
│   │   │   ├── CinematicIntro.tsx
│   │   │   ├── IntroBackground.tsx
│   │   │   ├── IntroAtmosphere.tsx
│   │   │   ├── IntroLogo.tsx
│   │   │   ├── IntroTagline.tsx
│   │   │   ├── IntroProgress.tsx
│   │   │   ├── IntroEnterButton.tsx
│   │   │   ├── IntroAudioControl.tsx
│   │   │   ├── SkipIntro.tsx
│   │   │   ├── IntroTransition.tsx
│   │   │   └── AssetPreloader.ts
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   ├── Hero/
│   │   │   └── Hero.tsx
│   │   ├── Trailer/
│   │   │   ├── TrailerSection.tsx
│   │   │   └── TrailerModal.tsx
│   │   ├── Game/
│   │   │   └── GameSection.tsx
│   │   ├── Gameplay/
│   │   │   └── GameplaySection.tsx
│   │   ├── World/
│   │   │   └── WorldSection.tsx
│   │   ├── Road/
│   │   │   └── RoadSection.tsx
│   │   ├── Characters/
│   │   │   └── CharacterSection.tsx
│   │   ├── Story/
│   │   │   └── StorySection.tsx
│   │   ├── Screenshots/
│   │   │   ├── ScreenshotsSection.tsx
│   │   │   └── ScreenshotLightbox.tsx
│   │   ├── Development/
│   │   │   └── DevelopmentSection.tsx
│   │   ├── News/
│   │   │   └── NewsSection.tsx
│   │   ├── Media/
│   │   │   └── MediaSection.tsx
│   │   ├── Download/
│   │   │   ├── DownloadSection.tsx
│   │   │   └── DownloadModal.tsx
│   │   ├── Footer/
│   │   │   └── FooterSection.tsx
│   │   └── UI/
│   │       └── CustomCursor.tsx
│   ├── config/
│   │   └── siteConfig.ts
│   ├── data/
│   │   ├── gameConfig.ts
│   │   ├── worldData.ts
│   │   ├── characterData.ts
│   │   ├── gameplayData.ts
│   │   ├── developmentData.ts
│   │   ├── newsData.ts
│   │   └── mediaData.ts
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   └── useModal.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── tsconfig.json
```

---

## 4. Central Configuration

The central configuration lives in `src/config/siteConfig.ts`:
- **`developmentPhase`**: Modifies the global telemetry (Phase 21/50, ~42% progress line).
- **`itchUrl`**: When filled with your verified Itch.io page URL, all download triggers across the site will direct visitors to Itch.io.
- **`trailerUrl`**: Video teaser URL.
- **`social links`**: Discord, YouTube, Twitter, Instagram.

---

## 5. Scope Boundaries

This repository is **Phase 1.5 of the Website Only**.
- It is completely decoupled from the Unreal Engine 4.27 project.
- No backend, database, or analytics trackers are implemented.
- All pre-alpha milestones, build timelines, and narrative references are accurately and transparently stated without false promises.
