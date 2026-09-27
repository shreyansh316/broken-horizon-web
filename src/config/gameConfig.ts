import { ENGINE_VERSION } from './siteConfig';

export interface GameConfig {
  title: string;
  tagline: string;
  secondaryDescription: string;
  developmentPhase: number;
  developmentPhaseTotal: number;
  downloadURL: string;
  trailerURL: string;
  discordURL: string;
  youtubeURL: string;
  xURL: string;
  instagramURL: string;
  targetPlatform: string;
  engine: string;
  expectedBuildMilestone: string;
}

export const gameConfig: GameConfig = {
  title: "BROKEN HORIZON",
  tagline: "Every road hides a story.",
  secondaryDescription: "An open-world action-adventure set across a fictionalized Rajasthan.",
  developmentPhase: 21,
  developmentPhaseTotal: 50,
  downloadURL: "#access",
  trailerURL: "#trailer",
  discordURL: "#",
  youtubeURL: "#",
  xURL: "#",
  instagramURL: "#",
  targetPlatform: "PC / Windows",
  engine: ENGINE_VERSION,
  expectedBuildMilestone: "First Major Development Milestone (Target: Phase 25)",
};

