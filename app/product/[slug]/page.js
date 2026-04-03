'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EsewaButton from '@/components/EsewaButton';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Load products and find by slug
    import('@/data/products.json').then((data) => {
      const found = data.default.find((p) => p.slug === slug);
      setProduct(found);
    });
  }, [slug]);

  if (!product) {
    return (
      <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSuccess = () => {
    alert('Payment successful! Thank you for your purchase.');
  };

  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Product Detail */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-lg p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#C0622B' }}>
              {product.name}
            </h1>

            <div className="mb-4">
              <span className="text-3xl font-bold text-orange-600">
                ₨ {product.price}
              </span>
              <span className="ml-4 text-sm text-gray-600">
                {product.currency}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600">
                Category: <span className="capitalize">{product.category}</span>
              </p>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                Stock:{' '}
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                >
                  -
                </button>
                <span className="text-xl font-bold min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-3">
              <EsewaButton
                product={{ ...product, price: product.price * quantity }}
                onSuccess={handleSuccess}
              />
              <button
                className="w-full px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#C0622B' }}>
                About this item
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Handmade with premium quality yarn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Crafted in Nepal with love and care</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Each piece is unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Free shipping on orders over ₨ 2000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
