import React from 'react';
import type { IntroState } from './CinematicIntro';

interface IntroBackgroundProps {
  introState: IntroState;
  imageSrc?: string;
}

export const IntroBackground: React.FC<IntroBackgroundProps> = ({
  introState,
  imageSrc = '/assets/images/hero/hero-desert-road.jpg',
}) => {
  const isVisible = introState !== 'loading';

  return (
    <div className="intro-canvas-container" aria-hidden="true">
      <div className={`intro-visual-plate ${isVisible ? 'is-visible' : ''}`}>
        <img
          src={imageSrc}
          alt="Broken Horizon distant desert dawn landscape"
          className="intro-plate-image"
          onError={(e) => {
            // Graceful fallback to dark atmospheric gradient if image not found
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="intro-mist-layer" />
        <div className="intro-vignette-heavy" />
      </div>
    </div>
  );
};
