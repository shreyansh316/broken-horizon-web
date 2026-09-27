import React from 'react';
import { Plus, Minus, RotateCcw, MapPin, BookOpen, Moon, CloudRain, Shield, Navigation } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateWorld: () => void;
  onToggleLegend: () => void;
  isLegendOpen: boolean;
  isNightRecon: boolean;
  onToggleNightRecon: () => void;
  isWeatherRadar: boolean;
  onToggleWeatherRadar: () => void;
  isFactionOverlay: boolean;
  onToggleFactionOverlay: () => void;
  onOpenTripPlanner: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocateWorld,
  onToggleLegend,
  isLegendOpen,
  isNightRecon,
  onToggleNightRecon,
  isWeatherRadar,
  onToggleWeatherRadar,
  isFactionOverlay,
  onToggleFactionOverlay,
  onOpenTripPlanner,
}) => {
  return (
    <div className="map-hud-controls" role="toolbar" aria-label="Map Navigation Controls">
      {/* Zoom In */}
      <button
        type="button"
        className="hud-ctrl-btn"
        onClick={onZoomIn}
        aria-label="Zoom in on map"
        title="Zoom In (+)"
      >
        <Plus size={16} />
      </button>

      {/* Zoom Out */}
      <button
        type="button"
        className="hud-ctrl-btn"
        onClick={onZoomOut}
        aria-label="Zoom out on map"
        title="Zoom Out (-)"
      >
        <Minus size={16} />
      </button>

      <div className="hud-ctrl-separator" aria-hidden="true" />

      {/* Reset Map */}
      <button
        type="button"
        className="hud-ctrl-btn"
        onClick={onReset}
        aria-label="Reset map view to default coordinates"
        title="Reset Camera (R)"
      >
        <RotateCcw size={16} />
      </button>

      {/* Center / Locate World */}
      <button
        type="button"
        className="hud-ctrl-btn"
        onClick={onLocateWorld}
        aria-label="Center on Jaipur starting region"
        title="Locate Jaipur Starting Region"
      >
        <MapPin size={16} />
      </button>

      <div className="hud-ctrl-separator" aria-hidden="true" />

      {/* Toggle Night Recon Thermal Mode */}
      <button
        type="button"
        className={`hud-ctrl-btn ${isNightRecon ? 'is-active is-recon-active' : ''}`}
        onClick={onToggleNightRecon}
        aria-label="Toggle Night Recon Thermal Mode"
        title="Night Recon / Thermal Satellite Mode"
      >
        <Moon size={16} />
      </button>

      {/* Toggle Weather Radar & Hazard Fronts */}
      <button
        type="button"
        className={`hud-ctrl-btn ${isWeatherRadar ? 'is-active is-weather-active' : ''}`}
        onClick={onToggleWeatherRadar}
        aria-label="Toggle Live Weather Radar"
        title="Live Weather Radar (Sandstorms & Monsoon)"
      >
        <CloudRain size={16} />
      </button>

      {/* Toggle Faction Turf Influence Layer */}
      <button
        type="button"
        className={`hud-ctrl-btn ${isFactionOverlay ? 'is-active is-faction-active' : ''}`}
        onClick={onToggleFactionOverlay}
        aria-label="Toggle Faction Turf Overlay"
        title="Faction Territorial Influence Heatmap"
      >
        <Shield size={16} />
      </button>

      {/* Open GPS Trip Route Calculator */}
      <button
        type="button"
        className="hud-ctrl-btn"
        onClick={onOpenTripPlanner}
        aria-label="Open GPS Route & Trip Planner"
        title="Tactical GPS Route Planner"
      >
        <Navigation size={16} />
      </button>

      <div className="hud-ctrl-separator" aria-hidden="true" />

      {/* Toggle Legend */}
      <button
        type="button"
        className={`hud-ctrl-btn ${isLegendOpen ? 'is-active' : ''}`}
        onClick={onToggleLegend}
        aria-label="Toggle Cartographic Legend"
        title="Cartographic Legend"
      >
        <BookOpen size={16} />
      </button>
    </div>
  );
};
