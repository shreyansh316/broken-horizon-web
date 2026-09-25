import React from 'react';
import { worldRegions, type WorldRegion } from '../../data/worldData';
import { ListFilter } from 'lucide-react';

interface DistrictListProps {
  selectedDistrict: WorldRegion | null;
  onSelectDistrict: (region: WorldRegion) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const DistrictList: React.FC<DistrictListProps> = ({
  selectedDistrict,
  onSelectDistrict,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={`district-drawer-wrap ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="district-drawer-toggle-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label="Toggle accessible district index"
      >
        <ListFilter size={15} />
        <span>DISTRICT DIRECTORY ({worldRegions.length})</span>
      </button>

      {isOpen && (
        <div
          className="district-drawer-content"
          role="region"
          aria-label="All 13 Game Districts Directory"
        >
          <ul className="drawer-district-list">
            {worldRegions.map((region) => {
              const isSelected = selectedDistrict?.id === region.id;
              return (
                <li key={region.id} className="drawer-district-item">
                  <button
                    type="button"
                    className={`drawer-district-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => {
                      onSelectDistrict(region);
                    }}
                    aria-current={isSelected ? 'true' : undefined}
                  >
                    <span className="drawer-index">{region.index}</span>
                    <div className="drawer-info">
                      <span className="drawer-name">{region.name}</span>
                      <span className="drawer-biome">{region.biome}</span>
                    </div>
                    <span className="drawer-status-pill">{region.discoveryState}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
