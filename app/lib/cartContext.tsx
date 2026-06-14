'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Product, Sku } from './products';

export type CartItem = {
  product: Product;
  sku: Sku;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, sku: Sku, quantity?: number) => void;
  removeItem: (productId: number, skuLabel: string) => void;
  updateQuantity: (productId: number, skuLabel: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, sku: Sku, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.sku.label === sku.label
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.sku.label === sku.label
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, sku, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: number, skuLabel: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.sku.label === skuLabel))
    );
  }, []);

  const updateQuantity = useCallback((productId: number, skuLabel: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.sku.label === skuLabel ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.sku.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
