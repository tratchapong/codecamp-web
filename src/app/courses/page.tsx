// biome-ignore-all lint: Suppressing existing linter warnings in this file
import type { Metadata } from "next";
import Link from "next/link";
import courses from "@/data/courses.json";
import { ShowcaseSection } from "@/shared/ui/ShowcaseSection";
import { UrgencyDateBadge } from "@/shared/ui/UrgencyDateBadge";
import { CourseComparisonSection } from "@/shared/ui/CourseComparisonSection";

export const metadata: Metadata = {
  title: "คอร์สเรียน & Coding Bootcamp ทั้งหมด | CodeCamp Thailand",
  description:
    "เลือกคอร์สเรียนและ Coding Bootcamp ที่เหมาะกับเป้าหมายของคุณ ไม่ว่าจะเป็นการเปลี่ยนสายงาน หรือการเพิ่มทักษะใหม่",
  keywords: [
    "คอร์สเรียนโปรแกรมเมอร์",
    "Coding Bootcamp",
    "Bootcamp สอนเขียนโปรแกรม",
    "Fullstack Bootcamp",
    "เรียน Fullstack",
    "CodeCamp Thailand",
  ],
  openGraph: {
    title: "คอร์สเรียน & Coding Bootcamp ทั้งหมด | CodeCamp Thailand",
    description:
      "เลือกคอร์สเรียนและ Coding Bootcamp ที่เหมาะกับเป้าหมายของคุณ ไม่ว่าจะเป็นการเปลี่ยนสายงาน หรือการเพิ่มทักษะใหม่",
  },
};

