import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] text-white">

      <Image
        src="/hero.jpg"
        alt="Alat berat Bali Limestone"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pb-16 md:pb-0 pt-0 md:pt-24">

          <h1 className="
            text-[1.75rem] leading-tight font-extrabold
            sm:text-3xl
            md:text-4xl md:max-w-lg
            lg:text-5xl lg:max-w-2xl
          ">
            Solusi Material & Alat Berat Terpercaya Untuk Proyek Anda Di Bali
          </h1>

          <p className="
            mt-4 text-sm text-gray-200 leading-relaxed
            max-w-xs
            md:text-base md:max-w-md
            lg:max-w-xl
          ">
            <strong>Bali Limestone</strong> adalah supplier limestone, tanah urug,
            batu pondasi, pasir, dll. Kami juga menyediakan jasa sewa alat berat
            dan dump truck yang siap mengirim untuk proyek skala menengah dan skala besar.
          </p>

          <button className="
            mt-8 bg-yellow-400 text-black font-semibold rounded-lg
            px-7 py-3 text-sm
            md:mt-10 md:px-8 md:py-3 md:text-base
            lg:mt-14
            hover:opacity-90 transition
          ">
            Contact Us Now
          </button>

        </div>
      </div>
    </section>
  );
}