import React from 'react';
import { X, ArrowRight, Compass, Shield, MapPin, Activity, Flame } from 'lucide-react';
import type { WorldRegion } from '../../data/worldData';

interface DistrictPanelProps {
  district: WorldRegion | null;
  onClose: () => void;
  onExploreDistrict: (district: WorldRegion) => void;
}

export const DistrictPanel: React.FC<DistrictPanelProps> = ({
  district,
  onClose,
  onExploreDistrict,
}) => {
  if (!district) return null;

  return (
    <aside
      className="district-briefing-panel"
      role="dialog"
      aria-label={`${district.name} District Dossier`}
    >
      {/* Header Bar */}
      <div className="d-panel-header">
        <div className="d-panel-badge">
          <span className="badge-index">{district.index}</span>
          <span className="badge-status">{district.discoveryState.toUpperCase()}</span>
        </div>
        <button
          type="button"
          className="d-panel-close-btn"
          onClick={onClose}
          aria-label="Close District Details (ESC)"
        >
          <X size={18} />
        </button>
      </div>

      {/* Hero Image Banner with Fallback */}
      <div className="d-panel-image-wrap">
        <img
          src={district.image}
          alt={district.displayName}
          className="d-panel-image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/images/world/world-jaipur.jpg';
          }}
        />
        <div className="d-panel-image-overlay" />
        <div className="d-panel-coordinates">
          <span>{district.coordinates}</span>
        </div>
      </div>

      {/* Main Narrative Details */}
      <div className="d-panel-body">
        <span className="d-panel-region">{district.region}</span>
        <h2 className="d-panel-name">{district.name}</h2>
        <p className="d-panel-quote">&ldquo;{district.quote}&rdquo;</p>
        <p className="d-panel-desc">{district.description}</p>

        {/* Tactical Key-Value Grid */}
        <div className="d-panel-specs-grid">
          <div className="spec-card">
            <div className="spec-label">
              <Compass size={13} className="spec-icon" />
              <span>TERRAIN</span>
            </div>
            <p className="spec-val">{district.terrain}</p>
          </div>

          <div className="spec-card">
            <div className="spec-label">
              <Shield size={13} className="spec-icon" />
              <span>BIOME</span>
            </div>
            <p className="spec-val">{district.biome}</p>
          </div>

          <div className="spec-card">
            <div className="spec-label">
              <Flame size={13} className="spec-icon" />
              <span>CLIMATE</span>
            </div>
            <p className="spec-val">{district.climate}</p>
          </div>

          <div className="spec-card">
            <div className="spec-label">
              <Activity size={13} className="spec-icon" />
              <span>TRAVEL TIME</span>
            </div>
            <p className="spec-val">{district.travelTime}</p>
          </div>
        </div>

        {/* Character Affiliation Callout if any */}
        {district.characterAffiliation && (
          <div className="d-panel-character-callout">
            <span className="char-callout-tag">KEY OPERATIVE SANCTUARY</span>
            <h4 className="char-callout-name">{district.characterAffiliation.name}</h4>
            <p className="char-callout-role">{district.characterAffiliation.role}</p>
          </div>
        )}

        {/* Major Locations */}
        <div className="d-panel-section">
          <h4 className="section-title">
            <MapPin size={13} />
            <span>KEY LOCATIONS</span>
          </h4>
          <ul className="locations-tags-list">
            {district.majorLocations.map((loc) => (
              <li key={loc} className="loc-pill">{loc}</li>
            ))}
          </ul>
        </div>

        {/* Activities */}
        <div className="d-panel-section">
          <h4 className="section-title">
            <Activity size={13} />
            <span>DISTRICT ACTIVITIES</span>
          </h4>
          <div className="activities-tags-row">
            {district.activities.map((act) => (
              <span key={act} className="activity-badge">{act}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="d-panel-footer">
        <button
          type="button"
          className="d-panel-explore-cta"
          onClick={() => onExploreDistrict(district)}
          aria-label={`Explore ${district.name} in detail`}
        >
          <span>EXPLORE DISTRICT</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
};
