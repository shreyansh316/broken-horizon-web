import React from 'react';
import { X } from 'lucide-react';

interface MapLegendProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapLegend: React.FC<MapLegendProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="map-legend-card" role="region" aria-label="Cartographic Legend">
      <div className="legend-header">
        <span className="legend-title">CARTOGRAPHIC KEY</span>
        <button
          type="button"
          className="legend-close-btn"
          onClick={onClose}
          aria-label="Close Map Legend"
        >
          <X size={14} />
        </button>
      </div>

      <div className="legend-items-list">
        <div className="legend-item">
          <div className="legend-swatch line-primary" />
          <span className="legend-text">Primary Highways (NH Network)</span>
        </div>

        <div className="legend-item">
          <div className="legend-swatch line-corridor" />
          <span className="legend-text">Horizon Corridor (Clandestine Network)</span>
        </div>

        <div className="legend-item">
          <div className="legend-swatch marker-district" />
          <span className="legend-text">District Boundary & Seat</span>
        </div>

        <div className="legend-item">
          <div className="legend-swatch marker-garage" />
          <span className="legend-text">Automotive Garages & Tuning</span>
        </div>

        <div className="legend-item">
          <div className="legend-swatch marker-character" />
          <span className="legend-text">Character Operations Hub</span>
        </div>

        <div className="legend-item">
          <div className="legend-swatch marker-story" />
          <span className="legend-text">Story Checkpoint & Terminal</span>
        </div>
      </div>

      <div className="legend-footer-note">
        <span>GRID: BH-RAJ-TACTICAL // PROJECTION: FICTIONAL</span>
      </div>
    </div>
  );
};
