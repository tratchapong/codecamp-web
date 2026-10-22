import type { MetadataRoute } from "next";
import coursesData from "@/data/courses.json";
import { getAllSlugs } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://getcodecamp.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/guide/switch-to-developer/",
    "/courses/",
    "/showcase/",
    "/aboutus/",
    "/blog/",
    "/location/",
    "/manifesto/",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:
      route === ""
        ? 1
        : route === "/courses/"
          ? 0.9
          : 0.8,
  }));

  // Dynamic courses routes
  const courseRoutes: MetadataRoute.Sitemap = coursesData
    .filter((course) => !(course as any).hidden)
    .map((course) => ({
      url: `${baseUrl}/courses/${course.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Dynamic blog routes from local SQLite
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllSlugs();
    blogRoutes = posts.map((post) => {
      const slugParam = post.slug || String(post.wp_id || post.id);
      const modDate =
        post.updated_at || post.date
          ? new Date(post.updated_at || post.date || Date.now())
          : new Date();

      return {
        url: encodeURI(`${baseUrl}/blog/${slugParam}/`),
        lastModified: modDate,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("Error reading blog posts for sitemap from SQLite:", error);
  }

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
