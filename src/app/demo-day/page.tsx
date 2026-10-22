// biome-ignore-all lint: DemoDayPage component
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { TrackedLink } from "@/shared/ui/TrackedLink";
import { DemoDayGallery } from "@/shared/ui/DemoDayGallery";

export const metadata: Metadata = {
  title: "Demo Day & Speed Interview | เจอหน้า สัมภาษณ์สด พบบริษัท Tech ตัวจริง | CodeCamp Thailand",
  description:
    "งาน Demo Day จัดแบบ Offline สด นักเรียนพรีเซนต์ผลงานจริงต่อหน้า Tech Lead และ HR พร้อม Speed Interview สัมภาษณ์ตัวต่อตัว มีโอกาสรับข้อเสนองานและที่ฝึกงานทันที",
  keywords: [
    "Demo Day CodeCamp",
    "Speed Interview โปรแกรมเมอร์",
    "หางาน Developer",
    "สัมภาษณ์งาน Tech",
    "Coding Bootcamp หางาน",
    "จัดหางานโปรแกรมเมอร์",
    "CodeCamp Thailand Demo Day",
    "บริษัทรับโปรแกรมเมอร์",
  ],
  openGraph: {
    title: "Demo Day & Speed Interview | เจอหน้า สัมภาษณ์สด พบบริษัท Tech ตัวจริง | CodeCamp Thailand",
    description:
      "ไม่ใช่แค่ส่งเรซูเม่ทางอีเมล แต่นี่คือเวที Offline Demo Day ที่นักเรียนได้พรีเซนต์ผลงานจริงและสัมภาษณ์สดตัวต่อตัวกับผู้บริหารและ Tech Lead จากบริษัทพาร์ทเนอร์",
    url: "https://getcodecamp.com/demo-day/",
    siteName: "CodeCamp Thailand",
    locale: "th_TH",
    type: "website",
  },
};

const demoDayImages = [
  "/courses/demo-day-1.jpg",
  "/courses/demo-day-2.jpg",
  "/courses/demo-day-3.jpg",
  "/courses/demo-day-4.jpg",
  "/courses/demo-day-5.jpg",
  "/courses/demo-day-6.jpg",
];

const highlights = [
  {
    icon: "🤝",
    title: "จัดแบบ Offline เจอหน้าตัวจริง",
    desc: "ไม่ใช่การสัมภาษณ์ผ่านจอหรือส่งลิงก์ GitHub ลอยๆ แต่นั่งคุย สบตา และสัมผัสทัศนคติ พลังงาน และเคมีในการทำงานร่วมกันได้ทันที",
  },
  {
    icon: "🎤",
    title: "Live Presentation & Tech Defense",
    desc: "นักเรียนได้ขึ้นเวทีพรีเซนต์ระบบที่สร้างจริง พร้อมตอบข้อซักถามทางเทคนิค (Tech Defense) สดๆ ต่อหน้าคณะกรรมการและ Tech Lead จากบริษัทพาร์ทเนอร์",
  },
  {
    icon: "⚡",
    title: "Speed Interview 1-on-1 จบในงาน",
    desc: "รอบสัมภาษณ์เจาะลึกตัวต่อตัวกับแต่ละบริษัท มีเวลาพูดคุย ถามแนวคิด และรับข้อเสนอสัมภาษณ์รอบต่อไปหรือรับเข้าทำงานทันที",
  },
  {
    icon: "🛡️",
    title: "การันตีที่ฝึกงานกับพาร์ทเนอร์",
    desc: "สำหรับผู้เรียนคอร์ส Onsite แม้ยังไม่ได้งานจากวัน Demo Day เรายังมีการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์เพื่อสะสมประสบการณ์แรก",
  },
];

