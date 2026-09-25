import React from 'react';
import { worldRegions, type WorldRegion } from '../../data/worldData';
import { DistrictShape } from './DistrictShape';

interface DistrictLayerProps {
  selectedDistrict: WorldRegion | null;
  hoveredDistrict: WorldRegion | null;
  onSelectDistrict: (region: WorldRegion) => void;
  onHoverDistrict: (region: WorldRegion | null) => void;
  filter: string;
}

export const DistrictLayer: React.FC<DistrictLayerProps> = ({
  selectedDistrict,
  hoveredDistrict,
  onSelectDistrict,
  onHoverDistrict,
  filter,
}) => {
  // If filter is specific to other layers (e.g. only landmarks), we can dim districts slightly
  const isDimmed = filter !== 'ALL' && filter !== 'DISTRICTS';

  return (
    <g
      className={`district-layer-group ${isDimmed ? 'layer-dimmed' : ''}`}
      style={{ opacity: isDimmed ? 0.45 : 1, transition: 'opacity 0.3s ease' }}
    >
      {worldRegions.map((region) => (
        <DistrictShape
          key={region.id}
          region={region}
          isSelected={selectedDistrict?.id === region.id}
          isHovered={hoveredDistrict?.id === region.id}
          onSelect={onSelectDistrict}
          onHover={onHoverDistrict}
        />
      ))}
    </g>
  );
};
