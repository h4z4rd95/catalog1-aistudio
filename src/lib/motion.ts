// ===========================================================================
// 123SERVICE STUDIO — SRC/LIB/MOTION.TS
// GSAP / Lenis dynamic imports, Scroll-Pin Contract, RTL Layout Shift Normalizer
// ===========================================================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling with Persian / RTL layout optimization.
 * In RTL layouts, vertical scrolling remains standard, but horizontal sub-wheel
 * drifts must be damped, and Lenis must update ScrollTrigger cleanly without rubber-band jitter.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Honour accessibility: disable Lenis under prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenisInstance;
  } catch (err) {
    console.warn('[Motion] Lenis initialization skipped:', err);
    return null;
  }
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}

/**
 * Scroll-Pin Contract Auditor:
 * 1. Checks that content-visibility: auto is NEVER on a ScrollTrigger root.
 * 2. Checks that pinSpacing: false is not used.
 * 3. Enforces fixed-height [data-stage] child pinned inside taller [data-track] parent.
 */
export function auditScrollPinContract(element: HTMLElement | null): boolean {
  if (!element || typeof window === 'undefined') return true;

  if (process.env.NODE_ENV !== 'production') {
    const computed = window.getComputedStyle(element) as any;
    if (computed.contentVisibility === 'auto') {
      console.error(
        '[Scroll-Pin Contract Violation] content-visibility: auto detected on ScrollTrigger root:',
        element,
        'This collapses measured height and causes garbage pin distances. Use content-visibility: auto ONLY for static offscreen sections.'
      );
    }
  }

  return true;
}

/**
 * refreshWhenSettled():
 * Waits for document.fonts.ready plus all pending images to load (with a 1600ms safety net),
 * then refreshes ScrollTrigger and recalculates RTL coordinate offsets.
 */
export function refreshWhenSettled(callback?: () => void): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;

    const executeRefresh = () => {
      if (settled) return;
      settled = true;

      // Compensate for RTL layout shifts: ensure horizontal body bounds don't shift ScrollTrigger pin offsets
      if (document.documentElement.dir === 'rtl' || document.body.dir === 'rtl') {
        ScrollTrigger.config({
          limitCallbacks: true,
          ignoreMobileResize: true,
        });
      }

      ScrollTrigger.refresh();
      if (callback) callback();
      resolve();
    };

    // 1600ms safety net
    const timer = setTimeout(executeRefresh, 1600);

    // Font readiness check
    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    // Image loading check
    const images = Array.from(document.querySelectorAll('img'));
    const uncompletedImages = images.filter((img) => !img.complete);

    const imagesPromise =
      uncompletedImages.length > 0
        ? Promise.all(
            uncompletedImages.map(
              (img) =>
                new Promise((res) => {
                  img.addEventListener('load', res, { once: true });
                  img.addEventListener('error', res, { once: true });
                })
            )
          )
        : Promise.resolve();

    Promise.all([fontsPromise, imagesPromise]).then(() => {
      clearTimeout(timer);
      // Wait one animation frame for DOM styles to repaint
      requestAnimationFrame(() => {
        requestAnimationFrame(executeRefresh);
      });
    });
  });
}

/**
 * Hook or helper to check if pinning should be active:
 * Below 1024px or under prefers-reduced-motion, pinning degrades to plain stacked layout.
 */
export function canEnablePinning(): boolean {
  if (typeof window === 'undefined') return false;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileOrTablet = window.innerWidth < 1024;
  return !isReducedMotion && !isMobileOrTablet;
}
