import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ImagePreview from '../../ImagePreview';
import SubmitButton from '../../../SubmitButton';
import { rekamAktivitas } from '@/lib/logger';

export default async function EditJasaPage({ params }: { params: Promise<{ id: string }> }) {
  const jasaId = (await params).id;

  const jasa = await prisma.jasa.findUnique({
    where: { id: jasaId },
  });

  if (!jasa) {
    return <div className="p-8 text-center">Jasa Tidak Ditemukan.</div>;
  }

  async function updateJasa(formData: FormData) {
    'use server';
    
    const nama = formData.get('nama') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const hargaInput = formData.get('harga') as string;
    const harga = hargaInput ? parseInt(hargaInput) : null;
    
    // Ambil ketiga file
    const file1 = formData.get('gambar') as File;
    const file2 = formData.get('gambar2') as File;
    const file3 = formData.get('gambar3') as File;

    if (!nama) return;

    // Fungsi helper upload: Jika file kosong, pertahankan foto yang sudah ada di database
    const uploadToCloudinary = async (file: File | null, existingUrl: string | null) => {
      if (!file || file.size === 0) return existingUrl; 
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

    // Upload paralel
    const [imageUrl1, imageUrl2, imageUrl3] = await Promise.all([
      uploadToCloudinary(file1, jasa?.gambar || null),
      uploadToCloudinary(file2, jasa?.gambar2 || null),
      uploadToCloudinary(file3, jasa?.gambar3 || null),
    ]);

    await prisma.jasa.update({
      where: { id: jasaId },
      data: { 
        nama, 
        deskripsi, 
        harga, 
        gambar: imageUrl1, 
        gambar2: imageUrl2, 
        gambar3: imageUrl3 
      },
    });
    
    await rekamAktivitas('EDIT_JASA', `Mengubah data layanan jasa: "${nama}"`);

    revalidatePath('/admin/dashboard/jasa');
    redirect('/admin/dashboard/jasa');
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-black">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/jasa" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
          &larr; Kembali
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Jasa</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={updateJasa} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jasa</label>
            <input type="text" name="nama" defaultValue={jasa.nama} required 
              className="w-full border px-4 py-3 rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Opsional)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-semibold">Rp</span>
              <input type="number" name="harga" defaultValue={jasa.harga || ''} 
                className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="deskripsi" defaultValue={jasa.deskripsi} required 
              className="w-full border px-4 py-3 rounded-lg outline-none h-32 resize-none" />
          </div>

          {/* FOTO UTAMA */}
          <div className="border-b pb-4 mb-2">
            <h3 className="font-semibold text-gray-700 mb-2">Foto Utama</h3>
            <ImagePreview defaultImage={jasa.gambar} />
          </div>

          {/* FOTO GALERI */}
          <div className="flex flex-col gap-4 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <h3 className="font-semibold text-gray-700">Foto Galeri (Tambahan)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Foto Galeri 1</label>
                {jasa.gambar2 && (
                  <img src={jasa.gambar2} alt="Galeri 1" className="w-full h-32 object-cover rounded-lg border mb-2 shadow-sm" />
                )}
               <input type="file" name="gambar2" accept=".jpg, .jpeg, .png, .webp" className="w-full bg-white border p-2 rounded-lg text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Foto Galeri 2</label>
                {jasa.gambar3 && (
                  <img src={jasa.gambar3} alt="Galeri 2" className="w-full h-32 object-cover rounded-lg border mb-2 shadow-sm" />
                )}
                <input type="file" name="gambar3" accept="image/*" className="w-full bg-white border p-2 rounded-lg text-sm" />
              </div>
            </div>
            <p className="text-xs text-gray-400 italic mt-2">* Upload file baru jika ingin mengganti foto galeri sebelumnya.</p>
          </div>

          <SubmitButton 
            label="Simpan Perubahan" 
            confirmMessage="Apakah Anda yakin ingin MENYIMPAN PERUBAHAN data ini?" 
          />
        </form>
      </div>
    </div>
  );
}