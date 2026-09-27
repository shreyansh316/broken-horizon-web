import React from 'react';
import type { WorldRegion } from '../../data/worldData';

interface DistrictShapeProps {
  region: WorldRegion;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (region: WorldRegion) => void;
  onHover: (region: WorldRegion | null) => void;
}

export const DistrictShape: React.FC<DistrictShapeProps> = ({
  region,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(region);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(region);
    }
  };

  return (
    <g
      className={`district-shape-group ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`District ${region.name}, ${region.populationStyle}. Press Enter to view details.`}
      onClick={handleClick}
      onMouseEnter={() => onHover(region)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(region)}
      onBlur={() => onHover(null)}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
    >
      {/* District Boundary Polygon */}
      <path
        d={region.mapPath}
        className="district-polygon-path"
        fill={
          isSelected
            ? 'rgba(217, 119, 54, 0.22)'
            : isHovered
            ? 'rgba(217, 119, 54, 0.12)'
            : region.discoveryState === 'LOCKED'
            ? 'rgba(255, 255, 255, 0.01)'
            : region.discoveryState === 'IN DEVELOPMENT'
            ? 'rgba(0, 150, 255, 0.03)'
            : 'rgba(217, 119, 54, 0.05)'
        }
        stroke={
          isSelected
            ? '#f4a460'
            : isHovered
            ? '#d97736'
            : region.discoveryState === 'LOCKED'
            ? 'rgba(255, 255, 255, 0.08)'
            : region.discoveryState === 'IN DEVELOPMENT'
            ? 'rgba(0, 150, 255, 0.3)'
            : 'rgba(217, 119, 54, 0.3)'
        }
        strokeWidth={isSelected ? '2.5' : isHovered ? '1.8' : '1'}
        strokeLinejoin="round"
        style={{
          transition: 'fill 0.3s ease, stroke 0.3s ease, stroke-width 0.3s ease',
          filter: isSelected ? 'drop-shadow(0 0 12px rgba(217, 119, 54, 0.4))' : 'none',
        }}
      />

      {/* District Center Node */}
      <circle
        cx={region.mapCoordinates.x}
        cy={region.mapCoordinates.y}
        r={isSelected ? 6 : isHovered ? 5 : 3.5}
        fill={
          isSelected
            ? '#f4a460'
            : region.discoveryState === 'LOCKED'
            ? '#444'
            : region.discoveryState === 'IN DEVELOPMENT'
            ? '#0096ff'
            : '#ff5500'
        }
        stroke="#08090b"
        strokeWidth="1.5"
        style={{ transition: 'r 0.25s ease' }}
      />

      {isSelected && (
        <circle
          cx={region.mapCoordinates.x}
          cy={region.mapCoordinates.y}
          r="12"
          fill="none"
          stroke="#f4a460"
          strokeWidth="1"
          strokeDasharray="2 2"
          className="selected-node-pulse"
        />
      )}

      {/* District Typography Label */}
      <text
        x={region.mapCoordinates.x}
        y={region.mapCoordinates.y - 12}
        textAnchor="middle"
        className="district-svg-label"
        fill={
          isSelected
            ? '#ffffff'
            : isHovered
            ? '#f4a460'
            : region.discoveryState === 'LOCKED'
            ? 'rgba(255, 255, 255, 0.3)'
            : region.discoveryState === 'IN DEVELOPMENT'
            ? '#0096ff'
            : '#ff5500'
        }
        fontSize={isSelected ? '12' : '10'}
        fontWeight={isSelected ? '800' : '600'}
        letterSpacing="0.12em"
        fontFamily="var(--font-display)"
        style={{
          textShadow: '0 2px 6px rgba(0,0,0,0.9)',
          transition: 'fill 0.2s ease, font-size 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        {region.name}
      </text>

      {/* Subtitle / Index Code */}
      <text
        x={region.mapCoordinates.x}
        y={region.mapCoordinates.y + 14}
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.35)"
        fontSize="7.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
        style={{ pointerEvents: 'none' }}
      >
        {region.index} // {region.discoveryState.toUpperCase()}
      </text>
    </g>
  );
};
