# BROKEN HORIZON — OFFICIAL WEBSITE
## PHASE 1 — FOUNDATION & CINEMATIC LANDING PAGE

Welcome to the official web repository for **Broken Horizon**, a PC-first open-world action-adventure set across a fictionalized Rajasthan, India.

---

## 1. Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla Modern CSS with Custom Properties, CSS Grid/Flexbox, Glassmorphism, and responsive breakpoints
- **Typography**: Google Fonts ([Cinzel](https://fonts.google.com/specimen/Cinzel), [Outfit](https://fonts.google.com/specimen/Outfit), [Inter](https://fonts.google.com/specimen/Inter))
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Data**: Centralized static TypeScript configuration & data models
- **Hosting / Architecture**: Fully static frontend (no backend required for Phase 1)

---

## 2. Getting Started & Running Locally

### Prerequisites
- **Node.js**: v18+ (tested on v22.17.0)
- **npm**: v9+ (tested on v10.9.2)

### Installation
From the project root directory:
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` (or `http://127.0.0.1:5173`) in your web browser.

### Build Production Bundle
```bash
npm run build
```
Build output is generated cleanly into the `/dist` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 3. Project Directory Structure

```
Broken_Horizon_Interactive_Site/
├── public/
│   ├── favicon.svg                  # Original BH Monogram & Horizon SVG Favicon
│   └── assets/
│       ├── icons/                   # Vector and UI icons
│       │   └── favicon.svg
│       ├── images/                  # High-resolution original concept art
│       │   ├── broken-horizon-hero.jpg      # Hero landscape visual
│       │   ├── character-arjun-mehta.jpg    # Arjun Mehta dossier concept
│       │   └── character-kavya-rathore.jpg  # Kavya Rathore dossier concept
│       └── videos/                  # Reserved for future video teasers
├── src/
│   ├── assets/                      # Bundled build assets
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky nav with desktop/mobile drawer & download trigger
│   │   ├── Hero.tsx                 # Full-screen cinematic landing hero
│   │   ├── GameSection.tsx          # 2-column game overview and 6 pillars
│   │   ├── WorldSection.tsx         # 13 planned regions atlas & category filters
│   │   ├── CharacterSection.tsx     # Arjun Mehta & Kavya Rathore dossiers
│   │   ├── StorySection.tsx         # Horizon Corridor confidential narrative
│   │   ├── GameplaySection.tsx      # 5 gameplay pillars (Explore, Drive, Investigate, Survive, Choose)
│   │   ├── DevelopmentSection.tsx   # Phase 21/50 progress bar & telemetry
│   │   ├── NewsSection.tsx          # Development log (Phases 18, 19, 20 updates)
│   │   ├── MediaSection.tsx         # Gallery archive with lightbox modal
│   │   ├── DownloadSection.tsx      # Public Windows build milestone access
│   │   ├── Footer.tsx               # Navigation, social placeholders, and Rajasthan disclaimer
│   │   ├── TrailerModal.tsx         # Accessible "Trailer coming soon" modal
│   │   └── DownloadModal.tsx        # Milestone and future itch.io access modal
│   ├── config/
│   │   └── gameConfig.ts            # Central game parameters & single-source-of-truth config
│   ├── data/
│   │   ├── gameData.ts              # Pillars and gameplay feature metrics
│   │   ├── worldData.ts             # 13 planned regions and descriptions
│   │   ├── characterData.ts         # Protagonist profiles, bios, and gear
│   │   ├── newsData.ts              # Development log milestone entries
│   │   └── mediaData.ts             # Concept art and render items
│   ├── App.css                      # Master UI stylesheet and responsive styling
│   ├── index.css                    # Design tokens, CSS variables, and typography rules
│   ├── App.tsx                      # Root application layout
│   └── main.tsx                     # Entry mount point
├── index.html                       # HTML5 foundation, Google Fonts, and OpenGraph SEO tags
├── package.json                     # Scripts and dependencies
├── tsconfig.json                    # TypeScript compiler options
└── WEBSITE_PHASE_1.md               # Phase 1 documentation
```

---

## 4. Central Configuration

All global game metadata is managed from a single source of truth in `src/config/gameConfig.ts`:

```typescript
export const gameConfig: GameConfig = {
  title: "BROKEN HORIZON",
  tagline: "Every road hides a story.",
  secondaryDescription: "An open-world action-adventure set across a fictionalized Rajasthan.",
  developmentPhase: 21,
  developmentPhaseTotal: 50,
  downloadURL: "#",
  trailerURL: "#",
  discordURL: "#",
  youtubeURL: "#",
  xURL: "#",
  instagramURL: "#",
  targetPlatform: "PC / Windows",
  engine: "Unreal Engine 5",
  expectedBuildMilestone: "First Major Development Milestone (Target: Phase 25)",
};
```

---

## 5. How to Modify Content & Settings

### How to Change the Development Phase
Edit `src/config/gameConfig.ts`:
```typescript
developmentPhase: 22, // Update from 21 to your next sprint
```
The progress bar, percentage calculation, hero badge, and telemetry counter across the website will update automatically without changing any component code.

### How to Connect Itch.io Later
In `src/config/gameConfig.ts`, update `downloadURL`:
```typescript
// Replace '#' with your verified itch.io URL:
downloadURL: "https://broken-horizon.itch.io/broken-horizon"
```
The download buttons and modals across the navbar, download section, and footer will automatically update to direct users to Itch.io.

### How to Add News / Development Log Updates
Open `src/data/newsData.ts` and prepend a new entry to `newsItems`:
```typescript
{
  id: "phase-21",
  phaseNumber: 21,
  phaseLabel: "PHASE 21",
  title: "Dynamic Weather & Desert Storms",
  tag: "Development Update",
  date: "Current Cycle",
  summary: "Volumetric dust storms, atmospheric heat shimmer, and dynamic wind resistance impacting vehicle steering.",
  keyHighlights: [
    "Volumetric sandstorm particles with occlusion",
    "Heat mirage shader on long highway vistas",
    "Dynamic wind vector drag on high-profile vehicles"
  ],
  status: "Active Integration"
}
```

### How to Add or Update World Locations
Open `src/data/worldData.ts` and add or modify regions in `worldRegions`:
```typescript
{
  id: "custom-district",
  name: "District Name",
  subtitle: "Brief subtitle",
  category: "Desert", // "Urban" | "Desert" | "Fortress" | "Highlands" | "Industrial"
  description: "Description of the fictionalized district...",
  coordinates: "26.5000° N, 74.5000° E",
  imagePlaceholder: "/assets/images/broken-horizon-hero.jpg",
  accentColor: "#e9c46a",
}
```

### How to Add Characters
Open `src/data/characterData.ts` and add entries to `characters`:
```typescript
{
  id: "character-id",
  name: "FULL NAME",
  age: 32,
  origin: "City, Region",
  role: "Role Title",
  officialBio: "Brief one-sentence bio.",
  extendedBackground: "Detailed backstory...",
  attributes: ["Capability 1", "Capability 2"],
  signatureGear: "Signature equipment",
  imagePlaceholder: "/assets/images/character-concept.jpg",
  dossierNumber: "DOSSIER // CC-032",
}
```

### How to Replace Visual Assets
All game images reside in `/public/assets/images/`. To replace with final artwork:
1. Save your new image in `/public/assets/images/` using standard web formats (`.jpg`, `.png`, `.webp`).
2. Update the asset reference in the corresponding data file (`worldData.ts`, `characterData.ts`, `mediaData.ts`) or replace the default file directly (e.g., `broken-horizon-hero.jpg`).

---

## 6. Accessibility & Performance Features

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements with heading hierarchy (`h1` through `h4`).
- **Keyboard Navigation**: Full tab order navigation with visible focus rings (`:focus-visible`) and `Escape` key listeners to dismiss modals and mobile menus.
- **Screen Reader Support**: ARIA attributes (`aria-label`, `aria-expanded`, `aria-modal`, `aria-hidden`) on all interactive controls.
- **Motion Accessibility**: Full `prefers-reduced-motion: reduce` media query eliminating aggressive animations for sensitive users.
- **Zero Horizontal Overflow**: Guaranteed across desktop (1920×1080, 1440×900, 1366×768), tablet (1024×768), and mobile (390×844, 412×915).
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Card, meta descriptions, and keywords in `index.html`.

---

## 7. Known Limitations for Phase 1

- **Single-Page Architecture**: Phase 1 is delivered as a cohesive cinematic landing page with section anchors (`#game`, `#world`, `#story`, `#characters`, `#media`, `#news`, `#download`). Multi-page routing (`/game`, `/world`, etc.) is prepared for Phase 2.
- **Trailer Video**: A placeholder modal communicates "Trailer coming soon" until the in-engine Unreal Engine 5 teaser render is exported.
- **Play / Download**: Download buttons accurately reflect pre-alpha status ("Coming with the first public milestone") with no fake builds promised.
- **Community Channels**: Social links display an upcoming status indicator until official project accounts are registered.

---

## 8. Recommended Website Phase 2 Roadmap

1. **Multi-Page Routing**: Add `react-router-dom` to support deep dive pages (`/world/:districtId`, `/characters/:id`, `/media`, `/roadmap`).
2. **Interactive 2D/3D Map of Fictional Rajasthan**: An interactive territory atlas with clickable highway waypoints, POIs, and faction territory overlays.
3. **Soundtrack & Audio Teaser Player**: Ambient audio toggle featuring Rajasthani desert windscapes and cinematic synth cues.
4. **Newsletter / Playtest Registration**: Email notification capture for pre-alpha playtesting notifications.
5. **Direct Itch.io Embed / Widget**: Integration of the Itch.io purchase/download widget once the public build milestone is reached.
