import React, { useState, useEffect } from 'react';
import { Play, Pause, Radio, Volume2, ShieldAlert } from 'lucide-react';
import type { CharacterAudioLog } from '../../data/characterData';

interface CharacterAudioLogsProps {
  logs: CharacterAudioLog[];
  characterName: string;
}

export const CharacterAudioLogs: React.FC<CharacterAudioLogsProps> = ({
  logs,
  characterName,
}) => {
  const [activeLogId, setActiveLogId] = useState<string>(logs[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Stop playback when switching logs
  const handleSelectLog = (logId: string) => {
    setActiveLogId(logId);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto reset playing after a simulated duration
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        setIsPlaying(false);
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying]);

  const activeLog = logs.find((l) => l.id === activeLogId) || logs[0];

  return (
    <div className="char-audio-logs-container" role="region" aria-label={`${characterName} Encrypted Audio Intercepts`}>
      <div className="audio-header">
        <span className="audio-tag">SIGNALS INTELLIGENCE & AUDIO RECON</span>
        <h3 className="audio-title">ENCRYPTED CASSETTE & SCANNER LOGS</h3>
        <p className="audio-desc">
          De-scrambled radio broadcasts, field dictations, and police dispatch intercepts linked to {characterName}.
        </p>
      </div>

      <div className="audio-grid">
        {/* Track List */}
        <div className="audio-tracklist" role="tablist">
          {logs.map((log) => {
            const isSelected = activeLog.id === log.id;
            return (
              <button
                key={log.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`audio-track-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelectLog(log.id)}
              >
                <div className="track-status-icon">
                  <Radio size={14} className={isSelected && isPlaying ? 'icon-broadcasting' : ''} />
                </div>
                <div className="track-info-col">
                  <span className="track-timestamp">{log.timestamp}</span>
                  <h4 className="track-title">{log.title}</h4>
                </div>
                <span className="track-duration">{log.duration}</span>
              </button>
            );
          })}
        </div>

        {/* Audio Player & Transcript Terminal */}
        <div className="audio-player-col">
          <div className="player-deck">
            <div className="player-meta-top">
              <span className="player-classification">
                <ShieldAlert size={13} />
                <span>{activeLog.classification}</span>
              </span>
              <span className="player-speaker">SOURCE: {activeLog.speaker.toUpperCase()}</span>
            </div>

            <h3 className="player-title">{activeLog.title}</h3>

            {/* Simulated Animated Waveform Bars */}
            <div className={`audio-waveform-bars ${isPlaying ? 'is-active' : ''}`} aria-hidden="true">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    animationDelay: `${(i % 6) * 0.12}s`,
                    height: isPlaying ? `${Math.max(15, (i * 17) % 100)}%` : '20%',
                  }}
                />
              ))}
            </div>

            {/* Play/Pause Control Bar */}
            <div className="player-controls-row">
              <button
                type="button"
                className={`playback-toggle-btn ${isPlaying ? 'btn-playing' : ''}`}
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause audio playback' : 'Play audio intercept'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                <span>{isPlaying ? 'PAUSE INTERCEPT' : 'PLAY AUDIO LOG'}</span>
              </button>

              <div className="player-time-display">
                <Volume2 size={15} className="volume-icon" />
                <span className="time-text">{isPlaying ? '0:14' : '0:00'} / {activeLog.duration}</span>
              </div>
            </div>

            {/* Terminal Transcript Box */}
            <div className="player-transcript-box">
              <span className="transcript-lead">DECRYPTED VERBATIM TRANSCRIPT //</span>
              <p className="transcript-body">&ldquo;{activeLog.transcript}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
