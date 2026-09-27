export interface GameplayFeature {
  id: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface GamePillar {
  title: string;
  description: string;
}

export const gamePillars: GamePillar[] = [
  {
    title: "Open-World Exploration",
    description: "Traverse high-contrast terrain spanning sun-baked sand dunes, historic haveli complexes, mountain passes, and dense urban bazaars.",
  },
  {
    title: "Dynamic Driving & Tuned Fleet",
    description: "Master high-speed highway chases, desert washouts, and tight alleyway maneuvers behind the wheel of authentic tuned vehicles.",
  },
  {
    title: "Tactical Ground Combat",
    description: "Engage in grounded, high-stakes encounters where positioning, ammunition conservation, and environmental cover dictate survival.",
  },
  {
    title: "In-Depth Investigation",
    description: "Analyze photographic evidence, intercept telemetry, interrogate regional brokers, and untangle the illicit Horizon Corridor conspiracy.",
  },
  {
    title: "Dynamic Regional Events",
    description: "React to spontaneous highway roadblocks, sudden Thar sandstorms, cartel patrols, and emergent roadside emergencies.",
  },
  {
    title: "Multiple Story Outcomes",
    description: "Every decision leaves a permanent footprint across regional factions, companion trust, and the fate of western India's desert frontier.",
  },
];

export const gameplayFeatures: GameplayFeature[] = [
  {
    id: "explore",
    tag: "DISCOVERY",
    title: "EXPLORE",
    description: "Cross cities, highways, villages, lakes and deserts.",
    metric: "13",
    metricLabel: "Fictionalized Districts",
    iconName: "Compass",
  },
  {
    id: "drive",
    tag: "MOBILITY",
    title: "DRIVE",
    description: "Motorcycles, cars and a growing fleet of vehicles.",
    metric: "20+",
    metricLabel: "Vehicles Planned",
    iconName: "Gauge",
  },
  {
    id: "investigate",
    tag: "ESPIONAGE",
    title: "INVESTIGATE",
    description: "Follow evidence, question people and uncover hidden connections.",
    metric: "100%",
    metricLabel: "Player-Driven Clues",
    iconName: "Search",
  },
  {
    id: "survive",
    tag: "COMBAT",
    title: "SURVIVE",
    description: "Combat, police pursuits and dangerous encounters.",
    metric: "Real-time",
    metricLabel: "Threat Dynamics",
    iconName: "ShieldAlert",
  },
  {
    id: "choose",
    tag: "NARRATIVE",
    title: "CHOOSE",
    description: "Your actions can change relationships, missions and the final outcome.",
    metric: "Multi-path",
    metricLabel: "Branching Fates",
    iconName: "GitBranch",
  },
];
