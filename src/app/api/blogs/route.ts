// biome-ignore-all lint: api-blogs
import { NextResponse } from "next/server";
import { getPosts } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "9", 10);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const result = getPosts({ page, perPage, search, category });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts", details: error.message },
      { status: 500 }
    );
  }
}
