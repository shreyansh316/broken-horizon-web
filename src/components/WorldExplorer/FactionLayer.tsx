import React from 'react';

interface FactionLayerProps {
  isVisible: boolean;
}

export const FactionLayer: React.FC<FactionLayerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <g className="faction-intelligence-layer" aria-label="Faction Territorial Influence & Turf Control">
      <defs>
        <pattern id="faction-hatch-sindhu" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(217, 119, 54, 0.35)" strokeWidth="3" />
        </pattern>
        <pattern id="faction-hatch-mewar" width="12" height="12" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(197, 48, 48, 0.35)" strokeWidth="3" />
        </pattern>
        <pattern id="faction-hatch-smugglers" width="12" height="12" patternTransform="rotate(30 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(204, 161, 57, 0.35)" strokeWidth="3" />
        </pattern>
        <pattern id="faction-hatch-police" width="12" height="12" patternTransform="rotate(60 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(43, 108, 176, 0.35)" strokeWidth="3" />
        </pattern>
      </defs>

      {/* 1. Thar Desert Smugglers Turf (North-West) */}
      <g className="faction-sector faction-smugglers">
        <path
          d="M 60,180 L 260,160 L 320,380 L 160,540 L 40,400 Z"
          fill="url(#faction-hatch-smugglers)"
          stroke="#cca139"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />
        <g transform="translate(140, 240)" className="faction-turf-badge">
          <rect x="0" y="0" width="165" height="26" rx="2" fill="rgba(15, 17, 23, 0.9)" stroke="#cca139" strokeWidth="1" />
          <text x="8" y="17" fill="#cca139" fontSize="10" fontFamily="monospace" fontWeight="bold">
            THAR SMUGGLER RUN // 74%
          </text>
        </g>
      </g>

      {/* 2. Rajasthan State Police & SOG Rapid Hub (Central East / Jaipur) */}
      <g className="faction-sector faction-police">
        <path
          d="M 520,280 L 740,260 L 800,420 L 620,460 L 500,380 Z"
          fill="url(#faction-hatch-police)"
          stroke="#3182ce"
          strokeWidth="1.8"
        />
        <g transform="translate(610, 310)" className="faction-turf-badge">
          <rect x="0" y="0" width="175" height="26" rx="2" fill="rgba(15, 17, 23, 0.9)" stroke="#3182ce" strokeWidth="1" />
          <text x="8" y="17" fill="#63b3ed" fontSize="10" fontFamily="monospace" fontWeight="bold">
            SOG JURISDICTION // 88%
          </text>
        </g>
      </g>

      {/* 3. Sindhu Sand Mining Syndicate (Chambal Ravines & Kota) */}
      <g className="faction-sector faction-sindhu">
        <path
          d="M 640,470 L 920,490 L 880,720 L 680,680 Z"
          fill="url(#faction-hatch-sindhu)"
          stroke="#d97736"
          strokeWidth="1.8"
          strokeDasharray="4 2"
        />
        <g transform="translate(730, 560)" className="faction-turf-badge">
          <rect x="0" y="0" width="170" height="26" rx="2" fill="rgba(15, 17, 23, 0.9)" stroke="#d97736" strokeWidth="1" />
          <text x="8" y="17" fill="#fbd38d" fontSize="10" fontFamily="monospace" fontWeight="bold">
            SINDHU SYNDICATE // 92%
          </text>
        </g>
      </g>

      {/* 4. Mewar Royal Antique Cartel (Udaipur & South Hills) */}
      <g className="faction-sector faction-mewar">
        <path
          d="M 360,560 L 580,540 L 550,810 L 330,760 Z"
          fill="url(#faction-hatch-mewar)"
          stroke="#e53e3e"
          strokeWidth="1.8"
        />
        <g transform="translate(410, 680)" className="faction-turf-badge">
          <rect x="0" y="0" width="170" height="26" rx="2" fill="rgba(15, 17, 23, 0.9)" stroke="#e53e3e" strokeWidth="1" />
          <text x="8" y="17" fill="#fc8181" fontSize="10" fontFamily="monospace" fontWeight="bold">
            MEWAR CARTEL // 81%
          </text>
        </g>
      </g>

      {/* Border Conflict Hotspots */}
      <g className="border-skirmish-hotspot" transform="translate(560, 480)">
        <circle cx="0" cy="0" r="14" fill="none" stroke="#ecc94b" strokeWidth="1.5" className="anim-pulse-glow" />
        <circle cx="0" cy="0" r="4" fill="#ecc94b" />
        <text x="18" y="4" fill="#ecc94b" fontSize="9" fontFamily="monospace" fontWeight="bold">
          CONTESTED FRONTIER
        </text>
      </g>
    </g>
  );
};
