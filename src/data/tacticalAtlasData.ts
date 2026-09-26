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
  code: string;
  rto: string;
  name: string;
  region: string;
  status: string;
  x: number;
  y: number;
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
    code: "BH-RAJ-01 / GRID 68-34",
    rto: "RJ-14",
    name: "JAIPUR",
    region: "Central-East Territory • State Capital",
    status: "● PROLOGUE PLAYABLE",
    x: 630,
    y: 225,
    quote: "Every road in Jaipur starts with an engine and ends with a question.",
    desc: "Sprawling capital of historic walled bazaars, neon ring roads, industrial transport yards, and family workshops. Arjun Mehta's home turf and the flashpoint of the Horizon Corridor conspiracy.",
    control: "68% (Fixer M. Khandelwal)",
    safehouse: "Mehta Garage (Jaipur Bypass)",
    terrain: "Urban Ring Road & Walled Bazaar",
    act: "Prologue & Chapters 1–2",
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
    code: "BH-RAJ-02 / GRID 71-32",
    rto: "RJ-29",
    name: "DAUSA",
    region: "Eastern Highway Gateway • NH-21",
    status: "CHAPTER 1–2 SECTOR",
    x: 725,
    y: 235,
    quote: "Whoever controls the toll gates controls who eats in the city.",
    desc: "High-speed highway corridor east of Jaipur packed with sandstone quarries, stepwells, and rigged FASTag toll plazas where Khandelwal's men filter commercial freight.",
    control: "74% (Toll Syndicate)",
    safehouse: "NH-21 Dhaba Truck Stop",
    terrain: "Highway Toll Plazas & Rural Farms",
    act: "Chapter 1–2 (Highway Escort)",
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
    code: "BH-RAJ-03 / GRID 74-41",
    rto: "RJ-25",
    name: "SAWAI MADHOPUR",
    region: "Forest Reserve & Escarpment Zone",
    status: "CHAPTER 3 SECTOR",
    x: 755,
    y: 340,
    quote: "The forest guards watch the tigers. Nobody watches the men with laser tripods.",
    desc: "Dense dry-deciduous forest trails, cliff forts, and wildlife buffer zones secretly carved up for private eco-luxury lodges and corridor rail bypasses.",
    control: "52% (Buffer Zone Brokers)",
    safehouse: "Old Forest Ranger Outpost",
    terrain: "Jungle Ridges & Gorge Tracks",
    act: "Chapter 3 (Forest Buffer)",
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
    code: "BH-RAJ-04 / GRID 66-54",
    rto: "RJ-20",
    name: "KOTA",
    region: "Chambal Industrial & Rail Hub",
    status: "CHAPTER 4 SECTOR",
    x: 655,
    y: 475,
    quote: "Ninety containers on a midnight freight train, and none of them exist on paper.",
    desc: "Heavy industrial power plants, Chambal river bridges, coaching districts, and massive railway marshalling yards where Horizon hardware is switched onto ghost trains.",
    control: "80% (Horizon Rail Cell)",
    safehouse: "Chambal Yard Crane Loft",
    terrain: "Rail Yards, Dams & Industrial",
    act: "Chapter 4 (The Freight Switch)",
    vehicles: "WAG-12B Twin Electric Freight • Plasser Tower Car • Chambal Speedboat",
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
    code: "BH-RAJ-05 / GRID 62-48",
    rto: "RJ-08",
    name: "BUNDI",
    region: "Aravalli Gorge & Stepwell Town",
    status: "CHAPTER 4 SECTOR",
    x: 615,
    y: 415,
    quote: "Narrow blue lanes where armored SUVs choke and two-wheelers rule.",
    desc: "Steep hillside fortresses, blue-washed narrow alleys, and aerial ropeways used for vertical stealth and hiding hunted witnesses.",
    control: "45% (Contested)",
    safehouse: "Taragarh Slope Workshop",
    terrain: "Steep Alleys & Ropeway Cliffs",
    act: "Chapter 4 (Ropeway Line)",
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
    code: "BH-RAJ-06 / GRID 54-35",
    rto: "RJ-01",
    name: "AJMER",
    region: "Central Rail & Pass Junction",
    status: "CHAPTER 5 SECTOR",
    x: 525,
    y: 295,
    quote: "Every train from Jaipur to Udaipur has to thread the needle at Ajmer.",
    desc: "Surrounded by the Nag Pahar hills, Ajmer serves as the central railway and judicial archive hub where colonial-era land maps are stored.",
    control: "64% (Archive Brokers)",
    safehouse: "Ana Sagar Boathouse",
    terrain: "Mountain Pass & Central Rail",
    act: "Chapter 5 (The Central Registry)",
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
    code: "BH-RAJ-07 / GRID 43-44",
    rto: "RJ-22",
    name: "PALI",
    region: "Industrial Textile & Warehouse Belt",
    status: "CHAPTER 6 SECTOR",
    x: 415,
    y: 380,
    quote: "Smoke from the dyeing mills hides the smoke from burned land deeds.",
    desc: "Gritty industrial belt connecting the Aravalli foothills to Marwar, filled with chemical warehouses, dry ports, and shell-company logistics yards.",
    control: "78% (Horizon Logistics)",
    safehouse: "Mill Sector Lockup",
    terrain: "Industrial Warehouses & Dry Ports",
    act: "Chapter 6 (Shell Company Trail)",
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
    code: "BH-RAJ-08 / GRID 35-34",
    rto: "RJ-19",
    name: "JODHPUR",
    region: "Marwar Command Center • Sun City",
    status: "CHAPTER 7–8 SECTOR",
    x: 355,
    y: 295,
    quote: "From the fort ramparts you can see the blue houses end and the syndicate roads begin.",
    desc: "Towering sandstone citadel overlooking the blue old city and high-security military/corporate airfields. Mahesh Khandelwal's western operational headquarters.",
    control: "85% (Khandelwal Western HQ)",
    safehouse: "Blue City Clocktower Loft",
    terrain: "Citadel Cliffs, Maze Alleys & Airbase",
    act: "Chapters 7–8 (The Fixer's Fortress)",
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
    code: "BH-RAJ-09 / GRID 18-32",
    rto: "RJ-15",
    name: "JAISALMER",
    region: "Deep Thar Dunes & Western Endgame",
    status: "CHAPTER 9–10 FINALE",
    x: 185,
    y: 285,
    quote: "Out past Sam Dunes, there are no police, no courts—only tire tracks and wind.",
    desc: "Golden desert fortress, wind-turbine megafarms, and restricted deep-dune highways where Vikram Vardhan's Mobile Command Rig makes its final run.",
    control: "92% (Horizon Black-Site)",
    safehouse: "Abandoned Desert Relay Bunker",
    terrain: "Deep Sand Dunes & Wind Farms",
    act: "Chapters 9–10 (Endgame Convoy)",
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
    id: "udaipur",
    num: "10",
    code: "BH-RAJ-10 / GRID 42-58",
    rto: "RJ-27",
    name: "UDAIPUR",
    region: "Mewar Lakes & Aravalli Hills",
    status: "● PROLOGUE PLAYABLE",
    x: 420,
    y: 535,
    quote: "Five-star lake palaces on the water; armed midnight survey crews in the hills.",
    desc: "Kavya Rathore's home district. Shimmering lakes and heritage island hotels conceal Vikram Vardhan's investor summits and illegal midnight boundary seizures in the surrounding hills.",
    control: "72% (Vikram Vardhan Summit)",
    safehouse: "Raghav Rathore's Old City Darkroom",
    terrain: "Lake Palaces & Rocky Hill Ridges",
    act: "Prologue Scene 2 & Chapter 6",
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
    num: "11",
    code: "BH-RAJ-11 / GRID 45-48",
    rto: "RJ-30",
    name: "RAJSAMAND",
    region: "White Marble Quarries & Dam Basin",
    status: "CHAPTER 6 SECTOR",
    x: 445,
    y: 445,
    quote: "Cut deep enough into the marble hills and you find where the missing trucks went.",
    desc: "Terraced white marble pits, heavy tipper haul-roads, and dam causeways linking Udaipur to central Rajasthan.",
    control: "70% (Quarry Contractors)",
    safehouse: "Quarry Overlook Shed",
    terrain: "Deep Marble Pits & Dam Roads",
    act: "Chapter 6 (Quarry Ambush)",
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
    id: "barmer",
    num: "12",
    code: "BH-RAJ-12 / GRID 23-44",
    rto: "RJ-04",
    name: "BARMER",
    region: "Oil Fields & Refinery Pipeline",
    status: "CHAPTER 8 SECTOR",
    x: 235,
    y: 395,
    quote: "They told the panchayat it was a water pipeline. Then the armed tankers arrived.",
    desc: "Crude oil rigs, petrochemical refineries, and scorching desert scrublands where Horizon's private energy corridor seizes grazing commons.",
    control: "88% (Refinery Security)",
    safehouse: "Desert Court Panchayat Hall",
    terrain: "Oil Rigs, Pipelines & Scrubland",
    act: "Chapter 8 (Pipeline Sabotage)",
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
    id: "sikar",
    num: "13",
    code: "BH-RAJ-13 / GRID 58-16",
    rto: "RJ-23",
    name: "SIKAR",
    region: "Shekhawati Havelis & Northern Agrarian Belt",
    status: "CHAPTER 2–3 SECTOR",
    x: 585,
    y: 135,
    quote: "Frescoed mansions bought for pennies through forged agricultural debt.",
    desc: "Northern agrarian heartland famous for painted Shekhawati havelis and farmer unions organizing highway tractor blockades against land seizures.",
    control: "48% (Strong Civic Resistance)",
    safehouse: "Shekhawati Haveli Courtyard",
    terrain: "Agrarian Highways & Heritage Towns",
    act: "Chapters 2–3 (Sandline Blockade)",
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
  return TACTICAL_DISTRICTS.find(d => d.id === id || d.name.toLowerCase() === id.toLowerCase());
};
