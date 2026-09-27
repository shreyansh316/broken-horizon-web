import React from 'react';
import type { VehicleConfigState } from '../../data/garageData';
import {
  TIRE_OPTIONS,
  SUSPENSION_OPTIONS,
  BUMPER_OPTIONS,
  ROOFRACK_OPTIONS,
  TELEMETRY_OPTIONS,
  LIVERY_OPTIONS,
  TUNING_PRESETS,
} from '../../data/garageData';
import { engineSound } from '../../utils/engineSoundEngine';
import { Disc, Sliders, Shield, Fuel, Radio, Palette, Check, Sparkles } from 'lucide-react';

interface TuningControlsProps {
  config: VehicleConfigState;
  onChangeConfig: (newConfig: VehicleConfigState) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const TuningControls: React.FC<TuningControlsProps> = ({
  config,
  onChangeConfig,
  activeCategory,
  onSelectCategory,
}) => {
  const handleApplyPreset = (presetName: string) => {
    const found = TUNING_PRESETS.find((p) => p.name === presetName);
    if (found) {
      engineSound.playPneumaticToolSound();
      onChangeConfig(found.config);
    }
  };

  const handleUpdate = (patch: Partial<VehicleConfigState>) => {
    engineSound.playPneumaticToolSound();
    onChangeConfig({
      ...config,
      ...patch,
      presetName: 'Custom Specification',
    });
  };

  const categories = [
    { id: 'tires', label: 'TIRES & PSI', icon: Disc },
    { id: 'suspension', label: 'SUSPENSION', icon: Sliders },
    { id: 'bumper', label: 'BUMPER & WINCH', icon: Shield },
    { id: 'roof', label: 'ROOF GEAR', icon: Fuel },
    { id: 'telemetry', label: 'TELEMETRY', icon: Radio },
    { id: 'livery', label: 'LIVERY & COAT', icon: Palette },
  ];

  return (
    <div className="tuning-controls-panel">
      {/* Quick Presets Bar */}
      <div className="presets-selector-bar">
        <div className="presets-title-row">
          <Sparkles size={14} className="text-amber" />
          <span className="presets-title font-mono">OPERATIONAL SETUP PRESETS</span>
        </div>
        <div className="presets-buttons-wrap">
          {TUNING_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={`preset-btn ${config.presetName === p.name ? 'is-active' : ''}`}
              onClick={() => handleApplyPreset(p.name)}
            >
              <span className="preset-name">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tuning Module Navigation Tabs */}
      <div className="tuning-category-tabs" role="tablist">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`tuning-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <Icon size={15} className="tab-icon" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="tuning-parts-content">
        {/* TIRES & PSI TAB */}
        {activeCategory === 'tires' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">SELECT TIRE SPECIFICATION</h4>
            <div className="parts-options-grid">
              {TIRE_OPTIONS.map((tire) => {
                const isSelected = config.tireType === tire.id;
                return (
                  <div
                    key={tire.id}
                    className={`part-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ tireType: tire.id as VehicleConfigState['tireType'] })}
                  >
                    <div className="part-card-header">
                      <span className="part-name font-mono">{tire.name}</span>
                      {isSelected && <Check size={16} className="text-amber" />}
                    </div>
                    <p className="part-desc">{tire.shortDesc}</p>
                    <div className="part-stats-pill font-mono">
                      <span>FLOTATION: {tire.sandFlotation}%</span>
                      <span>WEIGHT: {tire.weightDeltaKg >= 0 ? `+${tire.weightDeltaKg}` : tire.weightDeltaKg} kg</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tire Pressure PSI Slider */}
            <div className="tire-psi-controller">
              <div className="psi-header-row font-mono">
                <span className="psi-label">DYNAMIC TIRE PRESSURE (PSI)</span>
                <span className="psi-value text-amber">{config.tirePsi} PSI</span>
              </div>
              <input
                type="range"
                min="16"
                max="42"
                step="1"
                value={config.tirePsi}
                onChange={(e) => onChangeConfig({ ...config, tirePsi: Number(e.target.value) })}
                className="psi-range-input"
              />
              <div className="psi-range-markers font-mono">
                <span>16 PSI (Deep Sand Flotation)</span>
                <span>28 PSI (Wadi Rock)</span>
                <span>42 PSI (High-Speed Tarmac)</span>
              </div>
              <p className="psi-explanation">
                {config.tirePsi <= 20
                  ? '⚠️ Extreme beadlock deflation: Footprint expands by 140% for navigating loose sand dunes. Top speed capped.'
                  : config.tirePsi <= 32
                  ? '⚡ Balanced off-road pressure: Optimized for sharp Aravalli rock beds and washouts.'
                  : '🚀 High-pressure highway setting: Minimum rolling resistance and maximum top speed along NH-48 / NH-62.'}
              </p>
            </div>
          </div>
        )}

        {/* SUSPENSION TAB */}
        {activeCategory === 'suspension' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">CHASSIS & SUSPENSION GEOMETRY</h4>
            <div className="parts-options-grid">
              {SUSPENSION_OPTIONS.map((susp) => {
                const isSelected = config.suspension === susp.id;
                return (
                  <div
                    key={susp.id}
                    className={`part-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ suspension: susp.id as VehicleConfigState['suspension'] })}
                  >
                    <div className="part-card-header">
                      <span className="part-name font-mono">{susp.name}</span>
                      {isSelected && <Check size={16} className="text-amber" />}
                    </div>
                    <p className="part-desc">{susp.shortDesc}</p>
                    <div className="part-stats-pill font-mono">
                      <span>SPEED: {susp.topSpeedDeltaKmh >= 0 ? `+${susp.topSpeedDeltaKmh}` : susp.topSpeedDeltaKmh} km/h</span>
                      <span>DURABILITY: {susp.armorRating}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BUMPER & WINCH TAB */}
        {activeCategory === 'bumper' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">FRONT PROTECTION & RECOVERY</h4>
            <div className="parts-options-grid">
              {BUMPER_OPTIONS.map((bumper) => {
                const isSelected = config.frontBumper === bumper.id;
                return (
                  <div
                    key={bumper.id}
                    className={`part-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ frontBumper: bumper.id as VehicleConfigState['frontBumper'] })}
                  >
                    <div className="part-card-header">
                      <span className="part-name font-mono">{bumper.name}</span>
                      {isSelected && <Check size={16} className="text-amber" />}
                    </div>
                    <p className="part-desc">{bumper.shortDesc}</p>
                    <div className="part-stats-pill font-mono">
                      <span>ARMOR: {bumper.armorRating}%</span>
                      <span>WEIGHT: +{bumper.weightDeltaKg} kg</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ROOF GEAR TAB */}
        {activeCategory === 'roof' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">OVERHEAD EXPEDITION CARGO</h4>
            <div className="parts-options-grid">
              {ROOFRACK_OPTIONS.map((roof) => {
                const isSelected = config.roofRack === roof.id;
                return (
                  <div
                    key={roof.id}
                    className={`part-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ roofRack: roof.id as VehicleConfigState['roofRack'] })}
                  >
                    <div className="part-card-header">
                      <span className="part-name font-mono">{roof.name}</span>
                      {isSelected && <Check size={16} className="text-amber" />}
                    </div>
                    <p className="part-desc">{roof.shortDesc}</p>
                    <div className="part-stats-pill font-mono">
                      <span>FUEL RANGE: {roof.fuelRangeKm} km</span>
                      <span>AERO PENALTY: {roof.topSpeedDeltaKmh >= 0 ? `+${roof.topSpeedDeltaKmh}` : roof.topSpeedDeltaKmh} km/h</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TELEMETRY & JAMMING TAB */}
        {activeCategory === 'telemetry' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">ELECTRONIC WARFARE & SENSORS</h4>
            <div className="parts-options-grid">
              {TELEMETRY_OPTIONS.map((telem) => {
                const isSelected = config.telemetry === telem.id;
                return (
                  <div
                    key={telem.id}
                    className={`part-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ telemetry: telem.id as VehicleConfigState['telemetry'] })}
                  >
                    <div className="part-card-header">
                      <span className="part-name font-mono">{telem.name}</span>
                      {isSelected && <Check size={16} className="text-amber" />}
                    </div>
                    <p className="part-desc">{telem.shortDesc}</p>
                    <div className="part-stats-pill font-mono">
                      <span>RADAR PROFILE: {telem.stealthDb} dB</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LIVERY & COAT TAB */}
        {activeCategory === 'livery' && (
          <div className="tuning-subpanel">
            <h4 className="subpanel-title font-mono">CHASSIS LIVERY & CAMOUFLAGE</h4>
            <div className="livery-options-grid">
              {LIVERY_OPTIONS.map((liv) => {
                const isSelected = config.livery === liv.id;
                return (
                  <div
                    key={liv.id}
                    className={`livery-swatch-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleUpdate({ livery: liv.id as VehicleConfigState['livery'] })}
                  >
                    <div className="swatch-color-circle" style={{ backgroundColor: liv.hex }}>
                      {isSelected && <Check size={16} className="swatch-check" />}
                    </div>
                    <div className="swatch-info">
                      <span className="swatch-name font-mono">{liv.name}</span>
                      <p className="swatch-desc">{liv.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
