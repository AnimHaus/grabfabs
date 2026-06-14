'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TransitionLink from './TransitionLink';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const tagY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-cream flex items-center justify-center"
    >
      {/* Floating decorative circles */}
      <div className="absolute top-24 left-8 w-2 h-2 rounded-full bg-amber opacity-60" />
      <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-green/30" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-amber/50" />

      {/* Background grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      />

      {/* Mobile: GRAB FABS side-by-side centered above image */}
      <motion.div
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="sm:hidden absolute top-[25%] left-0 right-0 flex justify-center items-baseline gap-2 select-none pointer-events-none z-10"
      >
        {['GRAB', 'FABS'].map((word) => (
          <span
            key={word}
            className="font-display text-green block"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(3.5rem, 14vw, 5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              WebkitTextStroke: '1.5px #0d3314',
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Giant GRAB text — left (sm+) */}
      <motion.div
        style={{ x: leftX, opacity: textOpacity }}
        initial={{ opacity: 0, x: '-6%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="hidden sm:block absolute left-0 sm:bottom-[15%] select-none pointer-events-none z-10"
      >
        <span
          className="font-display text-green block"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(4.5rem, 18vw, 22rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            WebkitTextStroke: '2px #0d3314',
          }}
        >
          GRAB
        </span>
      </motion.div>

      {/* Giant FABS text — right (sm+) */}
      <motion.div
        style={{ x: rightX, opacity: textOpacity }}
        initial={{ opacity: 0, x: '6%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="hidden sm:block absolute right-0 sm:bottom-[15%] select-none pointer-events-none z-10"
      >
        <span
          className="font-display text-green block"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(4.5rem, 18vw, 22rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            WebkitTextStroke: '2px #0d3314',
          }}
        >
          FABS
        </span>
      </motion.div>

      {/* Center product image */}
      <motion.div
        style={{ y: imageY }}
        className="relative z-20 flex flex-col items-center mt-0 sm:mt-0"
      >
        <div className="relative w-[260px] h-[290px] xs:w-[300px] xs:h-[340px] sm:w-[500px] sm:h-[560px] md:w-[620px] md:h-[680px] lg:w-[780px] lg:h-[840px]">
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/makhana.png"
              alt="Makhana"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Accent tag — hidden on smallest screens to avoid overlap */}
      <motion.div
        style={{ y: tagY, opacity: textOpacity, top: '26%', left: '8%' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="absolute z-30 hidden sm:block"
      >
        <div
          className="bg-amber text-cream font-heading font-black text-sm tracking-widest uppercase px-4 py-2 rounded-full rotate-[-8deg]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          ZERO JUNK
        </div>
      </motion.div>

      {/* Bottom — CTA centred on mobile, split on md+ */}
      <motion.div
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="absolute bottom-35 sm:bottom-10 left-0 right-0 px-8 md:px-12 z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-3"
      >
        {/* Left descriptor — hidden on mobile */}
        <p
          className="hidden md:block max-w-[200px] text-sm text-dark/60 leading-relaxed"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Smart nutrition for every hustler — clean ingredients, honest taste.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <TransitionLink
            href="/products"
            className="bg-green text-cream font-heading font-bold tracking-[0.15em] uppercase text-sm px-8 py-3 rounded-full hover:bg-green-mid transition-all hover:scale-105 w-full md:w-auto text-center"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Explore Products
          </TransitionLink>
          <p className="text-xs text-dark/40 tracking-widest" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Goodness · Grabbed · Fabulous
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-[10px] tracking-[0.3em] text-dark/40 uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-green/40 to-transparent" />
      </motion.div>
    </section>
  );
}
