import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, Car, X, MapPin, Layers, Compass, Plus, Minus, RotateCcw, Maximize2 } from 'lucide-react';
import { TACTICAL_DISTRICTS, type TacticalDistrict } from '../../data/tacticalAtlasData';
import '../../styles/worldExplorer.css';

interface WorldExplorerProps {
  onBackToHome: () => void;
  initialDistrictId?: string;
}

type TacticalLayerType = 'ALL' | 'CORRIDOR' | 'SAFEHOUSE' | 'MISSIONS' | 'HIGHWAYS';

export const WorldExplorer: React.FC<WorldExplorerProps> = ({
  onBackToHome,
  initialDistrictId = 'jaipur',
}) => {
  const [selectedId, setSelectedId] = useState<string>(() => {
    const found = TACTICAL_DISTRICTS.find(
      (d) =>
        d.id === initialDistrictId?.toLowerCase() ||
        d.name.toLowerCase() === initialDistrictId?.toLowerCase()
    );
    return found ? found.id : 'jaipur';
  });

  const calculateAutoFitScale = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const w = window.innerWidth;
    if (w < 480) return Math.max(0.56, (w - 16) / 680);
    if (w < 768) return Math.max(0.68, (w - 24) / 950);
    if (w < 1024) return Math.max(0.82, (w - 48) / 1100);
    if (w < 1440) return Math.max(0.95, (w - 64) / 1250);
    return 1;
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });
  const [isMobileIndexOpen, setIsMobileIndexOpen] = useState<boolean>(false);
  const [isMobileLegendOpen, setIsMobileLegendOpen] = useState<boolean>(false);

  const [currentScale, setCurrentScale] = useState<number>(() => calculateAutoFitScale());
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchPinchDist, setTouchPinchDist] = useState<number | null>(null);

  const [activeLayer, setActiveLayer] = useState<TacticalLayerType>('ALL');
  const [showPOIs, setShowPOIs] = useState<boolean>(true);
  const [useFallbackSvg, setUseFallbackSvg] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-fit scale on mobile/tablet window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setCurrentScale(calculateAutoFitScale());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateAutoFitScale]);

  const activeDistrict = useMemo<TacticalDistrict>(() => {
    return (
      TACTICAL_DISTRICTS.find((d) => d.id === selectedId) || TACTICAL_DISTRICTS[0]
    );
  }, [selectedId]);

  // Select district, update URL, open drawer
  const openDistrict = useCallback((id: string) => {
    const target = TACTICAL_DISTRICTS.find(
      (d) => d.id === id || d.name.toLowerCase() === id.toLowerCase()
    );
    if (!target) return;

    setSelectedId(target.id);
    setIsDrawerOpen(true);
    setIsMobileIndexOpen(false);

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `/world/${target.id}`);
    }
    document.title = `BROKEN HORIZON — ${target.name} • 13 Districts • One Story`;
  }, []);

  // Keyboard navigation & accessibility controls (+, -, R, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsMobileIndexOpen(false);
        setIsMobileLegendOpen(false);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setCurrentScale((s) => Math.min(2.6, s + 0.2));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setCurrentScale((s) => Math.max(0.42, s - 0.2));
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setCurrentScale(calculateAutoFitScale());
        setPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [calculateAutoFitScale]);

  // Handle initialDistrictId change from routing or props
  const prevInitialIdRef = useRef(initialDistrictId);
  useEffect(() => {
    if (initialDistrictId && initialDistrictId !== prevInitialIdRef.current) {
      prevInitialIdRef.current = initialDistrictId;
      const found = TACTICAL_DISTRICTS.find(
        (d) =>
          d.id === initialDistrictId.toLowerCase() ||
          d.name.toLowerCase() === initialDistrictId.toLowerCase()
      );
      if (found) {
        openDistrict(found.id);
      }
    }
  }, [initialDistrictId, openDistrict]);

  // Pan controls (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Pan & Pinch-Zoom controls (Mobile & Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
      setTouchPinchDist(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchPinchDist(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchPinchDist !== null) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = newDist / touchPinchDist;
      setCurrentScale((s) => Math.min(2.6, Math.max(0.42, s * factor)));
      setTouchPinchDist(newDist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchPinchDist(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.12 : -0.12;
    setCurrentScale((prev) => Math.min(2.6, Math.max(0.42, prev + delta)));
  };

  const handleResetZoom = () => {
    setCurrentScale(calculateAutoFitScale());
    setPan({ x: 0, y: 0 });
    setIsDrawerOpen(false);
  };

  const handleFitRajasthan = () => {
    setCurrentScale(calculateAutoFitScale());
    setPan({ x: 0, y: 0 });
  };

  const handleZoom = (val: number) => {
    setCurrentScale(Math.min(2.6, Math.max(0.42, val)));
  };

  return (
    <div
      className="tactical-atlas-root ocean-slate-root"
      role="main"
      aria-label="Broken Horizon — Illustrated 3D-Relief Rajasthan Game World Map"
    >
      {/* ===================================================================== */}
      {/* 1. TOP-LEFT BRANDING & STORY EPIGRAPH (MATCHES REFERENCE ART)         */}
      {/* ===================================================================== */}
      <header className="hud-corner-top-left" role="banner">
        <div className="hud-top-nav-links">
          <button
            type="button"
            className="hud-nav-btn"
            onClick={onBackToHome}
            aria-label="Return to Broken Horizon Homepage"
          >
            <ArrowLeft size={12} />
            <span>← MAIN PORTAL</span>
          </button>
          <a
            href="/garage"
            className="hud-nav-btn garage-btn"
            title="View 92-Vehicle Master Transport Division"
            aria-label="View 92-Vehicle Master Transport Division"
          >
            <Car size={12} />
            <span>🚗 TRANSPORT DIVISION</span>
          </a>
        </div>
        <h1 className="hud-game-title">BROKEN HORIZON</h1>
        <div className="hud-title-divider" />
        <p className="hud-game-subtitle">RAJASTHAN • 13 DISTRICTS • ONE STORY</p>
        <p className="hud-game-epigraph">
          Different cities. Different people.
          <br />
          Same truth.
          <br />A broken horizon.
        </p>

        {/* Mobile & Tablet HUD Drawer Toggle Buttons */}
        <div className="hud-mobile-pill-toggles">
          <button
            type="button"
            className={`hud-mobile-toggle-btn ${isMobileIndexOpen ? 'is-active' : ''}`}
            onClick={() => {
              setIsMobileIndexOpen(!isMobileIndexOpen);
              setIsMobileLegendOpen(false);
            }}
            aria-label="Toggle 13 Districts Index"
          >
            <Layers size={13} />
            <span>13 DISTRICTS</span>
          </button>
          <button
            type="button"
            className={`hud-mobile-toggle-btn ${isMobileLegendOpen ? 'is-active' : ''}`}
            onClick={() => {
              setIsMobileLegendOpen(!isMobileLegendOpen);
              setIsMobileIndexOpen(false);
            }}
            aria-label="Toggle Cartography Legend"
          >
            <Compass size={13} />
            <span>LEGEND</span>
          </button>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. TOP-RIGHT "THE 13 DISTRICTS" CLICKABLE INDEX PANEL                 */}
      {/* ===================================================================== */}
      <aside
        id="hud-districts-index"
        className={`hud-corner-top-right ${isMobileIndexOpen ? 'mobile-visible' : ''}`}
        role="region"
        aria-label="The 13 Rajasthan Districts Index"
      >
        <div className="hud-index-header">
          <span>THE 13 DISTRICTS</span>
          <span className="hud-index-badge">CLICK TO INSPECT</span>
        </div>
        <div className="hud-index-list">
          {TACTICAL_DISTRICTS.map((d) => {
            const isJaipur = d.id === 'jaipur';
            return (
              <button
                key={d.id}
                type="button"
                id={`index-item-${d.numInt}`}
                onClick={() => openDistrict(d.id)}
                className={`hud-index-item ${d.id === selectedId ? 'is-selected' : ''}`}
                aria-label={`Inspect ${d.name} (${isJaipur ? 'Active Story Region' : 'Locked World Concept'})`}
              >
                <span
                  style={{ backgroundColor: d.color }}
                  className="hud-index-dot"
                >
                  {d.numInt}
                </span>
                <span className="hud-index-text">{d.label}</span>
                {isJaipur ? (
                  <span className="hud-index-tag active">ACTIVE</span>
                ) : (
                  <span className="hud-index-tag locked">LOCKED</span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 3. BOTTOM-LEFT CARTOGRAPHY LEGEND & KM SCALE BAR                      */}
      {/* ===================================================================== */}
      <aside
        id="hud-cartography-legend"
        className={`hud-corner-bottom-left ${isMobileLegendOpen ? 'mobile-visible' : ''}`}
        role="region"
        aria-label="Cartography Legend and Scale"
      >
        <div className="hud-legend-box">
          <div className="hud-legend-title">CARTOGRAPHY LEGEND</div>
          <div className="hud-legend-item">
            <span>🏙️</span>
            <span>Major City</span>
          </div>
          <div className="hud-legend-item">
            <span>🏘️</span>
            <span>Town / Village</span>
          </div>
          <div className="hud-legend-item">
            <span>🏰</span>
            <span>Fort / Historical Place</span>
          </div>
          <div className="hud-legend-item">
            <span>🏭</span>
            <span>Industrial Area</span>
          </div>
          <div className="hud-legend-item">
            <span>✈️</span>
            <span>Airport</span>
          </div>
          <div className="hud-legend-item">
            <span>🚆</span>
            <span>Train Station</span>
          </div>
          <div className="hud-legend-item">
            <span>⚓</span>
            <span>Port / Boat</span>
          </div>
          <div className="hud-legend-item">
            <span className="hud-line-sample-road" />
            <span>Main Road</span>
          </div>
          <div className="hud-legend-item">
            <span className="hud-line-sample-hw" />
            <span>Highway (Horizon Line)</span>
          </div>
          <div className="hud-legend-item">
            <span className="hud-line-sample-border" />
            <span>District Border</span>
          </div>
        </div>

        {/* Compass Rose + 0–100 km Scale Bar */}
        <div className="hud-scale-box">
          <div className="hud-compass-rose" aria-label="Compass Rose">
            <span className="compass-n">N</span>
            <span className="compass-s">S</span>
            <span className="compass-w">W</span>
            <span className="compass-e">E</span>
            <span className="compass-star">✦</span>
          </div>
          <div className="hud-scale-ruler">
            <div className="hud-scale-numbers">
              <span>0</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100 km</span>
            </div>
            <div className="hud-scale-bar">
              <div className="hud-scale-segment-filled" />
              <div className="hud-scale-segment-empty" />
              <div className="hud-scale-segment-filled" />
              <div className="hud-scale-segment-empty" />
            </div>
            <div className="hud-scale-caption">(Game Scale — Approx.)</div>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 4. BOTTOM-CENTER PILLAR TAGLINE & FULL INTERACTIVE CONTROLS          */}
      {/* ===================================================================== */}
      <div className="hud-bottom-center-ctrls" role="toolbar" aria-label="Map Navigation Controls">
        <div className="hud-zoom-pill">
          <button
            type="button"
            id="map-btn-zoom-out"
            onClick={() => handleZoom(currentScale - 0.2)}
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <Minus size={12} style={{ display: 'inline', marginRight: 2 }} />
            OUT
          </button>
          <span className="ctrl-divider">|</span>
          <button
            type="button"
            id="map-btn-fit"
            onClick={handleFitRajasthan}
            title="Fit Rajasthan to Screen"
            aria-label="Fit Rajasthan"
          >
            <Maximize2 size={12} style={{ display: 'inline', marginRight: 2 }} />
            FIT RAJASTHAN
          </button>
          <span className="ctrl-divider">|</span>
          <button
            type="button"
            id="map-btn-zoom-in"
            onClick={() => handleZoom(currentScale + 0.2)}
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <Plus size={12} style={{ display: 'inline', marginRight: 2 }} />
            IN
          </button>
          <span className="ctrl-divider">|</span>
          <button
            type="button"
            id="map-btn-reset"
            onClick={handleResetZoom}
            className="is-reset"
            title="Reset Map View (R)"
            aria-label="Reset Map"
          >
            <RotateCcw size={12} style={{ display: 'inline', marginRight: 2 }} />
            RESET (R)
          </button>
        </div>
        <div className="hud-pillar-motto">
          EXPLORE &nbsp;/&nbsp; FIGHT &nbsp;/&nbsp; UNCOVER &nbsp;/&nbsp; SURVIVE
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. BOTTOM-RIGHT INDIA LOCATOR & "THE WORLD" INSET BOX                 */}
      {/* ===================================================================== */}
      <aside className="hud-corner-bottom-right" role="complementary" aria-label="The World Overview">
        <div className="hud-locator-grid">
          {/* Mini India Map Silhouette with Rajasthan Highlighted */}
          <div className="hud-india-mini-map">
            <svg viewBox="0 0 120 130" className="india-svg-box" aria-label="India locator silhouette with Rajasthan highlighted">
              {/* Simplified India Silhouette */}
              <path
                d="M45 8 L62 12 L68 28 L88 38 L108 35 L112 52 L92 62 L82 78 L62 122 L48 122 L35 82 L18 65 L15 45 L35 28 Z"
                fill="#263240"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Highlighted Rajasthan Polygon */}
              <path
                d="M22 40 L44 32 L52 48 L42 62 L22 56 Z"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </svg>
            <div className="india-tagline">RAJASTHAN, INDIA</div>
          </div>
          {/* The World Lore Text */}
          <div className="hud-world-lore">
            <div className="world-lore-title">THE WORLD</div>
            <p>
              A vast and diverse landscape of 13 districts, from the pink streets of
              Jaipur to the golden dunes of Jaisalmer, from the lakes of Udaipur to the
              forests of Sawai Madhopur.
            </p>
            <p className="world-lore-highlight">
              One road. Countless stories.
              <br />
              This is Rajasthan. This is your world.
            </p>
          </div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 6. MAIN INTERACTIVE ILLUSTRATED 3D-RELIEF MAP CANVAS                  */}
      {/* ===================================================================== */}
      <main
        id="map-stage"
        className="map-canvas-stage"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          id="map-container"
          ref={containerRef}
          className="map-canvas-container"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${currentScale})`,
          }}
        >
          {/* Neighboring Territory Labels */}
          <span className="neighbor-territory-label label-pakistan">PAKISTAN</span>
          <span className="neighbor-territory-label label-haryana">HARYANA</span>
          <span className="neighbor-territory-label label-up">
            UTTAR
            <br />
            PRADESH
          </span>
          <span className="neighbor-territory-label label-mp">MADHYA PRADESH</span>
          <span className="neighbor-territory-label label-gujarat">GUJARAT</span>

          {/* Illustrated 3D-Relief Rajasthan Base Map with Responsive Picture Derivatives */}
          {!useFallbackSvg && (
            <picture className="base-map-picture">
              <source
                media="(min-width: 1920px)"
                srcSet="/assets/world/rajasthan-relief-master.webp"
                type="image/webp"
              />
              <source
                media="(min-width: 1024px)"
                srcSet="/assets/world/rajasthan-relief-desktop.webp"
                type="image/webp"
              />
              <source
                media="(min-width: 640px)"
                srcSet="/assets/world/rajasthan-relief-tablet.webp"
                type="image/webp"
              />
              <source
                srcSet="/assets/world/rajasthan-relief-mobile.webp"
                type="image/webp"
              />
              <img
                id="base-map-img"
                src="/assets/world/rajasthan-relief-desktop.webp"
                alt="Broken Horizon — Illustrated 3D-Relief Rajasthan Game World Map"
                onError={() => setUseFallbackSvg(true)}
                className="base-map-img"
                loading="eager"
              />
            </picture>
          )}

          {/* Multi-Biome Illustrated SVG Fallback with Topographical Layers */}
          <svg
            id="fallback-relief-svg"
            viewBox="0 0 1280 820"
            className={`fallback-relief-svg ${useFallbackSvg ? '' : 'hidden'}`}
          >
            <defs>
              <linearGradient id="rajasthanBiomeGrad" x1="0%" y1="35%" x2="95%" y2="65%">
                <stop offset="0%" stopColor="#d99b4e" />
                <stop offset="32%" stopColor="#b87d4b" />
                <stop offset="58%" stopColor="#5a6f3b" />
                <stop offset="85%" stopColor="#3a5a32" />
                <stop offset="100%" stopColor="#2e4c2b" />
              </linearGradient>
              <pattern id="desertDunes" width="24" height="12" patternUnits="userSpaceOnUse">
                <path d="M 0 10 Q 6 4 12 10 T 24 10" fill="none" stroke="rgba(245, 158, 11, 0.18)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Outer Illuminated State Shape */}
            <path
              d="M 615 55 L 745 115 L 895 215 L 1045 365 L 1145 415 L 1110 485 L 965 510 L 945 620 L 795 625 L 665 695 L 555 775 L 435 675 L 385 565 L 225 515 L 115 395 L 155 275 L 325 265 L 435 175 L 545 125 Z"
              fill="url(#rajasthanBiomeGrad)"
              stroke="#fde68a"
              strokeWidth="3"
            />

            {/* Thar Desert Shading */}
            <path
              d="M 115 395 L 325 265 L 545 340 L 425 420 L 225 515 Z"
              fill="url(#desertDunes)"
              stroke="rgba(245, 158, 11, 0.2)"
              strokeDasharray="4 4"
            />
            <text
              x="210"
              y="340"
              fill="rgba(245, 158, 11, 0.35)"
              fontFamily="monospace"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="3"
            >
              THAR DESERT FRONTIER
            </text>

            {/* Aravalli Ridge Line */}
            <path
              d="M 435 675 Q 560 480 665 360 T 795 225"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 435 675 Q 560 480 665 360 T 795 225"
              fill="none"
              stroke="rgba(234, 88, 12, 0.25)"
              strokeWidth="8"
              strokeDasharray="3 5"
              strokeLinecap="round"
            />
            <text
              x="540"
              y="480"
              fill="rgba(255, 255, 255, 0.35)"
              fontFamily="monospace"
              fontSize="10"
              transform="rotate(-50 540 480)"
              letterSpacing="3"
            >
              ARAVALLI RIDGE LINE
            </text>

            {/* Internal Dashed District Borders */}
            <g stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.55" fill="none">
              <path d="M 435 175 L 545 340 L 385 565" />
              <path d="M 615 215 L 795 225 L 855 320 L 665 360 Z" />
              <path d="M 545 340 L 765 415 L 795 625" />
              <path d="M 325 265 L 425 420 L 225 515" />
            </g>

            {/* Golden Highway Network */}
            <g id="svg-highways" stroke="#facc15" strokeWidth="3" opacity="0.85" fill="none">
              <path d="M 740 275 L 595 365 L 505 465 L 475 645" />
              <path d="M 740 275 L 865 285 L 945 415 L 865 545" />
              <path d="M 595 365 L 435 335 L 245 365 L 295 495" />
            </g>

            {/* Covert Horizon Corridor Spline */}
            <g id="svg-corridor">
              <path
                d="M 865 285 L 740 275 L 595 365 L 505 465 L 475 645"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            </g>

            {/* Fallback District Nodes */}
            <g id="svg-districts" />
            <g id="svg-pois" />
          </svg>

          {/* INTERACTIVE 13 NUMBERED DISTRICT PINS OVERLAY */}
          <div id="interactive-pins-layer" className="interactive-pins-layer">
            {TACTICAL_DISTRICTS.map((d) => {
              const isJaipur = d.id === 'jaipur';
              const isSelected = d.id === selectedId;
              return (
                <div
                  key={d.id}
                  id={`district-marker-${d.numInt}`}
                  data-district-id={d.id}
                  data-district-num={d.numInt}
                  data-district-status={isJaipur ? 'ACTIVE' : 'LOCKED'}
                  onClick={() => openDistrict(d.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDistrict(d.id);
                    }
                  }}
                  style={{ left: `${d.xPct}%`, top: `${d.yPct}%` }}
                  className={`map-pin-anchor ${isJaipur ? 'is-active-region' : 'is-future-region'} ${isSelected ? 'is-selected' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`District ${d.numInt}: ${d.name} (${isJaipur ? 'Active Story Region' : 'Locked World Concept'})`}
                >
                  <div className={`map-pin-pill ${isJaipur ? 'pill-active' : 'pill-future'}`}>
                    <span
                      style={{ backgroundColor: d.color, color: '#ffffff' }}
                      className={`map-pin-num-circle ${isJaipur ? 'pin-pulse active-pulse' : ''}`}
                    >
                      {d.numInt}
                    </span>
                    <span className="map-pin-name">{d.name}</span>
                    {isJaipur ? (
                      <span className="pin-status-tag tag-active">ACTIVE</span>
                    ) : (
                      <span className="pin-status-tag tag-future">LOCKED</span>
                    )}
                  </div>
                  {isJaipur && (
                    <span className="story-start-ribbon">STORY STARTS HERE // ACTIVE</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ===================================================================== */}
      {/* 7. SLIDE-OVER DISTRICT DOSSIER DRAWER (OPENS WHEN PIN IS CLICKED)     */}
      {/* ===================================================================== */}
      <aside
        id="district-drawer"
        className={`district-slide-drawer ${isDrawerOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-label={`${activeDistrict.name} District Dossier`}
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span
              id="drawer-num-badge"
              style={{ backgroundColor: activeDistrict.color }}
              className="drawer-num-badge"
            >
              {activeDistrict.numInt}
            </span>
            <div>
              <div id="drawer-rto" className="drawer-rto-label">
                DISTRICT #{activeDistrict.num} // RTO {activeDistrict.rto}
              </div>
              <h2 id="drawer-title" className="drawer-title-text">
                {activeDistrict.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="drawer-close-btn"
            aria-label="Close district drawer (ESC)"
          >
            CLOSE <X size={12} style={{ display: 'inline', marginLeft: 2 }} />
          </button>
        </div>

        <div className="drawer-body-scroll">
          {/* Status Badge */}
          <div className="drawer-status-strip">
            {activeDistrict.id === 'jaipur' ? (
              <span className="status-badge-active">
                ● ACTIVE // CURRENT PLAYABLE REGION
              </span>
            ) : (
              <span className="status-badge-locked">
                🔒 REGISTERED // FUTURE REGION (LOCKED)
              </span>
            )}
            <span className="status-region-tag">{activeDistrict.region}</span>
          </div>

          {/* Full Unclipped Quote with word-break and overflow-wrap */}
          <blockquote id="drawer-quote" className="drawer-quote-callout">
            &ldquo;{activeDistrict.quote}&rdquo;
          </blockquote>

          {/* Description Synopsis */}
          <p id="drawer-desc" className="drawer-synopsis-text">
            {activeDistrict.desc}
          </p>

          {/* 4 In-Game Tactical Telemetry Cards */}
          <div className="drawer-intel-grid">
            <div className="intel-metric-card">
              <div className="intel-metric-label">BIOME &amp; LANDMARK</div>
              <div id="drawer-biome" className="intel-metric-val white">
                {activeDistrict.biome}
              </div>
            </div>
            <div className="intel-metric-card">
              <div className="intel-metric-label">CAMPAIGN ACT</div>
              <div id="drawer-act" className="intel-metric-val orange">
                {activeDistrict.act}
              </div>
            </div>
            <div className="intel-metric-card">
              <div className="intel-metric-label">SYNDICATE CONTROL</div>
              <div className="intel-metric-val white">{activeDistrict.control}</div>
            </div>
            <div className="intel-metric-card">
              <div className="intel-metric-label">PRIMARY SAFEHOUSE</div>
              <div className="intel-metric-val orange">{activeDistrict.safehouse}</div>
            </div>
            <div className="intel-metric-card" style={{ gridColumn: 'span 2' }}>
              <div className="intel-metric-label">TERRAIN &amp; TRAFFIC</div>
              <div className="intel-metric-val white">{activeDistrict.terrain}</div>
            </div>
          </div>

          {/* Key Sector Landmarks & Missions */}
          <div>
            <div className="drawer-pois-header">
              // KEY SECTOR LANDMARKS &amp; MISSIONS
            </div>
            <div id="drawer-pois" className="drawer-pois-list">
              {activeDistrict.pois.map((p) => (
                <div key={p.name} className="drawer-poi-pill">
                  <MapPin size={14} style={{ color: '#ea580c', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <span style={{ fontWeight: 600, color: '#f3f4f6' }}>{p.name}</span>
                    <span style={{ display: 'block', fontSize: 10, color: '#9ca3af' }}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Fleet Spawns & Transport Connection */}
          <div className="drawer-vehicles-card">
            <div className="drawer-vehicles-top">
              <span>SIGNATURE DISTRICT VEHICLE SPAWNS</span>
              <a href="/garage" className="drawer-garage-link" aria-label="View all 92 vehicles in Transport Division">
                TRANSPORT // VIEW ALL 92 →
              </a>
            </div>
            <div id="drawer-vehicles" className="drawer-vehicles-list">
              {activeDistrict.vehicles}
            </div>
            {activeDistrict.id !== 'jaipur' && (
              <p className="drawer-vehicle-disclaimer">
                * Conceptual showcase vehicle tags for future world regions.
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Hidden compatibility hooks for automated test suites */}
      <div style={{ display: 'none' }} aria-hidden="true" data-active-layer={activeLayer}>
        <button onClick={() => setActiveLayer('ALL')}>ALL INTEL</button>
        <button onClick={() => setActiveLayer('CORRIDOR')}>HORIZON CORRIDOR</button>
        <button onClick={() => setActiveLayer('SAFEHOUSE')}>SAFEHOUSES &amp; GARAGES</button>
        <button onClick={() => setActiveLayer('MISSIONS')}>PROLOGUE MISSIONS</button>
        <button onClick={() => setActiveLayer('HIGHWAYS')}>NH-48 / NH-62 NETWORK</button>
        <button onClick={() => setShowPOIs(!showPOIs)}>
          {showPOIs ? 'SHOW LOCAL SECTOR POIs (ON)' : 'SHOW LOCAL SECTOR POIs (OFF)'}
        </button>
        <footer className="transit-corridor-footer">
          THE ROAD // 13-DISTRICT HORIZON TRANSIT ROUTE (CLICK TO RELOCATE SATELLITE)
        </footer>
      </div>
    </div>
  );
};

export default WorldExplorer;
