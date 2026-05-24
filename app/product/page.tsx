import { prisma } from "@/lib/prisma";
import ProductPageClient from "./ProductPageClient";

// Memastikan data selalu fresh setiap halaman dibuka (tidak tercache statis)
export const revalidate = 0;

export default async function ProductPage() {
  // 1. Tarik semua produk dari database beserta data relasi kategorinya
  const productsFromDb = await prisma.produk.findMany({
    include: {
      kategori: true, 
    },
    orderBy: {
      id: "desc", // Urutkan dari produk terbaru
    },
  });

  // 2. Tarik semua kategori dari database untuk menu filter
  const categoriesFromDb = await prisma.kategori.findMany({
    orderBy: {
      nama: "asc",
    },
  });

  // 3. Transformasi data produk agar strukturnya sesuai dengan yang dibutuhkan komponen temanmu
  const serializedProducts = productsFromDb.map((p) => ({
    id: p.id,
    nama: p.nama,
    deskripsi: p.deskripsi,
    harga: p.harga,
    gambar: p.gambar,
    category: p.kategori?.nama || "Tanpa Kategori", // Memetakan relasi ke filter kategori client
  }));

  // 4. Gabungkan teks "Semua Produk" dengan daftar kategori asli dari database
  const categories = ["Semua Produk", ...categoriesFromDb.map((cat) => cat.nama)];

  return (
    <ProductPageClient 
      initialProducts={serializedProducts} 
      categories={categories} 
    />
  );
}