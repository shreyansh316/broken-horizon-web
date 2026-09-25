import { ENGINE_VERSION } from '../config/siteConfig';

export interface GameConfig {
  title: string;
  tagline: string;
  description: string;
  secondaryDescription: string;
  developmentPhase: number;
  developmentPhaseTotal: number;
  currentDistrictsCount: number;
  expansionDistrictsTarget: number;
  worldScaleCurrentKm2: number;
  expansionStages: string;
  downloadURL: string;
  trailerURL: string;
  trailerLocalPath: string;
  trailerPosterPath: string;
  discordURL: string;
  youtubeURL: string;
  xURL: string;
  instagramURL: string;
  targetPlatform: string;
  engine: string;
  developmentCategories: {
    name: string;
    percentage: number;
    status: string;
  }[];
}

export const gameConfig: GameConfig = {
  title: "BROKEN HORIZON",
  tagline: "EVERY ROAD HIDES A STORY.",
  description: "An open-world action-adventure set across a fictionalized Rajasthan.",
  secondaryDescription: "Broken Horizon is a PC-first open-world action-adventure set across a fictionalized version of Rajasthan, India.",
  developmentPhase: 21,
  developmentPhaseTotal: 50,
  currentDistrictsCount: 13,
  expansionDistrictsTarget: 41,
  worldScaleCurrentKm2: 200,
  expansionStages: "13 → 20 → 30 → 41",
  downloadURL: "#access",
  trailerURL: "#trailer",
  trailerLocalPath: "/assets/videos/broken-horizon-trailer.mp4",
  trailerPosterPath: "/assets/images/trailer-poster.jpg",
  discordURL: "#",
  youtubeURL: "#",
  xURL: "#",
  instagramURL: "#",
  targetPlatform: "PC / Windows",
  engine: ENGINE_VERSION,
  developmentCategories: [
    { name: "SYSTEMS", percentage: 52, status: "Active Iteration" },
    { name: "WORLD", percentage: 46, status: "Greybox & Architecture" },
    { name: "MISSIONS", percentage: 38, status: "Narrative Wireframing" },
    { name: "VEHICLES", percentage: 60, status: "Physics & Handling" },
    { name: "STORY", percentage: 48, status: "Dialogue & Scripting" },
  ],
};

