import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface IntroAudioControlProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export const IntroAudioControl: React.FC<IntroAudioControlProps> = ({ isEnabled, onToggle }) => {
  return (
    <button
      type="button"
      className="intro-audio-btn"
      onClick={onToggle}
      aria-label={isEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
    >
      {isEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span>{isEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
    </button>
  );
};
