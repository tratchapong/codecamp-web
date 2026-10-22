// biome-ignore-all lint: blog-client-list
"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/db";

export default function BlogListClient({
  initialPosts,
  initialTotal = 0,
}: {
  initialPosts: BlogPost[];
  initialTotal?: number;
}) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialPosts.length >= 9 && initialPosts.length < initialTotal,
  );

  // loadingRef to prevent race conditions & double calls in scroll events
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = useCallback(async (pageNum: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs?page=${pageNum}&per_page=9`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      const newPosts: BlogPost[] = data.posts || [];

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const filtered = newPosts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...filtered];
        });

        if (pageNum >= (data.totalPages || 1) || newPosts.length < 9) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchPosts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, loading, fetchPosts]);

  // Helper to format date nicely
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

  // Helper to get clean text without HTML tags for excerpts
  const cleanExcerpt = (htmlStr: string) => {
    if (!htmlStr) return "";
    const clean = htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
    return clean.length > 150 ? `${clean.substring(0, 150)}...` : clean;
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {posts.map((post) => {
          const imageUrl = post.featured_image;
          const category = post.category || "บทความทั่วไป";
          const authorName = post.author_name || "CodeCamp Editor";
          const authorAvatar = post.author_avatar;
          const postHref = `/blog/${post.slug || post.id}/`;

          return (
            <Link
              key={post.id}
              href={postHref}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:ring-2 hover:ring-primary/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
            >
              {/* Featured Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src && !target.src.includes("getcodecamp.com")) {
                        const path = target.src.replace(/^https?:\/\/[^/]+/, "");
                        target.src = `https://getcodecamp.com${path.startsWith("/") ? path : `/${path}`}`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center p-6 text-center">
                    <span className="text-white font-bold text-sm line-clamp-3">
                      {post.title}
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-xs">
                    {category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-neutral-400 font-medium mb-2">
                  {formatDate(post.date)}
                </div>

                <h2 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3 mb-6">
                  {cleanExcerpt(post.excerpt)}
                </p>

                {/* Read More Button (Author hidden) */}
                <div className="flex items-center justify-end pt-4 border-t border-neutral-50 mt-auto">
                  <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    อ่านเพิ่มเติม <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Skeletons while loading page > 1 */}
        {loading &&
          [1, 2, 3].map((num) => (
            <div
              key={`skeleton-${num}`}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm p-6 space-y-4 animate-pulse"
            >
              <div className="aspect-[3/4] bg-neutral-200 rounded-xl w-full" />
              <div className="h-4 bg-neutral-200 rounded w-1/4" />
              <div className="h-6 bg-neutral-200 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-full" />
                <div className="h-4 bg-neutral-200 rounded w-5/6" />
              </div>
              <div className="flex items-center justify-end pt-4 border-t border-neutral-50">
                <div className="h-3 bg-neutral-200 rounded w-1/4" />
              </div>
            </div>
          ))}
      </div>

      {/* Infinite scroll trigger sentinel */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center items-center mt-12 py-6"
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-neutral-400">
                กำลังโหลดเพิ่มเติม...
              </span>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}
    </section>
  );
}
