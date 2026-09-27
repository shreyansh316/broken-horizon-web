# Broken Horizon — Website Content & Data Architecture Guide

All text, lore, telemetry, and district configurations are decoupled from UI components. This guide details how to modify the site's content via TypeScript data files.

---

## 1. Changing the Development Phase

Open `src/config/siteConfig.ts` (and `src/data/gameConfig.ts`):
```typescript
export const siteConfig: SiteConfig = {
  // Update phase number:
  developmentPhase: 22,
  developmentPhaseTotal: 50,
  // ...
};
```
The progress bar, hero badges, development section percentage calculation, and footer telemetry update automatically across the entire site.

---

## 2. Connecting Itch.io Later

In `src/config/siteConfig.ts`:
```typescript
export const siteConfig: SiteConfig = {
  // Replace empty string with your official itch.io page:
  itchUrl: "https://broken-horizon.itch.io/broken-horizon",
  // ...
};
```
Once configured, all "DOWNLOAD" and "PLAY" buttons across the navigation, download section, and modal change from disabled status to an active direct link.

---

## 3. Adding or Updating World Districts

Open `src/data/worldData.ts` and add or edit items in `worldRegions`:
```typescript
{
  id: "district-id",
  index: "14",
  name: "NEW DISTRICT",
  shortDescription: "Short one-sentence description.",
  fullDescription: "Detailed fictionalized environmental and lore description...",
  biome: "Biome Classification",
  image: "/assets/images/world/world-custom.jpg",
}
```

---

## 4. Adding Characters

Open `src/data/characterData.ts` and add entries to `characterProfiles`:
```typescript
{
  id: "character-id",
  name: "CHARACTER NAME",
  age: 30,
  origin: "CITY / REGION",
  role: "PRIMARY ROLE",
  tagline: "Short dramatic tagline.",
  description: "Official bio statement.",
  extendedBackground: "Multi-paragraph narrative background...",
  dossierNumber: "DOSSIER // 03-XX-30",
  image: "/assets/images/characters/character-custom.jpg",
  quote: "Direct character quote...",
  specs: [
    { label: "PRIMARY VEHICLE", value: "Vehicle Name" },
    { label: "EXPERTISE", value: "Core Skills" },
  ],
}
```

---

## 5. Adding Development Log Milestones

Open `src/data/developmentData.ts` and add a milestone to `developmentTimeline`:
```typescript
{
  id: "phase-22",
  phase: 22,
  phaseCode: "PHASE 22",
  title: "DYNAMIC WEATHER & DUST STORMS",
  summary: "Volumetric haboobs, mirage shaders, and wind vector drag on high-profile vehicles.",
  status: "IN DEVELOPMENT", // "COMPLETED" | "IN DEVELOPMENT" | "PLANNED"
  highlights: [
    "Volumetric sand particle occlusion",
    "Heat mirage shader along highway horizons",
    "Dynamic wind steering impact",
  ],
}
```

---

## 6. Updating Media Tabs & Fallbacks

Open `src/data/mediaData.ts`:
- Update `screenshotsData` with new frames.
- When ready to release concept sketches or video walkthroughs, place files into `public/assets/images/artwork/` or `public/assets/videos/` and toggle the corresponding tab in `src/components/Media/MediaSection.tsx`.
