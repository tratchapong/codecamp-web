"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImg(img)}
            className={`group relative overflow-hidden rounded-xl bg-neutral-50 border border-neutral-100 shadow-sm transition-all duration-700 hover:shadow-2xl cursor-zoom-in ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <img
              src={img}
              alt={`${title} screenshot ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-opacity duration-500 flex items-center justify-center">
               <span className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-sm font-bold text-neutral-900 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Click to Expand
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white text-4xl font-light hover:rotate-90 transition-transform p-4"
            onClick={() => setSelectedImg(null)}
          >
            ×
          </button>
          
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img
              src={selectedImg}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      )}
    </>
  );
}
