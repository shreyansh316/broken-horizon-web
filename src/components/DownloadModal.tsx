import React, { useEffect } from 'react';
import { X, ShieldAlert, Monitor, Terminal, CheckCircle2 } from 'lucide-react';
import { gameConfig } from '../config/gameConfig';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
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

  const isDownloadConfigured = gameConfig.downloadURL !== '#';

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onClick={onClose}
    >
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="badge badge-amber">BUILD PIPELINE</span>
            <h3 id="download-modal-title" className="modal-title">
              PLAY BROKEN HORIZON
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

        <div className="modal-body download-modal-body">
          <div className="download-modal-lead">
            <ShieldAlert size={28} className="text-gold" />
            <div>
              <h4 className="modal-lead-title">
                {isDownloadConfigured
                  ? 'Official Release Hub Connected'
                  : 'Coming with the First Public Milestone'}
              </h4>
              <p className="modal-lead-desc">
                {isDownloadConfigured
                  ? 'You are being redirected to the official game distribution page.'
                  : 'The first public Windows build will be released after the first major development milestone.'}
              </p>
            </div>
          </div>

          <div className="download-status-card">
            <div className="status-grid-item">
              <span className="status-item-label">CURRENT STATUS</span>
              <span className="status-item-value text-gold">
                Phase {gameConfig.developmentPhase} of {gameConfig.developmentPhaseTotal} (Pre-Alpha)
              </span>
            </div>
            <div className="status-grid-item">
              <span className="status-item-label">TARGET PLATFORM</span>
              <span className="status-item-value">
                <Monitor size={14} /> {gameConfig.targetPlatform}
              </span>
            </div>
            <div className="status-grid-item">
              <span className="status-item-label">DISTRIBUTION CHANNEL</span>
              <span className="status-item-value">
                <Terminal size={14} /> Official Itch.io Release Portal
              </span>
            </div>
            <div className="status-grid-item">
              <span className="status-item-label">SECURITY CLEARANCE</span>
              <span className="status-item-value">
                <CheckCircle2 size={14} className="text-gold" /> Code-Signed Windows Installer
              </span>
            </div>
          </div>

          <p className="modal-fine-note">
            To ensure zero false expectations, no public binaries are distributed before stability verification. Once ready, the download link in our central configuration will connect directly to the itch.io page.
          </p>
        </div>

        <div className="modal-footer">
          {isDownloadConfigured ? (
            <a
              href={gameConfig.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary modal-btn"
            >
              PROCEED TO ITCH.IO
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-primary modal-btn btn-disabled"
              disabled
              aria-disabled="true"
            >
              BUILD NOT YET PUBLIC
            </button>
          )}
          <button type="button" className="btn btn-secondary modal-btn" onClick={onClose}>
            Back to Site
          </button>
        </div>
      </div>
    </div>
  );
};
