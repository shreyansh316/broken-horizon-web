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
  }
];
