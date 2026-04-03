'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load all products from JSON
    import('@/data/products.json').then((data) => {
      setProducts(data.default);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Shop Header */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: '#F5E6D3' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Our Shop
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Browse our complete collection of handmade crochet and knitted items. Each piece is unique and crafted with care.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Loading products...</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
