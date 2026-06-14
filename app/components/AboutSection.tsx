'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReveal from './useReveal';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useReveal('reveal-delay-2');
  const bodyRef = useReveal('reveal-delay-3');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-40 bg-green overflow-hidden"
    >
      {/* Background texture */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #2d8042 0%, transparent 60%), radial-gradient(circle at 80% 20%, #1a5c28 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Sticker — makhana, flips in from left on scroll */}
      <ScrollFlipSticker
        src="/sticker_makhana.png"
        alt="makhana sticker"
        size={240}
        position={{ top: '10%', right: '42rem' }}
        
        rotate={-10}
        offset={['start end', 'center 60%']}
      />

      {/* Large decorative text */}
      <div
        className="absolute top-0 right-0 font-display text-cream/[0.03] leading-none select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-anton)',
          fontSize: 'clamp(8rem, 20vw, 26rem)',
        }}
      >
        GRAB
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Big statement */}
          <div>
            <p
              ref={subtitleRef}
              className="reveal text-amber font-heading font-bold tracking-[0.2em] text-xs uppercase mb-6"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Our Story
            </p>
            <h2
              className="font-display text-cream leading-[0.9] mb-8"
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
              }}
            >
              <WordReveal text="FOOD FOR" />
              <br />
              <WordReveal text="THE HUSTLER" className="text-amber-light" delay={0.16} />
            </h2>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { label: 'Zero Junk', icon: '✓' },
                { label: 'Feel Good', icon: '✓' },
                { label: 'On the Go', icon: '✓' },
                { label: 'Clean Label', icon: '✓' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 bg-cream/10 border border-cream/20 text-cream text-sm font-heading font-semibold tracking-wider px-5 py-2.5 rounded-full"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  <span className="text-amber text-xs">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Brand story */}
          <div ref={bodyRef} className="reveal space-y-6">
            <p
              className="text-cream/90 text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Grabfabs is simply{' '}
              <strong className="text-amber-light">grab fabulous food on the go.</strong>
            </p>
            <p
              className="text-cream/70 leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Designed for the modern hustler — web developers coding through the night,
              advocates fighting for change, doctors saving lives, airline crews crossing time
              zones, busy working parents, and students building their futures.
            </p>
            <p
              className="text-cream/70 leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              All our products are Feel Good, On the Go items — smartly designed to support
              your hunger and avoid junk, highly processed foods. Products already proven in
              global markets, now brought home to India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
