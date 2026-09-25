import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal, Layers } from 'lucide-react';
import { worldArchitectureComparison } from '../../data/developmentData';

export const DevelopmentSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="dev-drawer-stage" id="development" aria-label="Development Roadmap">
      <div className="section-container">
        {/* Sleek Expandable Accordion Trigger */}
        <div className="dev-accordion-wrap">
          <button
            type="button"
            className={`dev-accordion-trigger ${isExpanded ? 'is-open' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            <div className="trigger-left-brand">
              <Layers size={18} className="text-amber" />
              <span className="trigger-title">VIEW DEVELOPMENT ROADMAP & PC SPECS</span>
              <span className="trigger-status-badge">PHASE 21 • SHOPS & ECONOMY</span>
            </div>
            <div className="trigger-chevron">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          {/* Drawer Content */}
          {isExpanded && (
            <div className="dev-drawer-content-box">
              {/* Target PC Specs */}
              <div className="specs-dual-card">
                <div className="specs-header-lead">
                  <Terminal size={18} className="text-amber" />
                  <h4>TARGET PC SPECIFICATIONS (PRE-ALPHA)</h4>
                </div>

                <div className="specs-tiers-grid">
                  <div className="spec-tier-panel">
                    <span className="tier-tag">MINIMUM TARGET (1080P • 30-45 FPS)</span>
                    <ul className="spec-list">
                      <li><strong>OS:</strong> Windows 10 (64-bit)</li>
                      <li><strong>CPU:</strong> Intel Core i5-8400 / AMD Ryzen 5 2600</li>
                      <li><strong>GPU:</strong> NVIDIA GeForce GTX 1060 (6GB) / AMD Radeon RX 580</li>
                      <li><strong>RAM:</strong> 16 GB DDR4</li>
                      <li><strong>STORAGE:</strong> 65 GB SSD Required</li>
                      <li><strong>API:</strong> DirectX 12</li>
                    </ul>
                  </div>

                  <div className="spec-tier-panel spec-rec">
                    <span className="tier-tag tier-rec-tag">RECOMMENDED (1440P / 4K • 60 FPS)</span>
                    <ul className="spec-list">
                      <li><strong>OS:</strong> Windows 11 (64-bit)</li>
                      <li><strong>CPU:</strong> Intel Core i7-12700K / AMD Ryzen 7 5800X3D</li>
                      <li><strong>GPU:</strong> NVIDIA GeForce RTX 3070 Ti (8GB) / AMD Radeon RX 6800 XT</li>
                      <li><strong>RAM:</strong> 32 GB DDR4/DDR5</li>
                      <li><strong>STORAGE:</strong> 65 GB NVMe M.2 SSD</li>
                      <li><strong>API:</strong> DirectX 12 Ultimate</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* World Expansion Framework Table */}
              <div className="matrix-table-wrap">
                <h4 className="matrix-heading">WORLD EXPANSION FRAMEWORK (13 DISTRICT LAUNCH TARGET TO 41 DISTRICT VISION)</h4>
                <div className="table-responsive">
                  <table className="dev-matrix-table">
                    <thead>
                      <tr>
                        <th>SYSTEM / SCOPE</th>
                        <th>LAUNCH TARGET (13 DISTRICTS)</th>
                        <th>EXPANSION ARCHITECTURE (41 DISTRICTS)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {worldArchitectureComparison.map((row) => (
                        <tr key={row.area}>
                          <td className="table-area-name">{row.area}</td>
                          <td className="table-current-spec">{row.current}</td>
                          <td className="table-future-spec">{row.future}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
