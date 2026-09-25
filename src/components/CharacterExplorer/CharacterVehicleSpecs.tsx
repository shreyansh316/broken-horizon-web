import React from 'react';
import { Gauge, ShieldAlert, Zap, Wrench, Navigation, Fuel } from 'lucide-react';
import type { CharacterVehicleData } from '../../data/characterData';

interface CharacterVehicleSpecsProps {
  vehicle: CharacterVehicleData;
  driverName: string;
}

export const CharacterVehicleSpecs: React.FC<CharacterVehicleSpecsProps> = ({
  vehicle,
  driverName,
}) => {
  return (
    <div className="char-vehicle-container" role="region" aria-label={`${driverName} Vehicle Telemetry`}>
      <div className="vehicle-header">
        <span className="vehicle-tag">OPERATIONAL MOBILITY & VEHICLE TELEMETRY</span>
        <h3 className="vehicle-model-title">{vehicle.modelName}</h3>
        <p className="vehicle-class-subtitle">{vehicle.classType} // ASSIGNED TO {driverName.toUpperCase()}</p>
      </div>

      {/* Telemetry Grid */}
      <div className="vehicle-metrics-row">
        <div className="metric-box">
          <div className="metric-top">
            <Zap size={14} className="metric-icon" />
            <span className="metric-lbl">OUTPUT</span>
          </div>
          <span className="metric-val">{vehicle.powerOutput}</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <Gauge size={14} className="metric-icon" />
            <span className="metric-lbl">TOP VELOCITY</span>
          </div>
          <span className="metric-val">{vehicle.topSpeed}</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <ShieldAlert size={14} className="metric-icon" />
            <span className="metric-lbl">ARMOR SPEC</span>
          </div>
          <span className="metric-val">{vehicle.armorClass}</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <Fuel size={14} className="metric-icon" />
            <span className="metric-lbl">DRIVETRAIN</span>
          </div>
          <span className="metric-val">{vehicle.drivetrain}</span>
        </div>
      </div>

      {/* Chassis and Modifications Specs */}
      <div className="vehicle-details-grid">
        <div className="chassis-box">
          <h4 className="detail-heading">
            <Navigation size={14} />
            <span>CHASSIS ARCHITECTURE</span>
          </h4>
          <p className="chassis-text">{vehicle.chassis}</p>
        </div>

        <div className="mods-box">
          <h4 className="detail-heading">
            <Wrench size={14} />
            <span>FIELD MODIFICATIONS & EVASION COUNTERMEASURES</span>
          </h4>
          <ul className="mods-list">
            {vehicle.modifications.map((mod) => (
              <li key={mod} className="mod-item">
                <span className="mod-bullet">▶</span>
                <span>{mod}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
