/**
 * AssetPreloader.ts
 * Lightweight preloading system for critical opening cinematic assets.
 * Only preloads critical opening art and fonts to avoid network stalls.
 */

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  isComplete: boolean;
}

export const preloadCriticalAssets = (
  onProgress?: (progress: PreloadProgress) => void
): Promise<boolean> => {
  const criticalImages = [
    '/assets/images/hero/hero-desert-road.jpg',
    '/assets/images/trailer-poster.jpg',
  ];

  let loadedCount = 0;
  const total = criticalImages.length;

  return new Promise((resolve) => {
    // If no critical images or reduced motion, resolve quickly
    if (total === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onProgress) {
        onProgress({ loaded: 1, total: 1, percentage: 100, isComplete: true });
      }
      resolve(true);
      return;
    }

    const checkComplete = () => {
      loadedCount++;
      const percentage = Math.min(100, Math.round((loadedCount / total) * 100));
      if (onProgress) {
        onProgress({
          loaded: loadedCount,
          total,
          percentage,
          isComplete: loadedCount >= total,
        });
      }

      if (loadedCount >= total) {
        resolve(true);
      }
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        checkComplete();
      } else {
        img.onload = checkComplete;
        img.onerror = checkComplete; // Gracefully continue on error
      }
    });

    // Fallback timeout: never block the user for more than 2.5s
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
};
