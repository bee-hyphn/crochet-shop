export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-orange-600">₨{product.price}</span>
          <a href={`/product/${product.slug}`} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
            View
          </a>
        </div>
      </div>
    </div>
  );
}
