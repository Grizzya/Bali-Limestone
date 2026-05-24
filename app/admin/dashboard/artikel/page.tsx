import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
// Sesuaikan path ini dengan lokasi file ImagePreview-mu
import ImagePreview from '../jasa/ImagePreview'; 
import { rekamAktivitas } from '@/lib/logger';

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const itemsPerPage = 6;
  const skip = (currentPage - 1) * itemsPerPage;

  const [daftarArtikel, totalItems] = await Promise.all([
    prisma.artikel.findMany({
      skip: skip,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.artikel.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  async function tambahArtikel(formData: FormData) {
    'use server';
    const judul = formData.get('judul') as string;
    const konten = formData.get('konten') as string;
    const file = formData.get('gambar') as File;

    if (!judul || !konten) return;

    // --- FUNGSI SAKTI PEMBUAT SLUG ---
    // Mengubah "Batu Kapur Kualitas 1!" menjadi "batu-kapur-kualitas-1"
    let slug = judul
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Pastikan slug tidak kembar dengan menambahkan ID unik (opsional tapi aman)
    const uniqueSuffix = Date.now().toString().slice(-4);
    slug = `${slug}-${uniqueSuffix}`;

    let imageUrl = null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'balilimestone_artikel' },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result?.secure_url);
          }
        );
        uploadStream.end(buffer);
      }) as string;
    }

    // Simpan ke database beserta slug-nya
    await prisma.artikel.create({
      data: { slug, judul, konten, gambar: imageUrl },
    });

    await rekamAktivitas('TAMBAH_ARTIKEL', `Mempublikasikan artikel baru: "${judul}"`);
    revalidatePath('/admin/dashboard/artikel');
  }

  async function hapusArtikel(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;

    if (!id) return;

    // 1. Ambil judul artikel DULU sebelum datanya lenyap
    const artikel = await prisma.artikel.findUnique({
      where: { id: id },
      select: { judul: true } // Pastikan kolom di database kamu bernama 'judul'
    });

    // Jika artikelnya tidak ditemukan, batalkan proses
    if (!artikel) return;

    // 2. Eksekusi penghapusan dari database
    await prisma.artikel.delete({ 
      where: { id: id } 
    });

    // 3. >>> SISIPKAN LOG AKTIVITAS DI SINI <<<
    await rekamAktivitas('HAPUS_ARTIKEL', `Menghapus artikel: "${artikel.judul}" secara permanen`);

    // 4. Refresh halaman agar data terbaru muncul
    revalidatePath('/admin/dashboard/artikel');
  }
  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kelola Artikel / Blog</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM TAMBAH ARTIKEL */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Tulis Artikel Baru</h2>
          <form action={tambahArtikel} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
              <input type="text" name="judul" placeholder="Contoh: Manfaat Batu Paras..." required 
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konten Artikel</label>
              <textarea name="konten" placeholder="Tulis isi artikel di sini..." required 
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-40 resize-none" />
            </div>

            <ImagePreview />

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md mt-2">
              Publish Artikel
            </button>
          </form>
        </div>

        {/* TABEL DAFTAR ARTIKEL */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-800">Daftar Artikel Tersimpan</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                Total: {totalItems} Data
              </span>
            </div>
            
            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left">
                <thead className="bg-white border-b text-sm text-gray-500 uppercase">
                  <tr>
                    <th className="p-4 w-24">Thumbnail</th>
                    <th className="p-4">Judul Artikel</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {daftarArtikel.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        {item.gambar ? (
                          <img src={item.gambar} alt={item.judul} className="w-16 h-12 object-cover rounded-md border shadow-sm" />
                        ) : (
                          <div className="w-16 h-12 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 rounded-md border">Kosong</div>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-gray-800 line-clamp-2 mt-2 border-b-0">{item.judul}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/dashboard/artikel/edit/${item.id}`} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded text-sm font-medium hover:bg-yellow-200">
                            Edit
                          </Link>
                          <form action={hapusArtikel}>
                            <input type="hidden" name="id" value={item.id} />
                            <button className="px-3 py-1.5 bg-red-100 text-red-600 rounded text-sm font-medium hover:bg-red-200">Hapus</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {daftarArtikel.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-500">Belum ada artikel yang ditulis.</td></tr>}
                </tbody>
              </table>
            </div>

            {/* NAVIGASI PAGINATION */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
              <div className="text-sm text-gray-500">
                Halaman <span className="font-semibold text-gray-800">{currentPage}</span> dari <span className="font-semibold text-gray-800">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                {currentPage > 1 ? (
                  <Link href={`?page=${currentPage - 1}`} className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">&larr; Prev</Link>
                ) : (
                  <button disabled className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">&larr; Prev</button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link key={page} href={`?page=${page}`} className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages ? (
                  <Link href={`?page=${currentPage + 1}`} className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Next &rarr;</Link>
                ) : (
                  <button disabled className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">Next &rarr;</button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}