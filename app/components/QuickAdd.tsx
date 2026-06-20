'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../lib/cartContext';
import type { Product, Sku } from '../lib/products';

export default function QuickAdd({ product }: { product: Product }) {
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
