import React, { useState } from 'react';
import { ArrowLeft, User, Wrench, Shield, Radio, Users, MapPin } from 'lucide-react';
import { characterProfiles } from '../../data/characterData';
import { CharacterDossierCard } from './CharacterDossierCard';
import { CharacterLoadout } from './CharacterLoadout';
import { CharacterVehicleSpecs } from './CharacterVehicleSpecs';
import { CharacterAudioLogs } from './CharacterAudioLogs';
import { CharacterRelationshipMatrix } from './CharacterRelationshipMatrix';

type CharacterTab = 'overview' | 'gear' | 'vehicle' | 'audio' | 'network';

interface CharacterExplorerProps {
  onBackToHome: () => void;
  onNavigateToWorld?: () => void;
  onNavigateToStory?: () => void;
  initialCharacterId?: string;
}

export const CharacterExplorer: React.FC<CharacterExplorerProps> = ({
  onBackToHome,
  onNavigateToWorld,
  onNavigateToStory,
  initialCharacterId = 'arjun-mehta',
}) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(initialCharacterId);
  const [activeTab, setActiveTab] = useState<CharacterTab>('overview');

  const activeCharacter =
    characterProfiles.find((c) => c.id === selectedCharacterId) || characterProfiles[0];

  return (
    <div className="character-explorer-root" role="main" aria-label="Broken Horizon Character Dossiers">
      {/* Top Tactical Navigation */}
      <header className="char-exp-header">
        <div className="char-nav-left">
          <button
            type="button"
            className="char-back-btn"
            onClick={onBackToHome}
            aria-label="Return to Main Homepage"
          >
            <ArrowLeft size={16} />
            <span>MAIN SITE</span>
          </button>

          <div className="char-header-title-block">
            <span className="char-header-lead">BROKEN HORIZON</span>
            <span className="char-header-sub">OPERATIVE DOSSIERS & INTEL</span>
          </div>
        </div>

        <div className="char-nav-right">
          {onNavigateToWorld && (
            <button
              type="button"
              className="char-quick-nav-btn"
              onClick={onNavigateToWorld}
              aria-label="Open World Explorer Atlas"
            >
              <MapPin size={14} />
              <span>TERRITORY ATLAS</span>
            </button>
          )}

          {onNavigateToStory && (
            <button
              type="button"
              className="char-quick-nav-btn"
              onClick={onNavigateToStory}
              aria-label="Open Investigation Board"
            >
              <Shield size={14} />
              <span>CASE FILES</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Stage Container */}
      <div className="char-exp-stage">
        {/* Character Switcher Selector */}
        <div className="char-selector-bar" role="tablist" aria-label="Select Operative">
          {characterProfiles.map((char, idx) => {
            const isSelected = selectedCharacterId === char.id;
            return (
              <button
                key={char.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`char-hero-select-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  setSelectedCharacterId(char.id);
                  setActiveTab('overview');
                }}
              >
                <span className="char-idx">0{idx + 1}</span>
                <div className="char-btn-info">
                  <span className="char-btn-name">{char.name}</span>
                  <span className="char-btn-role">{char.role}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dossier Sub-Navigation Tabs */}
        <div className="char-tabs-strip" role="tablist" aria-label="Dossier Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            className={`dossier-tab-btn ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <User size={14} />
            <span>DOSSIER OVERVIEW</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'gear'}
            className={`dossier-tab-btn ${activeTab === 'gear' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('gear')}
          >
            <Wrench size={14} />
            <span>LOADOUT & GEAR</span>
          </button>

          {activeCharacter.vehicle && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'vehicle'}
              className={`dossier-tab-btn ${activeTab === 'vehicle' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('vehicle')}
            >
              <Shield size={14} />
              <span>VEHICLE & MOBILITY</span>
            </button>
          )}

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'audio'}
            className={`dossier-tab-btn ${activeTab === 'audio' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            <Radio size={14} />
            <span>AUDIO LOGS & WIRETAPS</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'network'}
            className={`dossier-tab-btn ${activeTab === 'network' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('network')}
          >
            <Users size={14} />
            <span>NETWORK & TARGET MATRIX</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="char-content-canvas">
          {activeTab === 'overview' && (
            <CharacterDossierCard character={activeCharacter} />
          )}

          {activeTab === 'gear' && (
            <CharacterLoadout
              gearItems={activeCharacter.gear}
              characterName={activeCharacter.name}
            />
          )}

          {activeTab === 'vehicle' && activeCharacter.vehicle && (
            <CharacterVehicleSpecs
              vehicle={activeCharacter.vehicle}
              driverName={activeCharacter.name}
            />
          )}

          {activeTab === 'audio' && (
            <CharacterAudioLogs
              logs={activeCharacter.audioLogs}
              characterName={activeCharacter.name}
            />
          )}

          {activeTab === 'network' && (
            <CharacterRelationshipMatrix character={activeCharacter} />
          )}
        </div>
      </div>
    </div>
  );
};
