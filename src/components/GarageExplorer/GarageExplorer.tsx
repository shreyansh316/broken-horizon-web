import React, { useState, useMemo, useEffect } from 'react';
import './GarageExplorer.css';
import { ROCKSTAR_VEHICLES, type RockstarVehicle } from '../../data/rockstarVehicles';

interface GarageExplorerProps {
  onBackToHome: () => void;
  onNavigateToWorld?: () => void;
}

const CATEGORIES = [
  { id: "ALL", label: "ALL ASSETS (92)" },
  { id: "CARS: LOW / ECONOMY", label: "CARS: LOW / ECONOMY (12)" },
  { id: "CARS: MEDIUM / SEDAN & SUV", label: "CARS: MEDIUM / SUV (12)" },
  { id: "CARS: LUXURY & ARMORED 4X4", label: "CARS: LUXURY & 4X4 (10)" },
  { id: "BIKES & SCOOTERS", label: "BIKES & SCOOTERS (14)" },
  { id: "AUTO & LOCAL TRANSIT", label: "AUTO & 3-WHEELERS (6)" },
  { id: "TRUCKS & HEAVY FREIGHT", label: "TRUCKS & HEAVY (12)" },
  { id: "BUSES & COACHES", label: "BUSES & COACHES (6)" },
  { id: "POLICE & EMERGENCY", label: "POLICE & EMERGENCY (6)" },
  { id: "TRAINS & RAIL", label: "TRAINS & RAIL (5)" },
  { id: "METRO TRANSIT", label: "METRO TRANSIT (3)" },
  { id: "AIRPLANES & HELICOPTERS", label: "AVIATION (3)" },
  { id: "WATER & ROPEWAY", label: "WATER & ROPEWAY (3)" }
];

