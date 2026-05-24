import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function DaftarArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const itemsPerPage = 1; // Menampilkan 6 artikel per halaman agar pas dengan grid 3 kolom
  const skip = (currentPage - 1) * itemsPerPage;

  // Tarik data artikel dengan batasan halaman dan hitung total artikel
  const [daftarArtikel, totalItems] = await Promise.all([
    prisma.artikel.findMany({
      skip: skip,
      take: itemsPerPage,
      orderBy: { createdAt: "desc" },
    }),
    prisma.artikel.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col text-black">
      <Navbar variant="dark" />

      <section className="flex-grow pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Artikel & Inspirasi
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-[15px] md:text-base">
            Temukan berbagai information menarik, tips konstruksi, dan inspirasi desain menggunakan batu alam kualitas terbaik dari Bali Limestone.
          </p>
        </div>

        {/* GRID ARTIKEL */}
        {daftarArtikel.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
              {daftarArtikel.map((artikel) => {
                const tanggal = new Date(artikel.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <div
                    key={artikel.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                  >
                    {/* Thumbnail Gambar */}
                    <Link href={`/artikel/${artikel.slug}`} className="block relative h-56 overflow-hidden">
                      <img
                        src={artikel.gambar || "/Dummy.webp"}
                        alt={artikel.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>

                    {/* Konten Card */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <span className="text-sm font-medium text-[#ffcc00] mb-3">
                        {tanggal}
                      </span>

                      <Link href={`/artikel/${artikel.slug}`}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ffcc00] transition-colors">
                          {artikel.judul}
                        </h2>
                      </Link>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {artikel.konten}
                      </p>

                      {/* Tombol Baca Selengkapnya */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <Link
                          href={`/artikel/${artikel.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#ffcc00] transition-colors"
                        >
                          Baca Selengkapnya
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PUBLIC PAGINATION NAVIGATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 border-t border-gray-200 pt-8">
                {/* Tombol Previous */}
                {currentPage > 1 ? (
                  <Link
                    href={`?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    &larr; Prev
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed"
                  >
                    &larr; Prev
                  </button>
                )}

                {/* Nomor Halaman */}
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all border ${
                        currentPage === page
                          ? "bg-black text-[#ffcc00] border-black shadow-sm"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {/* Tombol Next */}
                {currentPage < totalPages ? (
                  <Link
                    href={`?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Next &rarr;
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-100 border border-gray-200 rounded-xl cursor-not-allowed"
                  >
                    Next &rarr;
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          /* JIKA BELUM ADA ARTIKEL */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
            <h3 className="text-xl font-medium text-gray-600 mb-2">Belum ada artikel</h3>
            <p className="text-gray-400">Artikel yang diterbitkan akan muncul di sini.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}