import React from 'react';
import { FileText, Camera, Radio, Compass, Disc } from 'lucide-react';
import type { EvidenceItem } from '../../data/storyData';

interface EvidenceCardProps {
  item: EvidenceItem;
  isSelected: boolean;
  onSelect: (item: EvidenceItem) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'photograph':
        return <Camera size={13} />;
      case 'wiretap':
        return <Radio size={13} />;
      case 'blueprint':
        return <Compass size={13} />;
      case 'physical':
        return <Disc size={13} />;
      case 'document':
      default:
        return <FileText size={13} />;
    }
  };

  return (
    <div
      className={`corkboard-evidence-pin ${isSelected ? 'pin-active' : ''}`}
      style={{
        left: `${item.pinPosition.x}%`,
        top: `${item.pinPosition.y}%`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`Evidence: ${item.title}. Category: ${item.category}. Recovered in ${item.districtId}. Click to inspect.`}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      {/* Red Thumbtack Head */}
      <div className="thumbtack-head" aria-hidden="true">
        <div className="tack-metal-point" />
      </div>

      {/* Pinned Card Body */}
      <div className="evidence-card-body">
        {item.image && (
          <div className="evidence-thumb-frame">
            <img
              src={item.image}
              alt={item.title}
              className="evidence-thumb-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/images/world/world-jaipur.jpg';
              }}
            />
            <div className="evidence-thumb-overlay" />
          </div>
        )}

        <div className="evidence-meta-row">
          <span className={`evidence-category-badge cat-${item.category}`}>
            {getCategoryIcon(item.category)}
            <span>{item.category.toUpperCase()}</span>
          </span>
          <span className="evidence-date">{item.dateRecovered}</span>
        </div>

        <h4 className="evidence-title">{item.title}</h4>
        <p className="evidence-summary-snippet">{item.summary}</p>

        <div className="evidence-location-tag">
          <span>LOC: {item.recoveredLocation.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
