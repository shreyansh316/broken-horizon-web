import React from 'react';
import type { IntroState } from './CinematicIntro';

interface IntroTransitionProps {
  introState: IntroState;
}

export const IntroTransition: React.FC<IntroTransitionProps> = ({ introState }) => {
  const isEntering = introState === 'entering';

  return (
    <div
      className={`intro-transition-overlay ${isEntering ? 'transition-active' : ''}`}
      aria-hidden="true"
    >
      <div className="transition-horizon-expand" />
      <div className="transition-camera-surge" />
    </div>
  );
};
