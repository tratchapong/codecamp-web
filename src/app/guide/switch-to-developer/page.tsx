import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { LineCTA } from "@/shared/ui/LineCTA";
import { TrackedLink } from "@/shared/ui/TrackedLink";
import { VideoCarousel } from "@/shared/ui/VideoCarousel";
import coursesData from "@/data/courses.json";

export const metadata: Metadata = {
  title: "คู่มือเปลี่ยนสายงานสู่ Developer ปี 2026: เริ่มจากศูนย์ยังไงให้ได้งานจริง | CodeCamp Thailand",
  description:
    "เจาะลึกเส้นทางคนอยากเปลี่ยนสายมาเป็น Programmer หรือ Web Developer อายุเยอะ จบไม่ตรงสาย ไม่มีพื้นฐาน เริ่มยังไงให้ได้งานจริง พร้อมการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์",
  keywords: [
    "เปลี่ยนสายงาน",
    "เปลี่ยนสายเป็นโปรแกรมเมอร์",
    "Coding Bootcamp",
    "Bootcamp สอนเขียนโปรแกรม",
    "เรียนเขียนโปรแกรมหางาน",
    "เปลี่ยนสายงาน developer",
    "Fullstack Bootcamp",
    "อายุ 30 เปลี่ยนสายงาน",
    "ไม่มีพื้นฐานเป็นโปรแกรมเมอร์",
    "คอร์ส Fullstack หางาน",
    "การันตีที่ฝึกงาน",
    "CodeCamp Thailand",
    "หางานไอที",
  ],
  openGraph: {
    title: "คู่มือเปลี่ยนสายงานสู่ Developer ปี 2026: เริ่มจากศูนย์ยังไงให้ได้งานจริง",
    description:
      "เจาะลึกเส้นทางคนอยากเปลี่ยนสายมาเป็น Programmer เริ่มจากศูนย์ยังไงให้ได้งานจริง ฉบับคนทำงานประจำและไม่มีพื้นฐาน พร้อมการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์",
    url: "https://getcodecamp.com/guide/switch-to-developer/",
    siteName: "CodeCamp Thailand",
    locale: "th_TH",
    type: "article",
  },
};