const ShowroomSVG = ({ vehicle, customColor }: { vehicle: RockstarVehicle, customColor?: string | null }) => {
  const accent = customColor || (vehicle.operative === "ARJUN SPEC" ? "#ea580c" : vehicle.operative === "KAVYA SPEC" ? "#3b82f6" : "#f59e0b");
  
  let silhouette = null;
  const vShape = vehicle.shape;
  
  if (vShape === "car-suv" || vShape === "police") {
    silhouette = (
      <>
        <path d="M55 112 L72 72 L175 72 L202 92 L248 96 L252 122 L48 122 Z" fill="#161b26" stroke={accent} strokeWidth="2.2"/>
        <rect x="82" y="77" width="42" height="18" fill="#0b0f17" stroke={accent} strokeWidth="1"/>
        <rect x="130" y="77" width="40" height="18" fill="#0b0f17" stroke={accent} strokeWidth="1"/>
        {vShape === "police" ? (
          <><rect x="115" y="64" width="26" height="6" rx="2" fill="#ef4444"/><rect x="128" y="64" width="13" height="6" rx="2" fill="#3b82f6"/></>
        ) : (
          <rect x="78" y="66" width="75" height="4" fill={accent} opacity="0.7"/>
        )}
        <circle cx="88" cy="124" r="18" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/><circle cx="88" cy="124" r="8" fill={accent}/>
        <circle cx="212" cy="124" r="18" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/><circle cx="212" cy="124" r="8" fill={accent}/>
      </>
    );
  } else if (vShape === "car-sedan" || vShape === "car-hatch" || vShape === "car-van") {
    silhouette = (
      <>
        <path d="M52 115 L85 80 L178 80 L215 100 L248 104 L250 122 L48 122 Z" fill="#161b26" stroke={accent} strokeWidth="2"/>
        <polygon points="90,84 130,84 130,98 75,98" fill="#0b0f17" stroke={accent} strokeWidth="1"/>
        <polygon points="136,84 174,84 198,98 136,98" fill="#0b0f17" stroke={accent} strokeWidth="1"/>
        <circle cx="88" cy="124" r="15" fill="#090b10" stroke="#9ca3af" strokeWidth="2.5"/><circle cx="88" cy="124" r="6" fill={accent}/>
        <circle cx="210" cy="124" r="15" fill="#090b10" stroke="#9ca3af" strokeWidth="2.5"/><circle cx="210" cy="124" r="6" fill={accent}/>
      </>
    );
  } else if (vShape === "bike" || vShape === "scooter") {
    silhouette = (
      <>
        <line x1="95" y1="122" x2="132" y2="78" stroke={accent} strokeWidth="3.5"/>
        <path d="M115 92 Q145 75 175 95 L198 115 L125 115 Z" fill="#161b26" stroke={accent} strokeWidth="2"/>
        <line x1="198" y1="122" x2="176" y2="72" stroke="#e5e7eb" strokeWidth="3"/>
        <circle cx="92" cy="122" r="17" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/><circle cx="92" cy="122" r="7" fill={accent}/>
        <circle cx="204" cy="122" r="17" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/><circle cx="204" cy="122" r="7" fill={accent}/>
      </>
    );
  } else if (vShape === "auto") {
    silhouette = (
      <>
        <path d="M75 68 L195 68 L225 102 L228 122 L70 122 Z" fill="#15221b" stroke="#eab308" strokeWidth="2.2"/>
        <path d="M75 68 Q135 58 195 68" fill="#eab308" opacity="0.85"/>
        <rect x="85" y="75" width="55" height="24" fill="#090b10" stroke="#eab308" strokeWidth="1"/>
        <circle cx="92" cy="124" r="13" fill="#090b10" stroke="#9ca3af" strokeWidth="2.5"/>
        <circle cx="212" cy="124" r="13" fill="#090b10" stroke="#9ca3af" strokeWidth="2.5"/>
      </>
    );
  } else if (vShape === "truck" || vShape === "bus") {
    silhouette = (
      <>
        <rect x="38" y="56" width="145" height="64" rx="3" fill="#161b26" stroke={accent} strokeWidth="2"/>
        <path d="M186 70 L232 70 L248 96 L248 120 L186 120 Z" fill="#1f2937" stroke={accent} strokeWidth="2"/>
        <rect x="202" y="76" width="32" height="18" fill="#090b10" stroke={accent} strokeWidth="1"/>
        <circle cx="68" cy="124" r="15" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/>
        <circle cx="108" cy="124" r="15" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/>
        <circle cx="216" cy="124" r="15" fill="#090b10" stroke="#9ca3af" strokeWidth="3"/>
      </>
    );
  } else if (vShape === "rail" || vShape === "metro") {
    silhouette = (
      <>
        <path d="M28 66 L235 66 L268 98 L268 120 L28 120 Z" fill="#161b26" stroke={accent} strokeWidth="2.2"/>
        <line x1="28" y1="95" x2="265" y2="95" stroke={accent} strokeWidth="2"/>
        <rect x="48" y="74" width="35" height="14" fill="#090b10" stroke={accent} strokeWidth="1"/>
        <rect x="95" y="74" width="35" height="14" fill="#090b10" stroke={accent} strokeWidth="1"/>
        <rect x="142" y="74" width="35" height="14" fill="#090b10" stroke={accent} strokeWidth="1"/>
        <line x1="15" y1="128" x2="285" y2="128" stroke="#4b5563" strokeWidth="3"/>
      </>
    );
  } else {
    silhouette = (
      <>
        <path d="M48 98 L120 75 L220 75 L262 96 L235 115 L65 115 Z" fill="#161b26" stroke={accent} strokeWidth="2.2"/>
        <line x1="80" y1="62" x2="220" y2="62" stroke={accent} strokeWidth="2.5"/>
        <line x1="150" y1="62" x2="150" y2="75" stroke="#e5e7eb" strokeWidth="2.5"/>
      </>
    );
  }

  return (
    <svg viewBox="0 0 300 155" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id={`glow-${vehicle.id}`} cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#06070a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="300" height="155" fill={`url(#glow-${vehicle.id})`}/>
      <ellipse cx="150" cy="132" rx="115" ry="8" fill="#000000" opacity="0.75"/>
      <line x1="20" y1="130" x2="280" y2="130" stroke={accent} strokeWidth="1" opacity="0.4"/>
      {silhouette}
      <circle cx="249" cy="105" r="4" fill="#fef08a"/>
      <polygon points="250,103 298,90 298,122" fill="#fef08a" opacity="0.18"/>
      <circle cx="50" cy="106" r="3.5" fill="#ef4444"/>
    </svg>
  );
};

