'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import TransitionLink from '../components/TransitionLink';
import { useCart } from '../lib/cartContext';
import { products } from '../lib/products';
import type { Product, Sku } from '../lib/products';

function QuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSku, setSelectedSku] = useState<Sku>(product.pricing[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSku, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SKU selector (only when multiple) */}
      {product.pricing.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {product.pricing.map((sku) => (
            <button
              key={sku.label}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSku(sku); }}
              className={`flex flex-col px-4 py-2.5 rounded-xl border-2 transition-all ${
                selectedSku.label === sku.label
                  ? 'border-amber bg-amber/15'
                  : 'border-cream/20 hover:border-cream/40'
              }`}
            >
              <span className="text-cream/50 text-[9px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                {sku.label}
              </span>
              <span className="text-cream font-black leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: '1.2rem' }}>
                ₹{sku.price}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Single SKU price */}
      {product.pricing.length === 1 && (
        <div>
          <span className="text-cream/50 text-[9px] tracking-widest uppercase block mb-0.5" style={{ fontFamily: 'var(--font-syne)' }}>
            {product.pricing[0].label}
          </span>
          <span className="text-cream font-black leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: '1.8rem' }}>
            ₹{product.pricing[0].price}
          </span>
        </div>
      )}

      {/* Qty + Add to Cart */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-cream/20 rounded-full px-3 py-2">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty((q) => Math.max(1, q - 1)); }}
            className="text-cream/60 cursor-pointer hover:text-cream transition-colors w-5 h-5 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faMinus} className="w-2.5 h-2.5" />
          </button>
          <span className="text-cream font-bold w-5 text-center text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
            {qty}
          </span>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQty((q) => q + 1); }}
            className="text-cream/60 cursor-pointer hover:text-cream transition-colors w-5 h-5 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center cursor-pointer justify-center gap-2 font-bold tracking-widest uppercase text-xs px-6 py-3 rounded-full transition-all duration-300 ${
            added
              ? 'bg-amber text-cream'
              : 'bg-cream text-green hover:bg-cream/90 hover:scale-105'
          }`}
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          <FontAwesomeIcon icon={added ? faCheck : faCartShopping} className="w-3.5 h-3.5" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="bg-cream min-h-screen">

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <h1
          className="text-green leading-[1] mb-6"
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
              {/* Image panel — clicking navigates */}
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
                  style={{
                    fontFamily: 'var(--font-anton)',
                    fontSize: 'clamp(5rem, 12vw, 9rem)',
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </TransitionLink>

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

                {/* Name — links to product detail */}
                <TransitionLink href={`/products/${product.slug}`} className="group/name block mb-6">
                  <h2
                    className="text-cream leading-[0.9] group-hover/name:opacity-80 transition-opacity"
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                    }}
                  >
                    {product.name}
                  </h2>
                </TransitionLink>

                {/* Description */}
                <p
                  className="text-cream/70 leading-relaxed mb-8 max-w-md"
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

                {/* Inline quick-add */}
                <QuickAdd product={product} />

                {/* View product link */}
                <TransitionLink
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-cream/50 hover:text-cream text-xs tracking-[0.2em] uppercase font-bold mt-6 transition-colors group/link"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  View Full Details
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </TransitionLink>
              </div>
            </div>
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
