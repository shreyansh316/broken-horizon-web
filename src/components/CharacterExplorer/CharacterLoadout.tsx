import React, { useState } from 'react';
import { Shield, Wrench, Radio, Camera, Cpu, Eye, CheckCircle2 } from 'lucide-react';
import type { CharacterGearItem } from '../../data/characterData';

interface CharacterLoadoutProps {
  gearItems: CharacterGearItem[];
  characterName: string;
}

export const CharacterLoadout: React.FC<CharacterLoadoutProps> = ({
  gearItems,
  characterName,
}) => {
  const [selectedGear, setSelectedGear] = useState<CharacterGearItem>(gearItems[0]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return <Cpu size={16} />;
      case 'mechanical':
        return <Wrench size={16} />;
      case 'surveillance':
        return <Camera size={16} />;
      case 'signals intel':
        return <Radio size={16} />;
      case 'reconnaissance':
        return <Eye size={16} />;
      default:
        return <Shield size={16} />;
    }
  };

  return (
    <div className="char-loadout-container" role="region" aria-label={`${characterName} Tactical Loadout`}>
      <div className="loadout-header">
        <span className="loadout-tag">FIELD LOADOUT & EQUIPMENT</span>
        <h3 className="loadout-title">TACTICAL GEAR INSPECTION</h3>
        <p className="loadout-desc">
          Specialized hardware and improvised field modifications utilized by {characterName} during cross-territory operations.
        </p>
      </div>

      <div className="loadout-grid">
        {/* Gear Selection Column */}
        <div className="loadout-list-col" role="tablist" aria-label="Gear Items">
          {gearItems.map((item) => {
            const isSelected = selectedGear.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`loadout-item-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedGear(item)}
              >
                <div className="item-icon-box">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="item-meta-box">
                  <span className="item-cat-label">{item.category.toUpperCase()}</span>
                  <h4 className="item-name">{item.name}</h4>
                </div>
                {isSelected && <CheckCircle2 size={16} className="item-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Selected Gear Inspection Panel */}
        <div className="loadout-inspection-col">
          <div className="inspection-card">
            <div className="inspection-badge">
              <span className="inspection-tag">{selectedGear.category.toUpperCase()} // CLASSIFIED TECH</span>
            </div>

            <h3 className="inspection-item-name">{selectedGear.name}</h3>
            <p className="inspection-item-desc">{selectedGear.description}</p>

            {selectedGear.stats && selectedGear.stats.length > 0 && (
              <div className="inspection-stats-box">
                <h4 className="stats-heading">OPERATIONAL METRICS</h4>
                <div className="stats-grid">
                  {selectedGear.stats.map((st) => (
                    <div key={st.label} className="stat-unit">
                      <span className="stat-label">{st.label}</span>
                      <span className="stat-value">{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
