import React, { useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { ambientAudio } from '../../utils/ambientAudio';

interface CharacterSectionProps {
  onNavigateToCharacters?: (charId?: string) => void;
  onNavigateToGarage?: () => void;
}

export const CharacterSection: React.FC<CharacterSectionProps> = ({
  onNavigateToCharacters,
  onNavigateToGarage,
}) => {
  const [activeOperative, setActiveOperative] = useState<'arjun' | 'kavya'>('arjun');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleVoice = () => {
    ambientAudio.init();
    setIsPlayingAudio(!isPlayingAudio);
    setTimeout(() => setIsPlayingAudio(false), 3500);
  };

  const operatives = {
    arjun: {
      id: 'arjun-mehta',
      name: 'ARJUN MEHTA',
      role: 'THE WHEELMAN & FABRICATOR',
      quote: 'If you want to cross the Thar alive at night, respect the sand and never lift.',
      bio: 'Former highway hauler turned underground off-road mechanic. Operating out of Mehta Garage on the Jaipur Bypass, Arjun knows every unmapped trail and subterranean crossing across western Rajasthan.',
      machine: 'Mehta Custom 4x4 Off-Roader (4.0L Turbo Diesel I6)',
      image: '/assets/images/characters/character-arjun.jpg',
      tag: 'OUTLAW EXPEDITIONER',
    },
    kavya: {
      id: 'kavya-rathore',
      name: 'KAVYA RATHORE',
      role: 'THE INVESTIGATIVE JOURNALIST',
      quote: 'They paved six hundred kilometers of desert to bury what happened underneath.',
      bio: 'Independent investigative reporter exposing land seizures and privatized infrastructure along the Horizon Corridor. Tracking political broker Mahesh Khandelwal and Vikram Vardhan\'s Vardhan Meridian syndicate, she pursues the evidence authorities want buried.',
      machine: 'Encrypted Field Telemetry Rig & UV Optical Kit',
      image: '/assets/images/characters/character-kavya.jpg',
      tag: 'INDEPENDENT PRESS',
    },
  };

  const current = operatives[activeOperative];

  return (
    <section className="operatives-showcase-stage" id="characters" aria-label="The Operatives">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">TWO LIVES. ONE HIGHWAY.</span>
          <h2 className="lead-headline">THE OPERATIVES</h2>
          <p className="lead-subcopy">A wheelman trying to disappear. A journalist who refuses to look away.</p>
        </div>

        {/* Dual-Protagonist Switcher Header */}
        <div className="operatives-switch-row" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeOperative === 'arjun'}
            className={`operative-tab-btn ${activeOperative === 'arjun' ? 'is-active' : ''}`}
            onClick={() => setActiveOperative('arjun')}
          >
            <span className="tab-index">01</span>
            <span className="tab-name">ARJUN MEHTA</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeOperative === 'kavya'}
            className={`operative-tab-btn ${activeOperative === 'kavya' ? 'is-active' : ''}`}
            onClick={() => setActiveOperative('kavya')}
          >
            <span className="tab-index">02</span>
            <span className="tab-name">KAVYA RATHORE</span>
          </button>
        </div>

        {/* Grand Rockstar-style Character Stage (Art 65% / Text 35%) */}
        <div className="operative-cinematic-card">
          {/* Giant Character Portrait */}
          <div className="operative-portrait-frame">
            <img
              src={current.image}
              alt={current.name}
              className="operative-portrait-img"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.src.includes('character-arjun-mehta') && activeOperative === 'arjun') {
                  target.src = '/assets/images/character-arjun-mehta.jpg';
                } else if (!target.src.includes('character-kavya-rathore') && activeOperative === 'kavya') {
                  target.src = '/assets/images/character-kavya-rathore.jpg';
                }
              }}
            />
            <div className="operative-gradient-vignette" />
            <span className="portrait-watermark" aria-hidden="true">{activeOperative === 'arjun' ? 'MEHTA' : 'RATHORE'}</span>
          </div>

          {/* Dossier Typography */}
          <div className="operative-editorial-body">
            <div className="operative-meta-row">
              <span className="operative-tag-badge">{current.tag}</span>
              <button
                type="button"
                className={`voice-log-btn ${isPlayingAudio ? 'is-playing' : ''}`}
                onClick={handleToggleVoice}
                title="Play simulated radio intercept"
              >
                {isPlayingAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>{isPlayingAudio ? 'INTERCEPTING SIGNAL...' : 'RADIO FREQUENCY INTERCEPT'}</span>
              </button>
            </div>

            <h3 className="operative-title-huge">{current.name}</h3>
            <span className="operative-role-label">{current.role}</span>

            <blockquote className="operative-pull-quote">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <p className="operative-bio-paragraph">{current.bio}</p>

            <div className="operative-machine-callout">
              <span className="machine-label">SIGNATURE RIDE & EQUIPMENT</span>
              <strong className="machine-value">{current.machine}</strong>
            </div>

            <div className="operative-actions-row">
              {activeOperative === 'arjun' && onNavigateToGarage && (
                <button
                  type="button"
                  className="btn-garage-primary"
                  onClick={onNavigateToGarage}
                >
                  <span>CUSTOMIZE ARJUN&apos;S 4X4</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {onNavigateToCharacters && (
                <button
                  type="button"
                  className="btn-dossier-secondary"
                  onClick={() => onNavigateToCharacters(current.id)}
                >
                  <span>INSPECT FULL DOSSIER</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
