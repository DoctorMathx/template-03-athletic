"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { products } from "@/mock/products";

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, variantId: string) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, qty: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    return sum + product.price.amount * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
