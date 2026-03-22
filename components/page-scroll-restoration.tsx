'use client';

import { useLayoutEffect } from 'react';

type PageScrollRestorationProps = {
  clearInitialHash?: boolean;
};

export function PageScrollRestoration({
  clearInitialHash = false,
}: PageScrollRestorationProps) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    let animationFrameId: number | null = null;

    window.history.scrollRestoration = 'manual';

    const normalizeInitialHash = () => {
      if (!clearInitialHash || !window.location.hash) {
        return;
      }

      const nextUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(window.history.state, '', nextUrl);
    };

    const resetScrollPosition = () => {
      normalizeInitialHash();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });
      });
    };

    resetScrollPosition();
    window.addEventListener('pageshow', resetScrollPosition);

    return () => {
      window.removeEventListener('pageshow', resetScrollPosition);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [clearInitialHash]);

  return null;
}
