export interface EvidenceItem {
  id: string;
  title: string;
  category: 'document' | 'photograph' | 'wiretap' | 'blueprint' | 'physical';
  dateRecovered: string;
  recoveredLocation: string;
  districtId: string;
  image?: string;
  summary: string;
  classifiedNotes: string;
  pinPosition: { x: number; y: number }; // Percentage position on corkboard (0-100)
  connections: string[]; // IDs of related evidence items
}

export interface StoryChapter {
  chapterNumber: number;
  title: string;
  act: string;
  primaryLocation: string;
  synopsis: string;
  protagonistFocus: 'Arjun Mehta' | 'Kavya Rathore' | 'Joint Operation';
  status: 'Available' | 'In Development';
}

export interface StoryInvestigationData {
  caseTitle: string;
  caseFileNumber: string;
  caseStatus: string;
  premise: string;
  centralConspiracy: string;
  evidenceItems: EvidenceItem[];
  chapters: StoryChapter[];
}

export const storyInvestigationData: StoryInvestigationData = {
  caseTitle: "PROJECT HORIZON CORRIDOR",
  caseFileNumber: "CASE FILE // 2026-BH-8841",
  caseStatus: "ACTIVE INVESTIGATION // SEVERITY: REDACTED",
  premise:
    "A hidden private infrastructure network is spreading across the state of Rajasthan. Under the guise of modern transport corridors and industrial modernization, ancient land records are being erased, witnesses are disappearing, and high-frequency corporate telemetry repeaters are being installed along the highways. Two strangers — a driver seeking a way out and a journalist seeking the truth — find their investigations dangerously entangled.",
  centralConspiracy:
    "The Horizon Corridor isn't merely an expressway; it is a privately weaponized surveillance grid designed to monitor, intercept, and control every resource moving between the desert frontiers and the eastern industrial corridors.",
  evidenceItems: [
    {
      id: "ev-01-blueprint",
      title: "Logistics Corridor Blueprint Sector 04",
      category: "blueprint",
      dateRecovered: "14 SEP 2026",
      recoveredLocation: "Kankroli Substation Office",
      districtId: "rajsamand",
      image: "/assets/images/screenshots/screenshot-04.jpg",
      summary: "Classified engineering schematic revealing subterranean fiber trenches buried 4 meters beneath standard public asphalt.",
      classifiedNotes: "Note the secondary conduit marked 'TELEMETRY SEC-B'. This doesn't feed any municipal electrical substation. It routes straight toward the Jaisalmer deep desert testing range.",
      pinPosition: { x: 18, y: 22 },
      connections: ["ev-02-manifest", "ev-05-photo-convoy"]
    },
    {
      id: "ev-02-manifest",
      title: "Falsified Freight Manifest #881-B",
      category: "document",
      dateRecovered: "18 SEP 2026",
      recoveredLocation: "Dausa Freight Weigh Station",
      districtId: "dausa",
      image: "/assets/images/world/world-dausa.jpg",
      summary: "Customs shipping slip declaring 'Industrial Hydraulic Parts' shipped to Mehta Garage, but weighing 400kg over declared manifest.",
      classifiedNotes: "Arjun was hired as a blind courier. The crate serial numbers match military-grade radio interception receivers manufactured by offshore contractors.",
      pinPosition: { x: 48, y: 16 },
      connections: ["ev-01-blueprint", "ev-03-wiretap"]
    },
    {
      id: "ev-03-wiretap",
      title: "Police Scanner Intercept Tape #09",
      category: "wiretap",
      dateRecovered: "21 SEP 2026",
      recoveredLocation: "Jaipur Sector 3 Dispatch",
      districtId: "jaipur",
      image: "/assets/images/world/world-jaipur.jpg",
      summary: "Audio recording of an unlogged pursuit order instructed directly by private contractors rather than standard police dispatch.",
      classifiedNotes: "Voice matches Director Vikram Sen. The order explicitly said 'Recover the black box, disregard vehicle occupants'.",
      pinPosition: { x: 78, y: 24 },
      connections: ["ev-02-manifest", "ev-04-photo-kavya"]
    },
    {
      id: "ev-04-photo-kavya",
      title: "Surveillance Photo: Secret Night Rendezvous",
      category: "photograph",
      dateRecovered: "23 SEP 2026",
      recoveredLocation: "Ana Sagar Causeway",
      districtId: "ajmer",
      image: "/assets/images/screenshots/screenshot-01.jpg",
      summary: "High-grain telephoto photograph taken by Kavya showing State Minister Shekhawat meeting with Horizon private security liaisons.",
      classifiedNotes: "Cash briefcase exchanged for a briefcase containing biometric keys to the Bundi mountain relay towers.",
      pinPosition: { x: 26, y: 64 },
      connections: ["ev-03-wiretap", "ev-06-drive"]
    },
    {
      id: "ev-05-photo-convoy",
      title: "Midnight Unmarked Hauler Convoy",
      category: "photograph",
      dateRecovered: "24 SEP 2026",
      recoveredLocation: "NH-68 Barmer Perimeter",
      districtId: "barmer",
      image: "/assets/images/screenshots/screenshot-02.jpg",
      summary: "Night-vision snapshot of four unlit tractor-trailers crossing the desert frontier without transponders.",
      classifiedNotes: "Convoys are escorted by blacked-out SUVs with roof-mounted signal jammers. All public mobile reception dropped within 5km of their passage.",
      pinPosition: { x: 55, y: 70 },
      connections: ["ev-01-blueprint", "ev-06-drive"]
    },
    {
      id: "ev-06-drive",
      title: "Corrupted Telemetry Flash Drive",
      category: "physical",
      dateRecovered: "25 SEP 2026",
      recoveredLocation: "Taragarh Spire Relay Room",
      districtId: "bundi",
      image: "/assets/images/screenshots/screenshot-06.jpg",
      summary: "Encrypted memory storage containing 140 hours of intercepted civilian phone metadata and GPS coordinate tracking.",
      classifiedNotes: "Decryption is 42% complete. Key names found in the logs: Mehta, Rathore, and the entire executive board of the Horizon Infrastructure Syndicate.",
      pinPosition: { x: 82, y: 68 },
      connections: ["ev-04-photo-kavya", "ev-05-photo-convoy"]
    }
  ],
  chapters: [
    {
      chapterNumber: 1,
      title: "THE FIRST ROAD",
      act: "ACT I // THE ENCOUNTER",
      primaryLocation: "Jaipur // Mehta Garage & Highway Bypass",
      synopsis:
        "Arjun takes on a late-night transport job across the Pink City to settle his workshop's mounting debts. A sudden police ambush and an unexpected passenger turn a routine delivery into a desperate escape.",
      protagonistFocus: "Arjun Mehta",
      status: "Available"
    },
    {
      chapterNumber: 2,
      title: "THE SEVERED LINE",
      act: "ACT I // THE ENCOUNTER",
      primaryLocation: "Dausa & Sawai Madhopur Ravines",
      synopsis:
        "Pursued by private security, Arjun and Kavya seek shelter in ancient stepwells while attempting to decrypt the surveillance hardware hidden in Arjun's hauler.",
      protagonistFocus: "Joint Operation",
      status: "Available"
    },
    {
      chapterNumber: 3,
      title: "NIGHT SLUICES",
      act: "ACT II // THE NETWORK",
      primaryLocation: "Kota Industrial Basin & Bundi Citadel",
      synopsis:
        "Kavya infiltrates an offshore corporate gala by the Chambal riverfront to copy server logs, while Arjun creates a massive high-speed distraction across the industrial floodgates.",
      protagonistFocus: "Kavya Rathore",
      status: "Available"
    },
    {
      chapterNumber: 4,
      title: "BLUE SHADOWS",
      act: "ACT II // THE NETWORK",
      primaryLocation: "Ajmer Crossroads & Jodhpur Citadel",
      synopsis:
        "The duo attempts to upload evidence through the fortified Western Freight Terminal before their identities are broadcast to state-wide checkpoints.",
      protagonistFocus: "Joint Operation",
      status: "In Development"
    },
    {
      chapterNumber: 5,
      title: "DUNE PROTOCOL",
      act: "ACT III // THE HORIZON",
      primaryLocation: "Jaisalmer Dune Sea & Barmer Oilfield Frontier",
      synopsis:
        "A frantic cross-desert pursuit through blinding sandstorms toward the syndicate's primary relay antenna buried deep within the Thar desert.",
      protagonistFocus: "Arjun Mehta",
      status: "In Development"
    },
    {
      chapterNumber: 6,
      title: "THE BROKEN HORIZON",
      act: "ACT III // THE HORIZON",
      primaryLocation: "Udaipur Sanctuaries & State Corridor Summit",
      synopsis:
        "With evidence in hand, Arjun and Kavya confront the architect of the Corridor network before the private surveillance grid goes permanently live.",
      protagonistFocus: "Joint Operation",
      status: "In Development"
    }
  ]
};
