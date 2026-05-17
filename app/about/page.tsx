import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

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
        <section className="relative w-full h-[420px] overflow-hidden mt-20">
          {/* Background Image */}
          <Image
            src="/images/excavator.jpg"
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
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
            >
              <path
                d="M30 6L4 26H10V54H26V38H34V54H50V26H56L30 6Z"
                stroke="white"
                strokeWidth="2"
              />

              <path
                d="M22 38H18V46H22V38Z"
                stroke="white"
                strokeWidth="1.5"
              />

              <path
                d="M30 20C27.8 20 26 21.8 26 24C26 26.2 27.8 28 30 28C32.2 28 34 26.2 34 24C34 21.8 32.2 20 30 20Z"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>

            {/* Brand */}
            <span className="text-white text-sm md:text-base font-bold tracking-[0.3em] uppercase">
              Bali Limestone
            </span>
          </div>
        </section>
      </main>
    </>
  );
}