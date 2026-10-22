// biome-ignore-all lint: Suppressing linter warnings
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { TrackedLink } from "@/shared/ui/TrackedLink";

export const metadata: Metadata = {
  title:
    "พันธกิจและความจริงใจ (Manifesto) | ทำไมความเข้มงวดคือของขวัญที่ดีที่สุด | CodeCamp Thailand",
  description:
    "ทำไม CodeCamp Thailand ถึงมีตารางเรียนและเงื่อนไขที่เข้มงวด? เจาะลึกความจริงใจเบื้องหลังการจำลอง Sprint ทำงานจริง และทำไมเราถึงปฏิเสธการขายฝัน เพื่อให้คนย้ายสายงานได้งานทำจริง",
  keywords: [
    "CodeCamp Manifesto",
    "แนวคิด CodeCamp",
    "ย้ายสายโปรแกรมเมอร์",
    "เปลี่ยนสายงาน developer",
    "Coding Bootcamp คุณภาพ",
    "การันตีที่ฝึกงาน developer",
    "เครือข่ายบริษัทพาร์ทเนอร์ tech",
    "CodeCamp Thailand",
  ],
  openGraph: {
    title: "ทำไม “ความยาก” และ “เงื่อนไขที่เข้มงวด” คือของขวัญที่ดีที่สุดสำหรับคนย้ายสายงาน",
    description:
      "ในยุคที่เต็มไปด้วยคอร์สขายฝัน นี่คือเหตุผลตรงไปตรงมาว่าทำไมความเข้มงวดของ CodeCamp ถึงเป็นกลไกที่สร้างขึ้นมาเพื่อปกป้องอนาคตของคุณ",
    url: "https://getcodecamp.com/manifesto/",
    siteName: "CodeCamp Thailand",
    locale: "th_TH",
    type: "article",
  },
};

