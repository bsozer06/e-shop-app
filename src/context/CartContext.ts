import { createContext } from 'react';
import type { CartItem, Product } from '../types';

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// @ts-expect-error - Context will be provided by CartProvider
export const CartContext = createContext<CartContextType>(undefined);
