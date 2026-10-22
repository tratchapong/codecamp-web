"use client";

import { useEffect, useState } from "react";

export function UrgencyDateBadge({
  startDate,
  startMonth,
}: {
  startDate: string;
  startMonth: string;
}) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(startDate).getTime() - Date.now();
      setDaysLeft(diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [startDate]);

  // ยังไม่ hydrate — แสดง badge ปกติก่อน
  if (daysLeft === null) {
    return (
      <span className="bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
        เริ่มเรียน {startMonth}
      </span>
    );
  }

  if (daysLeft <= 0) {
    return (
      <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
        🎉 เปิดเรียนแล้ว!
      </span>
    );
  }

  if (daysLeft <= 14) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm animate-pulse">
        🔴 เปิดเรียน {startMonth} — เหลือ {daysLeft} วัน!
      </span>
    );
  }

  return (
    <span className="bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
      เริ่มเรียน {startMonth}
    </span>
  );
}
