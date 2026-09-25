import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  onOpenDownloadModal?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="studio-footer-stage" role="contentinfo">
      <div className="section-container">
        <div className="footer-main-grid">
          {/* Studio Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">BROKEN HORIZON</div>
            <p className="footer-studio-desc">
              An original open-world action-adventure game set across the nocturnal roads and desert dunes of Rajasthan, India. Developed with Unreal Engine 4.27 for Windows PC.
            </p>
            <div className="footer-age-badge">
              <span className="age-box">16+</span>
              <div className="age-details">
                <strong>MATURE THEMES</strong>
                <span>High-Speed Pursuits • Tactical Violence • Espionage</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="footer-links-col">
            <span className="footer-heading">THE GAME</span>
            <ul className="footer-link-list">
              <li><a href="#gameplay">Gameplay Pillars</a></li>
              <li><a href="#world">The 13 Districts</a></li>
              <li><a href="#the-road">The 495-Mile Highway</a></li>
              <li><a href="#characters">The Operatives</a></li>
              <li><a href="/garage">Mehta Garage Customizer</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">MEDIA & SPECS</span>
            <ul className="footer-link-list">
              <li><a href="#trailer">Reveal Trailer</a></li>
              <li><a href="#media">4K In-Engine Captures</a></li>
              <li><a href="#development">PC System Requirements</a></li>
              <li><a href="#development">World Expansion Vision</a></li>
              <li><a href="#access">Playtest Clearance</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">COMMUNITY & LEGAL</span>
            <ul className="footer-link-list">
              <li><a href="https://samwooduis.itch.io/broken-horizon" target="_blank" rel="noopener noreferrer">Official Itch.io Hub ↗</a></li>
              <li><a href="#access">Closed Beta Dispatch</a></li>
              <li><a href="#access">Press Kit Inquiries</a></li>
              <li><a href="#hero">Privacy Policy</a></li>
              <li><a href="#hero">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-legal-bar">
          <p className="legal-notice">
            © {new Date().getFullYear()} Broken Horizon. All rights reserved. Built with Unreal Engine. All trademarks, characters, vehicle schematics, and fictionalized regional portrayals are the property of their respective creators.
          </p>

          <button
            type="button"
            className="btn-return-top"
            onClick={handleScrollToTop}
            aria-label="Return to top"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
