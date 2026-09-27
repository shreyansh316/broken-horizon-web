import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import {
  TRANSPORT_VEHICLES,
  VEHICLE_CATEGORIES,
  FICTIONAL_MANUFACTURERS,
} from '../../data/transportDivisionData';
import type { TransportVehicle } from '../../data/transportDivisionData';
import './TransportDivision.css';

interface TransportDivisionProps {
  onBackToHome: () => void;
  onNavigateToWorld?: () => void;
}

export const TransportDivision: React.FC<TransportDivisionProps> = ({
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal State
  const [selectedVehicle, setSelectedVehicle] = useState<TransportVehicle | null>(null);

  // Comparison State (up to 3 vehicles)
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return TRANSPORT_VEHICLES.filter((v) => {
      // Category filter
      if (selectedCategory !== 'all' && v.categoryId !== selectedCategory) {
        return false;
      }
      // Manufacturer filter
      if (selectedManufacturer !== 'all' && v.manufacturer !== selectedManufacturer) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && v.status !== selectedStatus) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesMfg = v.manufacturer.toLowerCase().includes(q);
        const matchesCat = v.category.toLowerCase().includes(q);
        const matchesRole = v.role.toLowerCase().includes(q);
        const matchesEnv = v.environment.toLowerCase().includes(q);
        const matchesDesc = v.description.toLowerCase().includes(q);
        if (!matchesName && !matchesMfg && !matchesCat && !matchesRole && !matchesEnv && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedManufacturer, selectedStatus, searchQuery]);

  // Comparison toggle
  const toggleComparison = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparisonIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id]; // keep max 3
      }
      return [...prev, id];
    });
  };

  const comparedVehicles = useMemo(() => {
    return comparisonIds.map((id) => TRANSPORT_VEHICLES.find((v) => v.id === id)).filter(Boolean) as TransportVehicle[];
  }, [comparisonIds]);

  // Keyboard controls for modal and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVehicle(null);
        setIsComparisonOpen(false);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredVehicles.length : null));
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredVehicles.length) % filteredVehicles.length : null));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredVehicles.length]);

  return (
    <div className="transport-division-root" id="transport-division">
      {/* 1. Header Navigation Bar */}
      <header className="td-header">
        <div className="td-header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="td-back-btn"
              onClick={onBackToHome}
              aria-label="Return to Main Headquarters"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO HQ</span>
            </button>

            <div className="td-header-badge">
              <span className="td-pulse-dot" />
              <span className="td-header-title">TRANSPORT DIVISION</span>
              <span className="td-header-pill">BROKEN HORIZON FLEET ECOSYSTEM</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#9ca3af' }}>
              FLEET ARCHIVE: <strong style={{ color: '#fb923c' }}>60 VEHICLES</strong>
            </span>
          </div>
        </div>
      </header>

      {/* 2. Transport Division Hero */}
      <section className="td-hero-stage">
        <div className="td-hero-bg-layer">
          <img
            src="/assets/images/transport/hero-transport-division.jpg"
            alt="Broken Horizon Transport Division — Rajasthan highway mobility"
            className="td-hero-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/images/hero/hero-desert-road.jpg';
            }}
          />
          <div className="td-hero-vignette" />
        </div>

        <div className="td-hero-content">
          <div className="td-hero-kicker">
            <Sparkles size={14} />
            <span>BROKEN HORIZON TRANSPORT SYSTEMS // INTERNAL CATALOG</span>
          </div>

          <h1 className="td-hero-title">
            TRANSPORT<br />BUILT FOR THE HORIZON
          </h1>

          <p className="td-hero-subtitle">
            BUILT FOR INDIA. BUILT FOR THE HORIZON.
          </p>

          <p className="td-hero-desc">
            A fictional Indian transport ecosystem designed around the roads, industries, cities, deserts, and everyday commercial transit culture of Broken Horizon. Featuring original vehicle architectures across 7 fictional Indian manufacturers and 12 specialized transport divisions.
          </p>

          <div className="td-hero-telemetry-strip">
            <div className="td-telemetry-item">
              <span className="td-telemetry-num">60</span>
              <span style={{ color: '#9ca3af' }}>ORIGINAL DESIGNS</span>
            </div>
            <div className="td-telemetry-item">
              <span className="td-telemetry-num">12</span>
              <span style={{ color: '#9ca3af' }}>TRANSPORT DIVISIONS</span>
            </div>
            <div className="td-telemetry-item">
              <span className="td-telemetry-num">07</span>
              <span style={{ color: '#9ca3af' }}>FICTIONAL MAKERS</span>
            </div>
            <div className="td-telemetry-item">
              <span className="td-telemetry-num">13</span>
              <span style={{ color: '#9ca3af' }}>RAJASTHAN DISTRICTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Makers: Fictional Manufacturers Showcase */}
      <section className="td-makers-section">
        <div className="td-section-lead">
          <span className="td-section-eyebrow">// THE MAKERS</span>
          <h2 className="td-section-headline">FICTIONAL MOBILITY CONGLOMERATES</h2>
          <p className="td-section-subcopy">
            Every vehicle in Broken Horizon is built by in-universe Indian automotive and heavy transport manufacturers. Click any company below to inspect their production lineup.
          </p>
        </div>

        <div className="td-makers-grid">
          {FICTIONAL_MANUFACTURERS.map((mfg) => (
            <div
              key={mfg.id}
              className="td-maker-card"
              onClick={() => setSelectedManufacturer(mfg.name)}
              role="button"
              tabIndex={0}
              aria-label={`Filter by ${mfg.name}`}
            >
              <div>
                <div className="td-maker-badge" style={{ color: mfg.accentColor }}>
                  {mfg.logoBadge}
                </div>
                <h3 className="td-maker-name">{mfg.name}</h3>
                <div className="td-maker-focus">{mfg.focus}</div>
                <p className="td-maker-desc">{mfg.description}</p>
              </div>
              <div className="td-maker-origin">
                <span>HEADQUARTERS:</span> <strong>{mfg.origin}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Controls, Search & Category Tabs */}
      <section className="td-controls-bar">
        <div className="td-controls-container">
          {/* Search + Dropdowns */}
          <div className="td-search-row">
            <div className="td-search-input-wrap">
              <Search size={15} className="td-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, brand, category, role, or environment (e.g. Aravalli, desert, SUV, police)..."
                className="td-search-input"
              />
            </div>

            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="td-select"
            >
              <option value="all">ALL 7 MANUFACTURERS</option>
              {FICTIONAL_MANUFACTURERS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="td-select"
            >
              <option value="all">ALL STATUSES</option>
              <option value="IMPLEMENTED">IMPLEMENTED IN PROLOGUE</option>
              <option value="ACTIVE DEVELOPMENT">ACTIVE DEVELOPMENT</option>
              <option value="WORLD CONCEPT">WORLD CONCEPT</option>
              <option value="FUTURE">FUTURE RELEASES</option>
            </select>
          </div>

          {/* Sticky Category Tabs */}
          <div className="td-category-tabs-scroll" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              className={`td-category-tab ${selectedCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              ALL CATEGORIES (60)
            </button>
            {VEHICLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`td-category-tab ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.code} // {cat.name} (5)</span>
                {cat.isWorldConcept && <span style={{ marginLeft: '4px', opacity: 0.75 }}>[CONCEPT]</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Main Catalog Grid */}
      <main className="td-catalog-stage">
        <div className="td-results-header">
          <div>
            SHOWING <strong style={{ color: '#fb923c' }}>{filteredVehicles.length}</strong> OF 60 REGISTERED VEHICLES
          </div>
          <div>
            CLICK CARD TO VIEW SPECIFICATIONS • SELECT UP TO 3 TO COMPARE
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6b7280', fontFamily: 'JetBrains Mono' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#9ca3af' }}>No vehicles match the active filter criteria.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedManufacturer('all'); setSelectedStatus('all'); setSearchQuery(''); }}
              style={{ background: '#ea580c', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 800 }}
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="td-vehicle-grid">
            {filteredVehicles.map((vehicle) => {
              const isCompared = comparisonIds.includes(vehicle.id);
              let statusClass = 'status-implemented';
              if (vehicle.status === 'ACTIVE DEVELOPMENT') statusClass = 'status-active-development';
              else if (vehicle.status === 'WORLD CONCEPT') statusClass = 'status-world-concept';
              else if (vehicle.status === 'FUTURE') statusClass = 'status-future';

              return (
                <article
                  key={vehicle.id}
                  className="td-vehicle-card"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  {/* Viewport */}
                  <div className="td-card-viewport">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.manufacturer} ${vehicle.name}`}
                      className="td-card-img"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/images/hero/hero-desert-road.jpg';
                      }}
                    />

                    <div className="td-card-top-badges">
                      <span className="td-card-mfg-badge">{vehicle.manufacturer}</span>
                      <span className={`td-status-pill ${statusClass}`}>{vehicle.status}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="td-card-body">
                    <div>
                      <div className="td-card-cat-label">{vehicle.category}</div>
                      <h3 className="td-card-model-name">{vehicle.name}</h3>
                      <p className="td-card-desc">{vehicle.description}</p>

                      <div className="td-card-meta-box">
                        <div className="td-card-meta-row">
                          <span>ROLE:</span>
                          <strong>{vehicle.role}</strong>
                        </div>
                        <div className="td-card-meta-row">
                          <span>ENVIRONMENT:</span>
                          <strong>{vehicle.environment}</strong>
                        </div>
                        <div className="td-card-meta-row">
                          <span>TOP SPEED:</span>
                          <strong style={{ color: '#fb923c' }}>{vehicle.conceptSpecs.topSpeed}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="td-card-footer">
                      <button
                        type="button"
                        className="td-view-btn"
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <Eye size={12} />
                        <span>VIEW DETAILS</span>
                      </button>

                      <button
                        type="button"
                        className={`td-compare-btn ${isCompared ? 'is-selected' : ''}`}
                        onClick={(e) => toggleComparison(vehicle.id, e)}
                        title="Compare with other vehicles"
                      >
                        {isCompared ? '✓ COMPARING' : '+ COMPARE'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* 6. Visual Archive Gallery */}
      <section style={{ background: '#080a0f', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div className="td-section-lead">
            <span className="td-section-eyebrow">// TRANSPORT VISUAL ARCHIVE</span>
            <h2 className="td-section-headline">IN-ENGINE CAPTURES & FIELD LOGS</h2>
            <p className="td-section-subcopy">
              Explore in-engine captures of Broken Horizon vehicles across Rajasthan’s urban markets, desert highways, railway yards, and mountain switchbacks. Click any image to launch the high-resolution lightbox.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {filteredVehicles.slice(0, 16).map((v, i) => (
              <div
                key={v.id}
                onClick={() => setLightboxIndex(i)}
                style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#000'
                }}
              >
                <img
                  src={v.image}
                  alt={v.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', bottom: 0, insetInline: 0, padding: '0.4rem 0.6rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', fontFamily: 'JetBrains Mono', fontSize: '0.65rem' }}>
                  <div style={{ color: '#fff', fontWeight: 700 }}>{v.name}</div>
                  <div style={{ color: '#fb923c', fontSize: '0.58rem' }}>{v.manufacturer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="td-modal-overlay" onClick={() => setSelectedVehicle(null)}>
          <div className="td-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="td-modal-header">
              <div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: '#ea580c' }}>
                  {selectedVehicle.category} // {selectedVehicle.manufacturer}
                </span>
                <h2 className="td-modal-title">{selectedVehicle.name}</h2>
              </div>
              <button
                type="button"
                className="td-modal-close-btn"
                onClick={() => setSelectedVehicle(null)}
              >
                ESC / CLOSE ✕
              </button>
            </div>

            <div className="td-modal-content">
              <div>
                <div className="td-modal-img-wrap">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="td-modal-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/images/hero/hero-desert-road.jpg';
                    }}
                  />
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}>
                  <span style={{ color: '#9ca3af' }}>FLEET STATUS:</span>
                  <span className={`td-status-pill status-${selectedVehicle.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {selectedVehicle.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.68rem', color: '#fb923c', marginBottom: '0.2rem' }}>
                    GAMEPLAY ROLE & OPERATIONAL ENVELOPE
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>
                    {selectedVehicle.description}
                  </p>
                </div>

                <div className="td-spec-warning">
                  ⚠️ CONCEPT SPECIFICATION // IN-ENGINE PROTOTYPE TARGETS
                </div>

                <table className="td-specs-table">
                  <tbody>
                    <tr>
                      <td>MANUFACTURER</td>
                      <td>{selectedVehicle.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>TRANSPORT CLASS</td>
                      <td>{selectedVehicle.conceptSpecs.transportClass}</td>
                    </tr>
                    <tr>
                      <td>TOP SPEED</td>
                      <td style={{ color: '#fb923c' }}>{selectedVehicle.conceptSpecs.topSpeed}</td>
                    </tr>
                    <tr>
                      <td>CAPACITY</td>
                      <td>{selectedVehicle.conceptSpecs.capacity}</td>
                    </tr>
                    <tr>
                      <td>DRIVE TYPE</td>
                      <td>{selectedVehicle.conceptSpecs.driveType}</td>
                    </tr>
                    <tr>
                      <td>FUEL / POWER</td>
                      <td>{selectedVehicle.conceptSpecs.fuelType}</td>
                    </tr>
                    {selectedVehicle.conceptSpecs.engineOutput && (
                      <tr>
                        <td>ENGINE OUTPUT</td>
                        <td>{selectedVehicle.conceptSpecs.engineOutput}</td>
                      </tr>
                    )}
                    {selectedVehicle.conceptSpecs.suspensionType && (
                      <tr>
                        <td>SUSPENSION</td>
                        <td>{selectedVehicle.conceptSpecs.suspensionType}</td>
                      </tr>
                    )}
                    <tr>
                      <td>PRIMARY SECTOR</td>
                      <td>{selectedVehicle.environment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Comparison Floating Dock & Drawer */}
      {comparisonIds.length > 0 && (
        <div className="td-comparator-dock">
          <div className="td-comparator-container">
            <div className="td-comp-pills">
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#ea580c', fontWeight: 800 }}>
                COMPARE ({comparisonIds.length}/3):
              </span>
              {comparedVehicles.map((v) => (
                <div key={v.id} className="td-comp-pill">
                  <span>{v.name}</span>
                  <button
                    type="button"
                    className="td-comp-pill-remove"
                    onClick={(e) => toggleComparison(v.id, e)}
                    title="Remove from comparison"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="td-comp-actions">
              <button
                type="button"
                className="td-btn-compare-open"
                onClick={() => setIsComparisonOpen(true)}
              >
                COMPARE SPECS SIDE-BY-SIDE →
              </button>
              <button
                type="button"
                className="td-btn-compare-clear"
                onClick={() => setComparisonIds([])}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal Table */}
      {isComparisonOpen && comparedVehicles.length > 0 && (
        <div className="td-modal-overlay" onClick={() => setIsComparisonOpen(false)}>
          <div className="td-modal-window" style={{ maxWidth: '1100px' }} onClick={(e) => e.stopPropagation()}>
            <div className="td-modal-header">
              <h2 className="td-modal-title">HEAD-TO-HEAD SPEC COMPARISON</h2>
              <button
                type="button"
                className="td-modal-close-btn"
                onClick={() => setIsComparisonOpen(false)}
              >
                ESC / CLOSE ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
              <div className="td-spec-warning" style={{ marginBottom: '1.25rem' }}>
                ⚠️ CONCEPT SPECIFICATION // VEHICLE SPECIFICATIONS COMPARISON
              </div>

              <table style={{ width: '100%', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem', color: '#9ca3af', width: '22%' }}>PARAMETER</th>
                    {comparedVehicles.map((v) => (
                      <th key={v.id} style={{ padding: '0.75rem', color: '#fb923c', width: `${78 / comparedVehicles.length}%` }}>
                        <div style={{ fontSize: '1rem', color: '#fff', textTransform: 'uppercase' }}>{v.name}</div>
                        <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>{v.manufacturer}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>CATEGORY</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#fff' }}>{v.category}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>STATUS</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem' }}>{v.status}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>TOP SPEED</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#fb923c', fontWeight: 800 }}>{v.conceptSpecs.topSpeed}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>CAPACITY</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#fff' }}>{v.conceptSpecs.capacity}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>DRIVE TYPE</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#fff' }}>{v.conceptSpecs.driveType}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>FUEL / POWER</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#fff' }}>{v.conceptSpecs.fuelType}</td>)}
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.65rem', color: '#6b7280' }}>ENVIRONMENT</td>
                    {comparedVehicles.map((v) => <td key={v.id} style={{ padding: '0.65rem', color: '#d1d5db' }}>{v.environment}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 9. Lightbox Modal */}
      {lightboxIndex !== null && filteredVehicles[lightboxIndex] && (
        <div className="td-lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <div className="td-lightbox-header" onClick={(e) => e.stopPropagation()}>
            <div>
              <span>{filteredVehicles[lightboxIndex].manufacturer} // {filteredVehicles[lightboxIndex].name}</span>
              <span style={{ marginLeft: '1rem', color: '#9ca3af' }}>[{lightboxIndex + 1} of {filteredVehicles.length}]</span>
            </div>
            <button
              type="button"
              className="td-modal-close-btn"
              onClick={() => setLightboxIndex(null)}
            >
              ESC / CLOSE ✕
            </button>
          </div>

          <div className="td-lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="td-lightbox-nav-btn prev"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredVehicles.length) % filteredVehicles.length)}
              title="Previous Image (Left Arrow)"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={filteredVehicles[lightboxIndex].image}
              alt={filteredVehicles[lightboxIndex].name}
              className="td-lightbox-img"
            />

            <button
              type="button"
              className="td-lightbox-nav-btn next"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredVehicles.length)}
              title="Next Image (Right Arrow)"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="td-lightbox-caption" onClick={(e) => e.stopPropagation()}>
            <strong style={{ color: '#fff' }}>{filteredVehicles[lightboxIndex].name}</strong> — {filteredVehicles[lightboxIndex].description} ({filteredVehicles[lightboxIndex].environment})
          </div>
        </div>
      )}

      {/* 10. Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: '#040508', padding: '2.5rem 1.5rem', textAlign: 'center', fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: '#6b7280' }}>
        <div>BROKEN HORIZON TRANSPORT DIVISION // INTERNAL MOBILITY SYSTEMS</div>
        <div style={{ marginTop: '0.35rem', fontSize: '0.65rem' }}>
          All vehicle names, manufacturers, and designs are entirely fictional works created for the Broken Horizon video game universe.
        </div>
      </footer>
    </div>
  );
};
