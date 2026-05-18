import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LogAktivitasPage() {
  // Proteksi Keamanan: Hanya SUPERADMIN yang boleh melihat log ini
  const adminId = (await cookies()).get('admin_session')?.value;
  if (!adminId) redirect('/admin/login');

  const currentUser = await prisma.admin.findUnique({ where: { id: adminId } });
  if (currentUser?.role !== 'SUPERADMIN') {
    redirect('/admin/dashboard'); 
  }

  // Ambil data log dari database, urutkan dari yang paling baru
  const logs = await prisma.logAktivitas.findMany({
    include: {
      admin: {
        select: { nama: true, role: true }
      }
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 text-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Log Aktivitas Sistem</h1>
        <p className="text-sm text-gray-500 mt-1">Catatan audit riwayat keamanan dan penanganan data</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">Waktu</th>
              <th className="p-4">Pelaku (Admin)</th>
              <th className="p-4">Aksi</th>
              <th className="p-4">Detail Aktivitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Belum ada aktivitas yang terekam.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-gray-500 font-mono text-xs">
                    {new Date(log.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{log.admin?.nama || 'Sistem / Terhapus'}</div>
                    <div className="text-xs text-gray-400">{log.admin?.role}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-wide ${
                      log.aksi.startsWith('LOGIN') ? 'bg-green-50 text-green-700 border border-green-100' :
                      log.aksi.startsWith('TAMBAH') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      log.aksi.startsWith('HAPUS') || log.aksi.startsWith('UBAH') ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                      'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {log.aksi}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 max-w-md break-words">{log.detail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}