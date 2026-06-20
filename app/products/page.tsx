import type { Metadata } from 'next';
import Image from 'next/image';
import { products } from '../lib/products';
import QuickAdd from '../components/QuickAdd';
import TransitionLink from '../components/TransitionLink';

export const metadata: Metadata = {
  title: 'Shop Feel Good Foods',
  description:
    'Shop Grabfabs\'s full range of Feel Good foods — premium muesli, natural peanut butter, no-bake energy bites, gluten-free bread, and roasted makhana. Clean ingredients, zero compromise.',
  keywords: [
    'buy muesli India',
    'natural peanut butter buy online',
    'energy bites buy India',
    'gluten-free bread online India',
    'makhana snacks online',
    'healthy snack shop India',
    'Grabfabs products',
    'clean food India',
    'no junk snacks India',
  ],
  alternates: { canonical: 'https://grabfabs.vercel.app/products' },
  openGraph: {
    title: 'Shop Feel Good Foods – Grabfabs',
    description: 'Premium muesli, natural peanut butter, energy bites, gluten-free bread and makhana. Clean ingredients — no junk.',
    url: 'https://grabfabs.vercel.app/products',
    images: [{ url: 'https://grabfabs.vercel.app/og.jpg', width: 1200, height: 630, alt: 'Grabfabs Products' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Feel Good Foods – Grabfabs',
    description: 'Clean muesli, peanut butter, energy bites, gluten-free bread and makhana. No junk.',
    images: ['https://grabfabs.vercel.app/og.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <main className="bg-cream min-h-screen">

      {/* Page hero */}
      <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h1
          className="text-green leading-[1] mb-6"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
        >
          FEEL GOOD
          <br />
          <span style={{ WebkitTextStroke: '2px #0d3314', color: 'transparent' }}>
            PRODUCTS
          </span>
        </h1>
        <p
          className="text-dark/55 max-w-lg leading-relaxed text-lg"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Every product is designed to keep you fueled, satisfied, and free from junk — without
          making eating well feel like a chore.
        </p>
      </section>

      <div className="divide-y divide-green/10">
        {products.map((product, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={product.slug}
              className={`grid grid-cols-1 md:grid-cols-2 min-h-[70vh] ${
                isEven ? '' : 'md:[&>*:first-child]:order-2'
              }`}
            >
              {/* Image panel */}
              <TransitionLink href={`/products/${product.slug}`} className="block group relative overflow-hidden min-h-[55vw] md:min-h-0">
                <Image
                  src={product.heroImage.split('?')[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <span
                  className="absolute top-6 left-6 text-white/30 select-none"
                  style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(5rem, 12vw, 9rem)', lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </TransitionLink>

              {/* Info panel */}
              <div
                className="flex flex-col justify-center px-10 py-14 md:px-16 md:py-20"
                style={{ background: product.color }}
              >
                <span
                  className="inline-block text-[10px] tracking-[0.3em] uppercase font-black px-3 py-1.5 rounded-full mb-8 self-start"
                  style={{ fontFamily: 'var(--font-syne)', background: product.accent, color: '#fafaf7' }}
                >
                  {product.tagline}
                </span>

                <TransitionLink href={`/products/${product.slug}`} className="group/name block mb-6">
                  <h2
                    className="text-cream leading-[0.9] group-hover/name:opacity-80 transition-opacity"
                    style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                  >
                    {product.name}
                  </h2>
                </TransitionLink>

                <p
                  className="text-cream/70 leading-relaxed mb-8 max-w-md"
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem' }}
                >
                  {product.description}
                </p>

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

                {/* Client: qty selector + add to cart */}
                <QuickAdd product={product} />

                <TransitionLink
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-cream/50 hover:text-cream text-xs tracking-[0.2em] uppercase font-bold mt-6 transition-colors group/link"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  View Full Details
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </TransitionLink>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-20 text-center px-6">
        <p
          className="text-green/15 select-none"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1 }}
        >
          GOODNESS \u00b7 GRABBED \u00b7 FABULOUS
        </p>
      </div>
    </main>
  );
}
