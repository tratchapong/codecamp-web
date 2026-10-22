// biome-ignore-all lint: api-ta-station-upload
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "blog", "images");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "กรุณาเลือกไฟล์รูปภาพ" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "รองรับเฉพาะไฟล์รูปภาพเท่านั้น (JPG, PNG, WebP)" },
        { status: 400 }
      );
    }

    fs.mkdirSync(UPLOADS_DIR, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const originalSize = buffer.length;

    // Generate unique filename for WebP output
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const safeBaseName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .substring(0, 30);
    const filename = `upload-${timestamp}-${safeBaseName || "img"}-${randomSuffix}.webp`;
    const destPath = path.join(UPLOADS_DIR, filename);

    // Optimize and convert to WebP using sharp
    // Resize down if wider than 1280px, quality 80 for optimal compression & fidelity
    await sharp(buffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(destPath);

    const optimizedSize = fs.statSync(destPath).size;
    const savedBytes = Math.max(0, originalSize - optimizedSize);
    const savedPercent = originalSize > 0 ? Math.round((savedBytes / originalSize) * 100) : 0;

    const publicUrl = `/uploads/blog/images/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      originalSize,
      optimizedSize,
      savedPercent,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ" },
      { status: 500 }
    );
  }
}
