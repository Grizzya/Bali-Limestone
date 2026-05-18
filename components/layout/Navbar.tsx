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

      {/* TOP BAR */}
      <div className="w-full px-6 md:px-10 lg:px-12 py-5 flex justify-between items-center">

        {/* LOGO */}
        <a href="/" aria-label="Bali Limestone Home">
          <span className="block font-bold text-base lg:text-lg tracking-widest">
            BALI LIMESTONE
          </span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex gap-8 lg:gap-12 text-sm">
          <a
            href="/"
            className="hover:text-yellow-400 transition-colors"
          >
            Home
          </a>

          <a
            href="/about"
            className="hover:text-yellow-400 transition-colors"
          >
            About
          </a>

          <a
            href="/services"
            className="hover:text-yellow-400 transition-colors"
          >
            Services
          </a>

          <a
            href="/product"
            className="hover:text-yellow-400 transition-colors"
          >
            Product
          </a>
        </nav>

        {/* CTA DESKTOP */}
        <button className="hidden md:block bg-yellow-400 text-black px-5 py-2 lg:px-6 rounded-lg font-semibold text-sm hover:opacity-90 transition">
          Contact Us
        </button>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >

          {/* LINE 1 */}
          <span
            className={`absolute w-6 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-in-out ${
              menuOpen
                ? "rotate-45 translate-y-0"
                : "-translate-y-2"
            }`}
          />

          {/* LINE 2 */}
          <span
            className={`absolute w-6 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-in-out ${
              menuOpen
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          {/* LINE 3 */}
          <span
            className={`absolute w-6 h-[1.5px] bg-current rounded-full transition-all duration-300 ease-in-out ${
              menuOpen
                ? "-rotate-45 translate-y-0"
                : "translate-y-2"
            }`}
          />
        </button>
      </div>

      {/* DIVIDER */}
      <div className="w-full px-6 md:px-10 lg:px-12">
        <div className={`border-t ${borderColor}`} />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-3"
        }`}
      >
        <div className="bg-black/85 backdrop-blur-md flex flex-col px-6 py-5 gap-1">

          {["Home", "About", "Services", "Product"].map((item) => (
            <a
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white text-sm py-3 border-b border-white/10 hover:text-yellow-400 transition-all duration-300"
            >
              {item}
            </a>
          ))}

          {/* MOBILE BUTTON */}
          <button className="mt-4 bg-yellow-400 text-black py-3 rounded-xl font-semibold text-sm w-full hover:opacity-90 transition-all duration-300">
            Contact Us
          </button>
        </div>
      </div>

    </header>
  );
}