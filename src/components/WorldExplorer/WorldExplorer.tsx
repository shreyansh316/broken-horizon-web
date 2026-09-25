import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { worldRegions, type WorldRegion, type MapLandmark } from '../../data/worldData';
import { WorldMap } from './WorldMap';
import { WorldIntro } from './WorldIntro';
import { DistrictPanel } from './DistrictPanel';
import { DistrictList } from './DistrictList';
import { WorldSearch } from './WorldSearch';
import { WorldFilters, type MapFilterType } from './WorldFilters';
import { JourneyTimeline } from './JourneyTimeline';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { WorldStats } from './WorldStats';
import { MapTransition } from './MapTransition';
import { TripPlannerModal } from './TripPlannerModal';

interface WorldExplorerProps {
  onBackToHome: () => void;
  initialDistrictId?: string;
}

export const WorldExplorer: React.FC<WorldExplorerProps> = ({
  onBackToHome,
  initialDistrictId = 'jaipur',
}) => {
  // State
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<WorldRegion | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<WorldRegion | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmark | null>(null);
  const [filter, setFilter] = useState<MapFilterType>('ALL');
  const [focusTarget, setFocusTarget] = useState<{ x: number; y: number } | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [discoveryNotification, setDiscoveryNotification] = useState<{ name: string; tag: string } | null>(null);

  // New Tactical Layers & Route States
  const [isNightRecon, setIsNightRecon] = useState(false);
  const [isWeatherRadar, setIsWeatherRadar] = useState(false);
  const [isFactionOverlay, setIsFactionOverlay] = useState(false);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const [gpsRoute, setGpsRoute] = useState<{
    from: { x: number; y: number; name: string };
    to: { x: number; y: number; name: string };
  } | null>(null);

  // Audio preference
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    return localStorage.getItem('bh_audio_enabled') === 'true';
  });

  // Select initial district (Jaipur) on mount
  useEffect(() => {
    const initDist = worldRegions.find((r) => r.id === initialDistrictId) || worldRegions[0];
    setSelectedDistrict(initDist);
    setFocusTarget(initDist.mapCoordinates);
  }, [initialDistrictId]);

  // Handle ESC key globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDeepDiveOpen) {
          setIsDeepDiveOpen(false);
        } else if (selectedDistrict) {
          setSelectedDistrict(null);
        } else if (isLegendOpen) {
          setIsLegendOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDeepDiveOpen, selectedDistrict, isLegendOpen]);

  // When a district is selected, trigger discovery banner
  const handleSelectDistrict = (district: WorldRegion) => {
    setSelectedDistrict(district);
    setSelectedLandmark(null);
    setFocusTarget(district.mapCoordinates);

    // Show discovery flash message
    setDiscoveryNotification({
      name: district.name,
      tag: district.shortDescription,
    });
    setTimeout(() => {
      setDiscoveryNotification(null);
    }, 3800);
  };

  // Zoom controls triggered from HUD
  const handleZoomIn = () => {
    // Handled via keyboard event or dispatched
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
  };

  const handleZoomOut = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: '-' }));
  };

  const handleReset = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }));
  };

  const handleLocateWorld = () => {
    const jaipur = worldRegions[0];
    setSelectedDistrict(jaipur);
    setFocusTarget(jaipur.mapCoordinates);
  };

  const handleAudioToggle = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    localStorage.setItem('bh_audio_enabled', String(next));
  };

  return (
    <div className="world-explorer-root" role="main" aria-label="Broken Horizon World Explorer">
      {/* Cinematic Intro Reveal */}
      {!hasCompletedIntro && (
        <WorldIntro onComplete={() => setHasCompletedIntro(true)} />
      )}

      {/* Top Tactical Navigation Bar */}
      <header className="world-explorer-navbar" role="banner">
        <div className="we-nav-left">
          <button
            type="button"
            className="we-back-home-btn"
            onClick={onBackToHome}
            aria-label="Return to Broken Horizon Homepage"
          >
            <ArrowLeft size={16} />
            <span>MAIN SITE</span>
          </button>

          <div className="we-brand-divider" aria-hidden="true" />

          <div className="we-title-block">
            <span className="we-brand-lead">BROKEN HORIZON</span>
            <span className="we-brand-sub">TERRITORY ATLAS // 13 DISTRICTS</span>
          </div>
        </div>

        {/* Search Bar in Header */}
        <div className="we-nav-center">
          <WorldSearch
            onSelectResult={(res) => {
              handleSelectDistrict(res.targetRegion);
              setFocusTarget(res.targetCoordinates);
            }}
          />
        </div>

        {/* Audio Toggle & Drawer Trigger */}
        <div className="we-nav-right">
          <button
            type="button"
            className="we-audio-btn"
            onClick={handleAudioToggle}
            aria-label={isAudioEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
          >
            {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{isAudioEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
        </div>
      </header>

      {/* Filter Chips Bar */}
      <div className="world-filter-strip">
        <WorldFilters
          activeFilter={filter}
          onChangeFilter={(f) => setFilter(f)}
        />
        <DistrictList
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          isOpen={isDrawerOpen}
          onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </div>

      {/* Main Interactive Map Canvas */}
      <WorldMap
        selectedDistrict={selectedDistrict}
        hoveredDistrict={hoveredDistrict}
        selectedLandmark={selectedLandmark}
        filter={filter}
        onSelectDistrict={handleSelectDistrict}
        onHoverDistrict={setHoveredDistrict}
        onSelectLandmark={(lm) => {
          setSelectedLandmark(lm);
          const parent = worldRegions.find((r) => r.id === lm.districtId);
          if (parent) setSelectedDistrict(parent);
          setFocusTarget({ x: lm.x, y: lm.y });
        }}
        focusTarget={focusTarget}
        isNightRecon={isNightRecon}
        isWeatherRadar={isWeatherRadar}
        isFactionOverlay={isFactionOverlay}
        gpsRoute={gpsRoute}
      />

      {/* District Briefing Side Panel / Bottom Sheet */}
      <DistrictPanel
        district={selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        onExploreDistrict={() => setIsDeepDiveOpen(true)}
      />

      {/* Bottom Horizontal Journey Timeline ("The Road") */}
      <div className="world-bottom-tray">
        <JourneyTimeline
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
        />
      </div>

      {/* Floating HUD Controls */}
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onLocateWorld={handleLocateWorld}
        onToggleLegend={() => setIsLegendOpen(!isLegendOpen)}
        isLegendOpen={isLegendOpen}
        isNightRecon={isNightRecon}
        onToggleNightRecon={() => setIsNightRecon(!isNightRecon)}
        isWeatherRadar={isWeatherRadar}
        onToggleWeatherRadar={() => setIsWeatherRadar(!isWeatherRadar)}
        isFactionOverlay={isFactionOverlay}
        onToggleFactionOverlay={() => setIsFactionOverlay(!isFactionOverlay)}
        onOpenTripPlanner={() => setIsTripPlannerOpen(true)}
      />

      {/* Cartographic Key / Legend Card */}
      <MapLegend
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />

      {/* Tactical Route & GPS Trip Calculator Modal */}
      <TripPlannerModal
        isOpen={isTripPlannerOpen}
        onClose={() => setIsTripPlannerOpen(false)}
        currentDistrict={selectedDistrict}
        onPlotRoute={(origin, dest) => {
          setGpsRoute({
            from: { ...origin.mapCoordinates, name: origin.name },
            to: { ...dest.mapCoordinates, name: dest.name },
          });
          // Focus midpoint
          setFocusTarget({
            x: (origin.mapCoordinates.x + dest.mapCoordinates.x) / 2,
            y: (origin.mapCoordinates.y + dest.mapCoordinates.y) / 2,
          });
          setDiscoveryNotification({
            name: `${origin.name} → ${dest.name}`,
            tag: 'TACTICAL GPS TRANSIT CORRIDOR COMPUTED',
          });
          setTimeout(() => {
            setDiscoveryNotification(null);
          }, 4500);
        }}
      />

      {/* Top-Right Telemetry & Compass Overlay */}
      <WorldStats
        currentCoordinates={selectedDistrict ? selectedDistrict.coordinates : 'GRID 55-46 // CALIBRATING'}
      />

      {/* Cinematic District Discovery Notification Banner */}
      {discoveryNotification && (
        <div className="district-discovery-banner" role="status" aria-live="polite">
          <div className="discovery-bracket-l" />
          <div className="discovery-text-wrap">
            <span className="discovery-lead">DISTRICT DISCOVERED</span>
            <span className="discovery-district-name">{discoveryNotification.name}</span>
            <span className="discovery-tagline">{discoveryNotification.tag}</span>
          </div>
          <div className="discovery-bracket-r" />
        </div>
      )}

      {/* Deep-Dive Expanded District Modal */}
      <MapTransition
        district={selectedDistrict}
        isOpen={isDeepDiveOpen}
        onBack={() => setIsDeepDiveOpen(false)}
      />
    </div>
  );
};
