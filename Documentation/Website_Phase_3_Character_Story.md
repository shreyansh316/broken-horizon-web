# Broken Horizon — Website Phase 3: Character Dossiers & Story Investigation Board

## 1. Executive Summary
Website Phase 3 delivers two core narrative experiences for **Broken Horizon**:
1. **Operative Character Dossiers (`/characters`)**: In-depth intelligence files for protagonists **Arjun Mehta** and **Kavya Rathore**, featuring interactive tactical gear loadouts, vehicle telemetry, simulated audio intercepts with waveform visualizations, and relationship network matrices.
2. **Conspiracy Corkboard & Case Files (`/story`)**: An in-universe detective corkboard set in a clandestine safehouse, featuring inspectable evidence items connected by dynamic red thread lines, confidential field notes, and a 6-chapter branching narrative progression.

---

## 2. Directory & Component Architecture

```text
src/
├── components/
│   ├── CharacterExplorer/
│   │   ├── CharacterExplorer.tsx            # Master coordinator & sub-tab switcher
│   │   ├── CharacterDossierCard.tsx         # Operative identity, biometric stamps & briefing
│   │   ├── CharacterLoadout.tsx             # Interactive gear inspection & operational metrics
│   │   ├── CharacterVehicleSpecs.tsx        # Vehicle telemetry, chassis & evasion countermeasures
│   │   ├── CharacterAudioLogs.tsx           # Radio intercepts, animated waveforms & transcripts
│   │   └── CharacterRelationshipMatrix.tsx  # Operative network linkage & threat assessment
│   │
│   └── StoryBoard/
│       ├── StoryBoard.tsx                   # Master conspiracy corkboard & timeline coordinator
│       ├── EvidenceCard.tsx                 # Pinned evidence exhibits (blueprints, tapes, photos)
│       ├── EvidenceModal.tsx                # Classified dossier examination with linked threads
│       └── TimelineChapters.tsx             # 6-chapter branching investigation arc
│
├── data/
│   ├── characterData.ts                     # Extended operative profiles, loadouts & audio transcripts
│   └── storyData.ts                         # Case files, evidence items & chapter synopses
│
└── styles/
    ├── characterExplorer.css                # Tactical dossier layouts, tabs & mobile styles
    └── storyBoard.css                       # Safehouse corkboard, red threads & evidence modals
```

---

## 3. Character Dossier System (`/characters`)

### Operatives Featured
- **Arjun Mehta (`WRENCH-01`)**:
  - Age: 29 | Origin: Jaipur | Role: Driver / Mechanic
  - Status: *Target of Interest*
  - Vehicle: *Horizon Marauder 4x4 (Custom 'Sandfang')* (Twin-turbo 3.8L V6, 485 BHP, Level B6 Ballistic Glass)
  - Key Loadout: Custom Tuned OBD Diagnostic Hacker, Pneumatic Heavy Impact Wrench, Low-Profile Night Optics
  - Audio Logs: *Jaipur Bypass Radio Intercept*, *Mehta Garage Voice Memo*
- **Kavya Rathore (`LENS-02`)**:
  - Age: 27 | Origin: Udaipur | Role: Investigative Photojournalist
  - Status: *Wanted*
  - Vehicle: *Recon Motorbike (Custom 'Ghost-250')* (450cc Dual-Sport, Acoustic Baffle Exhaust Silencer)
  - Key Loadout: Modified Mirrorless Telephoto Rig (400mm f/2.8), Software-Defined Tactical Radio Scanner (SDR), Forged State Press Pass
  - Audio Logs: *Udaipur Press Bureau Dictation*, *Field Recording: Lake Pichola Boat Shed*

### Sub-Tab Navigation
- **DOSSIER OVERVIEW**: Biometrics, background intelligence, and operational specs.
- **LOADOUT & GEAR**: Interactive hardware inspection with real-time metric cards.
- **VEHICLE & MOBILITY**: Full drivetrain, top velocity, armor ratings, and field modifications.
- **AUDIO LOGS & WIRETAPS**: Simulated playback with dynamic waveform bars and decrypted transcripts.
- **NETWORK & TARGET MATRIX**: Alliance and threat connections to Director Vikram Sen and Minister Shekhawat.

---

## 4. Conspiracy Corkboard System (`/story`)

### Pinned Evidence Exhibits
1. `ev-01-blueprint`: Logistics Corridor Blueprint Sector 04 (Subterranean optical fiber conduits)
2. `ev-02-manifest`: Falsified Freight Manifest #881-B (Overweight contraband hydraulic shipment)
3. `ev-03-wiretap`: Police Scanner Intercept Tape #09 (Private contractor pursuit orders)
4. `ev-04-photo-kavya`: Surveillance Photo: Secret Night Rendezvous (Minister Shekhawat exchange)
5. `ev-05-photo-convoy`: Midnight Unmarked Hauler Convoy (NH-68 Barmer border passage)
6. `ev-06-drive`: Corrupted Telemetry Flash Drive (Recovered from Taragarh Spire)

### Dynamic Thread Connections
SVG lines with animated red dashed styling connect related evidence nodes across the corkboard surface, mimicking a physical investigation board in an off-grid safehouse.

### Chapter Progression
- **Chapter 1: The First Road** (Act I // Jaipur bypass escape)
- **Chapter 2: The Severed Line** (Act I // Dausa stepwell shelter & decryption)
- **Chapter 3: Night Sluices** (Act II // Kota riverfront gala infiltration)
- **Chapter 4: Blue Shadows** (Act II // Jodhpur Western Freight Terminal upload)
- **Chapter 5: Dune Protocol** (Act III // Thar desert sandstorm pursuit)
- **Chapter 6: The Broken Horizon** (Act III // Final corridor network confrontation)

---

## 5. URL Architecture & Browser Navigation

- `/`: Official Homepage with interactive teasers linking to all dedicated experiences.
- `/world`: Territory Atlas (Phase 2).
- `/characters` & `/characters/:characterId`: Dedicated Character Dossier Experience.
- `/story`: Clandestine Investigation Corkboard & Narrative Chapter Arc.
- Full browser history synchronization (`pushState`, `popstate`, hash fallbacks).

---

## 6. Verification Status
- Production Build: `PASS` (Built in 772ms)
- Console Errors: `0`
- Responsive Tested: Desktop (1920x1080), Tablet (1024x768), Mobile (390x844)
