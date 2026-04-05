'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const oid = searchParams.get('oid');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    review: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xpqooboa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          product: formData.product,
          rating: `${rating} stars`,
          review: formData.review,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', product: '', review: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* ORDER CONFIRMATION SECTION */}
      <section style={{ backgroundColor: '#F5E6D3' }} className="py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Thank you for your purchase!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Your handmade item is being prepared with love.
        </p>
        {oid && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Order Reference:</span> {oid}
          </p>
        )}
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#C0622B' }}>
            Order Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">Status</span>
              <span className="font-semibold text-green-600">✓ Order Confirmed</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">Next Step</span>
              <span className="font-semibold">Item being handcrafted</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Estimated Delivery</span>
              <span className="font-semibold">5-7 business days</span>
            </div>
          </div>
        </div>

        {/* REVIEW FORM SECTION */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#C0622B' }}>
            How was your experience?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Leave a review to help other customers discover our products. Your feedback helps us improve!
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800 font-semibold">
                ✓ Thank you! Your review will appear soon.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ color: '#1a1a1a', backgroundColor: '#FFF8F0' }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address * <span className="text-xs text-gray-500 font-normal">(not shown publicly)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ color: '#1a1a1a', backgroundColor: '#FFF8F0' }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Product */}
            <div>
              <label htmlFor="product" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Purchased *
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                style={{ color: '#1a1a1a', backgroundColor: '#FFF8F0' }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Blue Crochet Bag"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-4xl transition hover:scale-110"
                    style={{ color: (hoverRating || rating) >= star ? '#C0622B' : '#d4d4d8' }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{rating} out of 5 stars</p>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                rows="6"
                style={{ color: '#1a1a1a', backgroundColor: '#FFF8F0' }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Share your thoughts about the product, quality, delivery, etc..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: '#C0622B' }}
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Continue Shopping CTA */}
        <div className="mt-8 text-center">
          <a
            href="/shop"
            className="inline-block px-8 py-3 text-gray-700 font-semibold border-2 rounded-lg hover:bg-gray-100 transition"
            style={{ borderColor: '#C0622B' }}
          >
            Continue Shopping
          </a>
        </div>
      </section>
    </>
  );
}

export default function SuccessPage() {
  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <section className="flex-1">
          <SuccessContent />
        </section>
      </Suspense>
      <Footer />
    </div>
  );
}
