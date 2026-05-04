"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type CardProps = {
  title: string;
  img: string;
};

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  const isLeftActive = active === 2 || active === 3;
  const isRightActive = active === 1 || active === 4;

  return (
    <div className="bg-white"> 
      <section className="bg-[#1a1a1a] text-white py-20 overflow-hidden rounded-t-[25px]">
        <div className="max-w-8xl mx-auto px-12">
          
          
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-137.5">

            <motion.div
              layout
              style={{ flex: isLeftActive ? 1.5 : isRightActive ? 0.8 : 1 }}
              className="flex flex-col gap-4"
            >
              
              <motion.div
                layout
                style={{ flex: isLeftActive ? 0.6 : 1 }}
                className="flex flex-col justify-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Layanan <br className="hidden lg:block" /> Kami
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Layanan yang kami sediakan di <b>Bali Limestone</b> yaitu meliputi
                  Land Cut and Fill, Galian Basement, Land Clearing, dan Bongkar Bangunan.
                </p>
              </motion.div>

             
              <motion.div
                layout
                style={{ flex: isLeftActive ? 1.8 : 1 }}
                className="flex gap-4 min-h-50 lg:min-h-0"
              >
                <motion.div
                  layout
                  onMouseEnter={() => setActive(2)}
                  onMouseLeave={() => setActive(null)}
                  style={{ flex: active === 2 ? 1.8 : active === 3 ? 0.6 : 1 }}
                  className="relative rounded-xl overflow-hidden w-full"
                >
                  <Card title="Bongkar Bangunan" img="/img4.jpg" />
                </motion.div>

                <motion.div
                  layout
                  onMouseEnter={() => setActive(3)}
                  onMouseLeave={() => setActive(null)}
                  style={{ flex: active === 3 ? 1.8 : active === 2 ? 0.6 : 1 }}
                  className="relative rounded-xl overflow-hidden w-full"
                >
                  <Card title="Land Cut and Fill" img="/img2.jpg" />
                </motion.div>
              </motion.div>
              
            </motion.div>

            
            <motion.div
              layout
              style={{ flex: isRightActive ? 1.6 : isLeftActive ? 0.8 : 1.2 }}
              className="flex flex-col gap-4"
            >
              
            
              <motion.div
                layout
                onMouseEnter={() => setActive(1)}
                onMouseLeave={() => setActive(null)}
                style={{ flex: active === 1 ? 1.8 : active === 4 ? 0.6 : 1 }}
                className="relative rounded-xl overflow-hidden w-full min-h-50 lg:min-h-0"
              >
                <Card title="Galian Basement" img="/img1.jpg" />
              </motion.div>

            
              <motion.div
                layout
                onMouseEnter={() => setActive(4)}
                onMouseLeave={() => setActive(null)}
                style={{ flex: active === 4 ? 1.8 : active === 1 ? 0.6 : 1 }}
                className="relative rounded-xl overflow-hidden w-full min-h-50 lg:min-h-0"
              >
                <Card title="Land Clearing" img="/img3.jpg" />
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, img }: CardProps) {
  return (
    <div className="w-full h-full relative group cursor-pointer">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 w-full bg-[#ffcc00] text-black px-4 py-3 flex justify-between items-center transition-all duration-300">
        <span className="font-medium text-sm md:text-base">{title}</span>
        <span>›</span>
      </div>
    </div>
  );
}