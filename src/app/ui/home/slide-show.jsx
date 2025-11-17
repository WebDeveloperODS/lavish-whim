"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SlideShow = () => {
  const slides = [
    "/images/home/1.png",
    "/images/home/2.png",
    "/images/home/3.png",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide after 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[540px] lg:h-[780px] overflow-hidden">
      {slides.map((slide, index) => (
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
            className="w-full h-full object-cover object-center"
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
