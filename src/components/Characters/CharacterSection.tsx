import React, { useState } from 'react';
import { ArrowRight, Radio, FileText, ExternalLink } from 'lucide-react';
import './CharacterSection.css';

interface CharacterSectionProps {
  onNavigateToCharacters?: (charId?: string) => void;
  onNavigateToGarage?: () => void;
}

type SubTab = 'psych' | 'rig' | 'impact';

interface OperativeData {
  id: string;
  tabLabel: string;
  watermark: string;
  name: string;
  subtitle: string;
  badge: string;
  themeClass: 'arjun' | 'kavya' | 'vardhan' | 'khandelwal';
  cam: string;
  origin: string;
  archetype: string;
  quote: string;
  voiceLine: string;
  psychDossier: string;
  loadout: string;
  worldImpact: string;
  equipmentItems: { label: string; detail: string }[];
  stats: { label: string; val: number }[];
  image: string;
}

const OPERATIVES: OperativeData[] = [
  {
    id: 'arjun-mehta',
    tabLabel: '01 // ARJUN MEHTA',
    watermark: 'ARJUN',
    name: 'ARJUN MEHTA',
    subtitle: 'THE WHEELMAN & FABRICATOR • AGE 29',
    badge: 'OUTLAW EXPEDITIONER',
    themeClass: 'arjun',
    cam: 'CAM_01 // MEHTA GARAGE, JAIPUR BYPASS // 01:45 AM // 35MM ANAMORPHIC',
    origin: 'JAIPUR INDUSTRIAL RING ROAD (RJ-14)',
    archetype: 'HEAVY DRIVING • CONVOY BREACH • MELEE',
    quote: '"If you want to cross the Thar alive at night, respect the sand and never lift."',
    voiceLine: '[INTERCEPTED CALL — 01:32 AM]: "Dev, I\'m at the yard. The weight is wrong, the manifest number doesn\'t match the container plate, and somebody bolted a Horizon Meridian seal onto my truck."',
    psychDossier: 'Former transport-yard driver and master mechanic operating out of Mehta Garage on the Jaipur Bypass. Fighting to protect his sister Maya and clear his late father\'s ruined name, Arjun knows every unmapped trail, toll-gate blind spot, and back alley across western Rajasthan.',
    loadout: 'Mahendra Thar-Roxx 4×4 (4.0L Turbo Diesel I6), custom OBD diagnostic ECU flash unit, pneumatic heavy torque wrench, and Gen-3 phosphor night vision monocular.',
    worldImpact: 'NH-48 hauler crews and local grease pits rally to Arjun\'s callsign. Opening Horizon containers destabilizes private toll checkpoints and unlocks covert repair safehouses from Jaipur to Sikar.',
    equipmentItems: [
      { label: 'SIGNATURE MACHINE', detail: 'Mahendra Thar-Roxx 4×4 (4.0L Turbo Diesel) & Tara 1613 Freight Rig' },
      { label: 'FIELD TOOLKIT', detail: 'Hand-soldered OBD Diagnostic ECU Scrambler (3.2s Override)' },
      { label: 'TACTICAL GEAR', detail: 'Gen-3 Phosphor Night Vision Monocular & Industrial Heavy Wrench' }
    ],
    stats: [
      { label: 'DRIVING / RAM', val: 96 },
      { label: 'STREET COMBAT', val: 90 },
      { label: 'STEALTH / LENS', val: 45 }
    ],
    image: '/assets/images/characters/character-arjun.jpg'
  },
  {
    id: 'kavya-rathore',
    tabLabel: '02 // KAVYA RATHORE',
    watermark: 'KAVYA',
    name: 'KAVYA RATHORE',
    subtitle: 'THE INVESTIGATIVE PHOTOJOURNALIST • AGE 27',
    badge: 'INDEPENDENT PRESS',
    themeClass: 'kavya',
    cam: 'CAM_02 // UDAIPUR OUTSKIRT RIDGE // 02:15 AM // 300MM TELEPHOTO',
    origin: 'OLD CITY & LAKE HILLS, UDAIPUR (RJ-27)',
    archetype: 'STEALTH • FORENSIC LENS • CASE BOARD',
    quote: '"They paved six hundred kilometers of desert to bury what happened underneath."',
    voiceLine: '[INTERCEPTED EARPIECE — 02:18 AM]: "Got the plate, Uncle Raghav. RJ-14-VM-4092. That\'s a Jaipur corporate registration linked to Vardhan Meridian. Why is an infrastructure giant stealing farmland in the dark?"',
    psychDossier: 'Freelance investigative photojournalist and documentary researcher from Udaipur. Uncovering how midnight boundary tampering connects to her own family\'s survey archives, she builds court-grade proof capable of bringing down Vardhan Meridian.',
    loadout: 'Encrypted 400mm f/2.8 DSLR telephoto rig with infrared switch, software-defined radio scanner (24MHz-1.8GHz), forged State Press credentials, and Himadri-450 acoustic-silenced enduro.',
    worldImpact: 'Photo evidence leaked to underground wire networks triggers district heat shifts, exposing private optical repeaters and rerouting hostile corporate patrols across the Aravalli range.',
    equipmentItems: [
      { label: 'SIGNATURE MACHINE', detail: 'Himadri-450 Enduro (Acoustic Silenced -18dB) with Locking Panniers' },
      { label: 'OPTICAL RIG', detail: '400mm Weather-Sealed Telephoto Rig (f/2.8) & UV Darkroom Switch' },
      { label: 'SIGNALS INTEL', detail: 'Software-Defined Radio Scanner (Real-Time Voice Decryption)' }
    ],
    stats: [
      { label: 'STEALTH / LENS', val: 98 },
      { label: 'SIGNALS INTEL', val: 92 },
      { label: 'DRIVING / EVASION', val: 74 }
    ],
    image: '/assets/images/characters/character-kavya.jpg'
  },
  {
    id: 'vikram-vardhan',
    tabLabel: '03 // VIKRAM VARDHAN [TARGET]',
    watermark: 'VARDHAN',
    name: 'VIKRAM VARDHAN',
    subtitle: 'FOUNDER & CEO, VARDHAN MERIDIAN • AGE 52',
    badge: 'ARCHITECT OF THE CORRIDOR',
    themeClass: 'vardhan',
    cam: 'CAM_03 // UDAIPUR LAKE PALACE SUMMIT // 11:10 PM // SURVEILLANCE FEED',
    origin: 'CORPORATE HQ, JAIPUR & UDAIPUR',
    archetype: 'PRIMARY ANTAGONIST • STATE INFLUENCE',
    quote: '"Every railway, every dam, every modern city was built over someone\'s old fence. You call it fraud. History calls it infrastructure."',
    voiceLine: '[RECORDED BOARDROOM FEED]: "Contain the Jaipur garage incident before the market opens. If Khandelwal has become a liability to the corridor schedule, cut him loose. Do not allow that telemetry drive to reach the high court."',
    psychDossier: 'Publicly celebrated as a visionary industrialist modernizing Rajasthan. Privately, his conglomerate uses shell trusts and offshore options to lock down a twelve-district private logistics monopoly at any human cost.',
    loadout: 'Mercer-Bharath S-Guard VR10 Presidential armored limo with independent oxygen filtration and active radar scrambler; Bell-429 corporate twin-engine chopper; quantum-encrypted satellite uplink.',
    worldImpact: 'Controls private highway right-of-way concessions and private security checkpoints across southern Rajasthan. Each contested contract won tightens automated toll surveillance networks.',
    equipmentItems: [
      { label: 'SIGNATURE MACHINE', detail: 'Mercer-Bharath S-Guard VR10 Presidential Limo (6.0L Twin-Turbo V12)' },
      { label: 'AERIAL EXTRACT', detail: 'Bell-429 Twin-Engine Corporate Chopper (Executive Transponder)' },
      { label: 'CORRIDOR KEY', detail: 'Level-5 Master Biometric Cryptokey (State Toll & Rail Switch)' }
    ],
    stats: [
      { label: 'STATE INFLUENCE', val: 98 },
      { label: 'PRIVATE ASSETS', val: 95 },
      { label: 'COMBAT / DIRECT', val: 40 }
    ],
    image: '/assets/images/characters/character-vikram-vardhan.jpg'
  },
  {
    id: 'mahesh-khandelwal',
    tabLabel: '04 // M. KHANDELWAL [FIXER]',
    watermark: 'KHANDELWAL',
    name: 'MAHESH KHANDELWAL',
    subtitle: 'SENIOR FIXER, HORIZON CELL • AGE 46',
    badge: 'COVERT OPERATIONS',
    themeClass: 'khandelwal',
    cam: 'CAM_04 // DAUSA TOLL CHECKPOINT // 03:20 AM // DASHCAM CAPTURE',
    origin: 'JAIPUR / JODHPUR CORRIDOR NODES',
    archetype: 'SENIOR FIXER • DENIABLE TERROR',
    quote: '"Sign the deed before Friday, or the registry computer forgets your grandfather ever owned this soil."',
    voiceLine: '[INTERCEPTED RADIO — 01:50 AM]: "The driver pried open the container seal at the Jaipur depot. Get the Horizon tag back and burn the Mehta garage to the ground. If anyone asks, it was an electrical short."',
    psychDossier: 'The ruthless operational fixer who turns Vikram Vardhan\'s clean corporate spreadsheets into forged midnight deeds, predatory transport debts, burned garages, and vanished witnesses.',
    loadout: 'Vardhan Meridian Sentinel V8 B6 ballistic-armored interceptor with concealed grille strobes, dual satellite burner terminals sniffing live FASTag toll feeds, and forged State Treasury seal kits.',
    worldImpact: 'Directs aggressive night raids, roadblocks, and highway pursuit teams. Infiltrating his safehouses exposes the Master Land Seizure Register for Dausa, Ajmer, and Pali.',
    equipmentItems: [
      { label: 'SIGNATURE MACHINE', detail: 'Vardhan Meridian Sentinel V8 (B6 Armored Interceptor SUV)' },
      { label: 'SURVEILLANCE ARRAY', detail: 'Dual Satellite Burner Handsets (Live Highway FASTag ANPR Feeds)' },
      { label: 'COERCION TOOLS', detail: 'Forged State Revenue Stamp Kits & Predatory Deed Escrow Contracts' }
    ],
    stats: [
      { label: 'COERCION / FORCE', val: 92 },
      { label: 'TOLL SURVEILLANCE', val: 88 },
      { label: 'TACTICAL COMBAT', val: 85 }
    ],
    image: '/assets/images/characters/character-mahesh-khandelwal.jpg'
  }
];

