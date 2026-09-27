import React from 'react';
import { worldRegions, type WorldRegion } from '../../data/worldData';
import { ChevronRight } from 'lucide-react';

interface JourneyTimelineProps {
  selectedDistrict: WorldRegion | null;
  onSelectDistrict: (region: WorldRegion) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  return (
    <div className="journey-timeline-bar" role="navigation" aria-label="The Road Transit Journey">
      <div className="journey-timeline-label">
        <span className="journey-tag">THE ROAD // TRANSIT ROUTE</span>
      </div>

      <div className="journey-waypoints-track">
        {worldRegions.map((region, idx) => {
          const isSelected = selectedDistrict?.id === region.id;
          return (
            <React.Fragment key={region.id}>
              <button
                type="button"
                className={`waypoint-node-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => onSelectDistrict(region)}
                aria-label={`Journey Stop ${idx + 1}: ${region.name}`}
              >
                <span className="waypoint-idx">{region.index}</span>
                <span className="waypoint-name">{region.name}</span>
              </button>

              {idx < worldRegions.length - 1 && (
                <div className="waypoint-connector" aria-hidden="true">
                  <ChevronRight size={12} className="connector-arrow" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
