import showcasesData from "@/data/showcases.json";
import { Showcase } from "@/shared/types/showcase";

const showcases = (showcasesData as unknown) as Showcase[];

export function ShowcaseSection({ limit = 3 }: { limit?: number }) {
  const featuredShowcases = [...showcases]
    .sort((a, b) => {
      if (a.isGroupProject && !b.isGroupProject) return -1;
      if (!a.isGroupProject && b.isGroupProject) return 1;
      return 0;
    })
    .slice(0, limit);

  return (
    <div className="mt-24 pt-24 border-t border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
            ตัวอย่างผลงานจาก <span className="text-[#15848d]">ผู้เรียนของเรา</span>
          </h2>
          <p className="text-neutral-500 text-lg max-w-2xl leading-relaxed">
            ส่องโปรเจกต์จริงจากผู้เรียนที่ "ย้ายสาย" และ "อัพสกิล" จนก้าวสู่ระดับมืออาชีพ พิสูจน์ความสำเร็จผ่านผลงานที่ถูกสร้างสรรค์ขึ้นจริงในคอร์สเรียน
          </p>
        </div>
        <a
          href="/showcase/"
          className="inline-flex items-center gap-2 text-[#15848d] font-bold hover:gap-3 transition-all underline underline-offset-8 decoration-2 decoration-[#15848d]/30 hover:decoration-[#15848d]"
        >
          ดูผลงานทั้งหมด →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredShowcases.map((project) => (
          <a
            key={project.id}
            href={`/showcase/${project.id}/`}
            className="group flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500" />
            </div>
            <div className="mt-4">
              <span className="text-[10px] font-bold text-[#15848d] uppercase tracking-wider mb-1 block">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#15848d] transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-tighter mt-1">
                {project.isGroupProject ? "โปรเจกต์กลุ่ม" : `ผู้พัฒนา: ${project.author}`}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
