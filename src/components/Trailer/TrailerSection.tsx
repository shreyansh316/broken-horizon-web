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
        {/* Wide 21:9 Cinema Frame */}
        <div className="trailer-cinema-frame" onClick={onOpenTrailerModal} role="button" tabIndex={0}>
          <img
            src={gameConfig.trailerPosterPath}
            alt="Broken Horizon — Official Reveal Teaser"
            className="trailer-frame-poster"
          />
          <div className="trailer-frame-vignette" />

          {/* Big Tactile Center Play Button */}
          <div className="trailer-center-play">
            <div className="play-disc-pulse">
              <Play size={44} fill="#EA580C" className="play-triangle-icon" />
            </div>
            <span className="trailer-play-caption">WATCH REVEAL TRAILER</span>
          </div>

          <div className="trailer-bottom-caption">
            <span className="trailer-badge">IN-ENGINE VISUAL CONCEPT</span>
            <span className="trailer-runtime">PC PRE-ALPHA SHOWCASE • UNREAL ENGINE 4.27</span>
          </div>
        </div>
      </div>
    </section>
  );
};
