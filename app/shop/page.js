'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSort, setPriceSort] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // Load all products from JSON
    import('@/data/products.json').then((data) => {
      setProducts(data.default);
    });
  }, []);

  // Compute filtered and sorted results
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);

      // Category filter
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter.toLowerCase();

      // Availability filter
      const matchesAvailability = availabilityFilter === 'all' || (availabilityFilter === 'instock' ? product.inStock : true);

      // Price range filter
      const matchesPriceRange = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesAvailability && matchesPriceRange;
    });

    // Sort
    if (priceSort === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, priceSort, categoryFilter, availabilityFilter, minPrice, maxPrice]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique).sort();
  }, [products]);

  // Active filters
  const activeFilters = useMemo(() => {
    const filters = [];
    if (searchTerm) filters.push({ type: 'search', label: searchTerm });
    if (priceSort !== 'default') {
      const labels = { 'low-to-high': 'Price: Low to High', 'high-to-low': 'Price: High to Low' };
      filters.push({ type: 'priceSort', label: labels[priceSort] });
    }
    if (categoryFilter !== 'all') filters.push({ type: 'category', label: `Category: ${categoryFilter}` });
    if (availabilityFilter !== 'all') filters.push({ type: 'availability', label: 'In Stock Only' });
    if (minPrice > 0 || maxPrice < 10000) filters.push({ type: 'priceRange', label: `₹${minPrice}-${maxPrice}` });
    return filters;
  }, [searchTerm, priceSort, categoryFilter, availabilityFilter, minPrice, maxPrice]);

  const removeFilter = (filterType, filterValue) => {
    if (filterType === 'search') setSearchTerm('');
    else if (filterType === 'priceSort') setPriceSort('default');
    else if (filterType === 'category') setCategoryFilter('all');
    else if (filterType === 'availability') setAvailabilityFilter('all');
    else if (filterType === 'priceRange') {
      setMinPrice(0);
      setMaxPrice(10000);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriceSort('default');
    setCategoryFilter('all');
    setAvailabilityFilter('all');
    setMinPrice(0);
    setMaxPrice(10000);
    setMobileFiltersOpen(false);
  };

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

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#FFF8F0',
                borderColor: '#C0622B',
              }}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: '#FFF8F0',
                borderColor: '#C0622B',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            style={{ backgroundColor: '#C0622B' }}
            className="w-full py-2 text-white font-semibold rounded"
          >
            {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters - Desktop Row / Mobile Dropdown */}
        <div className={`mb-8 ${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-gray-200">
            {/* Price Sort */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#C0622B' }}>
                Sort by Price
              </label>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                style={{ borderColor: '#C0622B' }}
                className="w-full px-3 py-2 border-2 rounded focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#C0622B' }}>
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{ borderColor: '#C0622B' }}
                className="w-full px-3 py-2 border-2 rounded focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="bag">Bags</option>
                <option value="scarf">Scarves</option>
                <option value="hat">Hats</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#C0622B' }}>
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                style={{ borderColor: '#C0622B' }}
                className="w-full px-3 py-2 border-2 rounded focus:outline-none"
              >
                <option value="all">All Items</option>
                <option value="instock">In Stock Only</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="lg:col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#C0622B' }}>
                Price Range (₹)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  style={{ borderColor: '#C0622B' }}
                  className="w-1/2 px-2 py-2 border-2 rounded text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  max="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ borderColor: '#C0622B' }}
                  className="w-1/2 px-2 py-2 border-2 rounded text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map((filter, idx) => (
                <button
                  key={idx}
                  onClick={() => removeFilter(filter.type)}
                  style={{ backgroundColor: '#C0622B' }}
                  className="px-3 py-1 text-white rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-80"
                >
                  {filter.label}
                  <span className="text-lg leading-none">×</span>
                </button>
              ))}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm font-semibold underline"
              style={{ color: '#C0622B' }}
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* No Results / Results Count */}
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No products found {searchTerm ? `for "${searchTerm}"` : 'matching your filters'}
            </p>
            <button
              onClick={clearAllFilters}
              style={{ backgroundColor: '#C0622B' }}
              className="px-6 py-2 text-white font-semibold rounded hover:opacity-90"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
