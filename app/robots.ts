import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const readers = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/account" },
      { userAgent: readers, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: "/account" }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: "noria-cars.com"
  };
}
