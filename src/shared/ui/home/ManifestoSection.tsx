import { Container } from "@/shared/ui/Container";
import { TrackedLink } from "@/shared/ui/TrackedLink";

export function ManifestoSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 via-[#0c162d] to-slate-900 text-white relative overflow-hidden">
      {/* Subtle primary blue background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 blur-[130px] rounded-full pointer-events-none" />

      <Container size="6xl" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            CodeCamp Manifesto
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug [text-wrap:balance]">
            “ที่นี่ไม่ใช่พื้นที่สำหรับซื้อขายคอร์สเรียน <br className="hidden sm:inline" />
            <span className="text-primary">แต่คือพื้นที่ของคนเอาจริง</span>”
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal [text-wrap:balance]">
            ก่อนที่คุณจะตัดสินใจจ่ายเงินเพื่อย้ายสายงาน เราอยากให้คุณเข้าใจ{" "}
            <span className="inline-block">
              <strong className="text-white font-semibold">
                ความจริงใจที่เป็นเนื้อแท้ของเรา
              </strong>
            </span>{" "}
            ว่าทำไม CodeCamp จึงต้องมีตารางเรียนและเงื่อนไขการันตีฝึกงานที่เข้มงวด
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              href="/manifesto/"
              eventName="ViewContent"
              eventParams={{
                content_name: "Homepage Manifesto Section CTA",
                content_category: "Manifesto",
              }}
              umamiEvent="home-click: manifesto-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-sm font-black transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>📖 อ่านแนวคิดเบื้องหลังความเข้มงวดของเรา</span>
              <span>→</span>
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
