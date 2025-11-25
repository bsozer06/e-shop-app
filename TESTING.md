# Test Documentation - E-Shop Project

## Test Overview

This project uses **Vitest** with React Testing Library for comprehensive unit and integration testing.

## Test Coverage

### ✅ Current Coverage: 100% Statements, 93.75% Branches, 100% Functions

#### Tested Modules:

1. **`useFetch` Hook** (`src/hooks/useFetch.test.ts`) - 7 tests
   - ✅ Loading state initialization
   - ✅ Successful data fetching
   - ✅ Error handling (Error objects and non-Error rejections)
   - ✅ Refetch functionality
   - ✅ Loading state reset on refetch
   - ✅ Error clearing on successful refetch

2. **`CartContext`** (`src/context/CartContext.test.tsx`) - 18 tests
   - ✅ Initial state (empty cart, localStorage loading)
   - ✅ Add to cart (new product, existing product quantity increment)
   - ✅ Remove from cart
   - ✅ Update quantity (including zero/negative removal)
   - ✅ Clear cart
   - ✅ Computed values (totalItems, totalPrice)
   - ✅ localStorage persistence
   - ✅ Error handling (useCart outside provider)

3. **`API Layer`** (`src/api/index.test.ts`) - 22 tests
   - ✅ Products API:
     - getAll: success, network errors, server errors
     - getById: success, 404 handling, invalid IDs
     - getByCategory: success, empty results, special characters
     - getCategories: success, empty response
   - ✅ Auth API:
     - login: success, invalid credentials, network/server errors
   - ✅ Request Interceptor:
     - Token injection when available
     - No header when token absent
     - Token updates
   - ✅ Error Handling:
     - Response data propagation
     - Timeout handling
   - ✅ Configuration:
     - Correct base URL
     - Content-Type headers

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (recommended for development)
```bash
npm run test:watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Generate coverage report
```bash
npm run test:coverage
```

## Test Structure

```
src/
├── api/
│   ├── index.ts
│   └── index.test.ts             # 22 tests (API mocking with MSW)
├── hooks/
│   ├── useFetch.ts
│   └── useFetch.test.ts          # 7 tests
├── context/
│   ├── CartContext.tsx
│   └── CartContext.test.tsx      # 18 tests
└── test/
    └── setup.ts                  # Test configuration

Total: 47 tests across 3 test suites
```

## Test Configuration

- **Test Framework**: Vitest
- **Testing Library**: @testing-library/react
- **Test Environment**: jsdom
- **Coverage Tool**: v8

### Key Testing Utilities

- `renderHook`: Test custom hooks
- `waitFor`: Wait for async operations
- `act`: Wrap state updates
- `vi.fn()`: Create mock functions
- `localStorage` mock: Automatic in setup

## Mock Configuration

### Mocked Modules:
- **react-hot-toast**: All toast notifications are mocked to avoid side effects
- **localStorage**: Full localStorage implementation for testing persistence
- **API Requests (MSW)**: HTTP requests are intercepted and mocked using Mock Service Worker

### MSW (Mock Service Worker)
MSW is used for API mocking, providing realistic HTTP request/response handling:

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('https://api.example.com/data', () => {
    return HttpResponse.json({ id: 1, name: 'Test' });
  })
);
```

## Test Examples

### Testing API with MSW
```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([{ id: 1, title: 'Test' }]);
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

it('should fetch products', async () => {
  const products = await productsApi.getAll();
  expect(products).toHaveLength(1);
});
```

### Testing a Hook
```typescript
import { renderHook, waitFor } from '@testing-library/react';

it('should fetch data successfully', async () => {
  const mockData = { id: 1, name: 'Test' };
  const fetchFn = vi.fn(() => Promise.resolve(mockData));
  
  const { result } = renderHook(() => useFetch(fetchFn));
  
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });
  
  expect(result.current.data).toEqual(mockData);
});
```

### Testing Context with Provider
```typescript
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

it('should add product to cart', () => {
  const { result } = renderHook(() => useCart(), { wrapper });
  
  act(() => {
    result.current.addToCart(mockProduct);
  });
  
  expect(result.current.items).toHaveLength(1);
});
```

## Next Testing Priorities

### High Priority:
1. **useProducts Hook**
   - Test all product fetch functions
   - Test category filtering

3. **AuthContext**
   - Login flow
   - Token management
   - Logout behavior

### Medium Priority:
4. **UI Components**
   - Button variants and disabled state
   - Input error states
   - ProductCard interactions
   - CartItemCard quantity controls

5. **Page Components**
   - HomePage filtering and search
   - ProductDetailPage
   - CartPage empty/full states
   - LoginPage form submission

## Best Practices

✅ **DO:**
- Use `waitFor` for async operations
- Wrap state updates in `act()`
- Test user behavior, not implementation
- Mock external dependencies
- Clear mocks between tests

❌ **DON'T:**
- Test implementation details
- Depend on timing without `waitFor`
- Skip error scenarios
- Forget to cleanup after tests

## Continuous Integration

Tests run automatically on:
- Pre-commit (future hook)
- Pull requests
- CI/CD pipeline

## Coverage Goals

- **Target**: 80%+ overall coverage
- **Current**: 100% for tested modules
- **Focus**: Business logic and critical paths

## Troubleshooting

### "act(...)" warnings
Wrap state updates in `act()` or use `waitFor()` for async updates.

### Tests timing out
Increase timeout or check for unresolved promises.

### localStorage not persisting
Ensure test setup is imported correctly.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
