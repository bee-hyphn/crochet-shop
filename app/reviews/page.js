'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
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
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xdkozzne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          rating: `${formData.rating} stars`,
          comment: formData.comment,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', rating: 5, comment: '' });
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
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Reviews Header */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: '#F5E6D3' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Customer Reviews
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Share your feedback and rate your experience with our handmade products.
        </p>
      </section>

      {/* Reviews Form Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#C0622B' }}>
            Leave a Review
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800 font-semibold">
                ✓ Thank you! Your review has been submitted successfully.
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center gap-2">
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="1">⭐ 1 Star - Poor</option>
                  <option value="2">⭐⭐ 2 Stars - Fair</option>
                  <option value="3">⭐⭐⭐ 3 Stars - Good</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars - Very Good</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                </select>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Share your feedback about this product..."
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

        {/* Example Reviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6" style={{ color: '#C0622B' }}>
            Recent Reviews
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">Sarah M.</h4>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600">
                Absolutely love this crochet bag! The quality is amazing and it arrived faster than expected. Will definitely order again.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">John D.</h4>
                <span className="text-yellow-500">⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600">
                Great product and excellent customer service. Highly recommended for anyone looking for unique handmade items.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">Emma R.</h4>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-600">
                Perfect gift! The knit scarf is so soft and cozy. The craftsmanship is outstanding. Love supporting local artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
