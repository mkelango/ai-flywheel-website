import type { MetadataRoute } from "next";

/** Search and AI answer-engine crawlers are welcome; nothing on this site is behind a login. */
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
    rules: [...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/" })), { userAgent: "*", allow: "/" }],
    sitemap: "https://schools.aiflywheel.in/sitemap.xml",
    host: "https://schools.aiflywheel.in",
  };
}
