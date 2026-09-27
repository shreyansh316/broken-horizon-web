import React from 'react';
import { type WorldRegion } from '../../data/worldData';
import { ListFilter } from 'lucide-react';

interface DistrictListProps {
  districts: WorldRegion[];
  selectedDistrict: WorldRegion | null;
  onSelectDistrict: (region: WorldRegion) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const DistrictList: React.FC<DistrictListProps> = ({
  districts,
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
        <span>DISTRICT DIRECTORY ({districts.length})</span>
      </button>

      {isOpen && (
        <div
          className="district-drawer-content"
          role="region"
          aria-label="Filtered Districts Directory"
        >
          {districts.length === 0 ? (
            <div style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>
              No districts match these filters.
            </div>
          ) : (
            <ul className="drawer-district-list">
              {districts.map((region) => {
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
          )}
        </div>
      )}
    </div>
  );
};
