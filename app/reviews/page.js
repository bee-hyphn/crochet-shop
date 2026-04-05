'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import reviews from '@/data/reviews.json';

export default function ReviewsPage() {
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Reviews Header */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: '#F5E6D3' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Customer Reviews
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          See what our customers love about our handmade products.
        </p>
      </section>

      {/* Reviews Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
        {/* Average Rating */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#C0622B' }}>
            ⭐ Average Rating
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold" style={{ color: '#C0622B' }}>
              {averageRating}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">out of 5.0</p>
              <p className="text-sm text-gray-600">{reviews.length} verified reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                  {review.verified && (
                    <p className="text-xs text-green-600 font-semibold">✓ Verified Purchase</p>
                  )}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              <p className="text-sm font-semibold mb-2 text-gray-600">
                Product: <span style={{ color: '#C0622B' }}>{review.productName}</span>
              </p>

              <div className="mb-3">
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                <span className="text-gray-300">{'⭐'.repeat(5 - review.rating)}</span>
                <span className="ml-2 text-sm text-gray-600">{review.rating}.0</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Leave Review CTA */}
        <div className="mt-12 p-8 rounded-lg text-center" style={{ backgroundColor: '#F5E6D3' }}>
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#C0622B' }}>
            Have a product to review?
          </h3>
          <p className="text-gray-700 mb-6">
            After your purchase, you can leave a review on our success page to help other customers.
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
            style={{ backgroundColor: '#C0622B' }}
          >
            Browse Products
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
