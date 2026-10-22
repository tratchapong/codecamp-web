// biome-ignore-all lint: home-page-component
import Link from "next/link";

interface CourseFormat {
  id: string;
  badge: string;
  badgeColor: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  deposit?: number;
  slug: string;
  highlightBorder?: boolean;
  isClosed?: boolean;
  features: string[];
}

const formats: CourseFormat[] = [
  {
    id: "onsite",
    badge: "🔒 ปิดรับสมัครแล้ว",
    badgeColor: "bg-neutral-100 text-neutral-600 border border-neutral-300",
    name: "Onsite Weekday",
    subtitle: "Fullstack CodeCamp #24",
    tagline: "เริ่มเรียน 5 ต.ค. 69 (ปิดรับสมัครแล้ว)",
    price: 65000,
    originalPrice: 120000,
    deposit: 5000,
    slug: "offline-fullstack-weekday",
    isClosed: true,
    features: [
      "เรียนสด ณ สถาบัน (พญาไท) จ.-ศ. 09:00 - 17:00 น. นาน 3.5 เดือน",
      "โค้ชและ Mentors ประกบดูแลใกล้ชิด แก้ปัญหาโค้ดแบบ Real-time",
      "ทำ Group Project เสมือนทีม Dev จริงด้วย Agile / Scrum / Git",
      "สิทธิ์ขึ้นเวที Demo Day & Speed Interview สัมภาษณ์กับ Partner",
      "⭐ มีการันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์ (เฉพาะรอบ Onsite)",
      "Live Streaming สำรองเมื่อติดธุระ + ดูย้อนหลังได้ 1 ปี",
    ],
  },
  {
    id: "live-streaming",
    badge: "🔒 ปิดรับสมัครแล้ว",
    badgeColor: "bg-neutral-100 text-neutral-600 border border-neutral-300",
    name: "Live Streaming",
    subtitle: "Fullstack Live Streaming #24",
    tagline: "เริ่มเรียน 5 ต.ค. 69 (ปิดรับสมัครแล้ว)",
    price: 35000,
    originalPrice: 70000,
    deposit: 5000,
    slug: "fullstack-live-streaming",
    isClosed: true,
    features: [
      "สด จ.-ศ. 09:00 - 17:00 น. หรือดูย้อนหลังช่วงค่ำ / เสาร์-อาทิตย์",
      "เหมาะกับคนทำงานประจำหรืออยู่ ตจว. ไม่สะดวกเดินทาง",
      "ถาม-ตอบสดในคลาส และมี Community Support ช่วยตลอด",
      "Individual Final Project พัฒนาผลงานเดี่ยวใช้เป็น Portfolio",
      "✅ สิทธิ์ร่วม Demo Day & Speed Interview กับบริษัทพาร์ทเนอร์",
      "สิทธิ์ Final Project Review & Interview ประเมินผลงานตัวต่อตัว",
    ],
  },
  {
    id: "online",
    badge: "🚀 SELF-PACED",
    badgeColor: "bg-emerald-500/10 text-emerald-700 border border-emerald-300",
    name: "Online Fullstack",
    subtitle: "เรียนผ่านระบบวิดีโอ 100%",
    tagline: "ยืดหยุ่นสูงสุด เริ่มต้นเรียนได้ทันที",
    price: 15000,
    originalPrice: 30000,
    slug: "online-fullstack",
    highlightBorder: true,
    features: [
      "เรียนผ่านระบบวิดีโอคุณภาพสูง จัดเวลาเรียนเองได้ตามสะดวก",
      "มีทีม TA Support ตอบคำถามและช่วยตรวจโค้ดตลอด 6 เดือน",
      "กรอบเวลายื่นตรวจโปรเจกต์และสอบจบใน 6 เดือน (ทำจบก่อนได้)",
      "สิทธิ์เข้าชมวิดีโอย้อนหลังได้นาน 1 ปีเต็ม",
      "ทำ Capstone Project เดี่ยว สร้างผลงานจริงเพื่อรับใบ Certificate",
      "หลักสูตรครอบคลุมครบ Fullstack (Frontend, Backend, Database)",
    ],
  },
];

export function LearningFormats() {
  return (
    <section className="w-full bg-[#08646D] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-xs sm:text-sm font-bold tracking-wider uppercase mb-3">
            Core Curriculum Options
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            รูปแบบการเรียนมีให้เลือก 3 แบบ
          </h2>
          <p className="text-white/80 text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
            3 หลักสูตรหลักเพื่อการเปลี่ยนสายงานสู่นักพัฒนามืออาชีพ
            เลือกรูปแบบที่ลงตัวกับเวลาและเป้าหมายของคุณมากที่สุด
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {formats.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                item.highlightBorder
                  ? "bg-white shadow-2xl ring-4 ring-amber-400 lg:-translate-y-2"
                  : "bg-white/95 shadow-xl hover:bg-white"
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {item.tagline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm font-semibold text-[#08646D] mt-1 mb-6">
                  {item.subtitle}
                </p>

                {/* Price block */}
                <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-neutral-900 tracking-tight">
                      ฿{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ฿{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {item.isClosed ? (
                    <span className="text-xs font-bold text-neutral-500">
                      🔒 ปิดรับสมัครรอบนี้เรียบร้อยแล้ว
                    </span>
                  ) : item.deposit ? (
                    <span className="text-xs font-bold text-amber-600">
                      มัดจำจองสิทธิ์เพียง ฿{item.deposit.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600">
                      ชำระเต็มจำนวน เข้าเรียนได้ทันที
                    </span>
                  )}
                </div>

                {/* Features list */}
                <div className="mb-8">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    ไฮไลต์และสิทธิประโยชน์
                  </div>
                  <ul className="space-y-3 text-neutral-700 text-sm leading-snug">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#08646D] font-black text-base shrink-0 leading-none mt-0.5">
                          ✓
                        </span>
                        <span className="break-words">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-neutral-100 mt-auto">
                <Link
                  href={`/courses/${item.slug}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-sm ${
                    item.isClosed
                      ? "bg-neutral-700 hover:bg-neutral-800 text-white"
                      : item.highlightBorder
                        ? "bg-[#08646D] hover:bg-[#064e55] text-white hover:shadow-md"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white"
                  }`}
                >
                  <span>{item.isClosed ? "ดูรายละเอียด (ปิดรับสมัคร)" : "รายละเอียดคอร์ส"}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Matrix Link */}
        <div className="mt-12 text-center">
          <Link
            href="/courses#compare-courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-colors border border-white/20 shadow-sm"
          >
            <span>📊 กดดูตารางเปรียบเทียบเชิงลึกทั้ง 3 รูปแบบหลักสูตร</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
