import React, { useState } from 'react';
import { developmentTimeline } from '../../data/developmentData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ChevronDown, CheckCircle2, Clock } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(developmentTimeline[0].id);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-wrapper news-timeline-section" id="news" aria-label="Development Log Timeline">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={`editorial-header reveal-on-scroll ${headerVisible ? 'is-visible' : ''}`}>
          <span className="editorial-tag">MILESTONE TIMELINE</span>
          <h2 className="editorial-title">DEVELOPMENT LOG</h2>
          <p className="editorial-subtitle">
            Sprint-by-sprint architectural milestones. No artificial public release claims.
          </p>
        </div>

        {/* Development Timeline Stack */}
        <div className="dev-timeline-stack" role="feed" aria-label="Timeline of Development Sprints">
          {developmentTimeline.map((item) => {
            const isExpanded = expandedId === item.id;
            const isCompleted = item.status === 'COMPLETED';

            return (
              <article
                key={item.id}
                className={`timeline-entry-row ${isExpanded ? 'is-expanded' : ''}`}
              >
                <div
                  className="timeline-row-trigger"
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                >
                  <div className="timeline-phase-badge">
                    <span className="phase-pill">{item.phaseCode}</span>
                    <span className={`status-pill ${isCompleted ? 'status-done' : 'status-active'}`}>
                      {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {item.status}
                    </span>
                  </div>

                  <div className="timeline-title-col">
                    <h3 className="timeline-item-title">{item.title}</h3>
                    <p className="timeline-item-summary">{item.summary}</p>
                  </div>

                  <div className="timeline-toggle-icon">
                    <ChevronDown size={20} className={`chevron-rotate ${isExpanded ? 'rotated' : ''}`} />
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="timeline-expanded-tray" aria-label="Sprint Highlights">
                    <div className="tray-inner">
                      <span className="tray-header">SPRINT DELIVERABLES & VERIFICATION:</span>
                      <ul className="tray-list">
                        {item.highlights.map((hl, idx) => (
                          <li key={idx} className="tray-list-item">
                            <span className="tray-dot" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
