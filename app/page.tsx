import type { Metadata } from 'next';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import ValuesSection from './components/ValuesSection';
import AwakynnSection from './components/AwakynnSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'Grabfabs — Feel Good, On the Go Foods',
  description:
    'Grabfabs delivers Feel Good, On the Go foods for hustlers. Muesli, peanut butter, energy bites, gluten-free bread, and makhana — smart nutrition without the junk, designed for busy, health-conscious people.',
  keywords: [
    'healthy snacks India',
    'feel good food',
    'on the go healthy food',
    'muesli India',
    'natural peanut butter India',
    'energy bites',
    'gluten-free bread India',
    'makhana snacks',
    'healthy food delivery India',
    'Grabfabs',
    'clean eating India',
    'fitness nutrition India',
  ],
  authors: [{ name: 'Grabfabs', url: 'https://grabfabs.in' }],
  creator: 'Grabfabs',
  publisher: 'Grabfabs',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: 'https://grabfabs.in' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Grabfabs',
    title: 'Grabfabs — Feel Good, On the Go Foods',
    description: 'Smart nutrition without the junk. Muesli, peanut butter, energy bites, gluten-free bread and makhana — for busy, health-conscious hustlers.',
    url: 'https://grabfabs.in',
    images: [{ url: 'https://grabfabs.in/og.jpg', width: 1200, height: 630, alt: 'Grabfabs – Feel Good, On the Go Foods' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grabfabs — Feel Good, On the Go Foods',
    description: 'Smart nutrition without the junk — muesli, peanut butter, energy bites, gluten-free bread and makhana.',
    images: ['https://grabfabs.in/og.jpg'],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <MarqueeStrip variant="dark" />
      <AboutSection />
      <MarqueeStrip variant="light" />
      <ValuesSection />
      <AwakynnSection />
      <CTASection />
    </main>
  );
}
