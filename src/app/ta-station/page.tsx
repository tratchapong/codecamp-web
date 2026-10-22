// biome-ignore-all lint: ta-station-management
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/db";

export default function TaStationPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab (Default to list)
  const [activeTab, setActiveTab] = useState<"create" | "list">("list");

  // Toast Notification State
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; type: "success" | "error" | "info" }>
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Post Form State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Education");
  const [authorName, setAuthorName] = useState("Yu Dev");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [localPreview, setLocalPreview] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageStats, setImageStats] = useState<{
    originalSize?: number;
    optimizedSize?: number;
    savedPercent?: number;
    filename?: string;
  } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Content Editor & Live Preview State
  const [contentView, setContentView] = useState<"write" | "preview" | "split">(
    "write",
  );
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const contentFileInputRef = useRef<HTMLInputElement | null>(null);

  // Submitting Post State
  const [submitting, setSubmitting] = useState(false);
  const [successPost, setSuccessPost] = useState<BlogPost | null>(null);
  const [formError, setFormError] = useState("");

  // Post List State & Infinite Scroll
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/ta-station/auth");
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch posts when viewing list tab
  useEffect(() => {
    if (isAuthenticated && activeTab === "list") {
      loadPosts();
    }
  }, [isAuthenticated, activeTab]);

  // Fetch first page of posts
  const loadPosts = useCallback(
    async (search = searchQuery) => {
      setLoadingPosts(true);
      setPage(1);
      try {
        const res = await fetch(
          `/api/ta-station/posts?search=${encodeURIComponent(search)}&page=1&per_page=15`,
        );
        const data = await res.json();
        const initialList = data.posts || [];
        setPosts(initialList);
        setTotalPosts(data.total || 0);
        setHasMore(initialList.length < (data.total || 0));
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    },
    [searchQuery],
  );

  // Load next page on scroll
  const loadMorePosts = useCallback(async () => {
    if (loadingMoreRef.current || !hasMore || loadingPosts) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);

    const nextPage = page + 1;
    try {
      const res = await fetch(
        `/api/ta-station/posts?search=${encodeURIComponent(searchQuery)}&page=${nextPage}&per_page=15`,
      );
      const data = await res.json();
      const newItems: BlogPost[] = data.posts || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const filtered = newItems.filter((p) => !existingIds.has(p.id));
          return [...prev, ...filtered];
        });
        setPage(nextPage);
        if (nextPage >= (data.totalPages || 1) || newItems.length < 15) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error loading more posts:", err);
      setHasMore(false);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [hasMore, loadingPosts, page, searchQuery]);

  // Infinite scroll intersection observer
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || activeTab !== "list") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, activeTab, loadMorePosts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/ta-station/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบรหัสผ่าน");
      }
    } catch (err: any) {
      setLoginError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/ta-station/auth", { method: "DELETE" });
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Image Upload with Instant Preview & WebP conversion
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview for immediate visual feedback
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    setUploadingImage(true);
    setUploadError("");
    setImageStats(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/ta-station/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeaturedImage(data.url);
        setImageStats({
          originalSize: data.originalSize,
          optimizedSize: data.optimizedSize,
          savedPercent: data.savedPercent,
          filename: data.filename,
        });
        showToast("อัปโหลดและบีบอัดรูปภาพสำเร็จ", "success");
      } else {
        setUploadError(data.error || "อัปโหลดรูปภาพล้มเหลว");
        showToast(data.error || "อัปโหลดรูปภาพล้มเหลว", "error");
      }
    } catch (err: any) {
      setUploadError(err.message || "เกิดข้อผิดพลาดขณะอัปโหลด");
      showToast("เกิดข้อผิดพลาดขณะอัปโหลดรูปภาพ", "error");
    } finally {
      setUploadingImage(false);
      // Reset input value so re-uploading the same file works
      e.target.value = "";
    }
  };

  // Remove featured image
  const handleRemoveFeaturedImage = () => {
    setFeaturedImage("");
    setLocalPreview("");
    setImageStats(null);
    setUploadError("");
  };

  // Helper to insert formatting tags or markdown into content textarea
  const insertFormatting = (prefix: string, suffix = "", defaultText = "") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) {
      setContent((prev) => prev + prefix + defaultText + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const insertText = selectedText || defaultText;
    const replacement = prefix + insertText + suffix;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Keep focus and position cursor nicely
    setTimeout(() => {
      textarea.focus();
      const selectionStartPos = selectedText ? start : start + prefix.length;
      const selectionEndPos = selectedText
        ? start + replacement.length
        : selectionStartPos + insertText.length;
      textarea.setSelectionRange(selectionStartPos, selectionEndPos);
    }, 10);
  };

  // Insert Link dialog
  const handleInsertLink = () => {
    const textarea = contentTextareaRef.current;
    const selectedText = textarea
      ? content.substring(textarea.selectionStart, textarea.selectionEnd)
      : "";
    const url = window.prompt(
      "ระบุ URL ปลายทาง (เช่น https://example.com):",
      "https://",
    );
    if (!url || url === "https://") return;

    const linkText =
      selectedText || window.prompt("ระบุข้อความลิงก์ (Text):", "คลิกที่นี่") || url;
    insertFormatting(
      `<a href="${url}" target="_blank" rel="noopener noreferrer">`,
      "</a>",
      linkText,
    );
  };

  // Insert Direct Image URL dialog
  const handleInsertImageUrl = () => {
    const url = window.prompt("ระบุ URL ของรูปภาพ (Image URL):", "https://");
    if (!url || url === "https://") return;
    const alt =
      window.prompt("คำอธิบายรูปภาพ (Alt Text):", "รูปภาพประกอบเนื้อหา") || "รูปภาพ";
    insertFormatting(
      `\n<img src="${url}" alt="${alt}" class="rounded-2xl my-6 mx-auto w-full max-w-2xl shadow-md" />\n`,
    );
  };

  // Upload image and insert directly into content
  const handleContentImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContentImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/ta-station/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const imageTag = `\n<img src="${data.url}" alt="ภาพประกอบเนื้อหา" class="rounded-2xl my-6 mx-auto w-full max-w-2xl shadow-md" />\n`;
        insertFormatting(imageTag, "", "");
        showToast("แทรกรูปภาพลงในเนื้อหาเรียบร้อยแล้ว", "success");
      } else {
        showToast(data.error || "ไม่สามารถอัปโหลดรูปภาพได้", "error");
      }
    } catch (err: any) {
      showToast("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ", "error");
    } finally {
      setUploadingContentImage(false);
      e.target.value = "";
    }
  };

  // Helper to convert title to slug
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\u0E00-\u0E7F\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle title change and auto generate slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      setSlug(slugify(val));
    }
  };

  // Start editing existing post
  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category || "Education");
    setAuthorName(post.author_name || "Yu Dev");
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setFeaturedImage(post.featured_image || "");
    setLocalPreview("");
    setShowUrlInput(
      Boolean(
        post.featured_image && !post.featured_image.startsWith("/uploads/"),
      ),
    );
    setImageStats(null);
    setSuccessPost(null);
    setFormError("");
    setActiveTab("create");
    setContentView("write");
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setCategory("Education");
    setAuthorName("Yu Dev");
    setExcerpt("");
    setContent("");
    setFeaturedImage("");
    setLocalPreview("");
    setShowUrlInput(false);
    setImageStats(null);
    setFormError("");
    setSuccessPost(null);
    setActiveTab("list");
  };

  // Submit post (Create or Update)
  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessPost(null);

    if (!title.trim()) {
      setFormError("กรุณาระบุชื่อบทความ (Title)");
      return;
    }

    setSubmitting(true);
    try {
      const isEditing = Boolean(editingPost);
      const url = "/api/ta-station/posts";
      const method = isEditing ? "PUT" : "POST";

      const payload: any = {
        title,
        slug: slug || title,
        category,
        author_name: authorName,
        excerpt,
        content,
        featured_image: featuredImage,
      };

      if (isEditing && editingPost) {
        payload.id = editingPost.id;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          isEditing ? "บันทึกการแก้ไขเรียบร้อย" : "บันทึกบทความเรียบร้อย",
          "success",
        );
        setSuccessPost(data.post);
        setEditingPost(null);
        // Reset form
        setTitle("");
        setSlug("");
        setCategory("Education");
        setAuthorName("Yu Dev");
        setExcerpt("");
        setContent("");
        setFeaturedImage("");
        setLocalPreview("");
        setShowUrlInput(false);
        setImageStats(null);
        // Return to article list and refresh
        setActiveTab("list");
        loadPosts();
      } else {
        setFormError(
          data.error || (isEditing ? "ไม่สามารถแก้ไขข่าวได้" : "ไม่สามารถบันทึกข่าวได้"),
        );
      }
    } catch (err: any) {
      setFormError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setSubmitting(false);
    }
  };

  // Execute Delete Post (called by confirmation modal)
  const executeDeletePost = async (post: BlogPost) => {
    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/ta-station/posts?id=${post.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
        setTotalPosts((prev) => Math.max(0, prev - 1));
        showToast(
          `ลบบทความ "${post.title.slice(0, 30)}${post.title.length > 30 ? "..." : ""}" เรียบร้อย`,
          "info",
        );
      } else {
        showToast("ไม่สามารถลบบทความได้", "error");
      }
    } catch (err) {
      showToast("เกิดข้อผิดพลาดขณะลบบทความ", "error");
    } finally {
      setDeletingId(null);
      setPostToDelete(null);
    }
  };

  // Format file size
  const formatBytes = (bytes?: number) => {
    if (!bytes) return "0 KB";
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. LOGIN SCREEN (Bright & Warm Theme)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-orange-50/60 via-amber-50/20 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-orange-500/5">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/25 mx-auto mb-4">
              TA
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              TA Station
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              ระบบจัดการข่าวสารและบทความ CodeCamp Thailand
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl mb-5 text-center font-medium">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                ชื่อผู้ใช้งาน (Username)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                placeholder="ชื่อผู้ใช้งาน"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                รหัสผ่าน (Password)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                placeholder="รหัสผ่าน"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:brightness-105 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                "เข้าสู่ระบบ TA Station"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/blog/"
              className="text-xs text-slate-400 hover:text-primary transition-colors font-medium"
            >
              ← กลับไปหน้าบล็อกทั่วไป
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD / MANAGEMENT STATION
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20 border-t border-slate-200">
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border transform transition-all duration-150 ease-out animate-[slide-in_0.15s_ease-out] backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-900/95 border-emerald-500/60 text-white shadow-emerald-500/20"
                : toast.type === "error"
                  ? "bg-rose-900/95 border-rose-500/60 text-white shadow-rose-500/20"
                  : "bg-slate-900/95 border-slate-700 text-white shadow-slate-900/40"
            }`}
          >
            <span className="text-base">
              {toast.type === "success"
                ? "✅"
                : toast.type === "error"
                  ? "⚠️"
                  : "🗑️"}
            </span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* TA Station Sub-Header / Warm Brand Admin Bar */}
      <div className="bg-gradient-to-r from-orange-50/80 via-amber-50/40 to-white border-y border-orange-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20">
              TA
            </div>
            <div>
              <h1 className="font-black text-lg text-slate-900 leading-tight">
                TA Station
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                ระบบจัดการข่าวสารและเนื้อหาบทความ CodeCamp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/blog/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold px-4 py-2 bg-white hover:bg-orange-50/50 text-slate-700 hover:text-orange-600 rounded-xl border border-slate-200/90 shadow-xs hover:border-orange-300 transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5"
            >
              ดูหน้าบล็อกหลัก ↗
            </a>
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-4 py-2 bg-red-50/80 hover:bg-red-500 text-red-600 hover:text-white rounded-xl border border-red-200/60 hover:border-red-500 transition-all cursor-pointer hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* Navigation / Back Button when editing or creating */}
        {activeTab === "create" && (
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                handleCancelEdit();
                setActiveTab("list");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-sm hover:-translate-y-0.5 active:scale-95"
            >
              <span>←</span> กลับไปหน้ารายการบทความ
            </button>
          </div>
        )}

        {/* TAB 1: CREATE OR EDIT ARTICLE */}
        {activeTab === "create" && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
            <div className="mb-8 pb-6 border-b border-slate-100">
              {editingPost ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-bold rounded-full mb-2">
                      ✏️ โหมดแก้ไขบทความ (ID: {editingPost.id})
                    </span>
                    <h2 className="text-2xl font-black text-slate-900">
                      แก้ไขบทความ
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      กำลังแก้ไข:{" "}
                      <span className="font-semibold text-slate-700">
                        &ldquo;{editingPost.title}&rdquo;
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleCancelEdit();
                      setActiveTab("list");
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
                  >
                    ✕ ยกเลิกการแก้ไข
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-slate-900">
                    เพิ่มข่าวสาร / บทความใหม่
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    กรอกข้อมูลเนื้อหาข่าวและอัปโหลดรูปภาพ ระบบจะทำการแปลงเป็น .webp
                    เพื่อประหยัดพื้นที่ให้อัตโนมัติ
                  </p>
                </>
              )}
            </div>

            {/* Form Error Banner */}
            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleSubmitPost} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  หัวข้อข่าว / ชื่อบทความ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="เช่น เปิดตัวคอร์สเรียน Full-Stack Web Development รุ่นใหม่ล่าสุด!"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-semibold"
                />
              </div>

              {/* Hidden Slug (auto generated) */}
              <input type="hidden" value={slug} />

              {/* Category & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    หมวดหมู่ (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                  >
                    <option value="Education">Education</option>
                    <option value="Web Development">Web Development</option>
                    <option value="เทคโนโลยีและ AI">เทคโนโลยีและ AI</option>
                    <option value="ข่าวประชาสัมพันธ์">ข่าวประชาสัมพันธ์</option>
                    <option value="กิจกรรมและเวิร์กช็อป">กิจกรรมและเวิร์กช็อป</option>
                    <option value="บทความทั่วไป">บทความทั่วไป</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    ชื่อผู้เขียน (Author)
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Yu Dev"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                      รูปภาพหน้าปก (Featured Image)
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      ระบบจะแปลงไฟล์เป็น <strong>.webp</strong> อัตโนมัติ
                      พร้อมแสดงตัวอย่างทันที
                    </p>
                  </div>
                  {featuredImage && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full self-start sm:self-auto">
                      ✓ พร้อมใช้งาน
                    </span>
                  )}
                </div>

                {uploadError && (
                  <div className="mb-4 text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 flex items-center justify-between gap-2">
                    <span>⚠️ {uploadError}</span>
                    <button
                      type="button"
                      onClick={() => setUploadError("")}
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image Preview with Instant Feedback */}
                  <div className="w-full sm:w-48 aspect-[3/4] bg-slate-200 rounded-2xl overflow-hidden border border-slate-300 flex items-center justify-center relative flex-shrink-0 shadow-inner group">
                    {localPreview || featuredImage ? (
                      <img
                        src={localPreview || featuredImage}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.src =
                            "/icon/cropped-cc@512-192x192.png";
                        }}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <span className="text-3xl">🖼️</span>
                        <span className="block text-[11px] text-slate-400 mt-1 font-medium">
                          ไม่มีรูปภาพหน้าปก
                        </span>
                      </div>
                    )}

                    {uploadingImage && (
                      <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs gap-2 p-2 text-center">
                        <div className="w-7 h-7 border-3 border-orange-400 border-t-transparent rounded-full animate-spin" />
                        <span className="font-semibold text-[11px]">
                          กำลังบีบอัดเป็น WebP...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls & Stats */}
                  <div className="flex-1 w-full space-y-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-300 rounded-xl cursor-pointer text-xs font-bold text-slate-700 shadow-xs hover:text-primary transition-all">
                        <span>📁 เลือกไฟล์รูปภาพจากเครื่อง</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => setShowUrlInput((prev) => !prev)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          showUrlInput
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white hover:bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        <span>🔗</span>
                        <span>
                          {showUrlInput ? "ซ่อนช่อง URL" : "ใส่ลิงก์รูปตรง"}
                        </span>
                      </button>

                      {(featuredImage || localPreview) && (
                        <button
                          type="button"
                          onClick={handleRemoveFeaturedImage}
                          className="inline-flex items-center gap-1 px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all border border-rose-200 cursor-pointer"
                        >
                          <span>🗑️ ลบรูป</span>
                        </button>
                      )}
                    </div>

                    {/* Direct Image URL input field (collapsible) */}
                    {showUrlInput && (
                      <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 animate-fade-in">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          ระบุลิงก์รูปภาพโดยตรง (Direct Image URL)
                        </label>
                        <input
                          type="text"
                          value={featuredImage}
                          onChange={(e) => {
                            setFeaturedImage(e.target.value);
                            setLocalPreview("");
                          }}
                          placeholder="https://images.unsplash.com/... หรือ /uploads/blog/images/..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-primary focus:bg-white"
                        />
                      </div>
                    )}

                    {imageStats && (
                      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-900 animate-fade-in">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                          <span>✨ ปรับแต่งและแปลงเป็น WebP สำเร็จ!</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-700 font-medium">
                          <div>
                            ขนาดเดิม:{" "}
                            <strong>
                              {formatBytes(imageStats.originalSize)}
                            </strong>
                          </div>
                          <div>
                            ขนาด WebP:{" "}
                            <strong>
                              {formatBytes(imageStats.optimizedSize)}
                            </strong>
                          </div>
                        </div>
                        <div className="text-[11px] font-bold text-emerald-800">
                          🎉 ประหยัดเนื้อที่เซิร์ฟเวอร์ได้ถึง{" "}
                          <strong>{imageStats.savedPercent}%</strong>
                        </div>
                      </div>
                    )}

                    {featuredImage && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono bg-white p-2.5 rounded-lg border border-slate-200 break-all">
                        <span className="font-bold text-slate-400 select-none">
                          URL:
                        </span>
                        <span className="flex-1 select-all">
                          {featuredImage}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(featuredImage);
                            showToast("คัดลอกที่อยู่ไฟล์แล้ว", "info");
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-sans font-bold flex-shrink-0 cursor-pointer"
                        >
                          คัดลอก
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  เนื้อหาย่อ / สรุป (Excerpt)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="เขียนสรุปสั้นๆ 1-2 ประโยค สำหรับแสดงบนการ์ดในหน้ารวมบทความ..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                />
              </div>

              {/* CONTENT WITH FORMATTING TOOLBAR & LIVE PREVIEW */}
              <div className="space-y-2">
                {/* Hidden File Input for Inline Content Image Upload */}
                <input
                  type="file"
                  ref={contentFileInputRef}
                  accept="image/*"
                  onChange={handleContentImageUpload}
                  className="hidden"
                />

                {/* Content Header & View Mode Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    เนื้อหาบทความฉบับเต็ม (Content){" "}
                    <span className="text-red-500">*</span>
                  </label>

                  {/* Mode Toggles */}
                  <div className="flex items-center bg-slate-200/80 p-1 rounded-xl gap-1 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setContentView("write")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        contentView === "write"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span>✏️</span>
                      <span>เขียน (Editor)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentView("preview")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        contentView === "preview"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span>👁️</span>
                      <span>พรีวิวบทความ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentView("split")}
                      className={`hidden lg:flex px-3 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-1.5 ${
                        contentView === "split"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <span>⚡</span>
                      <span>สองฝั่ง (Split)</span>
                    </button>
                  </div>
                </div>

                {/* FORMATTING TOOLBAR (Shown in write & split modes) */}
                {(contentView === "write" || contentView === "split") && (
                  <div className="bg-slate-100/90 border border-slate-200 rounded-xl p-2 flex flex-wrap items-center gap-1 text-xs">
                    {/* Headings */}
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting("<h2>", "</h2>\n", "หัวข้อหลักระดับสอง")
                      }
                      title="หัวข้อหลัก (H2)"
                      className="px-2.5 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-xs cursor-pointer"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting("<h3>", "</h3>\n", "หัวข้อย่อยระดับสาม")
                      }
                      title="หัวข้อย่อย (H3)"
                      className="px-2.5 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-bold text-slate-700 shadow-xs cursor-pointer"
                    >
                      H3
                    </button>

                    <span className="w-px h-5 bg-slate-300 mx-1" />

                    {/* Text Styling */}
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting("<strong>", "</strong>", "ข้อความตัวหนา")
                      }
                      title="ตัวหนา (Bold)"
                      className="px-2.5 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-black text-slate-800 shadow-xs cursor-pointer"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting("<em>", "</em>", "ข้อความตัวเอียง")
                      }
                      title="ตัวเอียง (Italic)"
                      className="px-2.5 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg italic font-semibold text-slate-800 shadow-xs cursor-pointer"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting("<p>", "</p>\n", "ข้อความในย่อหน้าใหม่")
                      }
                      title="ย่อหน้า (Paragraph)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer"
                    >
                      ¶ ย่อหน้า
                    </button>

                    <span className="w-px h-5 bg-slate-300 mx-1" />

                    {/* Lists */}
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "<ul>\n  <li>",
                          "</li>\n  <li>รายการที่สอง</li>\n  <li>รายการที่สาม</li>\n</ul>\n",
                          "รายการแรก",
                        )
                      }
                      title="รายการแบบจุด (Bullet List)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>•</span> รายการ
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "<ol>\n  <li>",
                          "</li>\n  <li>ขั้นตอนที่สอง</li>\n  <li>ขั้นตอนที่สาม</li>\n</ol>\n",
                          "ขั้นตอนแรก",
                        )
                      }
                      title="รายการลำดับตัวเลข (Numbered List)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>1.</span> ลำดับเลข
                    </button>

                    <span className="w-px h-5 bg-slate-300 mx-1" />

                    {/* Blockquote & Callout */}
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "<blockquote>\n  ",
                          "\n</blockquote>\n",
                          "ข้อความอ้างอิงหรือคำคมสำคัญ",
                        )
                      }
                      title="กล่องคำพูด/อ้างอิง (Blockquote)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>“</span> อ้างอิง
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          '<div class="p-4 my-6 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl text-amber-950 font-medium">\n  💡 ',
                          "\n</div>\n",
                          "ข้อความไฮไลต์หรือข้อแนะนำสำหรับผู้อ่าน",
                        )
                      }
                      title="กล่องไฮไลต์ข้อความ (Highlight Box)"
                      className="px-2 py-1.5 bg-white hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>💡</span> ไฮไลต์
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "<pre><code>\n",
                          "\n</code></pre>\n",
                          "// วางตัวอย่างโค้ดที่นี่",
                        )
                      }
                      title="บล็อกโค้ด (Code Block)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-mono text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>&lt;/&gt;</span> โค้ด
                    </button>

                    <span className="w-px h-5 bg-slate-300 mx-1" />

                    {/* Links & Images */}
                    <button
                      type="button"
                      onClick={handleInsertLink}
                      title="แทรกลิงก์ (Hyperlink)"
                      className="px-2.5 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <span>🌐</span> ลิงก์
                    </button>
                    <button
                      type="button"
                      onClick={() => contentFileInputRef.current?.click()}
                      disabled={uploadingContentImage}
                      title="อัปโหลดรูปภาพแล้วแทรกลงในเนื้อหาทันที"
                      className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1 transition-colors"
                    >
                      {uploadingContentImage ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>กำลังอัปโหลด...</span>
                        </>
                      ) : (
                        <>
                          <span>🖼️</span>
                          <span>แทรกรูปภาพ</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertImageUrl}
                      title="ใส่ Image URL ที่มีอยู่แล้วลงในเนื้อหา"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer text-[11px]"
                    >
                      🔗 ใส่ URL รูป
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          '\n<hr class="my-8 border-slate-200" />\n',
                          "",
                        )
                      }
                      title="เส้นคั่นเนื้อหา (Divider)"
                      className="px-2 py-1.5 bg-white hover:bg-orange-50 hover:text-primary hover:border-orange-200 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-xs cursor-pointer text-[11px]"
                    >
                      ― เส้นคั่น
                    </button>
                  </div>
                )}

                {/* EDITOR CONTAINER: Handles Write, Preview, and Split View */}
                {contentView === "write" && (
                  <textarea
                    ref={contentTextareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={14}
                    placeholder="เขียนเนื้อหาบทความที่นี่ สามารถคลิกปุ่มบนแถบเครื่องมือด้านบนเพื่อจัดรูปแบบหัวข้อ ตัวหนา รายการ หรือกดแทรกรูปภาพได้ทันที..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-mono leading-relaxed"
                  />
                )}

                {contentView === "preview" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs min-h-[380px] max-h-[650px] overflow-y-auto">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <span>ตัวอย่างการแสดงผลจริงบนหน้าเว็บ</span>
                      <span className="text-slate-500 font-medium">
                        ความยาวเนื้อหา: {content.length} ตัวอักษร
                      </span>
                    </div>

                    {content.trim() ? (
                      <div
                        className="prose prose-neutral prose-lg max-w-none text-neutral-700 leading-relaxed
                          [&_p]:mb-4 [&_p]:leading-relaxed
                          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:pb-2
                          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-6 [&_h3]:mb-3
                          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
                          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
                          [&_li]:mb-1
                          [&_a]:text-primary [&_a]:underline [&_a]:font-semibold
                          [&_img]:rounded-2xl [&_img]:my-6 [&_img]:mx-auto [&_img]:shadow-md [&_img]:max-w-full
                          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_blockquote]:my-6
                          [&_pre]:bg-neutral-950 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    ) : (
                      <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center">
                        <span className="text-3xl mb-2">📝</span>
                        <p className="text-xs">
                          ยังไม่มีข้อความเนื้อหา สลับกลับไปที่แท็บ &ldquo;เขียน
                          (Editor)&rdquo; เพื่อเริ่มเขียน
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {contentView === "split" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">
                        ฝั่งแก้ไขเนื้อหา (HTML / Text)
                      </div>
                      <textarea
                        ref={contentTextareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={16}
                        placeholder="พิมพ์เนื้อหาที่นี่..."
                        className="w-full h-[480px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all font-mono leading-relaxed resize-none"
                      />
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase flex items-center justify-between">
                        <span>พรีวิวแบบเรียลไทม์ (Live Preview)</span>
                        <span className="text-emerald-600 font-semibold">
                          ● Live
                        </span>
                      </div>
                      <div className="w-full h-[480px] bg-white rounded-xl border border-slate-200 p-5 overflow-y-auto shadow-inner">
                        {content.trim() ? (
                          <div
                            className="prose prose-neutral prose-sm max-w-none text-neutral-700 leading-relaxed
                              [&_p]:mb-3 [&_p]:leading-relaxed
                              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:pb-1.5
                              [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-4 [&_h3]:mb-2
                              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                              [&_a]:text-primary [&_a]:underline [&_a]:font-semibold
                              [&_img]:rounded-xl [&_img]:my-4 [&_img]:mx-auto [&_img]:shadow-sm [&_img]:max-w-full
                              [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-neutral-600 [&_blockquote]:my-4
                              [&_pre]:bg-neutral-950 [&_pre]:text-neutral-100 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:text-xs"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                            พิมพ์เนื้อหาฝั่งซ้าย เพื่อดูตัวอย่างที่นี่
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                {editingPost && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95 text-sm"
                  >
                    ยกเลิก
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 hover:brightness-105 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {editingPost ? "กำลังบันทึกการแก้ไข..." : "กำลังบันทึกบทความ..."}
                    </>
                  ) : editingPost ? (
                    "💾 บันทึกการแก้ไขบทความ"
                  ) : (
                    "🚀 บันทึกและเผยแพร่ข่าว"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: ARTICLE LIST TABLE */}
        {activeTab === "list" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  รายการบทความทั้งหมดในระบบ ({totalPosts} บทความ)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  จัดการ แก้ไข และเผยแพร่ข่าวสารหรือบทความวิชาการ
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleCancelEdit();
                    setActiveTab("create");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="text-sm leading-none">+</span> เพิ่มข่าว /
                  บทความใหม่
                </button>
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      loadPosts(e.target.value);
                    }}
                    placeholder="ค้นหาชื่อบทความ..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {loadingPosts ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span className="text-xs text-slate-400">
                  กำลังโหลดรายการบทความ...
                </span>
              </div>
            ) : posts.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                ไม่พบบทความที่ตรงกับคำค้นหา
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="py-3 px-3">รูปภาพ</th>
                      <th className="py-3 px-3">ชื่อบทความ</th>
                      <th className="py-3 px-3">หมวดหมู่</th>
                      <th className="py-3 px-3">ผู้เขียน</th>
                      <th className="py-3 px-3">วันที่</th>
                      <th className="py-3 px-3 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {posts.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div className="w-12 h-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                            {p.featured_image ? (
                              <img
                                src={p.featured_image}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                                No img
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 max-w-xs font-semibold text-slate-900">
                          <a
                            href={`/blog/${p.slug}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary transition-colors line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: p.title }}
                          />
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {p.id} {p.wp_id ? `(WP: ${p.wp_id})` : ""}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                          {p.author_name}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {p.date ? p.date.substring(0, 10) : "-"}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap text-right space-x-2">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-600 text-amber-600 hover:text-white rounded-lg font-bold transition-all cursor-pointer hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
                          >
                            ✏️ แก้ไข
                          </button>
                          <a
                            href={`/blog/${p.slug}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg font-bold transition-all cursor-pointer hover:shadow-sm hover:-translate-y-0.5 active:scale-95 inline-block"
                          >
                            ดูหน้าเว็บ ↗
                          </a>
                          <button
                            onClick={() => setPostToDelete(p)}
                            disabled={deletingId === p.id}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg font-bold transition-all cursor-pointer hover:shadow-sm hover:-translate-y-0.5 active:scale-95"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Infinite Scroll Trigger Sentinel & Indicator */}
                <div ref={sentinelRef} className="py-6 text-center">
                  {loadingMore && (
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>กำลังโหลดบทความเพิ่มเติม...</span>
                    </div>
                  )}
                  {!hasMore && posts.length > 0 && (
                    <p className="text-xs text-slate-400 font-medium">
                      ✓ แสดงบทความครบทั้งหมดแล้ว ({posts.length} บทความ)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl transition-all duration-150 transform scale-100">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-4">
              🗑️
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">
              ยืนยันการลบบทความ
            </h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              คุณแน่ใจหรือไม่ว่าต้องการลบบทความ{" "}
              <strong className="text-slate-900">
                &ldquo;{postToDelete.title}&rdquo;
              </strong>
              ? การกระทำนี้จะไม่สามารถย้อนกลับได้
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                disabled={deletingId !== null}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer active:scale-95"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => executeDeletePost(postToDelete)}
                disabled={deletingId !== null}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-red-600/25 hover:shadow-red-600/35 active:scale-95 flex items-center gap-2"
              >
                {deletingId === postToDelete.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    กำลังลบ...
                  </>
                ) : (
                  "ยืนยันการลบ"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
