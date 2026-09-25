import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { IntroState } from './CinematicIntro';

interface IntroEnterButtonProps {
  introState: IntroState;
  onEnter: () => void;
}

export const IntroEnterButton: React.FC<IntroEnterButtonProps> = ({ introState, onEnter }) => {
  const isVisible = introState === 'ready' || introState === 'entering';

  return (
    <div className={`intro-enter-container ${isVisible ? 'enter-visible' : ''}`}>
      <button
        type="button"
        className="intro-enter-trigger"
        onClick={onEnter}
        aria-label="Enter the Broken Horizon official website"
      >
        <span className="enter-trigger-label">ENTER</span>
        <ArrowRight size={18} className="enter-trigger-arrow" />
      </button>
      <div className="intro-enter-line" aria-hidden="true" />
    </div>
  );
};
