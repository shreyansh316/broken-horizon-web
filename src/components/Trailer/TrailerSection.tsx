import React from 'react';
import { Play } from 'lucide-react';
import { gameConfig } from '../../data/gameConfig';

interface TrailerSectionProps {
  onOpenTrailerModal: () => void;
}

export const TrailerSection: React.FC<TrailerSectionProps> = ({ onOpenTrailerModal }) => {
  return (
    <section className="trailer-cinematic-stage" id="trailer" aria-label="Official Reveal Trailer">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="editorial-lead-block trailer-lead-block">
          <div className="trailer-status-badge-row">
            <span className="trailer-status-pill" title="Official Reveal Trailer Status">
              <span className="pulse-beacon-dot" aria-hidden="true" />
              {gameConfig.trailerStatus || 'TRAILER AVAILABLE'}
            </span>
            <span className="trailer-lang-pill" title="Official Hindi Spoken Dialogue">
              {gameConfig.trailerBadge || 'HINDI GAME TRAILER'}
            </span>
            <span className="lead-eyebrow trailer-eyebrow">{gameConfig.trailerSubheading || 'THE FIRST WRONG TURN'}</span>
          </div>
          <h2 className="lead-headline trailer-heading">{gameConfig.trailerHeading || 'WATCH THE REVEAL TRAILER'}</h2>
          <p className="lead-subcopy trailer-subcopy">
            {gameConfig.trailerSupportingCopy || 'A cinematic first look into the mystery behind Broken Horizon.'}
          </p>
        </div>

        {/* Cinematic 16:9 Cinema Frame */}
        <div className="trailer-viewport-box">
          <div
            className="trailer-cinema-frame"
            onClick={onOpenTrailerModal}
            role="region"
            aria-label="Broken Horizon Hindi reveal trailer preview stage"
          >
            {/* Responsive Optimized WebP Picture */}
            <picture className="trailer-picture">
              <source
                media="(max-width: 768px)"
                srcSet={gameConfig.trailerPosterMobilePath}
                type="image/webp"
              />
              <source
                srcSet={gameConfig.trailerPosterPath}
                type="image/webp"
              />
              <img
                src={gameConfig.trailerPosterJpgPath || gameConfig.trailerPosterPath}
                alt="Broken Horizon — The First Wrong Turn — Official Hindi Game Trailer Poster"
                className="trailer-frame-poster"
                loading="lazy"
                width={1376}
                height={768}
              />
            </picture>

            {/* Dark Cinematic Vignette & Ambient Gradient */}
            <div className="trailer-frame-vignette" aria-hidden="true" />
            <div className="trailer-frame-cinematic-gradient" aria-hidden="true" />

            {/* Accessible Interactive Play Button */}
            <button
              type="button"
              className="trailer-center-play-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenTrailerModal();
              }}
              aria-label="Watch Broken Horizon reveal trailer"
              title="Watch Broken Horizon reveal trailer"
            >
              <div className="play-disc-pulse" aria-hidden="true">
                <Play size={42} className="play-triangle-icon" />
              </div>
              <span className="trailer-play-caption">WATCH REVEAL TRAILER</span>
              <span className="trailer-play-subcaption">HINDI AUDIO · 16:9 4K ENGINE CAPTURE</span>
            </button>

            {/* Cinematic Bottom Metadata */}
            <div className="trailer-bottom-caption" aria-hidden="true">
              <div className="trailer-bottom-left">
                <span className="trailer-badge">HINDI GAME TRAILER</span>
                <span className="trailer-sep">•</span>
                <span className="trailer-badge">IN-ENGINE VISUAL CONCEPT</span>
                <span className="trailer-sep">•</span>
                <span className="trailer-runtime">PC PRE-ALPHA SHOWCASE · UNREAL ENGINE 4.27</span>
              </div>
              <div className="trailer-bottom-right">
                <span className="trailer-fidelity-tag">1080P/4K 60FPS TARGET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

