export default function Navbar() {
  return (
    <nav className="bg-orange-100 shadow-md p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-700">Crochet & Knit Shop</h1>
        <ul className="flex gap-6 text-center">
          <li><a href="/" className="text-orange-700 hover:text-orange-900">Home</a></li>
          <li><a href="/shop" className="text-orange-700 hover:text-orange-900">Shop</a></li>
          <li><a href="/reviews" className="text-orange-700 hover:text-orange-900">Reviews</a></li>
          <li><a href="/contact" className="text-orange-700 hover:text-orange-900">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
