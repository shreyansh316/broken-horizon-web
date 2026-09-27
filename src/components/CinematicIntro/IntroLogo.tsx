import React, { useState } from 'react';
import type { IntroState } from './CinematicIntro';

interface IntroLogoProps {
  introState: IntroState;
  onEasterEggTrigger?: () => void;
}

export const IntroLogo: React.FC<IntroLogoProps> = ({ introState, onEasterEggTrigger }) => {
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const isRevealing = introState !== 'loading';

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 4) {
      setEasterEggActive(true);
      if (onEasterEggTrigger) onEasterEggTrigger();
      setTimeout(() => setEasterEggActive(false), 3500);
      setClickCount(0);
    }
  };

  return (
    <div
      className="intro-title-block"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label="Broken Horizon Title"
      title="Broken Horizon"
    >
      <div className="intro-wordmark-row">
        {/* BROKEN reveals first */}
        <span className={`wordmark-word word-broken ${isRevealing ? 'reveal-word-1' : ''}`}>
          BROKEN
        </span>
        {/* HORIZON reveals shortly after */}
        <span className={`wordmark-word word-horizon ${isRevealing ? 'reveal-word-2' : ''}`}>
          HORIZON
        </span>
      </div>

      {/* Easter Egg Banner */}
      {easterEggActive && (
        <div className="intro-easter-egg-banner" aria-live="polite">
          <span>THE ROAD REMEMBERS.</span>
        </div>
      )}
    </div>
  );
};
