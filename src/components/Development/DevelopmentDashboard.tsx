import React from 'react';
import { ArrowLeft, Terminal, Activity, Map as MapIcon } from 'lucide-react';
import './developmentDashboard.css';

interface DevelopmentDashboardProps {
  onBackToHome: () => void;
}

export const DevelopmentDashboard: React.FC<DevelopmentDashboardProps> = ({ onBackToHome }) => {
  return (
    <div className="dev-dashboard-page">
      <div className="dev-dashboard-header">
        <button className="back-btn" onClick={onBackToHome}>
          <ArrowLeft size={16} />
          <span>RETURN TO HQ</span>
        </button>
        <div className="dev-header-titles">
          <h2>PROJECT DEVELOPMENT STATUS</h2>
          <span className="dev-subtitle">ACTIVE TRACKING • UNREAL ENGINE 4.27 • WINDOWS PC</span>
        </div>
      </div>

      <div className="dev-dashboard-content">
        
        {/* HONESTY DISCLAIMER */}
        <div className="dev-honesty-banner">
          <Terminal size={18} className="text-amber" />
          <p>
            <strong>BROKEN HORIZON IS IN ACTIVE DEVELOPMENT.</strong> 
            <br />
            We do not invent fake completion percentages. The current playable slice focuses exclusively on the JAIPUR district. Future planned features and districts are not presented as completed.
          </p>
        </div>

        {/* PROGRESS METERS */}
        <div className="dev-progress-section">
          <h3>PROJECT COMPLETION TRACKING</h3>
          <div className="meter-container">
            <div className="meter-label">
              <span>PROJECT FOUNDATION (CORE SYSTEMS)</span>
              <span className="text-amber">IMPLEMENTED</span>
            </div>
            <div className="meter-bar">████████████████████</div>
          </div>
          <div className="meter-container">
            <div className="meter-label">
              <span>CURRENT JAIPUR DEMO (PLAYABLE SLICE)</span>
              <span className="text-amber">TESTED & PLAYABLE</span>
            </div>
            <div className="meter-bar">████████████████████</div>
          </div>
          <div className="meter-container">
            <div className="meter-label">
              <span>FUTURE WORLD ATLAS (41 DISTRICTS)</span>
              <span className="text-gray">PLANNED / LOCKED</span>
            </div>
            <div className="meter-bar text-gray">░░░░░░░░░░░░░░░░░░░░</div>
          </div>
        </div>

        {/* CURRENT BUILD STATUS */}
        <div className="dev-grid">
          <div className="dev-card">
            <div className="dev-card-header">
              <Activity size={16} />
              <h4>CURRENT BUILD STATUS</h4>
            </div>
            <div className="dev-card-body">
              <ul className="status-list">
                <li><span className="status-label">VERSION:</span> <span className="status-val text-white">v0.9.1 Pre-Alpha</span></li>
                <li><span className="status-label">PLATFORM:</span> <span className="status-val text-white">Windows PC (64-bit)</span></li>
                <li><span className="status-label">ENGINE:</span> <span className="status-val text-amber">Unreal Engine 4.27</span></li>
                <li><span className="status-label">RENDER PIPELINE:</span> <span className="status-val text-white">Custom DX12 / No UE5 Features</span></li>
                <li><span className="status-label">CURRENT FOCUS:</span> <span className="status-val text-white">Jaipur District Polish</span></li>
              </ul>
            </div>
          </div>

          <div className="dev-card">
            <div className="dev-card-header">
              <MapIcon size={16} />
              <h4>WORLD & DISTRICTS</h4>
            </div>
            <div className="dev-card-body">
              <ul className="status-list">
                <li><span className="status-label">JAIPUR:</span> <span className="badge badge-active">PLAYABLE</span></li>
                <li><span className="status-label">JODHPUR:</span> <span className="badge badge-dev">IN DEVELOPMENT</span></li>
                <li><span className="status-label">UDAIPUR:</span> <span className="badge badge-dev">IN DEVELOPMENT</span></li>
                <li><span className="status-label">JAISALMER:</span> <span className="badge badge-locked">LOCKED</span></li>
                <li><span className="status-label">ALWAR / PUSHKAR:</span> <span className="badge badge-locked">LOCKED</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* FEATURES MATRIX */}
        <div className="dev-features-section">
          <h3>SYSTEMS & FEATURES PIPELINE</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-name">CHARACTER MOVEMENT</span>
              <span className="badge badge-active">IMPLEMENTED</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">VEHICLE PHYSICS</span>
              <span className="badge badge-active">IMPLEMENTED</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">TRAFFIC & AI</span>
              <span className="badge badge-dev">IN DEVELOPMENT</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">NPC CROWDS</span>
              <span className="badge badge-dev">IN DEVELOPMENT</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">ENVIRONMENT & PROPS</span>
              <span className="badge badge-polish">POLISH</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">LIGHTING & TIME OF DAY</span>
              <span className="badge badge-active">TESTED</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">PUBLIC TRANSPORT</span>
              <span className="badge badge-locked">PLANNED</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">SAVE / LOAD SYSTEM</span>
              <span className="badge badge-dev">IN DEVELOPMENT</span>
            </div>
            <div className="feature-item">
              <span className="feature-name">PERFORMANCE OPTIMIZATION</span>
              <span className="badge badge-polish">POLISH</span>
            </div>
          </div>
        </div>

        {/* TIMELINE / ROADMAP */}
        <div className="dev-timeline-section">
          <h3>DEVELOPMENT ROADMAP</h3>
          <div className="timeline-container">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>PHASE 1: FOUNDATION</h4>
                <p>Core systems, rendering pipeline, custom physics, base character controllers.</p>
              </div>
            </div>
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>PHASE 2: PROLOGUE</h4>
                <p>Initial narrative setup, Horizon Corridor concept art, and technical prototyping.</p>
              </div>
            </div>
            <div className="timeline-item active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>PHASE 3: JAIPUR PLAYABLE SLICE</h4>
                <p>Creating the dense urban environment of Jaipur as the first fully traversable district. (CURRENT FOCUS)</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>PHASE 4: JAIPUR POLISH</h4>
                <p>Traffic AI tuning, performance optimization, and bug fixing for the Jaipur demo.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>PHASE 5: FUTURE DISTRICTS</h4>
                <p>Scaling the world atlas to include Jodhpur, Udaipur, and the remaining districts.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
