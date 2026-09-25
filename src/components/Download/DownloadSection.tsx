import React, { useState } from 'react';
import { ShieldCheck, Check, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { playtestService } from '../../services/playtestService';

interface DownloadSectionProps {
  onOpenDownloadModal?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = () => {
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [duplicateMsg, setDuplicateMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setDuplicateMsg(null);

    if (!callsign.trim() || !email.trim()) {
      setErrorMsg('PLEASE ENTER BOTH AN OPERATIVE CALLSIGN AND VALID EMAIL ADDRESS.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await playtestService.apply(callsign, email, honeypot);

      if (response.success) {
        setIsSubmitted(true);
      } else if (response.status === 'duplicate') {
        setDuplicateMsg(response.message);
      } else {
        setErrorMsg(response.message || 'REQUEST COULD NOT BE COMPLETED. PLEASE TRY AGAIN.');
      }
    } catch {
      setErrorMsg('NETWORK ERROR: Could not transmit clearance application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setCallsign('');
    setEmail('');
    setIsSubmitted(false);
    setErrorMsg(null);
    setDuplicateMsg(null);
  };

  return (
    <section className="playtest-funnel-stage" id="access" aria-label="Join Closed Playtest">
      <div className="section-container">
        <div className="playtest-centered-box">
          <span className="lead-eyebrow">PRE-ALPHA CLEARANCE</span>
          <h2 className="playtest-headline">JOIN THE CLOSED PLAYTEST</h2>
          <p className="playtest-subcopy">
            Sign up with your operative callsign and email for closed Windows PC playtest waves and direct development dispatches.
          </p>

          {/* Duplicate Alert Banner */}
          {duplicateMsg && (
            <div
              style={{
                backgroundColor: '#14171d',
                border: '1px solid #f59e0b',
                color: '#fef3c7',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
              }}
              role="alert"
            >
              <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: '#f59e0b', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>
                  APPLICATION ALREADY RECEIVED
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.5 }}>
                  Your playtest request is already logged in the system. Check your inbox (including spam) for future wave clearance dispatches.
                </span>
              </div>
            </div>
          )}

          {/* Generic Error Banner */}
          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '0.9rem 1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                fontSize: '0.82rem',
                fontFamily: 'Courier New, monospace',
              }}
              role="alert"
            >
              {errorMsg}
            </div>
          )}

          {!isSubmitted ? (
            <form className="playtest-form-clean" onSubmit={handleSubmit} noValidate>
              {/* Anti-Bot Honeypot Field (Invisible to Real Users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website_verification_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="form-inputs-row">
                <input
                  type="text"
                  placeholder="OPERATIVE CALLSIGN (e.g. RAVEN01)"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="playtest-text-input"
                  aria-label="Operative Callsign"
                  autoComplete="off"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="playtest-text-input"
                  aria-label="Email Address"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  className="btn-playtest-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>REQUESTING ACCESS...</span>
                      <RefreshCw size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>REQUEST ACCESS</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              <div className="playtest-form-meta">
                <span>Your email is used for Broken Horizon playtest communication only. No spam.</span>
                <span className="meta-sep">•</span>
                <a
                  href="https://samwooduis.itch.io/broken-horizon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="itch-direct-link"
                >
                  Official Itch.io Page ↗
                </a>
              </div>
            </form>
          ) : (
            <div className="playtest-confirmed-card">
              <div className="confirmed-icon">
                <Check size={28} />
              </div>
              <h3 className="confirmed-title">APPLICATION RECEIVED</h3>
              <p className="confirmed-msg">
                Your operative file for <strong>{callsign.toUpperCase()}</strong> has been logged in the pre-alpha clearance queue. A confirmation dispatch has been sent to <strong>{email}</strong>.
              </p>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: '0.5rem 0 1.25rem 0', fontFamily: 'Courier New, monospace' }}>
                If you do not see the confirmation email in your primary inbox, please check your spam folder.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div className="confirmed-badge">
                  <ShieldCheck size={16} />
                  <span>QUEUED FOR WAVE 01</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  style={{
                    background: 'transparent',
                    border: '1px solid #3f3f46',
                    color: '#a1a1aa',
                    padding: '0.4rem 0.85rem',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  SUBMIT ANOTHER CALLSIGN
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
