'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/app/lib/cartContext';
import { api, type OrderResponse } from '@/app/lib/api';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const empty: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  line1: '', line2: '', city: '', state: '', pincode: '',
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [form, setForm] = useState<FormData>(empty);
  const [placedOrder, setPlacedOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingFee = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shippingFee;

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function placeOrder() {
    setLoading(true);
    setError('');
    try {
      // Resolve backend product IDs
      const resolvedItems = await Promise.all(
        items.map(async (cartItem) => {
          const bp = await api.getProduct(cartItem.product.slug);
          return {
            product_id: bp.id,
            slug: cartItem.product.slug,
            name: cartItem.product.name,
            sku_label: cartItem.sku.label,
            quantity: cartItem.quantity,
            unit_price: cartItem.sku.price,
          };
        })
      );

      const order = await api.createOrder({
        items: resolvedItems,
        shipping_address: {
          full_name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        guest_email: form.email,
      });

      setPlacedOrder(order);
      clearCart();
      setStep('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'bg-transparent border border-dark/20 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-green transition-colors';
  const labelCls = 'text-xs tracking-widest uppercase text-dark/50';
  const fieldCls = 'flex flex-col gap-1.5';

  if (step === 'success') {
    return (
      <main className="min-h-screen bg-cream pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-green text-2xl">✓</span>
          </div>
          <h1 className="text-green mb-3" style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
            ORDER PLACED!
          </h1>
          <p className="text-dark/60 leading-relaxed mb-2" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Thanks for your order. We'll collect payment on delivery.
          </p>
          {placedOrder && (
            <p className="text-dark/40 text-sm mb-8" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Order total: <strong className="text-dark">₹{placedOrder.total}</strong>
            </p>
          )}
          <Link
            href="/products"
            className="bg-green text-cream font-heading font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-green-mid transition-colors inline-block"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h1 className="text-green leading-none mb-4" style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          CHECKOUT
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-12">
          {['Details', 'Confirm'].map((s, i) => {
            const isActive = (i === 0 && step === 'details') || (i === 1 && step === 'confirm');
            const isDone = i === 0 && step === 'confirm';
            return (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${isActive ? 'bg-green text-cream' : isDone ? 'bg-amber text-cream' : 'bg-dark/10 text-dark/40'}`} style={{ fontFamily: 'var(--font-syne)' }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span className={`text-xs tracking-widest uppercase font-bold ${isActive ? 'text-green' : 'text-dark/40'}`} style={{ fontFamily: 'var(--font-syne)' }}>{s}</span>
                {i < 1 && <div className="w-8 h-px bg-dark/15 mx-1" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            {step === 'details' && (
              <form onSubmit={(e) => { e.preventDefault(); setStep('confirm'); }} className="flex flex-col gap-8">
                <fieldset className="flex flex-col gap-4">
                  <legend className="text-dark font-black tracking-[0.2em] uppercase text-sm mb-2" style={{ fontFamily: 'var(--font-syne)' }}>Contact</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>First Name</label><input required type="text" autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                    <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>Last Name</label><input required type="text" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                  </div>
                  <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>Email</label><input required type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                  <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>Phone</label><input required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                </fieldset>

                <fieldset className="flex flex-col gap-4">
                  <legend className="text-dark font-black tracking-[0.2em] uppercase text-sm mb-2" style={{ fontFamily: 'var(--font-syne)' }}>Shipping Address</legend>
                  <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>Address Line 1</label><input required type="text" autoComplete="address-line1" value={form.line1} onChange={(e) => set('line1', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                  <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>Address Line 2 <span className="normal-case opacity-50">(optional)</span></label><input type="text" autoComplete="address-line2" value={form.line2} onChange={(e) => set('line2', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>City</label><input required type="text" autoComplete="address-level2" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                    <div className={fieldCls}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>State</label><input required type="text" autoComplete="address-level1" value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                    <div className={`${fieldCls} col-span-2 sm:col-span-1`}><label className={labelCls} style={{ fontFamily: 'var(--font-syne)' }}>PIN Code</label><input required type="text" autoComplete="postal-code" pattern="\d{6}" maxLength={6} value={form.pincode} onChange={(e) => set('pincode', e.target.value)} className={inputCls} style={{ fontFamily: 'var(--font-dm-sans)' }} /></div>
                  </div>
                </fieldset>

                <button type="submit" className="w-full bg-green text-cream font-heading font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:bg-green-mid transition-colors" style={{ fontFamily: 'var(--font-syne)' }}>
                  Continue to Confirm →
                </button>
              </form>
            )}

            {step === 'confirm' && (
              <div className="flex flex-col gap-6">
                <p className="text-dark/60 leading-relaxed" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  Review your order and place it below. Payment will be collected on delivery.
                </p>
                <div className="bg-green/5 border border-green/15 rounded-2xl p-6 flex flex-col gap-2 text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                  <p className="text-xs tracking-widest uppercase font-bold text-green mb-1" style={{ fontFamily: 'var(--font-syne)' }}>Delivering to</p>
                  <p className="text-dark font-medium">{form.firstName} {form.lastName}</p>
                  <p className="text-dark/60">{form.line1}{form.line2 ? `, ${form.line2}` : ''}</p>
                  <p className="text-dark/60">{form.city}, {form.state} — {form.pincode}</p>
                  <p className="text-dark/60">{form.phone}</p>
                </div>
                <div className="bg-green/5 border border-green/15 rounded-2xl p-6 flex flex-col gap-3">
                  <p className="text-xs tracking-widest uppercase font-bold text-green" style={{ fontFamily: 'var(--font-syne)' }}>Payment Method</p>
                  <p className="text-dark text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>Cash on Delivery (COD)</p>
                </div>
                {error && <p className="text-red-600 text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>{error}</p>}
                <button
                  onClick={placeOrder}
                  disabled={loading || items.length === 0}
                  className="w-full bg-amber text-cream font-heading font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {loading ? 'Placing Order…' : 'Place Order ✓'}
                </button>
                <button onClick={() => setStep('details')} className="w-full text-center text-dark/50 text-sm tracking-widest uppercase hover:text-green transition-colors" style={{ fontFamily: 'var(--font-syne)' }}>
                  ← Back to Details
                </button>
              </div>
            )}
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-32 bg-green/5 border border-green/15 rounded-3xl p-7 flex flex-col gap-5">
              <h2 className="text-dark font-black tracking-[0.2em] uppercase text-sm" style={{ fontFamily: 'var(--font-syne)' }}>Order Summary</h2>
              {items.length === 0 ? (
                <p className="text-dark/40 text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.sku.label}`} className="flex items-center gap-4 py-3 border-b border-dark/10">
                    <div className="w-14 h-14 rounded-xl bg-green/20 overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-dark text-sm font-bold leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>{item.product.name}</p>
                      <p className="text-dark/40 text-xs mt-0.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>{item.sku.label} · Qty {item.quantity}</p>
                    </div>
                    <span className="text-dark font-black" style={{ fontFamily: 'var(--font-anton)' }}>₹{item.sku.price * item.quantity}</span>
                  </div>
                ))
              )}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark/50" style={{ fontFamily: 'var(--font-dm-sans)' }}>Subtotal</span>
                  <span className="text-dark font-bold" style={{ fontFamily: 'var(--font-syne)' }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark/50" style={{ fontFamily: 'var(--font-dm-sans)' }}>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green font-bold text-xs tracking-widest uppercase' : 'text-dark font-bold'} style={{ fontFamily: 'var(--font-syne)' }}>
                    {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-dark/10">
                  <span className="text-dark font-black tracking-widest uppercase text-sm" style={{ fontFamily: 'var(--font-syne)' }}>Total</span>
                  <span className="text-dark font-black text-2xl" style={{ fontFamily: 'var(--font-anton)' }}>₹{total}</span>
                </div>
              </div>
              <Link href="/cart" className="text-center text-dark/40 text-xs tracking-widest uppercase hover:text-green transition-colors" style={{ fontFamily: 'var(--font-syne)' }}>
                ← Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
