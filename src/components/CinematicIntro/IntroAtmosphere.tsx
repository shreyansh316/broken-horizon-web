import React from 'react';
import type { IntroState } from './CinematicIntro';

interface IntroAtmosphereProps {
  introState: IntroState;
}

export const IntroAtmosphere: React.FC<IntroAtmosphereProps> = ({ introState }) => {
  const isAtmosphereActive = introState !== 'loading';

  return (
    <div className="intro-atmosphere-system" aria-hidden="true">
      {/* Distant Horizon Light Ray (emerges ~300-500ms) */}
      <div className={`intro-horizon-ray ${isAtmosphereActive ? 'ray-active' : ''}`} />

      {/* Subtle Dust & Road Particles */}
      <div className="intro-dust-particles">
        <div className="dust-particle p1" />
        <div className="dust-particle p2" />
        <div className="dust-particle p3" />
        <div className="dust-particle p4" />
      </div>
    </div>
  );
};
