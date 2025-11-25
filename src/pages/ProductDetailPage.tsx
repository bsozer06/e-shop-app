import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import { Button } from '../components/atoms/Button';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, loading, error } = useProduct(Number(id));
  const { addToCart } = useCart();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading product</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
          ← Back
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>

          <div>
            <span className="text-sm text-gray-500 uppercase">{product.category}</span>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-lg font-medium">{product.rating.rate}</span>
              <span className="text-gray-500">({product.rating.count} reviews)</span>
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            <Button
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
              className="w-full md:w-auto px-8 py-3 text-lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
