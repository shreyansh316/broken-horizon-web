import React, { useState } from 'react';
import { worldRoutes, type MapRoute } from '../../data/worldData';

interface RouteNetworkProps {
  filter: string;
}

export const RouteNetwork: React.FC<RouteNetworkProps> = ({ filter }) => {
  const [hoveredCorridor, setHoveredCorridor] = useState<MapRoute | null>(null);

  const isCorridorActive = filter === 'ALL' || filter === 'STORY' || filter === 'ROADS';
  if (!isCorridorActive) return null;

  const corridorRoutes = worldRoutes.filter(r => r.type === 'corridor');

  return (
    <g className="horizon-corridor-network" aria-label="Horizon Corridor Infrastructure Network">
      <defs>
        <filter id="corridor-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {corridorRoutes.map((route: MapRoute) => (
        <g
          key={route.id}
          className="corridor-route-item"
          onMouseEnter={() => setHoveredCorridor(route)}
          onMouseLeave={() => setHoveredCorridor(null)}
          style={{ cursor: 'pointer' }}
        >
          {/* Broad Invisible Hit Target */}
          <path
            d={route.path}
            fill="none"
            stroke="transparent"
            strokeWidth="16"
          />

          {/* Corridor Red Glow Aura */}
          <path
            d={route.path}
            fill="none"
            stroke="rgba(217, 54, 54, 0.25)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#corridor-glow)"
          />

          {/* Corridor Core Red Cable */}
          <path
            d={route.path}
            fill="none"
            stroke="#e04b4b"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            strokeLinecap="round"
            className="corridor-pulse-line"
          />
        </g>
      ))}

      {/* Floating Corridor Label Marker */}
      <g transform="translate(560, 430)" className="corridor-network-badge" pointerEvents="none">
        <rect
          x="-75"
          y="-12"
          width="150"
          height="24"
          rx="3"
          fill="rgba(12, 14, 18, 0.85)"
          stroke="#e04b4b"
          strokeWidth="1"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="#ff8585"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.14em"
          fontWeight="bold"
        >
          HORIZON CORRIDOR
        </text>
      </g>

      {/* Tooltip on Hover */}
      {hoveredCorridor && (
        <g transform="translate(560, 465)" pointerEvents="none">
          <rect
            x="-140"
            y="-10"
            width="280"
            height="32"
            rx="4"
            fill="rgba(5, 6, 8, 0.95)"
            stroke="rgba(224, 75, 75, 0.6)"
            strokeWidth="1"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="8.5"
            fontFamily="var(--font-body)"
          >
            Fictional private logistics & surveillance network
          </text>
          <text
            x="0"
            y="16"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.5)"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
          >
            {hoveredCorridor.name} // {hoveredCorridor.distanceKm} KM
          </text>
        </g>
      )}
    </g>
  );
};
