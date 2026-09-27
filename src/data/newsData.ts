export interface DevelopmentLogItem {
  id: string;
  phase: number;
  phaseCode: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN DEVELOPMENT" | "PLANNED";
  highlights: string[];
  dateLabel: string;
}

export const developmentLog: DevelopmentLogItem[] = [
  {
    id: "phase-21",
    phase: 21,
    phaseCode: "PHASE 21",
    title: "SHOPS, VENDORS & ECONOMY",
    description: "Regional black-market chop shops, dhaba informants, parts trading and dynamic fuel economy balancing across desert districts.",
    status: "IN DEVELOPMENT",
    highlights: [
      "Dynamic fuel pricing influenced by regional control",
      "Informant trade network and evidence bartering",
      "Localized scrap and tuning merchant inventories",
    ],
    dateLabel: "Current Milestone",
  },
  {
    id: "phase-20",
    phase: 20,
    phaseCode: "PHASE 20",
    title: "INVENTORY, LOOT & EQUIPMENT",
    description: "Physical vehicle trunk stowage, field tool degradation, radio decryptors, and encumbrance dynamics affecting stamina.",
    status: "COMPLETED",
    highlights: [
      "Physicalized vehicle boot grid storage",
      "Surveillance gear and radio scanner equipment slots",
      "Survival supplies, fuel canisters and repair kits",
    ],
    dateLabel: "Completed Sprint",
  },
  {
    id: "phase-19",
    phase: 19,
    phaseCode: "PHASE 19",
    title: "PLAYER PROGRESSION",
    description: "Reputation weighting with district haulers versus state authorities, tactical driving skills, and narrative dialogue branches.",
    status: "COMPLETED",
    highlights: [
      "Tactical vehicle control proficiency perks",
      "Faction trust meters across 13 districts",
      "Evidence-backed interrogation dialogues",
    ],
    dateLabel: "Completed Sprint",
  },
  {
    id: "phase-18",
    phase: 18,
    phaseCode: "PHASE 18",
    title: "VEHICLE PROGRESSION & GARAGES",
    description: "Modular chassis modification, sand tire deflation physics, suspension travel tuning, and garage workshops in Jaipur and Jodhpur.",
    status: "COMPLETED",
    highlights: [
      "Modular desert suspension and tire pressure physics",
      "Regional garage customization and custom body kits",
      "Engine thermals and fluid maintenance systems",
    ],
    dateLabel: "Completed Sprint",
  },
];
