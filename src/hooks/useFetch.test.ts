import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useFetch } from './useFetch';

describe('useFetch', () => {
  it('should initialize with loading state', () => {
    const fetchFn = vi.fn(() => Promise.resolve('data'));
    const { result } = renderHook(() => useFetch(fetchFn));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test Product' };
    const fetchFn = vi.fn(() => Promise.resolve(mockData));

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network error');
    const fetchFn = vi.fn(() => Promise.reject(mockError));

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(mockError);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it('should handle non-Error rejections', async () => {
    const fetchFn = vi.fn(() => Promise.reject('String error'));

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('An error occurred');
  });

  it('should refetch data when refetch is called', async () => {
    let callCount = 0;
    const fetchFn = vi.fn(() => {
      callCount++;
      return Promise.resolve({ count: callCount });
    });

    const { result } = renderHook(() => useFetch(fetchFn));

    // Wait for initial fetch
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual({ count: 1 });
    expect(fetchFn).toHaveBeenCalledTimes(1);

    // Trigger refetch
    result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual({ count: 2 });
    });

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should reset loading state on refetch', async () => {
    const fetchFn = vi.fn(() => Promise.resolve('data'));

    const { result } = renderHook(() => useFetch(fetchFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Trigger refetch and verify loading state changes
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should clear error on successful refetch', async () => {
    let shouldFail = true;
    const fetchFn = vi.fn(() => {
      if (shouldFail) {
        return Promise.reject(new Error('First error'));
      }
      return Promise.resolve('success');
    });

    const { result } = renderHook(() => useFetch(fetchFn));

    // Wait for initial error
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(result.current.data).toBe(null);

    // Change to success and refetch
    shouldFail = false;
    result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toBe('success');
    });

    expect(result.current.error).toBe(null);
  });
});
