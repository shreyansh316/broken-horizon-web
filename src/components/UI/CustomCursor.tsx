import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices without reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable or image element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-hover');
        setIsHovering(!!interactive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        aria-hidden="true"
      />
      <div
        className="custom-cursor-dot"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        aria-hidden="true"
      />
    </>
  );
};
