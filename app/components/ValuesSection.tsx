'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReveal from './useReveal';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';

const values = [
  {
    number: '01',
    title: 'Feel Good',
    body: 'Every product is designed to make you feel genuinely good — energised, satisfied, not sluggish. Nutrition that supports your lifestyle, not complicates it.',
  },
  {
    number: '02',
    title: 'On the Go',
    body: 'Portable, smart packaging designed for busy lives. No prep, no fuss — grab it and go wherever life takes you.',
  },
  {
    number: '03',
    title: 'Zero Junk',
    body: 'No palm oil. No added junk sugars. No ingredients you need a chemistry degree to understand. Clean labels, honest food.',
  },
  {
    number: '04',
    title: 'Globally Proven',
    body: 'Products that are already winning in markets worldwide — flax bread, seed-packed nut butters, couverture chocolate bites. Now finally in India.',
  },
];

export default function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const subRef = useReveal('reveal-delay-1');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineH = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="py-28 md:py-40 bg-green overflow-hidden relative">
      {/* Sticker — fruit gel */}
      <ScrollFlipSticker
        src="/sticker_fruit_gel.png"
        alt="fruit gel sticker"
        size={240}
        position={{ top: '10%', left: '1.5rem' }}
        
        rotate={10}
        offset={['30% end', 'end 60%']}
      />
      {/* Huge ghost text */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 text-center font-display text-cream/[0.03] leading-none select-none pointer-events-none"
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-anton)',
          fontSize: 'clamp(6rem, 20vw, 22rem)',
        }}
      >
        VALUES
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <h2
            className="font-display text-cream leading-[0.9]"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            }}
          >
            <WordReveal text="GRAB BETTER." />
            <br />
            <WordReveal text="LIVE BETTER." className="text-amber-light" delay={0.24} />
          </h2>
        </div>

        {/* Values list */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-cream/10 hidden md:block overflow-hidden">
            <motion.div style={{ height: lineH }} className="w-full bg-amber/40 origin-top" />
          </div>

          <div className="space-y-0">
            {values.map((v, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const cardRef = useReveal(`reveal-delay-${i + 1}`);
              const isEven = i % 2 === 0;

              return (
                <div
                  key={v.number}
                  ref={cardRef}
                  className={`reveal grid md:grid-cols-2 gap-8 md:gap-16 py-16 border-b border-cream/10 last:border-0 ${
                    isEven ? '' : 'md:[&>*:first-child]:order-last'
                  }`}
                >
                  {/* Number + title */}
                  <div className={`flex flex-col justify-center ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <span
                      className="font-display text-amber/30 text-8xl leading-none mb-4 block"
                      style={{ fontFamily: 'var(--font-anton)' }}
                    >
                      {v.number}
                    </span>
                    <h3
                      className="font-display text-cream"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      }}
                    >
                      {v.title}
                    </h3>
                  </div>

                  {/* Body text */}
                  <div className={`flex flex-col justify-center ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                    <p
                      className="text-cream/70 text-lg leading-relaxed"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {v.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