const processSteps = [
  {
    step: "01",
    phase: "Week 12-13",
    title: "Build Production Project",
    desc: "พัฒนาระบบจริงเป็นทีมด้วย Agile/Scrum สแตกครบ Fullstack (React, Node.js, Database, Cloud) เตรียมพร้อมขึ้นเวที",
  },
  {
    step: "02",
    phase: "Week 14",
    title: "Career Prep & Tech Pitch",
    desc: "ซ้อม Pitching ตอบคำถามเทคนิค พร้อมตรวจ Resume และ GitHub Portfolio โดย Mentor ผู้มีประสบการณ์ตรง",
  },
  {
    step: "03",
    phase: "Demo Day",
    title: "Live Pitching On Stage",
    desc: "นำเสนอระบบจริงบนเวที สาธิตการทำงานของโปรเจกต์ อธิบายสถาปัตยกรรมระบบ (Architecture) และฟีเจอร์เด่น",
  },
  {
    step: "04",
    phase: "Speed Interview",
    title: "One-on-One Interview",
    desc: "บริษัทแยกโต๊ะสัมภาษณ์เดี่ยว พูดคุยเจาะลึกทั้ง Culture Fit, ทักษะทางเทคนิค และการรับเข้าทำงานหรือฝึกงาน",
  },
];

const partnerTypes = [
  {
    title: "Software House & Tech Agency",
    desc: "บริษัทพัฒนาซอฟต์แวร์ที่มองหา Developer พร้อมลุยงานจริง เรียนรู้ไว ทำงานเป็นทีมได้อย่างมืออาชีพ",
  },
  {
    title: "Fast-Growing Tech Startups",
    desc: "สตาร์ทอัพที่ต้องการทีมงานรุ่นใหม่ไฟแรง ปรับตัวไว และมีความเข้าใจโครงสร้าง Modern Web Stack อย่างดี",
  },
  {
    title: "Corporate IT & Enterprise",
    desc: "องค์กรชั้นนำที่เปิดรับ Developer สายงานใหม่ เพื่อร่วมเสริมทัพขับเคลื่อนโปรเจกต์ Digital ภายในองค์กร",
  },
  {
    title: "E-Commerce & Digital Business",
    desc: "ธุรกิจออนไลน์ที่ต้องการ Fullstack ดูแลระบบเว็บ เชื่อมต่อระบบชำระเงินและระบบบริหารจัดการหลังบ้าน",
  },
];

const faqs = [
  {
    q: "งาน Demo Day จัดขึ้นเมื่อไหร่และที่ไหน?",
    a: "จัดแบบ Offline สด โดยสถานที่จัดงาน รวมถึงวันและเวลาอย่างเป็นทางการ จะมีการประกาศแจ้งให้ผู้เรียนในแต่ละรุ่นทราบล่วงหน้า",
  },
  {
    q: "ผู้เรียนรอบ Live Streaming สามารถเข้าร่วมงาน Demo Day ได้หรือไม่?",
    a: "สามารถเข้าร่วมได้ครับ! นักเรียนรอบ Live Streaming ที่พัฒนา Individual Final Project ผ่านเกณฑ์ มีสิทธิ์เดินทางมาขึ้นเวทีและร่วม Speed Interview กับบริษัทพาร์ทเนอร์ในวันงานได้เช่นเดียวกัน",
  },
  {
    q: "บริษัทที่มาร่วมงานเป็นใครบ้าง?",
    a: "เป็นเครือข่ายบริษัทพาร์ทเนอร์ของ CodeCamp Thailand ทั้ง Software Houses, Tech Consults, Startups และ Corporate Enterprises โดยผู้มาร่วมงานคือ Tech Lead, Engineering Manager, Founder และทีม HR ที่มีอำนาจตัดสินใจรับเข้าทำงานโดยตรง",
  },
  {
    q: "ถ้ายังไม่ได้งานจากวัน Demo Day จะเป็นอย่างไรต่อ?",
    a: "สำหรับผู้เรียนคอร์ส Onsite เรามีการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์รองรับ เพื่อให้ทุกคนมีบันไดก้าวแรกและมีประสบการณ์ทำงานจริงในสายงาน Tech นอกจากนี้ทีมงานยังมีบริการ Job Matching ช่วยส่งต่อ Resume และแนะนำโอกาสงานให้อย่างต่อเนื่อง",
  },
];

