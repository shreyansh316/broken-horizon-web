import React, { useEffect } from 'react';
import { X, Play, Clock, Sparkles } from 'lucide-react';
import { gameConfig } from '../config/gameConfig';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-modal-title"
      onClick={onClose}
    >
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="badge badge-amber">MEDIA UPDATE</span>
            <h3 id="trailer-modal-title" className="modal-title">
              OFFICIAL TRAILER
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body trailer-modal-body">
          <div className="trailer-slate">
            <div className="trailer-slate-glow" />
            <div className="trailer-slate-icon">
              <Play size={44} className="text-gold" />
            </div>
            <div className="trailer-slate-text">
              <h4 className="slate-heading">Trailer coming soon.</h4>
              <p className="slate-sub">
                The first official in-engine cinematic teaser is being captured in Unreal Engine 5 as environmental lighting and vehicle physics are tuned.
              </p>
            </div>
          </div>

          <div className="modal-telemetry-box">
            <div className="modal-telemetry-row">
              <span className="telemetry-label">
                <Clock size={14} className="text-gold" /> SCHEDULED DEBUT:
              </span>
              <span className="telemetry-val">First Major Milestone Showcase</span>
            </div>
            <div className="modal-telemetry-row">
              <span className="telemetry-label">
                <Sparkles size={14} className="text-gold" /> RESOLUTION / TARGET:
              </span>
              <span className="telemetry-val">4K 60FPS In-Engine Capture</span>
            </div>
            <div className="modal-telemetry-row">
              <span className="telemetry-label">
                STATUS:
              </span>
              <span className="telemetry-val">Phase {gameConfig.developmentPhase} Scene Sequencing</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
