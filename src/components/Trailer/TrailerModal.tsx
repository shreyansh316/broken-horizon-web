import React, { useEffect, useRef, useState } from 'react';
import { X, Clock, Sparkles, Film } from 'lucide-react';
import { gameConfig } from '../../data/gameConfig';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const modalWrapperRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPlayable, setVideoPlayable] = useState<boolean>(gameConfig.hasPlayableVideo ?? true);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  // Focus management, scroll lock, and keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    // Capture the trigger element that opened the modal so focus can return cleanly
    triggerElementRef.current = document.activeElement as HTMLElement | null;

    // Lock body scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button once mounted
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      // Accessible Focus Trap within modal
      if (e.key === 'Tab' && modalWrapperRef.current) {
        const focusableElements = modalWrapperRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
      }

      // Return focus to the trigger element that opened the modal
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="trailer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-modal-title"
      aria-describedby="trailer-modal-desc"
      onClick={handleClose}
    >
      <div
        className="trailer-modal-wrapper"
        ref={modalWrapperRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="trailer-modal-topbar">
          <div className="trailer-modal-badge-group">
            <span className="trailer-badge-pulse" aria-hidden="true" />
            <span className="trailer-modal-badge">
              {videoPlayable ? 'BROKEN HORIZON' : 'TRAILER IN PRODUCTION'}
            </span>
            <span className="trailer-modal-tag">
              HINDI GAME TRAILER
            </span>
            <span className="trailer-modal-subtag">
              THE FIRST WRONG TURN
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="trailer-modal-close"
            onClick={handleClose}
            aria-label="Close trailer modal (ESC)"
            title="Close trailer modal (ESC)"
          >
            <span className="trailer-close-text">CLOSE [ESC]</span>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* 16:9 Cinema Viewport */}
        <div className="trailer-modal-viewport">
          {videoPlayable ? (
            <video
              ref={videoRef}
              src={gameConfig.trailerLocalPath}
              poster={gameConfig.trailerPosterPath}
              controls
              autoPlay={false}
              muted={false}
              playsInline
              preload="metadata"
              className="trailer-html5-video"
              onError={() => setVideoPlayable(false)}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="trailer-modal-slate">
              <picture className="trailer-slate-poster-wrap">
                <source
                  media="(max-width: 768px)"
                  srcSet={gameConfig.trailerPosterMobilePath}
                  type="image/webp"
                />
                <source
                  srcSet={gameConfig.trailerPosterPath}
                  type="image/webp"
                />
                <img
                  src={gameConfig.trailerPosterJpgPath || gameConfig.trailerPosterPath}
                  alt="Broken Horizon — Official Hindi Game Trailer Poster"
                  className="trailer-slate-poster-img"
                  width="1376"
                  height="768"
                />
              </picture>

              {/* Dark Vignette Overlay */}
              <div className="trailer-slate-overlay" />

              {/* Central Coming Soon Slate */}
              <div className="trailer-slate-content">
                <div className="trailer-slate-icon-ring" aria-hidden="true">
                  <Film size={36} className="text-amber-glow" />
                </div>

                <div className="trailer-slate-header">
                  <span className="trailer-slate-eyebrow">BROKEN HORIZON // HINDI GAME TRAILER</span>
                  <h3 id="trailer-modal-title" className="trailer-slate-title">
                    TRAILER COMING SOON
                  </h3>
                  <div className="trailer-slate-subtitle">
                    THE FIRST WRONG TURN
                  </div>
                </div>

                <p id="trailer-modal-desc" className="trailer-slate-desc">
                  A cinematic first look into the mystery behind Broken Horizon. The official pre-alpha reveal teaser is currently rendering in Unreal Engine 4.27.
                </p>

                {/* Production Telemetry Grid */}
                <div className="trailer-telemetry-grid">
                  <div className="telemetry-pill">
                    <Clock size={13} className="telemetry-icon" aria-hidden="true" />
                    <span className="telemetry-key">SCHEDULED DEBUT:</span>
                    <span className="telemetry-val">Jaipur Playable Slice Showcase</span>
                  </div>
                  <div className="telemetry-pill">
                    <Sparkles size={13} className="telemetry-icon" aria-hidden="true" />
                    <span className="telemetry-key">TARGET FIDELITY:</span>
                    <span className="telemetry-val">4K 60FPS · Unreal Engine 4.27</span>
                  </div>
                </div>

                <div className="trailer-slate-actions">
                  <button
                    type="button"
                    className="btn btn-secondary trailer-dismiss-btn"
                    onClick={handleClose}
                  >
                    RETURN TO SITE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div className="trailer-modal-caption">
          <div className="trailer-caption-brand">
            BROKEN HORIZON // THE FIRST WRONG TURN — HINDI GAME TRAILER
          </div>
          <div className="trailer-caption-note">
            Spoken dialogue in natural Indian Hindi. In-engine physical materials, dynamic vehicle physics, and Rajasthan environmental ambience.
          </div>
        </div>
      </div>
    </div>
  );
};

