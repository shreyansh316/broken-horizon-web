import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WorldMapBackground } from './WorldMapBackground';
import { DistrictLayer } from './DistrictLayer';
import { RoadNetwork } from './RoadNetwork';
import { RouteNetwork } from './RouteNetwork';
import { LandmarkLayer } from './LandmarkLayer';
import { WeatherRadarLayer } from './WeatherRadarLayer';
import { FactionLayer } from './FactionLayer';
import type { WorldRegion, MapLandmark } from '../../data/worldData';

interface WorldMapProps {
  selectedDistrict: WorldRegion | null;
  hoveredDistrict: WorldRegion | null;
  selectedLandmark: MapLandmark | null;
  filter: string;
  onSelectDistrict: (district: WorldRegion) => void;
  onHoverDistrict: (district: WorldRegion | null) => void;
  onSelectLandmark: (landmark: MapLandmark) => void;
  focusTarget: { x: number; y: number } | null;
  onResetComplete?: () => void;
  isNightRecon?: boolean;
  isWeatherRadar?: boolean;
  isFactionOverlay?: boolean;
  gpsRoute?: {
    from: { x: number; y: number; name: string };
    to: { x: number; y: number; name: string };
  } | null;
}

const DEFAULT_VIEW = { x: 0, y: 0, width: 1200, height: 900 };

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedDistrict,
  hoveredDistrict,
  selectedLandmark,
  filter,
  onSelectDistrict,
  onHoverDistrict,
  onSelectLandmark,
  focusTarget,
  isNightRecon = false,
  isWeatherRadar = false,
  isFactionOverlay = false,
  gpsRoute = null,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Camera state
  const [viewBox, setViewBox] = useState(DEFAULT_VIEW);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  // Smoothly center camera on focusTarget when provided
  useEffect(() => {
    if (!focusTarget) return;

    const targetWidth = 650;
    const targetHeight = 487;
    const targetX = Math.max(-100, Math.min(650, focusTarget.x - targetWidth / 2));
    const targetY = Math.max(-50, Math.min(500, focusTarget.y - targetHeight / 2));

    // Smooth transition
    setViewBox({
      x: targetX,
      y: targetY,
      width: targetWidth,
      height: targetHeight,
    });
  }, [focusTarget]);

  // Pan with Mouse Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with primary mouse button
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const scaleFactorX = viewBox.width / rect.width;
    const scaleFactorY = viewBox.height / rect.height;

    const dx = (e.clientX - dragStart.x) * scaleFactorX;
    const dy = (e.clientY - dragStart.y) * scaleFactorY;

    setViewBox((prev) => ({
      ...prev,
      x: Math.max(-300, Math.min(800, prev.x - dx)),
      y: Math.max(-200, Math.min(600, prev.y - dy)),
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom with Wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 1.12 : 0.88;

    setViewBox((prev) => {
      const newWidth = Math.max(380, Math.min(1600, prev.width * zoomFactor));
      const newHeight = newWidth * (900 / 1200);

      // Zoom towards center of current view
      const dx = (newWidth - prev.width) / 2;
      const dy = (newHeight - prev.height) / 2;

      return {
        x: Math.max(-300, Math.min(800, prev.x - dx)),
        y: Math.max(-200, Math.min(600, prev.y - dy)),
        width: newWidth,
        height: newHeight,
      };
    });
  }, []);

  // Double Click Zoom In
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = viewBox.x + ((e.clientX - rect.left) / rect.width) * viewBox.width;
    const clickY = viewBox.y + ((e.clientY - rect.top) / rect.height) * viewBox.height;

    setViewBox((prev) => {
      const newWidth = Math.max(380, prev.width * 0.75);
      const newHeight = newWidth * (900 / 1200);
      return {
        x: clickX - newWidth / 2,
        y: clickY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  // Mobile Touch Pan & Pinch Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Calculate distance between two fingers
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleFactorX = viewBox.width / rect.width;
    const scaleFactorY = viewBox.height / rect.height;

    if (e.touches.length === 1 && isDragging) {
      const dx = (e.touches[0].clientX - dragStart.x) * scaleFactorX;
      const dy = (e.touches[0].clientY - dragStart.y) * scaleFactorY;

      setViewBox((prev) => ({
        ...prev,
        x: Math.max(-300, Math.min(800, prev.x - dx)),
        y: Math.max(-200, Math.min(600, prev.y - dy)),
      }));

      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = touchDistance / currentDist;

      setViewBox((prev) => {
        const newWidth = Math.max(380, Math.min(1600, prev.width * factor));
        const newHeight = newWidth * (900 / 1200);
        const dx = (newWidth - prev.width) / 2;
        const dy = (newHeight - prev.height) / 2;
        return {
          x: Math.max(-300, Math.min(800, prev.x - dx)),
          y: Math.max(-200, Math.min(600, prev.y - dy)),
          width: newWidth,
          height: newHeight,
        };
      });
      setTouchDistance(currentDist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  // Keyboard navigation (+, -, R, Arrow keys, W/A/S/D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing into search input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const panDelta = 60;
      if (e.key === '+' || e.key === '=') {
        setViewBox((prev) => {
          const w = Math.max(380, prev.width * 0.85);
          const h = w * (900 / 1200);
          return { x: prev.x + (prev.width - w) / 2, y: prev.y + (prev.height - h) / 2, width: w, height: h };
        });
      } else if (e.key === '-' || e.key === '_') {
        setViewBox((prev) => {
          const w = Math.min(1600, prev.width * 1.15);
          const h = w * (900 / 1200);
          return { x: prev.x - (w - prev.width) / 2, y: prev.y - (h - prev.height) / 2, width: w, height: h };
        });
      } else if (e.key.toLowerCase() === 'r') {
        setViewBox(DEFAULT_VIEW);
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        setViewBox((prev) => ({ ...prev, y: prev.y - panDelta }));
      } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        setViewBox((prev) => ({ ...prev, y: prev.y + panDelta }));
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setViewBox((prev) => ({ ...prev, x: prev.x - panDelta }));
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setViewBox((prev) => ({ ...prev, x: prev.x + panDelta }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`world-map-canvas-container ${isDragging ? 'is-dragging' : ''} ${isNightRecon ? 'is-night-recon-active' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="application"
      aria-label="Interactive Broken Horizon Territory Map. Drag to pan, scroll to zoom, click districts to inspect."
      tabIndex={0}
    >
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="world-map-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Layer 1: Tactical Canvas Background & Contours */}
        <WorldMapBackground />

        {/* Layer 1.5: Faction Territorial Influence Layer */}
        <FactionLayer isVisible={isFactionOverlay} />

        {/* Layer 2: Primary Highway Infrastructure */}
        <RoadNetwork
          selectedDistrictId={selectedDistrict?.id}
          filter={filter}
        />

        {/* Layer 3: Horizon Corridor Secret Network */}
        <RouteNetwork filter={filter} />

        {/* Layer 4: District Territories (13 Polygons) */}
        <DistrictLayer
          selectedDistrict={selectedDistrict}
          hoveredDistrict={hoveredDistrict}
          onSelectDistrict={onSelectDistrict}
          onHoverDistrict={onHoverDistrict}
          filter={filter}
        />

        {/* Layer 4.5: Dynamic Live Weather & Hazard Radar Layer */}
        <WeatherRadarLayer isVisible={isWeatherRadar} />

        {/* Layer 5: Landmarks & Character Hubs */}
        <LandmarkLayer
          selectedLandmark={selectedLandmark}
          onSelectLandmark={onSelectLandmark}
          filter={filter}
        />

        {/* Layer 6: Dynamic GPS Calculated Transit Path */}
        {gpsRoute && (
          <g className="dynamic-gps-route-layer">
            <defs>
              <filter id="gps-pulse-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Wide Glow Underlay */}
            <path
              d={`M ${gpsRoute.from.x},${gpsRoute.from.y} Q ${(gpsRoute.from.x + gpsRoute.to.x) / 2 + 30},${(gpsRoute.from.y + gpsRoute.to.y) / 2 - 40} ${gpsRoute.to.x},${gpsRoute.to.y}`}
              fill="none"
              stroke="#00ffff"
              strokeWidth="6"
              opacity="0.35"
              filter="url(#gps-pulse-filter)"
            />
            {/* Animated Dashed Transit Line */}
            <path
              d={`M ${gpsRoute.from.x},${gpsRoute.from.y} Q ${(gpsRoute.from.x + gpsRoute.to.x) / 2 + 30},${(gpsRoute.from.y + gpsRoute.to.y) / 2 - 40} ${gpsRoute.to.x},${gpsRoute.to.y}`}
              fill="none"
              stroke="#00ffff"
              strokeWidth="2.5"
              strokeDasharray="8 5"
              className="anim-gps-dash"
            />
            {/* Origin Node Pin */}
            <g transform={`translate(${gpsRoute.from.x}, ${gpsRoute.from.y})`}>
              <circle cx="0" cy="0" r="10" fill="none" stroke="#00ffff" strokeWidth="2" className="anim-pulse-glow" />
              <circle cx="0" cy="0" r="4" fill="#00ffff" />
              <text x="14" y="4" fill="#00ffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                [A] {gpsRoute.from.name.toUpperCase()}
              </text>
            </g>
            {/* Destination Node Pin */}
            <g transform={`translate(${gpsRoute.to.x}, ${gpsRoute.to.y})`}>
              <circle cx="0" cy="0" r="10" fill="none" stroke="#38a169" strokeWidth="2" className="anim-pulse-glow" />
              <circle cx="0" cy="0" r="4" fill="#38a169" />
              <text x="14" y="4" fill="#38a169" fontSize="10" fontFamily="monospace" fontWeight="bold">
                [B] {gpsRoute.to.name.toUpperCase()}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
