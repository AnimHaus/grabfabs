'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReveal from './useReveal';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';

const hustlers: { role: string; icon: string; desc: string }[] = [
  {
    role: 'Developers',
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=80&h=80&fit=crop&q=80',
    desc: 'Coding through midnight, building the future',
  },
  {
    role: 'Doctors',
    icon: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=80&fit=crop&q=80',
    desc: 'On call, always present, never stopping',
  },
  {
    role: 'Advocates',
    icon: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=80&h=80&fit=crop&q=80',
    desc: 'Fighting for justice, one case at a time',
  },
  {
    role: 'Airline Crew',
    icon: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=80&h=80&fit=crop&q=80',
    desc: 'Crossing time zones, serving every hour',
  },
  {
    role: 'Parents',
    icon: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=80&h=80&fit=crop&q=80',
    desc: 'Running a home, raising champions',
  },
  {
    role: 'Students',
    icon: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=80&h=80&fit=crop&q=80',
    desc: 'Studying hard, building their tomorrow',
  },
  {
    role: 'Professors',
    icon: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=80&h=80&fit=crop&q=80',
    desc: 'Shaping minds, igniting curiosity',
  },
  {
    role: 'Retirees & Families',
    icon: 'https://images.unsplash.com/photo-1447005497901-b3e9ee359928?w=80&h=80&fit=crop&q=80',
    desc: 'Living well, choosing better every day',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useReveal('reveal-delay-2');
  const bodyRef = useReveal('reveal-delay-3');
  const hustlerDescRef = useReveal('reveal-delay-2');

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
        src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/sticker_makhana.png"
        alt="makhana sticker"
        size={240}
        position={{ top: '3%', right: '42rem' }}
        rotate={30}
        offset={['start end', 'center 60%']}
        className="hidden md:block"
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

        {/* ── Hustler cards ─────────────────────────────────────── */}
        <div className="mt-28 md:mt-24">

          {/* Sticker — peanut butter */}
          <ScrollFlipSticker
            src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/sticker_peanut_butter.png"
            alt="peanut butter sticker"
            size={200}
            position={{ bottom: '-4rem', right: '-1.5rem' }}
            rotate={10}
            offset={['start end', 'center 60%']}
            className="hidden md:block"
          />

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hustlers.map((h, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const cardRef = useReveal(`reveal-delay-${(i % 4) + 1}`);
              return (
                <div
                  key={h.role}
                  ref={cardRef}
                  className="reveal group bg-cream/10 border border-cream/15 rounded-2xl p-6 hover:bg-cream hover:border-transparent transition-all duration-400 cursor-default"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={h.icon}
                      alt={h.role}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                  </div>
                  <h3
                    className="font-heading font-black text-cream group-hover:text-green text-base mb-2 transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {h.role}
                  </h3>
                  <p
                    className="text-cream/55 group-hover:text-dark/55 text-xs leading-relaxed transition-colors"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom watermark */}
          <div className="mt-16 pt-16 border-t border-cream/10 text-center">
            <p
              className="font-display text-cream/[0.06] select-none"
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                lineHeight: 1,
              }}
            >
              EVERY HUSTLER DESERVES BETTER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
