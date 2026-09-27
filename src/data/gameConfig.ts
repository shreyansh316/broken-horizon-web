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
  trailerPosterMobilePath: string;
  trailerPosterJpgPath: string;
  trailerHeading: string;
  trailerSubheading: string;
  trailerSupportingCopy: string;
  trailerStatus: string;
  trailerBadge: string;
  hasPlayableVideo: boolean;
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
  downloadURL: "https://samwooduis.itch.io/broken-horizon",
  trailerURL: "#trailer",
  trailerLocalPath: "/assets/video/broken-horizon-hindi-trailer.mp4",
  trailerPosterPath: "/assets/images/trailer/broken-horizon-reveal-trailer-poster.webp",
  trailerPosterMobilePath: "/assets/images/trailer/broken-horizon-reveal-trailer-poster-mobile.webp",
  trailerPosterJpgPath: "/assets/images/trailer/broken-horizon-reveal-trailer-poster.jpg",
  trailerHeading: "WATCH THE REVEAL TRAILER",
  trailerSubheading: "THE FIRST WRONG TURN",
  trailerSupportingCopy: "A cinematic first look into the mystery behind Broken Horizon.",
  trailerStatus: "TRAILER AVAILABLE",
  trailerBadge: "HINDI GAME TRAILER",
  hasPlayableVideo: true,
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

