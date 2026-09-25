import { useState, useEffect } from 'react';
import { CustomCursor } from './components/UI/CustomCursor';
import { CinematicIntro } from './components/CinematicIntro/CinematicIntro';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { TrailerSection } from './components/Trailer/TrailerSection';
import { TrailerModal } from './components/Trailer/TrailerModal';
import { GameSection } from './components/Game/GameSection';
import { WorldSection } from './components/World/WorldSection';
import { RoadSection } from './components/Road/RoadSection';
import { CharacterSection } from './components/Characters/CharacterSection';
import { DevelopmentSection } from './components/Development/DevelopmentSection';
import { MediaSection } from './components/Media/MediaSection';
import { DownloadSection } from './components/Download/DownloadSection';
import { DownloadModal } from './components/Download/DownloadModal';
import { FooterSection } from './components/Footer/FooterSection';
import { WorldExplorer } from './components/WorldExplorer/WorldExplorer';
import { CharacterExplorer } from './components/CharacterExplorer/CharacterExplorer';
import { StoryBoard } from './components/StoryBoard/StoryBoard';
import { GarageExplorer } from './components/GarageExplorer/GarageExplorer';
import { AdminPlaytestDashboard } from './components/Playtest/AdminPlaytestDashboard';
import { PlaytestPortal } from './components/Playtest/PlaytestPortal';
import { DevelopmentDashboard } from './components/Development/DevelopmentDashboard';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import './styles/globals.css';
import './styles/animations.css';

