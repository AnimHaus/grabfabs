'use client';

import TransitionLink from './TransitionLink';
import { products } from '../lib/products';
import useReveal from './useReveal';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';

// Featured card — wide, image-dominant (first product)
function FeaturedCard({ product }: { product: (typeof products)[0] }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal md:col-span-2"
    >
      <TransitionLink
        href={`/products/${product.slug}`}
        className="group relative rounded-3xl overflow-hidden cursor-pointer block"
        style={{ minHeight: '520px', display: 'block' }}
      >
      {/* Full-bleed image */}
      <img
        src={`${product.heroImage.split('?')[0]}?w=1200&h=700&fit=crop&q=85`}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${product.color}f0 0%, ${product.color}99 40%, transparent 75%)`,
        }}
      />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <span
          className="inline-block self-start text-[10px] tracking-[0.3em] uppercase font-black px-3 py-1.5 rounded-full mb-5"
          style={{ fontFamily: 'var(--font-syne)', background: product.accent, color: '#fafaf7' }}
        >
          {product.tagline}
        </span>
        <h3
          className="text-cream leading-[0.9] mb-3"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
        >
          {product.name}
        </h3>
        <p
          className="text-cream/70 text-sm leading-relaxed max-w-md mb-5"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {product.pricing.map((sku) => (
              <div key={sku.label} className="flex flex-col">
                <span className="text-cream/45 text-[9px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-syne)' }}>{sku.label}</span>
                <span className="text-cream font-black text-xl leading-none" style={{ fontFamily: 'var(--font-anton)' }}>₹{sku.price}</span>
              </div>
            ))}
          </div>
          <span
            className="flex items-center gap-2 text-cream text-xs tracking-widest uppercase font-bold group-hover:underline underline-offset-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            View Product
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
      </TransitionLink>
    </div>
  );
}

// Standard card — tall portrait, image top half
function ProductCard({ product, index, wide, tall }: { product: (typeof products)[0]; index: number; wide?: boolean; tall?: boolean }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useReveal(`reveal-delay-${(index % 3) + 1}`);
  return (
    <div ref={ref} className={`reveal${wide ? ' md:col-span-2' : ''}`}>
      <TransitionLink
        href={`/products/${product.slug}`}
        className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col block"
        style={{ background: product.color, minHeight: tall ? '520px' : '480px', maxHeight: wide ? '492px' : undefined, display: 'flex' }}
      >
      {/* Bold image — top 55% */}
      <div className="relative overflow-hidden" style={{ height: '55%', minHeight: '260px' }}>
        <img
          src={`${product.heroImage.split('?')[0]}?w=700&h=500&fit=crop&q=85`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transform: 'scale(1.02)' }}
        />
        {/* Bottom fade into card color */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: `linear-gradient(to top, ${product.color}, transparent)` }}
        />
        {/* Tagline chip — top left */}
        <span
          className="absolute top-4 left-4 text-[9px] tracking-[0.28em] uppercase font-black px-3 py-1.5 rounded-full"
          style={{ fontFamily: 'var(--font-syne)', background: product.accent, color: '#fafaf7' }}
        >
          {product.tagline}
        </span>
      </div>

      {/* Info — bottom */}
      <div className="flex flex-col flex-1 p-7">
        <h3
          className="text-cream leading-tight mb-2"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}
        >
          {product.name}
        </h3>
        <p
          className="text-cream/60 text-xs leading-relaxed mb-5 flex-1"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          {product.description}
        </p>
        {/* Pricing row */}
        <div className="flex items-end justify-between">
          <div className="flex gap-4">
            {product.pricing.map((sku) => (
              <div key={sku.label} className="flex flex-col">
                <span className="text-cream/35 text-[9px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-syne)' }}>{sku.label}</span>
                <span className="text-cream font-black leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem' }}>₹{sku.price}</span>
              </div>
            ))}
          </div>
          <svg
            className="w-5 h-5 text-cream/40 group-hover:text-cream group-hover:translate-x-1 transition-all duration-300"
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      </TransitionLink>
    </div>
  );
}

export default function ProductsSection() {
  const subRef = useReveal('reveal-delay-2');

  const [featured, ...rest] = products;

  return (
    <section id="products" className="py-28 md:py-36 bg-cream relative overflow-hidden">
      {/* Sticker — muesli, flips in from top-right on X axis */}
      <ScrollFlipSticker
        src="/sticker_museli.png"
        alt="museli sticker"
        size={240}
        position={{ top: '8%', right: '7.5rem' }}
        
        rotate={8}
        offset={['start end', 'center 60%']}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
            <h2
              className="font-display text-green leading-[0.9] flex-shrink-0"
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              }}
            >
              <WordReveal text="FEEL GOOD" />
              <br />
              <WordReveal text="PRODUCTS" className="text-dark" delay={0.16} />
            </h2>
            <p
              className="text-dark/55 max-w-sm leading-relaxed pb-2"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Every product is designed to keep you fueled, satisfied, and free from junk —
              introduced from global markets, crafted for the Indian hustler.
            </p>
          </div>
        </div>

        {/* Grid: featured wide card + 6 portrait cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeaturedCard product={featured} />
          {rest.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              tall={i === 0}
              wide={i === rest.length - 1}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <TransitionLink
            href="/products"
            className="inline-flex items-center gap-3 bg-green text-cream font-black tracking-[0.15em] uppercase text-sm px-10 py-4 rounded-full hover:bg-green-mid transition-colors duration-300 group"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            View All Products
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
