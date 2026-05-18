import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ProductSection from "@/components/sections/ProductSection";
import Review from "@/components/sections/Review";
import Location from "@/components/sections/Location";
import Footer from "@/components/layout/Footer";
import Image from "@/components/Reveal";

export const metadata = {
  title: "Bali Limestone Supplier | Jasa & Material Bali",
  description:
    "Solusi material dan alat berat terpercaya di Bali. Menyediakan limestone, galian, dan jasa konstruksi.",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ProductSection />
      <Review /> 
      <Location />
      <Footer />
      
    </main>
  );
}