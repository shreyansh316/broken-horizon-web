import React, { useState } from 'react';
import type { VehicleConfigState } from '../../data/garageData';
import { TUNING_PRESETS } from '../../data/garageData';
import { VehicleCanvas } from './VehicleCanvas';
import { TuningControls } from './TuningControls';
import { DynoTelemetryPanel } from './DynoTelemetryPanel';
import { BuildExportModal } from './BuildExportModal';
import { ArrowLeft, Wrench, Shield, Compass } from 'lucide-react';

interface GarageExplorerProps {
  onBackToHome: () => void;
  onNavigateToWorld?: () => void;
}

export const GarageExplorer: React.FC<GarageExplorerProps> = ({
  onBackToHome,
  onNavigateToWorld,
}) => {
  const [config, setConfig] = useState<VehicleConfigState>(TUNING_PRESETS[0].config);
  const [activeCategory, setActiveCategory] = useState<string>('tires');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="garage-explorer-page" aria-label="Mehta Garage Vehicle Customizer">
      {/* Workshop Top Header */}
      <header className="garage-top-navbar">
        <div className="garage-nav-left">
          <button
            type="button"
            className="btn-garage-back"
            onClick={onBackToHome}
            aria-label="Return to Homepage"
          >
            <ArrowLeft size={16} />
            <span className="font-mono">RETURN TO ROADWAY</span>
          </button>

          <div className="garage-brand-block">
            <div className="brand-icon-wrap">
              <Wrench size={18} className="text-amber" />
            </div>
            <div>
              <span className="garage-sub-title font-mono">EXPEDITION OUTFITTING BAY // JAIPUR BYPASS</span>
              <h2 className="garage-main-title font-mono">MEHTA GARAGE TUNING LAB</h2>
            </div>
          </div>
        </div>

        <div className="garage-nav-right">
          <div className="operative-badge font-mono">
            <Shield size={14} className="text-amber" />
            <span>OPERATIVE: ARJUN MEHTA</span>
          </div>

          {onNavigateToWorld && (
            <button
              type="button"
              className="btn-garage-map font-mono"
              onClick={onNavigateToWorld}
            >
              <Compass size={15} />
              <span>TEST ON RAJASTHAN MAP</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Workshop Grid */}
      <main className="garage-workbench-layout">
        {/* Top / Center: Interactive 2.5D Vehicle Canvas */}
        <section className="workbench-stage-area">
          <VehicleCanvas
            config={config}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
          />
        </section>

        {/* Lower Workbench Split: Tuning Controls & Dyno Telemetry */}
        <section className="workbench-control-grid">
          <div className="control-col-tuning">
            <TuningControls
              config={config}
              onChangeConfig={(newCfg) => setConfig(newCfg)}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          </div>

          <div className="control-col-dyno">
            <DynoTelemetryPanel
              config={config}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          </div>
        </section>
      </main>

      {/* Build Specification Export Modal */}
      <BuildExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        config={config}
      />
    </div>
  );
};
