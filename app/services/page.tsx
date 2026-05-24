import { prisma } from "@/lib/prisma";
import ServicesPageClient from "./ServicesPageClient";

// Memastikan data selalu fresh
export const revalidate = 0;

export default async function ServicesPage() {
  // 1. Tarik semua data jasa dari database
  const rawServices = await prisma.jasa.findMany({
    orderBy: { createdAt: "asc" }
  });

  // 2. Terjemahkan variabel dari bahasa Indonesia (DB) ke bahasa Inggris (Desain)
  const dbServices = rawServices.map((jasa) => ({
    title: jasa.nama,
    description: jasa.deskripsi,
    mainImage: jasa.gambar || "/Dummy.webp",
    slug: jasa.id,
  }));

  // 3. Lempar datanya ke komponen Client untuk animasinya
  return <ServicesPageClient initialServices={dbServices} />;
}