export default function SwitchToDeveloperGuidePage() {
  // วิดีโอรีวิวผู้เรียนที่ได้งานจริง (คลิปใหม่ + คลิป 1 และ 3 เดิม)
  const reviewVideos = [
    "https://www.facebook.com/reel/1628236022159026",
    "https://www.facebook.com/reel/27877997678485930",
    "https://www.facebook.com/reel/1233200848896697",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "คู่มือเปลี่ยนสายงานสู่ Developer ปี 2026: เริ่มต้นจากศูนย์ยังไงให้ได้งานจริง",
    description:
      "เจาะลึกเส้นทางคนอยากเปลี่ยนสายมาเป็น Programmer หรือ Web Developer อายุเยอะ จบไม่ตรงสาย ไม่มีพื้นฐาน เริ่มยังไงให้ได้งานจริง พร้อมการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์",
    author: {
      "@type": "Organization",
      name: "CodeCamp Thailand",
      url: "https://getcodecamp.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CodeCamp Thailand",
      logo: {
        "@type": "ImageObject",
        url: "https://getcodecamp.com/icon/codecamp@300.jpg",
      },
    },
    datePublished: "2026-01-15T08:00:00+07:00",
    dateModified: "2026-09-11T10:00:00+07:00",
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Article Header */}
      <header className="bg-white border-b border-neutral-100 py-12 md:py-16">
        <Container size="6xl" className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary uppercase tracking-wider">
              <span>🚀</span>
              <span>Career Transition Guide</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-[1.2] mb-6">
            คู่มือเปลี่ยนสายงานสู่ Developer ปี 2026: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent italic">
              เริ่มต้นจากศูนย์ยังไงให้ “ได้งานจริง”
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
            “อายุ 30+ แล้วจะเริ่มทันไหม? จบไม่ตรงสายจะสู้เด็กจบใหม่ได้หรือเปล่า? แล้วเรียนจบจะเริ่มต้นหาประสบการณ์แรกจากที่ไหน?”
            ถอดบทเรียนและ Roadmap สู่สาย Tech สำหรับคนทำงานประจำและผู้เริ่มต้นแบบไม่มีพื้นฐาน
          </p>

          <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-neutral-100">
            <img
              src="/icon/codecamp@300.jpg"
              alt="CodeCamp Thailand"
              className="w-11 h-11 rounded-full border border-neutral-200 object-cover"
            />
            <div>
              <div className="text-sm font-extrabold text-neutral-900">
                ทีมวิชาการ & โค้ชแนะแนวอาชีพ CodeCamp Thailand
              </div>
              <div className="text-xs text-neutral-500 font-medium">
                ร่วมสร้าง Developer รุ่นใหม่มาแล้วกว่า 22 รุ่น (900+ คน)
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Body */}
      <main className="py-12">
        <Container size="6xl" className="max-w-4xl space-y-12">
          {/* Quick Takeaways Box */}
          <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border-2 border-amber-200/80 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800 text-sm font-black uppercase tracking-wider mb-3">
              <span>⚡</span>
              <span>สรุป 3 ประเด็นสำคัญในบทความนี้:</span>
            </div>
            <ul className="space-y-2.5 text-sm md:text-base text-neutral-800 font-medium leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">1.</span>
                <span><strong>ตลาด Tech ยังเปิดรับคนเปลี่ยนสาย</strong> บริษัทส่วนใหญ่ไม่ได้ดูวุฒิปริญญา แต่ดูว่า “ทำโปรเจกต์จริงเป็นไหม” และ “เขียนโค้ดแก้ปัญหาได้หรือไม่”</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">2.</span>
                <span><strong>กับดักที่คนเรียนเองยอมแพ้</strong> ไม่ใช่เพราะเขียนโค้ดไม่เป็น แต่เพราะติดหล่ม Tutorial Hell ขาดคนตรวจโค้ด และไม่เคยทำงานจำลองทีมจริง</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">3.</span>
                <span><strong>ทางลัดแก้ปัญหาเรื่องประสบการณ์</strong> การันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์จริง คือจุดเปลี่ยนสำคัญที่ทำให้การสมัครงานครั้งต่อไปผ่านฉลุย</span>
              </li>
            </ul>
          </div>

          {/* Section 1: The Reality Check */}
          <section className="space-y-5 text-neutral-700 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-base flex items-center justify-center font-black">01</span>
              <span>ความจริงปี 2026: คนเปลี่ยนสายยังเป็นที่ต้องการอยู่ไหม?</span>
            </h2>
            <p className="text-base sm:text-lg">
              หลายคนมักมีความกังวลเมื่อได้ยินข่าวว่า AI เริ่มเขียนโค้ดได้ หรือเศรษฐกิจชะลอตัว จนเกิดคำถามว่า <em>“ตอนนี้ถ้าจะเปลี่ยนสายมาเป็นโปรแกรมเมอร์ ยังทันอยู่ไหม?”</em>
            </p>
            <p className="text-base sm:text-lg">
              คำตอบจากผู้บริหาร Tech Lead และ HR ในเครือข่ายพาร์ทเนอร์ของ CodeCamp สรุปตรงกันว่า: 
              <strong> ตลาดยังขาดแคลน Developer ที่ ‘ทำงานเป็น’ อยู่เสมอ</strong> สิ่งที่ AI เข้ามาเปลี่ยน ไม่ใช่การแย่งงาน Developer แต่เป็นการคัดกรองคนที่เขียนโค้ดแค่ตามตำราออกไป เหลือเฉพาะคนที่เข้าใจ Logic, ร่วมงานกับ AI เป็น, และสามารถสร้างงานที่ใช้งานได้จริง (Working Software) ครบวงจร
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center">
                <div className="text-3xl font-black text-primary mb-1">30,000+</div>
                <div className="text-xs font-extrabold text-neutral-800">ฐานเงินเดือนเริ่มต้นเฉลี่ย</div>
                <div className="text-[11px] text-neutral-500 mt-1">Junior Fullstack Dev ในไทย</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center">
                <div className="text-3xl font-black text-emerald-600 mb-1">70%</div>
                <div className="text-xs font-extrabold text-neutral-800">ผู้เรียนจบไม่ตรงสาย</div>
                <div className="text-[11px] text-neutral-500 mt-1">เช่น บัญชี มนุษยศาสตร์ วิศวะอื่น</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center">
                <div className="text-3xl font-black text-accent mb-1">3.5 เดือน</div>
                <div className="text-xs font-extrabold text-neutral-800">ระยะเวลา Bootcamp</div>
                <div className="text-[11px] text-neutral-500 mt-1">ที่พาคนเปลี่ยนสายสำเร็จ</div>
              </div>
            </div>
          </section>

          {/* Section 2: Why Self-learning fails */}
          <section className="space-y-5 text-neutral-700 leading-relaxed pt-6 border-t border-neutral-200/80">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-red-100 text-red-600 text-base flex items-center justify-center font-black">02</span>
              <span>ทำไมกว่า 90% ของคนที่ “เรียนเองคนเดียว” ถึงถอดใจกลางคัน?</span>
            </h2>
            <p className="text-base sm:text-lg">
              ทุกวันนี้คลิปสอนเขียนโค้ดฟรีบน YouTube และคอร์สออนไลน์ราคาหลักร้อยมีอยู่เต็มไปหมด แต่ทำไมคนที่สามารถเปลี่ยนสายงานสำเร็จจากคอร์สเหล่านั้นกลับมีน้อยมาก?
            </p>

            <div className="space-y-3.5 mt-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex items-start gap-3.5">
                <span className="text-xl flex-shrink-0">🕳️</span>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">ติดหล่ม Tutorial Hell (ทำตามได้ แต่คิดเองไม่เป็น)</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    เวลาดูคลิปแล้วพิมพ์ตามรู้สึกเข้าใจทุกอย่าง แต่พอเปิดหน้าจอว่างๆ ให้เริ่มเขียนเอง กลับไม่รู้จะเริ่มตรงไหน เพราะขาดการฝึกคิด Logic และ Problem Solving ด้วยตนเอง
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex items-start gap-3.5">
                <span className="text-xl flex-shrink-0">🐛</span>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">ติด Bug ข้อเดียว จมอยู่ 3 วัน ไม่มีใครช่วยตรวจ</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    การเรียนเขียนโค้ดจะมีจุดที่ติดขัดเสมอ การไม่มี Mentors คอยแนะแนวทางแก้ ทำให้เสียเวลาและบั่นทอนกำลังใจจนยอมแพ้ไปในที่สุด
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex items-start gap-3.5">
                <span className="text-xl flex-shrink-0">👥</span>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900">ไม่เคยทำงานเป็นทีม (Group Project / Git Collaboration)</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    ในการทำงานจริง ไม่มี Developer คนไหนเขียนโค้ดคนเดียวทั้งระบบ บริษัทมองหาคนที่ใช้ Git แตก Branch แก้ไขข้อขัดแย้ง และสื่อสารร่วมกับทีมได้ ซึ่งเป็นทักษะที่หาไม่ได้จากการเรียนคนเดียว
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The 4-Step Blueprint */}
          <section className="space-y-6 pt-6 border-t border-neutral-200/80">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary text-base flex items-center justify-center font-black">03</span>
                <span>สูตรลัด 4 สเต็ป จากศูนย์สู่ Developer มืออาชีพ</span>
              </h2>
              <p className="text-neutral-600 mt-2 text-base sm:text-lg">
                โครงสร้างเส้นทางที่พิสูจน์แล้วว่าช่วยให้ผู้เริ่มต้นเปลี่ยนสายงานได้จริงภายใน 3.5 เดือน:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">01</span>
                  <span className="text-xs font-bold text-neutral-400">Foundation</span>
                </div>
                <h3 className="text-base font-black text-neutral-900">เรียน Fullstack เข้มข้น</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  ปูพื้นฐานตั้งแต่ HTML, CSS, JavaScript, React, Node.js, Express, SQL/NoSQL และ AI Tools เพื่อการเขียนโค้ดอย่างมีประสิทธิภาพ
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">02</span>
                  <span className="text-xs font-bold text-neutral-400">Real Project</span>
                </div>
                <h3 className="text-base font-black text-neutral-900">สร้าง Project จริง & ทำงานเป็นทีม</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  ลงมือทำ Web Application ที่ทำงานได้จริงครบวงจร (Fakebook Clone และ Group Project) ฝึกจำลองการทำงานจริงในทีม Tech เพื่อใส่ Portfolio ยื่นสมัครงาน
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">03</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Career Ready</span>
                  </div>
                  <h3 className="text-base font-black text-neutral-900">Career Prep & เชื่อมต่อบริษัท</h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    ตรวจ Resume เจาะลึก, จำลองการสัมภาษณ์งาน Tech แบบเข้มข้น, พร้อมการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์เพื่อสะสมประสบการณ์ทำงานจริงทันที
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">04</span>
                  <span className="text-xs font-bold text-neutral-400">Job Matching</span>
                </div>
                <h3 className="text-base font-black text-neutral-900">สมัครงาน & ผลักดันต่อเนื่อง</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  ทีมงานช่วยส่งต่อ CV ไปยังเครือข่ายบริษัทพาร์ทเนอร์ พร้อมคำแนะนำเชิงกลยุทธ์จนกว่าคุณจะได้เริ่มต้นทำงานในสายงานใหม่
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Big Objection - "ไม่มีประสบการณ์ทำยังไง?" */}
          <section className="p-7 md:p-9 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-2 border-emerald-300/80 shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black rounded-lg">
              <span>🌟</span>
              <span>คำตอบสำหรับคำถามที่คนกังวลที่สุด:</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
              “เรียนจบแล้ว... จะเริ่มต้นหาประสบการณ์ทำงานจากที่ไหน?”
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
              นี่คือความกังวลอันดับหนึ่งของคนเปลี่ยนสายงาน: บริษัทส่วนใหญ่ต้องการคนที่มีประสบการณ์ทำงานจริง แต่ถ้าไม่มีที่ไหนรับเข้าทำงานก่อน แล้วเราจะหาประสบการณ์จากไหน?
            </p>

            <div className="p-5 bg-white/95 rounded-2xl border border-emerald-200/90 shadow-sm">
              <div className="text-emerald-400 text-3xl font-serif leading-none mb-1">“</div>
              <p className="text-base sm:text-lg font-bold text-neutral-900 leading-relaxed italic -mt-2">
                เพราะสำหรับคนเปลี่ยนสาย การมีประสบการณ์แรก อาจเป็นก้าวสำคัญที่ทำให้การสมัครงานครั้งต่อไปแตกต่างออกไป
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                💡 ทางออกของ CodeCamp Thailand สำหรับผู้เรียนรอบ Onsite:
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-neutral-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <span><strong>การันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์:</strong> CodeCamp ประสานงานและจัดหาที่ฝึกงานกับบริษัทจริงให้ทันที</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <span><strong>มีที่ฝึกงานรองรับจริง:</strong> เพื่อเปิดประตูให้คุณได้เข้าสะสมชั่วโมงบินกับทีม Tech จริงโดยไม่ต้องเคว้ง</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-black mt-0.5">✓</span>
                  <span><strong>มี Reference รับรองการทำงานจริง:</strong> ช่วยให้ Resume ของคุณโดดเด่นและพร้อมยื่นสมัครงานประจำได้อย่างมั่นใจ</span>
                </li>
              </ul>
              <p className="text-xs text-neutral-400 italic pt-2">
                * สิทธิพิเศษการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์สงวนสิทธิ์เฉพาะผู้เรียนในรูปแบบ Onsite เท่านั้น
              </p>
            </div>
          </section>

          {/* Student Reviews Video Section */}
          {reviewVideos.length > 0 && (
            <section className="pt-2">
              <VideoCarousel
                title="เสียงจากรุ่นพี่ที่เริ่มต้นจากศูนย์... สู่ Developer ตัวจริงที่ได้งานแล้ว"
                subtitle="ฟังสตอรี่จริงจากผู้เรียนรอบ Onsite ที่เปลี่ยนสายงานสำเร็จ ได้งานทำจริง แม้ไม่มีพื้นฐานมาก่อน"
                badge="รีวิวจากผู้เรียนที่ได้งานจริง"
                icon="⭐"
                videos={reviewVideos}
              />
            </section>
          )}

          {/* Section 5: FAQ */}
          <section className="space-y-6 pt-6 border-t border-neutral-200/80">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              คำถามที่พบบ่อย (FAQ) จากคนอยากเปลี่ยนสาย
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <h3 className="text-base font-extrabold text-neutral-900 mb-1.5">
                  Q: ไม่มีพื้นฐานคณิตศาสตร์ ไม่เก่งภาษาอังกฤษ จะเรียนเขียนโปรแกรมรอดไหม?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong>A: รอดแน่นอนครับ</strong> การเขียนโค้ดสำหรับ Web Application ยุคใหม่เน้นไปที่การคิดเชิงเหตุผล (Logic) และการแก้ปัญหาอย่างเป็นระบบ ไม่ได้ใช้แคลคูลัสหรือคณิตศาสตร์ชั้นสูง ส่วนภาษาอังกฤษใช้เพียงคำศัพท์พื้นฐานทั่วไป และตลอดคอร์สมีทีมโค้ชและ Mentors คอยอธิบายภาษาไทยให้เข้าใจง่าย
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <h3 className="text-base font-extrabold text-neutral-900 mb-1.5">
                  Q: อายุเกิน 30 หรือ 35 ปีแล้ว บริษัท Tech ยังเปิดรับไหม?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong>A: เปิดรับอย่างยิ่ง</strong> ข้อได้เปรียบของคนเปลี่ยนสายที่มีอายุและมีประสบการณ์ทำงานจากสายอื่นมาก่อน คือทักษะ Soft Skills, ความรับผิดชอบ, และความเข้าใจในมุมมองธุรกิจ ซึ่งเด็กจบใหม่ยังไม่มี เมื่อประกอบกับทักษะเขียนโค้ดที่ทำโปรเจกต์จริงได้ ทำให้บริษัทพาร์ทเนอร์มองเห็นคุณค่าอย่างมาก
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <h3 className="text-base font-extrabold text-neutral-900 mb-1.5">
                  Q: ทำไมการเรียนรอบ Onsite ถึงได้ผลลัพธ์ดีที่สุดสำหรับคนเปลี่ยนสาย?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong>A: เพราะสภาพแวดล้อมกำหนดความสำเร็จ</strong> การมานั่งเรียนสดที่สถาบันร่วมกับเพื่อนๆ ที่มีเป้าหมายเดียวกัน มีโค้ชคอยดูหน้าจอแก้ปัญหาทันที และได้ทำ Group Project จำลองทีมจริง ทำให้ไม่มีโอกาสถอดใจ และผลลัพธ์การสร้างพอร์ตงานแน่นกว่าการเรียนคนเดียวที่บ้านหลายเท่า
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm">
                <h3 className="text-base font-extrabold text-neutral-900 mb-1.5">
                  Q: ถ้ายังทำงานประจำอยู่ ไม่สะดวกมาเรียน Onsite วันธรรมดา (จ.-ศ.) ควรเริ่มยังไง?
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  <strong>A: แนะนำรูปแบบ Live Streaming ครับ</strong> หากคุณสะดวกเรียนเฉพาะช่วงค่ำหรือเสาร์-อาทิตย์ สามารถเลือกหลักสูตร <Link href="/courses/fullstack-live-streaming" className="text-primary font-bold underline hover:text-primary-dark">Fullstack Live Streaming</Link> ได้ โดยสามารถดูสดหรือจัดเวลาดูคลิปบันทึกย้อนหลังในวันหยุด พร้อมพัฒนา Individual Project เดี่ยวเพื่อใช้ยื่นสมัครงานได้เช่นเดียวกัน แต่หากใครสามารถลางานหรือพร้อมทุ่มเทเต็มเวลา แนะนำรอบ <strong>Onsite (จ.-ศ. 09:00 - 17:00 น.)</strong> เพื่อรับสิทธิพิเศษการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์
                </p>
              </div>
            </div>
          </section>

          {/* Final Call to Action Box */}
          <section className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 md:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 text-amber-300 text-xs font-black rounded-full uppercase tracking-wider">
                <span>🔥</span>
                <span>ก้าวแรกสู่การเปลี่ยนสายงานที่ปลอดภัยที่สุด</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                พร้อมเริ่มต้นเปลี่ยนสายสู่ Developer <br />
                ด้วยเส้นทางที่เหมาะกับคุณแล้วหรือยัง?
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                ทุ่มเทเต็มเวลาเรียนสด Onsite พญาไท (จ.-ศ.) พร้อมการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์ <br className="hidden sm:inline" />
                หรือเรียนออนไลน์ Live Streaming จัดเวลาดูย้อนหลังเสาร์-อาทิตย์สำหรับคนทำงานประจำ
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                <TrackedLink
                  href="/courses/offline-fullstack-weekday"
                  eventName="ViewContent"
                  eventParams={{
                    content_name: "Fullstack CodeCamp Weekday (จากคู่มือเปลี่ยนสายงาน)",
                    content_category: "Course Detail",
                  }}
                  umamiEvent="view-course-click: switch-to-developer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-neutral-900 font-black text-sm sm:text-base shadow-lg hover:bg-neutral-100 transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>ดูคอร์ส Onsite (จ.-ศ.)</span>
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </TrackedLink>

                <TrackedLink
                  href="/courses/fullstack-live-streaming"
                  eventName="ViewContent"
                  eventParams={{
                    content_name: "Fullstack Live Streaming (จากคู่มือเปลี่ยนสายงาน)",
                    content_category: "Course Detail",
                  }}
                  umamiEvent="view-course-click: switch-to-developer-livestreaming"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>ดู Live Streaming (คนทำงาน)</span>
                </TrackedLink>

                <LineCTA
                  courseTitle="ปรึกษาเปลี่ยนสายงานสู่ Developer (จากคู่มือ)"
                  type="enquiry"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#06C755] hover:bg-[#05b64e] text-white font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>ทัก LINE ปรึกษาพี่ทีมงาน</span>
                </LineCTA>
              </div>

              <p className="text-xs text-neutral-400 pt-2">
                * ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงานพร้อมช่วยประเมินความพร้อมและวางแผนให้คุณ
              </p>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
