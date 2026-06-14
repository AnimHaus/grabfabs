'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../lib/cartContext';
import TransitionLink from './TransitionLink';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-cream py-2"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <TransitionLink href="/" className="flex items-center group">
          <img
            src="https://pub-9f1519d31cf2482ba68512fc7582919d.r2.dev/logo.png"
            alt="Grabfabs"
            className="h-14 w-auto object-contain"
          />
          </TransitionLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          {/* Cart icon */}
          <TransitionLink
            href="/cart"
            className="relative text-dark/70 hover:text-green transition-colors"
            aria-label="Cart"
          >
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber text-cream text-[9px] font-black flex items-center justify-center"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </TransitionLink>
          <TransitionLink
            href="/products"
            className="bg-green text-cream text-sm font-heading font-bold tracking-widest uppercase px-6 py-2.5 rounded-full hover:bg-green-mid transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Grab Now
          </TransitionLink>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <TransitionLink href="/cart" aria-label="Cart" className="relative text-dark/70 hover:text-green transition-colors">
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber text-cream text-[9px] font-black flex items-center justify-center"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </TransitionLink>
          <TransitionLink
            href="/products"
            className="bg-green text-cream text-xs font-heading font-bold tracking-widest uppercase px-5 py-2 rounded-full"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Grab Now
          </TransitionLink>
        </div>
      </div>
    </nav>
  );
}