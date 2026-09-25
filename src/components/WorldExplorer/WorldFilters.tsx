import React from 'react';

export type MapFilterType = 'ALL' | 'DISTRICTS' | 'LANDMARKS' | 'STORY' | 'ACTIVITIES' | 'ROADS' | 'CHARACTERS';

interface WorldFiltersProps {
  activeFilter: MapFilterType;
  onChangeFilter: (filter: MapFilterType) => void;
}

export const WorldFilters: React.FC<WorldFiltersProps> = ({
  activeFilter,
  onChangeFilter,
}) => {
  const filters: MapFilterType[] = [
    'ALL',
    'DISTRICTS',
    'LANDMARKS',
    'STORY',
    'ACTIVITIES',
    'ROADS',
    'CHARACTERS',
  ];

  return (
    <div className="world-filter-chips-row" role="radiogroup" aria-label="Map Layer Filters">
      {filters.map((f) => (
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
  );
};
