// biome-ignore-all lint: Suppressing existing linter warnings in this file
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import courses from "@/data/courses.json";
import { LineCTA } from "@/shared/ui/LineCTA";
import { ShowcaseSection } from "@/shared/ui/ShowcaseSection";
import { CourseCountdown } from "@/shared/ui/CourseCountdown";
import { DemoDayGallery } from "@/shared/ui/DemoDayGallery";
import { VideoCarousel } from "@/shared/ui/VideoCarousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course || (course as any).hidden) {
    return {
      title: "ไม่พบคอร์สเรียน | CodeCamp Thailand",
    };
  }

  const title = (course as any).metaTitle || `${course.title} | CodeCamp Thailand`;
  const description = (course as any).metaDescription || course.description;
  const keywords = (course as any).keywords || (course as any).tags;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [
        {
          url: course.image,
          alt: course.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return courses
    .filter((course) => !(course as any).hidden)
    .map((course) => ({
      slug: course.slug,
    }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course || (course as any).hidden) {
    redirect("/courses/");
  }

  return (
    <div className="py-6">
      <Link
        href="/courses/"
        className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-primary mb-8 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        กลับหน้าคอร์สเรียน
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Course Info */}
        <div className="lg:col-span-12 xl:col-span-7">
          <div className="max-w-[480px]">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl mb-8 border border-neutral-100">
              <img
                src={course.image}
                alt={course.title}
                className={`object-cover w-full h-full ${
                  (course as any).isClosed ? "saturate-[0.7] opacity-85" : ""
                }`}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
                {course.type}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight italic">
                {course.title}
              </h1>
              {(course as any).subtitles && (
                <div className="flex flex-col gap-3 mt-6">
                  {(course as any).subtitles.map((sub: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5 text-neutral-800 font-extrabold text-lg md:text-2xl italic">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">✓</span>
                      <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{sub}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-y border-neutral-100 italic text-neutral-600">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>ระยะเวลา: {course.duration}</span>
              </div>
              {course.startMonth && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-accent font-bold">
                      เริ่มเรียน: {course.startMonth}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    *(อาจมีการปรับเปลี่ยนตามความเหมาะสมเพื่อประโยชน์ของผู้เรียน)
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>ผู้สอน: {course.instructor}</span>
              </div>
            </div>

            {/* Course Flow & Career Pathway Section */}
            {(course as any).courseFlow && (
              <div
                id="course-flow"
                className="scroll-mt-28 rounded-3xl bg-gradient-to-br from-neutral-50/90 via-white to-neutral-50/50 p-6 sm:p-8 border border-neutral-200/90 shadow-md"
              >
                {/* Section Header */}
                <div className="mb-7">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-wider mb-2.5">
                    <span>🧭</span>
                    <span>{(course as any).courseFlow.badge || "ภาพรวมเส้นทางการเรียน"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                    {(course as any).courseFlow.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 leading-relaxed">
                    {(course as any).courseFlow.description}
                  </p>
                </div>

                {/* 1. Main 4 Steps (Full width across column, spacious 2-col cards) */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3.5">
                    <span className="text-xs font-black text-neutral-400 uppercase tracking-wider">
                      เส้นทางหลักตลอดหลักสูตร:
                    </span>
                    <div className="h-px bg-neutral-200 flex-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(course as any).courseFlow.mainSteps.map((s: any, idx: number) => (
                      <div
                        key={idx}
                        className="group relative p-4 bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex items-start gap-3.5"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 text-primary font-black text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          0{s.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-black text-neutral-900 leading-tight">
                            {s.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1 leading-relaxed font-medium">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Partner Internship Feature (Clean & Seamless, No Nested Boxes) */}
                {(course as any).courseFlow.internshipBranch && (
                  <div className="mt-10 pt-8 border-t border-neutral-200/80">
                    {/* Header: Full width */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 mb-2.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full uppercase tracking-wider">
                        <span>{(course as any).courseFlow.internshipBranch.condition || "↳ ถ้ายังไม่ได้งานใน Demo Day?"}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                        {(course as any).courseFlow.internshipBranch.title || "โอกาสลงทะเบียนฝึกงานกับบริษัทพาร์ทเนอร์"}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed mt-2 max-w-2xl">
                        {(course as any).courseFlow.internshipBranch.description}
                      </p>
                    </div>

                    {/* Content: Video on Left, Clean Typography on Right (No nested boxes) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                      {/* Left: Video Player */}
                      <div className="md:col-span-5 flex justify-center">
                        <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-950 relative">
                          <iframe
                            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                              (course as any).courseFlow.video
                            )}&show_text=false&t=0`}
                            width="100%"
                            height="100%"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            className="absolute inset-0 w-full h-full"
                            title="Course Flow Video"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Right: Clean Editorial Content (No Box Inception) */}
                      <div className="md:col-span-7 flex flex-col justify-center space-y-5">
                        {(course as any).courseFlow.internshipBranch.quote && (
                          <div className="border-l-2 border-emerald-500 pl-4 py-1">
                            <p className="text-sm sm:text-base font-bold text-neutral-800 leading-relaxed italic">
                              “{(course as any).courseFlow.internshipBranch.quote}”
                            </p>
                          </div>
                        )}

                        <ul className="space-y-3 text-sm text-neutral-700 font-medium">
                          <li className="flex items-start gap-2.5">
                            <span className="text-emerald-600 font-black mt-0.5">✓</span>
                            <span>CodeCamp ช่วยประสานและจัดหาที่ฝึกงานให้</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-emerald-600 font-black mt-0.5">✓</span>
                            <span>ได้ลงมือทำงานจริงกับทีม Tech เพื่อสะสมชั่วโมงบิน</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="text-emerald-600 font-black mt-0.5">✓</span>
                            <span>มี Reference และผลงานจริงสำหรับใช้สมัครงานต่อ</span>
                          </li>
                        </ul>

                        {/* Quality Gate / Manifesto Callout */}
                        <div className="mt-2 p-3.5 rounded-xl bg-white border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                              <span>💡</span> ทำไมการันตีฝึกงานถึงมีเงื่อนไขและข้อบังคับที่เข้มงวด?
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-0.5 leading-normal">
                              เพราะเงื่อนไขมีไว้เพื่อการันตีคุณภาพของคุณต่อบริษัทพาร์ทเนอร์ ไม่ใช่การจำกัดสิทธิ์
                            </p>
                          </div>
                          <Link
                            href="/manifesto/"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors self-start sm:self-auto"
                          >
                            <span>อ่านแนวคิดตัวคัดกรอง</span>
                            <span>→</span>
                          </Link>
                        </div>

                        {(course as any).courseFlow.internshipBranch.note && (
                          <p className="text-xs text-neutral-400 italic pt-2">
                            * {(course as any).courseFlow.internshipBranch.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="prose prose-lg max-w-none text-neutral-700">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                ไฮไลท์หลักสูตร
              </h2>
              <p className="leading-relaxed">{course.content}</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-neutral-800">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            {(course as any).requirements && (
              <div className="mt-8 p-6 bg-amber-50/50 rounded-3xl border border-amber-200/60">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💻</span> สิ่งที่ต้องเตรียมมาสำหรับการเรียน
                </h3>
                <ul className="space-y-3 text-sm text-neutral-700">
                  {(course as any).requirements.map(
                    (req: string, idx: number) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="text-amber-600 font-bold mt-0.5">
                          •
                        </span>
                        <span className="font-medium">{req}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* AI Tools Section */}
            {(course as any).aiToolNote && (
              <div className="mt-8 p-6 bg-violet-50/60 rounded-3xl border border-violet-200/60">
                <h3 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  {(course as any).aiToolNote.title}
                </h3>
                <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                  {(course as any).aiToolNote.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(course as any).aiToolNote.models.map((m: string, i: number) => (
                    <span key={i} className="text-xs bg-white border border-violet-200 text-violet-700 font-bold px-3 py-1 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Demo Day Section */}
            {(course as any).demoDay && (
              <div className="mt-8 p-6 bg-amber-50/60 rounded-3xl border border-amber-300/60">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left content column */}
                  <div className={(course as any).demoDay.video ? "lg:col-span-7" : "lg:col-span-12"}>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                      <span className="text-xl">🏆</span>
                      {(course as any).demoDay.title}
                    </h3>
                    <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
                      {(course as any).demoDay.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {(course as any).demoDay.bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-700 font-medium">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">★</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right video column */}
                  {(course as any).demoDay.video && (
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <div className="w-full text-center lg:text-left mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                          วิดีโอบรรยากาศ Demo Day
                        </span>
                      </div>
                      <div className="w-full max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-black relative">
                        <iframe
                          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent((course as any).demoDay.video)}&show_text=false&t=0`}
                          className="w-full h-full border-none"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Full-width Image Gallery with Lightbox */}
                {(course as any).demoDay.images && (
                  <DemoDayGallery images={(course as any).demoDay.images} />
                )}

                {(course as any).demoDay.disclaimer && (
                  <p className="text-xs text-neutral-400 border-t border-amber-200/60 pt-3 mt-4">
                    * {(course as any).demoDay.disclaimer}
                  </p>
                )}
              </div>
            )}

            {/* Atmosphere Videos Section */}
            {(course as any).atmosphereVideos && (course as any).atmosphereVideos.length > 0 && (
              <VideoCarousel
                title="รีวิวบรรยากาศการเรียน"
                subtitle="สัมผัสบรรยากาศการเรียนสด กิจกรรม และสภาพแวดล้อมจริงที่ส่งเสริมการเรียนรู้"
                badge={course.type === "Live Streaming" ? "บรรยากาศการเรียนสด" : "บรรยากาศ Onsite"}
                icon="🏢"
                videos={(course as any).atmosphereVideos}
              />
            )}

            {/* Student Review Videos Section */}
            {(course as any).reviewVideos && (course as any).reviewVideos.length > 0 && (
              <VideoCarousel
                title="รีวิวและความประทับใจจากผู้เรียน"
                subtitle="เสียงตอบรับและความรู้สึกจากผู้เรียนที่ผ่านหลักสูตรและเปลี่ยนสายงานสำเร็จ"
                badge="เสียงจริงจากผู้เรียน"
                icon="⭐"
                videos={(course as any).reviewVideos}
              />
            )}

            {/* Legacy / Fallback Videos Section */}
            {!(course as any).atmosphereVideos && !(course as any).reviewVideos && (course as any).videos && (
              <VideoCarousel
                title="บรรยากาศการเรียนและรีวิว"
                videos={(course as any).videos}
                icon="🎬"
              />
            )}

            {/* Curriculum Section */}
            {course.curriculum && (
              <div className="mt-16 pt-16 border-t border-neutral-100">
                <h2 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  เนื้อหาหลักสูตร
                </h2>
                <div className="space-y-6">
                  {course.curriculum.map((phase: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm hover:border-primary/20 transition-all group"
                    >
                      <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                        <span className="opacity-30 text-xs">0{index + 1}</span>
                        {phase.phase}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.topics.map((topic: string, tIdx: number) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-3 text-neutral-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-primary transition-colors mt-2 flex-shrink-0" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Corporate/Private Class Banner */}
          {(course as any).corporate && !(course as any).isClosed && (
            <div className="mt-16">
              <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 md:p-10 shadow-xl">
                {/* Subtle background glow */}
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute left-1/3 top-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-start gap-6">
                  <div className="space-y-3 w-full">
                    <div className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      Corporate Training 🏢
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight italic">
                      {(course as any).corporate.title}
                    </h3>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                      {(course as any).corporate.description}
                    </p>
                    {(course as any).corporate.bullets && (
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(course as any).corporate.bullets.map((b: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-neutral-200">
                            <span className="w-4 h-4 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs flex-shrink-0">✓</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="w-full sm:w-auto">
                    <LineCTA
                      courseTitle={`${course.title} (Private Corporate Training)`}
                      type="enquiry"
                      className="group/btn inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-base"
                    >
                      <span>
                        {(course as any).corporate.ctaText ||
                          "ติดต่อสอบถามเพิ่มเติม"}
                      </span>
                      <svg
                        className="w-5 h-5 text-primary transition-transform group-hover/btn:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </LineCTA>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: CTA Sidebar */}
        <div className="lg:col-span-12 xl:col-span-5">
          <div className="sticky top-32 bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl space-y-8">
            {/* === PRICE BLOCK === */}
            {(course as any).isClosed ? (
              /* ── Closed Course Style ── */
              <div className="text-center pb-6 border-b border-neutral-100">
                <div className="text-sm text-neutral-500 mb-2 font-medium uppercase tracking-wider">
                  ราคาคอร์สเรียน
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-neutral-800 italic">
                      ฿{(course.originalPrice || course.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (course as any).depositAmount ? (
              /* ── Deposit Style ── */
              <div className="pb-6 border-b border-neutral-100">
                <div className="text-xs text-neutral-400 font-semibold uppercase tracking-widest mb-4 text-center">
                  ราคาคอร์สเรียน
                </div>

                {/* Step 1: จอง */}
                <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-4 py-3.5 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">✓</div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">จองสิทธิ์เริ่มต้นเพียง</div>
                    <div className="text-3xl font-black text-primary italic leading-tight">
                      ฿{(course as any).depositAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium text-right leading-tight">
                    โอนมัดจำ<br/>ล็อคที่นั่ง
                  </div>
                </div>

                {/* Total line */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-neutral-400 font-medium">ราคารวมตลอดหลักสูตร</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-neutral-800 italic">฿{course.price.toLocaleString()}</span>
                    {course.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">฿{course.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {(course as any).lastChanceNote && (
                  <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                    <span className="animate-pulse text-base">🔥</span>
                    <span className="text-xs font-extrabold text-red-600 leading-snug">
                      {(course as any).lastChanceNote}
                    </span>
                  </div>
                )}
                {(course as any).upgradePromo && (
                  <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-2xl text-left">
                    <div className="text-xs font-black text-primary mb-1 flex items-center gap-1">
                      <span>✨ สิทธิ์อัปเกรดพิเศษ:</span>
                    </div>
                    <p className="text-xs font-bold text-neutral-800 leading-normal">
                      {(course as any).upgradePromo}
                    </p>
                  </div>
                )}
                {(course as any).installmentPromo && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-left">
                    <div className="text-xs font-black text-amber-700 mb-1 flex items-center gap-1">
                      <span>💳 หรือผ่อนบัตรเครดิต:</span>
                    </div>
                    <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                      {(course as any).installmentPromo}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* ── Original single-price display ── */
              <div className="text-center pb-6 border-b border-neutral-100">
                <div className="text-sm text-neutral-500 mb-2 font-medium uppercase tracking-wider">
                  ราคาคอร์สเรียน
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-primary italic">
                      ฿{course.price.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-neutral-400 font-medium line-through italic">
                        ฿{course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {(course as any).lastChanceNote && (
                    <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                      <span className="animate-pulse text-base">🔥</span>
                      <span className="text-xs font-extrabold text-red-600 leading-snug">
                        {(course as any).lastChanceNote}
                      </span>
                    </div>
                  )}
                  {(course as any).upgradePromo && (
                    <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-2xl text-left">
                      <div className="text-xs font-black text-primary mb-1 flex items-center gap-1">
                        <span>✨ สิทธิ์อัปเกรดพิเศษ:</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-800 leading-normal">
                        {(course as any).upgradePromo}
                      </p>
                    </div>
                  )}
                  {(course as any).installmentPromo && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-left">
                      <div className="text-xs font-black text-amber-700 mb-1 flex items-center gap-1">
                        <span>💳 โปรโมชันผ่อนชำระ:</span>
                      </div>
                      <p className="text-xs font-bold text-neutral-800 leading-relaxed">
                        {(course as any).installmentPromo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              {(course as any).isClosed ? (
                <>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-left">
                    <div className="text-sm font-black text-red-600 mb-1 flex items-center gap-1.5">
                      <span>🚫 ปิดรับสมัครแล้ว:</span>
                    </div>
                    <p className="text-xs font-bold text-neutral-800 leading-normal">
                      คอร์สเรียนรอบนี้ปิดรับลงทะเบียนสมัครเรียนเรียบร้อยแล้ว หากท่านสนใจหลักสูตรนี้ สามารถแอดไลน์เพื่อติดต่อสอบถามข้อมูลรายละเอียดเพิ่มเติมหรือขอคำแนะนำได้ทันที
                    </p>
                  </div>
                  <LineCTA
                    courseTitle={`${course.title} (ปิดรับสมัครแล้ว)`}
                    type="enquiry"
                    className="flex items-center justify-center gap-3 w-full bg-[#06C755] hover:bg-[#05b64e] text-white font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-95 text-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mr-3"
                    >
                      <path d="M24 10.304c0-5.231-5.385-9.488-12-9.488S0 5.073 0 10.304c0 4.689 4.272 8.599 10.046 9.351.39.085.922.258 1.183.59.27.345.176.883.085 1.231l-.37 2.228c-.114.675-.552 2.642.238 1.444.789-1.198 4.264-5.022 5.819-6.889.117-.142.193-.263.26-.364C21.034 16.96 24 13.91 24 10.304zm-14.489 2.503h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485V11.83h1.415c.267 0 .485.218.485.485v.2c0 .267-.218.291-.485.291zm2.349 0c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485s.485.218.485.485v3.79c0 .267-.218.485-.485.485zm4.832 0h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.214.137-.406.34-.47.202-.065.424-.005.565.148l2.052 2.235V8.532c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485v3.79c0 .214-.137.406-.34.47-.202.065-.424.005-.565-.148l-2.052-2.235v1.895c0 .267-.218.485-.485.485zm4.298 0h-2.112c-.267 0-.485-.218-.485-.485V8.532c0-.267.218-.485.485-.485h2.112c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627V9.75h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627v.883h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485z" />
                    </svg>
                    สอบถามรายละเอียดเพิ่มเติม (LINE)
                  </LineCTA>
                </>
              ) : (
                <>
                  {(course as any).startDate && (
                    <CourseCountdown
                      startDate={(course as any).startDate}
                      startMonth={course.startMonth ?? ""}
                    />
                  )}
                  <LineCTA
                    courseTitle={course.title}
                    type="enroll"
                    className="flex items-center justify-center gap-3 w-full bg-[#06C755] hover:bg-[#05b64e] text-white font-bold py-5 rounded-2xl shadow-lg transition-all active:scale-95 text-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 mr-3"
                    >
                      <path d="M24 10.304c0-5.231-5.385-9.488-12-9.488S0 5.073 0 10.304c0 4.689 4.272 8.599 10.046 9.351.39.085.922.258 1.183.59.27.345.176.883.085 1.231l-.37 2.228c-.114.675-.552 2.642.238 1.444.789-1.198 4.264-5.022 5.819-6.889.117-.142.193-.263.26-.364C21.034 16.96 24 13.91 24 10.304zm-14.489 2.503h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485V11.83h1.415c.267 0 .485.218.485.485v.2c0 .267-.218.291-.485.291zm2.349 0c-.267 0-.485-.218-.485-.485v-3.79c0-.267.218-.485.485-.485s.485.218.485.485v3.79c0 .267-.218.485-.485.485zm4.832 0h-2.1c-.267 0-.485-.218-.485-.485v-3.79c0-.214.137-.406.34-.47.202-.065.424-.005.565.148l2.052 2.235V8.532c0-.267.218-.485.485-.485h.2c.267 0 .485.218.485.485v.379c0 .214-.137.406-.34.47-.202.065-.424.005-.565-.148l-2.052-2.235v1.895c0 .267-.218.485-.485.485zm4.298 0h-2.112c-.267 0-.485-.218-.485-.485V8.532c0-.267.218-.485.485-.485h2.112c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627V9.75h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485h-1.627v.883h1.627c.267 0 .485.218.485.485v.2c0 .267-.218.485-.485.485z" />
                    </svg>
                    สมัครเรียนเลยวันนี้
                  </LineCTA>
                </>
              )}
              {!(course as any).isClosed && (
                <LineCTA
                  courseTitle={course.title}
                  type="enquiry"
                  className="flex items-center justify-center gap-3 w-full bg-white hover:bg-neutral-50 text-[#06C755] border-2 border-[#06C755] font-bold py-5 rounded-2xl transition-all text-lg"
                >
                  สอบถามรายละเอียดเพิ่มเติม
                </LineCTA>
              )}
            </div>

            {/* Professional Bundle Card */}
            {(course as any).bundle && !(course as any).isClosed && (
              <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-neutral-50 via-primary/5 to-accent/5 p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-accent text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Bundle Offer ⚡
                </div>

                <h4 className="text-base font-extrabold text-neutral-900 pr-16 leading-tight italic">
                  {(course as any).bundle.title}
                </h4>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xs text-neutral-500 font-medium">
                    {(course as any).bundle.upgradePrice ? "เพิ่มเพียง" : "ราคารวมเพียง"}
                  </span>
                  <span className="text-3xl font-black text-primary italic">
                    ฿{((course as any).bundle.price || (course as any).bundle.upgradePrice).toLocaleString()}
                  </span>
                  {(course as any).bundle.originalValue && (
                    <span className="text-xs text-neutral-400 line-through">
                      มูลค่า ฿
                      {(course as any).bundle.originalValue.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-100/80">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide mb-2">
                    รับสิทธิ์เข้าถึง:
                  </div>
                  <div className="text-sm font-extrabold text-neutral-900 flex items-center gap-1.5 mb-3 italic">
                    <span className="text-lg">🎓</span>
                    {(course as any).bundle.includedCourse}
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-600">
                    {(course as any).bundle.features.map(
                      (feature: string, idx: number) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-primary font-bold">•</span>
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {(course as any).bundle.note && (
                  <p className="mt-3 text-[10px] text-neutral-400 italic">
                    * {(course as any).bundle.note}
                  </p>
                )}

                <div className="mt-5">
                  <LineCTA
                    courseTitle={(course as any).bundle.title}
                    type="enroll"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-accent hover:from-primary/95 hover:to-accent/95 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-sm"
                  >
                    สมัครเรียนแบบ Bundle
                  </LineCTA>
                </div>
              </div>
            )}

            {/* Special Gift / Pre-bootcamp prep course */}
            {(course as any).gift && !(course as any).isClosed && (
              <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-amber-100/10 p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  {(course as any).gift.badge || "Special Bonus 🎁"}
                </div>

                <h4 className="text-base font-extrabold text-neutral-900 pr-16 leading-tight italic flex items-center gap-1.5">
                  <span className="text-xl">🎁</span>{" "}
                  {(course as any).gift.title}
                </h4>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-600 italic">
                    ฟรี!
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    มูลค่า ฿{(course as any).gift.value.toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-200">
                  <ul className="space-y-2.5 text-xs text-neutral-700">
                    {(course as any).gift.features.map(
                      (feature: string, idx: number) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-amber-500 font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="font-semibold">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            )}

            <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-bold text-accent">
                  สิทธิพิเศษสำหรับคุณ
                </span>
              </div>
              <ul className="space-y-3 text-sm text-neutral-600">
                {(course as any).upgradePromo && (
                  <li className="flex gap-2 text-primary font-bold">
                    <span className="text-primary font-bold">✨</span>
                    <span>{(course as any).upgradePromo}</span>
                  </li>
                )}
                {course.type !== "Online" &&
                  course.type !== "Workshop" &&
                  course.type !== "Live Streaming Workshop" &&
                  !(course as any).hideInstallment3Months && (
                    <li className="flex gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>ผ่อนชำระ 0% นานสูงสุด 3 เดือน</span>
                    </li>
                  )}
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>ผ่อนผ่านบัตรเครดิตสูงสุด 10 เดือน (Charge 3%)</span>
                </li>
                {!(course as any).hideExclusiveCommunity && (
                  <li className="flex gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span>
                      เข้าถึง Exclusive Community (ห้องเรียนเฉพาะรุ่น &
                      พื้นที่ส่วนกลางพบปะทุกรุ่น)
                    </span>
                  </li>
                )}
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>รับชมวิดีโอบันทึกการสอนย้อนหลังได้นานถึง 1 ปี</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Student Showcase Preview */}
      <ShowcaseSection />

      <div className="mt-16 pt-8 border-t border-neutral-100 flex justify-center">
        <Link
          href="/courses/"
          className="inline-flex items-center px-6 py-3 rounded-2xl bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white font-bold transition-all"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          กลับไปดูคอร์สทั้งหมด
        </Link>
      </div>
    </div>
  );
}
