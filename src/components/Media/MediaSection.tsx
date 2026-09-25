import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface MediaItem {
  id: string;
  title: string;
  location: string;
  image: string;
}

export const MediaSection: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<MediaItem | null>(null);

  const captures: MediaItem[] = [
    {
      id: 'cap-01',
      title: 'Night Highway Pursuit',
      location: 'NH-62 Jodhpur Sector',
      image: '/assets/images/screenshots/screenshot-01.jpg',
    },
    {
      id: 'cap-02',
      title: 'Dune Flotation Traverse',
      location: 'Thar Desert Basin',
      image: '/assets/images/screenshots/screenshot-02.jpg',
    },
    {
      id: 'cap-03',
      title: 'Aravalli Mountain Ridge',
      location: 'Udaipur Highway Pass',
      image: '/assets/images/screenshots/screenshot-03.jpg',
    },
    {
      id: 'cap-04',
      title: 'Subterranean Telemetry Array',
      location: 'Chambal Underground Complex',
      image: '/assets/images/screenshots/screenshot-04.jpg',
    },
    {
      id: 'cap-05',
      title: 'Pink City Bypass Dawn',
      location: 'Jaipur Ring Road',
      image: '/assets/images/screenshots/screenshot-01.jpg',
    },
    {
      id: 'cap-06',
      title: 'Salt Flat Speed Run',
      location: 'Sambhar Dry Basin',
      image: '/assets/images/screenshots/screenshot-02.jpg',
    },
    {
      id: 'cap-07',
      title: 'Stepwell Reconnaissance',
      location: 'Dausa Ancient Reservoirs',
      image: '/assets/images/screenshots/screenshot-03.jpg',
    },
    {
      id: 'cap-08',
      title: 'Jaisalmer Fortress Silhouette',
      location: 'Western Bastion Perimeter',
      image: '/assets/images/screenshots/screenshot-04.jpg',
    },
  ];

  return (
    <section className="media-vault-stage" id="media" aria-label="Media & Captures">
      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">VISUAL ARCHIVE</span>
          <h2 className="lead-headline">IN-ENGINE CAPTURES & VISUAL STUDIES</h2>
          <p className="lead-subcopy">Visual studies and in-engine environment renders developed for Unreal Engine 4.27 on PC hardware.</p>
        </div>

        {/* 2x4 Clean Bento Grid */}
        <div className="media-grid-clean">
          {captures.map((item) => (
            <div
              key={item.id}
              className="media-card-frame"
              onClick={() => setActiveLightbox(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="media-card-img"
                loading="lazy"
              />
              <div className="media-card-gradient" />

              {/* Hover Overlay with Location Title */}
              <div className="media-card-hover-info">
                <span className="media-hover-location">{item.location}</span>
                <h4 className="media-hover-title">{item.title}</h4>
                <div className="media-expand-icon">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="media-lightbox-overlay" onClick={() => setActiveLightbox(null)}>
          <div className="media-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-trigger"
              onClick={() => setActiveLightbox(null)}
              aria-label="Close Preview"
            >
              <X size={24} />
            </button>
            <img
              src={activeLightbox.image}
              alt={activeLightbox.title}
              className="lightbox-full-img"
            />
            <div className="lightbox-caption-bar">
              <div>
                <h3 className="lightbox-caption-title">{activeLightbox.title}</h3>
                <span className="lightbox-caption-location">{activeLightbox.location}</span>
              </div>
              <span className="lightbox-4k-badge">IN-ENGINE VISUAL STUDY</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
