'use client';

import { useEffect, useRef } from 'react';

export default function useTextReveal(delayClass?: string) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('text-reveal');
    if (delayClass) el.classList.add(delayClass);

    // Wait one frame so the hidden state is painted before we start observing
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [delayClass]);

  return ref as React.RefObject<HTMLElement>;
}
