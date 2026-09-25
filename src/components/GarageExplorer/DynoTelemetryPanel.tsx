import React, { useState, useEffect } from 'react';
import type { VehicleConfigState } from '../../data/garageData';
import { calculateVehicleTelemetry } from '../../data/garageData';
import { engineSound } from '../../utils/engineSoundEngine';
import { Power, Flame, Gauge, Shield, Fuel, EyeOff, Radio } from 'lucide-react';

interface DynoTelemetryPanelProps {
  config: VehicleConfigState;
  onOpenExportModal: () => void;
}

export const DynoTelemetryPanel: React.FC<DynoTelemetryPanelProps> = ({
  config,
  onOpenExportModal,
}) => {
  const [isIgnitionOn, setIsIgnitionOn] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(0);
  const [isRevving, setIsRevving] = useState(false);

  const stats = calculateVehicleTelemetry(config);

  // Sync with engine audio callback
  const handleToggleIgnition = () => {
    if (isIgnitionOn) {
      engineSound.stopEngine();
      setIsIgnitionOn(false);
      setCurrentRpm(0);
    } else {
      const started = engineSound.startIgnition((rpm) => {
        setCurrentRpm(rpm);
      });
      if (started) {
        setIsIgnitionOn(true);
      }
    }
  };

  const handleStartRev = () => {
    if (!isIgnitionOn) return;
    setIsRevving(true);
    engineSound.revTo(5600);
  };

  const handleEndRev = () => {
    if (!isIgnitionOn) return;
    setIsRevving(false);
    engineSound.releaseThrottle();
  };

  useEffect(() => {
    return () => {
      engineSound.stopEngine();
    };
  }, []);

  // Tachometer needle angle: 0 RPM = -120deg, 7000 RPM = +120deg
  const tachDegrees = -120 + (currentRpm / 7000) * 240;

  return (
    <div className="dyno-telemetry-panel">
      {/* Dyno Sound & Ignition Deck */}
      <div className="dyno-ignition-card">
        <div className="dyno-header-row">
          <div className="dyno-title-group">
            <span className="dyno-subtitle font-mono">DYNO HARNESS // SOUND LAB</span>
            <h4 className="dyno-title font-mono">4.0L TURBO DIESEL I6</h4>
          </div>
          <span className={`ignition-status-pill ${isIgnitionOn ? 'is-active' : ''} font-mono`}>
            {isIgnitionOn ? 'ENGINE RUNNING' : 'IGNITION OFF'}
          </span>
        </div>

        {/* Analog / Digital Tachometer Dial */}
        <div className="tachometer-instrument">
          <svg viewBox="0 0 200 120" className="tachometer-svg">
            {/* Background Arc */}
            <path
              d="M 30 110 A 80 80 0 0 1 170 110"
              fill="none"
              stroke="#222630"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Redline Arc */}
            <path
              d="M 148 55 A 80 80 0 0 1 170 110"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Active RPM Fill Arc */}
            <path
              d="M 30 110 A 80 80 0 0 1 170 110"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeDasharray="250"
              strokeDashoffset={250 - (Math.min(6500, currentRpm) / 7000) * 250}
              strokeLinecap="round"
            />
            {/* Center Pivot */}
            <circle cx="100" cy="110" r="10" fill="#0c0e12" stroke="#f59e0b" strokeWidth="2" />
            {/* Needle */}
            <g transform={`rotate(${tachDegrees} 100 110)`}>
              <line x1="100" y1="110" x2="100" y2="35" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>

          {/* RPM Digital Readout */}
          <div className="tachometer-digital-readout font-mono">
            <span className="rpm-digits">{currentRpm.toLocaleString()}</span>
            <span className="rpm-unit">RPM</span>
          </div>
        </div>

        {/* Dyno Controls */}
        <div className="dyno-buttons-row">
          <button
            type="button"
            className={`btn-ignition-toggle ${isIgnitionOn ? 'is-running' : ''}`}
            onClick={handleToggleIgnition}
          >
            <Power size={16} />
            <span>{isIgnitionOn ? 'KILL IGNITION' : 'COLD START IGNITION'}</span>
          </button>

          <button
            type="button"
            className={`btn-throttle-rev ${!isIgnitionOn ? 'is-disabled' : ''} ${isRevving ? 'is-pressing' : ''}`}
            onMouseDown={handleStartRev}
            onMouseUp={handleEndRev}
            onMouseLeave={handleEndRev}
            onTouchStart={handleStartRev}
            onTouchEnd={handleEndRev}
            disabled={!isIgnitionOn}
          >
            <Flame size={16} className="text-amber" />
            <span>HOLD TO REV THROTTLE</span>
          </button>
        </div>

        <p className="dyno-tip-note font-mono">
          {isIgnitionOn
            ? '⚡ Audio Active: Hold throttle to spool turbo and test blow-off valve acoustics.'
            : 'Click Cold Start Ignition to initialize procedural Web Audio exhaust rumble.'}
        </p>
      </div>

      {/* Real-time Telemetry Radar & Metrics Grid */}
      <div className="telemetry-metrics-deck">
        <h4 className="deck-title font-mono">VEHICLE TELEMETRY READOUT</h4>

        <div className="metrics-list-grid">
          {/* Top Speed */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <Gauge size={14} className="metric-icon" /> TOP SPEED
              </span>
              <span className="metric-val text-amber">{stats.topSpeedKmh} KM/H</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill" style={{ width: `${(stats.topSpeedKmh / 210) * 100}%` }} />
            </div>
          </div>

          {/* 0-100 Acceleration */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <Power size={14} className="metric-icon" /> 0-100 KM/H
              </span>
              <span className="metric-val text-amber">{stats.zeroToHundredSec}s</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill" style={{ width: `${Math.max(10, (11 - stats.zeroToHundredSec) * 20)}%` }} />
            </div>
          </div>

          {/* Sand Flotation */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <Flame size={14} className="metric-icon" /> SAND FLOTATION
              </span>
              <span className="metric-val text-amber">{stats.sandFlotationPct}%</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill fill-flotation" style={{ width: `${stats.sandFlotationPct}%` }} />
            </div>
          </div>

          {/* Armor Rating */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <Shield size={14} className="metric-icon" /> IMPACT ARMOR
              </span>
              <span className="metric-val text-amber">{stats.armorRating}%</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill fill-armor" style={{ width: `${stats.armorRating}%` }} />
            </div>
          </div>

          {/* Fuel Range */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <Fuel size={14} className="metric-icon" /> FUEL RANGE
              </span>
              <span className="metric-val text-amber">{stats.fuelRangeKm} KM</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill fill-fuel" style={{ width: `${(stats.fuelRangeKm / 900) * 100}%` }} />
            </div>
          </div>

          {/* Stealth Detectability */}
          <div className="metric-cell">
            <div className="metric-header font-mono">
              <span className="metric-label">
                <EyeOff size={14} className="metric-icon" /> RADAR PROFILE
              </span>
              <span className="metric-val text-amber">{stats.stealthDb} dB</span>
            </div>
            <div className="metric-bar-track">
              <div className="metric-bar-fill fill-stealth" style={{ width: `${Math.max(15, 100 - stats.stealthDb)}%` }} />
            </div>
          </div>
        </div>

        {/* Curb Weight & Engine Output Summary */}
        <div className="weights-power-summary font-mono">
          <div className="summary-pill">
            <span>CURB WEIGHT:</span>
            <strong>{stats.curbWeightKg.toLocaleString()} KG</strong>
          </div>
          <div className="summary-pill">
            <span>POWER:</span>
            <strong>{stats.horsePower} HP // {stats.torqueNm} NM</strong>
          </div>
        </div>

        {/* Build Export CTA */}
        <button
          type="button"
          className="btn-export-tuning-pass"
          onClick={onOpenExportModal}
        >
          <Radio size={16} />
          <span>GENERATE MEHTA TUNING PASS</span>
        </button>
      </div>
    </div>
  );
};
