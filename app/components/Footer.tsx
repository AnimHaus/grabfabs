'use client';

import Link from 'next/link';

export default function Footer() {
  const productLinks = [
    { name: 'Muesli', slug: 'muesli' },
    { name: 'Peanut Butter', slug: 'peanut-butter' },
    { name: 'Bites', slug: 'bites' },
    { name: 'Loaf', slug: 'loaf' },
    { name: 'Makhana', slug: 'makhana' },
    { name: 'Fruit Gels', slug: 'fruit-gels' },
    { name: 'Snowball & Coco', slug: 'snowball-coco' },
  ];
  const companyLinks = ['About', 'Our Story', 'For Hustlers', 'Contact'];
  const awakynnLinks = ['Yoga & Pranayama', 'Meditation', 'Ayurvedic Diet', 'Mantra Chanting', 'Clarity Sessions'];
  const connectLinks = ['Instagram', 'LinkedIn', 'Twitter / X'];

  return (
    <footer className="bg-dark text-cream/70">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/alter_logo.png"
                alt="Grabfabs"
                width={250}
                height={120}
                className="object-contain"
              />
            </div>
            <p
              className="text-cream/50 text-sm leading-relaxed max-w-xs mb-8"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Feel Good, On the Go foods for the modern hustler. Clean ingredients, honest
              nutrition, zero junk — now in India.
            </p>
            <p
              className="text-cream/30 text-xs tracking-wider"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Made in India. Made for Hustlers.
            </p>
          </div>

          {/* Products column */}
          <div>
            <h4
              className="text-cream font-heading font-black tracking-[0.2em] text-xs uppercase mb-6"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-cream/45 hover:text-amber text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4
              className="text-cream font-heading font-black tracking-[0.2em] text-xs uppercase mb-6"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-cream/45 hover:text-amber text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Awakynn column */}
          <div>
            <h4
              className="text-[#7ecf7e] font-heading font-black tracking-[0.2em] text-xs uppercase mb-1"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Awakynn
            </h4>
            <p
              className="text-cream/25 text-[10px] tracking-widest uppercase mb-5"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Sister Brand
            </p>
            <ul className="space-y-3 mb-6">
              {awakynnLinks.map((item) => (
                <li key={item}>
                  <a
                    href="https://awakynn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/40 hover:text-[#7ecf7e] text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://awakynn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#7ecf7e] text-xs tracking-widest uppercase font-bold hover:underline underline-offset-4 transition-all"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Visit Awakynn
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Connect column */}
          <div>
            <h4
              className="text-cream font-heading font-black tracking-[0.2em] text-xs uppercase mb-6"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-cream/45 hover:text-amber text-sm transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-cream/25 text-xs"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            © {new Date().getFullYear()} Grabfabs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-cream/25 hover:text-cream/50 text-xs transition-colors"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {item}
              </a>
            ))}
            <p
              className="text-cream/25 text-xs"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Developed by{' '}
              <a
                href="https://animhaus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream/50 transition-colors underline underline-offset-2"
              >
                AnimHaus
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Big ghost text at bottom */}
      <div className="overflow-hidden">
        <p
          className="font-display text-cream/[0.03] leading-none text-center pb-2 select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(5rem, 15vw, 18rem)',
          }}
        >
          GRABFABS
        </p>
      </div>
    </footer>
  );
}
