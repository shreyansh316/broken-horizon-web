import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, Compass, User, AlertCircle } from 'lucide-react';
import { worldRegions, allMapLandmarks, type WorldRegion } from '../../data/worldData';

interface SearchResultItem {
  id: string;
  title: string;
  category: 'district' | 'landmark' | 'character' | 'activity';
  subtitle: string;
  targetRegion: WorldRegion;
  targetCoordinates: { x: number; y: number };
}

interface WorldSearchProps {
  onSelectResult: (result: SearchResultItem) => void;
}

export const WorldSearch: React.FC<WorldSearchProps> = ({ onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Index all searchables: districts, landmarks, character locations, activities
  const allSearchItems = useMemo(() => {
    const items: SearchResultItem[] = [];

    // Districts
    worldRegions.forEach((r) => {
      items.push({
        id: `search-dist-${r.id}`,
        title: r.name,
        category: 'district',
        subtitle: `${r.biome} // ${r.region}`,
        targetRegion: r,
        targetCoordinates: r.mapCoordinates,
      });

      // Activities in district
      r.activities.forEach((act) => {
        items.push({
          id: `search-act-${r.id}-${act}`,
          title: act,
          category: 'activity',
          subtitle: `Activity in ${r.name}`,
          targetRegion: r,
          targetCoordinates: r.mapCoordinates,
        });
      });

      // Character Affiliations
      if (r.characterAffiliation) {
        items.push({
          id: `search-char-${r.id}`,
          title: r.characterAffiliation.name,
          category: 'character',
          subtitle: `${r.characterAffiliation.role} (${r.name})`,
          targetRegion: r,
          targetCoordinates: r.mapCoordinates,
        });
      }
    });

    // Landmarks
    allMapLandmarks.forEach((lm) => {
      const reg = worldRegions.find((r) => r.id === lm.districtId) || worldRegions[0];
      items.push({
        id: `search-lm-${lm.id}`,
        title: lm.name,
        category: 'landmark',
        subtitle: `${lm.type.toUpperCase()} in ${reg.name}`,
        targetRegion: reg,
        targetCoordinates: { x: lm.x, y: lm.y },
      });
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allSearchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query, allSearchItems]);

  const handleSelect = (item: SearchResultItem) => {
    onSelectResult(item);
    setQuery('');
    setIsOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'character':
        return <User size={13} />;
      case 'landmark':
        return <MapPin size={13} />;
      case 'activity':
        return <AlertCircle size={13} />;
      case 'district':
      default:
        return <Compass size={13} />;
    }
  };

  return (
    <div className="world-search-container" role="search">
      <div className={`search-input-wrapper ${isOpen || query ? 'is-focused' : ''}`}>
        <Search size={15} className="search-icon-lens" />
        <input
          type="text"
          className="search-input-field"
          placeholder="SEARCH WORLD (JAIPUR, GARAGE, KAVYA...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          aria-label="Search World Locations, Districts and Operatives"
        />
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setQuery('')}
            aria-label="Clear Search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="search-results-dropdown" role="listbox">
          {filteredResults.length === 0 ? (
            <div className="search-no-results">
              <span>NO TERRITORY DATA FOR &ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                type="button"
                className="search-result-row"
                onClick={() => handleSelect(item)}
                role="option"
                aria-selected="false"
              >
                <div className={`search-res-icon icon-${item.category}`}>
                  {getCategoryIcon(item.category)}
                </div>
                <div className="search-res-text">
                  <span className="search-res-title">{item.title}</span>
                  <span className="search-res-subtitle">{item.subtitle}</span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
