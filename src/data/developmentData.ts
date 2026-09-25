export interface DevCategory {
  name: string;
  percentage: number;
  status: string;
}

export interface DevTimelineMilestone {
  id: string;
  phase: number;
  phaseCode: string;
  title: string;
  summary: string;
  status: "COMPLETED" | "IN DEVELOPMENT" | "PLANNED";
  highlights: string[];
}

export interface WorldArchitectureComparison {
  area: string;
  current: string;
  future: string;
}

export const worldArchitectureComparison: WorldArchitectureComparison[] = [
  { area: "Districts", current: "13 (Current planned roadmap)", future: "Up to 41 (Progressive expansion: 13 → 20 → 30 → 41)" },
  { area: "World target", current: "200 km² target playable world", future: "Expandable world grid" },
  { area: "Jaipur", current: "Primary starting region", future: "Continue expanding metropolis & outskirts" },
  { area: "Roads", current: "Regional highway & trail network", future: "Nationwide Rajasthan-style transit network" },
  { area: "Cities", current: "Current planned urban locations", future: "Additional cities, towns & villages" },
  { area: "Natural areas", current: "Desert, lakes, hills & forest", future: "More regional biomes & diverse topography" },
  { area: "NPCs", current: "Living-world crowd & worker system", future: "District-specific populations & routines" },
  { area: "Wildlife", current: "Core desert & scrub ecosystem", future: "Regional species & migration corridors" },
  { area: "Missions", current: "Current campaign & investigations", future: "Progressive expansion missions & case files" },
  { area: "Map system", current: "Streaming foundation", future: "More streamed dynamic regions & packages" },
];

export const developmentCategories: DevCategory[] = [
  { name: "SYSTEMS", percentage: 52, status: "Active Iteration" },
  { name: "WORLD", percentage: 46, status: "Greybox & Architecture" },
  { name: "MISSIONS", percentage: 38, status: "Objectives & Branching" },
  { name: "VEHICLES", percentage: 60, status: "Physics & Handling" },
  { name: "STORY", percentage: 48, status: "Dialogue & Scripting" },
];

export const developmentTimeline: DevTimelineMilestone[] = [
  {
    id: "phase-51",
    phase: 51,
    phaseCode: "PHASE 51+",
    title: "WORLD EXPANSION FRAMEWORK",
    summary: "Dedicated expansion architecture establishing district registries for up to 41 districts, allowing progressive releases (13 → 20 → 30 → 41) without redesigning core game systems.",
    status: "PLANNED",
    highlights: [
      "District registry & streamable district packages for up to 41 districts",
      "Dynamic world map & nationwide road/route connection expansion",
      "District metadata, city/town/village hierarchy, and landmark database",
      "District-specific NPC populations, regional wildlife, and climate profiles",
      "Mission/activity expansion hooks, save compatibility, and streaming budgets",
    ],
  },
  {
    id: "phase-21",
    phase: 21,
    phaseCode: "PHASE 21",
    title: "SHOPS, VENDORS & ECONOMY",
    summary: "Regional black-market chop shops, dhaba informants, parts trading and dynamic fuel economy balancing across desert districts.",
    status: "IN DEVELOPMENT",
    highlights: [
      "Dynamic fuel pricing influenced by regional control",
      "Informant trade network and evidence bartering",
      "Localized scrap and tuning merchant inventories",
    ],
  },
  {
    id: "phase-20",
    phase: 20,
    phaseCode: "PHASE 20",
    title: "INVENTORY, LOOT & EQUIPMENT",
    summary: "Physical vehicle trunk stowage, field tool degradation, radio decryptors, and encumbrance dynamics affecting stamina.",
    status: "COMPLETED",
    highlights: [
      "Physicalized vehicle boot grid storage",
      "Surveillance gear and radio scanner equipment slots",
      "Survival supplies, fuel canisters and repair kits",
    ],
  },
  {
    id: "phase-19",
    phase: 19,
    phaseCode: "PHASE 19",
    title: "PLAYER PROGRESSION",
    summary: "Reputation weighting with district haulers versus state authorities, tactical driving skills, and narrative dialogue branches.",
    status: "COMPLETED",
    highlights: [
      "Tactical vehicle control proficiency perks",
      "Faction trust meters across 13 districts",
      "Evidence-backed interrogation dialogues",
    ],
  },
  {
    id: "phase-18",
    phase: 18,
    phaseCode: "PHASE 18",
    title: "VEHICLE PROGRESSION & GARAGES",
    summary: "Modular chassis modification, sand tire deflation physics, suspension travel tuning, and garage workshops in Jaipur and Jodhpur.",
    status: "COMPLETED",
    highlights: [
      "Modular desert suspension and tire pressure physics",
      "Regional garage customization and custom body kits",
      "Engine thermals and fluid maintenance systems",
    ],
  },
  {
    id: "phase-17",
    phase: 17,
    phaseCode: "PHASE 17",
    title: "WORLD EVENTS",
    summary: "Dynamic roadside events, stranded convoys, spontaneous police checkpoints, and unpredictable sandstorm washouts.",
    status: "COMPLETED",
    highlights: [
      "Roadside ambushes and territory skirmishes",
      "Dynamic distress radio broadcasts",
      "Localized meteorological obstacles",
    ],
  },
  {
    id: "phase-16",
    phase: 16,
    phaseCode: "PHASE 16",
    title: "MISSION SYSTEM",
    summary: "Advanced objectives, branching narrative pathways, and multi-tier investigation assignments across western districts.",
    status: "COMPLETED",
    highlights: [
      "Non-linear mission progression structure",
      "Multiple tactical failure/success states",
      "Evidence-driven mission branching",
    ],
  },
  {
    id: "phase-15",
    phase: 15,
    phaseCode: "PHASE 15",
    title: "ENEMY AI & COMBAT ENCOUNTERS",
    summary: "Flanking maneuvers, vehicle pursuit tactics, suppressive fire behaviors, and dynamic vision cones in dusty environments.",
    status: "COMPLETED",
    highlights: [
      "Tactical squad coordination and cover usage",
      "High-speed ramming and pursuit AI",
      "Reduced visibility reaction under dust storms",
    ],
  },
  {
    id: "phase-14",
    phase: 14,
    phaseCode: "PHASE 14",
    title: "COMBAT FOUNDATION",
    summary: "Grounded firearm ballistics, physical weapon weight, bullet penetration through sheet metal, and tactile recoil curves.",
    status: "COMPLETED",
    highlights: [
      "Physicalized ballistic penetration through cover",
      "Realistic recoil impulse and weapon handling",
      "Tactical ammo scarcity balance",
    ],
  },
  {
    id: "phase-13",
    phase: 13,
    phaseCode: "PHASE 13",
    title: "DIALOGUE & CONVERSATION",
    summary: "Intonation-based conversation engine, conditional dialogue trees, and reputation gates with district brokers.",
    status: "COMPLETED",
    highlights: [
      "Interactive branching dialogue camera",
      "Evidence presentation prompts",
      "Subtle cinematic subtitle rendering",
    ],
  },
];
