import { useState } from 'react';
import { useProducts, useCategories } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ProductList } from '../components/organisms/ProductList';
import { SearchBar } from '../components/molecules/SearchBar';
import type { Product } from '../types';

export function HomePage() {
  const { data: allProducts, loading, error } = useProducts();
  const { data: categories } = useCategories();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const displayProducts = filteredProducts || allProducts || [];

  const handleSearch = (query: string) => {
    if (!allProducts) return;
    
    if (!query.trim()) {
      setFilteredProducts(null);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (!allProducts) return;

    if (category === 'all') {
      setFilteredProducts(null);
    } else {
      const filtered = allProducts.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to E-Shop</h1>
        
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {categories && (
          <div className="mb-8 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <ProductList
          products={displayProducts}
          loading={loading}
          error={error}
          onAddToCart={addToCart}
        />
      </div>
    </div>
  );
}
