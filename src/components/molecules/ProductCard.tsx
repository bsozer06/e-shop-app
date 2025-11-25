import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { Button } from '../atoms/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`} className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm">{product.rating.rate}</span>
          <span className="text-gray-500 text-sm">({product.rating.count})</span>
        </div>
        <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </Link>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onAddToCart(product);
        }}
        className="mt-4 w-full"
      >
        Add to Cart
      </Button>
    </div>
  );
}
