import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, Car, ExternalLink, Plus, Minus, RotateCcw, MapPin, Search } from 'lucide-react';
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
      (d) => d.id === initialDistrictId?.toLowerCase() || d.name.toLowerCase() === initialDistrictId?.toLowerCase()
    );
    return found ? found.id : 'jaipur';
  });

  const [activeLayer, setActiveLayer] = useState<TacticalLayerType>('ALL');
  const [showPOIs, setShowPOIs] = useState<boolean>(true);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [highlightedPoiIdx, setHighlightedPoiIdx] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const poiCardsRef = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const activeDistrict = useMemo<TacticalDistrict>(() => {
    return TACTICAL_DISTRICTS.find((d) => d.id === selectedId) || TACTICAL_DISTRICTS[0];
  }, [selectedId]);

  // Sync route and document title on selection
  const selectDistrict = useCallback((id: string) => {
    const target = TACTICAL_DISTRICTS.find((d) => d.id === id);
    if (!target) return;

    setSelectedId(target.id);
    setHighlightedPoiIdx(null);

    // Update browser URL cleanly
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `/world/${target.id}`);
    }
    document.title = `Broken Horizon — ${target.name} Territory Atlas`;

    // Smoothly scroll button in carousel into view
    const btn = document.getElementById(`carousel-btn-${target.id}`);
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  // Update on initialDistrictId prop changes
  useEffect(() => {
    if (initialDistrictId) {
      const found = TACTICAL_DISTRICTS.find(
        (d) => d.id === initialDistrictId.toLowerCase() || d.name.toLowerCase() === initialDistrictId.toLowerCase()
      );
      if (found && found.id !== selectedId) {
        selectDistrict(found.id);
      }
    }
  }, [initialDistrictId, selectDistrict, selectedId]);

  // Handle Search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const q = query.toLowerCase().trim();
    if (!q) return;

    const matched = TACTICAL_DISTRICTS.find(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.rto.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.pois.some((p) => p.name.toLowerCase().includes(q))
    );
    if (matched) {
      setSelectedId(matched.id);
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', `/world/${matched.id}`);
      }
    }
  };

  // POI selection and scroll
  const handlePoiCardClick = (idx: number) => {
    setHighlightedPoiIdx(idx);
    const el = poiCardsRef.current[idx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Pan & Zoom Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoomScale((prev) => Math.min(2.5, Math.max(0.75, prev * factor)));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(2.5, prev * 1.2));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(0.75, prev * 0.8));
  };

  return (
    <div className="tactical-atlas-root" role="main" aria-label="Broken Horizon Territory Atlas">
      {/* ================================================================= */}
      {/* 1. TOP TELEMETRY HEADER                                           */}
      {/* ================================================================= */}
      <header className="tactical-header" role="banner">
        <div className="tactical-nav-left">
          <button
            type="button"
            className="back-home-button"
            onClick={onBackToHome}
            aria-label="Return to Broken Horizon Homepage"
          >
            <ArrowLeft size={14} />
            <span>MAIN SITE</span>
          </button>
          <div>
            <div className="tactical-brand-title">BROKEN HORIZON</div>
            <div className="tactical-brand-subtitle">TERRITORY ATLAS // 13 RAJASTHAN DISTRICTS</div>
          </div>
        </div>

        {/* Global Atlas Search */}
        <div className="tactical-search-wrap">
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              style={{ position: 'absolute', left: 10, top: 9, color: '#6b7280', pointerEvents: 'none' }}
            />
            <input
              id="atlas-search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="SEARCH WORLD (JAIPUR, MEHTA GARAGE, UDAIPUR, NH-48...)"
              className="tactical-search-input"
              style={{ paddingLeft: '2rem' }}
            />
          </div>
        </div>

        <div className="tactical-nav-right">
          <a href="/garage" className="garage-link-btn" title="View 92-Vehicle Master Catalog">
            <Car size={14} />
            <span>92-VEHICLE GARAGE</span>
          </a>
          <a
            href="https://samwooduis.itch.io/broken-horizon"
            target="_blank"
            rel="noopener noreferrer"
            className="play-prologue-btn"
          >
            <span>PLAY PROLOGUE</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. COMPACT SINGLE-BAR TACTICAL LAYER SWITCHER                     */}
      {/* ================================================================= */}
      <div className="tactical-layers-bar" role="toolbar" aria-label="Tactical Map Layers">
        <div className="tactical-layer-group">
          <span className="tactical-layer-label">MAP LAYERS:</span>
          <button
            type="button"
            onClick={() => setActiveLayer('ALL')}
            className={`layer-btn ${activeLayer === 'ALL' ? 'is-active' : ''}`}
          >
            ALL INTEL
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('CORRIDOR')}
            className={`layer-btn ${activeLayer === 'CORRIDOR' ? 'is-active' : ''}`}
          >
            HORIZON CORRIDOR
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('SAFEHOUSE')}
            className={`layer-btn ${activeLayer === 'SAFEHOUSE' ? 'is-active' : ''}`}
          >
            SAFEHOUSES &amp; GARAGES
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('MISSIONS')}
            className={`layer-btn ${activeLayer === 'MISSIONS' ? 'is-active' : ''}`}
          >
            PROLOGUE MISSIONS
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('HIGHWAYS')}
            className={`layer-btn ${activeLayer === 'HIGHWAYS' ? 'is-active' : ''}`}
          >
            NH-48 / NH-62 NETWORK
          </button>
        </div>

        <div className="tactical-legend-group">
          <span className="legend-chip">
            <i className="legend-dot orange" />
            <span>PLAYABLE PROLOGUE SECTOR</span>
          </span>
          <span className="legend-chip">
            <i className="legend-dot red" />
            <span>HORIZON SYNDICATE NODE</span>
          </span>
          <span className="legend-chip">
            <i className="legend-dot blue" />
            <span>EVIDENCE / RECON TARGET</span>
          </span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. MAIN INTERACTIVE MAP STAGE + RIGHT TACTICAL DOSSIER            */}
      {/* ================================================================= */}
      <div className="tactical-stage">
        {/* CENTER INTERACTIVE TOPOGRAPHICAL SVG MAP */}
        <div
          className="tactical-viewport radar-grid-bg"
          id="map-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Top-Left Live Coordinate Telemetry Overlay */}
          <div className="hud-telemetry-box" aria-live="polite">
            <div className="hud-line-highlight">
              SECTOR: {activeDistrict.code} // RTO: {activeDistrict.rto}
            </div>
            <div className="hud-line-dim">
              TOPOGRAPHY: <span className="hud-val-white">{activeDistrict.terrain.toUpperCase()}</span>
            </div>
            <div className="hud-line-dim">
              ACTIVE LAYER: <span className="hud-val-accent">{activeLayer} TELEMETRY OVERLAY</span>
            </div>
          </div>

          {/* Map Zoom & POI HUD Controls */}
          <div className="map-hud-controls">
            <button
              type="button"
              onClick={handleZoomIn}
              className="map-ctrl-btn icon-square"
              title="Zoom In (+)"
              aria-label="Zoom in on map"
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="map-ctrl-btn icon-square"
              title="Zoom Out (-)"
              aria-label="Zoom out on map"
            >
              <Minus size={14} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="map-ctrl-btn text-pill"
              title="Reset View"
              aria-label="Reset map view"
            >
              <RotateCcw size={11} style={{ marginRight: 4 }} />
              RESET
            </button>
            <button
              type="button"
              onClick={() => setShowPOIs(!showPOIs)}
              className={`map-ctrl-btn text-pill ${showPOIs ? 'poi-toggle-active' : ''}`}
              title="Toggle Sub-Sector POIs"
              aria-label="Toggle Sub-Sector POIs"
            >
              <MapPin size={11} style={{ marginRight: 4 }} />
              {showPOIs ? 'SHOW LOCAL SECTOR POIs (ON)' : 'SHOW LOCAL SECTOR POIs (OFF)'}
            </button>
          </div>

          {/* Interactive SVG Canvas */}
          <svg
            id="rajasthan-svg"
            viewBox="0 0 1000 650"
            className="rajasthan-svg-canvas"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
            }}
          >
            <defs>
              <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ea580c" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
              </radialGradient>
              <pattern id="desertDunes" width="24" height="12" patternUnits="userSpaceOnUse">
                <path d="M 0 10 Q 6 4 12 10 T 24 10" fill="none" stroke="rgba(245, 158, 11, 0.12)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* 1. RAJASTHAN OUTER STATE BOUNDARY */}
            <path
              d="M 490 45 L 635 85 L 775 185 L 845 270 L 820 380 L 735 505 L 590 595 L 430 610 L 315 510 L 145 435 L 95 310 L 215 175 L 365 95 Z"
              fill="#090d15"
              stroke="#1f2937"
              strokeWidth="2.5"
            />

            {/* Thar Desert Biome Shading (West Rajasthan: Jaisalmer, Barmer, Jodhpur) */}
            <path
              d="M 110 310 L 225 185 L 430 190 L 420 450 L 290 490 L 145 430 Z"
              fill="url(#desertDunes)"
              stroke="rgba(245, 158, 11, 0.15)"
              strokeDasharray="4 4"
            />
            <text
              x="165"
              y="265"
              fill="rgba(245, 158, 11, 0.28)"
              fontFamily="monospace"
              fontSize="13"
              fontWeight="bold"
              letterSpacing="4"
            >
              THAR DESERT FRONTIER
            </text>

            {/* Aravalli Mountain Range Topographical Contour Rings */}
            <path
              d="M 380 560 Q 445 420 515 300 T 625 155"
              fill="none"
              stroke="rgba(156, 163, 175, 0.12)"
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M 380 560 Q 445 420 515 300 T 625 155"
              fill="none"
              stroke="rgba(234, 88, 12, 0.18)"
              strokeWidth="10"
              strokeDasharray="2 6"
              strokeLinecap="round"
            />
            <text
              x="435"
              y="415"
              fill="rgba(156, 163, 175, 0.3)"
              fontFamily="monospace"
              fontSize="10"
              transform="rotate(-52 435 415)"
              letterSpacing="3"
            >
              ARAVALLI RIDGE LINE
            </text>

            {/* Chambal River Basin (Kota / Bundi / Sawai Madhopur) */}
            <path
              d="M 610 565 Q 655 470 705 410 T 795 315"
              fill="none"
              stroke="rgba(56, 189, 248, 0.28)"
              strokeWidth="3.5"
            />

            {/* 2. NATIONAL HIGHWAY NETWORK */}
            {(activeLayer === 'ALL' || activeLayer === 'HIGHWAYS' || activeLayer === 'SAFEHOUSE') && (
              <g id="svg-highways" stroke="rgba(148, 163, 184, 0.32)" strokeWidth="2" fill="none">
                {/* NH-48: Jaipur -> Ajmer -> Rajsamand -> Udaipur */}
                <path d="M 630 225 L 525 295 L 445 445 L 420 535" />
                {/* NH-21: Jaipur -> Dausa -> Sawai Madhopur */}
                <path d="M 630 225 L 725 235 L 755 340" />
                {/* NH-52: Sikar -> Jaipur -> Bundi -> Kota */}
                <path d="M 585 135 L 630 225 L 615 415 L 655 475" />
                {/* Desert Links: Ajmer -> Pali -> Jodhpur -> Barmer -> Jaisalmer */}
                <path d="M 525 295 L 415 380 L 355 295 L 235 395 L 185 285" />
                <path d="M 355 295 L 185 285" />
              </g>
            )}

            {/* 3. COVERT HORIZON CORRIDOR LOGISTICS CONDUIT */}
            {(activeLayer === 'ALL' || activeLayer === 'CORRIDOR' || activeLayer === 'MISSIONS') && (
              <g id="svg-corridor">
                <path
                  d="M 725 235 L 630 225 L 525 295 L 415 380 L 355 295 L 185 285"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="corridor-flow"
                />
                <path
                  d="M 630 225 L 615 415 L 655 475 L 420 535"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  className="corridor-flow"
                />
                <g transform="translate(455, 250)">
                  <rect x="0" y="0" width="138" height="20" rx="3" fill="#180909" stroke="#ef4444" strokeWidth="1" />
                  <text
                    x="69"
                    y="13"
                    textAnchor="middle"
                    fill="#fca5a5"
                    fontFamily="monospace"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    HORIZON CORRIDOR LINE
                  </text>
                </g>
              </g>
            )}

            {/* 4. DYNAMIC DISTRICT HEXAGONS & NODES */}
            <g id="svg-districts">
              {TACTICAL_DISTRICTS.map((d) => {
                const isSelected = d.id === selectedId;
                const isPlayable = d.status.includes('PROLOGUE');
                const strokeColor = isSelected ? '#ea580c' : isPlayable ? '#f59e0b' : '#374151';
                const fillColor = isSelected ? 'rgba(234, 88, 12, 0.22)' : 'rgba(17, 24, 39, 0.7)';

                // Hexagon points around (d.x, d.y)
                const r = isSelected ? 48 : 34;
                const hexPoints = [0, 60, 120, 180, 240, 300]
                  .map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    return `${d.x + r * Math.cos(rad)},${d.y + r * Math.sin(rad)}`;
                  })
                  .join(' ');

                return (
                  <g
                    key={d.id}
                    onClick={() => selectDistrict(d.id)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select district ${d.name}`}
                  >
                    {isSelected && <circle cx={d.x} cy={d.y} r="68" fill="url(#activeGlow)" />}
                    <polygon
                      points={hexPoints}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.5 : 1.3}
                    />
                    {isSelected && (
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r="12"
                        fill="none"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="pulse-node"
                      />
                    )}
                    <circle
                      cx={d.x}
                      cy={d.y}
                      r={isSelected ? 6 : 4.5}
                      fill={isSelected ? '#ea580c' : isPlayable ? '#fbbf24' : '#9ca3af'}
                    />
                    <text
                      x={d.x}
                      y={d.y - 12}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#d1d5db'}
                      fontFamily="Oswald, sans-serif"
                      fontSize={isSelected ? 13 : 10}
                      fontWeight="bold"
                      letterSpacing="1"
                    >
                      {d.name}
                    </text>
                    <text
                      x={d.x}
                      y={d.y + 18}
                      textAnchor="middle"
                      fill={isSelected ? '#fdba74' : '#6b7280'}
                      fontFamily="monospace"
                      fontSize="8"
                    >
                      {d.rto}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 5. SUB-SECTOR LOCAL POI PINS */}
            {showPOIs && activeDistrict && activeDistrict.pois && (
              <g id="svg-pois">
                {activeDistrict.pois.map((p, idx) => {
                  const px = activeDistrict.x + p.dx * 1.65;
                  const py = activeDistrict.y + p.dy * 1.65;
                  const isHighlighted = highlightedPoiIdx === idx;

                  return (
                    <g
                      key={p.name}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePoiCardClick(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View location ${p.name}`}
                    >
                      <line
                        x1={activeDistrict.x}
                        y1={activeDistrict.y}
                        x2={px}
                        y2={py}
                        stroke={isHighlighted ? '#ea580c' : '#38bdf8'}
                        strokeWidth={isHighlighted ? 1.5 : 1}
                        strokeDasharray="2 2"
                      />
                      <circle
                        cx={px}
                        cy={py}
                        r={isHighlighted ? 7 : 5}
                        fill={isHighlighted ? '#ea580c' : '#0284c7'}
                        stroke={isHighlighted ? '#ffffff' : '#bae6fd'}
                        strokeWidth="1.5"
                        className="poi-pulse-pin"
                      />
                      <rect
                        x={px + 8}
                        y={py - 8}
                        width={p.name.length * 5.4 + 14}
                        height="16"
                        rx="3"
                        fill="#050811"
                        stroke={isHighlighted ? '#ea580c' : '#0284c7'}
                        strokeWidth={isHighlighted ? 1.2 : 0.8}
                      />
                      <text
                        x={px + 14}
                        y={py + 3}
                        fill={isHighlighted ? '#fdba74' : '#e0f2fe'}
                        fontFamily="monospace"
                        fontSize="8.5"
                        fontWeight="bold"
                      >
                        {p.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* =============================================================== */}
        {/* RIGHT-HAND TACTICAL DISTRICT DOSSIER DRAWER                     */}
        {/* =============================================================== */}
        <aside
          className="tactical-dossier-drawer"
          role="region"
          aria-label={`${activeDistrict.name} Tactical Dossier`}
        >
          {/* District Visual Banner Header */}
          <div className="dossier-banner-header">
            <img
              src={activeDistrict.img}
              alt={activeDistrict.name}
              className="dossier-banner-img"
              onError={(e) => {
                if (activeDistrict.fallbackImg) {
                  (e.currentTarget as HTMLImageElement).src = activeDistrict.fallbackImg;
                }
              }}
            />
            <div className="dossier-banner-gradient" />

            <div className="dossier-banner-badges">
              <span className="dossier-code-pill">{activeDistrict.code}</span>
              <span className="dossier-status-pill">{activeDistrict.status}</span>
            </div>

            <div className="dossier-banner-titles">
              <div className="dossier-region-subtitle">
                {activeDistrict.region} • {activeDistrict.rto}
              </div>
              <h1 className="dossier-district-name">{activeDistrict.name}</h1>
            </div>
          </div>

          {/* Dossier Body Content */}
          <div className="dossier-body">
            {/* Fixed Full Quote (ZERO CLIPPING / BREAK-WORDS) */}
            <blockquote className="dossier-quote-box">
              &ldquo;{activeDistrict.quote}&rdquo;
            </blockquote>

            {/* District Narrative Synopsis */}
            <p className="dossier-synopsis">{activeDistrict.desc}</p>

            {/* 4 Tactical Game Telemetry Cards */}
            <div className="dossier-telemetry-grid">
              <div className="telemetry-card">
                <div className="telemetry-card-label">SYNDICATE CONTROL</div>
                <div className="telemetry-card-val red">{activeDistrict.control}</div>
              </div>
              <div className="telemetry-card">
                <div className="telemetry-card-label">PRIMARY SAFEHOUSE</div>
                <div className="telemetry-card-val orange">{activeDistrict.safehouse}</div>
              </div>
              <div className="telemetry-card">
                <div className="telemetry-card-label">TERRAIN &amp; TRAFFIC</div>
                <div className="telemetry-card-val white">{activeDistrict.terrain}</div>
              </div>
              <div className="telemetry-card">
                <div className="telemetry-card-label">CAMPAIGN ACT</div>
                <div className="telemetry-card-val emerald">{activeDistrict.act}</div>
              </div>
            </div>

            {/* Local Sector Points of Interest (Clickable Cards) */}
            <div>
              <div className="pois-section-header">
                <span>// VERIFIED SECTOR POIs &amp; MISSION NODES</span>
                <span>{activeDistrict.pois.length} LOCATIONS</span>
              </div>
              <div className="pois-list">
                {activeDistrict.pois.map((p, idx) => {
                  const isHighlighted = highlightedPoiIdx === idx;
                  return (
                    <div
                      key={p.name}
                      ref={(el) => {
                        poiCardsRef.current[idx] = el;
                      }}
                      onClick={() => handlePoiCardClick(idx)}
                      className={`poi-card ${isHighlighted ? 'is-highlighted' : ''}`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="poi-card-top">
                        <span className="poi-card-name">📍 {p.name}</span>
                        <span className="poi-card-type">{p.type}</span>
                      </div>
                      <p className="poi-card-desc">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Native Fleet Spawns in this District */}
            <div className="fleet-spawns-card">
              <div className="fleet-spawns-header">
                <span>SIGNATURE DISTRICT VEHICLE SPAWNS</span>
                <a href="/garage" className="fleet-garage-link">
                  OPEN GARAGE →
                </a>
              </div>
              <div className="fleet-spawns-list">{activeDistrict.vehicles}</div>
            </div>
          </div>
        </aside>
      </div>

      {/* ================================================================= */}
      {/* 4. BOTTOM 13-DISTRICT TRANSIT CORRIDOR BAR                        */}
      {/* ================================================================= */}
      <footer className="transit-corridor-footer" role="contentinfo">
        <div className="transit-footer-eyebrow">
          THE ROAD // 13-DISTRICT HORIZON TRANSIT ROUTE (CLICK TO RELOCATE SATELLITE)
        </div>
        <div className="transit-carousel-row" ref={carouselRef}>
          {TACTICAL_DISTRICTS.map((d) => {
            const isSelected = d.id === selectedId;
            return (
              <button
                key={d.id}
                id={`carousel-btn-${d.id}`}
                type="button"
                onClick={() => selectDistrict(d.id)}
                className={`transit-district-btn ${isSelected ? 'is-selected' : ''}`}
                aria-pressed={isSelected}
              >
                <span className="transit-btn-num">{d.num}</span>
                <span className="transit-btn-name">{d.name}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
