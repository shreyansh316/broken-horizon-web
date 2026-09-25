import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gameConfig } from '../../data/gameConfig';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="trailer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Broken Horizon Trailer"
      onClick={onClose}
    >
      <div className="trailer-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="trailer-modal-close"
          onClick={onClose}
          aria-label="Close trailer modal (ESC)"
        >
          <X size={26} />
        </button>

        <div className="trailer-modal-viewport">
          <video
            ref={videoRef}
            src={gameConfig.trailerLocalPath}
            poster={gameConfig.trailerPosterPath}
            controls
            autoPlay
            playsInline
            className="trailer-html5-video"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="trailer-modal-caption">
          <div className="trailer-caption-brand">BROKEN HORIZON // OFFICIAL IN-ENGINE TEASER</div>
          <div className="trailer-caption-note">
            Target capture: 4K 60FPS Unreal Engine 4.27. Official teaser currently rendering in pre-alpha pipeline.
          </div>
        </div>
      </div>
    </div>
  );
};
