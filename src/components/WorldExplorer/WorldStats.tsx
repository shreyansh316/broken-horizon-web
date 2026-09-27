import React from 'react';
import { Compass } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface WorldStatsProps {
  currentCoordinates: string;
}

export const WorldStats: React.FC<WorldStatsProps> = ({ currentCoordinates }) => {
  return (
    <div className="world-telemetry-hud" aria-hidden="true">
      {/* Compass Element */}
      <div className="hud-compass-rose">
        <Compass size={18} className="compass-icon-spin" />
        <span className="compass-cardinal">N</span>
      </div>

      {/* World Specs */}
      <div className="hud-stat-col">
        <span className="hud-stat-num">{siteConfig.currentDistrictsCount}</span>
        <span className="hud-stat-lbl">CURRENT DISTRICTS</span>
      </div>

      <div className="hud-stat-divider" />

      <div className="hud-stat-col">
        <span className="hud-stat-num">{siteConfig.worldScaleCurrentKm2} KM²</span>
        <span className="hud-stat-lbl">TARGET PLAYABLE WORLD</span>
      </div>

      <div className="hud-stat-divider" />

      <div className="hud-stat-col">
        <span className="hud-stat-num">UP TO {siteConfig.expansionDistrictsTarget}</span>
        <span className="hud-stat-lbl">EXPANSION VISION</span>
      </div>

      <div className="hud-stat-divider" />

      <div className="hud-stat-col hud-coords-col">
        <span className="hud-stat-coord">{currentCoordinates}</span>
        <span className="hud-stat-lbl">GRID PROTOCOL</span>
      </div>
    </div>
  );
};
