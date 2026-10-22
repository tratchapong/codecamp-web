// biome-ignore-all lint: home-page-component
"use client";

import { useState } from "react";

const mapImages = [
  {
    src: "/home/map-1.jpg",
    alt: "วิธีเดินทางมาเรียน - BTS พญาไท ทางออก 4 อาคารวรรณสรณ์",
  },
  { src: "/home/map-2.jpg", alt: "วิธีเดินทางมาเรียน - ทางออก BTS พญาไท" },
  {
    src: "/home/map-3.jpg",
    alt: "วิธีเดินทางมาเรียน - ข้ามทางม้าลายมายังอาคารวรรณสรณ์",
  },
  { src: "/home/map-4.jpg", alt: "วิธีเดินทางมาเรียน - ทางเข้าอาคารวรรณสรณ์" },
  { src: "/home/map-5.jpg", alt: "วิธีเดินทางมาเรียน - ลิฟต์ขึ้นชั้น 12A" },
  { src: "/home/map-6.jpg", alt: "วิธีเดินทางมาเรียน - ถึงห้องเรียน CodeCamp" },
];

const benefitImages = [
  { src: "/home/benefit-1.jpg", alt: "Code Camp ให้อะไรกับคุณ 1" },
  { src: "/home/benefit-2.jpg", alt: "Code Camp ให้อะไรกับคุณ 2" },
  { src: "/home/benefit-3.jpg", alt: "Code Camp ให้อะไรกับคุณ 3" },
];

function MiniSlider({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-neutral-100 bg-white group">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="w-full h-full object-cover transition-all duration-300"
          loading="lazy"
        />
      </div>

      {/* Prev / Next controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-95"
      >
        <svg
          className="w-4 h-4"
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
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 active:scale-95"
      >
        <svg
          className="w-4 h-4"
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

      {/* Slide dots & counter */}
      <div className="p-3 bg-white flex items-center justify-between border-t border-neutral-100">
        <div className="flex gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all ${
                index === i ? "w-5 h-2 bg-[#437B83]" : "w-2 h-2 bg-neutral-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-500 font-medium">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

export function TravelAndBenefits() {
  return (
    <section className="w-full bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Column 1: วิธีเดินทางมาเรียน */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#437B83] text-center mb-6">
              วิธีเดินทางมาเรียน
            </h2>
            <MiniSlider images={mapImages} />
          </div>

          {/* Column 2: Code Camp ให้อะไรกับคุณ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#437B83] text-center mb-6">
              Code Camp ให้อะไรกับคุณ
            </h2>
            <MiniSlider images={benefitImages} />
          </div>
        </div>
      </div>
    </section>
  );
}
