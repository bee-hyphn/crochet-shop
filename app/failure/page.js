'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FailurePage() {
  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* ERROR SECTION */}
      <section style={{ backgroundColor: '#F5E6D3' }} className="py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Payment was not completed
        </h1>
        <p className="text-lg text-gray-700">
          No charges were made. Please try again.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">
            Your payment could not be processed. This may happen due to network issues, incorrect details, or payment cancellation. Your account has not been charged.
          </p>

          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Why this happened:</span>
            </p>
            <ul className="text-gray-600 space-y-2 text-left inline-block">
              <li>• Payment gateway connection issue</li>
              <li>• Payment method declined</li>
              <li>• Transaction cancelled</li>
              <li>• Session timeout</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href="/shop"
              className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: '#C0622B' }}
            >
              Return to Shop
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
