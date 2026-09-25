import React, { useState } from 'react';
import type { VehicleConfigState } from '../../data/garageData';
import { LIVERY_OPTIONS } from '../../data/garageData';
import { Crosshair } from 'lucide-react';

interface VehicleCanvasProps {
  config: VehicleConfigState;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export const VehicleCanvas: React.FC<VehicleCanvasProps> = ({
  config,
  onSelectCategory,
  activeCategory,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Derive visual dimensions
  const activeLivery = LIVERY_OPTIONS.find((l) => l.id === config.livery) || LIVERY_OPTIONS[0];

  // Ride height offset based on suspension (higher lift = car sits higher above wheels)
  const rideHeightOffset =
    config.suspension === 'trophy-40' ? -18 :
    config.suspension === 'reservoir-25' ? -10 :
    config.suspension === 'interceptor-stiff' ? 8 : 0;

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);
  };

  const hotspots = [
    { id: 'engine', label: '4.0L TURBO DIESEL I6', x: '24%', y: '52%', cat: 'dyno' },
    { id: 'bumper', label: 'FRONT BUMPER & WINCH', x: '12%', y: '58%', cat: 'bumper' },
    { id: 'suspension', label: 'REMOTE RESERVOIR SUSPENSION', x: '35%', y: '68%', cat: 'suspension' },
    { id: 'tires', label: `TIRES (${config.tirePsi} PSI)`, x: '30%', y: '78%', cat: 'tires' },
    { id: 'roof', label: 'EXPEDITION ROOF CARGO', x: '58%', y: '26%', cat: 'roof' },
    { id: 'telemetry', label: 'TELEMETRY & SCRAMBLER', x: '72%', y: '42%', cat: 'telemetry' },
  ];

  return (
    <div className="garage-vehicle-viewport" onClick={triggerBounce} title="Click to test suspension rebound">
      {/* Workshop Atmosphere & Overhead Fluorescent Lights */}
      <div className="workshop-lighting-rig">
        <div className="light-tube tube-1" />
        <div className="light-tube tube-2" />
        <div className="light-tube tube-3" />
        <div className="light-cone" />
      </div>

      {/* Grid Blueprint & Coordinate Overlay */}
      <div className="garage-blueprint-grid" />
      <div className="garage-spec-stamp font-mono">
        <span className="stamp-id">VIN: MH-14-EXP-2026-ARJUN</span>
        <span className="stamp-loc">MEHTA WORKSHOP // JAIPUR BYPASS // BAY 02</span>
      </div>

      {/* The 2.5D SVG Vehicle Rig */}
      <div className={`vehicle-svg-container ${isBouncing ? 'is-suspension-rebounding' : ''}`}>
        <svg
          viewBox="0 0 900 480"
          className="vehicle-vector-rig"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Paint Shading Gradient */}
            <linearGradient id="bodyPaintGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={activeLivery.hex} stopOpacity="0.95" />
              <stop offset="60%" stopColor={activeLivery.hex} stopOpacity="1" />
              <stop offset="100%" stopColor="#0f1115" stopOpacity="0.9" />
            </linearGradient>

            {/* Tire Tread Pattern */}
            <pattern id="tireTread" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 0,6 L 6,0 L 12,6 L 6,12 Z" fill="#181a1f" stroke="#252932" strokeWidth="1" />
            </pattern>

