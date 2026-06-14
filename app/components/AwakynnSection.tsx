'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import useReveal from './useReveal';
import WordReveal from './WordReveal';

const offerings = [
  {
    num: '01',
    title: 'Yoga & Pranayama',
    body: 'Ashtanga Yog Asana and breathwork for adults and children of every age. Structured, accessible, approachable.',
  },
  {
    num: '02',
    title: 'Meditation & Breathwork',
    body: 'Deep breathing techniques and guided meditation that build clarity where noise used to live.',
  },
  {
    num: '03',
    title: 'Ayurvedic Diet Consulting',
    body: 'Ancient wisdom applied to your modern body. Food choices that work with your constitution, not against it.',
  },
  {
    num: '04',
    title: 'Mantra Chanting',
    body: 'Sound as medicine. Chanting practices that settle the nervous system and return you to stillness.',
  },
  {
    num: '05',
    title: 'Mental Clarity Sessions',
    body: '1-on-1 guided emotional detoxing, spiritual companionship, and the honest conversations nobody else will have with you.',
  },
  {
    num: '06',
    title: 'The Vision',
    body: 'Come out of the pretentious mind. Accept. Face the negatively built-up stories within. Become independent of all attachments. Strike out fear, failure, unhealthy love, ego — and find your peace.',
  },
];

export default function AwakynnSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subRef = useReveal('reveal-delay-1');
  const ctaRef = useReveal('reveal-delay-2');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 0.5, 0.65]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0a0f0a' }}
    >
      {/* ── Full-bleed parallax image ─────────────────── */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/awakynn_teaser.jpeg"
          alt="Yoga and wellness"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{
          opacity: overlayOpacity,
          background:
            'linear-gradient(135deg, rgba(5,15,5,0.92) 0%, rgba(10,20,10,0.75) 50%, rgba(5,15,5,0.88) 100%)',
        }}
        className="absolute inset-0"
      />

      {/* Subtle green radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,128,66,0.12) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">

        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p
            ref={subRef}
            className="reveal text-[#7ecf7e] tracking-[0.35em] text-xs uppercase font-bold mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            A Sister Brand
          </p>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
            <h2
              className="leading-[0.85] flex-shrink-0"
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(5rem, 13vw, 12rem)',
                color: '#f0efe8',
              }}
            >
              <WordReveal text="AWAK" />
              <br />
              <span style={{ WebkitTextStroke: '2px #7ecf7e', color: 'transparent' }}>
                <WordReveal text="YNN" delay={0.08} />
              </span>
            </h2>

            <div className="pb-2 max-w-md">
              <p
                className="text-white/60 leading-relaxed text-lg mb-4"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                Grabfabs feeds the body. Awakynn awakens the self.
              </p>
              <p
                className="text-white/40 leading-relaxed text-sm"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                A wellness brand built on the belief that real discipline becomes
                effortless — not by forcing habits, but by waking up to the life
                already within you.
              </p>
            </div>
          </div>
        </div>

        {/* Mission statement — full width */}
        <div
          className="border-t border-white/10 pt-16 mb-20"
          style={{
            borderImage: 'linear-gradient(90deg, #7ecf7e33, #7ecf7e99, #7ecf7e33) 1',
          }}
        >
          <p
            className="text-white/20 select-none text-center leading-tight"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(1.1rem, 2.8vw, 2.2rem)',
              letterSpacing: '0.02em',
            }}
          >
            &ldquo;Building discipline so strong it becomes a part of your daily life —
            just like eating food and sleeping.&rdquo;
          </p>
        </div>

        {/* Offerings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden mb-20">
          {offerings.map((o, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const ref = useReveal(`reveal-delay-${(i % 3) + 1}`);
            return (
              <div
                key={o.num}
                ref={ref}
                className="reveal bg-white/[0.03] hover:bg-white/[0.07] transition-colors duration-300 p-8 md:p-10"
              >
                <span
                  className="block text-[#7ecf7e]/40 mb-4"
                  style={{ fontFamily: 'var(--font-anton)', fontSize: '2.5rem', lineHeight: 1 }}
                >
                  {o.num}
                </span>
                <h3
                  className="text-white/90 font-black mb-3 text-lg"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {o.title}
                </h3>
                <p
                  className="text-white/45 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {o.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="reveal flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            href="https://awakynn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#7ecf7e] text-[#051005] font-black tracking-[0.15em] uppercase text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Explore Awakynn
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <p
            className="text-white/30 text-xs tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Yoga · Meditation · Ayurveda · Mantra · Clarity
          </p>
        </div>
      </div>

      {/* Bottom ghost text */}
      <div className="relative z-10 overflow-hidden pb-2">
        <p
          className="text-white/[0.025] leading-none text-center select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(4rem, 14vw, 16rem)',
          }}
        >
          AWAKYNN
        </p>
      </div>
    </section>
  );
}
