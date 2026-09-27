import React, { useState, useEffect, useCallback } from 'react';
import { Compass, X, ChevronLeft, ChevronRight, Maximize2, ShieldAlert, Route } from 'lucide-react';

interface WaypointStop {
  id: string;
  num: string;
  milestoneLabel: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  srcset: string;
  alt: string;
  status: string;
}

export const RoadSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const waypoints: WaypointStop[] = [
    {
      id: 'mile-01',
      num: '01',
      milestoneLabel: 'CONCEPT MILESTONE 01',
      name: 'JAIPUR BYPASS',
      category: 'Urban Freight Corridor',
      desc: 'The journey starts at Mehta Garage under neon toll gantry lights, slipping past highway patrols into the outer dark.',
      image: '/assets/images/world-network/BH_WorldNetwork_JaipurBypass.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_JaipurBypass_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_JaipurBypass_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_JaipurBypass.webp 1920w',
      alt: 'Broken Horizon Jaipur Bypass fictional gameplay scene at night with freight corridor and neon toll gantry',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
    {
      id: 'mile-02',
      num: '02',
      milestoneLabel: 'CONCEPT MILESTONE 02',
      name: 'SAMBHAR SALT FLATS',
      category: 'High-Speed Alkaline Basin',
      desc: 'Vast shimmering salt beds where maximum overdrive speeds are reached beneath clear nocturnal desert skies.',
      image: '/assets/images/world-network/BH_WorldNetwork_SambharSaltFlats.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_SambharSaltFlats_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_SambharSaltFlats_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_SambharSaltFlats.webp 1920w',
      alt: 'Broken Horizon Sambhar Salt Flats fictional gameplay scene across shimmering nocturnal alkaline basin',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
    {
      id: 'mile-03',
      num: '03',
      milestoneLabel: 'CONCEPT MILESTONE 03',
      name: 'ARAVALLI SWITCHBACKS',
      category: 'Mountain Ascent & Stone Cuts',
      desc: 'Steep serpentine switchbacks cutting through ancient stone ridges, prone to rockslides and private security ambushes.',
      image: '/assets/images/world-network/BH_WorldNetwork_AravalliSwitchbacks.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_AravalliSwitchbacks_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_AravalliSwitchbacks_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_AravalliSwitchbacks.webp 1920w',
      alt: 'Broken Horizon Aravalli Switchbacks fictional gameplay scene with winding mountain ascent and stone cuts',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
    {
      id: 'mile-04',
      num: '04',
      milestoneLabel: 'CONCEPT MILESTONE 04',
      name: 'UDAIPUR SANCTUARY',
      category: 'Lake Basins & Hidden Havelis',
      desc: 'Shadowy waterfront alleys and secret safehouses where stolen manifest telemetry is deciphered.',
      image: '/assets/images/world-network/BH_WorldNetwork_UdaipurSanctuary.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_UdaipurSanctuary_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_UdaipurSanctuary_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_UdaipurSanctuary.webp 1920w',
      alt: 'Broken Horizon Udaipur Sanctuary fictional gameplay scene along moonlit waterfront havelis and ghats',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
    {
      id: 'mile-05',
      num: '05',
      milestoneLabel: 'CONCEPT MILESTONE 05',
      name: 'THAR DESERT SEA',
      category: 'Off-Road Dunes & Haboobs',
      desc: 'Where asphalt terminates entirely. Low tire pressure and navigation by ancient stars are essential for survival.',
      image: '/assets/images/world-network/BH_WorldNetwork_TharDesertSea.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_TharDesertSea_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_TharDesertSea_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_TharDesertSea.webp 1920w',
      alt: 'Broken Horizon Thar Desert Sea fictional gameplay scene with 4x4 navigating massive dunes before approaching haboob',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
    {
      id: 'mile-06',
      num: '06',
      milestoneLabel: 'CONCEPT MILESTONE 06',
      name: 'JAISALMER BASTION',
      category: 'Fortress Citadel Frontier',
      desc: 'Golden sandstone ramparts towering over the western boundary, guarding the final subterranean anomaly.',
      image: '/assets/images/world-network/BH_WorldNetwork_JaisalmerBastion.webp',
      srcset: '/assets/images/world-network/BH_WorldNetwork_JaisalmerBastion_900w.webp 900w, /assets/images/world-network/BH_WorldNetwork_JaisalmerBastion_1280w.webp 1280w, /assets/images/world-network/BH_WorldNetwork_JaisalmerBastion.webp 1920w',
      alt: 'Broken Horizon Jaisalmer Bastion fictional gameplay scene approaching golden sandstone fortress frontier',
      status: 'WORLD CONCEPT / FUTURE DEVELOPMENT',
    },
  ];

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + waypoints.length) % waypoints.length : null));
  }, [waypoints.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % waypoints.length : null));
  }, [waypoints.length]);

  // Keyboard navigation & ESC close
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleCloseLightbox, handlePrev, handleNext]);

  const activeWaypoint = selectedIndex !== null ? waypoints[selectedIndex] : null;

  return (
    <section className="highway-route-stage" id="the-road" aria-label="Connected World Network">
      <div className="section-container">
        {/* Editorial Lead Block */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">CONNECTED WORLD NETWORK</span>
          <h2 className="lead-headline">PLANNED WORLD NETWORK</h2>
          <p className="lead-subcopy">
            A planned connected fictionalized Rajasthan travel corridor linking distinct environments, cities, high-speed freight bypasses, alkaline flats, mountain passes, water havelis, open dunes, and frontier citadels.
          </p>
          <div className="world-network-status-badge">
            <ShieldAlert size={14} className="text-amber" />
            <span>STATUS: WORLD CONCEPT / FUTURE DEVELOPMENT</span>
          </div>
        </div>

        {/* Travel Network Visual Route Pipeline */}
        <div className="planned-route-schematic" aria-label="Planned World Network Route Pipeline">
          <div className="schematic-header">
            <div className="schematic-title">
              <Route size={15} className="text-amber" />
              <span>PLANNED EXPEDITION CORRIDOR VECTOR</span>
            </div>
            <span className="schematic-meta">6 REGIONAL MILESTONES • JAIPUR TO JAISALMER</span>
          </div>
          <div className="route-flow-line" role="list">
            {waypoints.map((wp, idx) => (
              <div 
                key={`flow-${wp.id}`} 
                className={`route-flow-node ${selectedIndex === idx ? 'is-active' : ''}`}
                onClick={() => handleOpenLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(idx); }}
                aria-label={`View milestone 0${idx + 1}: ${wp.name}`}
              >
                <div className="node-marker">
                  <span className="node-dot" />
                  <span className="node-index">0{idx + 1}</span>
                </div>
                <div className="node-label">
                  <span className="node-name">{wp.name}</span>
                  <span className="node-category">{wp.category}</span>
                </div>
                {idx < waypoints.length - 1 && <span className="node-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>

        {/* Clean Atmospheric Visual Route Grid */}
        <div className="highway-waypoints-grid" role="region" aria-label="Travel Milestones Grid">
          {waypoints.map((wp, idx) => (
            <article 
              key={wp.id} 
              className="waypoint-route-card"
              onClick={() => handleOpenLightbox(idx)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(idx); }}
              aria-label={`Open preview for ${wp.milestoneLabel}: ${wp.name}`}
            >
              {/* Card Image */}
              <div className="waypoint-image-frame">
                <img 
                  src={wp.image} 
                  srcSet={wp.srcset}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={wp.alt} 
                  className="waypoint-art-img" 
                  loading={idx === 0 ? 'eager' : 'lazy'} 
                  decoding="async"
                />
                <div className="waypoint-vignette-overlay" />
                <div className="waypoint-hover-indicator" aria-hidden="true">
                  <Maximize2 size={16} />
                  <span>VIEW SCREENSHOT</span>
                </div>
                <span className="waypoint-stop-num">0{idx + 1}</span>
              </div>

              {/* Card Details: Milestone -> Category -> Title -> Desc -> Status */}
              <div className="waypoint-text-block">
                <div className="waypoint-header-row">
                  <span className="waypoint-mile-badge">{wp.milestoneLabel}</span>
                </div>
                <span className="waypoint-terrain-label">{wp.category}</span>
                <h3 className="waypoint-title-heading">{wp.name}</h3>
                <p className="waypoint-description-text">{wp.desc}</p>
                <div className="waypoint-card-status">
                  <span className="status-dot" />
                  <span>{wp.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Route Summary Note */}
        <div className="highway-expedition-note">
          <Compass size={16} className="text-amber" />
          <span>
            A connected travel corridor across fictionalized Rajasthan connecting 13 target districts, with dynamic weather, refueling stops, and vehicular persistence. Status: Jaipur is Active / Currently Playable; other regional milestones are Future Concepts.
          </span>
        </div>
      </div>

      {/* Accessible Interactive Milestone Lightbox */}
      {activeWaypoint && selectedIndex !== null && (
        <div 
          className="world-network-lightbox-overlay" 
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${activeWaypoint.name} Milestone Preview`}
        >
          <div 
            className="world-network-lightbox-dialog" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="lightbox-top-toolbar">
              <div className="lightbox-milestone-tag">
                <span className="tag-accent">{activeWaypoint.milestoneLabel}</span>
                <span className="tag-divider">•</span>
                <span className="tag-category">{activeWaypoint.category}</span>
              </div>
              <button 
                type="button" 
                className="lightbox-close-btn" 
                onClick={handleCloseLightbox}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Media Box */}
            <div className="lightbox-media-viewport">
              <img 
                src={activeWaypoint.image} 
                srcSet={activeWaypoint.srcset}
                sizes="(max-width: 1024px) 95vw, 1200px"
                alt={activeWaypoint.alt}
                className="lightbox-hero-image"
              />
              <button 
                type="button" 
                className="lightbox-nav-btn prev-btn" 
                onClick={handlePrev}
                aria-label="Previous Milestone Image"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                type="button" 
                className="lightbox-nav-btn next-btn" 
                onClick={handleNext}
                aria-label="Next Milestone Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Dossier Meta */}
            <div className="lightbox-dossier-meta">
              <div className="dossier-main-info">
                <div className="dossier-index-num">MILESTONE {activeWaypoint.num} / 06</div>
                <h3 className="dossier-location-title">{activeWaypoint.name}</h3>
                <p className="dossier-description">{activeWaypoint.desc}</p>
              </div>
              <div className="dossier-status-pill">
                <ShieldAlert size={14} className="text-amber" />
                <span>{activeWaypoint.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
