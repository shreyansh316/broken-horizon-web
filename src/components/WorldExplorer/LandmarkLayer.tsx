import React from 'react';
import { allMapLandmarks, type MapLandmark } from '../../data/worldData';
import { MapMarker } from './MapMarker';

interface LandmarkLayerProps {
  selectedLandmark: MapLandmark | null;
  onSelectLandmark: (landmark: MapLandmark) => void;
  filter: string;
}

export const LandmarkLayer: React.FC<LandmarkLayerProps> = ({
  selectedLandmark,
  onSelectLandmark,
  filter,
}) => {
  const filteredLandmarks = allMapLandmarks.filter((lm) => {
    if (filter === 'ALL') return true;
    if (filter === 'LANDMARKS') return lm.type === 'landmark';
    if (filter === 'STORY') return lm.type === 'story';
    if (filter === 'ACTIVITIES') return lm.type === 'activity' || lm.type === 'garage';
    if (filter === 'CHARACTERS') return lm.type === 'character' || !!lm.affiliation;
    return true;
  });

  return (
    <g className="landmarks-layer-group">
      {filteredLandmarks.map((landmark) => (
        <MapMarker
          key={landmark.id}
          landmark={landmark}
          isSelected={selectedLandmark?.id === landmark.id}
          onSelect={onSelectLandmark}
        />
      ))}
    </g>
  );
};
