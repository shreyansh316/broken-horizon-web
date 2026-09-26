import React, { useEffect } from 'react';
import { X, ShieldAlert, Monitor, Terminal, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

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

  const isItchConfigured = Boolean(siteConfig.itchUrl && siteConfig.itchUrl.length > 0 && siteConfig.itchUrl !== '#');

  return (
    <div
      className="trailer-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-heading"
      onClick={onClose}
    >
      <div
        className="trailer-modal-wrapper download-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="trailer-modal-close"
          onClick={onClose}
          aria-label="Close modal (ESC)"
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <ShieldAlert size={24} className="text-amber" />
          <h3 id="download-modal-heading" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', margin: 0, textTransform: 'uppercase' }}>
            BUILD CLEARANCE STATUS
          </h3>
        </div>

        <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: 'var(--color-sand-200)', lineHeight: '1.6', marginBottom: '2rem' }}>
          {isItchConfigured
            ? 'Official distribution page is connected. You can proceed directly to the verified store portal.'
            : 'The first public Windows build will be released after the first major development milestone.'}
        </p>

        <div className="download-modal-specs-grid">
          <div>
            <span style={{ display: 'block', fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'var(--color-sand-muted)', marginBottom: '0.2rem' }}>
              TARGET PLATFORM
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Monitor size={14} className="text-amber" /> {siteConfig.targetPlatform}
            </span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'var(--color-sand-muted)', marginBottom: '0.2rem' }}>
              CURRENT SPRINT
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-amber-bright)' }}>
              Phase {siteConfig.developmentPhase} / {siteConfig.developmentPhaseTotal} (Pre-Alpha)
            </span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'var(--color-sand-muted)', marginBottom: '0.2rem' }}>
              DISTRIBUTION
            </span>
            <span style={{ fontSize: '0.875rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={14} className="text-amber" /> Official Itch.io Hub
            </span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'var(--color-sand-muted)', marginBottom: '0.2rem' }}>
              INTEGRITY
            </span>
            <span style={{ fontSize: '0.875rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={14} className="text-amber" /> Code-Signed Binary
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          To maintain transparency, no placeholder builds or fake release links are provided. Updating the central configuration file will instantly enable direct download access once the milestone is achieved.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {isItchConfigured ? (
            <a
              href={siteConfig.itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>PROCEED TO ITCH.IO</span>
              <span className="btn-arrow">→</span>
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-disabled"
              disabled
            >
              <span>BUILD NOT YET PUBLIC</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            <span>RETURN TO SITE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
