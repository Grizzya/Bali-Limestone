import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ProductSection from "@/components/sections/ProductSection";
import Review from "@/components/sections/Review";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma"; // Import database

export const metadata = {
  title: "Bali Limestone Supplier | Jasa & Material Bali",
  description:
    "Solusi material dan alat berat terpercaya di Bali. Menyediakan limestone, galian, dan jasa konstruksi.",
};

export const revalidate = 0; 

export default async function Home() {
  
  // 1. Tarik Data Produk
  const latestProducts = await prisma.produk.findMany({
    take: 6,
    orderBy: { id: "desc" },
  });

  // 2. Tarik Data Jasa
  const rawServices = await prisma.jasa.findMany({
    take: 4, 
    orderBy: { id: "asc" },
  });

  // 3. Terjemahkan nama variabel DB ke variabel Frontend untuk Jasa
  const dbServices = rawServices.map((jasa) => ({
    title: jasa.nama,
    description: jasa.deskripsi,
    mainImage: jasa.gambar || "/Dummy.webp",
    slug: jasa.id, 
  }));

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      
      {/* 4. Lempar data jasa yang sudah ditarik ke komponen Services */}
      <Services services={dbServices} />
      
      {/* 5. Lempar data produk ke komponen ProductSection */}
      <ProductSection products={latestProducts} />
      
      <Review /> 
      <Location />
      <Footer />
    </main>
  );
}