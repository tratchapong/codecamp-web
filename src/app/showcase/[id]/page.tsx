import { notFound } from "next/navigation";
import showcasesData from "@/data/showcases.json";
import { Showcase } from "@/shared/types/showcase";
import ImageGallery from "@/shared/ui/ImageGallery";
import fs from "fs";
import path from "path";

const showcases = (showcasesData as unknown) as Showcase[];

export async function generateStaticParams() {
  return showcases.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = showcases.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Handle dynamic image loading if images is a folder path
  let projectImages: string[] = [];
  if (Array.isArray(project.images)) {
    projectImages = project.images;
  } else if (typeof project.images === "string") {
    const folderPath = project.images;
    const fullPath = path.join(process.cwd(), "public", folderPath);

    try {
      if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        projectImages = files
          .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
          .sort()
          .map((file) => path.join(folderPath, file).replace(/\\/g, "/"));
      }
    } catch (error) {
      console.error(`Error reading images from ${fullPath}:`, error);
    }
  }

  // Helper to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/live/")) {
      return url.replace("youtube.com/live/", "youtube.com/embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("youtube.com/watch?v=", "youtube.com/embed/");
    }
    return url;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Navigation */}
      <a
        href="/showcase/"
        className="inline-flex items-center text-neutral-400 hover:text-[#15848d] transition-all mb-12 group font-bold tracking-tight"
      >
        <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center mr-4 group-hover:border-[#15848d] group-hover:bg-[#15848d]/5 transition-all">
          <span className="group-hover:-translate-x-1 transition-transform group-hover:text-[#15848d]">←</span>
        </div>
        กลับไปหน้าโชว์เคส
      </a>

      <div className="mb-24">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#15848d] font-bold uppercase tracking-widest text-sm block">
              {project.category}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500 font-medium text-sm italic">
              พัฒนาโดย {project.isGroupProject ? project.teamMembers?.join(", ") : project.author} — {project.batch}
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-10 text-neutral-900 leading-[1.05] tracking-tighter">
            {project.title}
          </h1>
        </div>

        {/* Description Section */}
        <div className="prose prose-2xl prose-neutral max-w-4xl">
          <p className="text-3xl text-neutral-500 leading-relaxed font-medium mb-12">
            {project.description}
          </p>
          <div className="h-px w-20 bg-[#15848d] mb-12" />
          <h3 className="text-3xl font-black mb-6 text-neutral-900">ภาพรวมของโปรเจกต์</h3>
          <p className="text-xl text-neutral-600 leading-relaxed whitespace-pre-line">
            {project.details}
          </p>
        </div>
      </div>

      {/* Video Section */}
      {project.videoUrl && (
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-4xl font-black text-neutral-900">ชมการทำงานของระบบจริง</h2>
            <div className="flex-grow h-px bg-neutral-100" />
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl border border-neutral-100">
            <iframe
              src={getEmbedUrl(project.videoUrl)}
              title={`${project.title} Video Presentation`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      {/* Team Members Section (for Group Projects) */}
      {project.isGroupProject && project.teamMembers && (
        <div className="mb-24">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-4xl font-black text-neutral-900">สมาชิกในทีม</h2>
            <div className="flex-grow h-px bg-neutral-100" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-[#15848d]/30 transition-all group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#15848d] to-[#0d5a61] flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  {member.charAt(0)}
                </div>
                <span className="text-xl font-bold text-neutral-900">{member}</span>
                <span className="text-sm text-neutral-500 mt-1">Fullstack Developer</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {projectImages.length > 0 && (
        <div className="mt-24 space-y-16">
          <div className="flex items-center gap-6">
            <h2 className="text-4xl font-black text-neutral-900">แกลเลอรี่ผลงาน</h2>
            <div className="flex-grow h-px bg-neutral-100" />
          </div>

          <ImageGallery images={projectImages} title={project.title} />
        </div>
      )}
    </div>
  );
}
