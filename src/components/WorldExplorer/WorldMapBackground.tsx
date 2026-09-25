import React from 'react';

export const WorldMapBackground: React.FC = () => {
  return (
    <g className="map-background-group" aria-hidden="true">
      {/* Deep Canvas Background Layer */}
      <rect x="-400" y="-300" width="2000" height="1500" fill="#08090b" />

      {/* Grid Pattern Coordinates */}
      <defs>
        <pattern id="tactical-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          <circle cx="100" cy="100" r="1.5" fill="rgba(217, 119, 54, 0.15)" />
        </pattern>
        <radialGradient id="horizon-glow-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(217, 119, 54, 0.08)" />
          <stop offset="60%" stopColor="rgba(217, 119, 54, 0.02)" />
          <stop offset="100%" stopColor="rgba(8, 9, 11, 0)" />
        </radialGradient>
        <linearGradient id="sandstone-dune-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(204, 161, 57, 0.06)" />
          <stop offset="100%" stopColor="rgba(194, 136, 84, 0.02)" />
        </linearGradient>
      </defs>

      {/* Subtle Tactical Coordinate Grid */}
      <rect x="-400" y="-300" width="2000" height="1500" fill="url(#tactical-grid)" />

      {/* Radial Horizon Center Glow */}
      <circle cx="550" cy="450" r="600" fill="url(#horizon-glow-radial)" />

      {/* Stylized Topographic Elevation Contours */}
      <g className="elevation-contours" stroke="rgba(217, 119, 54, 0.06)" strokeWidth="1" fill="none">
        <path d="M 100,180 Q 300,120 500,200 T 900,180" />
        <path d="M 80,260 Q 280,200 480,280 T 920,260" />
        <path d="M 120,480 Q 250,420 450,470 T 940,460" />
        <path d="M 150,650 Q 320,590 520,640 T 950,620" />
        <path d="M 220,780 Q 380,720 560,770 T 900,750" />
      </g>

      {/* Western Thar Sand Dune Ripples */}
      <g className="dune-fields" stroke="rgba(204, 161, 57, 0.05)" strokeWidth="1.2" fill="none">
        <path d="M 70,290 C 130,270 170,330 240,310" />
        <path d="M 60,360 C 120,340 180,400 250,380" />
        <path d="M 90,440 C 150,420 200,480 270,460" />
        <path d="M 110,520 C 170,500 220,560 290,540" />
      </g>

      {/* Chambal & Southern Lake Water Contours */}
      <g className="water-contours" stroke="rgba(49, 130, 116, 0.12)" strokeWidth="1.5" fill="none">
        <path d="M 430,750 Q 470,740 500,770 T 540,790" />
        <path d="M 420,780 Q 460,770 490,800 T 530,820" />
        <path d="M 760,650 Q 790,690 820,680 T 870,720" />
      </g>

      {/* Atmospheric Dust motes */}
      <g className="map-dust-particles" opacity="0.3">
        <circle cx="280" cy="220" r="1.5" fill="#cca139" className="dust-float-1" />
        <circle cx="480" cy="380" r="1" fill="#cca139" className="dust-float-2" />
        <circle cx="720" cy="520" r="1.5" fill="#cca139" className="dust-float-3" />
        <circle cx="340" cy="680" r="1" fill="#cca139" className="dust-float-1" />
        <circle cx="850" cy="320" r="1.5" fill="#cca139" className="dust-float-2" />
      </g>

      {/* In-Game Decorative Coordinate Hash Marks */}
      <g className="coordinate-callouts" fill="rgba(255, 255, 255, 0.15)" fontSize="9" fontFamily="var(--font-mono)">
        <text x="50" y="50">GRID // 26°N 70°E // WESTERN THAR SECTOR</text>
        <text x="850" y="50">HORIZON TRANSIT PROTOCOL // REV 2.4</text>
        <text x="50" y="880">TERRAIN: ARID CAPROCK / PLATEAU / RIVER BASIN</text>
        <text x="920" y="880">BH-RAJ-MAP-21</text>
      </g>
    </g>
  );
};
