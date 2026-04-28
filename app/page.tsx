import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

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
    </main>
  );
}