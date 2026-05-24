import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import ImagePreview from './ImagePreview'; 
import { rekamAktivitas } from '@/lib/logger';

export default async function JasaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const itemsPerPage = 5;
  const skip = (currentPage - 1) * itemsPerPage;

  const [daftarJasa, totalItems] = await Promise.all([
    prisma.jasa.findMany({
      skip: skip,
      take: itemsPerPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.jasa.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  async function tambahJasa(formData: FormData) {
    'use server';
    const nama = formData.get('nama') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const hargaInput = formData.get('harga') as string;
    const harga = hargaInput ? parseInt(hargaInput) : null;
    
    // Ambil ketiga file gambar
    const file1 = formData.get('gambar') as File;
    const file2 = formData.get('gambar2') as File;
    const file3 = formData.get('gambar3') as File;

    if (!nama) return;

    // Fungsi helper agar tidak mengulang kode Cloudinary 3 kali
    const uploadToCloudinary = async (file: File | null) => {
      if (!file || file.size === 0) return null;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'balilimestone_jasa' },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result?.secure_url);
          }
        );
        uploadStream.end(buffer);
      }) as Promise<string>;
    };

    // Upload ketiga gambar secara paralel (biar cepat)
    const [imageUrl1, imageUrl2, imageUrl3] = await Promise.all([
      uploadToCloudinary(file1),
      uploadToCloudinary(file2),
      uploadToCloudinary(file3),
    ]);

    // Simpan ke database
    await prisma.jasa.create({
      data: { 
        nama, 
        deskripsi, 
        harga, 
        gambar: imageUrl1, 
        gambar2: imageUrl2, 
        gambar3: imageUrl3 
      },
    });

    await rekamAktivitas('TAMBAH_JASA', `Menambahkan layanan jasa baru: "${nama}"`);
    revalidatePath('/admin/dashboard/jasa');
  }

 async function hapusJasa(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;

    const jasa = await prisma.jasa.findUnique({
      where: { id: id },
      select: { nama: true } 
    });

    if (!jasa) return;

    await prisma.jasa.delete({ where: { id: id } });
    await rekamAktivitas('HAPUS_JASA', `Menghapus layanan jasa: "${jasa.nama}" secara permanen`);
    revalidatePath('/admin/dashboard/jasa');
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kelola Jasa / Layanan</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM TAMBAH JASA */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Tambah Jasa Baru</h2>
          <form action={tambahJasa} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jasa</label>
              <input type="text" name="nama" placeholder="Contoh: Pasang Batu" required 
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Opsional)</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-gray-500 font-semibold">Rp</span>
                <input type="number" name="harga" placeholder="0" 
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea name="deskripsi" placeholder="Tuliskan detail jasa..." required 
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none" />
            </div>

            {/* FOTO UTAMA */}
            <ImagePreview />

            {/* FOTO GALERI TAMBAHAN */}
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-gray-700 border-b pb-1">Foto Tambahan (Galeri)</h3>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Foto Galeri 1 (Opsional)</label>
                <input type="file" name="gambar2" accept="image/*" className="w-full text-sm bg-white border p-1.5 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Foto Galeri 2 (Opsional)</label>
                <input type="file" name="gambar3" accept="image/*" className="w-full text-sm bg-white border p-1.5 rounded-lg" />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md mt-2">
              Simpan Jasa
            </button>
          </form>
        </div>

        {/* TABEL DAFTAR JASA */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-800">Daftar Jasa Tersimpan</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                Total: {totalItems} Data
              </span>
            </div>
            
            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-left">
                <thead className="bg-white border-b text-sm text-gray-500 uppercase">
                  <tr>
                    <th className="p-4">Gambar</th>
                    <th className="p-4">Nama Jasa</th>
                    <th className="p-4">Harga</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {daftarJasa.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4 w-24">
                        {item.gambar ? (
                          <img src={item.gambar} alt={item.nama} className="w-16 h-16 object-cover rounded-lg border shadow-sm" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-400 rounded-lg border">Kosong</div>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-gray-800">{item.nama}</td>
                      <td className="p-4">{item.harga ? `Rp ${item.harga.toLocaleString('id-ID')}` : '-'}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/dashboard/jasa/edit/${item.id}`} className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded text-sm font-medium hover:bg-yellow-200">
                            Edit
                          </Link>
                          <form action={hapusJasa}>
                            <input type="hidden" name="id" value={item.id} />
                            <button className="px-3 py-1.5 bg-red-100 text-red-600 rounded text-sm font-medium hover:bg-red-200">Hapus</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {daftarJasa.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-500">Belum ada jasa di halaman ini.</td></tr>}
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
                  <Link href={`?page=${currentPage - 1}`} className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    &larr; Prev
                  </Link>
                ) : (
                  <button disabled className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                    &larr; Prev
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`?page=${page}`}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages ? (
                  <Link href={`?page=${currentPage + 1}`} className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    Next &rarr;
                  </Link>
                ) : (
                  <button disabled className="px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                    Next &rarr;
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}