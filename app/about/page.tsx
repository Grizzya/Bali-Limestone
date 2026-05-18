import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Us | Bali Limestone",
  description:
    "Learn more about Bali Limestone, your trusted limestone supplier in Bali.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar variant="dark" />

      <main className="min-h-screen bg-white text-gray-900 font-sans">
        {/*  ABOUT SECTION  */}
        <section className="px-6 md:px-10 pt-32 pb-20 max-w-6xl mx-auto">
        

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-gray-900">
              About Us
            </h1>

            {/* Description */}
            <p className="text-base leading-relaxed text-gray-600 md:pt-2">
              Lorem ipsum dolor sit amet consectetur. In diam velit vitae
              tincidunt mattis est curabitur aliquam. Porttitor a faucibus ut
              pellentesque pellentesque scelerisque in. Pellentesque purus
              tortor commodo.
            </p>
          </div>
        </section>


        {/*  HERO BANNER */}
        <section className="relative w-full h-[420px] overflow-hidden mt-20 mb-20">
          {/* Background Image */}
          <Image
            src="/Dummy.webp"
            alt="Excavator Bali Limestone"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55 z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
            {/* Logo */}
            <Image
              src="/BALI LIMESTONE.png"
              alt="Bali Limestone Logo"
              width={500}
              height={500}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}