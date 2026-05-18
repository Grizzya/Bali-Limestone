import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Sidebar from './components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Cek dari database apakah admin yang sedang login adalah SUPERADMIN
  const adminId = (await cookies()).get('admin_session')?.value;
  const currentUser = adminId ? await prisma.admin.findUnique({ where: { id: adminId } }) : null;
  const isSuperAdmin = currentUser?.role === 'SUPERADMIN';

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* 2. Panggil Sidebar dan kirim data status Super Admin */}
      <Sidebar isSuperAdmin={isSuperAdmin} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
