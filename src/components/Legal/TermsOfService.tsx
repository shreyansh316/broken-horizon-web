import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FooterSection } from '../Footer/FooterSection';
import './legal.css';

interface TermsOfServiceProps {
  onBackToHome: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBackToHome }) => {
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
            <span className="story-sub">TERMS OF SERVICE</span>
          </div>
        </div>
      </header>

      <main className="legal-content-container">
        <h1 className="legal-title">TERMS OF SERVICE</h1>
        <p className="legal-date">Last Updated: September 2026</p>

        <section className="legal-section">
          <h2>1. ACCEPTANCE OF TERMS</h2>
          <p>
            By accessing the Broken Horizon Interactive Website ("Website") and participating in the Closed Playtest, you agree to abide by these Terms of Service.
            This Website and the associated game are currently in pre-alpha development.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. PLAYTEST ACCESS</h2>
          <p>
            Access to the Broken Horizon playtest is granted at the sole discretion of the development team. 
            Requesting access does not guarantee participation. We reserve the right to revoke playtest access at any time, for any reason, without prior notice.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. INTELLECTUAL PROPERTY</h2>
          <p>
            All content, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of the Broken Horizon development team or its content suppliers.
            The Unreal Engine 4.27 logo and brand are properties of Epic Games, Inc. 
          </p>
          <p>
            You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from this Website or the game without express written permission.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. GAME STATUS AND "AS-IS" PROVISION</h2>
          <p>
            The game provided during the playtest is a work in progress (Pre-Alpha). It is provided on an "AS IS" and "AS AVAILABLE" basis. 
            There are no warranties of any kind regarding the stability, performance, or availability of the game or the Website.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. MODIFICATIONS TO TERMS</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Your continued use of the Website or participation in the playtest following any changes constitutes your acceptance of those changes.
          </p>
        </section>
        
        <div className="legal-footer-nav">
           <a href="#/privacy" className="legal-cross-link">View Privacy Policy</a>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
