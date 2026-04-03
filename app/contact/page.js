'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#FDFAF6' }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* Contact Header */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: '#F5E6D3' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C0622B' }}>
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Have questions about our products? We'd love to hear from you. Contact us below!
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#C0622B' }}>
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your full name"
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

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
                style={{ backgroundColor: '#C0622B' }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#C0622B' }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">📍 Address</p>
                  <p className="text-gray-600">Kathmandu, Nepal</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">📞 Phone</p>
                  <p className="text-gray-600">+977 98XXXXXXXX</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">✉️ Email</p>
                  <p className="text-gray-600">info@crochetshop.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#C0622B' }}>
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> Closed</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#C0622B' }}>
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="inline-block p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  f
                </a>
                <a href="#" className="inline-block p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                  📷
                </a>
                <a href="#" className="inline-block p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  💬
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
