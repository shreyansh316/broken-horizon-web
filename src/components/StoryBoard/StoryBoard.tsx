import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, User, FileText, GitBranch, ShieldAlert } from 'lucide-react';
import { storyInvestigationData, type EvidenceItem } from '../../data/storyData';
import { EvidenceCard } from './EvidenceCard';
import { EvidenceModal } from './EvidenceModal';
import { TimelineChapters } from './TimelineChapters';

interface StoryBoardProps {
  onBackToHome: () => void;
  onNavigateToWorld?: () => void;
  onNavigateToCharacters?: () => void;
}

export const StoryBoard: React.FC<StoryBoardProps> = ({
  onBackToHome,
  onNavigateToWorld,
  onNavigateToCharacters,
}) => {
  const [boardMode, setBoardMode] = useState<'board' | 'timeline'>('board');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedEvidence) {
        setSelectedEvidence(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEvidence]);

  const handleSelectRelated = (evidenceId: string) => {
    const nextItem = storyInvestigationData.evidenceItems.find((e) => e.id === evidenceId);
    if (nextItem) setSelectedEvidence(nextItem);
  };

  // Pre-calculate red thread lines between connected evidence pins
  const threadConnections = React.useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    const itemMap = new Map(storyInvestigationData.evidenceItems.map(item => [item.id, item]));

    storyInvestigationData.evidenceItems.forEach(item => {
      item.connections.forEach(targetId => {
        const target = itemMap.get(targetId);
        if (target && item.id < target.id) {
          lines.push({
            id: `thread-${item.id}-${target.id}`,
            x1: item.pinPosition.x,
            y1: item.pinPosition.y,
            x2: target.pinPosition.x,
            y2: target.pinPosition.y,
          });
        }
      });
    });

    return lines;
  }, []);

  return (
    <div className="story-board-root" role="main" aria-label="Broken Horizon Story and Investigation Board">
      {/* Top Header Navigation */}
      <header className="story-header-nav">
        <div className="story-nav-left">
          <button
            type="button"
            className="story-back-btn"
            onClick={onBackToHome}
            aria-label="Return to Main Homepage"
          >
            <ArrowLeft size={16} />
            <span>MAIN SITE</span>
          </button>

          <div className="story-header-divider" aria-hidden="true" />

          <div className="story-title-meta">
            <span className="story-lead">{storyInvestigationData.caseTitle}</span>
            <span className="story-sub">{storyInvestigationData.caseFileNumber}</span>
          </div>
        </div>

        {/* View Switcher: Corkboard vs Chapter Timeline */}
        <div className="story-nav-center">
          <div className="story-mode-toggle" role="radiogroup" aria-label="Investigation View Switcher">
            <button
              type="button"
              role="radio"
              aria-checked={boardMode === 'board'}
              className={`mode-toggle-btn ${boardMode === 'board' ? 'is-active' : ''}`}
              onClick={() => setBoardMode('board')}
            >
              <FileText size={14} />
              <span>CONSPIRACY CORKBOARD</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={boardMode === 'timeline'}
              className={`mode-toggle-btn ${boardMode === 'timeline' ? 'is-active' : ''}`}
              onClick={() => setBoardMode('timeline')}
            >
              <GitBranch size={14} />
              <span>CHAPTER TIMELINE</span>
            </button>
          </div>
        </div>

        {/* Quick Nav to other experiences */}
        <div className="story-nav-right">
          {onNavigateToWorld && (
            <button
              type="button"
              className="story-quick-btn"
              onClick={onNavigateToWorld}
              aria-label="Open World Explorer Atlas"
            >
              <MapPin size={14} />
              <span>TERRITORY ATLAS</span>
            </button>
          )}

          {onNavigateToCharacters && (
            <button
              type="button"
              className="story-quick-btn"
              onClick={onNavigateToCharacters}
              aria-label="Open Character Dossiers"
            >
              <User size={14} />
              <span>OPERATIVES</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Investigation Stage */}
      <div className="story-stage-canvas">
        {boardMode === 'board' ? (
          <div className="corkboard-wrapper" role="region" aria-label="Tactical Case Corkboard">
            {/* Top Case Briefing Banner */}
            <div className="corkboard-dossier-bar">
              <div className="corkboard-dossier-left">
                <ShieldAlert size={16} className="text-amber" />
                <span className="status-label">{storyInvestigationData.caseStatus}</span>
              </div>
              <p className="corkboard-premise-text">{storyInvestigationData.centralConspiracy}</p>
            </div>

            {/* Corkboard Surface with SVG Thread Lines */}
            <div className="corkboard-surface">
              {/* SVG Connecting Red Thread Layer */}
              <svg className="corkboard-threads-svg" aria-hidden="true">
                <defs>
                  <filter id="string-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.8)" />
                  </filter>
                </defs>

                {threadConnections.map((line) => (
                  <line
                    key={line.id}
                    x1={`${line.x1}%`}
                    y1={`${line.y1}%`}
                    x2={`${line.x2}%`}
                    y2={`${line.y2}%`}
                    stroke="#d93b3b"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="red-thread-line"
                    filter="url(#string-glow)"
                  />
                ))}
              </svg>

              {/* Pinned Evidence Exhibits */}
              {storyInvestigationData.evidenceItems.map((item) => (
                <EvidenceCard
                  key={item.id}
                  item={item}
                  isSelected={selectedEvidence?.id === item.id}
                  onSelect={(ev) => setSelectedEvidence(ev)}
                />
              ))}
            </div>

            {/* Mobile / Accessible Instruction Notice */}
            <div className="corkboard-notice-bar">
              <span>CLICK ANY EXHIBIT TO INSPECT CLASSIFIED INTELLIGENCE & LINKED THREADS</span>
            </div>
          </div>
        ) : (
          <div className="chapters-wrapper">
            <TimelineChapters chapters={storyInvestigationData.chapters} />
          </div>
        )}
      </div>

      {/* Fullscreen Evidence Modal */}
      <EvidenceModal
        item={selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
        onSelectRelated={handleSelectRelated}
      />
    </div>
  );
};
