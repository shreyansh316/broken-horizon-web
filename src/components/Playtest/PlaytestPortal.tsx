import React, { useState, useEffect } from 'react';
import { playtestService } from '../../services/playtestService';
import type { PlaytestApplication } from '../../types/playtest';
import {
  ShieldCheck,
  Download,
  AlertOctagon,
  ArrowLeft,
  FileCode,
  Bug,
  CheckCircle,
} from 'lucide-react';
import '../../styles/playtestAdmin.css';

interface PlaytestPortalProps {
  onBackToHome: () => void;
  tokenFromUrl?: string;
}

export const PlaytestPortal: React.FC<PlaytestPortalProps> = ({ onBackToHome, tokenFromUrl }) => {
  const [token] = useState<string>(() => {
    if (tokenFromUrl) return tokenFromUrl;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('token') || '';
    }
    return '';
  });

  const [verifiedApp, setVerifiedApp] = useState<PlaytestApplication | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const [bugReportText, setBugReportText] = useState('');
  const [bugReportSubmitted, setBugReportSubmitted] = useState(false);

  useEffect(() => {
    setIsValidating(true);
    const result = playtestService.verifyAccessToken(token);
    if (result.valid && result.application) {
      setVerifiedApp(result.application);
    } else {
      setVerifiedApp(null);
    }
    setIsValidating(false);
  }, [token]);

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugReportText.trim()) return;
    setBugReportSubmitted(true);
    setBugReportText('');
  };

  if (isValidating) {
    return (
      <div className="playtest-portal-stage">
        <div className="portal-hero-frame" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <span className="auth-lead-tag">VERIFYING CLEARANCE TOKEN...</span>
        </div>
      </div>
    );
  }

  // Token invalid or unverified screen
  if (!verifiedApp) {
    return (
      <div className="playtest-portal-stage">
        <div className="portal-hero-frame">
          <div className="portal-header-zone">
            <div className="portal-badge-row">
              <span
                style={{
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '0.35rem 0.75rem',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <AlertOctagon size={14} />
                <span>ACCESS RESTRICTED</span>
              </span>
            </div>
            <h1 className="portal-headline">CLEARANCE REQUIRED</h1>
            <p className="portal-subheadline">NO VALID PRE-ALPHA TOKEN DETECTED</p>
          </div>

          <div className="portal-body-zone">
            <p style={{ color: '#a1a1aa', lineHeight: 1.7, margin: 0 }}>
              The provided clearance link is missing, expired, or pending officer review. If you have already applied, check your inbox for an official clearance dispatch once your test wave opens.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={onBackToHome}
                className="btn-portal-download"
                style={{ background: '#1f2228', borderColor: '#3f3f46' }}
              >
                <ArrowLeft size={16} />
                <span>RETURN TO PUBLIC PORTAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verified Playtest Access Screen
  return (
    <div className="playtest-portal-stage">
      <div className="portal-hero-frame">
        {/* Header */}
        <div className="portal-header-zone">
          <div className="portal-badge-row">
            <span className="portal-verified-tag">
              <ShieldCheck size={14} />
              <span>ACCESS VERIFIED // CLEARED OPERATIVE</span>
            </span>
            <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.75rem', color: '#71717a' }}>
              OPERATIVE // <strong style={{ color: '#ffffff' }}>{verifiedApp.callsign}</strong>
            </span>
          </div>
          <h1 className="portal-headline">PLAYTEST CLEARANCE</h1>
          <p className="portal-subheadline">WINDOWS PC // MILESTONE 1 BUILD ACCESS</p>
        </div>

        {/* Main Body */}
        <div className="portal-body-zone">
          {/* Download Action Card */}
          <div className="portal-download-hero-card">
            <div className="portal-download-meta">
              <span className="build-name-label">Broken Horizon — Milestone 1 (Pre-Alpha)</span>
              <span className="build-specs-label">
                Target: Windows 10/11 x64 • DirectX 11/12 • Est. Size: ~1.2 GB
              </span>
            </div>

            <a
              href="https://samwooduis.itch.io/broken-horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-portal-download"
            >
              <Download size={18} />
              <span>DOWNLOAD VIA ITCH.IO HUB</span>
            </a>
          </div>

          {/* Milestone Briefing & Patch Notes */}
          <div className="portal-briefing-accordion">
            <div className="briefing-title">
              <FileCode size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
              MILESTONE 1 BRIEFING &amp; FOCUS AREAS
            </div>
            <ul className="briefing-list">
              <li>
                <strong>Vehicular Sand Dynamics:</strong> Test 4x4 low-gear traction and high-speed drift physics across Jaipur-Dausa gravel paths.
              </li>
              <li>
                <strong>Tactical Field Intercepts:</strong> Verify audio logs and investigative camera zoom functionality near Horizon Corridor checkpoints.
              </li>
              <li>
                <strong>Performance &amp; Frame Pacing:</strong> Report stutter or streaming hitches when transitioning between urban bypass and desert flats.
              </li>
            </ul>
          </div>

          {/* Telemetry / Bug Report Dispatch */}
          <div style={{ backgroundColor: '#0f1115', border: '1px solid #1f2228', padding: '1.5rem' }}>
            <div className="briefing-title">
              <Bug size={14} style={{ display: 'inline', marginRight: '0.4rem', color: '#ea580c' }} />
              FIELD TELEMETRY &amp; BUG DISPATCH
            </div>
            {!bugReportSubmitted ? (
              <form onSubmit={handleBugSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea
                  value={bugReportText}
                  onChange={(e) => setBugReportText(e.target.value)}
                  placeholder="Describe vehicle anomalies, framerate dips, or collision clipping..."
                  className="notes-textarea"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="btn-auth-submit"
                  style={{ alignSelf: 'flex-start', marginTop: 0 }}
                >
                  TRANSMIT BUG REPORT
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontSize: '0.85rem' }}>
                <CheckCircle size={16} />
                <span>Telemetry log submitted to engineering desk. Thank you, operative.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="portal-footer-bar">
          <button type="button" onClick={onBackToHome} className="auth-return-btn">
            <ArrowLeft size={14} />
            <span>RETURN TO PUBLIC PORTAL</span>
          </button>
          <span style={{ fontFamily: 'Courier New, monospace', fontSize: '0.72rem', color: '#52525b' }}>
            BROKEN HORIZON // CONFIDENTIAL PRE-ALPHA DEPLOYMENT
          </span>
        </div>
      </div>
    </div>
  );
};
