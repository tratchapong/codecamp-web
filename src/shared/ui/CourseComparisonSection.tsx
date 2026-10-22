import Link from "next/link";

export function CourseComparisonSection() {
  return (
    <section id="compare-courses" className="mt-20 pt-16 border-t border-neutral-100">
      <div className="text-center mb-12">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
          Product Comparison Matrix
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4">
          เปรียบเทียบรูปแบบการเรียน <span className="text-primary italic">CodeCamp</span>
        </h2>
        <p className="text-neutral-600 text-base md:text-lg max-w-2xl mx-auto">
          เลือกหลักสูตรที่ตอบโจทย์ชีวิตและเป้าหมายของคุณ เปรียบเทียบความแตกต่างระหว่าง Onsite, Live Streaming และ Online
        </p>
      </div>

      {/* Comparison Table Container with proper overflow & min-width */}
      <div className="overflow-x-auto pt-4 pb-2 px-1">
        <div className="rounded-3xl border border-neutral-200 shadow-xl bg-white overflow-hidden min-w-[960px]">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-neutral-200/80 bg-neutral-50/80">
                <th className="p-6 text-sm font-bold text-neutral-500 w-[22%] align-bottom">
                  คุณสมบัติหลักสูตร
                </th>

                {/* Tier 1: Onsite Flagship (65,000 THB) - FIRST COLUMN */}
                <th className="p-6 w-[26%] bg-neutral-900 text-white relative align-top">
                  <div className="absolute top-3 right-4 bg-neutral-700 text-neutral-200 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    🔒 ปิดรับสมัครแล้ว
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="inline-block bg-white/15 text-neutral-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Onsite พญาไท
                    </span>
                    <h3 className="text-lg font-extrabold text-white leading-tight">Fullstack Weekday #24</h3>
                    <div className="text-2xl font-black text-neutral-300 whitespace-nowrap">
                      ฿65,000 <span className="text-xs text-neutral-400 font-medium">(ปิดรับสมัครแล้ว)</span>
                    </div>
                  </div>
                </th>
                
                {/* Tier 2: Live Streaming (35,000 THB) */}
                <th className="p-6 w-[26%] bg-primary/5 border-x border-neutral-200 align-top relative">
                  <div className="absolute top-3 right-4 bg-neutral-700 text-neutral-200 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                    🔒 ปิดรับสมัครแล้ว
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="inline-block bg-primary/10 text-neutral-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Live Online
                    </span>
                    <h3 className="text-lg font-extrabold text-neutral-900 leading-tight">Fullstack Live Streaming #24</h3>
                    <div className="text-2xl font-black text-neutral-700 whitespace-nowrap">
                      ฿35,000 <span className="text-xs text-neutral-400 font-medium">(ปิดรับสมัครแล้ว)</span>
                    </div>
                  </div>
                </th>

                {/* Tier 3: Online (15,000 THB) */}
                <th className="p-6 w-[26%] bg-white align-top">
                  <div className="space-y-2">
                    <span className="inline-block bg-neutral-100 text-neutral-600 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Self-Paced
                    </span>
                    <h3 className="text-lg font-extrabold text-neutral-900 leading-tight">Online Fullstack</h3>
                    <div className="text-2xl font-black text-neutral-900">
                      ฿15,000
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100 text-sm">
              {/* Row: Learning Mode */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">รูปแบบการเรียน</td>
                <td className="p-5 font-bold text-neutral-900 bg-neutral-900/5">
                  เรียนสด ณ สถาบัน
                  <span className="block text-xs text-neutral-500 font-normal mt-0.5">(ตึกวรรณสรณ์ พญาไท)</span>
                </td>
                <td className="p-5 text-neutral-900 font-medium bg-primary/5 border-x border-neutral-200">
                  เรียนสดออนไลน์ 100%
                  <span className="block text-xs text-neutral-500 mt-0.5">(Live Streaming)</span>
                </td>
                <td className="p-5 text-neutral-600">
                  เรียนด้วยตนเองผ่านวิดีโอ
                  <span className="block text-xs text-neutral-400 mt-0.5">(Self-paced)</span>
                </td>
              </tr>

              {/* Row: Schedule */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">ตารางเวลาเรียน</td>
                <td className="p-5 text-neutral-900 font-medium bg-neutral-900/5">
                  จันทร์ - ศุกร์ (09:00 - 17:00)
                  <span className="block text-xs text-emerald-600 font-bold mt-0.5">
                    เรียนสด Onsite + Live Streaming + ดูย้อนหลังได้ 1 ปี
                  </span>
                </td>
                <td className="p-5 text-neutral-900 font-medium bg-primary/5 border-x border-neutral-200">
                  จันทร์ - ศุกร์ (09:00 - 17:00)
                  <span className="block text-xs text-neutral-500 mt-0.5">
                    ดูสดออนไลน์ หรือดูบันทึกย้อนหลังเสาร์-อาทิตย์ได้ (1 ปี)
                  </span>
                </td>
                <td className="p-5 text-neutral-600">
                  ยืดหยุ่น จัดเวลาเรียนได้เอง
                  <span className="block text-xs text-emerald-600 font-bold mt-0.5">
                    ยื่นตรวจโปรเจกต์และสอบจบได้ภายใน 6 เดือน (ทำครบ จบก่อนได้ทันที)
                  </span>
                </td>
              </tr>

              {/* Row: Support */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">การซัพพอร์ตช่วยเหลือ</td>
                <td className="p-5 font-bold text-neutral-900 bg-neutral-900/5">
                  โค้ช & Mentors ดูแลใกล้ชิด
                  <span className="block text-xs text-neutral-600 font-normal mt-0.5">(ประจำห้องเรียนสด)</span>
                </td>
                <td className="p-5 text-neutral-900 font-medium bg-primary/5 border-x border-neutral-200">
                  Q&A ถามสดในคลาส
                  <span className="block text-xs text-primary font-bold mt-0.5">+ Community Support</span>
                </td>
                <td className="p-5 text-neutral-600">
                  ทีม TA Support 6 เดือน
                  <span className="block text-xs text-neutral-400 mt-0.5">(คอยตอบคำถามและตรวจโค้ด)</span>
                </td>
              </tr>

              {/* Row: Project Structure */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">รูปแบบโปรเจกต์</td>
                <td className="p-5 bg-neutral-900/5">
                  <span className="font-extrabold text-amber-600 block">Group Project</span>
                  <span className="text-xs text-neutral-600 font-medium">(จำลองทีม Tech ร่วมพัฒนาโปรเจกต์จริง)</span>
                </td>
                <td className="p-5 bg-primary/5 border-x border-neutral-200">
                  <span className="font-extrabold text-primary block">Individual Final Project</span>
                  <span className="text-xs text-primary/80 font-medium">(โปรเจกต์เดี่ยวใช้งานได้จริง พร้อมยื่นสมัครงาน)</span>
                </td>
                <td className="p-5 text-neutral-600">
                  <span className="font-bold text-neutral-800 block">Capstone Project</span>
                  <span className="text-xs text-neutral-500 font-medium">(ส่งโปรเจกต์จบภายใน 6 เดือน / จบก่อนได้)</span>
                </td>
              </tr>

              {/* Row: Demo Day */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">Demo Day & Speed Interview</td>
                <td className="p-5 bg-neutral-900/5">
                  <span className="font-extrabold text-emerald-600 block">✅ เข้าร่วม Demo Day Onsite</span>
                  <span className="text-xs text-neutral-600 font-medium">(พรีเซ้นต์และสัมภาษณ์สดที่งาน)</span>
                </td>
                <td className="p-5 bg-primary/5 border-x border-neutral-200">
                  <span className="font-bold text-emerald-600 block">✅ มีสิทธิ์เข้าร่วม Demo Day</span>
                  <span className="text-xs text-emerald-700/80 font-medium">(พรีเซ้นต์ผลงานต่อบริษัทจริง)</span>
                </td>
                <td className="p-5 text-neutral-400">
                  ❌ ไม่มีสิทธิ์เข้าร่วม
                </td>
              </tr>

              {/* Row: Partner Internship */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">การันตีที่ฝึกงานกับบริษัทพาร์ทเนอร์</td>
                <td className="p-5 bg-neutral-900/5">
                  <span className="font-extrabold text-emerald-600 block">⭐ การันตีที่ฝึกงาน</span>
                </td>
                <td className="p-5 bg-primary/5 border-x border-neutral-200">
                  <span className="font-medium text-neutral-400 block">❌ ไม่มี</span>
                  <span className="text-xs text-neutral-400 font-normal">(สงวนสิทธิ์เฉพาะรอบ Onsite)</span>
                </td>
                <td className="p-5 text-neutral-400">
                  ❌ ไม่มี
                </td>
              </tr>

              {/* Row: สอวช */}
              <tr>
                <td className="p-5 font-bold text-neutral-700 bg-neutral-50/50">รับรอง สอวช. (ลดภาษี 250%)</td>
                <td className="p-5 text-neutral-900 bg-neutral-900/5">
                  <span className="font-bold block">✅ รับรองมาตรฐาน STEM</span>
                  <span className="text-xs text-neutral-500 font-normal">(เลขที่ TPC690045)</span>
                </td>
                <td className="p-5 text-neutral-900 bg-primary/5 border-x border-neutral-200">
                  <span className="font-medium block">✅ รับรองมาตรฐาน STEM</span>
                  <span className="text-xs text-neutral-500">(เลขที่ TPC690045)</span>
                </td>
                <td className="p-5 text-neutral-400">-</td>
              </tr>

              {/* Row: CTA Buttons */}
              <tr className="bg-neutral-50">
                <td className="p-5 font-bold text-neutral-700">สนใจสมัคร / ดูรายละเอียด</td>
                <td className="p-5 bg-neutral-900/5">
                  <Link
                    href="/courses/offline-fullstack-weekday/"
                    className="inline-block w-full text-center px-4 py-3 rounded-xl text-xs font-black bg-neutral-700 text-white hover:bg-neutral-800 transition-all shadow-md whitespace-nowrap"
                  >
                    ดูรายละเอียด (ปิดรับสมัคร)
                  </Link>
                </td>
                <td className="p-5 bg-primary/5 border-x border-neutral-200">
                  <Link
                    href="/courses/fullstack-live-streaming/"
                    className="inline-block w-full text-center px-3 py-3 rounded-xl text-xs font-extrabold bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-all whitespace-nowrap"
                  >
                    ดูรายละเอียด (ปิดรับสมัคร)
                  </Link>
                </td>
                <td className="p-5">
                  <Link
                    href="/courses/online-fullstack/"
                    className="inline-block w-full text-center px-3 py-3 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-dark shadow-md transition-colors whitespace-nowrap"
                  >
                    สมัคร Online Fullstack →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
