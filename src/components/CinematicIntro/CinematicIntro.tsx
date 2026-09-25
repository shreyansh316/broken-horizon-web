import React, { useState, useEffect, useRef } from 'react';
import { IntroBackground } from './IntroBackground';
import { IntroAtmosphere } from './IntroAtmosphere';
import { IntroLogo } from './IntroLogo';
import { IntroTagline } from './IntroTagline';
import { IntroProgress } from './IntroProgress';
import { IntroEnterButton } from './IntroEnterButton';
import { IntroAudioControl } from './IntroAudioControl';
import { SkipIntro } from './SkipIntro';
import { IntroTransition } from './IntroTransition';
import { preloadCriticalAssets, type PreloadProgress } from './AssetPreloader';

export type IntroState = 'loading' | 'revealing' | 'ready' | 'entering' | 'complete';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [introState, setIntroState] = useState<IntroState>('loading');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [loadProgress, setLoadProgress] = useState(25);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Initialize preferences & critical asset preloader
  useEffect(() => {
    const savedAudio = localStorage.getItem('bh_audio_enabled');
    if (savedAudio === 'true') {
      setIsAudioEnabled(true);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check preloading
    preloadCriticalAssets((progress: PreloadProgress) => {
      setLoadProgress(progress.percentage);
    }).then(() => {
      if (prefersReducedMotion) {
        setIntroState('ready');
        return;
      }

      // Step-by-step paced cinematic reveal
      const timerReveal = setTimeout(() => {
        setIntroState('revealing');
      }, 400);

      const timerReady = setTimeout(() => {
        setIntroState('ready');
      }, 3200);

      return () => {
        clearTimeout(timerReveal);
        clearTimeout(timerReady);
      };
    });
  }, []);

  // Keyboard accessibility: ESC skips intro, Enter proceeds into site
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'Enter' && introState === 'ready') {
        handleEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introState]);

  // Audio playback management
  const handleToggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    localStorage.setItem('bh_audio_enabled', String(nextState));

    if (audioElementRef.current) {
      if (nextState) {
        audioElementRef.current.play().catch(() => {
          // Handled if browser policies block audio
        });
      } else {
        audioElementRef.current.pause();
      }
    }
  };

  const handleEnter = () => {
    setIntroState('entering');
    localStorage.setItem('bh_intro_seen', 'true');

    // Smooth forward camera crossfade into the main site
    setTimeout(() => {
      setIntroState('complete');
      onComplete();
    }, 900);
  };

  const handleSkip = () => {
    localStorage.setItem('bh_intro_seen', 'true');
    setIntroState('complete');
    onComplete();
  };

  if (introState === 'complete') return null;

  return (
    <aside
      className={`cinematic-intro-root ${introState === 'entering' ? 'is-entering' : ''}`}
      role="dialog"
      aria-label="Broken Horizon Cinematic Title Reveal"
    >
      {/* Top Utilities: Audio & Skip */}
      <div className="intro-top-bar">
        <IntroAudioControl
          isEnabled={isAudioEnabled}
          onToggle={handleToggleAudio}
        />
        <SkipIntro onSkip={handleSkip} />
      </div>

      {/* Layer 1: Background Plate Visual (slow camera forward movement) */}
      <IntroBackground introState={introState} />

      {/* Layer 2: Atmosphere & Dust Particles */}
      <IntroAtmosphere introState={introState} />

      {/* Focal Stage: Logo, Tagline, Enter Trigger, Preloading Progress */}
      <div className="intro-focal-stage">
        <IntroLogo introState={introState} />

        <IntroTagline introState={introState} />

        <IntroEnterButton
          introState={introState}
          onEnter={handleEnter}
        />

        <IntroProgress
          introState={introState}
          percentage={loadProgress}
        />
      </div>

      {/* Enter Transition Surge Overlay */}
      <IntroTransition introState={introState} />

      {/* Optional Audio Element with graceful fallback */}
      <audio
        ref={audioElementRef}
        id="bh-ambient-audio"
        loop
        preload="none"
        muted={!isAudioEnabled}
      >
        <source src="/assets/audio/website-opening.mp3" type="audio/mp3" />
      </audio>
    </aside>
  );
};
