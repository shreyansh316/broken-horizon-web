export type DiscoveryStatus = 'Available' | 'Discovered' | 'Featured' | 'Locked';

export interface MapLandmark {
  id: string;
  name: string;
  districtId: string;
  type: 'landmark' | 'garage' | 'story' | 'character' | 'activity' | 'safehouse';
  x: number;
  y: number;
  description: string;
  affiliation?: string;
}

export interface MapRoute {
  id: string;
  name: string;
  fromId: string;
  toId: string;
  path: string;
  type: 'primary' | 'secondary' | 'corridor';
  distanceKm: number;
  description: string;
}

export interface WorldRegion {
  id: string;
  index: string;
  name: string;
  displayName: string;
  region: string;
  shortDescription: string;
  fullDescription: string;
  description: string; // for backward compatibility
  biome: string;
  coordinates: string; // in-game grid coordinate
  mapCoordinates: { x: number; y: number };
  mapPath: string; // SVG path string
  colorAccent: string;
  populationStyle: string;
  terrain: string;
  climate: string;
  majorLocations: string[];
  landmarks: MapLandmark[];
  activities: string[];
  storyLocations: string[];
  travelTime: string;
  discoveryState: DiscoveryStatus;
  featured: boolean;
  image: string;
  gallery: string[];
  quote: string;
  characterAffiliation?: {
    name: 'Arjun Mehta' | 'Kavya Rathore';
    role: string;
  };
}

