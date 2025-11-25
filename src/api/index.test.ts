import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { productsApi, authApi } from './index';
import type { Product, AuthResponse } from '../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    description: 'Test product 1',
    category: 'electronics',
    image: 'assets/61IBBVJvSDL._AC_SY879_t.png',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 49.99,
    description: 'Test product 2',
    category: 'clothing',
    image: 'assets/61IBBVJvSDL._AC_SY879_t.png',
    rating: { rate: 4.0, count: 50 },
  },
];

const mockProduct: Product = mockProducts[0];

const mockCategories = ['electronics', 'jewelry', 'men\'s clothing', 'women\'s clothing'];

const mockAuthResponse: AuthResponse = {
  token: 'mock-jwt-token-12345',
};

// Setup MSW server
const server = setupServer(
  // Products endpoints - more specific routes first
  http.get('https://fakestoreapi.com/products/categories', () => {
    return HttpResponse.json(mockCategories);
  }),
  
  http.get('https://fakestoreapi.com/products/category/:category', ({ params }) => {
    const category = params.category as string;
    const filtered = mockProducts.filter(p => p.category === category);
    return HttpResponse.json(filtered);
  }),
  
  http.get('https://fakestoreapi.com/products/:id', ({ params }) => {
    const id = Number(params.id);
    const product = mockProducts.find(p => p.id === id);
    
    if (product) {
      return HttpResponse.json(product);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json(mockProducts);
  }),
  
  // Auth endpoint
  http.post('https://fakestoreapi.com/auth/login', async ({ request }) => {
    const body = await request.json() as { username: string; password: string };
    
    if (body.username === 'testuser' && body.password === 'testpass') {
      return HttpResponse.json(mockAuthResponse);
    }
    return new HttpResponse(null, { status: 401 });
  })
);

describe('API Layer', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
  });

  describe('productsApi', () => {
    describe('getAll', () => {
      it('should fetch all products successfully', async () => {
        const products = await productsApi.getAll();
        
        expect(products).toEqual(mockProducts);
        expect(products).toHaveLength(2);
        expect(products[0].title).toBe('Product 1');
      });

      it('should handle network errors', async () => {
        server.use(
          http.get('https://fakestoreapi.com/products', () => {
            return HttpResponse.error();
          })
        );

        await expect(productsApi.getAll()).rejects.toThrow();
      });

      it('should handle server errors', async () => {
        server.use(
          http.get('https://fakestoreapi.com/products', () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(productsApi.getAll()).rejects.toThrow();
      });
    });

    describe('getById', () => {
      it('should fetch a product by id successfully', async () => {
        const product = await productsApi.getById(1);
        
        expect(product).toEqual(mockProduct);
        expect(product.id).toBe(1);
        expect(product.title).toBe('Product 1');
      });

      it('should handle 404 for non-existent product', async () => {
        await expect(productsApi.getById(999)).rejects.toThrow();
      });

      it('should handle invalid id types gracefully', async () => {
        await expect(productsApi.getById(999)).rejects.toThrow();
      });
    });

    describe('getByCategory', () => {
      it('should fetch products by category successfully', async () => {
        const products = await productsApi.getByCategory('electronics');
        
        expect(products).toHaveLength(1);
        expect(products[0].category).toBe('electronics');
      });

      it('should return empty array for non-existent category', async () => {
        const products = await productsApi.getByCategory('non-existent');
        
        expect(products).toEqual([]);
        expect(products).toHaveLength(0);
      });

      it('should handle special characters in category name', async () => {
        server.use(
          http.get('https://fakestoreapi.com/products/category/:category', () => {
            return HttpResponse.json([]);
          })
        );

        const products = await productsApi.getByCategory('men\'s clothing');
        expect(products).toEqual([]);
      });
    });

    describe('getCategories', () => {
      it('should fetch all categories successfully', async () => {
        const categories = await productsApi.getCategories();
        
        expect(categories).toEqual(mockCategories);
        expect(categories).toHaveLength(4);
        expect(categories).toContain('electronics');
      });

      it('should handle empty categories response', async () => {
        server.use(
          http.get('https://fakestoreapi.com/products/categories', () => {
            return HttpResponse.json([]);
          })
        );

        const categories = await productsApi.getCategories();
        expect(categories).toEqual([]);
      });
    });
  });

  describe('authApi', () => {
    describe('login', () => {
      it('should login successfully with valid credentials', async () => {
        const response = await authApi.login({
          username: 'testuser',
          password: 'testpass',
        });
        
        expect(response).toEqual(mockAuthResponse);
        expect(response.token).toBe('mock-jwt-token-12345');
      });

      it('should reject invalid credentials', async () => {
        await expect(
          authApi.login({
            username: 'wronguser',
            password: 'wrongpass',
          })
        ).rejects.toThrow();
      });

      it('should handle network errors during login', async () => {
        server.use(
          http.post('https://fakestoreapi.com/auth/login', () => {
            return HttpResponse.error();
          })
        );

        await expect(
          authApi.login({
            username: 'testuser',
            password: 'testpass',
          })
        ).rejects.toThrow();
      });

      it('should handle 500 server errors', async () => {
        server.use(
          http.post('https://fakestoreapi.com/auth/login', () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(
          authApi.login({
            username: 'testuser',
            password: 'testpass',
          })
        ).rejects.toThrow();
      });
    });
  });

  describe('Request Interceptor - Token Injection', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should add Authorization header when token exists', async () => {
      localStorage.setItem('token', 'test-token-123');

      let capturedHeaders: Headers | undefined;

      server.use(
        http.get('https://fakestoreapi.com/products', ({ request }) => {
          capturedHeaders = request.headers;
          return HttpResponse.json(mockProducts);
        })
      );

      await productsApi.getAll();

      expect(capturedHeaders?.get('Authorization')).toBe('Bearer test-token-123');
    });

    it('should not add Authorization header when token does not exist', async () => {
      let capturedHeaders: Headers | undefined;

      server.use(
        http.get('https://fakestoreapi.com/products', ({ request }) => {
          capturedHeaders = request.headers;
          return HttpResponse.json(mockProducts);
        })
      );

      await productsApi.getAll();

      expect(capturedHeaders?.get('Authorization')).toBeNull();
    });

    it('should update Authorization header when token changes', async () => {
      localStorage.setItem('token', 'old-token');

      let firstHeaders: Headers | undefined;
      let secondHeaders: Headers | undefined;
      let callCount = 0;

      server.use(
        http.get('https://fakestoreapi.com/products', ({ request }) => {
          callCount++;
          if (callCount === 1) {
            firstHeaders = request.headers;
          } else {
            secondHeaders = request.headers;
          }
          return HttpResponse.json(mockProducts);
        })
      );

      await productsApi.getAll();
      expect(firstHeaders?.get('Authorization')).toBe('Bearer old-token');

      localStorage.setItem('token', 'new-token');
      await productsApi.getAll();
      expect(secondHeaders?.get('Authorization')).toBe('Bearer new-token');
    });
  });

  describe('Error Handling', () => {
    it('should propagate axios errors with response data', async () => {
      server.use(
        http.get('https://fakestoreapi.com/products', () => {
          return HttpResponse.json(
            { message: 'Custom error message' },
            { status: 400 }
          );
        })
      );

      try {
        await productsApi.getAll();
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect((error as { response: { status: number } }).response.status).toBe(400);
      }
    });

    it('should handle timeout errors', async () => {
      server.use(
        http.get('https://fakestoreapi.com/products', async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.error();
        })
      );

      await expect(productsApi.getAll()).rejects.toThrow();
    });
  });

  describe('API Configuration', () => {
    it('should use correct base URL', async () => {
      let capturedUrl: string | undefined;

      server.use(
        http.get('https://fakestoreapi.com/products', ({ request }) => {
          capturedUrl = request.url;
          return HttpResponse.json(mockProducts);
        })
      );

      await productsApi.getAll();

      expect(capturedUrl).toBe('https://fakestoreapi.com/products');
    });

    it('should set Content-Type header to application/json', async () => {
      let capturedHeaders: Headers | undefined;

      server.use(
        http.post('https://fakestoreapi.com/auth/login', ({ request }) => {
          capturedHeaders = request.headers;
          return HttpResponse.json(mockAuthResponse);
        })
      );

      await authApi.login({ username: 'testuser', password: 'testpass' });

      expect(capturedHeaders?.get('Content-Type')).toContain('application/json');
    });
  });
});
