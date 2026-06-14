'use client';

import TransitionLink from '../components/TransitionLink';
import { products } from '../lib/products';

export default function ProductsPage() {
  return (
    <main className="bg-cream min-h-screen">

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p
          className="text-amber tracking-[0.3em] text-xs uppercase font-semibold mb-4"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          The Full Range
        </p>
        <h1
          className="text-green leading-[0.85] mb-6"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(4.5rem, 13vw, 11rem)',
          }}
        >
          FEEL GOOD
          <br />
          <span
            style={{
              WebkitTextStroke: '2px #0d3314',
              color: 'transparent',
            }}
          >
            PRODUCTS
          </span>
        </h1>
        <p
          className="text-dark/55 max-w-lg leading-relaxed text-lg"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Every product is designed to keep you fueled, satisfied, and free
          from junk — without making eating well feel like a chore.
        </p>
      </section>

      {/* ── Product rows ──────────────────────────────────── */}
      <div className="divide-y divide-green/10">
        {products.map((product, i) => {
          const isEven = i % 2 === 0;
          return (
            <TransitionLink
              key={product.slug}
              href={`/products/${product.slug}`}
              className="block group"
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 min-h-[70vh] ${
                  isEven ? '' : 'md:[&>*:first-child]:order-2'
                }`}
              >
                {/* Image panel */}
                <div className="relative overflow-hidden min-h-[55vw] md:min-h-0">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  {/* Index number */}
                  <span
                    className="absolute top-6 left-6 text-white/30 select-none"
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(5rem, 12vw, 9rem)',
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Info panel */}
                <div
                  className="flex flex-col justify-center px-10 py-14 md:px-16 md:py-20"
                  style={{ background: product.color }}
                >
                  {/* Tagline */}
                  <span
                    className="inline-block text-[10px] tracking-[0.3em] uppercase font-black px-3 py-1.5 rounded-full mb-8 self-start"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      background: product.accent,
                      color: '#fafaf7',
                    }}
                  >
                    {product.tagline}
                  </span>

                  {/* Name */}
                  <h2
                    className="text-cream leading-[0.9] mb-6"
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                    }}
                  >
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-cream/70 leading-relaxed mb-10 max-w-md"
                    style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem' }}
                  >
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <ul className="flex flex-wrap gap-2 mb-10">
                    {product.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-[11px] tracking-widest uppercase font-bold px-3 py-1 rounded-full border border-cream/20 text-cream/80"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    {product.pricing.map((sku) => (
                      <div
                        key={sku.label}
                        className="flex flex-col items-start px-4 py-3 rounded-2xl border border-cream/15"
                      >
                        <span
                          className="text-cream/50 text-[10px] tracking-widest uppercase mb-0.5"
                          style={{ fontFamily: 'var(--font-syne)' }}
                        >
                          {sku.label}
                        </span>
                        <span
                          className="text-cream font-black text-lg leading-none"
                          style={{ fontFamily: 'var(--font-anton)' }}
                        >
                          ₹{sku.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-cream">
                    <span
                      className="text-sm tracking-[0.2em] uppercase font-bold group-hover:underline underline-offset-4"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      View Product
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </TransitionLink>
          );
        })}
      </div>

      {/* ── Footer note ───────────────────────────────────── */}
      <div className="py-20 text-center px-6">
        <p
          className="text-green/15 select-none"
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            lineHeight: 1,
          }}
        >
          GOODNESS · GRABBED · FABULOUS
        </p>
      </div>
    </main>
  );
}
