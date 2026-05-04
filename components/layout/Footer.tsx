import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] pt-24 pb-12">
      <div className="w-full max-w-8xl mx-auto px-12">
        
        {/* 🔹 BAGIAN ATAS: Logo dan Menu (Menggunakan Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* 1. Kiri: Logo Foto (Mengambil 4 dari 12 kolom) */}
          <div className="lg:col-span-4 flex justify-start">
            <img 
              src="/logo.png" 
              alt="Bali Limestone Logo" 
              className="h-28 w-auto object-contain" 
            />
          </div>

          {/* 2. Tengah: Menu Explore & Contact (Mengambil 8 dari 12 kolom & dipusatkan) */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row justify-start lg:justify-center gap-16 lg:gap-[150px]">
            
            {/* Kolom Explore */}
            <div>
              <h3 className="text-white text-[22px] font-medium mb-8">Explore</h3>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    Service
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    Product
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom Contact */}
            <div>
              <h3 className="text-white text-[22px] font-medium mb-8">Contact</h3>
              <ul className="flex flex-col gap-5">
                <li>
                  <a href="mailto:balilimestone@gmail.com" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    balilimestone@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+628181802020" className="text-gray-400 hover:text-white transition-colors text-[16px] font-light">
                    +62 8181802020
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 🔹 BAGIAN BAWAH: Ikon Sosial Media & Garis Horizontal */}
        <div className="flex items-center justify-between w-full mt-28">
          
          {/* Garis Kiri */}
          <div className="h-[1px] bg-gray-600 flex-1"></div>

          {/* Ikon Sosial Media Tengah (Tanpa Lingkaran) */}
          <div className="flex items-center gap-8 px-8">
            
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
              </svg>
            </a>
            
            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.452-.885-.77-1.482-1.72-1.655-2.018-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.183 1.183 0 0 0-.86.4 3.613 3.613 0 0 0-1.124 2.684c0 1.56 1.149 3.067 1.309 3.265.159.198 2.228 3.398 5.4 4.707 3.172 1.31 3.172.873 3.746.823.574-.05 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px]">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

          </div>

          {/* Garis Kanan */}
          <div className="h-[1px] bg-gray-600 flex-1"></div>

        </div>

      </div>
    </footer>
  );
}