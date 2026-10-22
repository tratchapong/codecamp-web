import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";
import { getPosts } from "@/lib/db";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "คลังความรู้และข่าวสารล่าสุด | CodeCamp Thailand",
  description:
    "อัปเดตความรู้ด้าน Web Development เทรนด์เทคโนโลยี เคล็ดลับการเขียนโค้ด และข่าวสารสำคัญจาก CodeCamp Thailand เพื่อช่วยให้คุณพัฒนาตัวเองได้อย่างก้าวหน้า",
  alternates: {
    canonical: "https://getcodecamp.com/blog/",
  },
  openGraph: {
    title: "คลังความรู้และข่าวสารล่าสุด | CodeCamp Thailand",
    description:
      "อัปเดตความรู้ด้าน Web Development เทรนด์เทคโนโลยี เคล็ดลับการเขียนโค้ด และข่าวสารสำคัญจาก CodeCamp Thailand",
    url: "https://getcodecamp.com/blog/",
    siteName: "CodeCamp Thailand",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "คลังความรู้และข่าวสารล่าสุด | CodeCamp Thailand",
    description:
      "อัปเดตความรู้ด้าน Web Development เทรนด์เทคโนโลยี เคล็ดลับการเขียนโค้ด และข่าวสารสำคัญจาก CodeCamp Thailand",
  },
};

export default async function BlogPage() {
  const { posts: initialPosts, total } = getPosts({ page: 1, perPage: 9 });

  const blogListingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://getcodecamp.com/blog/#blog",
    "name": "คลังความรู้และข่าวสารล่าสุด CodeCamp Thailand",
    "description":
      "อัปเดตความรู้ด้าน Web Development เทรนด์เทคโนโลยี เคล็ดลับการเขียนโค้ด และข่าวสารสำคัญจาก CodeCamp Thailand",
    "url": "https://getcodecamp.com/blog/",
    "publisher": {
      "@type": "Organization",
      "name": "CodeCamp Thailand",
      "url": "https://getcodecamp.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://getcodecamp.com/icon/cropped-cc@512-192x192.png",
      },
    },
    "inLanguage": "th-TH",
  };

  return (
    <div className="min-h-screen bg-slate-50/50 -mt-10 pt-10 pb-16">
      {/* Schema.org Blog Structured Data for SEO & AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
      />

      <Container size="6xl">
        {/* Header Banner - Bright & Warm CodeCamp Brand Palette */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-white p-8 md:p-12 mb-10 shadow-lg shadow-orange-500/5 border border-orange-200/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-28 -mt-28 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 max-w-2xl animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-600 border border-orange-500/20 text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
              Knowledge & Updates
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              คลังความรู้ <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                และข่าวสารล่าสุด
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              อัปเดตความรู้ด้าน Web Development เทรนด์เทคโนโลยี เคล็ดลับการเขียนโค้ด
              และข่าวสารสำคัญจาก CodeCamp Thailand เพื่อช่วยให้คุณพัฒนาตัวเองได้อย่างก้าวหน้า
            </p>
          </div>
        </section>

        {/* Blog Posts Grid Client component with preloaded initial posts from SQLite */}
        <BlogListClient initialPosts={initialPosts} initialTotal={total} />
      </Container>
    </div>
  );
}
