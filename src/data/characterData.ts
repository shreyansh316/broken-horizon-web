export interface CharacterGearItem {
  id: string;
  name: string;
  category: string;
  description: string;
  stats?: { label: string; value: string }[];
}

export interface CharacterAudioLog {
  id: string;
  title: string;
  timestamp: string;
  duration: string;
  classification: string;
  transcript: string;
  speaker: string;
}

export interface CharacterVehicleData {
  modelName: string;
  classType: string;
  chassis: string;
  drivetrain: string;
  powerOutput: string;
  topSpeed: string;
  armorClass: string;
  modifications: string[];
}

export interface CharacterProfile {
  id: string;
  name: string;
  callsign: string;
  age: number;
  origin: string;
  role: string;
  tagline: string;
  description: string;
  extendedBackground: string;
  dossierNumber: string;
  image: string;
  quote: string;
  status: 'ACTIVE OPERATIVE' | 'TARGET OF INTEREST' | 'WANTED';
  specs: {
    label: string;
    value: string;
  }[];
  gear: CharacterGearItem[];
  vehicle?: CharacterVehicleData;
  audioLogs: CharacterAudioLog[];
  relationships: {
    targetName: string;
    relationshipType: string;
    intelNotes: string;
  }[];
}

export const characterProfiles: CharacterProfile[] = [
  {
    id: "arjun-mehta",
    name: "ARJUN MEHTA",
    callsign: "WRENCH-01",
    age: 29,
    origin: "JAIPUR",
    role: "DRIVER / MECHANIC",
    tagline: "Pulled into a conspiracy much larger than the roads he knows.",
    description: "A Jaipur-born driver and mechanic pulled into a conspiracy much larger than the roads he knows.",
    extendedBackground:
      "Arjun spent twelve years in grease pits and underground garage bays across the Pink City bypass. When an off-the-books nocturnal freight run across the Horizon Corridor goes disastrously wrong, he discovers he wasn't transporting machine parts — but black-budget surveillance telemetry. Now marked by private security contractors, his vehicle is both his weapon and his only sanctuary.",
    dossierNumber: "DOSSIER // 01-AM-29",
    image: "/assets/images/characters/character-arjun.jpg",
    quote: "You learn a lot about a man by the way he treats an engine at redline.",
    status: "TARGET OF INTEREST",
    specs: [
      { label: "PRIMARY VEHICLE", value: "Custom Modified 4x4 Off-Roader" },
      { label: "EXPERTISE", value: "High-Speed Night Evasion & Mechanical Tuning" },
      { label: "AFFILIATION", value: "Mehta Workshop / Independent Haulers" },
      { label: "HOME DISTRICT", value: "Jaipur // Mehta Garage Compound" },
    ],
    gear: [
      {
        id: "gear-arjun-ecu",
        name: "Custom Tuned OBD Diagnostic Hacker",
        category: "Electronics",
        description: "Hand-soldered bypass unit allowing Arjun to flash engine telemetry and override police vehicle speed governors.",
        stats: [
          { label: "OVERRIDE TIME", value: "3.2 Seconds" },
          { label: "COMPATIBILITY", value: "All State Transport & Hauler ECUs" }
        ]
      },
      {
        id: "gear-arjun-impact",
        name: "Pneumatic Heavy Impact Wrench",
        category: "Mechanical",
        description: "Industrial torque wrench repurposed for rapid tire changes and emergency perimeter breeching.",
        stats: [
          { label: "TORQUE RATING", value: "1,450 Nm" },
          { label: "WEIGHT", value: "2.8 kg" }
        ]
      },
      {
        id: "gear-arjun-nvg",
        name: "Low-Profile Monocular Night Optics",
        category: "Reconnaissance",
        description: "Surplus tactical night vision monocular strapped to a driving helmet for running unlit desert highways without headlights.",
        stats: [
          { label: "SPECTRUM", value: "Gen-3 Phosphor" },
          { label: "BATTERY LIFE", value: "14 Hours Continuous" }
        ]
      }
    ],
    vehicle: {
      modelName: "Horizon Marauder 4x4 (Custom 'Sandfang')",
      classType: "Armored Pursuit & Off-Road Utility",
      chassis: "Reinforced Ladder-Frame with Full Roll Cage",
      drivetrain: "Twin-Turbocharged 3.8L Diesel V6 / 4WD",
      powerOutput: "485 BHP / 620 lb-ft Torque",
      topSpeed: "215 km/h (Asphalt) / 140 km/h (Dunes)",
      armorClass: "Level B6 Ballistic Glass & Kevlar Door Inserts",
      modifications: [
        "Hydraulic Variable Suspension",
        "Night Evasion Blackout Switch (Headlight & Brake Kill)",
        "Underbody Skid Plate for Rock Crawling",
        "Dual Auxiliary Desert Fuel Tanks (+800 km Range)"
      ]
    },
    audioLogs: [
      {
        id: "audio-arjun-01",
        title: "JAIPUR BYPASS RADIO INTERCEPT",
        timestamp: "03:14:22 // NIGHT RUN",
        duration: "0:42",
        classification: "POLICE SCANNER CAPTURE",
        speaker: "Jaipur Sector 3 Patrol Unit",
        transcript: "Control, Unit 44 in pursuit of an unlit blacked-out 4x4 traveling west on NH-21 at speeds exceeding 190. Target just killed their tail lights. We lost visual past the Dausa junction toll."
      },
      {
        id: "audio-arjun-02",
        title: "MEHTA GARAGE VOICE MEMO",
        timestamp: "05:48:10 // DAWN",
        duration: "1:15",
        classification: "ENCRYPTED DICTATION",
        speaker: "Arjun Mehta",
        transcript: "The seals on that crate were military grade. It wasn't agricultural equipment. There were optical fiber repeaters inside with Horizon Syndicate serial stamps. If they know I opened it, they're not just coming for the truck. They're coming for everyone who ever bought parts from me."
      }
    ],
    relationships: [
      {
        targetName: "Kavya Rathore",
        relationshipType: "Crucial Ally / Uneasy Partners",
        intelNotes: "Crossed paths after Arjun broke her out of a perimeter raid near Ana Sagar. Relies on her investigative intelligence to navigate police checkpoints."
      },
      {
        targetName: "Director Vikram Sen",
        relationshipType: "Primary Antagonist",
        intelNotes: "Chief of Horizon Infrastructure Security. Issued the standing kill-or-capture warrant on Arjun's vehicle."
      }
    ]
  },
  {
    id: "kavya-rathore",
    name: "KAVYA RATHORE",
    callsign: "LENS-02",
    age: 27,
    origin: "UDAIPUR",
    role: "INVESTIGATIVE PHOTOJOURNALIST",
    tagline: "Determined to uncover what powerful people want hidden.",
    description: "An investigative photojournalist determined to uncover what powerful people want hidden.",
    extendedBackground:
      "Trained in investigative photo-documentary across New Delhi and Rajasthan's border districts, Kavya tracked suspicious military-grade optical cables laid beneath the new state expressway. Her dispatches were suppressed by state publishers, forcing her into the field alone. Armed with high-shutter telephoto lenses and encrypted radio receivers, she links up with Arjun to expose the forces behind the Corridor.",
    dossierNumber: "DOSSIER // 02-KR-27",
    image: "/assets/images/characters/character-kavya.jpg",
    quote: "If they build a wall high enough, it means there's a body behind it.",
    status: "WANTED",
    specs: [
      { label: "PRIMARY TOOL", value: "400mm Weather-Sealed Telephoto Kit" },
      { label: "EXPERTISE", value: "Signal Interception, Decryption & Photographic Evidence" },
      { label: "AFFILIATION", value: "Independent Press Syndicate / Whistleblowers" },
      { label: "HOME DISTRICT", value: "Udaipur // Rathore Darkroom Bureau" },
    ],
    gear: [
      {
        id: "gear-kavya-camera",
        name: "Modified Mirrorless Telephoto Rig",
        category: "Surveillance",
        description: "Hardened magnesium camera body with high-aperture 400mm f/2.8 lens and infrared filter switch for midnight stakeouts.",
        stats: [
          { label: "RESOLUTION", value: "45.7 Megapixels" },
          { label: "RANGE", value: "Up to 2.4 Kilometers optical clarity" }
        ]
      },
      {
        id: "gear-kavya-sdr",
        name: "Software-Defined Tactical Radio Scanner",
        category: "Signals Intel",
        description: "Compact frequency analyzer capable of intercepting unencrypted police frequencies, corporate drone telemetry, and private contractor radio bands.",
        stats: [
          { label: "BANDWIDTH", value: "24 MHz to 1.8 GHz" },
          { label: "DECRYPTION SPEED", value: "Real-time voice synthesis" }
        ]
      },
      {
        id: "gear-kavya-credentials",
        name: "Forged State Press Pass & Media Credentials",
        category: "Infiltration",
        description: "High-grade forged accreditation allowing Kavya access to political press conferences, lakefront gala grounds, and restricted highway lanes.",
        stats: [
          { label: "RFID CHIP", value: "Spoofed State Press Council Protocol" },
          { label: "BIOMETRIC HASH", value: "Scrambled" }
        ]
      }
    ],
    vehicle: {
      modelName: "Recon Motorbike (Custom 'Ghost-250')",
      classType: "Lightweight Infiltration Dual-Sport Enduro",
      chassis: "Chromoly Trellis Frame with Carbon Fairings",
      drivetrain: "Single-Cylinder 450cc Fuel-Injected / 6-Speed",
      powerOutput: "54 BHP / Ultra-Lightweight (118 kg)",
      topSpeed: "165 km/h",
      armorClass: "Kevlar Fuel Cell / Lightweight Sump Guard",
      modifications: [
        "Acoustic Baffle Exhaust Silencer (-18dB quiet running)",
        "Locking Panniers for Camera Lenses & Decryption Laptops",
        "Folding Handlebars for Concealment in Freight Vans"
      ]
    },
    audioLogs: [
      {
        id: "audio-kavya-01",
        title: "UDAIPUR PRESS BUREAU DICTATION",
        timestamp: "23:42:15 // NIGHT FILE",
        duration: "0:58",
        classification: "ENCRYPTED CASSETTE",
        speaker: "Kavya Rathore",
        transcript: "The official tender documents say the Horizon Corridor is a high-speed freight expressway to boost agricultural trade. But the contracts are signed by offshore security conglomerates. They're installing private telemetry fiber alongside every kilometer. They aren't shipping grain. They're building a private surveillance grid across Rajasthan."
      },
      {
        id: "audio-kavya-02",
        title: "FIELD RECORDING: LAKE PICHOILA BOAT SHED",
        timestamp: "01:12:00 // SURVEILLANCE",
        duration: "0:36",
        classification: "WIRETAP LOG",
        speaker: "Unknown Contractor / Syndicate Liaison",
        transcript: "Make sure the courier from Jaipur arrives before sunrise. If the driver asks questions about the weight of the cases, handle it. Nobody leaves with photos."
      }
    ],
    relationships: [
      {
        targetName: "Arjun Mehta",
        relationshipType: "Essential Partner in the Field",
        intelNotes: "Relies on Arjun's extreme driving abilities to escape corporate extraction squads and reach remote desert transmitters."
      },
      {
        targetName: "Minister R. K. Shekhawat",
        relationshipType: "Investigation Target",
        intelNotes: "State infrastructure minister who signed off on the privatized Horizon Corridor right-of-way concessions."
      }
    ]
  },
  {
    id: "vikram-vardhan",
    name: "VIKRAM VARDHAN",
    callsign: "ARCHITECT-01",
    age: 52,
    origin: "UDAIPUR / JAIPUR",
    role: "FOUNDER & CEO, VARDHAN MERIDIAN",
    tagline: "Every modern city was built over someone's old fence.",
    description: "Publicly celebrated as a visionary industrialist modernizing Rajasthan; privately orchestrating a private 12-district highway monopoly.",
    extendedBackground:
      "Publicly celebrated as a visionary industrialist modernizing Rajasthan. Privately, his conglomerate uses shell trusts and offshore options to lock down a twelve-district private logistics monopoly at any human cost. Operating from private summit suites overlooking Lake Pichola and corporate glass penthouses in Jaipur, Vardhan sees the state as a blank slate for his private logistics grid.",
    dossierNumber: "DOSSIER // 00-VV-52",
    image: "/assets/images/characters/character-vikram-vardhan.jpg",
    quote: "Every railway, every dam, every modern city was built over someone's old fence. You call it fraud. History calls it infrastructure.",
    status: "TARGET OF INTEREST",
    specs: [
      { label: "PRIMARY VEHICLE", value: "Mercer-Bharath S-Guard Armored Limo & Bell-429 Chopper" },
      { label: "EXPERTISE", value: "Monopoly Logistics, State Capital Leverage & Private Enclaves" },
      { label: "AFFILIATION", value: "Vardhan Meridian Infrastructure Conglomerate" },
      { label: "HEADQUARTERS", value: "Meridian Glass Tower, Jaipur & Udaipur Lakefront Estate" },
    ],
    gear: [
      {
        id: "gear-vardhan-sat",
        name: "Encrypted Satellite Command Communicator",
        category: "Executive Comms",
        description: "Hardened satellite uplink terminal connecting directly to offshore banking consortiums and private airfield security details.",
        stats: [
          { label: "ENCRYPTION", value: "Quantum-Resistant 4096-bit AES" },
          { label: "CHANNELS", value: "Direct Geneva & Dubai Feeds" }
        ]
      },
      {
        id: "gear-vardhan-biometric",
        name: "Master Corridor Access Cryptokey",
        category: "Infrastructure Key",
        description: "Biometrically bound master keycard providing override access to every automated toll gate, container depot, and rail switch along NH-48.",
        stats: [
          { label: "CLEARANCE", value: "Level 5 State Executive" },
          { label: "FAILSAFE", value: "Thermal Remote Wipe" }
        ]
      }
    ],
    vehicle: {
      modelName: "Mercer-Bharath S-Guard Presidential Limo",
      classType: "Executive Armored Transport",
      chassis: "Extended Heavy-Gauge Ballistic Monocoque",
      drivetrain: "6.0L Twin-Turbo V12 / All-Wheel Drive",
      powerOutput: "621 BHP / 1000 Nm Torque",
      topSpeed: "230 km/h (Governed)",
      armorClass: "VR10 Ballistic & Explosive Floor Armor",
      modifications: [
        "Independent Oxygen Recirculation System",
        "Run-Flat Michelin PAX Armored Tires",
        "Active Radar Scrambler & Radio Frequency Jammer",
        "Encrypted Horizon Cell Command Console"
      ]
    },
    audioLogs: [
      {
        id: "audio-vardhan-01",
        title: "RECORDED MERIDIAN BOARDROOM FEED",
        timestamp: "22:15:00 // EXECUTIVE TAPE",
        duration: "0:45",
        classification: "INTERNAL LOG",
        speaker: "Vikram Vardhan",
        transcript: "Contain the Jaipur garage incident before the market opens. If Khandelwal has become a liability to the corridor schedule, cut him loose. But do not allow that telemetry drive to reach the high court."
      }
    ],
    relationships: [
      {
        targetName: "Mahesh Khandelwal",
        relationshipType: "Operational Enforcer / Fixer",
        intelNotes: "Delegates all high-risk coercive land acquisitions and field intimidation to Khandelwal while maintaining clean corporate deniability."
      },
      {
        targetName: "Arjun Mehta",
        relationshipType: "Unanticipated Obstacle",
        intelNotes: "Considers the stolen container a minor logistics leak, but has authorized full private contractor mobilization to retrieve it."
      }
    ]
  },
  {
    id: "mahesh-khandelwal",
    name: "MAHESH KHANDELWAL",
    callsign: "GHOST-FIXER",
    age: 46,
    origin: "JAIPUR / JODHPUR",
    role: "CHIEF FIXER, HORIZON CELL",
    tagline: "Sign the deed before Friday, or the registry computer forgets your grandfather ever owned this soil.",
    description: "The ruthless operational fixer who turns Vikram Vardhan's clean corporate spreadsheets into forged midnight deeds, predatory transport debts, burned garages, and vanished witnesses.",
    extendedBackground:
      "A former state revenue official who transitioned into high-stakes corporate enforcement. Operating out of unmarked black SUVs between Jaipur and Jodhpur toll plazas, Khandelwal coordinates private armed escorts, FASTag vehicle tracking, and district police suppression to eliminate anyone resisting the Horizon Corridor.",
    dossierNumber: "DOSSIER // 09-MK-46",
    image: "/assets/images/characters/character-mahesh-khandelwal.jpg",
    quote: "Sign the deed before Friday, or the registry computer forgets your grandfather ever owned this soil.",
    status: "WANTED",
    specs: [
      { label: "PRIMARY VEHICLE", value: "Vardhan Meridian Sentinel V8 (B6 Armored SUV)" },
      { label: "EXPERTISE", value: "FASTag Surveillance Tracking, Forged Revenue Records & Night Raids" },
      { label: "AFFILIATION", value: "Horizon Cell Enforcement Division" },
      { label: "PRIMARY POST", value: "Dausa Toll Security Hub & Jodhpur Rail Yards" },
    ],
    gear: [
      {
        id: "gear-khandelwal-phones",
        name: "Dual Encrypted Burner Terminal Array",
        category: "Covert Intel",
        description: "Hardened satellite handsets with real-time access to state highway patrol ANPR cameras and private toll transponders.",
        stats: [
          { label: "LATENCY", value: "Real-Time Toll Sniffing" },
          { label: "SPOOFING", value: "Dynamic IMEI Cycling" }
        ]
      },
      {
        id: "gear-khandelwal-deeds",
        name: "Forged Collectorate Stamp Kit",
        category: "Document Forgery",
        description: "Precision-machined official district revenue stamps used to backdate land confiscation orders across rural tehsils.",
        stats: [
          { label: "DISTRICTS", value: "Jaipur, Dausa, Ajmer, Pali" },
          { label: "PAPER", value: "Genuine State Treasury Parchment" }
        ]
      }
    ],
    vehicle: {
      modelName: "Vardhan Meridian Sentinel V8 ('Khandelwal Spec')",
      classType: "Heavy Armored Interceptor SUV",
      chassis: "Reinforced Steel Ladder-Frame with Push-Bumper",
      drivetrain: "5.7L Supercharged V8 / Full-Time 4WD",
      powerOutput: "450 BHP / 550 lb-ft Torque",
      topSpeed: "190 km/h",
      armorClass: "B6 Ballistic Glass & Kevlar Underbody Blast Shield",
      modifications: [
        "Concealed Red-Blue High-Intensity Strobe Grille",
        "Police Radio & Highway Scanner Rig",
        "Concealed Gun Ports in Passenger Doors",
        "FASTag Signal Cloner for Toll Override"
      ]
    },
    audioLogs: [
      {
        id: "audio-khandelwal-01",
        title: "INTERCEPTED POLICE RADIO TAPE",
        timestamp: "01:50:00 // NIGHT DISPATCH",
        duration: "0:40",
        classification: "WIRETAP LOG",
        speaker: "Mahesh Khandelwal",
        transcript: "The driver pried open the container seal at the Jaipur depot. Get the Horizon tag back and burn the Mehta garage to the ground. If anyone asks, it was an electrical short in a diesel tank."
      }
    ],
    relationships: [
      {
        targetName: "Vikram Vardhan",
        relationshipType: "Corporate Employer",
        intelNotes: "Executes Vardhan's deniable dirty work with ruthless efficiency in exchange for equity cuts in freight corridor concessions."
      },
      {
        targetName: "Arjun Mehta",
        relationshipType: "Primary Hunting Target",
        intelNotes: "Sent the strike team that set fire to Mehta Garage in Chapter 1; personally tracking Arjun's vehicle heat across district highways."
      }
    ]
  }
];

