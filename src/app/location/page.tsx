import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/shared/ui/Container';

export const metadata: Metadata = {
  title: "การเดินทางและสถานที่เรียน | CodeCamp Thailand",
  description: "เดินทางง่าย 5 นาทีถึงจาก BTS พญาไท อาคารวรรณสรณ์ ชั้น 12A คู่มือการเดินทางและแผนที่สถานที่เรียนจริง",
  openGraph: {
    title: "การเดินทางและสถานที่เรียน | CodeCamp Thailand",
    description: "เดินทางง่าย 5 นาทีถึงจาก BTS พญาไท อาคารวรรณสรณ์ ชั้น 12A คู่มือการเดินทางและแผนที่สถานที่เรียนจริง",
  },
};

export default function LocationPage() {
  const mapSteps = [
    { url: "/location/codecamp-map1.jpg", title: "มาเรียนง่ายกว่าที่คิด", desc: "BTS พญาไท อาคารวรรณสรณ์" },
    { url: "/location/codecamp-map2.jpg", title: "BTS พญาไท ทางออกที่ 4", desc: "ใช้ทางออกที่ 4 ของ BTS พญาไท" },
    { url: "/location/codecamp-map3.jpg", title: "ข้ามทางม้าลาย", desc: "ข้ามถนนพญาไทบริเวณทางม้าลาย" },
    { url: "/location/codecamp-map4.jpg", title: "ถึงอาคารวรรณสรณ์", desc: "ขึ้นลิฟต์มาที่ชั้น 12A" },
    { url: "/location/codecamp-map5.jpg", title: "ชั้น 12A หันขวา", desc: "จะเจอทางเลี้่ยวซ้าย" },
    { url: "/location/codecamp-map6.jpg", title: "เดินทางไปตามทาง", desc: "ห้องเรียนจะอยู่ในสุดฝั่งขวามือ" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with building bg - Light Theme */}
      <section className="relative py-20 md:py-28 border-b border-neutral-100 flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-neutral-50/50 to-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/location/building.png"
            alt="Wannasorn Tower"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
        </div>

        <Container size="6xl" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-bold rounded-full mb-5 tracking-wider uppercase">
              Our Campus
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight leading-tight">
              เดินทางง่าย <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                5 นาทีถึงจาก BTS พญาไท
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              ที่ CodeCamp เราเรียนกันที่ <strong className="text-neutral-900 font-bold">อาคารวรรณสรณ์ (Wannasorn Tower)</strong> จุดแลนด์มาร์กสายติวชื่อดัง ใกล้ BTS พญาไท แค่ไม่กี่ก้าวเท่านั้น!
            </p>
          </div>
        </Container>
      </section>

      {/* Location Details Grid */}
      <section className="py-16 md:py-20 border-b border-neutral-100">
        <Container size="6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 mb-4 tracking-tight">
                  🏢 ชั้น 12A อาคารวรรณสรณ์
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                  แลนด์มาร์กการศึกษาใจกลางเมือง จุดรวมสถาบันกวดวิชาและแหล่งเรียนรู้ที่ทันสมัยที่สุด
                  พรั่งพร้อมด้วยสิ่งอำนวยความสะดวกครบครัน ร้านอาหาร และพื้นที่พักผ่อน
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all group">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3.5 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">สถานที่ตั้ง</h3>
                  <p className="text-neutral-500 font-medium text-sm">อาคารวรรณสรณ์ พญาไท</p>
                </div>

                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-primary/20 transition-all group">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-3.5 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">เวลาเปิดทำการ</h3>
                  <p className="text-neutral-500 font-medium text-sm">09:00 - 17:00 น. (จันทร์ - อาทิตย์)</p>
                </div>
              </div>

              <div className="bg-neutral-900 text-white p-7 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/30 transition-all" />
                <h3 className="text-lg sm:text-xl font-bold mb-2.5 flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  BTS พญาไท แค่ไม่กี่ก้าว
                </h3>
                <p className="text-neutral-300 leading-relaxed text-sm">
                  ลง BTS พญาไท ทางออก 4 แล้วข้ามถนนมาก็ถึงเลย! ใช้เวลาเดินเพียง 5 นาทีจากสถานี
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-950">
                <iframe
                  src="https://www.youtube.com/embed/LcVDjGQ5BAM"
                  className="absolute inset-0 w-full h-full"
                  title="VDO Guide"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Steps Gallery */}
      <section className="bg-neutral-50/70 py-16 md:py-20 border-b border-neutral-100">
        <Container size="6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs rounded-full mb-3">
              Step-by-Step Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-3">
              คู่มือการเดินทาง
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base">
              เดินตามรูปภาพเหล่านี้ รับรองไม่มีหลงครับ!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapSteps.map((step, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-full aspect-square overflow-hidden bg-neutral-100">
                  <img
                    src={step.url}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-black text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Google Map Section */}
      <section className="py-16 md:py-20 border-b border-neutral-100">
        <Container size="6xl">
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] sm:h-[480px] border border-neutral-200">
            <iframe
              src="https://maps.google.com/maps?q=อาคารวรรณสรณ์&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map อาคารวรรณสรณ์"
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container size="6xl">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-2xl p-8 sm:p-12 border border-primary/15 text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-3.5 tracking-tight">
              พร้อมมาเยี่ยมชมสถานที่จริงหรือยัง?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-7 max-w-lg mx-auto leading-relaxed">
              สอบถามรายละเอียดคอร์สเรียน หรือนัดหมายเข้ามาเยี่ยมชมห้องเรียนได้ทาง Inbox เพจ หรือ Line: @221mbxdw
            </p>
            <a
              href="https://page.line.me/221mbxdw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#06C755] hover:bg-[#05b64e] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 10.304c0-5.231-5.385-9.488-12-9.488S0 5.073 0 10.304c0 4.689 4.272 8.599 10.046 9.351.39.085.922.258 1.183.59.27.345.176.883.085 1.231l-.37 2.228c-.114.675-.552 2.642.238 1.444.789-1.198 4.264-5.022 5.819-6.889.117-.142.193-.263.26-.364C21.034 16.96 24 13.91 24 10.304zm-14.489 2.503h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485V11.83h1.415c.267 0 .485.218.485.485v.2c0 .267-.218.291-.485.291zm2.349 0c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485s.485.218.485.485v3.79c0 .267-.218.485-.485.485zm4.832 0h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.214.137-.406.34-.47.202-.065.424-.005.565.148l2.052 2.235V8.532c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485v.379c0 .214-.137.406-.34.47-.202.065-.424.005-.565-.148l-2.052-2.235v1.895c0 .267-.218.485-.485.485zm4.298 0h-2.112c-.267 0-.485-.218-.485-.485V8.532c0-.267.218-.485.485-.485h2.112c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627V9.75h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627v.883h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485z" />
              </svg>
              ติดต่อเราทาง LINE
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
