# Broken Horizon — Website Phase 2: World Explorer & Interactive Map

## 1. Overview & Vision
Website Phase 2 introduces the **Tactical World Explorer** for *Broken Horizon*. The experience operates as an in-universe intelligence and cartography terminal, presenting an original fictionalized depiction of Rajasthan's 13 game districts.

---

## 2. Architecture & Tech Stack

### Core Technologies
- **Framework**: React 19 + TypeScript (Strict)
- **Bundler**: Vite 8
- **Map Engine**: Performant SVG vector layers + CSS hardware-accelerated transforms
- **Styling**: Modular CSS (`src/styles/worldExplorer.css`, `globals.css`)
- **State Management**: Reactive React hooks + URL history synchronization (`popstate`, hash, path routing)

### Directory Structure
```text
src/
├── components/
│   └── WorldExplorer/
│       ├── WorldExplorer.tsx        # Master coordinator & HUD layout
│       ├── WorldMap.tsx             # Interactive SVG map canvas (pan, zoom, drag)
│       ├── WorldMapBackground.tsx   # Topographic contours, grid, dune ripples
│       ├── DistrictLayer.tsx        # 13 district polygon boundary orchestrator
│       ├── DistrictShape.tsx        # District boundary path, center node & labels
│       ├── RoadNetwork.tsx          # Primary & secondary highway network with transit pulses
│       ├── RouteNetwork.tsx         # Horizon Corridor clandestine network overlay
│       ├── LandmarkLayer.tsx        # Key locations & operative hubs
│       ├── MapMarker.tsx            # Category-specific tactical markers & tooltips
│       ├── MapControls.tsx          # Floating HUD controls (+, -, Reset, Locate, Key)
│       ├── MapLegend.tsx            # Cartographic symbols & route legend
│       ├── WorldIntro.tsx           # Cinematic 13-district territory opening sequence
│       ├── DistrictPanel.tsx        # Briefing dossier panel (desktop side, mobile bottom sheet)
│       ├── DistrictList.tsx         # Accessible 13-district directory drawer
│       ├── WorldSearch.tsx          # Autocompleting search for districts, landmarks & operatives
│       ├── WorldFilters.tsx         # Layer filter chips (ALL, DISTRICTS, ROADS, STORY, etc.)
│       ├── JourneyTimeline.tsx      # "The Road" horizontal journey timeline
│       ├── WorldStats.tsx           # Telemetric HUD with compass & coordinates
│       └── MapTransition.tsx        # Fullscreen expanded territory intelligence dossier
├── data/
│   └── worldData.ts                 # 13 districts, SVG paths, coordinates, routes & landmarks
└── styles/
    └── worldExplorer.css            # Complete tactical map, HUD, and mobile stylesheet
```

---

## 3. District Data Model (`worldData.ts`)

Every district is strictly data-driven and includes:
- `id`, `name`, `displayName`, `region`
- `coordinates`: Fictional in-game grid reference (e.g. `BH-RAJ-01 / GRID 68-34`)
- `mapCoordinates`: Center SVG coordinates `{ x, y }`
- `mapPath`: Interlocking SVG polygon boundary
- `colorAccent`, `populationStyle`, `terrain`, `climate`
- `majorLocations`: Array of key sectors and waypoints
- `landmarks`: Specialized map markers (Garages, Safehouses, Story hubs, Character sanctuaries)
- `activities`: Available activities (Tuning, Racing, Infiltration, Recon)
- `travelTime`: In-universe transit estimate
- `discoveryState`: `Available` | `Discovered` | `Featured` | `Locked`
- `quote`: Atmospheric narrative tag
- `characterAffiliation`: Linked protagonist connection (e.g. Arjun Mehta in Jaipur, Kavya Rathore in Udaipur)

### The 13 Fictionalized Game Districts
1. **Jaipur**: Starting district, Mehta Garage, Police Yard, old walls, chop shops
2. **Dausa**: Subterranean stepwell caches and freight crossroads
3. **Sawai Madhopur**: Highland scrub wildlands, ravines, cliffside lodges
4. **Kota**: Industrial river basin, Chambal sluices, thermal power infrastructure
5. **Bundi**: Historic fortress ridge, Taragarh Spire, terraced switchbacks
6. **Ajmer**: Central transit chokepoint, Taragarh Pass checkpoint gate
7. **Pali**: Textile plains, Bandit river dry beds, drag testing airstrips
8. **Jodhpur**: Blue bastion, Red Citadel, Western Freight Terminal
9. **Jaisalmer**: Deep Thar dune sea, Golden Gate, radar relays, shifting sands
10. **Barmer**: Desert frontier, oil pumpjack installations, border fences
11. **Udaipur**: Lake sanctuaries, Bluewater Promenade, Kavya's Press Bureau
12. **Rajsamand**: Marble excavation quarries, white limestone dust pits
13. **Sikar**: Shekhawati painted merchant havelis, northern trade corridors

---

## 4. Interaction Model & Controls

| Control | Mouse / Gesture | Keyboard Shortcut |
| :--- | :--- | :--- |
| **Pan Map** | Click & drag canvas / 1-finger touch drag | `W`, `A`, `S`, `D` or `Arrow Keys` |
| **Zoom In** | Scroll wheel up / Double-click / Pinch out | `+` or `=` |
| **Zoom Out** | Scroll wheel down / Pinch in | `-` or `_` |
| **Reset Camera** | Click `Reset` HUD button | `R` |
| **Locate Starting Hub** | Click `Locate` HUD button | — |
| **Select District** | Click district polygon or transit waypoint | `Enter` / `Space` on focused shape |
| **Search Territory** | Type in top search input | Auto-centers on selected result |
| **Close Panels** | Click `X` / click backdrop | `Escape` |

---

## 5. Horizon Corridor & Route Networks

- **Primary Highways**: 12 primary transit arteries interconnecting the 13 districts with animated motion particles representing traffic flow.
- **Horizon Corridor**: Red dashed clandestine route network spanning Alpha, Bravo, Charlie, and Delta sectors with an interactive label and intelligence popup.

---

## 6. Accessibility & Performance

- **Semantic & ARIA compliant**: All districts, markers, and controls are keyboard focusable with descriptive ARIA labels.
- **Alternative List**: The `DistrictList` drawer provides full list-based navigation for assistive devices.
- **Reduced Motion**: Automatically deactivates particle pulses, zoom sweeps, and transition animations when `prefers-reduced-motion: reduce` is detected.
- **Smooth 60 FPS**: Utilizes optimized SVG vector paths without third-party mapping libraries or heavyweight tile engines.

---

## 7. URL Architecture & Routing

- `/`: Homepage with embedded World Section and "OPEN INTERACTIVE MAP" button.
- `/world`: Interactive World Explorer default view (centers on Jaipur).
- `/world/:districtId`: Direct deep-linking to any of the 13 districts (e.g. `/world/jodhpur`, `/world/jaisalmer`).
- Browser history integration: `popstate` and `pushState` allow native browser back/forward navigation.

---

## 8. Known Limitations & Phase 3 Roadmap

- **Audio Track**: Ambient desert wind audio architecture is wired with user consent toggle (`SOUND ON` / `SOUND OFF`), ready for final audio stem drop-in at `/public/assets/audio/website-opening.mp3`.
- **Phase 3 Preview**: Character & Story Experience — dedicated dossier inspection for Arjun Mehta and Kavya Rathore linked with territory nodes.
