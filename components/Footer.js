export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-2">&copy; 2026 Crochet & Knit Shop. All rights reserved.</p>
        <p className="text-gray-400 text-sm">Handmade with love in Nepal</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="https://www.facebook.com/profile.php?id=61573346668857" className="hover:text-orange-500 transition">Facebook</a>
          <a href="#" className="hover:text-orange-500 transition">Instagram</a>
          <a href="#" className="hover:text-orange-500 transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
