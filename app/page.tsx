'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Load products from JSON
    import('@/data/products.json').then((data) => {
      setProducts(data.default);
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 text-center" style={{ backgroundColor: '#FDFAF6' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Welcome to Crochet & Knit Shop
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover handmade crochet and knitted treasures crafted with love in Nepal. Each piece is unique and made with premium yarn.
        </p>
        <a
          href="/shop"
          className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
          style={{ backgroundColor: '#C0622B' }}
        >
          Shop Now
        </a>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#C0622B' }}>
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Spacer to push footer down */}
      <div className="flex-grow"></div>

      <Footer />
    </div>
  );
}
