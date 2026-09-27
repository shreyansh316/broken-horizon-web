import React from 'react';
import type { IntroState } from './CinematicIntro';
import { siteConfig } from '../../config/siteConfig';

interface IntroTaglineProps {
  introState: IntroState;
}

export const IntroTagline: React.FC<IntroTaglineProps> = ({ introState }) => {
  const isVisible = introState === 'ready' || introState === 'entering';

  return (
    <div className={`intro-tagline-group ${isVisible ? 'tagline-visible' : ''}`}>
      <p className="intro-tagline-primary">
        &ldquo;{siteConfig.tagline}&rdquo;
      </p>
      <p className="intro-tagline-sub">
        {siteConfig.description.toUpperCase()}
      </p>
    </div>
  );
};
