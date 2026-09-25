import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { visualArchiveData, type VisualArchiveItem } from '../../data/visualArchiveData';

export const MediaSection: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<VisualArchiveItem | null>(null);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CURRENT GAMEPLAY' | 'ACTIVE DEVELOPMENT' | 'WORLD PREVIEW'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const categories = ['ALL', 'URBAN', 'RURAL', 'DESERT', 'FOREST', 'HERITAGE', 'INDUSTRIAL', 'TRANSPORT', 'INVESTIGATION', 'VEHICLE', 'STEALTH', 'SECURITY'];
  const statuses = ['ALL', 'CURRENT GAMEPLAY', 'ACTIVE DEVELOPMENT', 'WORLD PREVIEW'];

  const filteredData = visualArchiveData.filter(item => {
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchCategory = categoryFilter === 'ALL' || item.categories.includes(categoryFilter);
    return matchStatus && matchCategory;
  });

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeLightbox) return;
    const idx = filteredData.findIndex(item => item.id === activeLightbox.id);
    if (idx >= 0 && idx < filteredData.length - 1) {
      setActiveLightbox(filteredData[idx + 1]);
    } else {
      setActiveLightbox(filteredData[0]);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeLightbox) return;
    const idx = filteredData.findIndex(item => item.id === activeLightbox.id);
    if (idx > 0) {
      setActiveLightbox(filteredData[idx - 1]);
    } else {
      setActiveLightbox(filteredData[filteredData.length - 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      if (e.key === 'Escape') setActiveLightbox(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox, filteredData]);

  return (
    <section className="media-vault-stage" id="media" aria-label="Media & Captures">
      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">VISUAL ARCHIVE</span>
          <h2 className="lead-headline">IN-ENGINE GAMEPLAY CAPTURES</h2>
          <p className="lead-subcopy">Original Broken Horizon gameplay environments, vehicle sequences, investigations, and world studies developed for Unreal Engine 4.27 on PC.</p>
        </div>

        {/* Filters */}
        <div className="media-filters" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div className="status-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#888', fontSize: '11px', alignSelf: 'center', marginRight: '8px' }}>STATUS:</span>
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s as any)}
                style={{
                  background: statusFilter === s ? '#ffb347' : 'rgba(255,255,255,0.05)',
                  color: statusFilter === s ? '#000' : '#ccc',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {s}
              </button>
            ))}
          </div>
          
          <div className="category-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#888', fontSize: '11px', alignSelf: 'center', marginRight: '8px' }}>CATEGORY:</span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                style={{
                  background: categoryFilter === c ? '#444' : 'transparent',
                  color: categoryFilter === c ? '#fff' : '#888',
                  border: '1px solid ' + (categoryFilter === c ? '#666' : 'rgba(255,255,255,0.1)'),
                  padding: '4px 10px',
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  cursor: 'pointer'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Image Grid */}
        <div className="media-grid-clean" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="media-card-frame"
              onClick={() => setActiveLightbox(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', aspectRatio: '16/9', background: '#111' }}
            >
              <img
                src={item.imagePath}
                alt={item.altText}
                className="media-card-img"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
              />
              <div className="media-card-gradient" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' }} />

              <div className="media-card-hover-info" style={{ position: 'absolute', bottom: 0, left: 0, padding: '20px', width: '100%' }}>
                <span className="media-hover-location" style={{ display: 'block', color: '#ffb347', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  {item.district.toUpperCase()} • {item.status}
                </span>
                <h4 className="media-hover-title" style={{ margin: 0, color: '#fff', fontSize: '16px', fontWeight: 500 }}>{item.title}</h4>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  {item.categories.slice(0, 2).map(cat => (
                    <span key={cat} style={{ fontSize: '9px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', color: '#ccc' }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div style={{ padding: '60px', textAlign: 'center', color: '#888', gridColumn: '1 / -1' }}>
              No visual records match these exact filter parameters.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div 
          className="media-lightbox-overlay" 
          onClick={() => setActiveLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div 
            className="media-lightbox-container" 
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', maxWidth: '1400px', width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <button
              type="button"
              className="lightbox-close-trigger"
              onClick={() => setActiveLightbox(null)}
              aria-label="Close Preview"
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <X size={32} />
            </button>
            
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
              <img
                src={activeLightbox.imagePath}
                alt={activeLightbox.altText}
                className="lightbox-full-img"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              
              <button onClick={handlePrev} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNext} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%' }}>
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="lightbox-caption-bar" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 className="lightbox-caption-title" style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '24px' }}>{activeLightbox.title}</h3>
                <span className="lightbox-caption-location" style={{ color: '#ccc', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  {activeLightbox.district} — {activeLightbox.scene}
                </span>
                <span style={{ color: '#888', fontSize: '12px' }}>
                  Gameplay: {activeLightbox.gameplayType} | Lighting: {activeLightbox.timeOfDay}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="lightbox-4k-badge" style={{ display: 'inline-block', background: 'rgba(255,179,71,0.1)', color: '#ffb347', padding: '6px 12px', fontSize: '11px', letterSpacing: '0.1em', fontWeight: 'bold' }}>
                  {activeLightbox.status}
                </span>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  {activeLightbox.categories.map(cat => (
                    <span key={cat} style={{ fontSize: '10px', color: '#666', border: '1px solid #333', padding: '2px 8px', borderRadius: '12px' }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
