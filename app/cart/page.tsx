import type { Metadata } from 'next';
import CartItems from '../components/CartItems';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your Grabfabs cart — update quantities, remove items, and proceed to checkout. Free shipping on orders over ₹500.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://grabfabs.in/cart' },
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1
          className="text-green leading-none mb-12"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          YOUR CART
        </h1>
        {/* Client: cart items, qty controls, subtotal, checkout CTA */}
        <CartItems />
      </div>
    </main>
  );
}
