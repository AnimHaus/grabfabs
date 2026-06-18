import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import HustlerSection from './components/HustlerSection';
import ValuesSection from './components/ValuesSection';
import AwakynnSection from './components/AwakynnSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <MarqueeStrip variant="dark" />
      <AboutSection />
      <MarqueeStrip variant="amber" />
      <HustlerSection />
      <MarqueeStrip variant="light" />
      <ValuesSection />
      <AwakynnSection />
      <CTASection />
    </main>
  );
}
