'use client';

import { useEffect, useRef } from 'react';

export default function useReveal(delayClass?: string) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal');
    if (delayClass) el.classList.add(delayClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayClass]);

  return ref as React.RefObject<HTMLDivElement>;
}
