// biome-ignore-all lint: home-page-component
"use client";

import { useEffect, useRef, useState } from "react";

interface CounterItem {
  target: number;
  suffix: string;
  title: string;
}

const stats: CounterItem[] = [
  {
    target: 900,
    suffix: "+",
    title: "จำนวนนักเรียนเปลี่ยนสายงาน",
  },
  {
    target: 90,
    suffix: "%",
    title: "นักเรียนที่ได้งานทำ",
  },
  {
    target: 50,
    suffix: "+",
    title: "บริษัทพาร์ทเนอร์ของเรา",
  },
];

export function StatsCounter() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts(stats.map((s) => Math.floor(easeOut * s.target)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts(stats.map((s) => s.target));
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#187377] text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
        {stats.map((item, idx) => (
          <div key={item.title} className={`${idx > 0 ? "pt-6 md:pt-0" : ""}`}>
            <div className="text-sm sm:text-base font-medium text-teal-100 mb-2">
              {item.title}
            </div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight flex items-center justify-center gap-1">
              <span>{counts[idx].toLocaleString()}</span>
              <span className="text-[#a5e3e6]">{item.suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
