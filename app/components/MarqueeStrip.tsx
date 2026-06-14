'use client';

const items = [
  'GOODNESS',
  '✦',
  'GRABBED',
  '✦',
  'FABULOUS',
  '✦',
  'ZERO JUNK',
  '✦',
  'FEEL GOOD',
  '✦',
  'ON THE GO',
  '✦',
  'FOR HUSTLERS',
  '✦',
  'CLEAN EATS',
  '✦',
  'GOODNESS',
  '✦',
  'GRABBED',
  '✦',
  'FABULOUS',
  '✦',
  'ZERO JUNK',
  '✦',
  'FEEL GOOD',
  '✦',
  'ON THE GO',
  '✦',
  'FOR HUSTLERS',
  '✦',
  'CLEAN EATS',
  '✦',
];

interface MarqueeStripProps {
  variant?: 'dark' | 'light' | 'amber';
}

export default function MarqueeStrip({ variant = 'dark' }: MarqueeStripProps) {
  const bgMap = {
    dark: 'bg-green',
    light: 'bg-cream-dark',
    amber: 'bg-amber',
  };
  const textMap = {
    dark: 'text-cream',
    light: 'text-green',
    amber: 'text-cream',
  };

  return (
    <div className={`${bgMap[variant]} py-4 overflow-hidden border-y border-black/5`}>
      <div className="marquee-track flex gap-0 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`${textMap[variant]} font-display text-sm tracking-[0.2em] mr-8`}
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
