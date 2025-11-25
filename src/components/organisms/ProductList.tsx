import type { Product } from '../../types';
import { ProductCard } from '../molecules/ProductCard';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: Error | null;
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, loading, error, onAddToCart }: ProductListProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>Error loading products: {error.message}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
