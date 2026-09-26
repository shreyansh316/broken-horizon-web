import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ambientAudio } from '../../utils/ambientAudio';

interface NavbarProps {
  onOpenDownloadModal: () => void;
  onNavigateToWorld?: () => void;
  onNavigateToCharacters?: () => void;
  onNavigateToStory?: () => void;
  onNavigateToGarage?: () => void;
  onNavigateToDevelopment?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDownloadModal,
  onNavigateToWorld,
  onNavigateToCharacters,
  onNavigateToGarage,
  onNavigateToDevelopment,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleToggleAudio = () => {
    const nextState = ambientAudio.toggle();
    setIsAudioOn(nextState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'trailer', 'premise', 'gameplay', 'world', 'the-road', 'characters', 'media', 'development', 'access'];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Clean, single-line AAA navlinks
  const navLinks = [
    { label: 'GAME', href: '#gameplay', sectionId: 'gameplay' },
    { label: 'WORLD', href: '/world', sectionId: 'world' },
    { label: 'THE ROAD', href: '#the-road', sectionId: 'the-road' },
    { label: 'TRANSPORT', href: '/garage', sectionId: 'garage' },
    { label: 'OPERATIVES', href: '#characters', sectionId: 'characters' },
    { label: 'MEDIA', href: '#media', sectionId: 'media' },
    { label: 'DEVELOPMENT', href: '/development', sectionId: 'development' },
  ];

  const handleLinkClick = (link: { label: string; href: string }) => {
    setIsMobileOpen(false);
    if (link.label === 'WORLD' && onNavigateToWorld) {
      onNavigateToWorld();
      return;
    }
    if (link.label === 'OPERATIVES' && onNavigateToCharacters) {
      const el = document.querySelector('#characters');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if ((link.label === 'GARAGE' || link.label === 'TRANSPORT') && onNavigateToGarage) {
      onNavigateToGarage();
      return;
    }
    if (link.label === 'DEVELOPMENT' && onNavigateToDevelopment) {
      onNavigateToDevelopment();
      return;
    }

    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAccessCta = () => {
    const accessEl = document.getElementById('access');
    if (accessEl) {
      accessEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenDownloadModal();
    }
  };

  return (
    <>
      <header
        className={`site-navbar ${isScrolled ? 'navbar-fixed-scrolled' : 'navbar-fixed-hero'}`}
        role="banner"
      >
        <div className="nav-container-inner">
          {/* Brand Logo: Clean Monogram + Title (Zero wrap, zero subtitle) */}
          <a
            href="#"
            className="nav-brand-lockup"
            aria-label="Broken Horizon Official Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="nav-monogram">BH</span>
            <span className="nav-brand-text">BROKEN HORIZON</span>
          </a>

          {/* Clean Desktop Navigation (No double-line wrapping) */}
          <nav className="nav-menu-desktop" aria-label="Main Navigation">
            <ul className="nav-links-row">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`nav-link-anchor ${isActive ? 'is-active-link' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action: Clean Audio Button + Playtest Button */}
          <div className="nav-actions-right">
            <button
              type="button"
              className={`nav-audio-btn ${isAudioOn ? 'is-active' : ''}`}
              onClick={handleToggleAudio}
              aria-label={isAudioOn ? 'Mute ambient desert audio' : 'Enable ambient desert audio'}
              title="Toggle Desert Ambience"
            >
              {isAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="audio-label">{isAudioOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            <button
              type="button"
              className="btn-playtest-nav"
              onClick={handleAccessCta}
            >
              JOIN PLAYTEST
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer: Rendered ONLY when opened */}
      {isMobileOpen && (
        <div className="mobile-overlay-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-header">
            <span className="mobile-brand-title">BROKEN HORIZON</span>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-drawer-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-drawer-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="btn-playtest-mobile"
              onClick={() => {
                setIsMobileOpen(false);
                handleAccessCta();
              }}
            >
              JOIN PLAYTEST
            </button>
          </div>
        </div>
      )}
    </>
  );
};
