'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleLogout } from '../actions';
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Tags, 
  FileText, 
  LogOut,
  Users, // Icon untuk Kelola Admin
  History // Icon untuk Log Aktivitas
} from 'lucide-react'; 

export default function Sidebar({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const pathname = usePathname();

  // Menu dasar yang bisa dilihat SEMUA admin
  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Kelola Produk', href: '/admin/dashboard/produk', icon: <Package size={20} /> },
    { name: 'Kelola Jasa', href: '/admin/dashboard/jasa', icon: <Wrench size={20} /> },
    { name: 'Kelola Kategori', href: '/admin/dashboard/kategori', icon: <Tags size={20} /> },
    { name: 'Kelola Artikel', href: '/admin/dashboard/artikel', icon: <FileText size={20} /> },
  ];

  // MENU RAHASIA: Hanya ditambahkan jika dia SUPERADMIN
  if (isSuperAdmin) {
    menuItems.push(
      { name: 'Kelola Admin', href: '/admin/dashboard/kelola-admin', icon: <Users size={20} /> },
      { name: 'Log Aktivitas', href: '/admin/dashboard/log-aktivitas', icon: <History size={20} /> }
    );
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
      <div className="p-6 mt-9 border-b border-gray-100">
        <h2 className="text-xl font-bold text-blue-700 tracking-tight">
          Bali Limestone <span className="text-gray-400 text-xs block font-normal uppercase mt-1">Admin Panel</span>
        </h2>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* TOMBOL LOGOUT */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <button 
          onClick={async () => {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
              await handleLogout();
            }
          }}
          type="button" 
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-all cursor-pointer"
        >
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </aside>
  );
}