export const GarageExplorer: React.FC<GarageExplorerProps> = ({ onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeOperative, setActiveOperative] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [sortMode, setSortMode] = useState("id-asc");
  
  const [inspectVehicle, setInspectVehicle] = useState<RockstarVehicle | null>(null);
  const [modalPaint, setModalPaint] = useState<string | null>(null);

  // Comparator state
  const [compareList, setCompareList] = useState<RockstarVehicle[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const filteredFleet = useMemo(() => {
    let filtered = ROCKSTAR_VEHICLES.filter(v => {
      const matchCat = activeCategory === "ALL" || v.category === activeCategory;
      const matchOp = activeOperative === "ALL" || v.operative === activeOperative;
      const matchBrand = brandFilter === "ALL" || v.brand === brandFilter;
      const matchSearch = !searchQuery ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.lore.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchOp && matchBrand && matchSearch;
    });

    if (sortMode === "speed-desc") filtered.sort((a, b) => b.speed - a.speed);
    else if (sortMode === "armor-desc") filtered.sort((a, b) => b.armor - a.armor);
    else if (sortMode === "offroad-desc") filtered.sort((a, b) => b.offroad - a.offroad);
    else if (sortMode === "vault-desc") filtered.sort((a, b) => b.vault - a.vault);
    else filtered.sort((a, b) => a.id - b.id);
    
    return filtered;
  }, [activeCategory, activeOperative, searchQuery, brandFilter, sortMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectVehicle(null);
        if (isComparing) {
          setIsComparing(false);
          setCompareList([]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComparing]);

  const toggleCompare = (vehicle: RockstarVehicle) => {
    if (compareList.find(v => v.id === vehicle.id)) {
      setCompareList(prev => prev.filter(v => v.id !== vehicle.id));
    } else {
      if (compareList.length < 2) {
        const newList = [...compareList, vehicle];
        setCompareList(newList);
        if (newList.length === 2) {
          setIsComparing(true);
        }
      } else {
        // Replace the second one if we already have 2
        const newList = [compareList[0], vehicle];
        setCompareList(newList);
        setIsComparing(true);
      }
    }
  };

  return (
    <div className="garage-master-registry">
      {/* Top Navbar */}
      <header className="garage-top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onBackToHome}
            className="garage-font-mono"
            style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(255,255,255,0.1)', padding: '0.375rem 0.75rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}
          >
            &larr; RETURN TO HQ
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }} className="hide-on-mobile">
            <span style={{ height: '0.625rem', width: '0.625rem', borderRadius: '9999px', backgroundColor: '#f97316' }}></span>
            <span className="garage-font-display" style={{ fontSize: '1.125rem', letterSpacing: '0.05em', color: '#fff' }}>MEHTA GARAGE // MASTER FLEET TERMINAL</span>
            <span className="garage-font-mono" style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', backgroundColor: 'rgba(249,115,22,0.15)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.3)' }}>UE4.27 ASSET DB v2.5</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="garage-font-mono">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.375rem 0.875rem', borderRadius: '0.25rem', fontSize: '0.75rem' }} className="hide-on-mobile">
            <span>TOTAL ASSETS: <strong style={{ color: '#fb923c' }}>92</strong></span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>BRANDS: <strong style={{ color: '#fff' }}>13 PARODY</strong></span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>TRAFFIC SPEC: <strong style={{ color: '#34d399' }}>LEFT-HAND (INDIA)</strong></span>
          </div>
        </div>
      </header>

      {/* Hero & Dealership Portal Switcher */}
      <section className="garage-hero">
        <div className="garage-container">
          <div className="garage-hero-flex">
            <div>
              <p className="garage-font-mono" style={{ color: '#f97316', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                // DEV MEHTA'S SEIZED & MODIFIED TRANSPORT REGISTRY • JAIPUR TO JAISALMER
              </p>
              <h1 className="garage-font-display" style={{ fontSize: '2.25rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.025em', margin: 0 }}>
                92-VEHICLE TRANSPORT & PARODY BRAND CATALOG
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', maxWidth: '48rem', marginTop: '0.5rem' }}>
                In <strong style={{ color: '#fff' }}>Broken Horizon</strong>, your vehicle is not a disposable prop—it is your mobile safehouse, evidence vault, and social disguise. Browse all 92 playable and world transport assets across 13 fictional Indian manufacturers.
              </p>
            </div>

            {/* Protagonist Affinity Filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => setActiveOperative('ALL')} className={`garage-font-mono garage-op-btn ${activeOperative === 'ALL' ? 'garage-op-all-active' : 'garage-op-inactive'}`}>ALL OPERATIVES (92)</button>
              <button onClick={() => setActiveOperative('ARJUN SPEC')} className={`garage-font-mono garage-op-btn ${activeOperative === 'ARJUN SPEC' ? 'garage-op-arjun-active' : 'garage-op-inactive'}`} style={{ color: activeOperative === 'ARJUN SPEC' ? '#fff' : '#fb923c' }}>🔧 ARJUN SPEC</button>
              <button onClick={() => setActiveOperative('KAVYA SPEC')} className={`garage-font-mono garage-op-btn ${activeOperative === 'KAVYA SPEC' ? 'garage-op-kavya-active' : 'garage-op-inactive'}`} style={{ color: activeOperative === 'KAVYA SPEC' ? '#fff' : '#60a5fa' }}>📷 KAVYA SPEC</button>
              <button onClick={() => setActiveOperative('DUAL OPERATIVE')} className={`garage-font-mono garage-op-btn ${activeOperative === 'DUAL OPERATIVE' ? 'garage-op-dual-active' : 'garage-op-inactive'}`} style={{ color: activeOperative === 'DUAL OPERATIVE' ? '#fff' : '#fcd34d' }}>⚡ DUAL OPERATIVE</button>
            </div>
          </div>

          {/* Search + Parody Brand Dropdown + Sort */}
          <div className="garage-search-grid">
            <div className="garage-col-6" style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by vehicle name, real-world ref, brand, or Rajasthan district..."
                className="garage-input garage-font-mono"
                style={{ paddingLeft: '2.5rem' }}
              />
              <span style={{ position: 'absolute', left: '0.875rem', top: '0.875rem', color: '#6b7280' }}>🔍</span>
            </div>
            <div className="garage-col-3">
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="garage-input garage-font-mono" style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                <option value="ALL">ALL 13 PARODY MANUFACTURERS</option>
                <option value="TARA MOTORS">TARA MOTORS (Tata Parody)</option>
                <option value="MAHENDRA & SONS">MAHENDRA & SONS (Mahindra Parody)</option>
                <option value="SURYA-MARU">SURYA-MARU (Maruti Parody)</option>
                <option value="ASHOKA HEAVY">ASHOKA HEAVY (Ashok Leyland Parody)</option>
                <option value="EKLAVYA COMMERCIAL">EKLAVYA COMMERCIAL (Eicher Parody)</option>
                <option value="RAJPUTANA ROYAL">RAJPUTANA ROYAL (Royal Enfield Parody)</option>
                <option value="CHETAK-BAJRA">CHETAK-BAJRA (Bajaj Parody)</option>
                <option value="SHAKTI MOTO">SHAKTI MOTO (Hero/TVS/Honda Parody)</option>
                <option value="VARDHAN MERIDIAN FLEET">VARDHAN MERIDIAN FLEET (Megacorp)</option>
                <option value="BHARAT-RAIL (NWRF)">BHARAT-RAIL (Indian Railways Parody)</option>
                <option value="PINKCITY METRO CORP">PINKCITY METRO CORP (JMRC Parody)</option>
                <option value="INDUSAIR & DECCAN CARGO">INDUSAIR & DECCAN CARGO (Aviation)</option>
                <option value="MEWAR MARINE & ARAVALLI">MEWAR MARINE & ARAVALLI ROPEWAYS</option>
              </select>
            </div>
            <div className="garage-col-3">
              <select value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="garage-input garage-font-mono" style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                <option value="id-asc">SORT: REGISTRY ID (#01 → #92)</option>
                <option value="speed-desc">SORT: TOP SPEED (HIGH → LOW)</option>
                <option value="armor-desc">SORT: ARMOR & RAMMING MASS</option>
                <option value="offroad-desc">SORT: THAR OFF-ROAD TRACTION</option>
                <option value="vault-desc">SORT: EVIDENCE VAULT SLOTS</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 12-Category Filter Bar */}
      <nav className="garage-tabs-container">
        <div className="garage-container" style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`garage-font-mono garage-tab-btn ${activeCategory === c.id ? 'garage-tab-active' : 'garage-tab-inactive'}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Active Filter Count & Compare Hint */}
      <div className="garage-container" style={{ padding: '1.25rem 1rem 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
        <div className="garage-font-mono">SHOWING {filteredFleet.length} OF 92 REGISTERED ASSETS</div>
        
        {compareList.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(234,88,12,0.1)', border: '1px solid #ea580c', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' }}>
            <span className="garage-font-mono" style={{ color: '#fff' }}>COMPARING: {compareList.length}/2</span>
            {compareList.length === 2 ? (
              <button onClick={() => setIsComparing(true)} style={{ background: '#ea580c', color: '#000', border: 'none', padding: '0.125rem 0.5rem', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', borderRadius: '2px' }}>OPEN COMPARATOR</button>
            ) : (
              <span className="garage-font-mono" style={{ color: '#fb923c' }}>SELECT 1 MORE</span>
            )}
            <button onClick={() => { setCompareList([]); setIsComparing(false); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>&times;</button>
          </div>
        )}

        <div className="garage-font-mono">TIP: CLICK <span style={{ color: '#fb923c', fontWeight: 700 }}>"INSPECT BLUEPRINT"</span> FOR LORE & LIVERY SWATCHES</div>
      </div>

      {/* Main Grid */}
      <main className="garage-container garage-grid" style={{ flex: 1 }}>
        {filteredFleet.map(v => {
          const opBadgeClass =
            v.operative === "ARJUN SPEC"
              ? "background: rgba(234, 88, 12, 0.15); color: #fb923c; border-color: rgba(234, 88, 12, 0.3);"
              : v.operative === "KAVYA SPEC"
              ? "background: rgba(59, 130, 246, 0.15); color: #60a5fa; border-color: rgba(59, 130, 246, 0.3);"
              : "background: rgba(245, 158, 11, 0.15); color: #fcd34d; border-color: rgba(245, 158, 11, 0.3);";

          const speedPct = Math.min(100, Math.round((v.speed / 265) * 100));
          const isSelectedForCompare = compareList.some(item => item.id === v.id);

          return (
            <article key={v.id} className="garage-card group" style={isSelectedForCompare ? { borderColor: '#ea580c', boxShadow: '0 0 15px rgba(234,88,12,0.3)' } : {}}>
              {/* 16:9 GAME RENDER VIEWPORT */}
              <div className="garage-card-viewport garage-viewport-grid">
                <div className="garage-scanline" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}></div>
                <div style={{ position: 'absolute', top: '0.625rem', left: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.625rem', zIndex: 10 }} className="garage-font-mono">
                  <span style={{ padding: '0.125rem 0.5rem', borderRadius: '0.25rem', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fb923c', border: '1px solid rgba(255,255,255,0.1)' }}>{v.code}</span>
                  <span style={{ padding: '0.125rem 0.5rem', borderRadius: '0.25rem', border: '1px solid transparent', ...(opBadgeClass as any) }}>{v.operative}</span>
                </div>
                <div className="garage-card-img">
                  <ShowroomSVG vehicle={v} />
                </div>
                <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.75rem', right: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.625rem', color: '#9ca3af' }} className="garage-font-mono">
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>📍 {v.district}</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{v.speed} km/h</span>
                </div>
              </div>

              {/* CARD BODY */}
              <div className="garage-card-body">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.625rem', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="garage-font-mono">
                    <span>{v.brand}</span>
                    <span style={{ color: '#6b7280' }}>REF: {v.ref}</span>
                  </div>
                  <h3 className="garage-font-display" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginTop: '0.125rem', lineHeight: 1.3 }}>{v.name}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.375rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.lore}</p>

                  {/* 4 STAT BARS */}
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.625rem' }} className="garage-font-mono">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.125rem' }}><span>TOP SPEED</span><span style={{ color: '#fff' }}>{v.speed} KM/H</span></div>
                      <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#f97316', width: `${speedPct}%` }}></div></div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.125rem' }}><span>ARMOR / RAMMING MASS</span><span style={{ color: '#fff' }}>{v.armor}/100</span></div>
                      <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#34d399', width: `${v.armor}%` }}></div></div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.125rem' }}><span>HANDLING / OFF-ROAD</span><span style={{ color: '#fff' }}>{v.offroad}/100</span></div>
                      <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#60a5fa', width: `${v.offroad}%` }}></div></div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.125rem' }}><span>EVIDENCE VAULT SLOTS</span><span style={{ color: '#fff' }}>{v.vault}/100</span></div>
                      <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#fbbf24', width: `${v.vault}%` }}></div></div>
                    </div>
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button 
                    onClick={() => toggleCompare(v)}
                    className="garage-font-mono"
                    style={{ fontSize: '0.625rem', background: isSelectedForCompare ? '#ea580c' : 'rgba(255,255,255,0.05)', color: isSelectedForCompare ? '#000' : '#d1d5db', border: '1px solid', borderColor: isSelectedForCompare ? '#ea580c' : 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {isSelectedForCompare ? '✓ SELECTED' : '+ COMPARE'}
                  </button>
                  <button 
                    onClick={() => { setInspectVehicle(v); setModalPaint(null); }} 
                    style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fb923c', background: 'none', border: 'none', cursor: 'pointer' }}
                    className="garage-font-mono"
                  >
                    INSPECT BLUEPRINT &rarr;
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Blueprint Inspection Modal */}
      {inspectVehicle && !isComparing && (
        <div className="garage-modal-overlay">
          <div className="garage-modal-content">
            <div style={{ padding: '1.5rem', backgroundColor: '#080a10', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="garage-font-mono" style={{ fontSize: '0.75rem', color: '#fb923c' }}>{inspectVehicle.code} // {inspectVehicle.brand} // {inspectVehicle.category}</span>
                <h2 className="garage-font-display" style={{ fontSize: '1.875rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginTop: '0.125rem', margin: 0 }}>{inspectVehicle.name}</h2>
              </div>
              <button 
                onClick={() => setInspectVehicle(null)} 
                className="garage-font-mono"
                style={{ padding: '0.375rem 0.75rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                ESC / CLOSE &#x2715;
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', padding: '1.5rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="garage-viewport-grid" style={{ height: '13rem', borderRadius: '0.5rem', backgroundColor: '#05070b', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                  <ShowroomSVG vehicle={inspectVehicle} customColor={modalPaint} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="garage-font-mono" style={{ fontSize: '0.6875rem', color: '#9ca3af' }}>PREVIEW LIVERY / PAINT SWATCH:</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setModalPaint('#ea580c')} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: '#ea580c', border: '1px solid #fff', cursor: 'pointer' }}></button>
                    <button onClick={() => setModalPaint('#f3f4f6')} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: '#f3f4f6', border: '1px solid #fff', cursor: 'pointer' }}></button>
                    <button onClick={() => setModalPaint('#3b82f6')} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: '#3b82f6', border: '1px solid #fff', cursor: 'pointer' }}></button>
                    <button onClick={() => setModalPaint('#10b981')} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: '#10b981', border: '1px solid #fff', cursor: 'pointer' }}></button>
                    <button onClick={() => setModalPaint('#eab308')} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '9999px', backgroundColor: '#eab308', border: '1px solid #fff', cursor: 'pointer' }}></button>
                  </div>
                </div>

                <div className="garage-font-mono" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>{inspectVehicle.lore}</p>
                  <div style={{ padding: '0.75rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div><span style={{ color: '#6b7280' }}>REAL-WORLD CLASS REF:</span> <strong style={{ color: '#fff' }}>{inspectVehicle.ref}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>PRIMARY RAJASTHAN SPAWN:</span> <strong style={{ color: '#fb923c' }}>{inspectVehicle.district}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>OPERATIVE AFFINITY:</span> <strong style={{ color: '#fff' }}>{inspectVehicle.operative}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>KOTA VIN-PLATE FORGERY:</span> <strong style={{ color: '#34d399' }}>{inspectVehicle.vinDiff}</strong></div>
                    <div><span style={{ color: '#6b7280' }}>TRAFFIC SIMULATION:</span> <strong style={{ color: '#fff' }}>Left-Side Indian Corridor Spec</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Spec Comparison Drawer */}
      {isComparing && compareList.length === 2 && (
        <div className="garage-modal-overlay">
          <div className="garage-modal-content" style={{ maxWidth: '64rem' }}>
            <div style={{ padding: '1.25rem', backgroundColor: '#080a10', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 className="garage-font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: 0 }}>HEAD-TO-HEAD SPEC COMPARISON</h2>
              </div>
              <button 
                onClick={() => setIsComparing(false)} 
                className="garage-font-mono"
                style={{ padding: '0.375rem 0.75rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                CLOSE COMPARES &#x2715;
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              {compareList.map((v) => {
                const speedPct = Math.min(100, Math.round((v.speed / 265) * 100));
                return (
                  <div key={v.id} style={{ backgroundColor: '#0b0e16', padding: '1.5rem' }}>
                    <h3 className="garage-font-display" style={{ fontSize: '1.25rem', margin: '0 0 1rem 0', color: '#fb923c' }}>{v.name}</h3>
                    <div className="garage-viewport-grid" style={{ height: '11rem', borderRadius: '0.5rem', backgroundColor: '#05070b', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                      <ShowroomSVG vehicle={v} />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.6875rem' }} className="garage-font-mono">
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.25rem' }}><span>TOP SPEED</span><span style={{ color: '#fff' }}>{v.speed} KM/H</span></div>
                        <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#f97316', width: `${speedPct}%` }}></div></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.25rem' }}><span>ARMOR / RAMMING MASS</span><span style={{ color: '#fff' }}>{v.armor}/100</span></div>
                        <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#34d399', width: `${v.armor}%` }}></div></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.25rem' }}><span>HANDLING / OFF-ROAD</span><span style={{ color: '#fff' }}>{v.offroad}/100</span></div>
                        <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#60a5fa', width: `${v.offroad}%` }}></div></div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', marginBottom: '0.25rem' }}><span>EVIDENCE VAULT SLOTS</span><span style={{ color: '#fff' }}>{v.vault}/100</span></div>
                        <div className="garage-stat-bar-bg"><div style={{ height: '100%', backgroundColor: '#fbbf24', width: `${v.vault}%` }}></div></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#050608', padding: '2rem 1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#6b7280' }} className="garage-font-mono">
        <div>MEHTA GARAGE FLEET DATABASE • BROKEN HORIZON STUDIO (JAIPUR, RAJASTHAN)</div>
        <div style={{ marginTop: '0.25rem', fontSize: '0.6875rem', color: '#4b5563' }}>All 92 vehicle names and manufacturers are fictional parodies created for Broken Horizon. Real-world models are cited strictly as class references.</div>
      </footer>
    </div>
  );
};
