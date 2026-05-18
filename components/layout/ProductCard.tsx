"use client";

import Image from "next/image";

export default function ProductCard({
  product,
  aspectRatio = "aspect-[410/550]",
  onClick,
}: {
  product: any;
  aspectRatio?: string;
  onClick?: () => void;
}) {
  
  const displayTitle = product.title || product.name || "Produk";
  const displayImage = product.image || product.src || "/Batukapur.jpg";

  return (
    <div
      className={`relative group rounded-[20px] overflow-hidden cursor-pointer ${aspectRatio}`}
      onClick={onClick} 
    >
      {/* Image  */}
      <Image
        src={displayImage}
        alt={displayTitle}
        fill
        className="object-cover group-hover:scale-105 transition duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Content  */}
      <div className="absolute bottom-5 left-5">
        
        <h3
          className="text-white text-lg mb-3"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {displayTitle}
        </h3>

        {/* Button  */}
        <button
          className="bg-white text-gray-800 px-4 py-1.5 shadow"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "0.875rem", 
            borderRadius: "40px",
          }}
        >
          View Detail
        </button>
      </div>
    </div>
  );
}