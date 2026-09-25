import React from 'react';
import { ArrowLeft, MapPin, Activity, Camera } from 'lucide-react';
import type { WorldRegion } from '../../data/worldData';

interface MapTransitionProps {
  district: WorldRegion | null;
  isOpen: boolean;
  onBack: () => void;
}

export const MapTransition: React.FC<MapTransitionProps> = ({
  district,
  isOpen,
  onBack,
}) => {
  if (!isOpen || !district) return null;

  return (
    <div
      className="district-deep-dive-overlay"
      role="dialog"
      aria-label={`${district.name} Expanded Dossier`}
    >
      <div className="deep-dive-backdrop" onClick={onBack} aria-hidden="true" />

      <div className="deep-dive-card">
        {/* Top Control Bar */}
        <div className="deep-dive-nav">
          <button
            type="button"
            className="deep-dive-back-btn"
            onClick={onBack}
            aria-label="Return to Tactical World Map"
          >
            <ArrowLeft size={16} />
            <span>RETURN TO MAP</span>
          </button>

          <div className="deep-dive-meta">
            <span className="deep-dive-index">{district.index} // 13</span>
            <span className="deep-dive-coord">{district.coordinates}</span>
          </div>
        </div>

        {/* Hero Banner Visual */}
        <div className="deep-dive-hero">
          <img
            src={district.image}
            alt={district.displayName}
            className="deep-dive-hero-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/images/world/world-jaipur.jpg';
            }}
          />
          <div className="deep-dive-hero-overlay" />
          <div className="deep-dive-hero-content">
            <span className="deep-dive-region-tag">{district.region}</span>
            <h1 className="deep-dive-title">{district.name}</h1>
            <p className="deep-dive-subtitle">{district.displayName}</p>
          </div>
        </div>

        {/* Dossier Content Grid */}
        <div className="deep-dive-grid">
          {/* Left Column: Narrative & Character Connection */}
          <div className="deep-dive-col-main">
            <h3 className="deep-dive-section-heading">TERRITORY INTELLIGENCE</h3>
            <p className="deep-dive-quote">&ldquo;{district.quote}&rdquo;</p>
            <p className="deep-dive-full-desc">{district.fullDescription}</p>

            {district.characterAffiliation && (
              <div className="deep-dive-operative-box">
                <div className="operative-header">
                  <Camera size={16} className="operative-icon" />
                  <span className="operative-tag">OPERATIVE CONNECTION</span>
                </div>
                <h4 className="operative-name">{district.characterAffiliation.name}</h4>
                <p className="operative-role">{district.characterAffiliation.role}</p>
              </div>
            )}

            <div className="deep-dive-locations-section">
              <h4 className="locations-heading">NOTABLE SECTORS & WAYPOINTS</h4>
              <div className="locations-grid">
                {district.majorLocations.map((loc) => (
                  <div key={loc} className="location-item-box">
                    <MapPin size={14} className="location-pin" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Parameters */}
          <div className="deep-dive-col-sidebar">
            <h3 className="deep-dive-section-heading">ENVIRONMENT SPECS</h3>

            <div className="specs-list">
              <div className="spec-row">
                <span className="spec-key">BIOME</span>
                <span className="spec-value">{district.biome}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">TERRAIN</span>
                <span className="spec-value">{district.terrain}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">CLIMATE</span>
                <span className="spec-value">{district.climate}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">EST. TRANSIT</span>
                <span className="spec-value">{district.travelTime}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">DISCOVERY STATE</span>
                <span className="spec-value text-amber">{district.discoveryState}</span>
              </div>
            </div>

            <div className="deep-dive-activities-box">
              <h4 className="activities-heading">AVAILABLE MISSIONS & ACTIVITIES</h4>
              <ul className="activities-list">
                {district.activities.map((act) => (
                  <li key={act} className="activity-item">
                    <Activity size={12} className="act-bullet" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
