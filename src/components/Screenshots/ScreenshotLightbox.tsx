import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { screenshotsData, type ScreenshotItem } from '../../data/mediaData';

interface ScreenshotLightboxProps {
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  const isOpen = currentIndex !== null;
  const currentItem: ScreenshotItem | null = isOpen ? screenshotsData[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + screenshotsData.length) % screenshotsData.length);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % screenshotsData.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose, onSelectIndex]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + screenshotsData.length) % screenshotsData.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % screenshotsData.length);
  };

  return (
    <div
      className="screenshot-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot Lightbox Preview"
      onClick={onClose}
    >
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Top Bar with Title and Close */}
        <div className="lightbox-top-bar">
          <div className="lightbox-title-wrap">
            <span className="lightbox-location-tag">{currentItem.location}</span>
            <h3 className="lightbox-image-title">{currentItem.title}</h3>
          </div>
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close Lightbox (ESC)"
          >
            <X size={26} />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="lightbox-stage">
          <button
            type="button"
            className="lightbox-nav-btn btn-prev"
            onClick={handlePrev}
            aria-label="Previous screenshot (Left Arrow)"
          >
            <ArrowLeft size={28} />
          </button>

          <div className="lightbox-img-wrapper">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="lightbox-full-img"
            />
          </div>

          <button
            type="button"
            className="lightbox-nav-btn btn-next"
            onClick={handleNext}
            aria-label="Next screenshot (Right Arrow)"
          >
            <ArrowRight size={28} />
          </button>
        </div>

        {/* Bottom Bar with Caption and 01 / 08 Counter */}
        <div className="lightbox-bottom-bar">
          <p className="lightbox-caption">{currentItem.caption}</p>
          <div className="lightbox-counter" aria-live="polite">
            <span className="counter-current">{currentItem.number}</span>
            <span className="counter-slash">/</span>
            <span className="counter-total">0{screenshotsData.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
