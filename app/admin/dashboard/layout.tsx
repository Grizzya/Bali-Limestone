import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Sidebar from './components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Cek dari database apakah admin yang sedang login adalah SUPERADMIN
  const adminId = (await cookies()).get('admin_session')?.value;
  const currentUser = adminId ? await prisma.admin.findUnique({ where: { id: adminId } }) : null;
  const isSuperAdmin = currentUser?.role === 'SUPERADMIN';

  return (
    // Tambahkan flex-col untuk HP, dan md:flex-row untuk PC. Warna kembali ke aslinya.
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-black">
      
      {/* 2. Panggil Sidebar dan kirim data status Super Admin */}
      <Sidebar isSuperAdmin={isSuperAdmin} />

      {/* MAIN CONTENT AREA - Tambahkan pt-16 di HP agar tidak tertutup header mobile */}
      <main className="flex-grow overflow-y-auto bg-gray-50 pt-16 md:pt-0">
        {children}
      </main>
      
    </div>
  );
}