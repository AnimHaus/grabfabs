'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../lib/cartContext';
import type { Product, Sku } from '../lib/products';

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSku, setSelectedSku] = useState<Sku>(product.pricing[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, selectedSku, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* SKU selector */}
      {product.pricing.length > 1 && (
        <div>
          <p className="text-amber tracking-[0.25em] text-xs uppercase font-bold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
            Size
          </p>
          <div className="flex flex-wrap gap-3">
            {product.pricing.map((sku) => (
              <button
                key={sku.label}
                onClick={() => setSelectedSku(sku)}
                className={`flex flex-col px-6 py-3 rounded-2xl border-2 transition-all ${
                  selectedSku.label === sku.label
                    ? 'border-amber bg-amber/10'
                    : 'border-cream/20 hover:border-cream/40'
                }`}
              >
                <span className="text-cream/50 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                  {sku.label}
                </span>
                <span className="text-cream font-black leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: '1.6rem' }}>
                  ₹{sku.price}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Single SKU price display */}
      {product.pricing.length === 1 && (
        <div className="flex flex-col">
          <span className="text-cream/50 text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
            {product.pricing[0].label}
          </span>
          <span className="text-cream font-black leading-none" style={{ fontFamily: 'var(--font-anton)', fontSize: '2.5rem' }}>
            ₹{product.pricing[0].price}
          </span>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-4">
        {/* Qty */}
        <div className="flex items-center gap-3 border border-cream/20 rounded-full px-4 py-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-cream/60 hover:text-cream transition-colors w-6 h-6 flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
          </button>
          <span className="text-cream font-bold w-6 text-center" style={{ fontFamily: 'var(--font-syne)' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-cream/60 hover:text-cream transition-colors w-6 h-6 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-3 font-heading font-bold tracking-widest uppercase text-sm px-8 py-3.5 rounded-full transition-all ${
            added
              ? 'bg-amber text-cream'
              : 'bg-cream text-green hover:bg-cream/90'
          }`}
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          <FontAwesomeIcon icon={added ? faCheck : faCartShopping} className="w-4 h-4" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>

      {/* Go to cart */}
      <button
        onClick={() => router.push('/cart')}
        className="text-cream/50 text-xs tracking-widest uppercase hover:text-cream transition-colors text-center"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        View Cart →
      </button>
    </div>
  );
}