export default function Home() {
  const activeCourses = courses
    .filter((course) => !(course as any).hidden)
    .sort((a, b) => {
      const aClosed = (a as any).isClosed ? 1 : 0;
      const bClosed = (b as any).isClosed ? 1 : 0;
      return aClosed - bClosed;
    });

  const gridContainerClass =
    activeCourses.length === 1
      ? "grid grid-cols-1 max-w-md mx-auto gap-8"
      : activeCourses.length === 2
        ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-8";

  return (
    <div className="space-y-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 py-4 leading-normal bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
          คอร์สเรียน & Coding Bootcamp
        </h1>
        <p className="text-neutral-600 text-lg max-w-3xl mx-auto mb-6">
          เลือกคอร์สเรียนและ Bootcamp ที่เหมาะกับเป้าหมายของคุณ ไม่ว่าจะเป็นการเปลี่ยนสายงาน หรือการเพิ่มทักษะใหม่
        </p>
        {/* ปุ่มลิงก์ตารางเปรียบเทียบ - ซ่อนไว้ชั่วคราว */}
        {/* <a
          href="#compare-courses"
          className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-extrabold text-sm sm:text-base border-2 border-neutral-200/90 hover:border-primary shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 text-left"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors text-lg flex-shrink-0">
            📊
          </span>
          <div>
            <div className="text-[11px] text-neutral-400 font-bold tracking-wide">
              เลือกไม่ถูกว่าเหมาะกับแบบไหน?
            </div>
            <div className="text-neutral-900 group-hover:text-primary transition-colors flex items-center gap-1.5 font-black text-sm sm:text-base">
              <span>กดดูตารางเปรียบเทียบ 3 รูปแบบหลักสูตร</span>
              <span className="inline-block transition-transform group-hover:translate-y-1 text-primary font-black">↓</span>
            </div>
          </div>
        </a> */}
      </div>

      <div className={gridContainerClass}>
        {activeCourses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}/`}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col border border-neutral-100 relative"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  (course as any).isClosed
                    ? "saturate-[0.65] opacity-80 group-hover:scale-105"
                    : "group-hover:scale-110"
                }`}
              />
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {course.type}
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              {(course as any).isClosed ? (
                <div className="flex flex-col mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-neutral-700 text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
                      🔒 ปิดรับสมัครแล้ว
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    *สามารถสอบถามข้อมูลรายละเอียดเพิ่มเติมได้ทาง LINE
                  </span>
                </div>
              ) : course.startMonth ? (
                <div className="flex flex-col mb-3">
                  <div className="flex flex-wrap gap-2">
                    {(course as any).startDate ? (
                      <UrgencyDateBadge
                        startDate={(course as any).startDate}
                        startMonth={course.startMonth}
                      />
                    ) : (
                      <span className="bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
                        เริ่มเรียน {course.startMonth}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    *อาจมีการปรับเปลี่ยนเพื่อประโยชน์ของผู้เรียน
                  </span>
                </div>
              ) : (
                <div className="flex flex-col mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary text-white text-xs font-extrabold px-3 py-1 rounded-lg tracking-wide shadow-sm">
                      เรียนได้ทันที (Self-paced)
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    *สมัครและเข้าเรียนออนไลน์ได้ทันที
                  </span>
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
              </div>

              <p className="text-neutral-600 text-sm mb-4">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4 font-medium">
                <span>⏳ ระยะเวลาเรียน: {course.duration}</span>
              </div>

              {/* Tags */}
              {course.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Price & Scarcity section at the bottom of card body */}
              <div className="mt-auto pt-4 border-t border-neutral-50 flex flex-col gap-1">
                <span className="text-[11px] text-neutral-400 font-medium">
                  ราคาคอร์สเรียน
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    {(course as any).isClosed ? (
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs text-neutral-400 font-semibold">ราคาปกติ</span>
                        <span className="text-2xl font-black text-neutral-500 italic leading-tight">
                          ฿{(course.originalPrice || course.price).toLocaleString("en-US")}
                        </span>
                      </div>
                    ) : (course as any).depositAmount ? (
                      <div className="space-y-1 py-1">
                        {/* แถวที่ 1: จอง */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-extrabold tracking-wide">
                            จองสิทธิ์เริ่มต้น
                          </span>
                          <span className="text-2xl font-black text-primary italic leading-none">
                            ฿{(course as any).depositAmount.toLocaleString()}
                          </span>
                        </div>
                        {/* แถวที่ 2: ราคารวม */}
                        <div className="text-sm font-bold text-neutral-700 mt-1 flex items-baseline gap-2 flex-wrap">
                          <span>ราคารวม <span className="text-neutral-900 font-extrabold">฿{course.price.toLocaleString()}</span></span>
                          {course.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through font-semibold">
                              ปกติ ฿{course.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-primary italic leading-tight">
                          ฿{course.price.toLocaleString("en-US")}
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ปกติ ฿{course.originalPrice.toLocaleString("en-US")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!(course as any).isClosed && (course as any).lastChanceNote && (
                  <div className="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
                    <span className="animate-pulse">🔥</span>
                    {(course as any).lastChanceNote}
                  </div>
                )}
                {!(course as any).isClosed && (course as any).upgradePromo && (
                  <div className="text-[10px] text-primary font-bold flex items-center gap-1 mt-1 bg-primary/5 px-2 py-1 rounded-md">
                    <span>✨</span>
                    <span>{(course as any).upgradePromo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Full-width CTA Bar */}
            <div className="bg-neutral-50 group-hover:bg-primary text-neutral-700 group-hover:text-white py-4 text-center text-sm font-bold transition-all border-t border-neutral-100/50 flex items-center justify-center gap-2">
              <span>รายละเอียดคอร์ส</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Why Choose CodeCamp Section */}
      <div className="mt-32 pt-16 border-t border-neutral-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ทำไมต้องเรียนที่ CodeCamp?
          </h2>
          <p className="text-neutral-600">
            สัมผัสประสบการณ์การเรียนรู้ที่แตกต่าง เพื่อก้าวสู่สายงาน Tech อย่างมั่นใจ
          </p>
        </div>

        {/* Statistics Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl text-center border border-primary/10">
            <div className="text-4xl font-black text-primary mb-2">5+ ปี</div>
            <div className="text-neutral-600 font-medium">ประสบการณ์การสอน</div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl text-center border border-primary/10">
            <div className="text-4xl font-black text-primary mb-2">22 รุ่น</div>
            <div className="text-neutral-600 font-medium">ที่จบการศึกษาไปแล้ว</div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-3xl text-center border border-primary/10">
            <div className="text-4xl font-black text-primary mb-2">900+ คน</div>
            <div className="text-neutral-600 font-medium">จำนวนผู้เรียนทั้งหมด</div>
          </div>
        </div>

        {/* 4 Key Points from FB Post */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              title: "Official Standard",
              desc: "หลักสูตร STEM เลขที่ TPC690045 รับรองโดย สอวช. มั่นใจในคุณภาพเนื้อหา",
              icon: "✅",
            },
            {
              title: "All-in Intensity",
              desc: "เรียนสด 3.5 เดือน พัฒนาทักษะแบบก้าวกระโดด เห็นผลเร็วที่สุด",
              icon: "⚡",
            },
            {
              title: "AI-Ready Dev",
              desc: "สอนพื้นฐานให้เข้าใจจริง เพื่อให้คุณคุม AI ได้แม่นยำ ไม่ต้องเดาสุ่ม",
              icon: "🤖",
            },
            {
              title: "Safe Environment",
              desc: "สภาพแวดล้อมที่ปลอดภัยที่สุดสำหรับการเริ่มจากศูนย์ มี Mentor และ TA ดูแลใกล้ชิด",
              icon: "🛡️",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>
                <h4 className="font-bold text-neutral-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Convenience Section */}
        <div className="mt-20 bg-neutral-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 py-4 leading-normal italic bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                สะดวก ยืดหยุ่น และเข้าถึงได้ง่าย
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                    ✓
                  </div>
                  <span>เดินทางง่าย ติด BTS พญาไท (ตึกวรรณสรณ์)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                    ✓
                  </div>
                  <span>เรียนสดที่สถาบัน หรือ Streaming จากที่บ้านก็ได้</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                    ✓
                  </div>
                  <span>ดูบันทึกย้อนหลังได้ตลอดหลักสูตร</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                    ✓
                  </div>
                  <span>ผ่อนชำระสบายๆ สูงสุด 10 เดือน</span>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-video bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/courses/programming_workspace.png')] opacity-50 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 text-center p-6">
                  <div className="text-2xl font-black text-white">
                    เริ่มต้นเส้นทาง Tech ของคุณ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Matrix Comparison Table - ซ่อนไว้ชั่วคราว */}
      {/* <CourseComparisonSection /> */}

      {/* Student Showcase Preview */}
      <ShowcaseSection />
    </div>
  );
}
