import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SkipIntroProps {
  onSkip: () => void;
}

export const SkipIntro: React.FC<SkipIntroProps> = ({ onSkip }) => {
  return (
    <button
      type="button"
      className="intro-skip-btn"
      onClick={onSkip}
      aria-label="Skip Cinematic Intro and proceed directly to website"
    >
      <span>SKIP INTRO</span>
      <ArrowRight size={14} />
    </button>
  );
};
