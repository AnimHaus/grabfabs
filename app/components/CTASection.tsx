'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/dist/client/link';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream px-6 md:px-12 relative overflow-hidden">
      {/* Sticker — bar */}
      <ScrollFlipSticker
        src="/sticker_bar.png"
        alt="bar sticker"
        size={240}
        position={{ top: '30%', left: '10rem', transform: 'translateY(-50%)' }}
        
        rotate={-14}
        offset={['start end', 'center 60%']}
      />
      {/* Sticker — loaves */}
      <ScrollFlipSticker
        src="/sticker_loaves.png"
        alt="loaves sticker"
        size={240}
        position={{ top: '50%', right: '10rem', transform: 'translateY(-50%)' }}
        
        rotate={14}
        offset={['start end', 'center 60%']}
      />
      <motion.div
        style={{
          scale,
          opacity,
          background: 'linear-gradient(135deg, #0d3314 0%, #1a5c28 50%, #0d3314 100%)',
        }}
        className="max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden relative"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-green-light/20 blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 px-10 md:px-20 py-20 md:py-28 text-center">
          <p
            className="text-amber font-heading font-bold tracking-[0.25em] text-xs uppercase mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Ready to Grab?
          </p>

          <h2
            className="font-display text-cream leading-[0.9] mb-8"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(3rem, 9vw, 9rem)',
            }}
          >
            <WordReveal text="GRAB YOURS" />
            <br />
            <WordReveal text="TODAY" className="text-amber-light" delay={0.24} />
          </h2>

          <p
            className="text-cream/65 max-w-lg mx-auto text-lg leading-relaxed mb-12"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Join thousands of hustlers who&apos;ve made the switch. Feel good food,
            on the go — because you deserve better than junk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-cream text-green font-heading font-black tracking-[0.15em] uppercase text-sm px-10 py-4 rounded-full hover:bg-amber-light hover:text-cream transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Shop Products
            </Link>
            <a
              href="#about"
              className="inline-block border-2 border-cream/30 text-cream font-heading font-semibold tracking-[0.1em] uppercase text-sm px-10 py-4 rounded-full hover:border-cream/60 transition-all duration-300"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Our Story
            </a>
          </div>

          {/* Small social proof */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {[
              { label: 'Zero Junk', value: '100%' },
              { label: 'Clean Ingredients', value: 'Always' },
              { label: 'Feel Good Guarantee', value: '✓' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-amber-light font-display text-3xl mb-1"
                  style={{ fontFamily: 'var(--font-anton)' }}
                >
                  {s.value}
                </p>
                <p
                  className="text-cream/50 text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