export function App() {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [hasEnteredSite, setHasEnteredSite] = useState(false);

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<
    'home' | 'world' | 'characters' | 'story' | 'garage' | 'admin' | 'playtest' | 'development' | 'privacy' | 'terms'
  >(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') return 'admin';
    if (path.startsWith('/playtest') || path.startsWith('/access') || hash === '#/playtest') return 'playtest';
    if (path.startsWith('/world') || hash === '#/world' || hash === '#world-explorer') return 'world';
    if (path.startsWith('/characters') || hash === '#/characters') return 'characters';
    if (path.startsWith('/story') || hash === '#/story') return 'story';
    if (path.startsWith('/garage') || hash === '#/garage' || hash === '#garage-lab') return 'garage';
    if (path.startsWith('/development') || hash === '#/development' || hash === '#development') return 'development';
    if (path.startsWith('/privacy') || hash === '#/privacy') return 'privacy';
    if (path.startsWith('/terms') || hash === '#/terms') return 'terms';
    return 'home';
  });

  const [activeDistrictId, setActiveDistrictId] = useState<string>('jaipur');
  const [activeCharId, setActiveCharId] = useState<string>('arjun-mehta');

  // Handle URL history and browser back/forward
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.startsWith('/admin') || hash === '#/admin' || hash === '#admin') {
        setCurrentRoute('admin');
        document.title = 'Broken Horizon — Playtest Clearance Admin';
      } else if (path.startsWith('/playtest') || path.startsWith('/access') || hash === '#/playtest') {
        setCurrentRoute('playtest');
        document.title = 'Broken Horizon — Verified Playtest Portal';
      } else if (path.startsWith('/world') || hash === '#/world' || hash === '#world-explorer') {
        setCurrentRoute('world');
        const parts = path.split('/').filter(Boolean);
        if (parts.length >= 2) {
          setActiveDistrictId(parts[1]);
        }
        document.title = 'Broken Horizon — The World';
      } else if (path.startsWith('/characters') || hash === '#/characters') {
        setCurrentRoute('characters');
        const parts = path.split('/').filter(Boolean);
        if (parts.length >= 2) {
          setActiveCharId(parts[1]);
        }
        document.title = 'Broken Horizon — Character Dossiers';
      } else if (path.startsWith('/story') || hash === '#/story') {
        setCurrentRoute('story');
        document.title = 'Broken Horizon — Investigation Board & Story';
      } else if (path.startsWith('/garage') || hash === '#/garage' || hash === '#garage-lab') {
        setCurrentRoute('garage');
        document.title = 'Broken Horizon — Mehta Garage Tuning Lab';
      } else if (path.startsWith('/development') || hash === '#/development' || hash === '#development') {
        setCurrentRoute('development');
        document.title = 'Broken Horizon — Development Status';
      } else if (path.startsWith('/privacy') || hash === '#/privacy') {
        setCurrentRoute('privacy');
        document.title = 'Broken Horizon — Privacy Policy';
      } else if (path.startsWith('/terms') || hash === '#/terms') {
        setCurrentRoute('terms');
        document.title = 'Broken Horizon — Terms of Service';
      } else {
        setCurrentRoute('home');
        document.title = 'Broken Horizon — Official Website';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToWorld = (districtId: string = 'jaipur') => {
    setActiveDistrictId(districtId);
    setCurrentRoute('world');
    window.history.pushState(null, '', `/world/${districtId}`);
    document.title = 'Broken Horizon — The World';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToCharacters = (charId: string = 'arjun-mehta') => {
    setActiveCharId(charId);
    setCurrentRoute('characters');
    window.history.pushState(null, '', `/characters/${charId}`);
    document.title = 'Broken Horizon — Character Dossiers';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToStory = () => {
    setCurrentRoute('story');
    window.history.pushState(null, '', '/story');
    document.title = 'Broken Horizon — Investigation Board & Story';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToGarage = () => {
    setCurrentRoute('garage');
    window.history.pushState(null, '', '/garage');
    document.title = 'Broken Horizon — Mehta Garage Tuning Lab';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = () => {
    setCurrentRoute('home');
    window.history.pushState(null, '', '/');
    document.title = 'Broken Horizon — Official Website';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDevelopment = () => {
    setCurrentRoute('development');
    window.history.pushState(null, '', '/development');
    document.title = 'Broken Horizon — Development Status';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="broken-horizon-app">
      {/* Desktop Subtle Custom Cursor */}
      <CustomCursor />

      {/* Global Cinematic Vignette Layer */}
      <div className="app-vignette" aria-hidden="true" />

      {/* Render Dedicated Page Views */}
      {currentRoute === 'admin' ? (
        <AdminPlaytestDashboard onBackToHome={navigateToHome} />
      ) : currentRoute === 'playtest' ? (
        <PlaytestPortal onBackToHome={navigateToHome} />
      ) : currentRoute === 'world' ? (
        <WorldExplorer
          onBackToHome={navigateToHome}
          initialDistrictId={activeDistrictId}
        />
      ) : currentRoute === 'characters' ? (
        <CharacterExplorer
          onBackToHome={navigateToHome}
          onNavigateToWorld={() => navigateToWorld('jaipur')}
          onNavigateToStory={navigateToStory}
          initialCharacterId={activeCharId}
        />
      ) : currentRoute === 'story' ? (
        <StoryBoard
          onBackToHome={navigateToHome}
          onNavigateToWorld={() => navigateToWorld('jaipur')}
          onNavigateToCharacters={() => navigateToCharacters('arjun-mehta')}
        />
      ) : currentRoute === 'garage' ? (
        <GarageExplorer
          onBackToHome={navigateToHome}
          onNavigateToWorld={() => navigateToWorld('jaipur')}
        />
      ) : currentRoute === 'development' ? (
        <DevelopmentDashboard onBackToHome={navigateToHome} />
      ) : currentRoute === 'privacy' ? (
        <PrivacyPolicy onBackToHome={navigateToHome} />
      ) : currentRoute === 'terms' ? (
        <TermsOfService onBackToHome={navigateToHome} />
      ) : (
        <>
          {/* First 5-12s Cinematic Opening / Loading Experience */}
          {!hasEnteredSite && (
            <CinematicIntro onComplete={() => setHasEnteredSite(true)} />
          )}

          {/* Sticky Navigation */}
          <Navbar
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            onNavigateToWorld={() => navigateToWorld('jaipur')}
            onNavigateToCharacters={() => navigateToCharacters('arjun-mehta')}
            onNavigateToStory={navigateToStory}
            onNavigateToGarage={navigateToGarage}
            onNavigateToDevelopment={navigateToDevelopment}
          />

          {/* Main Continuous Cinematic Homepage */}
          <main id="main-content">
            <Hero onOpenTrailerModal={() => setIsTrailerModalOpen(true)} />
            <TrailerSection onOpenTrailerModal={() => setIsTrailerModalOpen(true)} />
            <CharacterSection
              onNavigateToCharacters={(cId) => navigateToCharacters(cId)}
              onNavigateToGarage={navigateToGarage}
            />
            <GameSection onNavigateToGarage={navigateToGarage} />
            <WorldSection onNavigateToWorld={(distId) => navigateToWorld(distId)} />
            <RoadSection />
            <MediaSection />
            <DevelopmentSection />
            <DownloadSection onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />
          </main>

          {/* Substantial Cinematic Footer */}
          <FooterSection onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

          {/* Modals */}
          <TrailerModal
            isOpen={isTrailerModalOpen}
            onClose={() => setIsTrailerModalOpen(false)}
          />
          <DownloadModal
            isOpen={isDownloadModalOpen}
            onClose={() => setIsDownloadModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
