import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { useCart } from './../hooks/useCart';
import type { Product } from '../types';
import toast from 'react-hot-toast';

// Mock product data
const mockProduct1: Product = {
  id: 1,
  title: 'Test Product 1',
  price: 29.99,
  description: 'Test description 1',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
  rating: { rate: 4.5, count: 100 },
};

const mockProduct2: Product = {
  id: 2,
  title: 'Test Product 2',
  price: 49.99,
  description: 'Test description 2',
  category: 'clothing',
  image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
  rating: { rate: 4.0, count: 50 },
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it('should load cart from localStorage if available', () => {
      const savedCart = [
        { product: mockProduct1, quantity: 2 },
      ];
      localStorage.setItem('cart', JSON.stringify(savedCart));

      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual(savedCart);
      expect(result.current.totalItems).toBe(2);
    });
  });

  describe('addToCart', () => {
    it('should add new product to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product).toEqual(mockProduct1);
      expect(result.current.items[0].quantity).toBe(1);
      expect(toast.success).toHaveBeenCalledWith('Added to cart');
    });

    it('should increment quantity if product already exists', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(toast.success).toHaveBeenCalledWith('Quantity updated in cart');
    });

    it('should add multiple different products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.totalItems).toBe(2);
    });

    it('should persist to localStorage', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      await waitFor(() => {
        const saved = localStorage.getItem('cart');
        expect(saved).toBeTruthy();
        const parsed = JSON.parse(saved!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].product.id).toBe(mockProduct1.id);
      });
    });
  });

  describe('removeFromCart', () => {
    it('should remove product from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeFromCart(mockProduct1.id);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe(mockProduct2.id);
      expect(toast.success).toHaveBeenCalledWith('Removed from cart');
    });

    it('should not error when removing non-existent product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.removeFromCart(999);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update product quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.totalItems).toBe(5);
    });

    it('should remove product if quantity is 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
      expect(toast.success).toHaveBeenCalledWith('Removed from cart');
    });

    it('should remove product if quantity is negative', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('should not affect other products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.items[1].quantity).toBe(1);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
      expect(toast.success).toHaveBeenCalledWith('Cart cleared');
    });

    it('should clear localStorage', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.clearCart();
      });

      await waitFor(() => {
        const saved = localStorage.getItem('cart');
        const parsed = JSON.parse(saved!);
        expect(parsed).toEqual([]);
      });
    });
  });

  describe('Computed Values', () => {
    it('should calculate totalItems correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      // 2 of product1 + 1 of product2 = 3 total items
      expect(result.current.totalItems).toBe(3);
    });

    it('should calculate totalPrice correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1); // 29.99
        result.current.addToCart(mockProduct1); // 29.99
        result.current.addToCart(mockProduct2); // 49.99
      });

      // (29.99 * 2) + (49.99 * 1) = 109.97
      expect(result.current.totalPrice).toBeCloseTo(109.97, 2);
    });

    it('should update totals when quantity changes', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.totalPrice).toBeCloseTo(29.99, 2);

      act(() => {
        result.current.updateQuantity(mockProduct1.id, 3);
      });

      expect(result.current.totalPrice).toBeCloseTo(89.97, 2);
      expect(result.current.totalItems).toBe(3);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useCart is used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');

      consoleSpy.mockRestore();
    });
  });
});
