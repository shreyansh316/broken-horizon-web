# Broken Horizon — Asset Replacement & Media Guide

This guide describes how to manage and replace visual, video, and audio assets in the Broken Horizon website.

---

## 1. Directory Structure Overview

All static media assets reside in `/public/assets/`:

```text
public/assets/
├── audio/
│   └── website-opening.mp3              # Optional ambient background audio
├── icons/
│   └── favicon.svg                      # Original BH monogram vector icon
├── images/
│   ├── hero/
│   │   ├── hero-desert-road.jpg         # Primary cinematic landscape background
│   │   └── hero-jaipur-road.jpg         # Alternate city highway visual
│   ├── world/
│   │   ├── world-jaipur.jpg
│   │   ├── world-jodhpur.jpg
│   │   ├── world-jaisalmer.jpg
│   │   └── world-dausa.jpg
│   ├── characters/
│   │   ├── character-arjun.jpg          # Arjun Mehta workshop dossier visual
│   │   └── character-kavya.jpg          # Kavya Rathore surveillance visual
│   ├── screenshots/
│   │   ├── screenshot-01.jpg            # Night Highway Pursuit (16:9)
│   │   ├── screenshot-02.jpg            # Dune Traversal at Sundown (16:9)
│   │   ├── screenshot-03.jpg            # Terracotta Bazaar Traffic (16:9)
│   │   ├── screenshot-04.jpg            # Subterranean Anomaly (16:9)
│   │   ├── screenshot-05.jpg            # Highway Overlook at Golden Hour (16:9)
│   │   ├── screenshot-06.jpg            # Nocturnal Repair Bay (16:9)
│   │   ├── screenshot-07.jpg            # Perimeter Reconnaissance (16:9)
│   │   └── screenshot-08.jpg            # Corridor Transit Arch (16:9)
│   ├── artwork/                         # Concept sketches and matte paintings
│   ├── ui/
│   │   └── social-preview.jpg           # Open Graph sharing banner (1200x630)
│   └── trailer-poster.jpg               # Video player fallback poster
└── videos/
    ├── broken-horizon-trailer.mp4       # In-engine official trailer
    └── website-opening.mp4              # Optional cinematic opening loop
```

---

## 2. Replacing the Hero Image

1. Render or export your artwork at `3840×2160` (or `2560×1440`), optimized `.jpg` or `.webp` format.
2. Save it directly to:
   ```text
   public/assets/images/hero/hero-desert-road.jpg
   ```
3. The component automatically layers the parallax shift, film grain, and subtle atmospheric dust over the new file.

---

## 3. Replacing the Official Trailer

1. Export your in-engine teaser encoded in **H.264 / AAC MP4** (recommended 1080p or 4K, 60fps).
2. Save the video to:
   ```text
   public/assets/videos/broken-horizon-trailer.mp4
   ```
3. Export an uncompressed frame as the poster image to:
   ```text
   public/assets/images/trailer-poster.jpg
   ```
4. If the video file is missing, the player automatically falls back to displaying the poster with a "Coming Soon" notification.

---

## 4. Replacing Screenshot Gallery Items

The gallery showcases 8 dedicated in-engine captures:
1. Save each screenshot to `public/assets/images/screenshots/screenshot-01.jpg` through `screenshot-08.jpg`.
2. Recommended resolution: `1920×1080` or `2560×1440`.
3. To update titles, locations, and captions, open `src/data/mediaData.ts` and modify the corresponding entry in `screenshotsData`.

---

## 5. Adding Character Imagery

1. Place your character visual in `public/assets/images/characters/`.
2. Recommended portrait aspect ratio: `3:4` or `4:5`.
3. Update the `image` field in `src/data/characterData.ts`.

---

## 6. Audio System Integration

1. To enable ambient audio during the opening intro, place an ambient loop (desert wind / low synthesizer drone) at:
   ```text
   public/assets/audio/website-opening.mp3
   ```
2. The site's `IntroAudioControl` checks for this asset and remembers visitor mute/unmute preferences locally via `localStorage.getItem('bh_audio_enabled')`.