export const worldRegions: WorldRegion[] = [
  {
    id: "jaipur",
    index: "01",
    name: "JAIPUR",
    displayName: "Jaipur Metropolitan & Highway Hub",
    region: "Central-East Territory",
    shortDescription: "The journey begins in the Pink City.",
    description: "The journey begins in a sprawling city of old walls, crowded markets, workshops, highways and hidden corridors.",
    fullDescription: "Dense urban grid of historic terracotta facades, crowded alleyways, underground chop shops, and the neon-streaked highway junction where Arjun operates Mehta Garage.",
    biome: "Urban Metropolis",
    coordinates: "BH-RAJ-01 / GRID 68-34",
    mapCoordinates: { x: 680, y: 340 },
    mapPath: "M 610,280 L 730,270 L 765,340 L 740,410 L 650,425 L 600,360 Z",
    colorAccent: "#d97736",
    populationStyle: "Dense Urban / Political",
    terrain: "Urban / Semi-arid / Industrial Outskirts",
    climate: "Dry Heat & Dust Haze (36°C)",
    majorLocations: [
      "Mehta Garage",
      "Jaipur Police Yard",
      "Old Pink Bazaar",
      "Horizon Logistics Terminal 01",
      "Sanganer Industrial Loop",
      "Amber Fort Outer Ramparts"
    ],
    landmarks: [
      {
        id: "lm-jaipur-garage",
        name: "Mehta Garage",
        districtId: "jaipur",
        type: "garage",
        x: 670,
        y: 335,
        description: "Arjun's primary automotive tuning and repair compound.",
        affiliation: "Arjun Mehta"
      },
      {
        id: "lm-jaipur-yard",
        name: "Jaipur Police Yard",
        districtId: "jaipur",
        type: "story",
        x: 700,
        y: 315,
        description: "Heavy impound lot and surveillance monitoring hub."
      },
      {
        id: "lm-jaipur-amber",
        name: "Amber Gate",
        districtId: "jaipur",
        type: "landmark",
        x: 645,
        y: 295,
        description: "Historic sandstone checkpoint guarding the northern gateway."
      }
    ],
    activities: [
      "Vehicle Tuning",
      "Underground Street Racing",
      "Surveillance Interception",
      "Police Evasion",
      "Bazaar Infiltration"
    ],
    storyLocations: [
      "Mehta Garage",
      "Horizon Yard 01",
      "Central Secretariat Gate"
    ],
    travelTime: "Starting Point",
    discoveryState: "Available",
    featured: true,
    image: "/assets/images/world/world-jaipur.jpg",
    gallery: [
      "/assets/images/world/world-jaipur.jpg",
      "/assets/images/screenshots/screenshot-01.jpg",
      "/assets/images/hero/hero-jaipur-road.jpg"
    ],
    quote: "Every road in Jaipur starts with an engine and ends with a question.",
    characterAffiliation: {
      name: "Arjun Mehta",
      role: "Base of Operations & Mechanical Chop Shop"
    }
  },
  {
    id: "dausa",
    index: "02",
    name: "DAUSA",
    displayName: "Dausa Stepwell Corridors",
    region: "Eastern Transport Gateway",
    shortDescription: "Subterranean stepwells and silent crossroad freight stops.",
    description: "An eastern transition district carved with dry plains, highway arteries, and ancient subterranean stepwell caches.",
    fullDescription: "Ancient subterranean architecture and weathered transit crossroads where haulers refuel and black-market couriers swap cargo under the radar.",
    biome: "Stepwell Corridor",
    coordinates: "BH-RAJ-02 / GRID 81-36",
    mapCoordinates: { x: 810, y: 360 },
    mapPath: "M 765,340 L 870,310 L 890,390 L 840,430 L 760,410 Z",
    colorAccent: "#c28854",
    populationStyle: "Rural Transit / Freight Junctions",
    terrain: "Dry Plains / Road Corridors / Small Settlements",
    climate: "Arid Scrub (38°C)",
    majorLocations: [
      "Abhaneri Subterranean Cache",
      "Dausa Freight Weigh Station",
      "Old Toll Plaza 09",
      "Bhandarej Crossroad"
    ],
    landmarks: [
      {
        id: "lm-dausa-stepwell",
        name: "Sunken Stepwell Depot",
        districtId: "dausa",
        type: "landmark",
        x: 815,
        y: 350,
        description: "Hidden subterranean vault used for off-the-books courier handoffs."
      }
    ],
    activities: [
      "Long-Haul Interception",
      "Subterranean Exploration",
      "Bounty Hunting",
      "Contraband Drops"
    ],
    storyLocations: ["Dausa Freight Weigh Station", "Stepwell Vault"],
    travelTime: "45 mins via NH-21",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/world/world-dausa.jpg",
    gallery: [
      "/assets/images/world/world-dausa.jpg",
      "/assets/images/screenshots/screenshot-05.jpg"
    ],
    quote: "If you want something buried deep, bring it to Dausa."
  },
  {
    id: "sawai-madhopur",
    index: "03",
    name: "SAWAI MADHOPUR",
    displayName: "Sawai Madhopur Ravines & Forests",
    region: "Southeastern Wildlands",
    shortDescription: "Scrub forests, jagged ravines and abandoned hunting lodges.",
    description: "A wild natural sanctuary framed by dramatic rocky plateaus, dense scrub forests, and isolated off-grid settlements.",
    fullDescription: "Perilous cliffside hairpin turns hugging the Aravalli belt. Home to secluded cartel hideouts, dense forest tracks, and treacherous night roads.",
    biome: "Highland Scrub & Wildlands",
    coordinates: "BH-RAJ-03 / GRID 82-50",
    mapCoordinates: { x: 820, y: 500 },
    mapPath: "M 760,410 L 840,430 L 890,490 L 870,570 L 780,550 L 755,480 Z",
    colorAccent: "#6b8e53",
    populationStyle: "Sparse Forest Communities",
    terrain: "Forest / Rocky Terrain / Open Ravines",
    climate: "Dense Canopy Humidity (32°C)",
    majorLocations: [
      "Ranthambore Valley Pass",
      "Old Hunting Lodge Hideout",
      "Ravine Crossing Trestle",
      "Horizon Forestry Compound"
    ],
    landmarks: [
      {
        id: "lm-swm-lodge",
        name: "Cliffside Lodge Hideout",
        districtId: "sawai-madhopur",
        type: "safehouse",
        x: 825,
        y: 510,
        description: "Disused stone pavilion offering high vantage reconnaissance."
      }
    ],
    activities: [
      "Off-Road Trail Climbing",
      "Wildlife Reconnaissance",
      "Silent Takedowns",
      "Convoy Ambush"
    ],
    storyLocations: ["Ravine Crossing Trestle", "Lodge Compound"],
    travelTime: "1 hr 15 mins via MDR-111",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/hero/hero-desert-road.jpg",
    gallery: [
      "/assets/images/hero/hero-desert-road.jpg",
      "/assets/images/screenshots/screenshot-04.jpg"
    ],
    quote: "The road ends where the jungle remembers its old teeth."
  },
  {
    id: "kota",
    index: "04",
    name: "KOTA",
    displayName: "Kota Industrial Basin & Riverfront",
    region: "Chambal Valley Infrastructure",
    shortDescription: "Heavy concrete sluices and industrial river basins.",
    description: "A massive industrial riverfront district dominated by hydroelectric dams, factories, railway classification yards, and corporate surveillance.",
    fullDescription: "Towering power plant cooling stacks, railway yards, and massive Chambal river floodgates harboring corporate surveillance bunkers.",
    biome: "Industrial Basin",
    coordinates: "BH-RAJ-04 / GRID 80-68",
    mapCoordinates: { x: 800, y: 680 },
    mapPath: "M 780,550 L 870,570 L 880,670 L 820,760 L 740,730 L 750,620 Z",
    colorAccent: "#4a7c8c",
    populationStyle: "Industrial Labor & Engineering Densities",
    terrain: "Urban / River Sluices / Industrial Warehouses",
    climate: "Smog & River Mist (33°C)",
    majorLocations: [
      "Chambal Floodgate Complex",
      "Thermal Plant Perimeter",
      "Kota Railyard Terminal",
      "Horizon Power Substation 04"
    ],
    landmarks: [
      {
        id: "lm-kota-sluice",
        name: "Chambal Sluice Complex",
        districtId: "kota",
        type: "landmark",
        x: 805,
        y: 690,
        description: "Massive concrete dam regulating water flow and telemetry cables."
      }
    ],
    activities: [
      "Industrial Sabotage",
      "Night Speedboat Crossings",
      "Power Grid Hacking",
      "Railyard Heists"
    ],
    storyLocations: ["Chambal Sluice Complex", "Substation 04"],
    travelTime: "1 hr 40 mins via NH-52",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/screenshots/screenshot-04.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-04.jpg"
    ],
    quote: "Power flows through the concrete, but control flows under it."
  },
  {
    id: "bundi",
    index: "05",
    name: "BUNDI",
    displayName: "Bundi Fortress & Terraced Ridges",
    region: "Hadoti Hills",
    shortDescription: "Terraced hill fortresses and cascading stone reservoirs.",
    description: "Historic hill district woven through dramatic canyon ridges, azure-washed houses, and steep stone-cut switchbacks.",
    fullDescription: "Faded blue-washed hillside alleys and medieval water catchments where illegal telemetry relay repeaters have been installed in secret.",
    biome: "Fortress Ridge",
    coordinates: "BH-RAJ-05 / GRID 73-58",
    mapCoordinates: { x: 730, y: 580 },
    mapPath: "M 670,540 L 755,480 L 780,550 L 750,620 L 685,640 Z",
    colorAccent: "#5b6e8a",
    populationStyle: "Ancient Clifftop City",
    terrain: "Hills / Old City / Terraced Fort Region",
    climate: "Temperate Ridge Winds (29°C)",
    majorLocations: [
      "Taragarh Citadel Spire",
      "Raniji Stepwell Network",
      "Bundi Blue Quarter",
      "The Switchback Crest"
    ],
    landmarks: [
      {
        id: "lm-bundi-spire",
        name: "Taragarh Spire",
        districtId: "bundi",
        type: "landmark",
        x: 725,
        y: 575,
        description: "Clifftop fortress tower broadcasting pirate radio transmissions."
      }
    ],
    activities: [
      "Clifftop Drifting",
      "Rooftop Navigation",
      "Antenna Jamming",
      "Historic Relic Scouting"
    ],
    storyLocations: ["Taragarh Spire", "Blue Quarter Safehouse"],
    travelTime: "50 mins from Kota",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/screenshots/screenshot-06.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-06.jpg"
    ],
    quote: "The highest walls always hide the deepest secrets."
  },
  {
    id: "ajmer",
    index: "06",
    name: "AJMER",
    displayName: "Ajmer Crossroads & Valley Hub",
    region: "Central Transit Spine",
    shortDescription: "Sacred mountain passes and tight highway transit gates.",
    description: "The beating heart of Rajasthan's highway infrastructure, where east meets west through tight mountain passes and strategic police checkpoints.",
    fullDescription: "A strategic chokepoint nestled in the valley between rocky hills. Heavy police checkpoints guard every vehicle crossing between Jaipur, Jodhpur, and Udaipur.",
    biome: "Transit Chokepoint",
    coordinates: "BH-RAJ-06 / GRID 55-46",
    mapCoordinates: { x: 550, y: 460 },
    mapPath: "M 520,400 L 650,425 L 670,540 L 590,560 L 510,480 Z",
    colorAccent: "#b56938",
    populationStyle: "High Density Transit & Pilgrimage",
    terrain: "Urban / Mountain Gaps / Dry Plains",
    climate: "Dry Highland Sun (34°C)",
    majorLocations: [
      "Taragarh Pass Highway Gate",
      "Ana Sagar Causeway",
      "Central Interchange Checkpoint 03",
      "Ajmer Railway Workshop"
    ],
    landmarks: [
      {
        id: "lm-ajmer-gate",
        name: "Taragarh Pass Gate",
        districtId: "ajmer",
        type: "story",
        x: 555,
        y: 455,
        description: "Fortified state transport barrier with biometric scanner towers."
      }
    ],
    activities: [
      "Checkpoint Breaching",
      "High-Speed Pursuit",
      "Fuel Tanker Hijacking",
      "Market Surveillance"
    ],
    storyLocations: ["Taragarh Pass Gate", "Ana Sagar Causeway"],
    travelTime: "1 hr 10 mins from Jaipur",
    discoveryState: "Available",
    featured: true,
    image: "/assets/images/screenshots/screenshot-01.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-01.jpg"
    ],
    quote: "All roads run through Ajmer, but none leave without a toll."
  },
  {
    id: "pali",
    index: "07",
    name: "PALI",
    displayName: "Pali Textile Plains & Straightaway Flats",
    region: "Mid-Western Corridor",
    shortDescription: "Dry riverbeds, dye mills and flat freight horizons.",
    description: "Vast flat horizon crossed by dead-straight asphalt ribbons, textile industrial settlements, and dry sandy riverbeds.",
    fullDescription: "Vast flat horizons cut by industrial dye wash basins and long straight stretches of blacktop where tuned sedans reach top velocity without speed traps.",
    biome: "Textile Flats",
    coordinates: "BH-RAJ-07 / GRID 44-54",
    mapCoordinates: { x: 440, y: 540 },
    mapPath: "M 410,480 L 510,480 L 500,600 L 420,620 L 370,550 Z",
    colorAccent: "#a8754b",
    populationStyle: "Industrial Outskirts & Pastoral",
    terrain: "Dry Plains / Rocky Landscape / Flat Blacktop",
    climate: "Blistering Open Sun (37°C)",
    majorLocations: [
      "Bandi River Dry Crossing",
      "Textile Mill Complex 07",
      "Highway Strip Aerodrome",
      "Sojat Henna Scrublands"
    ],
    landmarks: [
      {
        id: "lm-pali-strip",
        name: "Highway Strip Aerodrome",
        districtId: "pali",
        type: "activity",
        x: 445,
        y: 535,
        description: "Abandoned emergency runway used for midnight drag testing."
      }
    ],
    activities: [
      "Top-Speed Velocity Runs",
      "Smuggling Drop Recovery",
      "Dry River Bed Escapes",
      "Drone Interception"
    ],
    storyLocations: ["Highway Strip Aerodrome", "Mill Complex 07"],
    travelTime: "55 mins from Ajmer",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/hero/hero-desert-road.jpg",
    gallery: [
      "/assets/images/hero/hero-desert-road.jpg"
    ],
    quote: "Out here, there are no mirrors—only the road ahead and the dust behind."
  },
  {
    id: "jodhpur",
    index: "08",
    name: "JODHPUR",
    displayName: "Jodhpur Blue Bastion & Western Metro",
    region: "Marwar Capital Region",
    shortDescription: "Stone, steel and roads stretching toward the west.",
    description: "A monumental city crowned by the imposing Mehrangarh-inspired fortress, indigo stone alleyways, and the Western Freight Terminal.",
    fullDescription: "Looming clifftop battlements casting long shadows across indigo alleys, fortified gates, high-stakes clandestine garages, and industrial export hubs.",
    biome: "Sun Fortress",
    coordinates: "BH-RAJ-08 / GRID 38-39",
    mapCoordinates: { x: 380, y: 390 },
    mapPath: "M 310,330 L 460,330 L 510,400 L 410,480 L 300,430 Z",
    colorAccent: "#386fb3",
    populationStyle: "Major Western City / Mercantile",
    terrain: "Urban / Monolithic Rock / Desert Edge",
    climate: "Dry Intense Heat (39°C)",
    majorLocations: [
      "Red Citadel Fortress",
      "Western Freight Terminal",
      "Clock Tower Underground Market",
      "Mandore Shadow Canal",
      "Airbase Outer Perimeter"
    ],
    landmarks: [
      {
        id: "lm-jodhpur-citadel",
        name: "Red Citadel",
        districtId: "jodhpur",
        type: "landmark",
        x: 375,
        y: 380,
        description: "Massive monolithic sandstone stronghold overlooking the city."
      },
      {
        id: "lm-jodhpur-terminal",
        name: "Western Freight Terminal",
        districtId: "jodhpur",
        type: "story",
        x: 405,
        y: 410,
        description: "Primary logistics sorting junction for Horizon Corridor trains."
      }
    ],
    activities: [
      "Citadel Wall Climb",
      "Heavy Vehicle Hijacking",
      "Black Market Brokerage",
      "Alleyway Motorcycle Escapes"
    ],
    storyLocations: ["Western Freight Terminal", "Red Citadel Vault"],
    travelTime: "1 hr 30 mins from Pali",
    discoveryState: "Available",
    featured: true,
    image: "/assets/images/world/world-jodhpur.jpg",
    gallery: [
      "/assets/images/world/world-jodhpur.jpg",
      "/assets/images/screenshots/screenshot-07.jpg"
    ],
    quote: "Blue stone by day, long shadows by night."
  },
  {
    id: "jaisalmer",
    index: "09",
    name: "JAISALMER",
    displayName: "Jaisalmer Dune Sea & Golden Gate",
    region: "Deep Thar Desert",
    shortDescription: "Where the horizon disappears into sand.",
    description: "The deep desert frontier of rolling sand dunes, isolated golden citadels, massive wind turbine fields, and ancient ghost ruins.",
    fullDescription: "Golden sandstone citadels rising above rolling dunes, solitary wind turbine farms, remote radar installations buried in sand, and endless driving lines.",
    biome: "Golden Dune Sea",
    coordinates: "BH-RAJ-09 / GRID 18-34",
    mapCoordinates: { x: 180, y: 340 },
    mapPath: "M 90,240 L 260,220 L 310,330 L 250,420 L 120,430 L 80,320 Z",
    colorAccent: "#cca139",
    populationStyle: "Isolated Desert Outposts",
    terrain: "Deep Desert / Sand Dunes / Exposed Caprock",
    climate: "Extreme Desert Heat & Sandstorms (44°C)",
    majorLocations: [
      "Golden Gate Citadel",
      "Desert Relay Station 09",
      "Sam Dune Wind Farm",
      "Kuldhara Forgotten Ruins",
      "Deep Horizon Testing Range"
    ],
    landmarks: [
      {
        id: "lm-jaisalmer-gate",
        name: "Golden Gate",
        districtId: "jaisalmer",
        type: "landmark",
        x: 185,
        y: 330,
        description: "Colossal fortified portal carved directly into living sandstone."
      },
      {
        id: "lm-jaisalmer-relay",
        name: "Desert Relay Station 09",
        districtId: "jaisalmer",
        type: "story",
        x: 140,
        y: 375,
        description: "Subsurface military communication dish buried in shifting sand."
      }
    ],
    activities: [
      "Extreme Sand Dune Driving",
      "Sandstorm Survival Expeditions",
      "Ruined Temple Exploration",
      "Long-Range Sniper Recon"
    ],
    storyLocations: ["Desert Relay Station 09", "Golden Gate Citadel"],
    travelTime: "2 hrs 45 mins from Jodhpur",
    discoveryState: "Available",
    featured: true,
    image: "/assets/images/world/world-jaisalmer.jpg",
    gallery: [
      "/assets/images/world/world-jaisalmer.jpg",
      "/assets/images/screenshots/screenshot-08.jpg"
    ],
    quote: "The desert forgives neither speed nor hesitation."
  },
  {
    id: "barmer",
    index: "10",
    name: "BARMER",
    displayName: "Barmer Frontier & Petroleum Scrub",
    region: "Southwestern Borderland",
    shortDescription: "Border oil pipelines and sun-bleached asphalt frontiers.",
    description: "Sun-bleached border frontier crisscrossed with oil pumpjacks, surveillance perimeter fences, and pipeline access corridors.",
    fullDescription: "Extreme Thar desert frontier territory. Sun-bleached roads, perimeter patrol towers, pipeline stations, and clandestine border crossings.",
    biome: "Desert Frontier",
    coordinates: "BH-RAJ-10 / GRID 23-58",
    mapCoordinates: { x: 230, y: 580 },
    mapPath: "M 120,430 L 250,420 L 300,430 L 340,550 L 260,660 L 130,640 Z",
    colorAccent: "#8f5e36",
    populationStyle: "Petroleum Enclaves & Border Outposts",
    terrain: "Desert / Rocky Plains / Pipeline Corridors",
    climate: "Blistering Arid Frontier (43°C)",
    majorLocations: [
      "Mangala Crude Pumping Station",
      "Border Fence Sector 14",
      "Asphalt Frontier Junction",
      "Horizon Refinery Perimeter"
    ],
    landmarks: [
      {
        id: "lm-barmer-pumps",
        name: "Horizon Pumping Station 02",
        districtId: "barmer",
        type: "story",
        x: 235,
        y: 570,
        description: "Heavy crude distribution terminal feeding the secret pipeline network."
      }
    ],
    activities: [
      "Pipeline Valve Sabotage",
      "Border Patrol Infiltration",
      "Fuel Tanker Convoy Interception",
      "Desert Dust Drifting"
    ],
    storyLocations: ["Horizon Pumping Station 02", "Border Sector 14"],
    travelTime: "2 hrs from Jaisalmer",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/screenshots/screenshot-02.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-02.jpg"
    ],
    quote: "Out here, black gold buys more silence than gold ever did."
  },
  {
    id: "udaipur",
    index: "11",
    name: "UDAIPUR",
    displayName: "Udaipur Lake Sanctuaries & Emerald Hills",
    region: "Southern Lake Territory",
    shortDescription: "Lakeside sanctuaries and fortified island estates.",
    description: "Lakeside sanctuaries, mountain roads, marble palaces, and scenic waterfront promenades where Kavya investigates hidden corruption.",
    fullDescription: "Palatial marble islands surrounded by tranquil waters, narrow hillside villas, high-society gala grounds, and clandestine water escape routes.",
    biome: "Lake Sanctuary",
    coordinates: "BH-RAJ-11 / GRID 47-77",
    mapCoordinates: { x: 470, y: 770 },
    mapPath: "M 410,700 L 520,680 L 570,760 L 510,850 L 400,830 L 370,750 Z",
    colorAccent: "#318274",
    populationStyle: "Lakeside Aristocracy & Artists",
    terrain: "Lakes / Steep Hills / Green Valleys",
    climate: "Humid Mountain Breeze (28°C)",
    majorLocations: [
      "Bluewater Promenade",
      "Pichola Island Palace",
      "Monsoon Palace Overlook",
      "Rathore Press Bureau",
      "Sajjangarh Ridge Highway"
    ],
    landmarks: [
      {
        id: "lm-udaipur-palace",
        name: "Bluewater Promenade",
        districtId: "udaipur",
        type: "landmark",
        x: 475,
        y: 765,
        description: "Historic waterfront promenade frequented by high-level political delegates."
      },
      {
        id: "lm-udaipur-bureau",
        name: "Rathore Press Bureau",
        districtId: "udaipur",
        type: "character",
        x: 450,
        y: 785,
        description: "Kavya's confidential investigative photojournalism darkroom.",
        affiliation: "Kavya Rathore"
      }
    ],
    activities: [
      "Photojournalism & Evidence Gathering",
      "High-Speed Speedboat Pursuits",
      "Gala Infiltration",
      "Mountain Switchback Racing"
    ],
    storyLocations: ["Rathore Press Bureau", "Pichola Island Palace"],
    travelTime: "2 hrs from Ajmer",
    discoveryState: "Available",
    featured: true,
    image: "/assets/images/screenshots/screenshot-03.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-03.jpg"
    ],
    quote: "Still waters reflect the brightest lies.",
    characterAffiliation: {
      name: "Kavya Rathore",
      role: "Confidential News Bureau & Investigative Darkroom"
    }
  },
  {
    id: "rajsamand",
    index: "12",
    name: "RAJSAMAND",
    displayName: "Rajsamand Marble Ridge & Scenic Lakes",
    region: "Mewar Highlands",
    shortDescription: "Blinding white marble quarries and excavation pits.",
    description: "Scenic lakes bordered by towering white marble extraction pits, limestone dust trails, and cliffside haul roads.",
    fullDescription: "Deep open-pit white marble quarries, blinding limestone dust clouds, heavy haul excavators, and sheer cliffside drop-offs.",
    biome: "Marble Excavation",
    coordinates: "BH-RAJ-12 / GRID 50-65",
    mapCoordinates: { x: 500, y: 650 },
    mapPath: "M 440,610 L 560,590 L 580,670 L 520,680 L 440,700 Z",
    colorAccent: "#9ea3a8",
    populationStyle: "Quarry Excavation & Stone Trade",
    terrain: "Lake / Terraced Hills / Deep Marble Pits",
    climate: "Limestone Dust & Arid Wind (31°C)",
    majorLocations: [
      "Kankroli Great Marble Pit",
      "Rajsamand Embankment Dam",
      "White Rock Crushing Plant",
      "Kumbhalgarh Ridge Gateway"
    ],
    landmarks: [
      {
        id: "lm-rajsamand-pit",
        name: "Great Marble Pit",
        districtId: "rajsamand",
        type: "landmark",
        x: 505,
        y: 645,
        description: "Massive stepped open-air limestone quarry hiding clandestine shipments."
      }
    ],
    activities: [
      "Heavy Hauler Transport",
      "Excavator Climbing",
      "Dust Cloud Evasion",
      "Lake Embankment Drift"
    ],
    storyLocations: ["Great Marble Pit", "Kumbhalgarh Gateway"],
    travelTime: "40 mins from Udaipur",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/screenshots/screenshot-04.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-04.jpg"
    ],
    quote: "Under the white dust, blood and marble look the same."
  },
  {
    id: "sikar",
    index: "13",
    name: "SIKAR",
    displayName: "Sikar Shekhawati Haveli Basin",
    region: "Northern Trade Hub",
    shortDescription: "Painted merchant havelis and north freight corridors.",
    description: "Northern district of ornate painted mansions, busy agricultural markets, and high-speed trade routes leading toward Delhi.",
    fullDescription: "Historic painted mansions with ornate courtyards, arid agricultural plains, and secretive freight transit corridors heading north.",
    biome: "Merchant Crossroads",
    coordinates: "BH-RAJ-13 / GRID 61-19",
    mapCoordinates: { x: 610, y: 190 },
    mapPath: "M 540,110 L 690,130 L 730,220 L 670,270 L 570,240 L 530,170 Z",
    colorAccent: "#b86358",
    populationStyle: "Merchant Clans & Agricultural Trade",
    terrain: "Dry Plains / Historic Haveli Township / Northern Corridors",
    climate: "Dry Breeze (31°C)",
    majorLocations: [
      "Shekhawati Haveli Compound",
      "Sikar Northern Freight Depot",
      "Laxmangarh Watchtower",
      "Khatu Highway Crossing"
    ],
    landmarks: [
      {
        id: "lm-sikar-haveli",
        name: "Grand Fresco Haveli",
        districtId: "sikar",
        type: "landmark",
        x: 615,
        y: 185,
        description: "Century-old painted estate converted into a secure financial clearinghouse."
      }
    ],
    activities: [
      "Courtyard Infiltration",
      "Trade Route Escort",
      "High-Speed Northern Highway Sprint",
      "Antique Forgery Scouting"
    ],
    storyLocations: ["Grand Fresco Haveli", "Northern Freight Depot"],
    travelTime: "1 hr 15 mins north of Jaipur",
    discoveryState: "Discovered",
    featured: false,
    image: "/assets/images/screenshots/screenshot-06.jpg",
    gallery: [
      "/assets/images/screenshots/screenshot-06.jpg"
    ],
    quote: "Gold was painted on these walls, but iron holds them up."
  }
];

