import React from 'react';

interface WeatherRadarLayerProps {
  isVisible: boolean;
}

export const WeatherRadarLayer: React.FC<WeatherRadarLayerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <g className="weather-radar-layer" aria-label="Live Meteorological Radar & Hazard Fronts">
      <defs>
        {/* Animated Radar Sweep Gradient */}
        <radialGradient id="radar-sweep-cone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(49, 130, 116, 0.25)" />
          <stop offset="60%" stopColor="rgba(49, 130, 116, 0.08)" />
          <stop offset="100%" stopColor="rgba(49, 130, 116, 0)" />
        </radialGradient>

        {/* Sandstorm Dust Gradient */}
        <radialGradient id="sandstorm-gradient" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(204, 161, 57, 0.45)" />
          <stop offset="50%" stopColor="rgba(217, 119, 54, 0.25)" />
          <stop offset="100%" stopColor="rgba(204, 161, 57, 0)" />
        </radialGradient>

        {/* Monsoon Rain Front Gradient */}
        <radialGradient id="monsoon-rain-gradient" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(49, 130, 196, 0.4)" />
          <stop offset="60%" stopColor="rgba(49, 130, 196, 0.15)" />
          <stop offset="100%" stopColor="rgba(49, 130, 196, 0)" />
        </radialGradient>

        {/* Heat Mirage Gradient */}
        <radialGradient id="heat-mirage-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(235, 87, 87, 0.35)" />
          <stop offset="70%" stopColor="rgba(217, 119, 54, 0.1)" />
          <stop offset="100%" stopColor="rgba(235, 87, 87, 0)" />
        </radialGradient>
      </defs>

      {/* 1. Western Thar Dust Storm Front ("Aandhi") */}
      <g className="radar-hazard sandstorm-front">
        <circle cx="210" cy="360" r="140" fill="url(#sandstorm-gradient)" />
        <ellipse cx="270" cy="420" rx="100" ry="70" fill="url(#sandstorm-gradient)" opacity="0.8" />
        
        {/* Animated Dust Wave Lines */}
        <path
          d="M 120,320 Q 200,300 280,340 T 360,330"
          fill="none"
          stroke="rgba(255, 215, 0, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="anim-radar-wave"
        />
        <path
          d="M 140,370 Q 220,350 300,390 T 380,380"
          fill="none"
          stroke="rgba(255, 215, 0, 0.4)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          className="anim-radar-wave-delayed"
        />

        {/* Hazard Tactical Tag */}
        <g transform="translate(140, 270)" className="weather-hud-tag">
          <rect x="0" y="0" width="130" height="24" rx="2" fill="rgba(10, 12, 16, 0.85)" stroke="#cca139" strokeWidth="1" />
          <text x="8" y="16" fill="#cca139" fontSize="10" fontFamily="monospace" fontWeight="bold">
            AANDHI // 78 KM/H
          </text>
        </g>
      </g>

      {/* 2. Central Sambhar Salt Flat Thermal Heat Mirage */}
      <g className="radar-hazard heat-mirage-zone">
        <ellipse cx="490" cy="420" rx="90" ry="55" fill="url(#heat-mirage-gradient)" />
        <g transform="translate(430, 370)" className="weather-hud-tag">
          <rect x="0" y="0" width="120" height="24" rx="2" fill="rgba(10, 12, 16, 0.85)" stroke="#eb5757" strokeWidth="1" />
          <text x="8" y="16" fill="#eb5757" fontSize="10" fontFamily="monospace" fontWeight="bold">
            HEAT MIRAGE // 46°C
          </text>
        </g>
      </g>

      {/* 3. South-Eastern Monsoon Rain Cell */}
      <g className="radar-hazard monsoon-front">
        <circle cx="680" cy="650" r="110" fill="url(#monsoon-rain-gradient)" />
        <ellipse cx="600" cy="720" rx="90" ry="60" fill="url(#monsoon-rain-gradient)" opacity="0.7" />
        
        {/* Rain bands */}
        <path
          d="M 580,620 Q 640,600 720,640 T 780,660"
          fill="none"
          stroke="rgba(90, 175, 255, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          className="anim-radar-wave"
        />

        <g transform="translate(630, 600)" className="weather-hud-tag">
          <rect x="0" y="0" width="145" height="24" rx="2" fill="rgba(10, 12, 16, 0.85)" stroke="#5aafff" strokeWidth="1" />
          <text x="8" y="16" fill="#5aafff" fontSize="10" fontFamily="monospace" fontWeight="bold">
            MONSOON CELL // FLASH
          </text>
        </g>
      </g>

      {/* Rotating Radar Crosshairs & Sweep Beam */}
      <g className="radar-sweep-center" transform="translate(550, 450)">
        <circle cx="0" cy="0" r="380" fill="none" stroke="rgba(49, 130, 116, 0.25)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="0" cy="0" r="220" fill="none" stroke="rgba(49, 130, 116, 0.2)" strokeWidth="1" />
        <line x1="-400" y1="0" x2="400" y2="0" stroke="rgba(49, 130, 116, 0.15)" strokeWidth="1" />
        <line x1="0" y1="-400" x2="0" y2="400" stroke="rgba(49, 130, 116, 0.15)" strokeWidth="1" />
        
        {/* Animated Sweep Line */}
        <line
          x1="0"
          y1="0"
          x2="380"
          y2="0"
          stroke="rgba(49, 130, 116, 0.7)"
          strokeWidth="2"
          className="anim-radar-sweep"
        />
      </g>
    </g>
  );
};
