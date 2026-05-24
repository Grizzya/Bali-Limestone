import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ArtikelDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Mencari artikel berdasarkan SLUG
  const artikel = await prisma.artikel.findUnique({
    where: { slug: slug }
  });

  if (!artikel) return notFound();

  // Format tanggal agar lebih rapi
  const tanggalBikin = new Date(artikel.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Navbar variant="dark" />

      <section className="bg-white pt-28 lg:pt-40 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

          {/* TITLE & INTRO */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {artikel.judul}
            </h1>
            <p className="text-gray-400 text-[15px] leading-relaxed px-4 md:px-12">
              Dipublikasikan pada {tanggalBikin}
            </p>
          </div>

          {/* MAIN IMAGE */}
          <div className="w-full h-[250px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden mb-16 shadow-sm">
            <img
              src={artikel.gambar || "/Dummy.webp"} 
              alt={artikel.judul}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Isi Konten Artikel */}
            <div className="lg:col-span-8">
              <div className="text-gray-700 text-[17px] leading-loose text-justify whitespace-pre-line">
                {artikel.konten}
              </div>
            </div>

            {/* CTA Kuning */}
            <div className="lg:col-span-4 self-start lg:mt-2">
              <div className="bg-[#ffcc00] rounded-xl p-8 lg:p-12 flex flex-col items-center justify-center text-center shadow-sm sticky top-32">
                <h3 className="text-black text-[22px] leading-snug mb-6 lg:mb-8">
                  Butuh Material atau
                  <br />
                  Layanan Konstruksi?
                  <br />
                  <span className="font-bold">
                    Hubungi Kami
                    <br />
                    Sekarang
                  </span>
                </h3>

                <a
                  href="https://wa.me/628181802020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#2A2A2A] hover:bg-black transition-colors text-white py-4 rounded-lg flex justify-center items-center shadow-md hover:scale-105 duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[30px] h-[30px]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.452-.885-.77-1.482-1.72-1.655-2.018-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.183 1.183 0 0 0-.86.4 3.613 3.613 0 0 0-1.124 2.684c0 1.56 1.149 3.067 1.309 3.265.159.198 2.228 3.398 5.4 4.707 3.172 1.31 3.172.873 3.746.823.574-.05 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}