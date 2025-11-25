import { productsApi } from '../api';
import { useFetch } from './useFetch';
import type { Product } from '../types';

export function useProducts() {
  return useFetch<Product[]>(() => productsApi.getAll());
}

export function useProduct(id: number) {
  return useFetch<Product>(() => productsApi.getById(id));
}

export function useCategories() {
  return useFetch<string[]>(() => productsApi.getCategories());
}

export function useProductsByCategory(category: string) {
  return useFetch<Product[]>(() => productsApi.getByCategory(category));
}
