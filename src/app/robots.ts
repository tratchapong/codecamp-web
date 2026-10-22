import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://getcodecamp.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/ta-station",
          "/ta-station/",
          "/api/",
          "/cc24",
          "/cc24/",
          "/*?",
        ],
      },
      // Explicitly welcome major AI / LLM search crawlers for AEO (Answer Engine Optimization)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot",
          "Google-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: [
          "/ta-station",
          "/ta-station/",
          "/api/",
          "/cc24",
          "/cc24/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
