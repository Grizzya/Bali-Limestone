import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
// Sesuaikan path import ImagePreview
import ImagePreview from '../../../jasa/ImagePreview'; 
// Pastikan path SubmitButton ini sudah benar mengarah ke file SubmitButton.tsx yang kamu buat
import SubmitButton from '../../../SubmitButton'; 
import { rekamAktivitas } from '@/lib/logger';

export default async function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const productId = (await params).id;

  const produk = await prisma.produk.findUnique({
    where: { id: productId },
  });

  if (!produk) return <div className="p-8 text-center text-black">Produk Tidak Ditemukan.</div>;

  const daftarKategori = await prisma.kategori.findMany();

 // Pastikan import ini ada di deretan paling atas file page.tsx kamu:
// import { rekamAktivitas } from '@/lib/logger';

async function updateProduk(formData: FormData) {
    'use server';
    const nama = formData.get('nama') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const harga = parseInt(formData.get('harga') as string);
    const kategoriId = formData.get('kategoriId') as string;
    const file = formData.get('gambar') as File;

    if (!nama || !harga || !kategoriId) return;

    let imageUrl = produk?.gambar;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'balilimestone_produk' },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result?.secure_url);
          }
        );
        uploadStream.end(buffer);
      }) as string;
    }

    // 1. Eksekusi update ke database
    await prisma.produk.update({
      where: { id: productId },
      data: { nama, deskripsi, harga, kategoriId, gambar: imageUrl },
    });

    // 2. >>> SISIPKAN LOG AKTIVITAS DI SINI <<<
    await rekamAktivitas('EDIT_PRODUK', `Mengubah data produk: "${nama}" menjadi seharga Rp ${harga.toLocaleString('id-ID')}`);

    revalidatePath('/admin/dashboard/produk');
    redirect('/admin/dashboard/produk'); 
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-black">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard/produk" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
          &larr; Kembali
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Edit Produk</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* HANYA ADA SATU BUNGKUSAN FORM DI SINI */}
        <form action={updateProduk} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
            <input type="text" name="nama" defaultValue={produk.nama} required className="w-full border px-4 py-3 rounded-lg outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select name="kategoriId" defaultValue={produk.kategoriId} required className="w-full border px-4 py-3 rounded-lg outline-none bg-white">
              {daftarKategori.map((kat) => (
                <option key={kat.id} value={kat.id}>{kat.nama}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Satuan</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 font-semibold">Rp</span>
              <input type="number" name="harga" defaultValue={produk.harga} required className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="deskripsi" defaultValue={produk.deskripsi} required className="w-full border px-4 py-3 rounded-lg outline-none h-32 resize-none" />
          </div>

          <ImagePreview defaultImage={produk.gambar} />

          {/* Ganti tombol submit yang lama dengan komponen Client ini */}
          <SubmitButton 
            label="Simpan Perubahan" 
            confirmMessage="Apakah Anda yakin ingin MENYIMPAN PERUBAHAN data ini?" 
          />
        </form>
      </div>
    </div>
  );
}