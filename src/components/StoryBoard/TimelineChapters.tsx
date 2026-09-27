import React, { useState } from 'react';
import { Compass, User, Clock, CheckCircle2 } from 'lucide-react';
import type { StoryChapter } from '../../data/storyData';

interface TimelineChaptersProps {
  chapters: StoryChapter[];
}

export const TimelineChapters: React.FC<TimelineChaptersProps> = ({ chapters }) => {
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);

  const selectedChapter =
    chapters.find((c) => c.chapterNumber === selectedChapterNumber) || chapters[0];

  return (
    <div className="timeline-chapters-container" role="region" aria-label="Branching Narrative Chapters">
      <div className="chapters-intro-row">
        <div>
          <span className="chapters-tag">NARRATIVE PROGRESSION & CHAPTERS</span>
          <h3 className="chapters-main-title">THE CORRIDOR INVESTIGATION ARC</h3>
        </div>
        <p className="chapters-intro-desc">
          Follow the 6 primary narrative arcs tracking Arjun and Kavya across the fictionalized territory of Rajasthan.
        </p>
      </div>

      <div className="chapters-layout-grid">
        {/* Chapter Steps List */}
        <div className="chapter-steps-column" role="tablist" aria-label="Story Chapters">
          {chapters.map((ch) => {
            const isSelected = selectedChapterNumber === ch.chapterNumber;
            return (
              <button
                key={ch.chapterNumber}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`chapter-step-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => setSelectedChapterNumber(ch.chapterNumber)}
              >
                <div className="step-num-bubble">
                  <span>0{ch.chapterNumber}</span>
                </div>
                <div className="step-text-wrap">
                  <span className="step-act-tag">{ch.act}</span>
                  <h4 className="step-title">{ch.title}</h4>
                </div>
                {isSelected && <CheckCircle2 size={16} className="step-active-check" />}
              </button>
            );
          })}
        </div>

        {/* Selected Chapter Detail Card */}
        <div className="chapter-detail-column">
          <div className="chapter-dossier-card">
            <div className="detail-top-tags">
              <span className="detail-act">{selectedChapter.act}</span>
              <span className={`detail-status ${selectedChapter.status === 'Available' ? 'status-avail' : 'status-dev'}`}>
                {selectedChapter.status.toUpperCase()}
              </span>
            </div>

            <h3 className="detail-chapter-title">
              CHAPTER {selectedChapter.chapterNumber}: {selectedChapter.title}
            </h3>

            <div className="detail-meta-pills">
              <div className="meta-pill">
                <Compass size={13} className="pill-icon" />
                <span>{selectedChapter.primaryLocation}</span>
              </div>
              <div className="meta-pill">
                <User size={13} className="pill-icon" />
                <span>FOCUS: {selectedChapter.protagonistFocus}</span>
              </div>
            </div>

            <div className="detail-synopsis-box">
              <h4 className="synopsis-label">NARRATIVE SYNOPSIS</h4>
              <p className="synopsis-text">{selectedChapter.synopsis}</p>
            </div>

            <div className="detail-note-callout">
              <Clock size={14} className="note-clock-icon" />
              <span>
                Branching mission outcomes influence operative trust levels, police response escalation, and access to secondary safehouses.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
