"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Data dummy testimoni
const testimonials = [
  {
    id: 1,
    name: "Benn",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur. Tincidunt quisque viverra tellus non diam dignissim condimentum ipsum est. Pellentesque mi mus ornare pretium. Arcu arcu sit vestibulum at proin cursus luctus netus nullam.",
    rating: 5,
  },
  {
    id: 2,
    name: "Benn",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur. Tincidunt quisque viverra tellus non diam dignissim condimentum ipsum est. Pellentesque mi mus ornare pretium. Arcu arcu sit vestibulum at proin cursus luctus netus nullam.",
    rating: 4,
  },
  {
    id: 3,
    name: "Benn",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur. Tincidunt quisque viverra tellus non diam dignissim condimentum ipsum est. Pellentesque mi mus ornare pretium. Arcu arcu sit vestibulum at proin cursus luctus netus nullam.",
    rating: 5,
  },
  {
    id: 4,
    name: "Benn",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur. Tincidunt quisque viverra tellus non diam dignissim condimentum ipsum est. Pellentesque mi mus ornare pretium. Arcu arcu sit vestibulum at proin cursus luctus netus nullam.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [width, setWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const measureRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth);
    }
  }, []);

  //  Animasi Otomatis 
  useAnimationFrame((t, delta) => {
    let currentX = x.get();

  
    if (currentX <= -width) {
      x.set(currentX + width);
      currentX = x.get();
    }

    
    if (!isHovered && !isDragging && width > 0) {
      const moveBy = 0.8 * (delta / 16); 
      x.set(currentX - moveBy);
    }
  });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-0">
        
        {/* 🔹 HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6">
            What They Say About Us
          </h2>
          <p className="text-gray-500 text-[16px] leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sit in tellus enim etiam viverra. 
            Odio egestas pellentesque tempor venenatis sit fermentum ullamcorper aliquam. 
            Amet sagittis purus sem sit. Convallis sit in amet consectetur sapien arcu nulla vel.
          </p>
        </div>

        {/* 🔹 INFINITE MARQUEE DRAGGABLE SECTION */}
        <div 
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{ x }} 
            drag="x"      
            dragConstraints={{ right: 0, left: -width }} 
            onDragStart={() => setIsDragging(true)} 
            onDragEnd={() => setIsDragging(false)} 
            className="flex w-max"
          >
            
           
            <div ref={measureRef} className="flex gap-6 pr-6 shrink-0">
              {testimonials.map((item) => (
                <TestimonialCard key={`set1-${item.id}`} item={item} />
              ))}
            </div>

           
            <div className="flex gap-6 pr-6 shrink-0">
              {testimonials.map((item) => (
                <TestimonialCard key={`set2-${item.id}`} item={item} />
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({ item }: { item: any }) {
  return (
    <div className="w-[320px] md:w-100 bg-[#fafafa] rounded-2xl p-8 flex flex-col justify-between shrink-0 border border-gray-100 transition-colors duration-300 hover:border-gray-300">
      <div className="flex justify-between items-start mb-6">
        {/* Foto & Nama */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full border border-gray-200 shadow-sm shrink-0"></div>
          <div>
            <h4 className="text-lg font-medium text-black">
              {item.name}
            </h4>
            <p className="text-sm text-gray-400">{item.role}</p>
          </div>
        </div>

        {/* Bintang Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < item.rating ? "text-[#ffcc00]" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Teks Review */}
      <p className="text-gray-600 text-[15px] leading-relaxed">
        {item.text}
      </p>
    </div>
  );
}