export default function ManifestoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "ทำไม “ความยาก” และ “เงื่อนไขที่เข้มงวด” คือของขวัญที่ดีที่สุดสำหรับคนย้ายสายงานสู่ Developer",
        description:
          "บทความชี้แจงเหตุผลและพันธกิจของ CodeCamp Thailand ว่าทำไมระบบที่เข้มงวดคือเครื่องมือเจียระไนคนย้ายสายงานให้พร้อมทำงานจริงในตลาดเทคโนโลยี",
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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://getcodecamp.com/manifesto/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "ทำไม CodeCamp Thailand ถึงกำหนดตารางเรียน จันทร์-ศุกร์ เต็มเวลา?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CodeCamp จำลองสภาพแวดล้อมการทำงานจริง (Sprint Emulation) วันละ 8 ชั่วโมง เพื่อฝึกการบริหารเวลา การส่งมอบงานตามกำหนด (Deadline) และเปลี่ยนวิธีคิดของผู้เรียนสายงานอื่นให้คิดและแก้ปัญหาแบบ Developer ได้อย่างรวดเร็วที่สุด",
            },
          },
          {
            "@type": "Question",
            name: "เงื่อนไขการันตีฝึกงานของ CodeCamp Thailand คืออะไร?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ผู้เรียนต้องสร้างโปรเจกต์จริงและผ่านการสอบวัดผล (Project Defense & Presentation) เพื่อรักษามาตรฐานวิชาชีพและการันตีคุณภาพตัวผู้เรียนว่าพร้อมทำงานจริงกับบริษัทพาร์ทเนอร์ ไม่ใช่การการันตีอัตโนมัติโดยไม่มีการวัดผล",
            },
          },
          {
            "@type": "Question",
            name: "ทำไม CodeCamp Thailand ถึงไม่ใช้คำว่า 'การันตีได้งาน 100%'?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "เพราะในโลกความเป็นจริงของวงการ Tech บริษัทคัดเลือกผู้สมัครจาก Portfolio ผลงานจริง และ Logic การแก้ปัญหาในห้องสัมภาษณ์ CodeCamp จึงเลือกที่จะพูดความจริงตั้งแต่วันแรก และสร้างสะพานเชื่อมโอกาสที่ดีที่สุดผ่านเวที Demo Day และ Speed Interview",
            },
          },
          {
            "@type": "Question",
            name: "ใครที่เหมาะกับการเรียนที่ CodeCamp Thailand?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "เหมาะสำหรับผู้ที่ต้องการเปลี่ยนสายงานสู่ Developer อย่างจริงจัง พร้อมทุ่มเทเวลา มองเห็นว่าระบบที่เข้มงวดคือการเจียระไนทักษะ และต้องการพอร์ตโฟลิโอโปรเจกต์จริงไปใช้สมัครงาน ไม่เหมาะสำหรับผู้ที่มองหาทางลัด หรือต้องการเพียงใบประกาศฯ",
            },
          },
        ],
      },
    ],
  };

  return (
    <article className="min-h-screen bg-slate-50/70 text-slate-900 py-12 md:py-20 selection:bg-blue-100 selection:text-blue-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="6xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            กลับสู่หน้าหลัก
          </Link>
        </div>

        {/* Header Block */}
        <header className="max-w-5xl mx-auto text-center mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            CodeCamp Manifesto • พันธกิจแห่งความจริงใจ
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-snug mb-6">
            ทำไม “ความยาก” และ “เงื่อนไขที่เข้มงวด”{" "}
            <br className="hidden sm:inline" />
            คือของขวัญที่ดีที่สุดสำหรับคนย้ายสายงาน
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            ที่นี่ไม่ใช่พื้นที่สำหรับซื้อขายคอร์สเรียนออนไลน์ทั่วไป{" "}
            <br className="hidden sm:inline" />
            <strong className="text-slate-900 font-bold underline decoration-primary decoration-2 underline-offset-4">
              แต่คือพื้นที่หล่อหลอมและคัดกรองของคนที่ “เอาจริง”
            </strong>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-slate-500">
            <span>โดย ทีมผู้สอน CodeCamp Thailand</span>
            <span>•</span>
            <span>เครือข่ายพันธมิตรบริษัท Tech</span>
            <span>•</span>
            <span>ผลิต Developer รุ่นใหม่แล้วกว่า 22 รุ่น (900+ คน)</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm border border-slate-200/80 space-y-12">
          {/* Section 1: Intro & Context */}
          <section className="space-y-5">
            <p className="text-lg sm:text-xl leading-relaxed text-slate-800 font-normal">
              ในยุคที่ตลาดเทคโนโลยีเต็มไปด้วยคอร์สเรียนออนไลน์ราคาหลักร้อย
              และโฆษณาชวนเชื่อประเภท{" "}
              <em className="text-slate-900 font-semibold not-italic bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/80">
                “เปลี่ยนสายงานง่ายๆ สบายๆ ในไม่กี่สัปดาห์”
              </em>{" "}
              หรือ{" "}
              <em className="text-slate-900 font-semibold not-italic bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/80">
                “ใครๆ ก็เป็นโปรแกรมเมอร์ได้โดยไม่ต้องพยายาม”
              </em>
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              สิ่งที่ผู้เรียนมักจะได้รับกลับไปหลังเรียนจบ ไม่ใช่ทักษะที่นำไปใช้งานได้จริงในบริษัท
              แต่เป็นภาวะ{" "}
              <strong className="text-rose-600 font-bold">Tutorial Hell</strong>{" "}
              (เปิดคลิปทำตามได้ แต่พอให้เริ่มโปรเจกต์เองกลับคิดไม่ออก)
              และความผิดหวังเมื่อต้องลงสนามสัมภาษณ์งานจริงกับ Tech Lead หรือ HR
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0f172a] to-blue-950 text-white border-l-4 border-primary shadow-sm">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                นี่คือเหตุผลที่{" "}
                <strong className="text-primary font-bold">
                  CodeCamp Thailand
                </strong>{" "}
                เลือกที่จะเดินในเส้นทางที่ต่างออกไป เราไม่เน้นการแข่งขันด้วยสงครามราคา
                ไม่เน้นการตลาดขายฝัน แต่เราเน้น
                <span className="text-white font-bold">
                  {" "}
                  “การหล่อหลอมและสร้าง Developer ตัวจริงที่บริษัทพร้อมรับเข้าทำงาน”
                </span>
              </p>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
              บทความนี้จะชี้แจงเหตุและผลอย่างตรงไปตรงมา ว่าทำไมสิ่งที่คุณอาจเรียกว่า “ข้อจำกัด”
              หรือ “เงื่อนไขที่เข้มงวด” ของเรา แท้จริงแล้วคือ{" "}
              <strong>กลไกที่สร้างขึ้นมาเพื่อปกป้องอนาคตและการลงทุนของคุณเอง</strong>
            </p>
          </section>

          <hr className="border-slate-200" />

          {/* Section 2: The 3 Pillars */}
          <section className="space-y-10">
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-wider text-primary">
                The 3 Pillars of Discipline
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                3 เสาหลักเบื้องหลังความเข้มงวดของเรา
              </h2>
            </div>

            {/* Pillar 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all hover:border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white font-black text-lg flex items-center justify-center shadow-xs">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  ตารางเรียนที่เข้มงวด{" "}
                  <span className="inline-block">
                    (จันทร์ - ศุกร์ เต็มเวลา 09:00 - 17:00 น.)
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200/70">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                    <span>👁️</span> สิ่งที่คนทั่วไปมองเห็น
                  </span>
                  <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                    ข้อจำกัดที่ทำให้คนทำงานประจำเรียนยาก ต้องลางาน
                    หรือต้องจัดสรรเวลาชีวิตอย่างหนักหน่วง
                  </p>
                </div>

                <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200/80">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1.5">
                    <span>🎯</span> เหตุผลที่แท้จริง
                  </span>
                  <p className="text-sm text-slate-900 mt-1 font-bold leading-relaxed">
                    การจำลองสภาพแวดล้อมการทำงานจริง{" "}
                    <span className="inline-block">(Sprint Emulation)</span>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                การเป็น Developer มืออาชีพไม่ได้อาศัยแค่การจำคำสั่งโค้ด แต่คือการบริหารเวลา
                การส่งมอบงานตามกำหนด (Deadline) และการทนต่อแรงกดดัน
                การบีบอัดเนื้อหาและจำลองการทำงานเต็มเวลา 8 ชั่วโมงต่อวัน
                <strong>
                  {" "}
                  คือวิธีเดียวที่จะเปลี่ยนวิธีคิดของคนสายงานอื่นให้คิด แก้ปัญหา
                  และเขียนโค้ดได้อย่างมีประสิทธิภาพที่สุด
                </strong>
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all hover:border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  เงื่อนไขการันตีฝึกงาน: ไม่เน้นเช็กชื่อ{" "}
                  <span className="inline-block">
                    แต่ต้อง “สอบและส่งมอบโปรเจกต์จริง”
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200/70">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                    <span>👁️</span> สิ่งที่คนทั่วไปมองเห็น
                  </span>
                  <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                    ทำไมไม่การันตีให้อัตโนมัติ? ทำไมต้องสอบโปรเจกต์และพรีเซนต์ให้ผ่าน
                    จึงจะได้สิทธิ์ฝึกงานกับ
                    <span className="whitespace-nowrap">บริษัทพาร์ทเนอร์</span>
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/80">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🎯</span> เหตุผลที่แท้จริง
                  </span>
                  <p className="text-sm text-slate-900 mt-1 font-bold leading-relaxed">
                    วัดผลด้วยทักษะจริง (Project-Based Assessment){" "}
                    <span className="inline-block">เพื่อรักษามาตรฐาน</span>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                ที่ CodeCamp เราไม่ได้จู้จี้เรื่องการส่งการบ้านย่อยรายวันเหมือนในโรงเรียน
                แต่สิ่งที่เราให้ความสำคัญและเข้มงวดเป็นอันดับ 1 คือ{" "}
                <strong className="inline-block">
                  “คุณต้องสร้างโปรเจกต์จริงและมาสอบวัดผล (Project Defense &
                  Presentation)”
                </strong>
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                เพราะในโลกความเป็นจริง บริษัท Tech ไม่ได้สนใจว่าคุณนั่งฟังบรรยายครบกี่ชั่วโมง
                แต่เขาสนใจว่า{" "}
                <strong>
                  คุณเขียนโค้ดแก้ปัญหาได้จริง ระบบทำงานได้จริง
                  และอธิบายตรรกะเบื้องหลังสิ่งที่คุณสร้างได้หรือไม่
                </strong>{" "}
                การตั้งเงื่อนไขว่าต้องสอบโปรเจกต์ให้ผ่าน จึงเป็นการ{" "}
                <strong className="text-slate-900">การันตีคุณภาพของตัวคุณเอง</strong>{" "}
                ว่าเมื่อคุณก้าวเข้าไปใน
                <span className="whitespace-nowrap">บริษัทพาร์ทเนอร์</span>{" "}
                คุณคือคนที่พร้อมลุยงานจริงได้ทันที ไม่ใช่ภาระของทีม
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all hover:border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  การปฏิเสธคำว่า{" "}
                  <span className="inline-block">
                    “การันตีได้งาน 100% โดยไม่ต้องพยายาม”
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200/70">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                    <span>👁️</span> สิ่งที่คนทั่วไปมองเห็น
                  </span>
                  <p className="text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                    สถาบันอื่นใช้คำว่า{" "}
                    <span className="whitespace-nowrap">"การันตีงาน 100%"</span>{" "}
                    ทำการตลาด แต่ CodeCamp เลือกที่จะไม่ใช้คำนี้
                  </p>
                </div>

                <div className="bg-indigo-50/80 p-4 rounded-xl border border-indigo-200/80">
                  <span className="text-xs font-bold text-indigo-800 uppercase tracking-wide flex items-center gap-1.5">
                    <span>🎯</span> เหตุผลที่แท้จริง
                  </span>
                  <p className="text-sm text-slate-900 mt-1 font-bold leading-relaxed">
                    ความจริงใจขั้นสูงสุดต่อผู้เรียนทุกคน{" "}
                    <span className="inline-block">(พูดความจริงตั้งแต่วันแรก)</span>
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                ในโลกความเป็นจริงของวงการ Tech ไม่มี HR หรือ Tech Lead
                คนไหนรับคนเข้าทำงานเพียงเพราะ "ชื่อสถาบันบนใบประกาศฯ" เขาเลือกคุณจาก{" "}
                <strong>
                  "Portfolio ผลงานจริง และ Logic การแก้ปัญหาในห้องสัมภาษณ์"
                </strong>
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                CodeCamp สร้างสะพานและโอกาสที่ดีที่สุดให้คุณ (ทั้งโปรเจกต์กลุ่ม, เวที Demo Day,
                และ Speed Interview กับบริษัทจริง)
                แต่คุณคือคนที่ต้องเดินข้ามสะพานนั้นด้วยสองขาของตัวเอง
                <strong>
                  {" "}
                  การพูดความจริงตั้งแต่วันแรก คือการเตือนให้คุณตระหนักและพร้อมสู้จริง
                  ไม่ใช่หลับตาฝัน
                </strong>
              </p>
            </div>
          </section>

          <hr className="border-slate-200" />

          {/* Section 3: Self-Screening Table */}
          <section className="space-y-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-wider text-primary">
                Quality Gate Self-Assessment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                คุณเหมาะกับ CodeCamp Thailand หรือไม่?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                โปรดอ่านหัวข้อนี้ด้วยความจริงใจกับตัวเอง ก่อนที่คุณจะตัดสินใจสมัครเรียน
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Not Fit */}
              <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-4">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-black text-sm">
                    ✕
                  </span>
                  <span>ที่นี่อาจ “ไม่เหมาะกับคุณ” ถ้า...</span>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>มองหาทางลัดที่ง่าย สบาย ไม่ต้องการทุ่มเทเวลา</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      คาดหวังว่าจ่ายเงินแล้ว ความรู้และงานจะเข้ามาหาเองโดยอัตโนมัติ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>ต้องการเพียงกระดาษใบประกาศนียบัตรไปประดับโปรไฟล์</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>ถอดใจทันทีเมื่อเจอโค้ด Error หรือสิ่งที่ไม่คุ้นเคย</span>
                  </li>
                </ul>
              </div>

              {/* High Fit */}
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                    ✓
                  </span>
                  <span>คุณคือ “คนที่เราตามหา” ถ้า...</span>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      เข้าใจสัจธรรมว่าการเปลี่ยนสายงานต้องแลกมาด้วยความทุ่มเทจริงจัง
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      มองเห็นว่าระบบและตารางเรียนที่เข้มงวด คือเครื่องมือเจียระไนตัวคุณ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      พร้อมที่จะเหนื่อย จมกับโค้ด แก้ไขข้อผิดพลาด เพื่ออนาคตและรายได้ที่มั่นคง
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>
                      ต้องการทักษะจริงและผลงานโปรเจกต์ที่อธิบายได้เต็มปากในวันสัมภาษณ์
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quote Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0f172a] to-blue-950 text-white text-center space-y-3">
            <p className="text-lg sm:text-xl font-bold leading-relaxed text-slate-100">
              “ถ้าคุณพร้อมที่จะเอาจริง CodeCamp Thailand คือสภาพแวดล้อมที่ปลอดภัย อบอุ่น
              และพร้อมสนับสนุนคุณอย่างถึงที่สุด”
            </p>
            <p className="text-xs sm:text-sm text-blue-300 font-medium">
              ตลอด 5 ปี 22 รุ่น เราพิสูจน์แล้วว่า
              คนธรรมดาก็เป็นโปรแกรมเมอร์ที่เก่งและได้งานจริงได้
            </p>
          </div>

          {/* Section 4: Dual Psychological CTA */}
          <section className="pt-4 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                คุณพร้อมก้าวข้ามขีดจำกัดของตัวเองแล้วหรือยัง?
              </h3>
              <p className="text-sm text-slate-600">
                เลือกเส้นทางที่เหมาะกับความพร้อมและความตั้งใจของคุณในตอนนี้
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Primary Action */}
              <TrackedLink
                href="/courses/offline-fullstack-weekday/"
                eventName="Lead"
                eventParams={{
                  content_name: "Manifesto Primary CTA - Ready to Commit",
                  content_category: "Course Application",
                }}
                umamiEvent="manifesto-click: ready-to-commit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary hover:bg-blue-600 text-white font-black text-center text-base transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5"
              >
                🔥 ฉันพร้อมทุ่มเทและต้องการสมัครเรียนรอบ Onsite
              </TrackedLink>

              {/* Secondary Action */}
              <TrackedLink
                href="/guide/switch-to-developer/"
                eventName="ViewContent"
                eventParams={{
                  content_name: "Manifesto Secondary CTA - Read Guide",
                  content_category: "Career Guide",
                }}
                umamiEvent="manifesto-click: read-guide"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-center text-sm transition-all"
              >
                📖 ขอศึกษาคู่มือเปลี่ยนสายงานฟรีก่อน
              </TrackedLink>
            </div>

            {/* Direct Line Advisory */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                ยังมีข้อสงสัยเรื่องพื้นฐานหรืออยากปรึกษาทีมเมนเทอร์โดยตรง?{" "}
                <TrackedLink
                  href="https://page.line.me/221mbxdw"
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="Contact"
                  eventParams={{
                    content_name: "Manifesto Line Inquiry",
                    content_category: "Consultation",
                  }}
                  umamiEvent="manifesto-click: line-inquiry"
                  className="text-primary font-bold hover:underline"
                >
                  ทักสอบถามทีมงานผ่าน LINE Official ได้ตลอดเวลา
                </TrackedLink>
              </p>
            </div>
          </section>
        </div>
      </Container>
    </article>
  );
}
