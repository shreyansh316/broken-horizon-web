import React from 'react';
import { X, ShieldAlert, MapPin, Calendar, Link2, Eye } from 'lucide-react';
import type { EvidenceItem } from '../../data/storyData';

interface EvidenceModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
  onSelectRelated: (evidenceId: string) => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  item,
  onClose,
  onSelectRelated,
}) => {
  if (!item) return null;

  return (
    <div
      className="evidence-modal-backdrop"
      role="dialog"
      aria-label={`Detailed Evidence Inspection: ${item.title}`}
    >
      <div className="evidence-modal-card">
        {/* Top Header */}
        <div className="modal-header-bar">
          <div className="header-meta">
            <ShieldAlert size={16} className="text-red" />
            <span className="case-ref">EVIDENCE EXHIBIT // BH-EV-{item.id.toUpperCase()}</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Evidence Viewer (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="modal-grid-layout">
          {/* Visual Presentation Frame */}
          {item.image && (
            <div className="modal-media-frame">
              <img
                src={item.image}
                alt={item.title}
                className="modal-evidence-image"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/world/world-jaipur.jpg';
                }}
              />
              <div className="modal-media-vignette" />
              <div className="evidence-classification-stamp">
                <span>EVIDENCE OF INTEREST // CONFIDENTIAL</span>
              </div>
            </div>
          )}

          {/* Dossier Analysis Notes */}
          <div className="modal-dossier-body">
            <div className="modal-meta-chips">
              <span className="chip-cat">{item.category.toUpperCase()}</span>
              <span className="chip-date">
                <Calendar size={12} />
                <span>{item.dateRecovered}</span>
              </span>
              <span className="chip-loc">
                <MapPin size={12} />
                <span>{item.recoveredLocation} ({item.districtId.toUpperCase()})</span>
              </span>
            </div>

            <h2 className="modal-evidence-title">{item.title}</h2>

            <div className="modal-section">
              <h4 className="section-label">CASE SUMMARY BRIEF</h4>
              <p className="summary-paragraph">{item.summary}</p>
            </div>

            <div className="modal-section classified-box">
              <div className="classified-header">
                <Eye size={14} className="classified-icon" />
                <span className="classified-tag">INTELLIGENCE FIELD ANALYSIS // REDACTED</span>
              </div>
              <p className="classified-paragraph">{item.classifiedNotes}</p>
            </div>

            {/* Related Evidence Connections */}
            {item.connections && item.connections.length > 0 && (
              <div className="modal-section related-connections-section">
                <h4 className="section-label">
                  <Link2 size={13} />
                  <span>LINKED EVIDENCE THREADS</span>
                </h4>
                <div className="related-links-row">
                  {item.connections.map((connId) => (
                    <button
                      key={connId}
                      type="button"
                      className="related-thread-btn"
                      onClick={() => onSelectRelated(connId)}
                      aria-label={`Jump to linked evidence ${connId}`}
                    >
                      <span>EXHIBIT // {connId.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
