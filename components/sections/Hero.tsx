import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen text-white">
      <Image
        src="/hero.jpg"
        alt="Alat berat Bali Limestone"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-left px-12 pt-60">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
            Solusi Material & Alat Berat Terpercaya Untuk Proyek Anda Di Bali
        </h1>

        <p className="mt-4 max-w-xl text-gray-200">
           Bali Limestone adalah supplier limestone, tanah urug, batu pondasi, pasir, dll. Kami juga menyediakan jasa sewa alat berat dan dump truck yang siap mengirim untuk proyek skala menengah dan skala besar.z
        </p>

        <button className="mt-16 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
            Contact Us Now
        </button>
        </div>
    </section>
  );
}