export const CharacterSection: React.FC<CharacterSectionProps> = ({
  onNavigateToCharacters,
  onNavigateToGarage,
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('psych');
  const [isInterceptOpen, setIsInterceptOpen] = useState<boolean>(false);

  const current = OPERATIVES[activeIdx];

  // Procedural short radio burst sound using Web Audio API
  const playRadioBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handleToggleIntercept = () => {
    playRadioBeep();
    setIsInterceptOpen(!isInterceptOpen);
  };

  const handleSelectOperative = (idx: number) => {
    setActiveIdx(idx);
    setIsInterceptOpen(false);
  };

  return (
    <section className="operatives-showcase-stage" id="characters" aria-label="Operatives Dossier Showcase">
      {/* Top Roster Selector Bar */}
      <div className="char-roster-bar">
        <div className="char-roster-container">
          <div className="char-roster-list" role="tablist">
            <span className="char-roster-eyebrow">// SELECT DOSSIER FILE:</span>
            {OPERATIVES.map((op, idx) => {
              const isActive = activeIdx === idx;
              let activeClass = '';
              if (isActive) {
                if (op.themeClass === 'arjun') activeClass = 'is-active-arjun';
                else if (op.themeClass === 'kavya') activeClass = 'is-active-kavya';
                else if (op.themeClass === 'vardhan') activeClass = 'is-active-vardhan';
                else if (op.themeClass === 'khandelwal') activeClass = 'is-active-khandelwal';
              }
              return (
                <button
                  key={op.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`char-roster-btn ${activeClass}`}
                  onClick={() => handleSelectOperative(idx)}
                >
                  <span>{op.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="char-pipeline-indicator">
            <span className="pulse-dot-emerald"></span>
            <span>UE5.4 METAHUMAN RENDER PIPELINE // ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Split Cinematic Stage */}
      <div className="char-cinematic-stage">
        {/* Giant Rockstar Background Watermark */}
        <div className="char-watermark-bg rockstar-stroke" aria-hidden="true">
          {current.watermark}
        </div>

        {/* Left Column: In-Engine Viewport */}
        <div className="char-viewport-col">
          {/* Character Render Image */}
          <img
            src={current.image}
            alt={current.name}
            className="char-viewport-image"
            key={current.id}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (current.themeClass === 'arjun') {
                target.src = '/assets/arjun-mehta.jpg';
              } else if (current.themeClass === 'kavya') {
                target.src = '/assets/kavya-rathore.jpg';
              } else if (current.themeClass === 'vardhan') {
                target.src = '/assets/vikram-vardhan.jpg';
              } else {
                target.src = '/assets/mahesh-khandelwal.jpg';
              }
            }}
          />

          {/* Post-Processing Shaders: Film Grain & Vignette */}
          <div className="engine-grain" aria-hidden="true" />
          <div className="char-vignette-overlay" aria-hidden="true" />

          {/* Top-Left Camera Telemetry HUD */}
          <div className="char-cam-telemetry">
            <span className="rec-pulse-dot" />
            <span>{current.cam}</span>
          </div>

          {/* Bottom Viewport Telemetry HUD */}
          <div className="char-viewport-bottom-hud">
            <div className="char-hud-pill">
              <div className="char-hud-label">DISTRICT ORIGIN</div>
              <div className="char-hud-val">{current.origin}</div>
            </div>
            <div className="char-hud-pill highlight">
              <div className="char-hud-label highlight-label">GAMEPLAY ARCHETYPE</div>
              <div className="char-hud-val">{current.archetype}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Rockstar / Ubisoft Dossier Panel */}
        <div className="char-dossier-col">
          {/* Badges & Live Radio Intercept Button */}
          <div className="char-dossier-badges">
            <span className={`char-role-tag theme-${current.themeClass}`}>
              {current.badge}
            </span>

            <button
              type="button"
              className={`char-audio-btn ${isInterceptOpen ? 'is-active' : ''}`}
              onClick={handleToggleIntercept}
              title="Click to toggle intercepted radio comms"
            >
              <Radio size={14} />
              <span>RADIO FREQUENCY INTERCEPT</span>
              {isInterceptOpen && (
                <span className="eq-container">
                  <i className="eq-bar-item eq-bar-1" />
                  <i className="eq-bar-item eq-bar-2" />
                  <i className="eq-bar-item eq-bar-3" />
                  <i className="eq-bar-item eq-bar-4" />
                </span>
              )}
            </button>
          </div>

          {/* Name & Subtitle */}
          <div className="char-dossier-heading">
            <h2 className="char-dossier-name">{current.name}</h2>
            <div className="char-dossier-subtitle">{current.subtitle}</div>
          </div>

          {/* Pull Quote */}
          <blockquote className={`char-dossier-quote theme-${current.themeClass}`}>
            {current.quote}
          </blockquote>

          {/* Live Intercept Transcript Box */}
          {isInterceptOpen && (
            <div className="char-transcript-box" role="region" aria-live="polite">
              {current.voiceLine}
            </div>
          )}

          {/* Working Dossier Sub-Tabs */}
          <div className="char-subtabs-row" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeSubTab === 'psych'}
              className={`char-subtab-btn ${activeSubTab === 'psych' ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab('psych')}
            >
              [PSYCH DOSSIER]
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSubTab === 'rig'}
              className={`char-subtab-btn ${activeSubTab === 'rig' ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab('rig')}
            >
              [SIGNATURE RIG & LOADOUT]
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSubTab === 'impact'}
              className={`char-subtab-btn ${activeSubTab === 'impact' ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab('impact')}
            >
              [WORLD MEMORY IMPACT]
            </button>
          </div>

          {/* Sub-Tab Content Box */}
          <div className="char-subtab-content">
            {activeSubTab === 'psych' && (
              <p className="char-subtab-text">{current.psychDossier}</p>
            )}

            {activeSubTab === 'rig' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {current.equipmentItems.map((item, i) => (
                  <div key={i} className="char-loadout-item">
                    <span className="char-loadout-tag">▶ {item.label}:</span>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'impact' && (
              <p className="char-subtab-text">{current.worldImpact}</p>
            )}

            {/* 3 Skill Telemetry Bars */}
            <div className="char-stats-grid">
              {current.stats.map((stat, i) => (
                <div key={i} className="char-stat-card">
                  <div className="char-stat-meta">
                    <span>{stat.label}</span>
                    <strong style={{ color: '#fff' }}>{stat.val}%</strong>
                  </div>
                  <div className="char-stat-track">
                    <div
                      className={`char-stat-fill ${current.themeClass}-fill`}
                      style={{ width: `${stat.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="char-actions-row">
            {onNavigateToGarage ? (
              <button
                type="button"
                className="char-primary-action-btn"
                onClick={onNavigateToGarage}
              >
                <span>OPEN 92-VEHICLE GARAGE</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <a href="/garage" className="char-primary-action-btn">
                <span>OPEN 92-VEHICLE GARAGE</span>
                <ArrowRight size={14} />
              </a>
            )}

            <a
              href="https://samwooduis.itch.io/broken-horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="char-secondary-action-btn"
            >
              <span>PLAY PROLOGUE DEMO</span>
              <ExternalLink size={13} />
            </a>

            {onNavigateToCharacters && (
              <button
                type="button"
                className="char-secondary-action-btn"
                onClick={() => onNavigateToCharacters(current.id)}
              >
                <span>FULL INTEL FILE</span>
                <FileText size={13} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
