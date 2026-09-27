import React from 'react';
import type { IntroState } from './CinematicIntro';

interface IntroProgressProps {
  introState: IntroState;
  percentage?: number;
}

export const IntroProgress: React.FC<IntroProgressProps> = ({ introState, percentage = 45 }) => {
  if (introState !== 'loading') return null;

  return (
    <div className="intro-loading-status" aria-live="polite">
      <span className="loading-label">PREPARING THE ROAD</span>
      <div className="loading-progress-line">
        <div
          className="loading-progress-bar"
          style={{ width: `${Math.min(100, Math.max(10, percentage))}%` }}
        />
      </div>
    </div>
  );
};
