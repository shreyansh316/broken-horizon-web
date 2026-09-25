import React from 'react';
import { Users, AlertTriangle, ArrowRight } from 'lucide-react';
import type { CharacterProfile } from '../../data/characterData';

interface CharacterRelationshipMatrixProps {
  character: CharacterProfile;
}

export const CharacterRelationshipMatrix: React.FC<CharacterRelationshipMatrixProps> = ({
  character,
}) => {
  return (
    <div className="char-relationship-container" role="region" aria-label={`${character.name} Intelligence Network`}>
      <div className="relationship-header">
        <span className="rel-tag">TACTICAL NETWORK & TARGET MATRIX</span>
        <h3 className="rel-title">OPERATIVE NETWORK LINKAGE</h3>
        <p className="rel-desc">
          Known liaisons, informants, syndicate targets, and active adversaries connected to {character.name}.
        </p>
      </div>

      <div className="relationships-grid">
        {character.relationships.map((rel) => {
          const isAntagonist = rel.relationshipType.toLowerCase().includes('antagonist') || rel.relationshipType.toLowerCase().includes('target');

          return (
            <div key={rel.targetName} className={`relationship-card ${isAntagonist ? 'card-threat' : 'card-ally'}`}>
              <div className="rel-card-header">
                <div className="rel-type-badge">
                  {isAntagonist ? <AlertTriangle size={13} /> : <Users size={13} />}
                  <span>{rel.relationshipType.toUpperCase()}</span>
                </div>
                <span className="rel-status-tag">{isAntagonist ? 'HIGH THREAT' : 'ACTIVE ALLY'}</span>
              </div>

              <div className="rel-connection-row">
                <span className="source-name">{character.callsign}</span>
                <ArrowRight size={14} className="rel-arrow" />
                <h4 className="target-name">{rel.targetName}</h4>
              </div>

              <div className="rel-intel-box">
                <span className="intel-lead">SURVEILLANCE DOSSIER NOTES:</span>
                <p className="intel-text">{rel.intelNotes}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
