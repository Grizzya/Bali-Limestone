"use client";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-50 text-white">
  
  <div className="w-full px-12 py-6 flex justify-between items-center">
    <h1 className="font-bold text-lg tracking-wide">
      BALI LIMESTONE
    </h1>

    <nav className="hidden md:flex gap-15 text-sm">
          <a href="#" className="hover:text-yellow-400">Home</a>
          <a href="#" className="hover:text-yellow-400">About</a>
          <a href="#" className="hover:text-yellow-400">Services</a>
          <a href="#" className="hover:text-yellow-400">Product</a>
        </nav>

   <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition">
  Contact Us
        </button>
  </div>

  
  <div className="w-full px-12">
    <div className="border-t border-white/30" />
  </div>

</header>
  );
}