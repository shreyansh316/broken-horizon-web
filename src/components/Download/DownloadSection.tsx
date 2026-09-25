import React, { useState } from 'react';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface DownloadSectionProps {
  onOpenDownloadModal?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = () => {
  const [callsign, setCallsign] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <section className="playtest-funnel-stage" id="access" aria-label="Join Playtest">
      <div className="section-container">
        <div className="playtest-centered-box">
          <span className="lead-eyebrow">PRE-ALPHA CLEARANCE</span>
          <h2 className="playtest-headline">JOIN THE CLOSED PLAYTEST</h2>
          <p className="playtest-subcopy">
            Sign up with your operative callsign and email for closed Windows PC playtest waves and direct development dispatches.
          </p>

          {!isSubmitted ? (
            <form className="playtest-form-clean" onSubmit={handleSubmit}>
              <div className="form-inputs-row">
                <input
                  type="text"
                  placeholder="OPERATIVE CALLSIGN (e.g. MEHTA-01)"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="playtest-text-input"
                  required
                />
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="playtest-text-input"
                  required
                />
                <button
                  type="submit"
                  className="btn-playtest-submit"
                >
                  <span>REQUEST ACCESS</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="playtest-form-meta">
                <span>Direct distribution via official verified portal. No spam.</span>
              </div>
            </form>
          ) : (
            <div className="playtest-confirmed-card">
              <div className="confirmed-icon">
                <Check size={28} />
              </div>
              <h3 className="confirmed-title">CLEARANCE REGISTERED: {callsign.toUpperCase() || 'OPERATIVE'}</h3>
              <p className="confirmed-msg">
                Transit dispatch confirmed for <strong>{email}</strong>. You will receive cryptographic build access when Wave 01 opens.
              </p>
              <div className="confirmed-badge">
                <ShieldCheck size={16} />
                <span>OFFICIAL PRE-ALPHA ROSTER</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
