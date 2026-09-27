import React, { useState } from 'react';
import { worldRegions, type WorldRegion } from '../../data/worldData';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

interface WorldSectionProps {
  onNavigateToWorld?: (districtId?: string) => void;
}

export const WorldSection: React.FC<WorldSectionProps> = ({ onNavigateToWorld }) => {
  const [selectedRegion, setSelectedRegion] = useState<WorldRegion>(worldRegions[0]);

  const currentIndex = worldRegions.findIndex((r) => r.id === selectedRegion.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % worldRegions.length;
    setSelectedRegion(worldRegions[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + worldRegions.length) % worldRegions.length;
    setSelectedRegion(worldRegions[prevIdx]);
  };

  return (
    <section className="world-atlas-stage" id="world" aria-label="The 13 Districts">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">200 SQUARE KILOMETER PLAYABLE TARGET</span>
          <h2 className="lead-headline">THE 13 DISTRICTS</h2>
          <p className="lead-subcopy">
            From the neon-choked bypasses of Jaipur to the shifting dunes of Jaisalmer — planned across 13 initial districts with long-term expansion toward a 41-district framework.
          </p>
        </div>

        {/* Territory Cinema Showcase Frame (Single wide 16:9 viewport) */}
        <div className="territory-cinema-frame">
          <img
            src={selectedRegion.image}
            alt={selectedRegion.name}
            className="territory-cinema-bg"
          />
          <div className="territory-cinema-vignette" />

          {/* Top Info Bar inside frame */}
          <div className="territory-top-bar">
            <div className="territory-badge-group">
              <span className="territory-number-pill">{selectedRegion.index}</span>
              <span className="separator-dot">•</span>
              <span className="territory-status-pill">{selectedRegion.discoveryState.toUpperCase()}</span>
            </div>

            <div className="territory-nav-arrows">
              <button
                type="button"
                className="cinema-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous District"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="cinema-arrow-btn"
                onClick={handleNext}
                aria-label="Next District"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Bottom Lore & Details Overlaid on Artwork */}
          <div className="territory-bottom-overlay">
            <span className="territory-region-kicker">{selectedRegion.region}</span>
            <h3 className="territory-name-title">{selectedRegion.name}</h3>
            <p className="territory-lead-desc">{selectedRegion.fullDescription}</p>

            <div className="territory-meta-pills">
              <span className="meta-pill-item">
                <strong>BIOME:</strong> {selectedRegion.biome}
              </span>
              <span className="separator-dot">•</span>
              <span className="meta-pill-item">
                <strong>TRAVEL TIME:</strong> {selectedRegion.travelTime}
              </span>
              <span className="separator-dot">•</span>
              <span className="meta-pill-item">
                <strong>TERRAIN:</strong> {selectedRegion.terrain || selectedRegion.climate}
              </span>
            </div>

            {onNavigateToWorld && (
              <div className="territory-cta-wrap">
                <button
                  type="button"
                  className="btn-explore-atlas"
                  onClick={() => onNavigateToWorld(selectedRegion.id)}
                >
                  <Compass size={16} />
                  <span>OPEN FULL WORLD MAP</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clean Horizontal District Bar (01 JAIPUR to 13 SIKAR) */}
        <div className="district-selector-strip" role="tablist" aria-label="District Navigation">
          {worldRegions.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`district-strip-pill ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                <span className="strip-idx">{region.index}</span>
                <span className="strip-name">{region.name}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Visible Preview Cards Carousel Below Viewer */}
        <div className="district-preview-triplet">
          {worldRegions.slice(currentIndex, currentIndex + 3).concat(
            worldRegions.slice(0, Math.max(0, currentIndex + 3 - worldRegions.length))
          ).map((r) => (
            <div
              key={`preview-${r.id}`}
              className={`preview-mini-card ${selectedRegion.id === r.id ? 'is-active-mini' : ''}`}
              onClick={() => setSelectedRegion(r)}
            >
              <div className="mini-card-media">
                <img src={r.image} alt={r.name} className="mini-card-img" loading="lazy" />
                <div className="mini-card-grad" />
                <span className="mini-card-idx">{r.index}</span>
              </div>
              <div className="mini-card-body">
                <h4 className="mini-card-title">{r.name}</h4>
                <p className="mini-card-biome">{r.biome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