export default function DemoDayPage() {
  notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative py-16 sm:py-24 border-b border-neutral-100 bg-gradient-to-b from-amber-50/40 via-white to-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="6xl" className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-300 text-amber-900 text-xs sm:text-sm font-black rounded-full mb-6 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Offline Demo Day & Speed Interview</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight leading-tight">
              เจอหน้า สัมภาษณ์สด <br />
              <span className="bg-gradient-to-r from-amber-600 via-primary to-accent bg-clip-text text-transparent">
                พบบริษัท Tech ตัวจริง
              </span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium">
              ลืมการส่งเรซูเม่ที่ไร้เสียงตอบรับไปได้เลย ที่ CodeCamp Thailand เราจัดงาน Demo Day แบบ{" "}
              <strong className="text-neutral-900 font-black whitespace-nowrap">Offline สดเจอหน้าจริง</strong>{" "}
              เพื่อให้นักเรียนได้พรีเซนต์ผลงานจริง และสัมภาษณ์ตัวต่อตัวกับ Tech Lead และผู้บริหารที่มีอำนาจตัดสินใจจ้างงานโดยตรง
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-xs border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold">
                <span className="text-emerald-500">✓</span> จัดสดแบบ Offline
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-xs border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold">
                <span className="text-emerald-500">✓</span> Speed Interview ตัวต่อตัว
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-xs border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold">
                <span className="text-emerald-500">✓</span> โอกาสรับ Offer ในวันจบหลักสูตร
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Real Video & Gallery Highlight */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-neutral-50/50">
        <Container size="6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Video Embed */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full text-center mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  วิดีโอบรรยากาศวัน Demo Day จริง
                </span>
              </div>
              <div className="w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black relative">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F952477694424569&show_text=false&t=0"
                  className="w-full h-full border-none"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-neutral-500 text-center mt-3">
                บรรยากาศการพรีเซนต์ผลงานและสัมภาษณ์สดของนักเรียน CodeCamp
              </p>
            </div>

            {/* Right: Why Offline matters */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg uppercase tracking-wider">
                Why Offline Matters
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug">
                ทำไมต้องสัมภาษณ์แบบเจอตัวจริง? <br className="hidden sm:inline" />
                <span className="text-primary block sm:inline mt-1 sm:mt-0">
                  <span className="inline-block">เพราะเคมีและทัศนคติ</span>{" "}
                  <span className="inline-block whitespace-nowrap">สัมผัสได้ด้วยการพบหน้า</span>
                </span>
              </h2>
              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
                การหางาน Tech สำหรับคนเปลี่ยนสาย สิ่งที่ยากที่สุดไม่ใช่แค่เรื่องโค้ด แต่คือการพิสูจน์ว่าคุณมี <strong className="text-neutral-900">ความตั้งใจ ทักษะการสื่อสาร และการทำงานเป็นทีม</strong>
              </p>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                เมื่อบริษัทได้มาเห็นคุณนำเสนอผลงานจริง ตอบข้อซักถามทางเทคนิคแบบสดๆ และได้นั่งคุยกันตัวต่อตัวในรอบ Speed Interview พวกเขาจะเห็นศักยภาพที่แท้จริงของคุณมากกว่าตัวอักษร 1 หน้าในเรซูเม่
              </p>

              {/* Photo Gallery Component */}
              <div className="pt-4">
                <DemoDayGallery images={demoDayImages} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 4 Core Highlights */}
      <section className="py-16 sm:py-24 border-b border-neutral-100 bg-white">
        <Container size="6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 bg-amber-500/10 text-amber-800 font-black text-xs rounded-lg uppercase tracking-wider mb-3 inline-block">
              Key Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              จุดเด่นของงาน Demo Day ที่ CodeCamp
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3">
              ออกแบบขึ้นมาเพื่อสร้างโอกาสเปลี่ยนสายงานที่ดีที่สุดสำหรับผู้เรียนทุกคน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-neutral-50/70 border border-neutral-200/80 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex gap-5 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-neutral-200/60 flex items-center justify-center text-3xl flex-shrink-0">
                  {h.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                    {h.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Journey to Demo Day (Timeline) */}
      <section className="py-16 sm:py-24 border-b border-neutral-100 bg-gradient-to-b from-neutral-50/40 to-white">
        <Container size="6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 bg-primary/10 text-primary font-black text-xs rounded-lg uppercase tracking-wider mb-3 inline-block">
              Roadmap to Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              เส้นทางเตรียมตัวสู่เวที Demo Day
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3">
              เราไม่ได้ปล่อยให้คุณเตรียมตัวเพียงลำพัง ทุกขั้นตอนมีเมนเทอร์ดูแลอย่างเป็นระบบ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-primary/30">{s.step}</span>
                    <span className="text-xs font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                      {s.phase}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed [text-wrap:balance]">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Company Partner Types */}
      <section className="py-16 sm:py-20 border-b border-neutral-100 bg-white">
        <Container size="6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-lg uppercase tracking-wider mb-3 inline-block">
              Partner Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              ประเภทบริษัทพาร์ทเนอร์ที่มาร่วมงาน
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3">
              หลากหลายกลุ่มธุรกิจ Tech ที่เปิดรับและให้โอกาสนักพัฒนาจาก CodeCamp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map((pt, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-base">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-neutral-900">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed [text-wrap:balance]">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Callout for Companies */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-bold text-xs rounded-full inline-block">
                สำหรับบริษัท & ฝ่ายสรรหาบุคลากร (HR / Tech Leads)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                สนใจเข้าร่วมงาน Demo Day เพื่อเฟ้นหา Developer เข้าสู่ทีม?
              </h3>
              <p className="text-sm text-neutral-400 max-w-2xl [text-wrap:balance]">
                ร่วมเป็นพันธมิตรกับ CodeCamp Thailand เพื่อพบผู้เรียนที่มีความพร้อม ลงมือทำจริง และผ่านการคัดสรรโดยไม่มีค่าใช้จ่าย
              </p>
            </div>
            <TrackedLink
              href="https://page.line.me/221mbxdw"
              target="_blank"
              rel="noopener noreferrer"
              eventName="Contact"
              eventParams={{
                content_name: "Demo Day Partner Join CTA",
                content_category: "Corporate Partner",
              }}
              umamiEvent="contact-click: demoday-partner"
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm whitespace-nowrap shadow-md transition-all flex-shrink-0"
            >
              ติดต่อร่วมงาน Demo Day
            </TrackedLink>
          </div>
        </Container>
      </section>

      {/* 6. FAQs Section */}
      <section className="py-16 sm:py-24 border-b border-neutral-100 bg-neutral-50/40">
        <Container size="6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 bg-neutral-200/80 text-neutral-800 font-black text-xs rounded-lg uppercase tracking-wider mb-3 inline-block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              คำถามที่พบบ่อยเกี่ยวกับ Demo Day
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2"
              >
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-start gap-2">
                  <span className="text-primary font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pl-6 [text-wrap:balance]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary via-primary-dark to-[#003847] text-white">
        <Container size="6xl">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/20">
              Start Your Tech Career
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              พร้อมก้าวขึ้นเวที Demo Day <br />
              และเริ่มต้นงาน Developer แรกของคุณแล้วหรือยัง?
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              สมัครเรียน Fullstack Bootcamp กับ CodeCamp Thailand วันนี้ รับการดูแลตั้งแต่พื้นฐานศูนย์ ติวเข้มโปรเจกต์ จนถึงวันสัมภาษณ์งานจริง
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/courses/offline-fullstack-weekday"
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all text-center"
              >
                ดูรายละเอียดคอร์ส Onsite (รุ่นถัดไป)
              </Link>
              <TrackedLink
                href="https://page.line.me/221mbxdw"
                target="_blank"
                rel="noopener noreferrer"
                eventName="Contact"
                eventParams={{
                  content_name: "Demo Day Bottom Line CTA",
                  content_category: "Course Inquiry",
                }}
                umamiEvent="contact-click: demoday-bottom-line"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold rounded-2xl transition-all text-center"
              >
                ปรึกษาการเปลี่ยนสายงานผ่าน LINE
              </TrackedLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
