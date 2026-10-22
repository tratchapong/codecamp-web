// biome-ignore-all lint: home-page-component
"use client";

import { useCallback, useEffect, useState } from "react";

const photos = [
  { src: "/home/atmosphere-1.jpg", alt: "บรรยากาศการเรียนการสอน CodeCamp 1" },
  { src: "/home/atmosphere-2.jpg", alt: "บรรยากาศการเรียนการสอน CodeCamp 2" },
  { src: "/home/atmosphere-3.jpg", alt: "บรรยากาศการเรียนการสอน CodeCamp 3" },
  { src: "/home/atmosphere-4.jpg", alt: "บรรยากาศการเรียนการสอน CodeCamp 4" },
  { src: "/home/atmosphere-5.jpg", alt: "บรรยากาศการเรียนการสอน CodeCamp 5" },
];

export function AtmosphereSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, photos.length - slidesToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section className="w-full bg-[#E3F6F7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#276172] tracking-tight">
            CODE CAMP แคมป์สอนเขียน CODE แห่งแรกในประเทศไทย
          </h2>
        </div>

        {/* Gallery Carousel */}
        <div
          className="relative px-2 sm:px-8 mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-neutral-700 transition-transform active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-neutral-700 transition-transform active:scale-95"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {photos.map((photo, idx) => (
                <div
                  key={photo.src}
                  className="px-2 shrink-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="overflow-hidden rounded-xl shadow-md bg-white aspect-[3/2] group">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={`photo-dot-${idx}`}
                type="button"
                aria-label={`Go to photo ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? "w-7 h-2 bg-[#276172]"
                    : "w-2 h-2 bg-[#276172]/30 hover:bg-[#276172]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Experience Quote / Stats Text */}
        <div className="max-w-4xl mx-auto text-center bg-white/60 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border border-white/80 shadow-sm">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#187377] mb-2 leading-relaxed">
            &ldquo;เข้าใจ ใส่ใจ ด้วยคุณภาพและมาตรฐาน&rdquo;
          </p>
          <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed">
            จากประสบการณ์สอนถึง 5 ปี รวมนักเรียนทั้งหมดถึง 20 รุ่นที่จบจากแคมป์เรา
            <br className="hidden sm:inline" /> เราเปลี่ยนคุณเป็นโปรแกรมเมอร์ได้ ภายใน
            4 เดือน
          </p>
        </div>
      </div>
    </section>
  );
}
