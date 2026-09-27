import React from 'react';
import { Fingerprint } from 'lucide-react';
import type { CharacterProfile } from '../../data/characterData';

interface CharacterDossierCardProps {
  character: CharacterProfile;
}

export const CharacterDossierCard: React.FC<CharacterDossierCardProps> = ({ character }) => {
  return (
    <div className="char-dossier-card" role="article" aria-label={`${character.name} Dossier Overview`}>
      <div className="dossier-grid">
        {/* Left Column: Portrait & Identity Stamps */}
        <div className="dossier-portrait-col">
          <div className="dossier-portrait-frame">
            <img
              src={character.image}
              alt={`${character.name} operative portrait`}
              className="dossier-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/images/characters/character-arjun.jpg';
              }}
            />
            <div className="dossier-vignette" />
            <div className="dossier-stamp-badge">
              <span>{character.dossierNumber}</span>
            </div>
            <div className="dossier-status-pill">
              <span className="status-dot" />
              <span>{character.status}</span>
            </div>
          </div>

          <div className="dossier-callsign-box">
            <div className="callsign-row">
              <span className="callsign-label">CALLSIGN:</span>
              <span className="callsign-val">{character.callsign}</span>
            </div>
            <div className="callsign-row">
              <span className="callsign-label">BIOMETRICS:</span>
              <span className="callsign-val">AGE {character.age} // {character.origin}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Dossier & Specifications */}
        <div className="dossier-content-col">
          <div className="dossier-top-meta">
            <span className="dossier-cat-tag">STATE SECURITY WATCHLIST // CONFIDENTIAL</span>
            <Fingerprint size={18} className="fingerprint-watermark" />
          </div>

          <h2 className="dossier-char-name">{character.name}</h2>
          <span className="dossier-role-title">{character.role}</span>

          <blockquote className="dossier-quote">
            &ldquo;{character.quote}&rdquo;
          </blockquote>

          <div className="dossier-bio-section">
            <h4 className="bio-heading">INTELLIGENCE BRIEFING</h4>
            <p className="bio-text">{character.extendedBackground}</p>
          </div>

          <div className="dossier-specs-list">
            <h4 className="specs-heading">FIELD SPECIFICATIONS</h4>
            <div className="specs-tiles-grid">
              {character.specs.map((spec) => (
                <div key={spec.label} className="spec-tile">
                  <span className="spec-tile-label">{spec.label}</span>
                  <span className="spec-tile-val">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
