"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SlideShow = () => {
  const [onMobile, setOnMobile] = useState(false);
  const slides = [
    "/images/home/1.jpg",
    "/images/home/2.png",
    "/images/home/3.png",
  ];
  const slides_m = [
    "/images/home/1-m.jpg",
    "/images/home/2.png",
    "/images/home/3.png",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide after 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(window.innerWidth <= 1024){
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  })

  return (
    <div className="relative w-full h-[680px] lg:h-[86vh] overflow-hidden">
      {( onMobile ? slides_m : slides).map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide}
            alt={`Slide ${index + 1}`}
            fill
            priority={true}
            sizes={""}
            className="w-full h-full object-contain lg:object-cover object-center"
          />
        </div>
      ))}

      {/* Optional: Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === index ? "bg-white shadow-sm shadow-neutral-800" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
