import React from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
  onOpenTrailerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrailerModal }) => {
  const handleScrollToPlaytest = () => {
    const accessSection = document.querySelector('#access');
    if (accessSection) {
      accessSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTrailer = () => {
    const trailerSection = document.querySelector('#trailer');
    if (trailerSection) {
      trailerSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenTrailerModal();
    }
  };

  return (
    <section className="hero-fullscreen-stage" id="hero" aria-label="Broken Horizon">
      {/* Full-Bleed 100vh Cinematic Artwork */}
      <div className="hero-background-art">
        <img
          src="/assets/images/hero/hero-desert-road.jpg"
          alt="Broken Horizon — Desert highway through rugged Rajasthan terrain towards fortress silhouettes at sunset"
          className="hero-art-image"
        />
        <div className="hero-vignette-bottom" />
        <div className="hero-vignette-top" />
      </div>

      {/* Hero Typography & CTAs Over Artwork */}
      <div className="hero-editorial-overlay">
        <div className="hero-content-boundary">
          <span className="hero-kicker-tag">AN OPEN-WORLD ACTION-ADVENTURE</span>
          <h1 className="hero-headline-monumental">BROKEN HORIZON</h1>
          <p className="hero-punchline">495 miles of connected road network. No backup.</p>
          <p className="hero-brief-lead">
            An investigation-driven action-adventure set across fictionalized Rajasthan. An underground wheelman and a relentless investigative journalist collide along the privatized Horizon Corridor — driven by exploration, evidence, and vehicular survival.
          </p>

          <div className="hero-action-buttons">
            <button
              type="button"
              className="btn-trailer-primary"
              onClick={handleScrollToTrailer}
            >
              <Play size={16} fill="currentColor" />
              <span>WATCH REVEAL TRAILER</span>
            </button>

            <button
              type="button"
              className="btn-playtest-secondary"
              onClick={handleScrollToPlaytest}
            >
              <span>JOIN CLOSED PLAYTEST</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
