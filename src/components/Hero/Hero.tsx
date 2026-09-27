import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, ShieldCheck, Crosshair } from 'lucide-react';
import './Hero.css';

interface HeroProps {
  onOpenTrailerModal: () => void;
  onNavigateToGarage?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrailerModal, onNavigateToGarage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Atmospheric Thar Desert Dust Motes Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dust particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: Math.random() * 0.45 + 0.1,
      speedY: Math.random() * 0.2 - 0.1,
      opacity: Math.random() * 0.45 + 0.1,
      hue: Math.random() > 0.4 ? 'rgba(234, 88, 12,' : 'rgba(251, 191, 36,'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.hue} ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToPlaytest = () => {
    const accessSection = document.querySelector('#access') || document.querySelector('#playtest-form');
    if (accessSection) {
      accessSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGarageClick = (e: React.MouseEvent) => {
    if (onNavigateToGarage) {
      e.preventDefault();
      onNavigateToGarage();
    }
  };

  return (
    <section className="hero-aaa-stage" id="hero" aria-label="Broken Horizon Master Stage">
      {/* 1. Background Key Art Layer */}
      <div className="hero-art-layer">
        <img
          src="/assets/images/hero/hero-keyart-ue5.jpg"
          alt="Broken Horizon — Arjun Mehta, Kavya Rathore, and Mahindra-style 4x4 SUV overlooking Rajasthan highway and hilltop fort at sunset"
          className="hero-art-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/hero-rajasthan.jpg';
          }}
        />

        {/* Ambient Desert Dust Canvas */}
        <canvas ref={canvasRef} className="hero-dust-canvas" />

        {/* Left-Side Readability Vignette (Guarantees 100% Text Contrast) */}
        <div className="hero-shader-left-vignette" />

        {/* Top & Bottom Cinematic Letterbox Shaders */}
        <div className="hero-shader-top-bottom" />

        {/* In-Engine Vehicle Targeting HUD (Targeting the 4x4 on the right) */}
        <div className="hero-vehicle-hud-target">
          <div className="target-reticle-box">
            <span className="target-reticle-dot" />
            <Crosshair size={12} color="#ea580c" />
            <span>[ NH-48 // JAIPUR-UDAIPUR CORRIDOR // 01:30 AM ]</span>
          </div>
        </div>
      </div>

      {/* 2. Top Ambient Telemetry Header */}
      <div className="hero-top-telemetry">
        {/* Tactical Pill Badge (Fixes text clashing with background) */}
        <div className="tactical-pill-badge">
          <span className="tactical-ping-dot" />
          <span className="tactical-pill-text">
            PROLOGUE: SMOKE &amp; SILVER — PLAYABLE BUILD v0.1.0 LIVE
          </span>
        </div>

        {/* Right Sector Telemetry HUD */}
        <div className="hero-top-sector-hud">
          <span>SECTOR: <strong style={{ color: '#fb923c' }}>JAIPUR → UDAIPUR → JAISALMER</strong></span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <span>BUILD: <strong style={{ color: '#34d399' }}>PROLOGUE v0.1.0 LIVE</strong></span>
        </div>
      </div>

      {/* 3. Main Hero Typography & Horizon-Cut Wordmark */}
      <div className="hero-main-container">
        <div className="hero-content-max">
          {/* Custom Horizon-Sliced Stacked Wordmark */}
          <div className="hero-wordmark-container">
            <h1 className="hero-wordmark-title">
              BROKEN HORIZON
            </h1>
            <div className="hero-horizon-slice-line" />
          </div>

          {/* Corrected Indian Highway Subheadline (800 Kilometers) */}
          <h2 className="hero-subheadline">
            800 kilometers of connected Indian highways, industrial yards, and desert tracks.{' '}
            <span className="hero-subheadline-accent">Zero backup.</span>
          </h2>

          {/* Sharpened Narrative Story Hook */}
          <p className="hero-narrative-copy">
            Publicly, the <strong className="hero-highlight-white">Horizon Corridor</strong> promises modern roads across thirteen districts of Rajasthan. Secretly, <strong className="hero-highlight-white">Vardhan Meridian</strong> is using forged midnight land registries, debt traps, and hired fixers to erase anyone in its path. Play as Jaipur wheelman <strong className="hero-highlight-arjun">Arjun Mehta</strong> and Udaipur photojournalist <strong className="hero-highlight-kavya">Kavya Rathore</strong> in a world that remembers every choice.
          </p>

          {/* 3-Button AAA Action Row */}
          <div className="hero-action-row">
            <button
              type="button"
              className="btn-trailer-hero"
              onClick={onOpenTrailerModal}
              title="Watch in-engine reveal trailer"
            >
              <Play size={14} fill="currentColor" />
              <span>WATCH REVEAL TRAILER</span>
            </button>

            <a
              href="https://samwooduis.itch.io/broken-horizon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-prologue-demo"
              title="Download and play Prologue on itch.io"
            >
              <span>PLAY PROLOGUE DEMO (ITCH.IO)</span>
              <ArrowRight size={14} />
            </a>

            <button
              type="button"
              className="btn-playtest-hero"
              onClick={handleScrollToPlaytest}
              title="Register for closed playtest builds"
            >
              <ShieldCheck size={14} />
              <span>JOIN CLOSED PLAYTEST</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Studio Telemetry Bar (Rockstar / Ubisoft Footer Strip) */}
      <div className="hero-bottom-telemetry-bar">
        <div className="hero-bottom-telemetry-grid">
          <div>
            <div className="telemetry-cell-eyebrow">01 // OPEN-WORLD SCALE</div>
            <div className="telemetry-cell-value">13 RAJASTHAN DISTRICTS • LEFT-HAND TRAFFIC</div>
          </div>
          <div>
            <div className="telemetry-cell-eyebrow">02 // DUAL PROTAGONISTS</div>
            <div className="telemetry-cell-value">ARJUN (WRENCH &amp; RIG) • KAVYA (CAMERA &amp; BOARD)</div>
          </div>
          <div>
            <div className="telemetry-cell-eyebrow">03 // TRANSPORT SIMULATION</div>
            <div className="telemetry-cell-value">
              <a
                href="/garage"
                onClick={handleGarageClick}
                className="telemetry-cell-value highlight-garage"
              >
                <span>92 PLAYABLE &amp; WORLD VEHICLES</span>
                <span>→</span>
              </a>
            </div>
          </div>
          <div>
            <div className="telemetry-cell-eyebrow">04 // VERTICAL SLICE STATUS</div>
            <div className="telemetry-cell-value highlight-build">PROLOGUE: "SMOKE &amp; SILVER" AVAILABLE NOW</div>
          </div>
        </div>
      </div>
    </section>
  );
};
