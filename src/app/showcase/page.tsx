import showcasesData from "@/data/showcases.json";
import { Showcase } from "@/shared/types/showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตัวอย่างผลงานผู้เรียน | CodeCamp Thailand",
  description: "แรงบันดาลใจจากเหล่าผู้เรียน ทั้งคนย้ายสายที่เริ่มจากศูนย์ และคนทำงานที่มาอัพสกิลสู่ระดับโปร ส่องผลงานจริงที่พิสูจน์ว่าคุณเองก็ทำได้",
  openGraph: {
    title: "ตัวอย่างผลงานผู้เรียน | CodeCamp Thailand",
    description: "แรงบันดาลใจจากเหล่าผู้เรียน ทั้งคนย้ายสายที่เริ่มจากศูนย์ และคนทำงานที่มาอัพสกิลสู่ระดับโปร ส่องผลงานจริงที่พิสูจน์ว่าคุณเองก็ทำได้",
  },
};

const showcases = (showcasesData as unknown) as Showcase[];
const sortedShowcases = [...showcases].sort((a, b) => {
  if (a.isGroupProject && !b.isGroupProject) return -1;
  if (!a.isGroupProject && b.isGroupProject) return 1;
  return 0;
});

export default function ShowcasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center mb-20">
        <span className="bg-[#15848d]/10 text-[#15848d] px-4 py-1 rounded-full text-sm font-bold mb-4 tracking-wider uppercase">
          ตัวอย่างความสำเร็จ
        </span>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-neutral-900 leading-tight">
          ตัวอย่างผลงาน <span className="text-[#15848d]">ผู้เรียน</span>
        </h1>
        <p className="text-neutral-500 text-xl max-w-2xl leading-relaxed">
          แรงบันดาลใจจากเหล่าผู้เรียน ทั้ง "คนย้ายสาย" ที่เริ่มจากศูนย์ และ "คนทำงาน" ที่มาอัพสกิลสู่ระดับโปร
          ส่องผลงานจริงที่พิสูจน์ว่าคุณเองก็ทำได้ พร้อมก้าวสู่ความสำเร็จในสายงาน Tech อย่างมั่นใจ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedShowcases.map((project) => (
          <a
            key={project.id}
            href={`/showcase/${project.id}/`}
            className="group flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 border border-neutral-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-500" />
            </div>

            {/* Info Section */}
            <div className="mt-6 px-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] bg-[#15848d]/10 text-[#15848d] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-tighter">
                  {project.isGroupProject ? "โปรเจกต์กลุ่ม" : `ผู้พัฒนา: ${project.author}`}
                </span>
                {project.isGroupProject && (
                  <>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                      Group
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-2xl font-black text-neutral-900 group-hover:text-[#15848d] transition-colors mb-2 leading-tight">
                {project.title}
              </h3>

              <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-4 flex items-center text-[#15848d] font-bold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                ดูรายละเอียดโปรเจกต์ <span className="ml-2">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
