// biome-ignore-all lint: api-uploads-dynamic
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathSegments } = await params;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("File not found", { status: 404 });
    }

    const relativePath = pathSegments.join("/");
    const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");
    const resolvedPath = path.resolve(uploadsRoot, relativePath);

    // Guard against path traversal
    if (!resolvedPath.startsWith(uploadsRoot)) {
      return new NextResponse("File not found", { status: 404 });
    }

    if (!fs.existsSync(resolvedPath)) {
      // Fallback: If not found locally (e.g. running on localhost), fetch from production getcodecamp.com
      try {
        const prodUrl = `https://getcodecamp.com/uploads/${relativePath}`;
        const prodRes = await fetch(prodUrl);
        if (prodRes.ok) {
          const contentType = prodRes.headers.get("content-type") || "image/webp";
          const arrayBuffer = await prodRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Cache locally in public/uploads so subsequent requests are served directly
          try {
            fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
            fs.writeFileSync(resolvedPath, buffer);
          } catch (writeErr) {
            console.warn("Could not cache file locally:", writeErr);
          }

          return new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Content-Length": String(buffer.length),
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (fetchErr) {
        console.warn("Failed to fetch image from production:", fetchErr);
      }

      return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      return new NextResponse("Not a file", { status: 404 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".webp": "image/webp",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".avif": "image/avif",
    };

    const contentType = mimeMap[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(resolvedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
