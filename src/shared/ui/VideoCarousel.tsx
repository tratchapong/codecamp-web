"use client";

import { useRef, useState, useEffect } from "react";

interface VideoCarouselProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  videos: string[];
}

export function VideoCarousel({
  title,
  subtitle,
  badge,
  icon = "🎬",
  videos,
}: VideoCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [videos]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 310;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className="mt-14 pt-12 border-t border-neutral-100">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
              <span>{icon}</span>
              <span>{badge}</span>
            </div>
          )}
          <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-3">
            {!badge && (
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-base">
                {icon}
              </div>
            )}
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-neutral-500 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous videos"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              canScrollLeft
                ? "bg-white text-neutral-800 border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-neutral-100 text-neutral-300 border-neutral-100 cursor-not-allowed opacity-50"
            }`}
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
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next videos"
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
              canScrollRight
                ? "bg-white text-neutral-800 border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-neutral-100 text-neutral-300 border-neutral-100 cursor-not-allowed opacity-50"
            }`}
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
        </div>
      </div>

      {/* Horizontal Scroll / Carousel Area */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {videos.map((video, index) => {
          const isYouTube =
            video.includes("youtube.com") || video.includes("youtu.be");
          const isFacebook = video.includes("facebook.com");

          let embedUrl = video;
          if (isYouTube) {
            const videoId = video.split("/").pop()?.split("?")[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (isFacebook) {
            embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
              video
            )}&show_text=false&t=0`;
          }

          return (
            <div
              key={index}
              className="w-[260px] sm:w-[280px] md:w-[290px] flex-shrink-0 snap-start"
            >
              <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden shadow-lg border border-neutral-200/80 bg-neutral-900 group transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="absolute inset-0 w-full h-full"
                  title={`${title} video ${index + 1}`}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
