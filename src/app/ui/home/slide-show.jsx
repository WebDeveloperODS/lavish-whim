"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SlideShow = () => {
  const [onMobile, setOnMobile] = useState(false);
  const slides = [
    "/images/home/3.jpg",
    "/images/home/2.jpg",
    "/images/home/1.jpg",
  ];
  const slides_m = [
    "/images/home/3-m.jpg",
    "/images/home/1-m.jpg",
    "/images/home/2-m.jpg",
  ];
  const [blockLoop, setBlockLoop] = useState(false)
  const [current, setCurrent] = useState(0);

  // Auto slide after 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds

    if(!blockLoop){
      return () => clearInterval(interval);
    }

  }, [blockLoop]);

  useEffect(() => {
    if(window.innerWidth <= 1024){
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  })

  return (
    <div className="relative w-full h-[670px] lg:h-[81vh] overflow-hidden">
      {( onMobile ? slides_m : slides).map((slide, index) => (
        <div
          key={index}
          className={`absolute cursor-pointer inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => window.location.href='/bags-by-lavish-whim'}
        >
          <Image
            src={slide}
            alt={`Slide ${index + 1}`}
            fill
            onMouseEnter={() => setBlockLoop(true)}
            onMouseDown={() => setBlockLoop(false)}
            priority={true}
            sizes={""}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

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
