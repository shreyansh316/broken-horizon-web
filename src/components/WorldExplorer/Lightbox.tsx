import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Screenshot } from '../../data/worldData';

interface LightboxProps {
  images: Screenshot[];
  currentIndex: number;
  districtName: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  districtName,
  isOpen,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      }
      if (e.key === 'ArrowRight') {
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image Lightbox">
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />
      
      <div className="lightbox-header">
        <div className="lightbox-meta">
          <span className="lightbox-district">{districtName}</span>
          <span className="lightbox-title">{currentImage.title}</span>
          <span className="lightbox-type">{currentImage.type}</span>
        </div>
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Close Lightbox">
          <X size={24} />
        </button>
      </div>

      <div className="lightbox-content">
        <button 
          className="lightbox-nav-btn prev"
          onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)}
          aria-label="Previous Image"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="lightbox-image-container">
          <img 
            src={currentImage.url} 
            alt={currentImage.title} 
            className="lightbox-image" 
          />
        </div>

        <button 
          className="lightbox-nav-btn next"
          onClick={() => onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)}
          aria-label="Next Image"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="lightbox-footer">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
