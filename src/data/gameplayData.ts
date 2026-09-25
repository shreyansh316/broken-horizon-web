export interface EditorialBlock {
  id: string;
  number: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  quote: string;
  image: string;
  imageAlt: string;
}

export interface GameplaySectionItem {
  id: string;
  title: string;
  statement: string;
  description: string;
  details: string[];
  image: string;
  imageAlt: string;
}

export const editorialPillars: EditorialBlock[] = [
  {
    id: "explore",
    number: "01",
    tag: "OPEN EXPEDITION",
    title: "EXPLORE",
    headline: "Uncharted sand, forgotten stone, endless horizon.",
    description: "Cross cities, highways, villages, lakes and deserts. Broken Horizon renders Rajasthan not as a miniature theme park, but as an expansive frontier of stark contrasts — from towering sandstone bastions to solitary dunes that swallow roads overnight.",
    quote: "The road stretches beyond where maps end.",
    image: "/assets/images/hero/hero-desert-road.jpg",
    imageAlt: "Desert highway cutting through the rugged Thar terrain towards fortress silhouettes at sunset",
  },
  {
    id: "drive",
    number: "02",
    tag: "VEHICULAR MECHANICALS",
    title: "DRIVE",
    headline: "Weight, drift, terrain friction and throttle response.",
    description: "Motorcycles, cars and a growing fleet of tuned vehicles. Physics simulate sand washouts, tarmac heat-shimmer, and mechanical wear. Tune suspension damping for rocky canyon passes or strip chassis weight for flat desert speed runs.",
    quote: "Every corner demands respect for the machine.",
    image: "/assets/images/screenshots/screenshot-01.jpg",
    imageAlt: "Scrambler motorcycle speeding down a night asphalt highway past an ancient toll arch",
  },
  {
    id: "investigate",
    number: "03",
    tag: "ESPIONAGE & CLUES",
    title: "INVESTIGATE",
    headline: "Follow evidence. Question people. Discover what others want buried.",
    description: "The Horizon Corridor isn't just concrete; it's a surveillance corridor and private logistics empire. Intercept telemetry, photograph restricted compounds, examine physical freight manifests, and trace corrupt supply chains.",
    quote: "Truth is hidden where power builds its walls.",
    image: "/assets/images/screenshots/screenshot-04.jpg",
    imageAlt: "Subterranean stepwell investigation illuminated by tactical flashlight beams",
  },
  {
    id: "survive",
    number: "04",
    tag: "TACTICAL VIOLENCE",
    title: "SURVIVE",
    headline: "Combat, police pursuits and dangerous encounters.",
    description: "Grounded, lethal gunplay where ammunition is scarce and cover is fragile. High-speed roadblocks, private militia ambushes, and desert dust storms turn routine transit into desperate survival.",
    quote: "One mistake leaves you stranded in hostile sun.",
    image: "/assets/images/screenshots/screenshot-02.jpg",
    imageAlt: "Customized 4x4 vehicle drifting across desert dunes in high-speed evasion",
  },
  {
    id: "choose",
    number: "05",
    tag: "BRANCHING OUTCOMES",
    title: "CHOOSE",
    headline: "Your actions change relationships, missions and the final outcome.",
    description: "Faction loyalties shift dynamically. Choosing to deliver contraband freight for local haulers or handing over surveillance photos to state authorities alters border checkpoint hostility, garage access, and companion trust.",
    quote: "Every decision leaves an indelible mark.",
    image: "/assets/images/screenshots/screenshot-03.jpg",
    imageAlt: "Bustling dusk streets of Jaipur with vintage cars and neon storefronts",
  },
];

export const gameplayShowcase: GameplaySectionItem[] = [
  {
    id: "driving",
    title: "DRIVING",
    statement: "From crowded streets to open desert highways.",
    description: "Vehicles in Broken Horizon behave with real momentum and mechanical consequence. Feel the transition from wet urban cobblestones in Jaipur to loose desert shale on unmarked border routes.",
    details: [
      "Authentic wheel traction and tire deflation mechanics for sand",
      "Manual gear shifting, engine temperature and brake fade modeling",
      "Modular performance garages across major hub cities",
    ],
    image: "/assets/images/screenshots/screenshot-01.jpg",
    imageAlt: "Driving at night across highway",
  },
  {
    id: "combat",
    title: "COMBAT",
    statement: "Fight when the road gives you no other choice.",
    description: "Engagements are high-stakes, fast, and unforgiving. Scavenge ammunition, utilize vehicle chassis as mobile cover, and adapt to unpredictable terrain choke points.",
    details: [
      "Physicalized ballistic penetration through sheet metal and wood",
      "Dynamic suppression and disorienting dust washouts",
      "Field-improvised weapons and tactical gear loadouts",
    ],
    image: "/assets/images/screenshots/screenshot-02.jpg",
    imageAlt: "High-speed desert tactical pursuit",
  },
  {
    id: "investigation",
    title: "INVESTIGATION",
    statement: "Follow evidence. Question people. Discover what others want buried.",
    description: "No magic markers or floating breadcrumbs. Review telephoto photo rolls, listen in on shortwave frequencies, and interrogate informants at roadside dhabas.",
    details: [
      "Manual optical zoom and evidence logging with Kavya's telephoto kit",
      "Decryption of freight logs and confidential blueprints",
      "Informant trust system influenced by your reputation",
    ],
    image: "/assets/images/screenshots/screenshot-04.jpg",
    imageAlt: "Investigating subterranean stepwell ruins",
  },
  {
    id: "police",
    title: "POLICE",
    statement: "Every decision can bring attention.",
    description: "Law enforcement in the region operates through coordinated highway patrol units, spike strips, radio checkpoints, and rapid-response tactical teams.",
    details: [
      "Checkpoint evasion and false document presentation",
      "Radio frequency jamming to delay reinforcement calls",
      "Concealed off-road evasion routes through rocky canyons",
    ],
    image: "/assets/images/screenshots/screenshot-07.jpg",
    imageAlt: "Armed checkpoint surveillance along perimeter",
  },
  {
    id: "dynamic-world",
    title: "DYNAMIC WORLD",
    statement: "The world continues moving when you do.",
    description: "A continuous 24-hour day/night cycle with unpredictable meteorological events. Scorching mid-day mirages give way to icy desert nights and blinding haboob sandstorms.",
    details: [
      "Dynamic weather including dust storms and sudden monsoon squalls",
      "Living truck stop economies and traveling freight convoys",
      "Wildlife and rural communities reacting to local conflict",
    ],
    image: "/assets/images/screenshots/screenshot-03.jpg",
    imageAlt: "Living dynamic street in Jaipur at dusk",
  },
];
