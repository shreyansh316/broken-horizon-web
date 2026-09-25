import React from 'react';

export type MapFilterType = 'ALL' | 'DISTRICTS' | 'LANDMARKS' | 'STORY' | 'ACTIVITIES' | 'ROADS' | 'CHARACTERS';
export type DistrictCategoryFilter = 'ALL' | 'URBAN' | 'RURAL' | 'HERITAGE' | 'HIGHWAY' | 'INDUSTRIAL' | 'FOREST' | 'DESERT' | 'LAKE' | 'TRANSPORT' | 'INVESTIGATION' | 'SECURITY' | 'SPECIAL';
export type DistrictStatusFilter = 'ALL' | 'ACTIVE' | 'FUTURE';

interface WorldFiltersProps {
  activeFilter: MapFilterType;
  onChangeFilter: (filter: MapFilterType) => void;
  activeCategory?: DistrictCategoryFilter;
  onChangeCategory?: (filter: DistrictCategoryFilter) => void;
  activeStatus?: DistrictStatusFilter;
  onChangeStatus?: (filter: DistrictStatusFilter) => void;
}

export const WorldFilters: React.FC<WorldFiltersProps> = ({
  activeFilter,
  onChangeFilter,
  activeCategory = 'ALL',
  onChangeCategory,
  activeStatus = 'ALL',
  onChangeStatus,
}) => {
  const mapFilters: MapFilterType[] = [
    'ALL', 'DISTRICTS', 'LANDMARKS', 'STORY', 'ACTIVITIES', 'ROADS', 'CHARACTERS'
  ];

  const categoryFilters: DistrictCategoryFilter[] = [
    'ALL', 'URBAN', 'RURAL', 'HERITAGE', 'HIGHWAY', 'INDUSTRIAL', 'FOREST', 'DESERT', 'LAKE', 'TRANSPORT', 'INVESTIGATION', 'SECURITY', 'SPECIAL'
  ];

  const statusFilters: DistrictStatusFilter[] = [
    'ALL', 'ACTIVE', 'FUTURE'
  ];

  return (
    <div className="world-filter-strip-inner">
      <div className="world-filter-chips-row" role="radiogroup" aria-label="Map Layer Filters">
        <span className="filter-label">MAP LAYERS:</span>
        {mapFilters.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-chip-btn ${activeFilter === f ? 'is-active' : ''}`}
            onClick={() => onChangeFilter(f)}
            role="radio"
            aria-checked={activeFilter === f}
          >
            {f}
          </button>
        ))}
      </div>
      
      {onChangeCategory && (
        <div className="world-filter-chips-row" role="radiogroup" aria-label="District Category Filters">
          <span className="filter-label">CATEGORY:</span>
          {categoryFilters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip-btn ${activeCategory === f ? 'is-active' : ''}`}
              onClick={() => onChangeCategory(f)}
              role="radio"
              aria-checked={activeCategory === f}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {onChangeStatus && (
        <div className="world-filter-chips-row" role="radiogroup" aria-label="District Status Filters">
          <span className="filter-label">STATUS:</span>
          {statusFilters.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-chip-btn ${activeStatus === f ? 'is-active' : ''}`}
              onClick={() => onChangeStatus(f)}
              role="radio"
              aria-checked={activeStatus === f}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
