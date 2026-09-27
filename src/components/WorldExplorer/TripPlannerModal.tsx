import React, { useState } from 'react';
import { X, Navigation, Fuel, AlertTriangle, ShieldCheck, Clock, Gauge, Car } from 'lucide-react';
import { worldRegions, type WorldRegion } from '../../data/worldData';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlotRoute: (origin: WorldRegion, dest: WorldRegion) => void;
  currentDistrict: WorldRegion | null;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  onPlotRoute,
  currentDistrict,
}) => {
  const [originId, setOriginId] = useState<string>(currentDistrict?.id || 'jaipur');
  const [destId, setDestId] = useState<string>('jaisalmer');

  if (!isOpen) return null;

  const origin = worldRegions.find((r) => r.id === originId) || worldRegions[0];
  const dest = worldRegions.find((r) => r.id === destId) || worldRegions[1];

  // Mathematical approximation based on vector distance
  const dx = dest.mapCoordinates.x - origin.mapCoordinates.x;
  const dy = dest.mapCoordinates.y - origin.mapCoordinates.y;
  const pixelDist = Math.hypot(dx, dy);
  
  // 100 pixels ~= 85 km on our scale
  const estDistanceKm = Math.round(Math.max(45, pixelDist * 0.85));
  const estTravelHours = (estDistanceKm / 68).toFixed(1);
  const fuelLitres = Math.round(estDistanceKm * 0.11);
  const tollPlazas = Math.max(1, Math.round(estDistanceKm / 120));

  // Determine route hazard
  const isDesertRoute = originId === 'jaisalmer' || destId === 'jaisalmer' || originId === 'bikaner' || destId === 'bikaner';
  const isChambalRoute = originId === 'dholpur' || destId === 'dholpur' || originId === 'kota' || destId === 'kota';
  const dangerLevel = isDesertRoute ? 'HIGH (Sandstorms / Dunes)' : isChambalRoute ? 'CRITICAL (Syndicate Patrols)' : 'MODERATE (State Patrols)';
  const recommendedVehicle = isDesertRoute ? '4x4 Off-Road Recon Rig' : isChambalRoute ? 'Armored Convoy Sedan' : 'High-Speed Touring Coupe';

  const handleCalculate = () => {
    onPlotRoute(origin, dest);
    onClose();
  };

  return (
    <div className="trip-planner-overlay" role="dialog" aria-modal="true" aria-label="Tactical Route & Trip Planner">
      <div className="trip-planner-container">
        {/* Header */}
        <div className="trip-planner-header">
          <div className="trip-planner-title-block">
            <Navigation size={18} className="trip-planner-icon" />
            <div>
              <span className="trip-planner-pre">RAJASTHAN CORRIDOR TRANSIT</span>
              <h3 className="trip-planner-title">TACTICAL GPS ROUTE CALCULATOR</h3>
            </div>
          </div>
          <button
            type="button"
            className="trip-planner-close-btn"
            onClick={onClose}
            aria-label="Close Route Calculator"
          >
            <X size={18} />
          </button>
        </div>

        {/* Inputs */}
        <div className="trip-planner-selectors-grid">
          <div className="selector-group">
            <label htmlFor="origin-select" className="selector-label">
              <span className="dot dot-origin" />
              ORIGIN DEPARTURE
            </label>
            <select
              id="origin-select"
              className="trip-select-input"
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
            >
              {worldRegions.map((r) => (
                <option key={`orig-${r.id}`} value={r.id}>
                  {r.name} [{r.region}]
                </option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label htmlFor="dest-select" className="selector-label">
              <span className="dot dot-dest" />
              DESTINATION ARRIVAL
            </label>
            <select
              id="dest-select"
              className="trip-select-input"
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
            >
              {worldRegions.map((r) => (
                <option key={`dest-${r.id}`} value={r.id}>
                  {r.name} [{r.region}]
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculated Telemetry Grid */}
        <div className="trip-telemetry-grid">
          <div className="telemetry-card">
            <div className="telemetry-header">
              <Gauge size={14} />
              <span>HIGHWAY DISTANCE</span>
            </div>
            <span className="telemetry-val">{estDistanceKm} KM</span>
            <span className="telemetry-sub">Regional corridor routing</span>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <Clock size={14} />
              <span>ESTIMATED TIME</span>
            </div>
            <span className="telemetry-val">{estTravelHours} HRS</span>
            <span className="telemetry-sub">In-world cruising velocity</span>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <Fuel size={14} />
              <span>FUEL CONSUMPTION</span>
            </div>
            <span className="telemetry-val">~{fuelLitres} LITRES</span>
            <span className="telemetry-sub">{tollPlazas} Toll checkpoints</span>
          </div>

          <div className="telemetry-card">
            <div className="telemetry-header">
              <AlertTriangle size={14} className={isChambalRoute || isDesertRoute ? 'hazard-amber' : ''} />
              <span>THREAT LEVEL</span>
            </div>
            <span className={`telemetry-val ${isChambalRoute ? 'hazard-critical' : isDesertRoute ? 'hazard-high' : ''}`}>
              {dangerLevel}
            </span>
            <span className="telemetry-sub">Active faction alert</span>
          </div>
        </div>

        {/* Recommended Equipment */}
        <div className="trip-recommendation-box">
          <Car size={16} className="rec-icon" />
          <div className="rec-content">
            <span className="rec-lead">TACTICAL VEHICLE RECOMMENDATION</span>
            <p className="rec-detail">
              <strong>{recommendedVehicle}:</strong> Fitted for {origin.terrain} to {dest.terrain} transition. Ensure high-clearance suspension for dirt highway shoulders.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="trip-planner-footer">
          <button
            type="button"
            className="trip-plot-cta"
            onClick={handleCalculate}
          >
            <ShieldCheck size={16} />
            <span>PLOT GPS TRANSIT PATH ON ATLAS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
