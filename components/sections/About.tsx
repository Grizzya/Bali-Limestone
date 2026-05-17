export default function About() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-12">

        {/* Header */}
        <div className="grid md:grid-cols-12 gap-4 md:gap-0 items-start mb-10 md:mb-16 lg:mb-25">
          <h2 className="md:col-span-3 text-black text-[28px] md:text-[32px] lg:text-[36px] font-semibold">
            Tentang Kami
          </h2>
          <p className="md:col-span-9 text-gray-600 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. In diam velit vitae
            tincidunt mattis est curabitur aliquam. Porttitor a faucibus ut
            pellentesque pellentesque scelerisque in. Pellentesque purus tortor commodo
          </p>
        </div>

      </div>

      {/* Foto  */}
      <div className="relative md:hidden w-full h-[320px]">
        <img
          src="/About.jpeg"
          alt="Project Bali Limestone"
          className="w-full h-full object-cover"
        />

        {/* Stats overlay  */}
        <div className="absolute inset-0 flex flex-col justify-center items-end gap-3">
          <div className="bg-yellow-400 rounded-l-xl px-5 flex items-center" style={{ width: '187px', height: '53px' }}>
            <div>
              <h3 className="text-black font-bold text-xl leading-tight">1,000+</h3>
              <p className="text-black text-xs">Succesfull Project</p>
            </div>
          </div>
          <div className="bg-yellow-400 rounded-l-xl px-5 flex items-center" style={{ width: '187px', height: '53px' }}>
            <div>
              <h3 className="text-black font-bold text-xl leading-tight">90%</h3>
              <p className="text-black text-xs">Kepuasan Pelanggan</p>
            </div>
          </div>
          <div className="bg-yellow-400 rounded-l-xl px-5 flex items-center" style={{ width: '187px', height: '53px' }}>
            <div>
              <h3 className="text-black font-bold text-xl leading-tight">10+</h3>
              <p className="text-black text-xs">Perusahaan ini Berdiri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Desktop  */}
      <div className="hidden md:block max-w-8xl mx-auto px-10 lg:px-12">
        <div className="grid md:grid-cols-3 gap-8 md:items-stretch">
          <div className="md:col-span-2 min-w-0 relative overflow-hidden rounded-2xl">
            <img
              src="/About.jpeg"
              alt="Project Bali Limestone"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-yellow-400 rounded-xl p-6 flex flex-col justify-center flex-1">
              <h3 className="text-black font-bold text-3xl">1,000+</h3>
              <p className="text-black">Succesfull Project</p>
            </div>
            <div className="bg-yellow-400 rounded-xl p-6 flex flex-col justify-center flex-1">
              <h3 className="text-black font-bold text-3xl">90%</h3>
              <p className="text-black">Kepuasan Pelanggan</p>
            </div>
            <div className="bg-yellow-400 rounded-xl p-6 flex flex-col justify-center flex-1">
              <h3 className="text-black font-bold text-3xl">10+</h3>
              <p className="text-black">Perusahaan ini Berdiri</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}