"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CourseCountdown({
  startDate,
  startMonth,
}: {
  startDate: string;
  startMonth: string;
}) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(startDate));
    const id = setInterval(() => setTime(getTimeLeft(startDate)), 1000);
    return () => clearInterval(id);
  }, [startDate]);

  // ยังไม่ hydrate หรือหมดเวลาแล้ว
  if (!time) return null;
  if (time.total <= 0) {
    return (
      <div className="w-full rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-center">
        <p className="text-sm font-bold text-green-700">🎉 คอร์สเปิดเรียนแล้ว!</p>
      </div>
    );
  }

  const units = [
    { label: "วัน", value: time.days },
    { label: "ชั่วโมง", value: time.hours },
    { label: "นาที", value: time.minutes },
    { label: "วินาที", value: time.seconds },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/60 px-4 py-4">
      <p className="text-center text-xs font-bold text-red-600 mb-3 flex items-center justify-center gap-1">
        <span className="animate-pulse">🔴</span>
        เปิดเรียน {startMonth} — เหลือเวลาสมัคร
      </p>
      <div className="grid grid-cols-4 gap-2">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-full bg-white border border-red-100 rounded-xl py-2 text-center shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-red-600 tabular-nums leading-none">
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-medium mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
