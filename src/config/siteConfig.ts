export const ENGINE_VERSION = "Unreal Engine 4.27";

export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  secondaryStatement: string;
  gameEngine: string;
  targetPlatform: string;
  setting: string;
  developmentPhase: number;
  developmentPhaseTotal: number;
  currentDistrictsCount: number;
  expansionDistrictsTarget: number;
  worldScaleCurrentKm2: number;
  expansionStages: string;
  itchUrl: string;
  trailerUrl: string;
  discordUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  googleAppsScriptUrl: string;
}

export const siteConfig: SiteConfig = {
  title: "BROKEN HORIZON",
  tagline: "Every road hides a story.",
  description: "An open-world action-adventure set across a fictionalized Rajasthan.",
  secondaryStatement: "Broken Horizon is a PC-first open-world action-adventure set across a fictionalized version of Rajasthan, India.",
  gameEngine: ENGINE_VERSION,
  targetPlatform: "Windows PC",
  setting: "Fictionalized Rajasthan, India",
  developmentPhase: 21,
  developmentPhaseTotal: 50,
  currentDistrictsCount: 13,
  expansionDistrictsTarget: 41,
  worldScaleCurrentKm2: 200,
  expansionStages: "13 → 20 → 30 → 41",
  itchUrl: "https://samwooduis.itch.io/broken-horizon",
  trailerUrl: "#",
  discordUrl: "#",
  youtubeUrl: "#",
  twitterUrl: "#",
  instagramUrl: "#",
  googleAppsScriptUrl: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbx8RVCCOwg0ljiA8xOWYp-wFmktSk0AgITxd4aGaZ93yXBO5kkc6qS2qdkZ5XoAutrV/exec",
};

