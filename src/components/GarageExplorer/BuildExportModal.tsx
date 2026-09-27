import React, { useState } from 'react';
import type { VehicleConfigState } from '../../data/garageData';
import { calculateVehicleTelemetry, LIVERY_OPTIONS } from '../../data/garageData';
import { X, Check, Copy, Download, ShieldCheck, Wrench } from 'lucide-react';

interface BuildExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: VehicleConfigState;
}

export const BuildExportModal: React.FC<BuildExportModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const stats = calculateVehicleTelemetry(config);
  const livery = LIVERY_OPTIONS.find((l) => l.id === config.livery) || LIVERY_OPTIONS[0];

  const handleCopy = () => {
    const text = `=== BROKEN HORIZON: MEHTA GARAGE VEHICLE SPECIFICATION ===
SETUP: ${config.presetName}
LIVERY: ${livery.name}
TIRES: ${config.tireType.toUpperCase()} @ ${config.tirePsi} PSI
SUSPENSION: ${config.suspension.toUpperCase()}
FRONT BUMPER: ${config.frontBumper.toUpperCase()}
ROOF CARGO: ${config.roofRack.toUpperCase()}
TELEMETRY: ${config.telemetry.toUpperCase()}
--------------------------------------------------
PERFORMANCE READOUT:
- TOP SPEED: ${stats.topSpeedKmh} KM/H
- 0-100 KM/H: ${stats.zeroToHundredSec}s
- SAND FLOTATION: ${stats.sandFlotationPct}%
- CHASSIS ARMOR: ${stats.armorRating}%
- FUEL RANGE: ${stats.fuelRangeKm} KM
- CURB WEIGHT: ${stats.curbWeightKg} KG
- POWER OUTPUT: ${stats.horsePower} HP / ${stats.torqueNm} NM
==================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-glass-container tuning-pass-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-trigger"
          onClick={onClose}
          aria-label="Close Tuning Pass"
        >
          <X size={20} />
        </button>

        {/* The Printable / Downloadable Pass Card */}
        <div className="tuning-pass-card">
          <div className="pass-watermark" aria-hidden="true">MEHTA 4X4</div>

          {/* Pass Header */}
          <div className="pass-card-header">
            <div className="pass-garage-brand">
              <Wrench size={22} className="text-amber" />
              <div>
                <span className="pass-sub-dept font-mono">RAJASTHAN STATE EXPEDITION CORPS</span>
                <h3 className="pass-title font-mono">MEHTA GARAGE TUNING SPECIFICATION</h3>
              </div>
            </div>
            <div className="pass-id-badge font-mono">
              <span className="id-tag">BUILD ID</span>
              <strong className="id-num">#BH-4X4-{Math.abs(stats.curbWeightKg + stats.topSpeedKmh)}</strong>
            </div>
          </div>

          {/* Operative Info */}
          <div className="pass-operative-row font-mono">
            <div>
              <span className="label">ASSIGNED OPERATIVE:</span>
              <strong>ARJUN MEHTA (JAIPUR BYPASS)</strong>
            </div>
            <div>
              <span className="label">TARGET SECTOR:</span>
              <strong>NH-62 THAR EXPEDITION</strong>
            </div>
            <div>
              <span className="label">CLEARANCE STATUS:</span>
              <span className="status-approved"><ShieldCheck size={14} /> VERIFIED FOR DESERT</span>
            </div>
          </div>

          {/* Module Spec Grid */}
          <div className="pass-specs-grid font-mono">
            <div className="spec-item">
              <span className="spec-k">LIVERY COAT</span>
              <span className="spec-v text-amber">{livery.name}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">TIRE ARCHETYPE</span>
              <span className="spec-v">{config.tireType.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">COLD TIRE PRESSURE</span>
              <span className="spec-v text-amber">{config.tirePsi} PSI</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">SUSPENSION LIFT</span>
              <span className="spec-v">{config.suspension.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">FRONT PROTECTION</span>
              <span className="spec-v">{config.frontBumper.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">ROOF EXPEDITION RIG</span>
              <span className="spec-v">{config.roofRack.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">TELEMETRY & JAMMER</span>
              <span className="spec-v text-amber">{config.telemetry.replace('-', ' ').toUpperCase()}</span>
            </div>
            <div className="spec-item">
              <span className="spec-k">ESTIMATED CURB WEIGHT</span>
              <span className="spec-v">{stats.curbWeightKg} KG</span>
            </div>
          </div>

          {/* Telemetry Highlights */}
          <div className="pass-telemetry-strip font-mono">
            <div className="telemetry-stat">
              <span className="stat-num text-amber">{stats.topSpeedKmh}</span>
              <span className="stat-unit">KM/H TOP SPEED</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-num text-amber">{stats.sandFlotationPct}%</span>
              <span className="stat-unit">SAND FLOTATION</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-num text-amber">{stats.fuelRangeKm}</span>
              <span className="stat-unit">KM FUEL RANGE</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-num text-amber">{stats.armorRating}%</span>
              <span className="stat-unit">CHASSIS ARMOR</span>
            </div>
          </div>

          {/* Barcode & Security Stencil */}
          <div className="pass-footer-barcode-row">
            <div className="barcode-graphic" aria-hidden="true" />
            <div className="auth-stamp font-mono">
              <span>MEHTA WORKSHOP JAIPUR // AUTHORIZED SIGNATURE</span>
              <strong>OPERATIVE 01: ARJUN MEHTA</strong>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pass-modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} className="text-amber" /> : <Copy size={16} />}
            <span>{copied ? 'SPEC COPIED TO CLIPBOARD' : 'COPY SPEC DATA'}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            <Download size={16} />
            <span>PRINT / SAVE TUNING PASS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
