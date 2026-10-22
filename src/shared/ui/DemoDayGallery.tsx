"use client";

import { useState } from "react";

export function DemoDayGallery({ images }: { images: string[] }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = "unset";
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="mt-6 border-t border-neutral-200/60 pt-6 w-full">
      <div className="text-sm font-bold text-neutral-800 mb-3 flex items-center gap-1.5">
        <span>📸</span> ภาพบรรยากาศในงาน Demo Day จริง (คลิกเพื่อขยาย)
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {images.map((img: string, i: number) => (
          <div
            key={i}
            onClick={() => openLightbox(i)}
            className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-neutral-200/50 bg-neutral-100 relative group/img cursor-zoom-in"
          >
            <img
              src={img}
              alt={`Demo Day ${i + 1}`}
              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">🔍 ขยาย</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/95 backdrop-blur-md p-4 transition-all duration-300"
        >
          {/* Top tools */}
          <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
            <span className="text-white/80 text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
              {activeImageIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors font-bold"
            >
              ✕
            </button>
          </div>

          {/* Image display container */}
          <div className="relative w-full max-w-5xl aspect-[4/3] max-h-[80vh] flex items-center justify-center">
            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-2xl transition-colors font-bold z-50 border border-white/10"
            >
              ‹
            </button>

            <img
              src={images[activeImageIndex]}
              alt={`Demo Day Active`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-2xl transition-colors font-bold z-50 border border-white/10"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
