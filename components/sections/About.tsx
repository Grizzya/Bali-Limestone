export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-8xl mx-auto px-12">

       
       <div className="grid md:grid-cols-12 gap-0 items-start mb-25">
        <h2 className="md:col-span-3 text-black text-[36px] font-semibold">
            Tentang Kami
         </h2>

        <p className="md:col-span-9 text-gray-600 text-[20px] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. In diam velit vitae tincidunt mattis est curabitur aliquam. Porttitor a faucibus ut pellentesque pellentesque scelerisque in. Pellentesque purus tortor commodo
        </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
         
          <div className="md:col-span-2 min-w-0">
            <img
                src="/About.jpeg"
                alt="Project Bali Limestone"
                className="rounded-2xl w-full aspect-[924/435] object-cover"
            />
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
            <div className="bg-yellow-400 rounded-xl w-[450px] h-[135px] p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold">1,000+</h3>
                <p className="text-sm">Succesful Project</p>
            </div>

            <div className="bg-yellow-400 rounded-xl w-[450px] h-[135px] p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold">90%</h3>
                <p className="text-sm">Kepuasan Pelanggan</p>
            </div>

            <div className="bg-yellow-400 rounded-xl w-[450px] h-[135px] p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold">10+</h3>
                <p className="text-sm">Perusahaan ini berdiri</p>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}