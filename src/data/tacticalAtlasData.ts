export interface TacticalPOI {
  name: string;
  type: string;
  desc: string;
  dx: number;
  dy: number;
}

export interface TacticalDistrict {
  id: string;
  num: string;
  numInt: number;
  code: string;
  rto: string;
  name: string;
  label: string;
  region: string;
  status: string;
  isPlayable?: boolean;
  color: string;
  x: number;
  y: number;
  xPct: number;
  yPct: number;
  storyStart?: boolean;
  biome: string;
  quote: string;
  desc: string;
  control: string;
  safehouse: string;
  terrain: string;
  act: string;
  vehicles: string;
  img: string;
  fallbackImg?: string;
  pois: TacticalPOI[];
}

export const TACTICAL_DISTRICTS: TacticalDistrict[] = [
  {
    id: "jaipur",
    num: "01",
    numInt: 1,
    code: "BH-RAJ-01 / GRID 68-34",
    rto: "RJ-14",
    name: "JAIPUR",
    label: "Jaipur (Story Start)",
    region: "Central-East Territory • State Capital",
    status: "● ACTIVE REGION // STORY START (PLAYABLE)",
    isPlayable: true,
    color: "#dc2626",
    x: 690,
    y: 275,
    xPct: 69.0,
    yPct: 35.5,
    storyStart: true,
    biome: "Pink City Forts & Industrial Ring Road",
    quote: "Every road in Jaipur starts with an engine and ends with a question.",
    desc: "Arjun Mehta's home turf. Historic fortresses and crowded bazaars collide with late-night transport yards, highway depots, and the Mehta family garage.",
    control: "68% (Fixer M. Khandelwal)",
    safehouse: "Mehta Garage (Jaipur Bypass)",
    terrain: "Urban Ring Road & Walled Bazaar",
    act: "Prologue & Ch. 1–2",
    vehicles: "Tara 1613 Freight Truck • Mahendra Thar-Roxx • Chetak RE-Auto • PinkCity Metro",
    img: "/assets/images/gameplay/BH_Jaipur_PinkCityMarket_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Mehta Garage (Arjun Home Base)",
        type: "SAFEHOUSE // SCENE 3 & 4",
        desc: "Arjun & Dev's family repair bay. Site of the debt-collector brawl and Prologue Garage Fire.",
        dx: -28,
        dy: 18
      },
      {
        name: "Jaipur Industrial Freight Yard",
        type: "MISSION 1 START (01:30 AM)",
        desc: "Rain-soaked transport yard where Arjun receives the sealed Horizon Meridian container.",
        dx: 34,
        dy: -16
      },
      {
        name: "Ring Road Drop-Zone Depot",
        type: "SCENE 1 AMBUSH SITE",
        desc: "Dark warehouse where Arjun pries open the container and escapes the Horizon Cell SUVs.",
        dx: 42,
        dy: 22
      },
      {
        name: "Ishaan Mirza's Signal Rooftop",
        type: "COMMS & CLUE BOARD HUB",
        desc: "Hidden radio array linking Arjun's Jaipur freight tag to Kavya's Udaipur license plate.",
        dx: -24,
        dy: -26
      },
      {
        name: "Jaipur University Campus",
        type: "ALLIED NODE (MAYA MEHTA)",
        desc: "Student union archives where Maya Mehta uncovers displaced village welfare petitions.",
        dx: 8,
        dy: 35
      }
    ]
  },
  {
    id: "dausa",
    num: "02",
    numInt: 2,
    code: "BH-RAJ-02 / GRID 71-32",
    rto: "RJ-29",
    name: "DAUSA",
    label: "Dausa",
    region: "Eastern Highway Gateway • NH-21",
    status: "LOCKED // FUTURE REGION (CHAPTER 1–2)",
    isPlayable: false,
    color: "#2563eb",
    x: 770,
    y: 280,
    xPct: 77.0,
    yPct: 36.0,
    storyStart: false,
    biome: "NH-21 Toll Plazas & Stepwells",
    quote: "Whoever controls the toll gates controls who eats in the city.",
    desc: "The eastern highway bottleneck where Khandelwal's syndicate uses rigged FASTag scanners to seize independent freight haulers.",
    control: "74% (Toll Syndicate)",
    safehouse: "NH-21 Dhaba Truck Stop",
    terrain: "Highway Toll Plazas & Rural Farms",
    act: "Chapters 1–2",
    vehicles: "Ashoka Viking 12-Wheeler • Mahendra Bolera Pik-Up • Sonalika Farm Tractor",
    img: "/assets/images/gameplay/BH_Dausa_AbhaneriStepwell_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Dausa Automated Toll Plaza",
        type: "ANPR CHECKPOINT",
        desc: "Spared debt collector from Prologue returns here in Ch. 2 to warn Arjun of an ambush.",
        dx: 20,
        dy: -15
      },
      {
        name: "Abhaneri Stepwell Relay",
        type: "EVIDENCE DROP",
        desc: "Dead-drop site for stolen land acquisition maps.",
        dx: -18,
        dy: 22
      }
    ]
  },
  {
    id: "sawai-madhopur",
    num: "03",
    numInt: 3,
    code: "BH-RAJ-03 / GRID 74-41",
    rto: "RJ-25",
    name: "SAWAI MADHOPUR",
    label: "Sawai Madhopur",
    region: "Forest Reserve & Escarpment Zone",
    status: "LOCKED // FUTURE REGION (CHAPTER 3)",
    isPlayable: false,
    color: "#16a34a",
    x: 790,
    y: 345,
    xPct: 79.0,
    yPct: 45.0,
    storyStart: false,
    biome: "Tiger Reserve Forests & Cliff Forts",
    quote: "The forest guards watch the tigers. Nobody watches the men with laser tripods.",
    desc: "Lush jungle reserves and ancient escarpment forts where wildlife buffer zones are secretly rezoned for the Horizon Corridor.",
    control: "52% (Buffer Zone Brokers)",
    safehouse: "Old Forest Ranger Outpost",
    terrain: "Jungle Ridges & Gorge Tracks",
    act: "Chapter 3",
    vehicles: "Surya-Maru Gypsy-King 4WD • Palace-on-Dunes Luxury Train",
    img: "/assets/images/gameplay/BH_SawaiMadhopur_TigerReserve_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Ranthambore Buffer Boundary",
        type: "ILLEGAL SURVEY SITE",
        desc: "Night stealth photography zone where wildlife boundaries are shifted.",
        dx: -22,
        dy: 18
      }
    ]
  },
  {
    id: "kota",
    num: "04",
    numInt: 4,
    code: "BH-RAJ-04 / GRID 66-54",
    rto: "RJ-20",
    name: "KOTA",
    label: "Kota",
    region: "Chambal Industrial & Rail Hub",
    status: "LOCKED // FUTURE REGION (CHAPTER 4)",
    isPlayable: false,
    color: "#7c3aed",
    x: 770,
    y: 460,
    xPct: 77.0,
    yPct: 60.0,
    storyStart: false,
    biome: "Chambal River, Thermal Plants & Rail Yards",
    quote: "Ninety containers on a midnight freight train, and none of them exist on paper.",
    desc: "Heavy industrial hub along the Chambal River featuring cooling towers, barrage bridges, and the massive railway marshalling yard.",
    control: "80% (Horizon Rail Cell)",
    safehouse: "Chambal Yard Crane Loft",
    terrain: "Rail Yards, Dams & Industrial",
    act: "Chapter 4",
    vehicles: "WAG-12B Electric Freight Train • Plasser Tower Car • Chambal Speedboat",
    img: "/assets/images/gameplay/BH_Kota_BarrageBridge_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Kota Junction Marshalling Yard",
        type: "MAIN MISSION // FREIGHT SWITCH",
        desc: "High-security rail depot housing off-the-books Horizon containers.",
        dx: 25,
        dy: -15
      },
      {
        name: "Chambal Barrage Bridge",
        type: "INTERCEPTION POINT",
        desc: "Mission 45 ('The River Meeting') boat and highway ambush zone.",
        dx: -25,
        dy: 20
      }
    ]
  },
  {
    id: "bundi",
    num: "05",
    numInt: 5,
    code: "BH-RAJ-05 / GRID 62-48",
    rto: "RJ-08",
    name: "BUNDI",
    label: "Bundi",
    region: "Aravalli Gorge & Stepwell Town",
    status: "LOCKED // FUTURE REGION (CHAPTER 4)",
    isPlayable: false,
    color: "#d97706",
    x: 710,
    y: 400,
    xPct: 71.0,
    yPct: 52.0,
    storyStart: false,
    biome: "Aravalli Gorges, Stepwells & Ropeways",
    quote: "Narrow blue lanes where armored SUVs choke and two-wheelers rule.",
    desc: "Steep hillside palace town connected by aerial cable-cars and tight heritage lanes.",
    control: "45% (Contested)",
    safehouse: "Taragarh Slope Workshop",
    terrain: "Steep Alleys & Ropeway Cliffs",
    act: "Chapter 4",
    vehicles: "Aravalli Fort Aerial Ropeway • Premier Padmini-Cab • Tirupati E-Rickshaw",
    img: "/assets/images/gameplay/BH_Bundi_TaragarhRopeway_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Bundi Hilltop Ropeway Station",
        type: "VERTICAL STEALTH",
        desc: "Suspended cable-car infiltration route overlooking the gorge.",
        dx: -20,
        dy: -18
      }
    ]
  },
  {
    id: "ajmer",
    num: "06",
    numInt: 6,
    code: "BH-RAJ-06 / GRID 54-35",
    rto: "RJ-01",
    name: "AJMER",
    label: "Ajmer",
    region: "Central Rail & Pass Junction",
    status: "LOCKED // FUTURE REGION (CHAPTER 5)",
    isPlayable: false,
    color: "#0d9488",
    x: 560,
    y: 340,
    xPct: 56.0,
    yPct: 44.0,
    storyStart: false,
    biome: "Central Mountain Pass & Rail Hub",
    quote: "Every train from Jaipur to Udaipur has to thread the needle at Ajmer.",
    desc: "Historic valley junction housing the colonial-era Central Land Revenue Registry and high-speed rail terminals.",
    control: "64% (Archive Brokers)",
    safehouse: "Ana Sagar Boathouse",
    terrain: "Mountain Pass & Central Rail",
    act: "Chapter 5",
    vehicles: "Vande-Marwar Express • Kaveri Apache-RTR • Force Traveller-26",
    img: "/assets/images/gameplay/BH_Ajmer_AnaSagarLake_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Central Revenue Record Room",
        type: "HEIST / INVESTIGATION",
        desc: "Houses Raghav Rathore's original 1988 benchmark land ledgers.",
        dx: 18,
        dy: -20
      }
    ]
  },
  {
    id: "pali",
    num: "07",
    numInt: 7,
    code: "BH-RAJ-07 / GRID 43-44",
    rto: "RJ-22",
    name: "PALI",
    label: "Pali",
    region: "Industrial Textile & Warehouse Belt",
    status: "LOCKED // FUTURE REGION (CHAPTER 6)",
    isPlayable: false,
    color: "#0891b2",
    x: 480,
    y: 415,
    xPct: 48.0,
    yPct: 54.0,
    storyStart: false,
    biome: "Industrial Mills & Dry-Port Warehouses",
    quote: "Smoke from the dyeing mills hides the smoke from burned land deeds.",
    desc: "Factory and container-depot belt linking the southern hills to the western desert.",
    control: "78% (Horizon Logistics)",
    safehouse: "Mill Sector Lockup",
    terrain: "Industrial Warehouses & Dry Ports",
    act: "Chapter 6",
    vehicles: "Eklavya Pro-3015 Cold-Chain • Piaggio-Ape Cargo 3W",
    img: "/assets/images/gameplay/BH_Pali_IndustrialZone_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Pali Inland Container Yard",
        type: "SABOTAGE / RECON",
        desc: "Primary transfer hub between Udaipur hill surveys and western desert pipelines.",
        dx: -22,
        dy: 15
      }
    ]
  },
  {
    id: "jodhpur",
    num: "08",
    numInt: 8,
    code: "BH-RAJ-08 / GRID 35-34",
    rto: "RJ-19",
    name: "JODHPUR",
    label: "Jodhpur",
    region: "Marwar Command Center • Sun City",
    status: "LOCKED // FUTURE REGION (CHAPTER 7–8)",
    isPlayable: false,
    color: "#1d4ed8",
    x: 420,
    y: 330,
    xPct: 42.0,
    yPct: 43.0,
    storyStart: false,
    biome: "Mehrangarh Citadel & Blue City Maze",
    quote: "From the fort ramparts you can see the blue houses end and the syndicate roads begin.",
    desc: "Towering cliff fortress overlooking the Blue City and Mahesh Khandelwal's western command compound.",
    control: "85% (Khandelwal Western HQ)",
    safehouse: "Blue City Clocktower Loft",
    terrain: "Citadel Cliffs, Maze Alleys & Airbase",
    act: "Chapters 7–8",
    vehicles: "Mahendra Scorpina-N Carbon • WDP-4D 'Thar Link' Locomotive • Rajputana Bullet 500",
    img: "/assets/images/gameplay/BH_Jodhpur_MehrangarhFort_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Khandelwal's Marwar Compound",
        type: "HIGH-SECURITY TARGET",
        desc: "Fortified estate holding the master payoff ledgers.",
        dx: -26,
        dy: -18
      }
    ]
  },
  {
    id: "jaisalmer",
    num: "09",
    numInt: 9,
    code: "BH-RAJ-09 / GRID 18-32",
    rto: "RJ-15",
    name: "JAISALMER",
    label: "Jaisalmer",
    region: "Deep Thar Dunes & Western Endgame",
    status: "LOCKED // FUTURE REGION (FINALE)",
    isPlayable: false,
    color: "#eab308",
    x: 220,
    y: 260,
    xPct: 22.0,
    yPct: 34.0,
    storyStart: false,
    biome: "Golden Thar Sand Dunes & Desert Fort",
    quote: "Out past Sam Dunes, there are no police, no courts—only tire tracks and wind.",
    desc: "Deep desert frontier of golden dunes, wind turbines, camel trails, and the final high-speed interception of Vardhan's 8x8 Mobile Command Rig.",
    control: "92% (Horizon Black-Site)",
    safehouse: "Abandoned Desert Relay Bunker",
    terrain: "Deep Sand Dunes & Wind Farms",
    act: "Chapters 9–10 Finale",
    vehicles: "Vardhan Mobile Command Rig (8x8) • Gurkha-Force 4x4x4 • Bell-429 Chopper",
    img: "/assets/images/gameplay/BH_Jaisalmer_FortApproach_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Thar Restricted Corridor Zero",
        type: "MISSION 117 // BOSS CONVOY",
        desc: "High-speed desert highway where Arjun & Kavya intercept the 8x8 Command Rig.",
        dx: -25,
        dy: 20
      }
    ]
  },
  {
    id: "barmer",
    num: "10",
    numInt: 10,
    code: "BH-RAJ-10 / GRID 23-44",
    rto: "RJ-04",
    name: "BARMER",
    label: "Barmer",
    region: "Oil Fields & Refinery Pipeline",
    status: "LOCKED // FUTURE REGION (CHAPTER 8)",
    isPlayable: false,
    color: "#b91c1c",
    x: 260,
    y: 395,
    xPct: 26.0,
    yPct: 51.5,
    storyStart: false,
    biome: "Desert Oil Rigs & Refinery Pipelines",
    quote: "They told the panchayat it was a water pipeline. Then the armed tankers arrived.",
    desc: "Crude-oil extraction fields and fortified desert pipelines crossing traditional village grazing lands.",
    control: "88% (Refinery Security)",
    safehouse: "Desert Court Panchayat Hall",
    terrain: "Oil Rigs, Pipelines & Scrubland",
    act: "Chapter 8",
    vehicles: "Ashoka Petro-Tanker 24KL • Desert-Star Roof-Rider Bus • Jugaad Farm-Cart",
    img: "/assets/images/gameplay/BH_Barmer_RefineryPipelines_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Barmer Terminal Valve Station",
        type: "CHAPTER 8 TARGET",
        desc: "High-security petrochemical logistics depot.",
        dx: 22,
        dy: -18
      }
    ]
  },
  {
    id: "udaipur",
    num: "11",
    numInt: 11,
    code: "BH-RAJ-11 / GRID 42-58",
    rto: "RJ-27",
    name: "UDAIPUR",
    label: "Udaipur",
    region: "Mewar Lakes & Aravalli Hills",
    status: "LOCKED // FUTURE REGION (WORLD CONCEPT)",
    isPlayable: false,
    color: "#9333ea",
    x: 590,
    y: 510,
    xPct: 59.0,
    yPct: 66.5,
    storyStart: false,
    biome: "Shimmering Lakes, Palaces & Aravalli Ridges",
    quote: "Five-star lake palaces on the water; armed midnight survey crews in the hills.",
    desc: "Kavya Rathore's home city. Island palaces host Vikram Vardhan's summits while armed teams illegally move village boundary stones in the dark hills.",
    control: "72% (Vikram Vardhan Summit)",
    safehouse: "Raghav Rathore's Old City Darkroom",
    terrain: "Lake Palaces & Rocky Hill Ridges",
    act: "Prologue Scene 2 & Ch. 6",
    vehicles: "Shakti Activa-125 (Kavya) • Rajputana Himadri-450 • Pichola Solar Ferry • Mewar Night Bus",
    img: "/assets/images/gameplay/BH_Udaipur_LakePichola_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Udaipur Outskirt Rocky Ridge",
        type: "PROLOGUE SCENE 2 (02:15 AM)",
        desc: "Where Kavya photographs illegal laser beacons and SUV plate RJ-14-VM-4092.",
        dx: -30,
        dy: -20
      },
      {
        name: "Lake Pichola Island Summit",
        type: "MISSION 60 // THE LAKE LEDGER",
        desc: "Vikram Vardhan's private investor enclave accessible via silent solar ferry.",
        dx: 28,
        dy: 12
      },
      {
        name: "Udaipur Intercity Bus Terminal",
        type: "PROLOGUE FINALE LINK",
        desc: "Departure point where Kavya boards the Night Bus to Jaipur.",
        dx: 15,
        dy: -28
      }
    ]
  },
  {
    id: "rajsamand",
    num: "12",
    numInt: 12,
    code: "BH-RAJ-12 / GRID 45-48",
    rto: "RJ-30",
    name: "RAJSAMAND",
    label: "Rajsamand",
    region: "White Marble Quarries & Dam Basin",
    status: "LOCKED // FUTURE REGION (CHAPTER 6)",
    isPlayable: false,
    color: "#059669",
    x: 590,
    y: 455,
    xPct: 59.0,
    yPct: 59.5,
    storyStart: false,
    biome: "White Marble Quarries & Dam Reservoir",
    quote: "Cut deep enough into the marble hills and you find where the missing trucks went.",
    desc: "Stepped white marble quarries and dam causeways north of Udaipur.",
    control: "70% (Quarry Contractors)",
    safehouse: "Quarry Overlook Shed",
    terrain: "Deep Marble Pits & Dam Roads",
    act: "Chapter 6",
    vehicles: "BharatBenz 3528C Quarry Tipper • Mahendra TUV-Battlebox • Shakti X-Pulse 200",
    img: "/assets/images/gameplay/BH_Rajsamand_MarbleQuarry_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "Sector-4 Deep Marble Pit",
        type: "HEAVY VEHICLE SET-PIECE",
        desc: "Vertical quarry spiral where Arjun uses a 10-wheel dumper to smash roadblocks.",
        dx: -20,
        dy: -15
      }
    ]
  },
  {
    id: "sikar",
    num: "13",
    numInt: 13,
    code: "BH-RAJ-13 / GRID 58-16",
    rto: "RJ-23",
    name: "SIKAR",
    label: "Sikar",
    region: "Shekhawati Havelis & Northern Agrarian Belt",
    status: "LOCKED // FUTURE REGION (CHAPTER 2–3)",
    isPlayable: false,
    color: "#4f46e5",
    x: 580,
    y: 160,
    xPct: 58.0,
    yPct: 21.0,
    storyStart: false,
    biome: "Shekhawati Havelis & Northern Farm Belt",
    quote: "Frescoed mansions bought for pennies through forged agricultural debt.",
    desc: "Northern gateway of painted heritage havelis and farmer unions staging tractor blockades along NH-52.",
    control: "48% (Strong Civic Resistance)",
    safehouse: "Shekhawati Haveli Courtyard",
    terrain: "Agrarian Highways & Heritage Towns",
    act: "Chapters 2–3",
    vehicles: "Tara Sumo-Victa • Sonalika-Swaraj 855 Tractor • Vikram-Diesel Tempo",
    img: "/assets/images/gameplay/BH_Sikar_ShekhawatiHaveli_01.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    pois: [
      {
        name: "NH-52 Farmer Union Blockade",
        type: "CIVIC SUPPORT NODE",
        desc: "High CivicSupport unlocks tractor-convoy allies against Horizon enforcers.",
        dx: -20,
        dy: 20
      }
    ]
  }
];

export const getTacticalDistrictById = (id: string): TacticalDistrict | undefined => {
  return TACTICAL_DISTRICTS.find(
    (d) => d.id === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase()
  );
};
