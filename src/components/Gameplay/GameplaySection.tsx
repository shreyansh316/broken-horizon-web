import React, { useState, useEffect } from 'react';
import { gameplayShowcase } from '../../data/gameplayData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ShieldAlert, Sun, Wind, Moon, Monitor, Gamepad2, Sliders, CheckCircle2 } from 'lucide-react';

export const GameplaySection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState(gameplayShowcase[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const [weatherTime, setWeatherTime] = useState<'dawn' | 'noon' | 'dust' | 'night'>('dust');
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const activeIndex = gameplayShowcase.findIndex((item) => item.id === activeTabId);
  const activeItem = gameplayShowcase[activeIndex] || gameplayShowcase[0];

  // Auto-cycling timer (every 8s) that pauses on user hover
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 80; // ms
    const step = (intervalTime / 8000) * 100;

    const timer = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          // Advance to next tab
          setActiveTabId((currentId) => {
            const curIdx = gameplayShowcase.findIndex((item) => item.id === currentId);
            const nextIdx = (curIdx + 1) % gameplayShowcase.length;
            return gameplayShowcase[nextIdx].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Reset progress bar on tab switch
  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setAutoProgress(0);
  };

  const weatherStates = [
    { id: 'dawn', label: '06:00 DAWN', icon: Sun, temp: '24°C', condition: 'Golden Sand Haze', visibility: '85%' },
    { id: 'noon', label: '14:00 NOON', icon: Sun, temp: '48°C', condition: 'Mirage Distortion & Overheating', visibility: '95%' },
    { id: 'dust', label: '19:00 DUST HABOOB', icon: Wind, temp: '36°C', condition: 'Aandhi Squall // High Turbulence', visibility: '15%' },
    { id: 'night', label: '01:00 DESERT NIGHT', icon: Moon, temp: '04°C', condition: 'Freezing Asphalt Slip', visibility: '40%' },
  ];

  return (
    <section className="section-wrapper gameplay-showcase-section" id="gameplay" aria-label="Cinematic Gameplay Showcase">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`editorial-header reveal-on-scroll ${headerVisible ? 'is-visible' : ''}`}>
          <span className="editorial-tag">MECHANICS & ENCOUNTERS</span>
          <h2 className="editorial-title">GAMEPLAY DYNAMICS</h2>
          <p className="editorial-subtitle">
            Substantial vehicular physics, tactical lethality, dynamic desert meteorology, and deep investigative field work.
          </p>
        </div>

        {/* Tab Selector with Auto-Advance Progress Line */}
        <div
          className="gameplay-tab-selector"
          role="tablist"
          aria-label="Select Gameplay Subsystem"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {gameplayShowcase.map((item) => {
            const isActive = activeTabId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`gameplay-tab-button ${isActive ? 'is-active' : ''}`}
                onClick={() => handleSelectTab(item.id)}
              >
                <span className="tab-button-title">{item.title}</span>
                {isActive && (
                  <div className="tab-auto-progress-track" aria-hidden="true">
                    <div className="tab-auto-progress-fill" style={{ width: `${autoProgress}%` }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Substantial Screen-Space Feature Panel */}
        <div
          className="gameplay-substantial-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large Image Frame */}
          <div className="gameplay-stage-media">
            <img
              src={activeItem.image}
              alt={activeItem.imageAlt}
              className="gameplay-stage-image"
              loading="lazy"
            />
            <div className="gameplay-stage-vignette" />
            <div className="gameplay-stage-stamp">
              <span>SYSTEM ARCHITECTURE // {activeItem.title}</span>
            </div>
          </div>

          {/* Detailed Editorial Narrative */}
          <div className="gameplay-stage-info">
            <span className="stage-system-tag">SUBSYSTEM PROFILE</span>
            <h3 className="stage-system-title">{activeItem.title}</h3>

            <p className="stage-statement">
              &ldquo;{activeItem.statement}&rdquo;
            </p>

            <p className="stage-description">
              {activeItem.description}
            </p>

            {/* Special Subsystem Interactive Demonstrations */}
            {activeItem.id === 'police' && (
              <div className="gameplay-special-card">
                <div className="special-header">
                  <ShieldAlert size={15} className="text-amber" />
                  <span>5-TIER PURSUIT ESCALATION SYSTEM</span>
                </div>
                <div className="pursuit-meter-grid">
                  <div className="pursuit-tier tier-1">
                    <span className="tier-num">TIER 1</span>
                    <span className="tier-label">Toll Stop Checks</span>
                  </div>
                  <div className="pursuit-tier tier-2">
                    <span className="tier-num">TIER 2</span>
                    <span className="tier-label">Highway Patrol Cruisers</span>
                  </div>
                  <div className="pursuit-tier tier-3">
                    <span className="tier-num">TIER 3</span>
                    <span className="tier-label">Spike Strips & Roadblocks</span>
                  </div>
                  <div className="pursuit-tier tier-4">
                    <span className="tier-num">TIER 4</span>
                    <span className="tier-label">SOG Interceptor SUVs</span>
                  </div>
                  <div className="pursuit-tier tier-5 tier-max">
                    <span className="tier-num">TIER 5</span>
                    <span className="tier-label">Air Support & Horizon Militia</span>
                  </div>
                </div>
              </div>
            )}

            {activeItem.id === 'dynamic-world' && (
              <div className="gameplay-special-card">
                <div className="special-header">
                  <Sun size={15} className="text-amber" />
                  <span>24-HOUR RAJASTHAN WEATHER SCRUBBER</span>
                </div>
                <div className="weather-scrubber-pills">
                  {weatherStates.map((ws) => (
                    <button
                      key={ws.id}
                      type="button"
                      className={`weather-scrub-btn ${weatherTime === ws.id ? 'is-active' : ''}`}
                      onClick={() => setWeatherTime(ws.id as 'dawn' | 'noon' | 'dust' | 'night')}
                    >
                      <span>{ws.label}</span>
                    </button>
                  ))}
                </div>
                {(() => {
                  const currWeather = weatherStates.find((w) => w.id === weatherTime) || weatherStates[2];
                  return (
                    <div className="weather-readout-card">
                      <div className="weather-metric">
                        <span className="metric-lbl">TEMPERATURE</span>
                        <span className="metric-val">{currWeather.temp}</span>
                      </div>
                      <div className="weather-metric">
                        <span className="metric-lbl">ENVIRONMENT</span>
                        <span className="metric-val">{currWeather.condition}</span>
                      </div>
                      <div className="weather-metric">
                        <span className="metric-lbl">DRIVER VISIBILITY</span>
                        <span className="metric-val">{currWeather.visibility}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Standard Mechanical Specs List */}
            <div className="stage-details-box">
              <span className="details-header">MECHANICAL SPECS:</span>
              <ul className="details-list">
                {activeItem.details.map((detail, idx) => (
                  <li key={idx} className="details-list-item">
                    <CheckCircle2 size={13} className="text-amber flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* PC-First Technical Highlights Bar */}
        <div className="pc-features-strip">
          <div className="pc-feature-item">
            <Monitor size={16} className="text-amber" />
            <span className="pc-feature-title">UNCAPPED FRAMERATE</span>
            <span className="pc-feature-sub">Optimized for high-refresh 144Hz+ displays</span>
          </div>
          <div className="pc-feature-sep" />
          <div className="pc-feature-item">
            <Sliders size={16} className="text-amber" />
            <span className="pc-feature-title">21:9 & 32:9 ULTRAWIDE</span>
            <span className="pc-feature-sub">Seamless panoramic aspect ratio support</span>
          </div>
          <div className="pc-feature-sep" />
          <div className="pc-feature-item">
            <Gamepad2 size={16} className="text-amber" />
            <span className="pc-feature-title">WHEEL & CONTROLLER HAPTICS</span>
            <span className="pc-feature-sub">Analog throttle and full keybind remapping</span>
          </div>
        </div>
      </div>
    </section>
  );
};
