import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ImagePreview from '../../../jasa/ImagePreview'; 
import SubmitButton from '../../../SubmitButton';
import { rekamAktivitas } from '@/lib/logger';

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const artikelId = (await params).id;

  const artikel = await prisma.artikel.findUnique({
    where: { id: artikelId },
  });

  if (!artikel) return <div className="p-8 text-center text-black">Artikel Tidak Ditemukan.</div>;

  async function updateArtikel(formData: FormData) {
    'use server';
    const judul = formData.get('judul') as string;
    const konten = formData.get('konten') as string;
    const file = formData.get('gambar') as File;

    if (!judul || !konten) return;

    let imageUrl = artikel?.gambar;

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

    await prisma.artikel.update({
      where: { id: artikelId },
      data: { judul, konten, gambar: imageUrl },
    });
    await rekamAktivitas('EDIT_ARTIKEL', `Mengubah isi artikel: "${judul}"`);
    revalidatePath('/admin/dashboard/artikel');
    redirect('/admin/dashboard/artikel');
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-black">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/artikel" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
          &larr; Kembali
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Artikel</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form action={updateArtikel} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
            <input type="text" name="judul" defaultValue={artikel.judul} required 
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konten Artikel</label>
            <textarea name="konten" defaultValue={artikel.konten} required 
              className="w-full border px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none" />
          </div>

          <ImagePreview defaultImage={artikel.gambar} />

          <SubmitButton 
            label="Simpan Perubahan" 
            confirmMessage="Apakah Anda yakin ingin MENYIMPAN PERUBAHAN data ini?" 
          />
        </form>
      </div>
    </div>
  );
}