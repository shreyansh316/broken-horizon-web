import React, { useState } from 'react';
import { ArrowLeft, MapPin, Activity, Camera, Layers, Navigation2, Gamepad2, Image as ImageIcon } from 'lucide-react';
import type { WorldRegion } from '../../data/worldData';
import { Lightbox } from './Lightbox';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!isOpen || !district) return null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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

            {/* Gallery Section */}
            <div className="deep-dive-gallery-section">
              <h4 className="locations-heading">
                <ImageIcon size={14} className="heading-icon" />
                ENVIRONMENTAL INTEL
              </h4>
              {district.gallery && district.gallery.length > 0 ? (
                <div className="gallery-grid">
                  {/* Large Feature Image */}
                  <div 
                    className="gallery-feature-item" 
                    onClick={() => openLightbox(0)}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={district.gallery[0].url} alt={district.gallery[0].title} />
                    <div className="gallery-item-overlay">
                      <span className="gallery-item-title">{district.gallery[0].title}</span>
                      <span className="gallery-item-type">{district.gallery[0].type}</span>
                    </div>
                  </div>
                  
                  {/* Smaller Images */}
                  <div className="gallery-thumbnails">
                    {district.gallery.slice(1).map((img, idx) => (
                      <div 
                        key={idx + 1} 
                        className="gallery-thumb-item"
                        onClick={() => openLightbox(idx + 1)}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={img.url} alt={img.title} />
                        <div className="gallery-item-overlay-small">
                          <span className="gallery-item-title-small">{img.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="no-intel-text">No environmental intel available for this sector.</p>
              )}
            </div>

            <div className="deep-dive-locations-section">
              <h4 className="locations-heading">
                <MapPin size={14} className="heading-icon" />
                NOTABLE SECTORS & WAYPOINTS
              </h4>
              <div className="locations-grid">
                {district.majorLocations.map((loc) => (
                  <div key={loc} className="location-item-box">
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
                <span className="spec-key">DISCOVERY STATE</span>
                <span className="spec-value text-amber">{district.discoveryState}</span>
              </div>
            </div>

            <div className="deep-dive-activities-box">
              <h4 className="activities-heading">
                <Layers size={14} className="heading-icon" />
                LOCATION TYPES
              </h4>
              <div className="tags-flex">
                {district.locationCategories?.map((cat) => (
                  <span key={cat} className="category-tag">{cat}</span>
                ))}
              </div>
            </div>

            <div className="deep-dive-activities-box">
              <h4 className="activities-heading">
                <Navigation2 size={14} className="heading-icon" />
                TRANSPORTATION
              </h4>
              <div className="transport-list">
                {district.transportation?.map((trans) => (
                  <div key={trans.category} className="transport-row">
                    <span className="transport-category">{trans.category}:</span>
                    <span className="transport-options">{trans.options.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="deep-dive-activities-box">
              <h4 className="activities-heading">
                <Gamepad2 size={14} className="heading-icon" />
                GAMEPLAY TYPES
              </h4>
              <div className="tags-flex">
                {district.gameplayTypes?.map((gt) => (
                  <span key={gt} className="gameplay-tag">{gt}</span>
                ))}
              </div>
            </div>
            
            <div className="deep-dive-activities-box">
              <h4 className="activities-heading">
                <Activity size={14} className="heading-icon" />
                WORLD ACTIVITIES
              </h4>
              <ul className="activities-list">
                {district.activities.map((act) => (
                  <li key={act} className="activity-item">
                    <div className="act-bullet" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Lightbox 
        images={district.gallery || []} 
        currentIndex={lightboxIndex} 
        districtName={district.name}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
};