export const worldRoutes: MapRoute[] = [
  {
    id: "route-jaipur-dausa",
    name: "NH-21 Golden Spine",
    fromId: "jaipur",
    toId: "dausa",
    path: "M 680,340 Q 745,345 810,360",
    type: "primary",
    distanceKm: 58,
    description: "Heavy commercial 6-lane artery connecting Jaipur to Dausa."
  },
  {
    id: "route-dausa-swm",
    name: "MDR-111 Scrub Pass",
    fromId: "dausa",
    toId: "sawai-madhopur",
    path: "M 810,360 Q 825,430 820,500",
    type: "primary",
    distanceKm: 92,
    description: "Winding rural highway traversing ravine scrublands."
  },
  {
    id: "route-swm-kota",
    name: "SH-33 Riverway",
    fromId: "sawai-madhopur",
    toId: "kota",
    path: "M 820,500 Q 825,590 800,680",
    type: "primary",
    distanceKm: 124,
    description: "Chambal riverfront corridor leading directly into Kota's industrial docks."
  },
  {
    id: "route-kota-bundi",
    name: "Old Fort Spur",
    fromId: "kota",
    toId: "bundi",
    path: "M 800,680 Q 760,630 730,580",
    type: "primary",
    distanceKm: 38,
    description: "Narrow cliffside switchbacks bridging the industrial basin to Bundi citadel."
  },
  {
    id: "route-bundi-ajmer",
    name: "Pass of the Seven Gates",
    fromId: "bundi",
    toId: "ajmer",
    path: "M 730,580 Q 640,520 550,460",
    type: "primary",
    distanceKm: 145,
    description: "Rocky mountain gap road guarded by continuous state patrol towers."
  },
  {
    id: "route-ajmer-pali",
    name: "Western Horizon Bypass",
    fromId: "ajmer",
    toId: "pali",
    path: "M 550,460 Q 495,500 440,540",
    type: "primary",
    distanceKm: 110,
    description: "Long flat straightaway cutting through textile flatlands."
  },
  {
    id: "route-pali-jodhpur",
    name: "NH-62 Marwar Highway",
    fromId: "pali",
    toId: "jodhpur",
    path: "M 440,540 Q 410,465 380,390",
    type: "primary",
    distanceKm: 72,
    description: "Main four-lane artery heading straight into Jodhpur's southern gates."
  },
  {
    id: "route-jodhpur-jaisalmer",
    name: "Dune Transit Link",
    fromId: "jodhpur",
    toId: "jaisalmer",
    path: "M 380,390 Q 280,365 180,340",
    type: "primary",
    distanceKm: 285,
    description: "Desert highway traversing endless sands, solitary windmills, and abandoned outposts."
  },
  {
    id: "route-jaisalmer-barmer",
    name: "NH-68 Border Patrol Line",
    fromId: "jaisalmer",
    toId: "barmer",
    path: "M 180,340 Q 205,460 230,580",
    type: "primary",
    distanceKm: 156,
    description: "Solitary border blacktop paralleling the crude oil pipeline network."
  },
  {
    id: "route-ajmer-udaipur",
    name: "NH-58 Southern Pass",
    fromId: "ajmer",
    toId: "udaipur",
    path: "M 550,460 Q 510,615 470,770",
    type: "primary",
    distanceKm: 260,
    description: "Scenic four-lane highway carving between emerald lakes and marble ridges."
  },
  {
    id: "route-udaipur-rajsamand",
    name: "Marble Ridge Haul Road",
    fromId: "udaipur",
    toId: "rajsamand",
    path: "M 470,770 Q 485,710 500,650",
    type: "primary",
    distanceKm: 65,
    description: "Steep haulage road carrying heavy limestone transport convoys."
  },
  {
    id: "route-jaipur-sikar",
    name: "NH-52 Shekhawati Trunk",
    fromId: "jaipur",
    toId: "sikar",
    path: "M 680,340 Q 645,265 610,190",
    type: "primary",
    distanceKm: 115,
    description: "Northern commercial trade highway connecting Jaipur to the Shekhawati havelis."
  },
  // Horizon Corridor Secret Infrastructure Network
  {
    id: "corridor-spine-1",
    name: "HORIZON CORRIDOR // SECTION ALPHA",
    fromId: "jaipur",
    toId: "ajmer",
    path: "M 680,340 L 550,460",
    type: "corridor",
    distanceKm: 135,
    description: "Private automated fiber & freight right-of-way bypassing public tolls."
  },
  {
    id: "corridor-spine-2",
    name: "HORIZON CORRIDOR // SECTION BRAVO",
    fromId: "ajmer",
    toId: "jodhpur",
    path: "M 550,460 L 380,390",
    type: "corridor",
    distanceKm: 190,
    description: "Heavy security logistics rail spur carrying high-value clandestine cargo."
  },
  {
    id: "corridor-spine-3",
    name: "HORIZON CORRIDOR // SECTION CHARLIE",
    fromId: "jodhpur",
    toId: "barmer",
    path: "M 380,390 L 230,580",
    type: "corridor",
    distanceKm: 210,
    description: "Subsurface fiber trench and private transport link to petroleum terminals."
  },
  {
    id: "corridor-spine-4",
    name: "HORIZON CORRIDOR // SECTION DELTA",
    fromId: "ajmer",
    toId: "kota",
    path: "M 550,460 L 800,680",
    type: "corridor",
    distanceKm: 240,
    description: "High-voltage transmission and surveillance grid backbone."
  }
];

export const allMapLandmarks: MapLandmark[] = worldRegions.flatMap(r => r.landmarks);
