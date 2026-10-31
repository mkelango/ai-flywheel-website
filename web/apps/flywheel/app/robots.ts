import type { MetadataRoute } from "next";

/** Search and answer-engine crawlers we welcome by name. The search results page is noindex, not blocked. */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: AI_AND_SEARCH_BOTS, allow: "/" }, { userAgent: "*", allow: "/" }],
    sitemap: "https://aiflywheel.in/sitemap.xml",
    host: "https://aiflywheel.in",
  };
}
