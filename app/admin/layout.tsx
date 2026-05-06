'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Jika kita berada di halaman login, tampilkan halamannya saja (TIDAK PAKAI SIDEBAR)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 2. Daftar Menu Sesuai Flowchart Kamu
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Kelola Artikel', path: '/admin/kelola-artikel'},
    { name: 'Kelola Produk', path: '/admin/kelola-produk' },
    { name: 'Kelola Kategori', path: '/admin/kelola-kategori' },
    { name: 'Kelola Jasa', path: '/admin/kelola-jasa' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* SIDEBAR KIRI (Warna menyesuaikan gambar) */}
      <aside className="w-64 bg-[#3b5970] text-white flex flex-col justify-between">
        
        {/* Bagian Atas: Logo & Menu */}
        <div>
          {/* Logo (Bisa kamu ganti gambar asli nanti) */}
          <div className="h-20 flex items-center justify-center border-b border-white/10">
            <h1 className=" text-center text-2xl  font-bold italic tracking-widest text-white/100 ">
              Bali LimeStone
            </h1>
          </div>

          {/* List Menu */}
          <nav className="mt-4 flex flex-col gap-4 ">
            {menuItems.map((menu, index) => {
              // Cek apakah menu ini sedang aktif diklik
              const isActive = pathname === menu.path;
              
              return (
                <Link 
                  key={index} 
                  href={menu.path}
                  className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                    isActive ? 'bg-[#1e73be] border-l-4 border-white' : 'hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium text-lg tracking-wide">{menu.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah: Tombol Logout */}
        <div className="p-6">
          <Link 
            href="/admin/login" 
            className="flex items-center justify-center w-full py-2 bg-[#1e73be] hover:bg-blue-700 transition rounded text-sm font-semibold"
          >
            Log Out
          </Link>
        </div>

      </aside>

      {/* KONTEN UTAMA KANAN */}
      <main className="flex-1 p-8 overflow-y-auto text-black">
        {/* 'children' ini akan otomatis berisi halaman dashboard, produk, dll sesuai yang diklik */}
        {children}
      </main>

    </div>
  );
}