            {/* Dark Tint Glass */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222b35" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0a0d12" stopOpacity="0.95" />
            </linearGradient>

            {/* Ground Shadow Filter */}
            <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
          </defs>

          {/* Dynamic Ground Shadow */}
          <ellipse
            cx="450"
            cy="420"
            rx="360"
            ry="24"
            fill="#000000"
            opacity="0.75"
            filter="url(#shadowBlur)"
          />

          {/* ================= VEHICLE BODY (Transforms with ride height) ================= */}
          <g
            id="vehicle-sprung-mass"
            style={{
              transform: `translateY(${rideHeightOffset}px)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Roof Cargo / Gear */}
            {config.roofRack === 'expedition-fuel' && (
              <g id="roof-gear-fuel" className="part-animated">
                {/* Roof Rack Base */}
                <rect x="360" y="162" width="280" height="14" rx="3" fill="#1e222a" stroke="#d97706" strokeWidth="1.5" />
                {/* 2x Jerry Cans (NATO Green & Amber) */}
                <rect x="380" y="128" width="34" height="34" rx="4" fill="#b93b2a" stroke="#ffffff" strokeWidth="1" />
                <rect x="420" y="128" width="34" height="34" rx="4" fill="#d97706" stroke="#ffffff" strokeWidth="1" />
                {/* Sand Recovery Boards (Orange Maxtrax) */}
                <rect x="470" y="146" width="130" height="16" rx="2" fill="#ea580c" />
                <line x1="480" y1="148" x2="480" y2="160" stroke="#000" strokeWidth="2" />
                <line x1="510" y1="148" x2="510" y2="160" stroke="#000" strokeWidth="2" />
                <line x1="540" y1="148" x2="540" y2="160" stroke="#000" strokeWidth="2" />
                <line x1="570" y1="148" x2="570" y2="160" stroke="#000" strokeWidth="2" />
              </g>
            )}

            {config.roofRack === 'recon-mast' && (
              <g id="roof-gear-recon" className="part-animated">
                <rect x="360" y="162" width="280" height="14" rx="3" fill="#1e222a" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Telemetry Mast / Dish */}
                <line x1="410" y1="162" x2="410" y2="95" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="410" cy="95" r="8" fill="#38bdf8" className="pulse-beacon" />
                {/* Forward LED High-Intensity Light Bar */}
                <rect x="330" y="160" width="30" height="12" rx="2" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
                {/* Spare 37" Tire in Tray */}
                <ellipse cx="540" cy="148" rx="42" ry="16" fill="#181a1f" stroke="#333" strokeWidth="2" />
              </g>
            )}

            {/* Telemetry Antenna on Rear Quarter */}
            {config.telemetry === 'scrambler-jammer' && (
              <g id="telemetry-jammer">
                <line x1="680" y1="190" x2="710" y2="90" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 2" />
                <circle cx="710" cy="90" r="5" fill="#ef4444" />
                {/* Jammer Waves */}
                <circle cx="710" cy="90" r="16" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6" className="jammer-wave" />
                <circle cx="710" cy="90" r="28" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.3" className="jammer-wave-2" />
              </g>
            )}
            {config.telemetry === 'police-scanner' && (
              <g id="telemetry-police">
                <line x1="675" y1="190" x2="695" y2="110" stroke="#f59e0b" strokeWidth="2.5" />
                <circle cx="695" cy="110" r="4" fill="#f59e0b" />
              </g>
            )}

            {/* MAIN VEHICLE CABIN & HOOD BODYWORK */}
            <path
              d="M 170 340 
                 L 140 310 
                 L 170 280 
                 L 260 270 
                 L 350 205 
                 L 640 205 
                 L 700 240 
                 L 730 330 
                 L 670 345 
                 L 570 345 
                 A 65 65 0 0 0 440 345 
                 L 330 345 
                 A 65 65 0 0 0 200 345 
                 Z"
              fill="url(#bodyPaintGrad)"
              stroke="#0f1115"
              strokeWidth="3"
            />

            {/* Front & Rear Flares / Wheel Arches */}
            <path
              d="M 180 345 A 72 72 0 0 1 320 345"
              fill="none"
              stroke="#1a1d24"
              strokeWidth="14"
            />
            <path
              d="M 460 345 A 72 72 0 0 1 600 345"
              fill="none"
              stroke="#1a1d24"
              strokeWidth="14"
            />

            {/* Dark Tint Windows */}
            <path
              d="M 360 216 L 470 216 L 470 270 L 290 270 Z"
              fill="url(#glassGrad)"
              stroke="#151921"
              strokeWidth="2"
            />
            <path
              d="M 480 216 L 620 216 L 660 270 L 480 270 Z"
              fill="url(#glassGrad)"
              stroke="#151921"
              strokeWidth="2"
            />

            {/* Door Cutouts & Panel Seams */}
            <line x1="475" y1="210" x2="475" y2="340" stroke="#0a0c0f" strokeWidth="2.5" />
            <line x1="630" y1="210" x2="630" y2="330" stroke="#0a0c0f" strokeWidth="2.5" />
            {/* Door Handles */}
            <rect x="495" y="280" width="26" height="6" rx="2" fill="#0f1115" stroke="#333" strokeWidth="1" />
            <rect x="390" y="280" width="26" height="6" rx="2" fill="#0f1115" stroke="#333" strokeWidth="1" />

            {/* Headlights (Warm Amber LED Matrix) */}
            <polygon points="142,300 162,286 162,315 142,310" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
            <line x1="140" y1="305" x2="80" y2="305" stroke="#fbbf24" strokeWidth="3" opacity="0.6" strokeDasharray="6 4" />

            {/* Mehta Garage Decal / Faction Stencil */}
            <text x="510" y="318" fill="#ffffff" opacity="0.45" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="3">
              MEHTA GARAGE // JAIPUR
            </text>

            {/* Front Bumper Options */}
            {config.frontBumper === 'factory-tube' && (
              <g id="bumper-tube">
                <rect x="110" y="325" width="45" height="18" rx="5" fill="#252a34" stroke="#d97706" strokeWidth="2" />
                <circle cx="120" cy="334" r="4" fill="#fbbf24" />
              </g>
            )}

            {config.frontBumper === 'stinger-winch' && (
              <g id="bumper-stinger" className="part-animated">
                {/* 45-degree Forward Stinger Tube */}
                <line x1="135" y1="340" x2="85" y2="280" stroke="#181a1f" strokeWidth="12" strokeLinecap="round" />
                <line x1="135" y1="340" x2="85" y2="280" stroke="#b93b2a" strokeWidth="6" strokeLinecap="round" />
                {/* 12K Recovery Winch Spool */}
                <rect x="110" y="322" width="40" height="24" rx="4" fill="#0a0c0f" stroke="#888" strokeWidth="1.5" />
                <rect x="122" y="328" width="16" height="12" fill="#fbbf24" />
                {/* Recovery Hook */}
                <circle cx="106" cy="336" r="6" fill="none" stroke="#d97706" strokeWidth="3" />
              </g>
            )}

            {config.frontBumper === 'prerunner-cage' && (
              <g id="bumper-prerunner" className="part-animated">
                <path d="M 140 345 L 80 325 L 85 260 L 145 275" fill="none" stroke="#252a34" strokeWidth="10" strokeLinejoin="round" />
                {/* Quadruple Laser Pods */}
                <circle cx="95" cy="275" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                <circle cx="95" cy="295" r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                <circle cx="115" cy="285" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
                <circle cx="115" cy="305" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
              </g>
            )}

            {/* Heavy Skid Plate under front chassis */}
            <polygon points="135,346 220,358 220,366 135,354" fill="#333a46" stroke="#1e222a" strokeWidth="1" />
          </g>

          {/* ================= SUSPENSION COILS & AXLES ================= */}
          {/* Front Coilover */}
          <g id="front-shock" transform="translate(260, 310)">
            <rect x="-8" y="0" width="16" height="55" rx="3" fill="#111" stroke="#d97706" strokeWidth="2" />
            {/* Spring coils */}
            <line x1="-12" y1="12" x2="12" y2="18" stroke="#f59e0b" strokeWidth="4" />
            <line x1="-12" y1="24" x2="12" y2="30" stroke="#f59e0b" strokeWidth="4" />
            <line x1="-12" y1="36" x2="12" y2="42" stroke="#f59e0b" strokeWidth="4" />
            {config.suspension === 'reservoir-25' && (
              <rect x="14" y="8" width="10" height="28" rx="2" fill="#38bdf8" stroke="#1e222a" strokeWidth="1" />
            )}
          </g>

          {/* Rear Shock */}
          <g id="rear-shock" transform="translate(530, 310)">
            <rect x="-8" y="0" width="16" height="55" rx="3" fill="#111" stroke="#d97706" strokeWidth="2" />
            <line x1="-12" y1="12" x2="12" y2="18" stroke="#f59e0b" strokeWidth="4" />
            <line x1="-12" y1="24" x2="12" y2="30" stroke="#f59e0b" strokeWidth="4" />
            <line x1="-12" y1="36" x2="12" y2="42" stroke="#f59e0b" strokeWidth="4" />
            {config.suspension === 'trophy-40' && (
              <rect x="-24" y="4" width="12" height="34" rx="2" fill="#ef4444" stroke="#1e222a" strokeWidth="1" />
            )}
          </g>

          {/* ================= WHEELS & TIRES (UNSPRUNG MASS) ================= */}
          {/* FRONT WHEEL */}
          <g id="front-wheel" transform="translate(260, 375)">
            {/* Outer Tire Rubber */}
            <circle
              cx="0"
              cy="0"
              r={config.tireType === 'all-terrain' ? 56 : 60}
              fill="#14161a"
              stroke="#2c303a"
              strokeWidth={config.tireType === 'beadlock-crawler' ? 12 : 8}
            />
            {/* Paddle Scoops if Dune Paddles */}
            {config.tireType === 'dune-paddles' && (
              <g stroke="#d97706" strokeWidth="3">
                <line x1="-60" y1="0" x2="-52" y2="0" />
                <line x1="60" y1="0" x2="52" y2="0" />
                <line x1="0" y1="-60" x2="0" y2="-52" />
                <line x1="0" y1="60" x2="0" y2="52" />
                <line x1="-42" y1="-42" x2="-36" y2="-36" />
                <line x1="42" y1="42" x2="36" y2="36" />
                <line x1="42" y1="-42" x2="36" y2="-36" />
                <line x1="-42" y1="42" x2="-36" y2="36" />
              </g>
            )}
            {/* Rim Wheel Face */}
            <circle cx="0" cy="0" r="32" fill="#1e222a" stroke={config.tireType === 'beadlock-crawler' ? '#d97706' : '#555'} strokeWidth="4" />
            {/* Wheel Spokes */}
            <line x1="-28" y1="0" x2="28" y2="0" stroke="#999" strokeWidth="4" />
            <line x1="0" y1="-28" x2="0" y2="28" stroke="#999" strokeWidth="4" />
            <line x1="-20" y1="-20" x2="20" y2="20" stroke="#999" strokeWidth="4" />
            <line x1="-20" y1="20" x2="20" y2="-20" stroke="#999" strokeWidth="4" />
            <circle cx="0" cy="0" r="10" fill="#000" stroke="#d97706" strokeWidth="2" />
          </g>

          {/* REAR WHEEL */}
          <g id="rear-wheel" transform="translate(530, 375)">
            <circle
              cx="0"
              cy="0"
              r={config.tireType === 'all-terrain' ? 56 : 60}
              fill="#14161a"
              stroke="#2c303a"
              strokeWidth={config.tireType === 'beadlock-crawler' ? 12 : 8}
            />
            {config.tireType === 'dune-paddles' && (
              <g stroke="#d97706" strokeWidth="3">
                <line x1="-60" y1="0" x2="-52" y2="0" />
                <line x1="60" y1="0" x2="52" y2="0" />
                <line x1="0" y1="-60" x2="0" y2="-52" />
                <line x1="0" y1="60" x2="0" y2="52" />
                <line x1="-42" y1="-42" x2="-36" y2="-36" />
                <line x1="42" y1="42" x2="36" y2="36" />
                <line x1="42" y1="-42" x2="36" y2="-36" />
                <line x1="-42" y1="42" x2="-36" y2="36" />
              </g>
            )}
            <circle cx="0" cy="0" r="32" fill="#1e222a" stroke={config.tireType === 'beadlock-crawler' ? '#d97706' : '#555'} strokeWidth="4" />
            <line x1="-28" y1="0" x2="28" y2="0" stroke="#999" strokeWidth="4" />
            <line x1="0" y1="-28" x2="0" y2="28" stroke="#999" strokeWidth="4" />
            <line x1="-20" y1="-20" x2="20" y2="20" stroke="#999" strokeWidth="4" />
            <line x1="-20" y1="20" x2="20" y2="-20" stroke="#999" strokeWidth="4" />
            <circle cx="0" cy="0" r="10" fill="#000" stroke="#d97706" strokeWidth="2" />
          </g>
        </svg>

        {/* Interactive Hotspot Overlays */}
        <div className="vehicle-hotspots-layer" onClick={(e) => e.stopPropagation()}>
          {hotspots.map((hs) => {
            const isCatActive = activeCategory === hs.cat;
            return (
              <div
                key={hs.id}
                className={`hotspot-node ${isCatActive ? 'is-active' : ''}`}
                style={{ left: hs.x, top: hs.y }}
                onClick={() => onSelectCategory(hs.cat)}
                onMouseEnter={() => setActiveHotspot(hs.id)}
                onMouseLeave={() => setActiveHotspot(null)}
              >
                <button
                  type="button"
                  className="hotspot-trigger"
                  aria-label={`Inspect ${hs.label}`}
                >
                  <Crosshair size={14} className="hotspot-crosshair-icon" />
                  <span className="hotspot-pulse" />
                </button>

                {(activeHotspot === hs.id || isCatActive) && (
                  <div className="hotspot-tooltip font-mono">
                    <span className="hotspot-tooltip-title">{hs.label}</span>
                    <span className="hotspot-tooltip-hint">Click to tune module</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rebound Test Prompt in Bottom Corner */}
      <div className="vehicle-interactive-hint font-mono">
        <span>CLICK VEHICLE TO TEST SUSPENSION REBOUND</span>
      </div>
    </div>
  );
};
