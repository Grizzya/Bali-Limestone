export default function FindUs() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-8xl mx-auto px-12">
        
        {/* Box Utama Abu-abu Gelap */}
        <div className="bg-[#3A3A3A] rounded-[40px] p-8 md:p-12 lg:p-15 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 w-full lg:h-125">
          
          {/* 🔹 Bagian Kiri: Area Peta */}
          {/* Sudah diubah menjadi h-50 yang lebih rapi dan bersih dari peringatan */}
          <div className="w-full lg:w-1/2 h-50 lg:h-full bg-gray-200 rounded-[30px] overflow-hidden shrink-0">
            
            {/* IFRAME GOOGLE MAPS */}
            <iframe 
              src="https://maps.google.com/maps?q=Jl.%20Raya%20Dalung%20No.83,%20Dalung,%20Kec.%20Kuta%20Utara,%20Kabupaten%20Badung,%20Bali%2080351&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              loading="lazy" 
              className="w-full h-full object-cover border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>

          {/* 🔹 Bagian Kanan: Teks Lokasi */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="text-4xl lg:text-[48px] font-semibold mb-6">
              Find Us
            </h2>
            <p className="text-gray-300 text-[18px] lg:text-[20px] leading-relaxed max-w-md">
              Jl. Raya Dalung No.83, Dalung,<br />
              Kec. Kuta Utara, Kabupaten Badung,<br />
              Bali 80351
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}