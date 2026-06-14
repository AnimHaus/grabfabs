import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products, getProductBySlug } from '../../lib/products';
import AddToCart from '../../components/AddToCart';
import TransitionLink from '../../components/TransitionLink';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Grabfabs`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const currentIndex = products.findIndex((p) => p.slug === slug);
  const nextProduct = products[(currentIndex + 1) % products.length];
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length];

  return (
    <main className="bg-cream min-h-screen">
      {/* ── Full-bleed hero image ─────────────────────────── */}
      <div className="relative h-[85vh] overflow-hidden">
        <Image
          src={product.heroImage.split('?')[0]}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark gradient overlay — bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              transparent 0%,
              transparent 30%,
              ${product.color}99 65%,
              ${product.color} 100%)`,
          }}
        />

        {/* Colour side tint */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: product.color }}
        />

        {/* Hero text — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12 md:px-16 md:pb-16 max-w-7xl mx-auto">
          {/* Tagline chip */}
          <span
            className="inline-block text-[10px] tracking-[0.3em] uppercase font-black px-4 py-1.5 rounded-full mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              background: product.accent,
              color: '#fafaf7',
            }}
          >
            {product.tagline}
          </span>

          {/* Product name — massive */}
          <h1
            className="text-cream leading-[0.85]"
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            }}
          >
            {product.name}
          </h1>
        </div>
      </div>

      {/* ── Product content ───────────────────────────────── */}
      <div
        className="py-20 md:py-28"
        style={{ background: product.color }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left: description */}
          <div>
            <p
              className="text-amber tracking-[0.25em] text-xs uppercase font-bold mb-6"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              About This Product
            </p>
            <p
              className="text-cream/80 leading-relaxed text-lg mb-8"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {product.longDescription}
            </p>
            <p
              className="text-cream/50 text-sm italic leading-relaxed"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {product.nutritionNote}
            </p>

            {/* Add to Cart */}
            <AddToCart product={product} />
          </div>

          {/* Right: highlights + image */}
          <div className="flex flex-col gap-10">
            {/* Highlights */}
            <div>
              <p
                className="text-amber tracking-[0.25em] text-xs uppercase font-bold mb-6"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Key Features
              </p>
              <ul className="space-y-4">
                {product.highlights.map((h, i) => (
                  <li key={h} className="flex items-start gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                      style={{ background: product.accent, color: '#fafaf7', fontFamily: 'var(--font-syne)' }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-cream font-semibold tracking-wide text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bold product image — square */}
            <div className="relative rounded-3xl overflow-hidden aspect-square w-full max-w-xs">
              <Image
                src={product.heroImage.split('?')[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 320px, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Next / Prev navigation ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-green/10">
        <TransitionLink
          href={`/products/${prevProduct.slug}`}
          className="group flex items-center gap-6 px-10 py-12 md:px-16 hover:bg-green-light/5 transition-colors border-b md:border-b-0 md:border-r border-green/10"
        >
          <svg
            className="w-8 h-8 text-green/40 group-hover:text-green transition-colors flex-shrink-0 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <div>
            <p
              className="text-dark/40 text-[10px] tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Previous
            </p>
            <p
              className="text-dark text-xl font-black"
              style={{ fontFamily: 'var(--font-anton)' }}
            >
              {prevProduct.name}
            </p>
          </div>
        </TransitionLink>

        <TransitionLink
          href={`/products/${nextProduct.slug}`}
          className="group flex items-center justify-end gap-6 px-10 py-12 md:px-16 hover:bg-green-light/5 transition-colors"
        >
          <div className="text-right">
            <p
              className="text-dark/40 text-[10px] tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Next
            </p>
            <p
              className="text-dark text-xl font-black"
              style={{ fontFamily: 'var(--font-anton)' }}
            >
              {nextProduct.name}
            </p>
          </div>
          <svg
            className="w-8 h-8 text-green/40 group-hover:text-green transition-colors flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </TransitionLink>
      </div>
    </main>
  );
}
