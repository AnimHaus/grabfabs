'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import TransitionLink from './TransitionLink';
import { products } from '../lib/products';
import { useCart } from '../lib/cartContext';
import useReveal from './useReveal';
import WordReveal from './WordReveal';
import ScrollFlipSticker from './ScrollFlipSticker';
import type { Product, Sku } from '../lib/products';

function QuickAdd({ product, light = false }: { product: Product; light?: boolean }) {
  const { addItem } = useCart();
  const [selectedSku, setSelectedSku] = useState<Sku>(product.pricing[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function stop(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleAdd(e: React.MouseEvent) {
    stop(e);
    addItem(product, selectedSku, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const border = light ? 'border-cream/20' : 'border-cream/20';
  const text = 'text-cream';

  return (
    <div className="flex flex-col gap-3" onClick={stop}>
      {/* SKU selector */}
      {product.pricing.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {product.pricing.map((sku) => (
            <button
              key={sku.label}
              onClick={(e) => { stop(e); setSelectedSku(sku); }}
              className={`flex flex-col px-3 py-2 rounded-xl border-2 transition-all ${
                selectedSku.label === sku.label
                  ? 'border-amber bg-amber/15'
                  : `${border} hover:border-cream/40`
              }`}
            >
              <span className={`${text}/50 text-[9px] tracking-widest uppercase`} style={{ fontFamily: 'var(--font-syne)' }}>
                {sku.label}
              </span>
              <span className={`${text} font-black leading-none`} style={{ fontFamily: 'var(--font-anton)', fontSize: '1.1rem' }}>
                ₹{sku.price}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Single SKU price */}
      {product.pricing.length === 1 && (
        <div>
          <span className={`${text}/45 text-[9px] tracking-widest uppercase block`} style={{ fontFamily: 'var(--font-syne)' }}>
            {product.pricing[0].label}
          </span>
          <span className={`${text} font-black leading-none`} style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem' }}>
            ₹{product.pricing[0].price}
          </span>
        </div>
      )}

      {/* Qty + Add to Cart */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 border ${border} rounded-full px-3 py-2`}>
          <button
            onClick={(e) => { stop(e); setQty((q) => Math.max(1, q - 1)); }}
            className={`${text}/60 hover:${text} transition-colors cursor-pointer w-4 h-4 flex items-center justify-center`}
          >
            <FontAwesomeIcon icon={faMinus} className="w-2 h-2" />
          </button>
          <span className={`${text} font-bold w-4 text-center text-xs`} style={{ fontFamily: 'var(--font-syne)' }}>
            {qty}
          </span>
          <button
            onClick={(e) => { stop(e); setQty((q) => q + 1); }}
            className={`${text}/60 hover:${text} transition-colors cursor-pointer w-4 h-4 flex items-center justify-center`}
          >
            <FontAwesomeIcon icon={faPlus} className="w-2 h-2" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center cursor-pointer justify-center gap-2 font-bold tracking-widest uppercase text-[10px] px-4 py-2.5 rounded-full transition-all duration-300 ${
            added
              ? 'bg-amber text-cream'
              : 'bg-cream text-green hover:bg-cream/90 hover:scale-102'
          }`}
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          <FontAwesomeIcon icon={added ? faCheck : faCartShopping} className="w-3 h-3" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// Featured card — wide, image-dominant (first product)
function FeaturedCard({ product }: { product: (typeof products)[0] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal md:col-span-2">
      <div
        className="group relative rounded-3xl overflow-hidden cursor-pointer"
        style={{ minHeight: '520px' }}
      >
        {/* Full-bleed image */}
        <TransitionLink href={`/products/${product.slug}`} className="block absolute inset-0">
          <Image
            src={product.heroImage.split('?')[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </TransitionLink>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
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
          <TransitionLink href={`/products/${product.slug}`} className="block">
            <h3
              className="text-cream leading-[0.9] mb-3 hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              {product.name}
            </h3>
          </TransitionLink>
          <p
            className="text-cream/70 text-sm leading-relaxed max-w-md mb-5"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            {product.description}
          </p>
          <QuickAdd product={product} />
        </div>
      </div>
    </div>
  );
}

// Standard card — tall portrait, image top half
function ProductCard({ product, index, wide, tall }: { product: (typeof products)[0]; index: number; wide?: boolean; tall?: boolean }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useReveal(`reveal-delay-${(index % 3) + 1}`);
  return (
    <div ref={ref} className={`reveal${wide ? ' md:col-span-2' : ''} flex flex-col`}>
      <div
        className="group relative rounded-3xl overflow-hidden flex flex-col h-full"
        style={{ background: product.color, minHeight: tall ? '520px' : '480px' }}
      >
      {/* Bold image — top 55% */}
      <TransitionLink href={`/products/${product.slug}`} className="block relative overflow-hidden" style={{ height: '55%', minHeight: '260px' }}>
        <Image
          src={product.heroImage.split('?')[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ transform: 'scale(1.02)' }}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
      </TransitionLink>

      {/* Info — bottom */}
      <div className="flex flex-col flex-1 p-7">
        <TransitionLink href={`/products/${product.slug}`} className="block mb-2">
          <h3
            className="text-cream leading-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}
          >
            {product.name}
          </h3>
        </TransitionLink>
        <p
          className="text-cream/60 text-xs leading-relaxed mb-5 flex-1"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          {product.description}
        </p>
        <QuickAdd product={product} />
      </div>
      </div>
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
        src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/sticker_museli.png"
        alt="museli sticker"
        size={240}
        position={{ top: '8%', right: '7.5rem' }}
        rotate={8}
        offset={['start end', 'center 60%']}
        className="hidden md:block"
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
