import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FooterSection } from '../Footer/FooterSection';
import './legal.css';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="legal-page-root">
      <header className="story-header-nav">
        <div className="story-nav-left">
          <button
            type="button"
            className="story-back-btn"
            onClick={onBackToHome}
            aria-label="Return to Main Homepage"
          >
            <ArrowLeft size={16} />
            <span>BACK TO BROKEN HORIZON</span>
          </button>
          <div className="story-header-divider" aria-hidden="true" />
          <div className="story-title-meta">
            <span className="story-lead">LEGAL</span>
            <span className="story-sub">PRIVACY POLICY</span>
          </div>
        </div>
      </header>

      <main className="legal-content-container">
        <h1 className="legal-title">PRIVACY POLICY</h1>
        <p className="legal-date">Last Updated: September 2026</p>

        <section className="legal-section">
          <h2>1. INFORMATION WE COLLECT</h2>
          <p>
            The Broken Horizon Interactive Website ("Website") is a promotional and interactive experience for a pre-alpha game.
            When you apply for Closed Playtest access, we collect the following information:
          </p>
          <ul>
            <li>Your requested "Operative Callsign" (Username)</li>
            <li>Your Email Address</li>
          </ul>
          <p>
            We do not collect any payment information, addresses, or other sensitive personal data.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. HOW WE USE YOUR INFORMATION</h2>
          <p>
            The information collected during playtest registration is exclusively used to:
          </p>
          <ul>
            <li>Send you automated updates regarding your playtest clearance status.</li>
            <li>Deliver your secure playtest download link if approved.</li>
            <li>Manage your access to the Broken Horizon playtest community.</li>
          </ul>
          <p>
            We do not sell, rent, or distribute your email address to third-party marketing or advertising networks.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. DATA STORAGE AND RETENTION</h2>
          <p>
            Your playtest registration data is securely processed via Google Apps Script and stored in private Google Sheets accessible only by the development team. 
            Local browser storage (`localStorage`) is used exclusively to maintain your visual clearance status on your own device.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. YOUR RIGHTS</h2>
          <p>
            If you wish to have your email address removed from our playtest registration list, please contact the development team through our official communication channels or respond directly to any playtest dispatch email.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. THIRD-PARTY LINKS</h2>
          <p>
            The Website may contain links to third-party platforms (such as Itch.io). These platforms operate under their own privacy policies.
          </p>
        </section>
        
        <div className="legal-footer-nav">
           <a href="#/terms" className="legal-cross-link">View Terms of Service</a>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
