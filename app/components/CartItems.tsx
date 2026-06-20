'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../lib/cartContext';
import TransitionLink from './TransitionLink';

export default function CartItems() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-24 text-center">
        <FontAwesomeIcon icon={faCartShopping} className="w-16 h-16 text-dark/20" />
        <p className="text-dark/50 text-lg" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          Your cart is empty.
        </p>
        <Link
          href="/products"
          className="bg-green text-cream font-heading font-bold tracking-widest uppercase text-sm px-8 py-3 rounded-full hover:bg-green-mid transition-colors"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col divide-y divide-dark/10">
        {items.map(({ product, sku, quantity }) => (
          <div key={`${product.id}-${sku.label}`} className="flex items-center gap-6 py-6">
            {/* Image */}
            <div
              className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
              style={{ background: product.color }}
            >
              <img
                src={`${product.heroImage.split('?')[0]}?w=160&h=160&fit=crop&q=80`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-dark text-xl leading-tight"
                style={{ fontFamily: 'var(--font-anton)' }}
              >
                {product.name}
              </h3>
              <p className="text-dark/50 text-xs tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-syne)' }}>
                {sku.label}
              </p>
            </div>
            {/* Qty */}
            <div className="flex items-center gap-3 border border-dark/15 rounded-full px-3 py-1.5">
              <button
                onClick={() => updateQuantity(product.id, sku.label, quantity - 1)}
                className="text-dark/50 hover:text-green transition-colors w-5 h-5 flex items-center justify-center"
                aria-label="Decrease"
              >
                <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
              </button>
              <span className="w-5 text-center text-dark font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, sku.label, quantity + 1)}
                className="text-dark/50 hover:text-green transition-colors w-5 h-5 flex items-center justify-center"
                aria-label="Increase"
              >
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
              </button>
            </div>
            {/* Price */}
            <div className="text-right flex-shrink-0 w-16">
              <span className="text-dark font-black text-xl" style={{ fontFamily: 'var(--font-anton)' }}>
                ₹{sku.price * quantity}
              </span>
            </div>
            {/* Remove */}
            <button
              onClick={() => removeItem(product.id, sku.label)}
              className="text-dark/30 hover:text-red-500 transition-colors flex-shrink-0"
              aria-label="Remove item"
            >
              <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t border-dark/10 pt-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-dark/60 tracking-widest uppercase text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
            Subtotal
          </span>
          <span className="text-dark font-black text-2xl" style={{ fontFamily: 'var(--font-anton)' }}>
            ₹{subtotal}
          </span>
        </div>
        <p className="text-dark/40 text-xs" style={{ fontFamily: 'var(--font-dm-sans)' }}>
          Shipping &amp; taxes calculated at checkout.
        </p>
        <Link
          href="/checkout"
          className="w-full mt-2 bg-green text-cream font-heading font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full text-center hover:bg-green-mid transition-colors"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Proceed to Checkout →
        </Link>
        <TransitionLink
          href="/products"
          className="w-full text-center text-dark/50 text-sm tracking-widest uppercase hover:text-green transition-colors"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Continue Shopping
        </TransitionLink>
      </div>
    </>
  );
}
