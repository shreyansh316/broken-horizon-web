import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';

interface GameSectionProps {
  onNavigateToGarage?: () => void;
}

export const GameSection: React.FC<GameSectionProps> = ({ onNavigateToGarage }) => {
  const chapters = [
    {
      num: '01',
      title: 'BUILT FOR THE ASPHALT & THE SAND',
      headline: 'Heavy Vehicular Expeditions Across Rajasthan',
      body: 'Command a custom four-wheel-drive trophy rig engineered for brutal desert terrain. Deflate beadlocks for moving sand dunes, lock differentials across rocky Aravalli passes, and push top speeds along open highway corridors.',
      tag: 'VEHICULAR PHYSICS',
      image: '/assets/images/screenshots/screenshot-02.jpg',
      hasGarageCta: true,
    },
    {
      num: '02',
      title: 'THE HORIZON CONSPIRACY',
      headline: 'Investigating the Vardhan Meridian Network',
      body: 'Infiltrate ancient stepwells and subterranean optical telemetry arrays tied to Mahesh Khandelwal and Vikram Vardhan. Intercept encrypted radio channels, recover freight manifests, and make narrative decisions where every consequence alters companion trust and regional security.',
      tag: 'INVESTIGATIVE ADVENTURE',
      image: '/assets/images/screenshots/screenshot-04.jpg',
      hasGarageCta: false,
    },
    {
      num: '03',
      title: 'NOCTURNAL PURSUITS',
      headline: 'High-Speed Evasion in Total Darkness',
      body: 'Outrun privatized security contractors and state highway patrols across unlit desert stretches. Use blinding dust squalls, auxiliary spotlight arrays, and radar scramblers to slip past roadblocks before dawn breaks.',
      tag: 'TACTICAL SURVIVAL',
      image: '/assets/images/screenshots/screenshot-01.jpg',
      hasGarageCta: false,
    },
  ];

  return (
    <section className="gameplay-chapters-stage" id="gameplay" aria-label="Gameplay Chapters">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">AN INVESTIGATION-DRIVEN ACTION-ADVENTURE</span>
          <h2 className="lead-headline">GAMEPLAY PILLARS</h2>
          <p className="lead-subcopy">Exploration, vehicular survival, tactical stealth, and uncovering the Horizon Corridor conspiracy across fictionalized Rajasthan.</p>
        </div>

        {/* 3 Massive Alternating Visual Blocks */}
        <div className="chapters-stack">
          {chapters.map((chap, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={chap.num}
                className={`chapter-block-card ${isReversed ? 'is-reversed' : ''}`}
              >
                {/* 65% Wide Image Frame */}
                <div className="chapter-visual-frame">
                  <img
                    src={chap.image}
                    alt={chap.title}
                    className="chapter-visual-img"
                    loading="lazy"
                  />
                  <div className="chapter-visual-vignette" />
                  <span className="chapter-number-watermark" aria-hidden="true">{chap.num}</span>
                </div>

                {/* 35% Editorial Copy */}
                <div className="chapter-editorial-content">
                  <div className="chapter-meta-line">
                    <span className="chapter-index-pill">CHAPTER {chap.num}</span>
                    <span className="chapter-tag-pill">{chap.tag}</span>
                  </div>

                  <h3 className="chapter-title-large">{chap.title}</h3>
                  <h4 className="chapter-headline-sub">{chap.headline}</h4>
                  <p className="chapter-body-text">{chap.body}</p>

                  {chap.hasGarageCta && onNavigateToGarage && (
                    <div className="chapter-action-cta">
                      <button
                        type="button"
                        className="btn-launch-garage-inline"
                        onClick={onNavigateToGarage}
                      >
                        <Wrench size={16} />
                        <span>OPEN VEHICLE TUNING LAB</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
