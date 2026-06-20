import type { Metadata } from 'next';
import CheckoutFlow from '../components/CheckoutFlow';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Grabfabs order. Cash on delivery. Free shipping on orders over ₹500.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://grabfabs.in/checkout' },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h1
          className="text-green leading-none mb-4"
          style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          CHECKOUT
        </h1>
        {/* Client: form steps, order summary, place order */}
        <CheckoutFlow />
      </div>
    </main>
  );
}
