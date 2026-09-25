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
      headline: 'Vehicular exploration across contrasting Rajasthan environments',
      body: 'Drive through dense urban roads, highways, rural routes, hills, and desert terrain using the project\'s evolving vehicle systems. (Planned vehicle systems: beadlock deflation, differential locking).',
      tag: 'VEHICULAR PHYSICS',
      image: '/assets/images/gameplay/BH_Jaisalmer_GoldenDunes_01.jpg',
      hasGarageCta: true,
    },
    {
      num: '02',
      title: 'THE HORIZON CONSPIRACY',
      headline: 'Investigating the Horizon Corridor',
      body: 'Follow evidence trails through fictionalized Rajasthan locations, recover records, photograph evidence, investigate suspicious sites, and uncover connections between the Horizon Corridor network and the people behind it.',
      tag: 'INVESTIGATIVE ADVENTURE',
      image: '/assets/images/gameplay/BH_Jaipur_HaveliInvestigation_03.jpg',
      hasGarageCta: false,
    },
    {
      num: '03',
      title: 'NOCTURNAL PURSUITS',
      headline: 'High-Speed Evasion and Night Operations',
      body: 'Drive through dark roads, checkpoints, and remote environments where visibility, traffic, pursuit pressure, and navigation become part of the challenge.',
      tag: 'TACTICAL SURVIVAL',
      image: '/assets/images/gameplay/BH_Jodhpur_NightHighway_02.jpg',
      hasGarageCta: false,
    },
  ];

  return (
    <section className="gameplay-chapters-stage" id="gameplay" aria-label="Gameplay Chapters">
      <div className="section-container">
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">AN INVESTIGATION-DRIVEN ACTION-ADVENTURE</span>
          <h2 className="lead-headline">GAMEPLAY PILLARS</h2>
          <p className="lead-subcopy">Exploration, vehicular survival, tactical stealth, evidence collection, investigation, and uncovering the Horizon Corridor conspiracy across a fictionalized Rajasthan game world.</p>
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
