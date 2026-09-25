import React from 'react';
import type { MapLandmark } from '../../data/worldData';

interface MapMarkerProps {
  landmark: MapLandmark;
  isSelected: boolean;
  onSelect: (landmark: MapLandmark) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  landmark,
  isSelected,
  onSelect,
}) => {
  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'garage':
        return '#f4a460';
      case 'character':
        return '#38bdf8';
      case 'story':
        return '#e04b4b';
      case 'activity':
        return '#cca139';
      case 'safehouse':
        return '#4ade80';
      case 'landmark':
      default:
        return '#d97736';
    }
  };

  const color = getMarkerColor(landmark.type);

  return (
    <g
      className={`map-marker-item marker-${landmark.type} ${isSelected ? 'marker-selected' : ''}`}
      transform={`translate(${landmark.x}, ${landmark.y})`}
      role="button"
      tabIndex={0}
      aria-label={`${landmark.name} (${landmark.type}). ${landmark.description}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(landmark);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(landmark);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer Pulse ring on selected */}
      {isSelected && (
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          className="marker-selected-pulse"
        />
      )}

      {/* Background Diamond/Hexagon */}
      <polygon
        points="0,-8 7,0 0,8 -7,0"
        fill="#0c0e12"
        stroke={color}
        strokeWidth="1.5"
        style={{
          transition: 'transform 0.2s ease',
          transform: isSelected ? 'scale(1.2)' : 'scale(1)',
        }}
      />

      {/* Center Core Dot */}
      <circle cx="0" cy="0" r="2.5" fill={color} />

      {/* Marker Badge Tooltip (Visible on hover or selected) */}
      <g className="marker-badge-hover" transform="translate(10, -10)" pointerEvents="none">
        <rect
          x="0"
          y="-12"
          width={landmark.name.length * 7 + 16}
          height="18"
          rx="3"
          fill="rgba(8, 9, 11, 0.92)"
          stroke={color}
          strokeWidth="1"
        />
        <text
          x="8"
          y="1"
          fill="#ffffff"
          fontSize="8.5"
          fontFamily="var(--font-subheading)"
          fontWeight="bold"
          letterSpacing="0.06em"
        >
          {landmark.name}
        </text>
      </g>
    </g>
  );
};
