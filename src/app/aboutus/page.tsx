import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/shared/ui/Container';

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | CodeCamp Thailand",
  description: "บ้านหลังแรกของคนเริ่มจากศูนย์ เราเชื่อว่า 'คนธรรมดา' ก็เป็นโปรแกรมเมอร์ที่เก่งได้",
  openGraph: {
    title: "เกี่ยวกับเรา | CodeCamp Thailand",
    description: "บ้านหลังแรกของคนเริ่มจากศูนย์ เราเชื่อว่า 'คนธรรมดา' ก็เป็นโปรแกรมเมอร์ที่เก่งได้",
  },
};

export default function AboutUsPage() {
  const stats = [
    { label: "ปีแห่งประสบการณ์", value: "5+", icon: "⏳" },
    { label: "รุ่นที่เปิดสอน", value: "22+", icon: "🎓" },
    { label: "จำนวนผู้เรียน", value: "900+", icon: "👥" },
    { label: "โปรเจกต์ที่ถูกสร้าง", value: "1,500+", icon: "🚀" },
  ];

  const pillars = [
    {
      title: "Safe Environment",
      desc: "พื้นที่ที่ปลอดภัยที่สุดสำหรับการเริ่มต้น ไม่ต้องกลัวที่จะถาม ไม่ต้องกลัวที่จะผิดพลาด มีอาจารย์และผู้ช่วยสอนคอยประกบดูแลอย่างอบอุ่น",
      icon: "🛡️"
    },
    {
      title: "Solid Foundation",
      desc: "ปูพื้นฐานให้แน่นตั้งแต่ศูนย์อย่างเป็นระบบ เข้าใจทั้ง Frontend, Backend และ Database เพื่อให้ต่อยอดเทคโนโลยีใหม่ๆ ได้ด้วยตัวเองอย่างมั่นใจ",
      icon: "🏗️"
    },
    {
      title: "Hands-on Projects",
      desc: "เรียนรู้ผ่านการลงมือทำจริง ทั้งโปรเจกต์เดี่ยวและโปรเจกต์กลุ่มแบบทีม Dev เพื่อสร้างพอร์ตโฟลิโอและ GitHub ผลงานพร้อมยื่นสมัครงาน",
      icon: "💻"
    },
    {
      title: "AI-Ready Curriculum",
      desc: "หลักสูตรอัปเดตตลอดเวลา สอนประยุกต์ใช้ AI Coding Tools เพื่อให้คุณทำงานจริงในบริษัทเทคยุคใหม่ได้อย่างมีประสิทธิภาพและรวดเร็วกว่า",
      icon: "🤖"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Light & Clean */}
      <section className="relative py-20 md:py-28 border-b border-neutral-100 flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-50/60 via-white to-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/home/hero-banner.jpg"
            alt="CodeCamp Atmosphere"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
        </div>

        <Container size="6xl" className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-bold rounded-full mb-5 tracking-wider uppercase">
              About CodeCamp Thailand
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight leading-tight">
              บ้านหลังแรก <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ของคนเริ่มจากศูนย์
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              เราเชื่อมั่นว่า <strong className="text-neutral-900 font-bold">"คนธรรมดา" ก็เป็นโปรแกรมเมอร์ที่เก่งได้</strong> ที่นี่คือจุดเริ่มต้นที่ปลอดภัยที่สุดสำหรับทุกคนที่ฝันอยากเปลี่ยนสายสู่งานเทคโนโลยี
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 border-b border-neutral-100">
        <Container size="6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3.5 py-1 bg-accent/10 text-accent font-bold uppercase tracking-wider text-xs rounded-full">
                Our Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug">
                ทำไมต้องเริ่มต้นที่ <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CodeCamp?</span>
              </h2>
              <div className="space-y-4 text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  ตลอดระยะเวลา 5 ปีและ 22 รุ่นที่ผ่านมา เราได้พิสูจน์แล้วว่าการเรียนเขียนโปรแกรมไม่ได้จำกัดอยู่แค่คนที่มีพื้นฐานด้านคอมพิวเตอร์เท่านั้น
                </p>
                <p>
                  เราตั้งใจสร้างสภาพแวดล้อมการเรียนรู้ที่ทั้ง <strong className="text-neutral-900 font-bold">"ปลอดภัย ไม่ตัดสิน และพร้อมเกื้อหนุน"</strong> เพื่อลดช่องว่างระหว่างความฝันและความเป็นจริงของผู้ที่ต้องการย้ายสายงาน
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 text-center hover:border-primary/20 hover:bg-white hover:shadow-md transition-all">
                    <div className="text-2xl mb-1.5">{stat.icon}</div>
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 mb-0.5">{stat.value}</div>
                    <div className="text-xs text-neutral-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-neutral-200/80 aspect-4/3 bg-neutral-100">
                <img
                  src="/home/atmosphere-1.jpg"
                  alt="Students learning together at CodeCamp"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Video & Atmosphere Section - Light theme */}
      <section className="py-16 md:py-24 border-b border-neutral-100 bg-neutral-50/60">
        <Container size="6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary font-bold tracking-wider uppercase text-xs rounded-full">
                Experience the Vibe
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug">
                สัมผัสบรรยากาศ <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ความเป็นกันเองและสังคมที่ไม่ทิ้งกัน
                </span>
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal">
                การเรียนที่ CodeCamp ไม่ใช่แค่การนั่งจดจ่ออยู่กับหน้าจอคนเดียว แต่คือการแลกเปลี่ยนไอเดีย การช่วยเหลือซัพพอร์ตกัน และการสร้างมิตรภาพของเพื่อนร่วมรุ่นที่จะอยู่กับคุณไปตลอดเส้นทางอาชีพ Developer
              </p>
              <div>
                <a
                  href="https://page.line.me/221mbxdw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#06C755] hover:bg-[#05b64e] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 10.304c0-5.231-5.385-9.488-12-9.488S0 5.073 0 10.304c0 4.689 4.272 8.599 10.046 9.351.39.085.922.258 1.183.59.27.345.176.883.085 1.231l-.37 2.228c-.114.675-.552 2.642.238 1.444.789-1.198 4.264-5.022 5.819-6.889.117-.142.193-.263.26-.364C21.034 16.96 24 13.91 24 10.304zm-14.489 2.503h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485V11.83h1.415c.267 0 .485.218.485.485v.2c0 .267-.218.291-.485.291zm2.349 0c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485s.485.218.485.485v3.79c0 .267-.218.485-.485.485zm4.832 0h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.214.137-.406.34-.47.202-.065.424-.005.565.148l2.052 2.235V8.532c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485v.379c0 .214-.137.406-.34.47-.202.065-.424.005-.565-.148l-2.052-2.235v1.895c0 .267-.218.485-.485.485zm4.298 0h-2.112c-.267 0-.485-.218-.485-.485V8.532c0-.267.218-.485.485-.485h2.112c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627V9.75h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627v.883h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485z" />
                  </svg>
                  นัดปรึกษาการเรียนผ่าน LINE
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-950">
                <iframe
                  src="https://www.youtube.com/embed/vNkRyqSutFQ"
                  className="absolute inset-0 w-full h-full"
                  title="CodeCamp Vibe"
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

      {/* Core Pillars */}
      <section className="py-16 md:py-24 border-b border-neutral-100">
        <Container size="6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary font-bold uppercase tracking-wider text-xs rounded-full mb-3">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mb-3">
              รากฐานสำคัญของเรา
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base">
              ทุกรายละเอียดในหลักสูตรและวิธีการสอน ถูกออกแบบมาเพื่อความสำเร็จของผู้เรียนเป็นหัวใจสำคัญ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-xs border border-neutral-100 mb-5 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Footer */}
      <section className="py-16 md:py-20">
        <Container size="6xl">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-3xl p-10 sm:p-14 border border-primary/15 text-center shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 mb-4 tracking-tight">
              พร้อมเริ่มต้นก้าวแรกหรือยัง?
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-8 max-w-xl mx-auto leading-relaxed">
              มาร่วมเป็นส่วนหนึ่งของครอบครัว Developer ที่พร้อมซัพพอร์ตและผลักดันให้คุณก้าวสู่ความสำเร็จในสายงาน Tech ผ่านสังคมแห่งการแบ่งปันที่ไม่ทิ้งกัน
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses/"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 text-center"
              >
                ดูคอร์สเรียนทั้งหมด
              </Link>
              <a
                href="https://page.line.me/221mbxdw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-bold text-base rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 text-center"
              >
                สอบถามรายละเอียด
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
