'use client';

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

export default function HustlerSection() {
  const subRef = useReveal('reveal-delay-1');
  const descRef = useReveal('reveal-delay-2');

  return (
    <section id="hustlers" className="py-28 md:py-36 bg-cream-dark overflow-hidden relative">
      {/* Sticker — peanut butter */}
      <ScrollFlipSticker
        src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/sticker_peanut_butter.png"
        alt="peanut butter sticker"
        size={240}
        position={{ top: '10%', right: '7.5rem' }}
        
        rotate={10}
        offset={['start end', 'center 60%']}
      />
      {/* Sticker — snowballs */}
      <ScrollFlipSticker
        src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/sticker_snowballs.png"
        alt="snowballs sticker"
        size={240}
        position={{ bottom: '4%', left: '1rem' }}
        
        rotate={20}
        offset={['20% end', 'end 60%']}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2
              className="font-display text-green leading-[0.9]"
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              }}
            >
              <WordReveal text="WHO IS A" />
              <br />
              <span style={{ WebkitTextStroke: '2px #0d3314', color: 'transparent' }}>
                <WordReveal text="HUSTLER?" delay={0.24} />
              </span>
            </h2>
            <p
              ref={descRef}
              className="reveal text-dark/65 max-w-sm leading-relaxed pb-2"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              A hustler can be anyone who&apos;s out there doing the work — building,
              healing, teaching, serving, parenting, studying. You run on ambition and you
              deserve food that keeps up.
            </p>
          </div>
        </div>

        {/* Hustler cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {hustlers.map((h, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const cardRef = useReveal(`reveal-delay-${(i % 4) + 1}`);
            return (
              <div
                key={h.role}
                ref={cardRef}
                className="reveal group bg-cream border border-green/10 rounded-2xl p-6 hover:bg-green hover:border-transparent transition-all duration-400 cursor-default"
              >
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={h.icon}
                    alt={h.role}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                </div>
                <h3
                  className="font-heading font-black text-green group-hover:text-cream text-base mb-2 transition-colors"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {h.role}
                </h3>
                <p
                  className="text-dark/55 group-hover:text-cream/70 text-xs leading-relaxed transition-colors"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 pt-16 border-t border-green/15 text-center">
          <p
            className="font-display text-green/20 select-none"
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
    </section>
  );
}
