"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    title: "Batu Kapur",
    image: "/Batukapur.jpg",
  },
  {
    title: "Batu urug",
    image: "/Batukapur.jpg",
  },
  {
    title: "Batu urug",
    image: "/Batukapur.jpg",
  },
];

export default function ProductSection() {
  return (
    <section className="bg-[#ffffff] py-16 px-6 md:px-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Produk Kami
        </h2>

        {/* Arrow */}
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
            <ChevronLeft size={20} className="text-black" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
            <ChevronRight size={20} className="text-black" />
          </button>
        </div>
      </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((item, i) => (
        <div
          key={i}
          className="relative group rounded-[20px] overflow-hidden aspect-410/550"
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

      {/* Overlay */}
     <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-5 left-5">
        <h3 className="text-white text-lg font-medium mb-3">
          {item.title}
        </h3>

        <button className="bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm shadow">
          View Ditail
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Bottom Button */}
      <div className="flex justify-end mt-10">
        <button className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-xl font-medium text-black">
          View All
        </button>
      </div>
    </section>
  );
}