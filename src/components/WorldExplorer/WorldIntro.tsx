import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface WorldIntroProps {
  onComplete: () => void;
}

export const WorldIntro: React.FC<WorldIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStep(1), 300);  // Thin horizon
    const t2 = setTimeout(() => setStep(2), 1000); // Title text reveal
    const t3 = setTimeout(() => setStep(3), 2600); // Complete into interactive map

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`world-intro-overlay ${step === 3 ? 'is-fading' : ''}`}
      role="dialog"
      aria-label="World Explorer Opening Sequence"
    >
      <div className="world-intro-content">
        {/* Subtle Horizon Line */}
        <div className={`world-intro-horizon ${step >= 1 ? 'horizon-active' : ''}`} />

        {/* Narrative Title Callout */}
        <div className={`world-intro-text-wrap ${step >= 2 ? 'text-active' : ''}`}>
          <span className="world-intro-region-tag">RAJASTHAN // 200 KM² TARGET</span>
          <h1 className="world-intro-title">13 DISTRICTS.</h1>
          <h2 className="world-intro-sub">ONE BROKEN HORIZON.</h2>
          <span className="world-intro-expansion-note" style={{ display: 'block', marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', color: 'var(--color-amber-light)' }}>
            CURRENT ROADMAP: 13 DISTRICTS • EXPANDING UP TO 41
          </span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        className="world-intro-skip-btn"
        onClick={onComplete}
        aria-label="Skip World Intro and explore map immediately"
      >
        <span>EXPLORE MAP</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
