"use client";

import { useState, useMemo } from "react";
import products from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return result;
  }, [searchTerm, sortOption]);

  return (
    <div style={{ backgroundColor: "#FDFAF6" }} className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="py-12 px-4 text-center" style={{ backgroundColor: "#F5E6D3" }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#C0622B" }}>
          Our Shop
        </h1>
        <p className="text-lg text-gray-700">
          Browse our handmade crochet and knit collection
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* SEARCH BAR */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: "#FFF8F0",
                borderColor: "#C0622B",
              }}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* SORT DROPDOWN */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4">
          <label className="text-sm font-semibold mb-2 md:mb-0" style={{ color: "#C0622B" }}>
            Sort by
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              backgroundColor: "#FFF8F0",
              borderColor: "#C0622B",
            }}
            className="w-full md:w-auto px-4 py-2 border-2 rounded focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-6 text-sm text-gray-600">
          Showing {filteredAndSorted.length} of {products.length} products
        </div>

        {/* NO RESULTS STATE */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No products found for "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              style={{ backgroundColor: "#C0622B" }}
              className="px-6 py-2 text-white font-semibold rounded hover:opacity-90"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* PRODUCT GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                {/* Image */}
                <div className="h-48 bg-amber-100 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-600 font-semibold">Photo coming soon</p>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <p className="text-lg font-bold mb-4" style={{ color: "#C0622B" }}>
                    ₹{product.price}
                  </p>
                  <button
                    style={{ backgroundColor: "#C0622B" }}
                    className="w-full py-2 text-white font-semibold rounded hover:opacity-90 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
