// biome-ignore-all lint: home-page-component
"use client";

import { useCallback, useEffect, useState } from "react";

interface HighlightItem {
  id: number;
  title: string;
  desc: string;
}

const highlights: HighlightItem[] = [
  {
    id: 1,
    title: "ได้การรับรองหลักสูตร STEM อย่างเป็นทางการ",
    desc: "แคมป์สอนเขียนโค้ดที่มีหลักสูตรมาตรฐานของบริษัท Tech ยอมรับ เลขที่รับรอง TPC690045",
  },
  {
    id: 2,
    title: "ไม่มีพื้นฐานก็เรียนได้ เราสอนให้ตั้งแต่ 0",
    desc: "การเรียนการสอนถูกออกแบบสำหรับบุคคลทั่วไป และผู้ที่สนใจอยากเป็น Programmer โดยเฉพาะ มี Video ให้ดูย้อนหลังได้ทุกวันที่สอน",
  },
  {
    id: 3,
    title: "เดินทางสะดวก อยู่ใกล้ย่านใจกลางกรุงเทพฯ",
    desc: "ลงสถานี BTS พญาไท ทางออก 4 เดินมายังอาคารวรรณสรณ์ มีที่จอดรถให้บริการ และสถานที่รับประทานอาหารที่หลากหลาย",
  },
  {
    id: 4,
    title: "เรียนจบหลักสูตร ได้ใบ Certificate",
    desc: "สามารถนำใบ Certificate แนบไปกับ resume หลังจากเรียนจบกับทางเรา",
  },
  {
    id: 5,
    title: "มีโปรเจคท์ให้ทำและนำไปใช้งานได้จริง",
    desc: "ไม่ได้เรียนแค่ทฤษฏี แต่เน้นให้นักเรียนลงมือทำและประยุกต์สิ่งที่ได้เรียนมา โดยนักเรียนจะได้ทำโปรเจคท์อย่างน้อย 1 โปรเจคท์เพื่อนำเสนอผลงาน",
  },
];

export function CampHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive slides count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  const maxIndex = Math.max(0, highlights.length - slidesToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#437B83] mb-3">
            จุดเด่นของแคมป์เรา
          </h2>
          <div className="w-16 h-1 bg-[#437B83]/30 mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-2 sm:px-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-all focus:outline-none"
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
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-all focus:outline-none"
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

          {/* Slides Viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {highlights.map((item) => (
                <div
                  key={item.id}
                  className="px-3 shrink-0 flex flex-col"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="h-full bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-start transition-all duration-300 hover:shadow-lg hover:border-[#437B83]/40 group">
                    <div className="w-10 h-10 rounded-xl bg-[#437B83]/10 text-[#437B83] flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-[#437B83] group-hover:text-white transition-colors">
                      {item.id}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-800 mb-3 group-hover:text-[#437B83] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-[#437B83]"
                    : "w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
