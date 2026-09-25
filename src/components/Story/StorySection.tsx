import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Newspaper, ShieldAlert, ArrowRight } from 'lucide-react';

interface StorySectionProps {
  onNavigateToStory?: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onNavigateToStory }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [selectedPin, setSelectedPin] = useState<number>(0);
  const [showPressModal, setShowPressModal] = useState(false);

  const evidencePins = [
    {
      id: 'pin-1',
      title: 'HIJACKED FREIGHT MANIFEST // JAIPUR',
      location: 'Mehta Garage, Bypass Sector 01',
      snippet: 'A locked freight container arrived at Arjun’s shop bearing forged state permits and high-density optical fiber hardware labeled [REDACTED].',
      detail: 'Arjun discovered the shipment was routed directly to an unmapped coordinates array in the Sambhar Salt Flats.',
    },
    {
      id: 'pin-2',
      title: 'OPTICAL TELEMETRY BUNKERS // SAMBHAR',
      location: 'Sub-Basement Level -3, Salt Depression',
      snippet: 'Underground fiber repeaters transmitting high-frequency surveillance packets monitoring every civilian and commercial vehicle on NH-48.',
      detail: 'Installed under government solar subsidies, the network operates entirely off the civilian power grid.',
    },
    {
      id: 'pin-3',
      title: 'SUBTERRANEAN ANOMALY // DAUSA STEPWELL',
      location: 'Ancient Baori Excavation, Sector 02',
      snippet: 'Centuries-old stone water stepwells repurposed as pressurized subterranean staging vaults for Syndicate armored convoys.',
      detail: 'Kavya retrieved photographic evidence of seismic excavators boring beneath heritage temple foundations.',
    },
    {
      id: 'pin-4',
      title: 'STATE TRANSIT PRIVATIZATION // KOTA',
      location: 'Chambal Sluice Logistics HQ',
      snippet: 'State transport ministers signed unilateral concessions transferring all toll plaza law enforcement to Horizon Corridor contractors.',
      detail: 'Enables private security forces to confiscate cargo and detain citizens without judicial oversight.',
    },
  ];

  return (
    <section className="section-wrapper story-dark-section" id="story" aria-label="Conspiracy Investigation Board">
      <div className="container">
        {/* Section Header */}
        <div ref={ref} className={`editorial-header reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <span className="editorial-tag">CONFIDENTIAL INVESTIGATION</span>
          <h2 className="editorial-title">THE CONSPIRACY</h2>
          <p className="editorial-subtitle">
            Hover over redacted intelligence reports and explore the interactive corkboard connecting corporate land seizures, subterranean anomalies, and state transit corruption.
          </p>
        </div>

        {/* Embedded Interactive Conspiracy Investigation Board */}
        <div className="investigation-corkboard-stage">
          {/* Top Corkboard Controls */}
          <div className="corkboard-header-bar">
            <div className="corkboard-title-group">
              <span className="case-file-tag">CASE FILE // BH-CORRIDOR-04</span>
              <h3 className="corkboard-heading">HORIZON TRANSIT PRIVATIZATION BOARD</h3>
            </div>

            <button
              type="button"
              className="press-clipping-btn"
              onClick={() => setShowPressModal(true)}
              aria-label="View in-universe newspaper article"
            >
              <Newspaper size={15} />
              <span>READ KAVYA&apos;S PRESS DISPATCH</span>
            </button>
          </div>

          {/* Interactive Red-String Corkboard Canvas Grid */}
          <div className="corkboard-canvas">
            {/* SVG Red Connection Strings */}
            <svg className="corkboard-strings-svg" aria-hidden="true">
              <line x1="20%" y1="35%" x2="50%" y2="65%" stroke="rgba(239, 68, 68, 0.65)" strokeWidth="2" strokeDasharray="5 3" />
              <line x1="50%" y1="65%" x2="80%" y2="35%" stroke="rgba(239, 68, 68, 0.65)" strokeWidth="2" strokeDasharray="5 3" />
              <line x1="50%" y1="65%" x2="50%" y2="15%" stroke="rgba(239, 68, 68, 0.8)" strokeWidth="2" />
            </svg>

            {/* Evidence Pin Cards */}
            <div className="corkboard-pins-grid">
              {evidencePins.map((pin, idx) => {
                const isSelected = selectedPin === idx;
                return (
                  <div
                    key={pin.id}
                    className={`evidence-pin-card ${isSelected ? 'pin-is-selected' : ''}`}
                    onClick={() => setSelectedPin(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select evidence pin: ${pin.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPin(idx);
                      }
                    }}
                  >
                    <div className="pin-push-head" aria-hidden="true" />
                    <span className="pin-location-lbl">{pin.location}</span>
                    <h4 className="pin-title">{pin.title}</h4>
                    <p className="pin-snippet">{pin.snippet}</p>

                    <div className="pin-hover-unredact">
                      <span className="unredact-label">HOVER TO DECRYPT // INTEL NOTE:</span>
                      <p className="unredact-body">{pin.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Selected Evidence Telemetry Footer */}
          <div className="corkboard-telemetry-footer">
            <div className="telemetry-pin-info">
              <ShieldAlert size={16} className="text-amber" />
              <span className="font-mono text-sm">
                ACTIVE EVIDENCE FILE: <strong>{evidencePins[selectedPin].title}</strong> ({evidencePins[selectedPin].location})
              </span>
            </div>

            {onNavigateToStory && (
              <button
                type="button"
                className="btn btn-primary corkboard-launch-btn"
                onClick={onNavigateToStory}
                aria-label="Open full investigation board and case files"
              >
                <span>OPEN FULL INVESTIGATION BOARD</span>
                <ArrowRight size={14} className="btn-arrow" />
              </button>
            )}
          </div>
        </div>

        {/* In-Universe Newspaper Clipping Modal */}
        {showPressModal && (
          <div className="press-modal-overlay" role="dialog" aria-modal="true" aria-label="In-Universe Press Article">
            <div className="press-modal-container">
              <div className="press-modal-header">
                <span className="newspaper-masthead">THE RAJASTHAN CHRONICLE</span>
                <span className="newspaper-date">SPECIAL INVESTIGATIVE DISPATCH // OCTOBER 2026</span>
                <button
                  type="button"
                  className="press-close-btn"
                  onClick={() => setShowPressModal(false)}
                  aria-label="Close article"
                >
                  ✕
                </button>
              </div>

              <div className="press-modal-body">
                <h3 className="newspaper-headline">
                  THE SILENT PRIVATIZATION OF STATE HIGHWAY 48: WHO OWNS THE NIGHT RUN?
                </h3>
                <span className="newspaper-byline">By Kavya Rathore, Senior Investigative Correspondent</span>

                <p className="newspaper-lead">
                  JAIPUR — Under the auspices of industrial modern infrastructure and automated toll collection, private contractors affiliated with Horizon Logistics Corp have assumed operational control over critical transport arteries connecting Jaipur, Sambhar, and Kota.
                </p>

                <p className="newspaper-body-p">
                  Eyewitnesses report unmarked armored convoys traversing the Sambhar salt flats under military-grade jamming protocols after 02:00 IST. When questioned, state transit authorities cited confidential security exemptions. But internal freight manifests leaked from local maintenance yards show massive subterranean excavations underway beneath historic stepwells...
                </p>
              </div>

              <div className="press-modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPressModal(false)}
                >
                  DISMISS PRESS CLIPPING
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
