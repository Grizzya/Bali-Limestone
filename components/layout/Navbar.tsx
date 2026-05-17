"use client";

import { useState } from "react";

type NavbarProps = {
  variant?: "light" | "dark";
};

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = variant === "dark";
  const textColor = isDark ? "text-black" : "text-white";
  const borderColor = isDark ? "border-black/30" : "border-white/30";

  return (
    <header className={`absolute top-0 left-0 w-full z-50 ${textColor}`}>

      {/* Top bar */}
      <div className="w-full px-6 md:px-10 lg:px-12 py-5 flex justify-between items-center">

        {/* Logo*/}
        <a href="/" aria-label="Bali Limestone Home">
          {/* Ikon rumah — mobile only */}
          <svg
            className="block md:hidden"
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {/* Teks — tablet & desktop */}
          <span className="hidden md:block font-bold text-base lg:text-lg tracking-widest">
            BALI LIMESTONE
          </span>
        </a>

        {/* Nav links — tablet & desktop */}
        <nav className="hidden md:flex gap-8 lg:gap-12 text-sm">
          <a href="/"        className="hover:text-yellow-400 transition-colors">Home</a>
          <a href="/about"   className="hover:text-yellow-400 transition-colors">About</a>
          <a href="/services" className="hover:text-yellow-400 transition-colors">Services</a>
          <a href="/product"  className="hover:text-yellow-400 transition-colors">Product</a>
        </nav>

        {/* CTA desktop */}
        <button className="hidden md:block bg-yellow-400 text-black px-5 py-2 lg:px-6 rounded-lg font-semibold text-sm hover:opacity-90 transition">
          Contact Us
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >
          {menuOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </div>

      {/* Divider */}
      <div className={`w-full px-6 md:px-10 lg:px-12`}>
        <div className={`border-t ${borderColor}`} />
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/85 backdrop-blur-sm flex flex-col px-6 py-5 gap-1">
          {["Home", "About", "Services", "Product"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm py-3 border-b border-white/10 hover:text-yellow-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="mt-3 bg-yellow-400 text-black py-3 rounded-lg font-semibold text-sm w-full hover:opacity-90 transition">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}