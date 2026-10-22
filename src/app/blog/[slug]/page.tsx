// biome-ignore-all lint: blog-detail
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostByParam } from "@/lib/db";

const formatDate = (dateStr: string) => {
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("th-TH", options);
  } catch {
    return dateStr;
  }
};

const stripHtml = (htmlStr: string) => {
  if (!htmlStr) return "";
  return htmlStr
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…");
};

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostByParam(slug);

  if (!post) {
    return {
      title: "ไม่พบบทความ | CodeCamp Thailand",
    };
  }

  const title = stripHtml(post.title);
  const rawExcerpt = stripHtml(post.excerpt || "");
  const description =
    rawExcerpt.length > 160 ? `${rawExcerpt.substring(0, 157)}...` : rawExcerpt;
  const canonicalUrl = `https://getcodecamp.com/blog/${slug}/`;
  const imageUrl = post.featured_image
    ? post.featured_image.startsWith("http")
      ? post.featured_image
      : `https://getcodecamp.com${post.featured_image}`
    : "https://getcodecamp.com/icon/cropped-cc@512-192x192.png";

  return {
    title: `${title} | CodeCamp Thailand`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | CodeCamp Thailand`,
      description,
      url: canonicalUrl,
      siteName: "CodeCamp Thailand",
      publishedTime: post.date,
      modifiedTime: post.updated_at || post.date,
      authors: [post.author_name || "Yu Dev"],
      section: post.category || "Education",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "th_TH",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CodeCamp Thailand`,
      description,
      images: [imageUrl],
    },
  };
}

// Generate Static Params from SQLite
export async function generateStaticParams() {
  try {
    const posts = getAllSlugs();
    return posts.map((post) => ({
      slug: post.slug || String(post.wp_id || post.id),
    }));
  } catch (error) {
    console.error("Error generating static params from SQLite:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostByParam(slug);

  if (!post) {
    notFound();
  }

  const category = post.category || "บทความทั่วไป";
  const featuredImage = post.featured_image;
  const authorName = post.author_name || "CodeCamp Editor";
  const authorAvatar = post.author_avatar;
  const cleanTitle = stripHtml(post.title);
  const cleanExcerpt = stripHtml(post.excerpt || "");
  const articleUrl = `https://getcodecamp.com/blog/${slug}/`;
  const articleImage = featuredImage
    ? featuredImage.startsWith("http")
      ? featuredImage
      : `https://getcodecamp.com${featuredImage}`
    : "https://getcodecamp.com/icon/cropped-cc@512-192x192.png";

  // Schema.org Structured Data (JSON-LD) for SEO & AEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": articleUrl,
          url: articleUrl,
          name: cleanTitle,
        },
        headline: cleanTitle,
        description: cleanExcerpt || cleanTitle,
        image: [articleImage],
        datePublished: post.date,
        dateModified: post.updated_at || post.date,
        author: {
          "@type": "Person",
          name: authorName,
          ...(authorAvatar && {
            image: authorAvatar.startsWith("http")
              ? authorAvatar
              : `https://getcodecamp.com${authorAvatar}`,
          }),
        },
        publisher: {
          "@type": "Organization",
          name: "CodeCamp Thailand",
          url: "https://getcodecamp.com",
          logo: {
            "@type": "ImageObject",
            url: "https://getcodecamp.com/icon/cropped-cc@512-192x192.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        articleSection: category,
        inLanguage: "th-TH",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "หน้าแรก",
            item: "https://getcodecamp.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "คลังความรู้",
            item: "https://getcodecamp.com/blog/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cleanTitle,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50/50 -mt-10 pt-10 pb-12">
      {/* Schema.org Structured Data (SEO & AEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/blog/"
          className="inline-flex items-center text-sm font-semibold text-neutral-600 hover:text-primary mb-8 transition-all cursor-pointer group hover:-translate-x-1"
        >
          <svg
            className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          กลับหน้าหลักบล็อก
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-neutral-100 shadow-xl overflow-hidden p-6 md:p-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-bold rounded-full">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-4xl font-extrabold text-neutral-900 mb-6 leading-tight"
            dangerouslySetInnerHTML={{
              __html: post.title,
            }}
          />

          {/* Date Metadata (Author hidden) */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold border-b border-neutral-100 pb-4 mb-8">
            <svg
              className="w-4 h-4 text-neutral-400"
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
            <span>เผยแพร่เมื่อ {formatDate(post.date)}</span>
          </div>

          {/* Featured Image (if available) */}
          {featuredImage && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-md max-h-[480px]">
              <img
                src={featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Rich Body Content */}
          <div
            className="prose prose-neutral prose-lg max-w-none text-neutral-700 leading-relaxed
              [&_p]:mb-4 [&_p]:leading-relaxed
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-6 [&_h3]:mb-3
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
              [&_li]:mb-2
              [&_a]:text-primary [&_a]:underline [&_a]:font-semibold
              [&_img]:rounded-2xl [&_img]:my-6 [&_img]:mx-auto
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-500 [&_blockquote]:my-6
              [&_pre]:bg-neutral-950 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          {/* Article Footer */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-100 text-neutral-400 text-xs font-semibold">
            <span>หมวดหมู่: {category}</span>
            <span>CodeCamp Thailand Blog</span>
          </div>
        </article>
      </div>
    </div>
  );
}
