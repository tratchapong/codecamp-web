import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  createPost,
  deletePost,
  getPostByParam,
  getPosts,
  updatePost,
} from "@/lib/db";

// Helper to safely delete an uploaded image from public directory
function removeUploadedImageFile(imageUrl?: string | null) {
  if (!imageUrl || typeof imageUrl !== "string") return;

  // Only delete files uploaded inside /uploads/blog/images/upload-
  // Do not delete legacy seed images like post-371.webp or external images
  if (imageUrl.startsWith("/uploads/blog/images/upload-")) {
    try {
      const relativePath = imageUrl.replace(/^\/+/, "");
      const fullPath = path.resolve(process.cwd(), "public", relativePath);
      const uploadsDir = path.resolve(
        process.cwd(),
        "public",
        "uploads",
        "blog",
        "images",
      );

      if (fullPath.startsWith(uploadsDir) && fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (err) {
      console.error(`Failed to unlink image ${imageUrl}:`, err);
    }
  }
}

// Helper to extract uploaded image urls from content HTML
function extractContentImageUrls(content?: string | null): string[] {
  if (!content) return [];
  const urls: string[] = [];
  const imgRegex =
    /<img[^>]+src=["'](\/uploads\/blog\/images\/upload-[^"']+)["']/g;
  let match: RegExpExecArray | null = null;
  while (true) {
    match = imgRegex.exec(content);
    if (!match) break;
    if (match[1]) {
      urls.push(match[1]);
    }
  }
  return urls;
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0", 10);

    if (!id) {
      return NextResponse.json({ error: "Missing post id" }, { status: 400 });
    }

    // Find the post first to retrieve its images
    const post = getPostByParam(String(id));

    const success = deletePost(id);
    if (!success) {
      return NextResponse.json(
        { error: "Post not found or already deleted" },
        { status: 404 },
      );
    }

    // Clean up physical image files from disk
    if (post) {
      // 1. Featured image
      removeUploadedImageFile(post.featured_image);

      // 2. Images inserted inside article content
      const contentImages = extractContentImageUrls(post.content);
      for (const imgUrl of contentImages) {
        removeUploadedImageFile(imgUrl);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete post", details: error.message },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "50", 10);

    const result = getPosts({ page, perPage, search });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author_name,
      featured_image,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "กรุณาระบุชื่อบทความ (Title)" },
        { status: 400 },
      );
    }

    const post = createPost({
      title: title.trim(),
      slug: slug || title.trim(),
      excerpt: excerpt || "",
      content: content || "",
      category: category || "Education",
      author_name: author_name || "Yu Dev",
      author_avatar: "/uploads/blog/authors/author-yu-dev.webp",
      featured_image: featured_image || null,
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post", details: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      slug,
      excerpt,
      content,
      category,
      author_name,
      featured_image,
    } = body;

    const numericId = parseInt(id, 10);
    if (!numericId) {
      return NextResponse.json(
        { error: "Missing or invalid post id" },
        { status: 400 },
      );
    }

    if (title !== undefined && !title.trim()) {
      return NextResponse.json(
        { error: "ชื่อบทความต้องไม่เป็นค่าว่าง" },
        { status: 400 },
      );
    }

    const updatedPost = updatePost(numericId, {
      title: title ? title.trim() : undefined,
      slug: slug ? slug.trim() : undefined,
      excerpt,
      content,
      category,
      author_name,
      featured_image,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { error: "ไม่พบบทความที่ต้องการแก้ไข" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post", details: error.message },
      { status: 500 },
    );
  }
}
