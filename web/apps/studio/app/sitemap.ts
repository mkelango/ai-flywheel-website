import type { MetadataRoute } from "next";
import { AUDIENCES, STUDIOS } from "@/lib/content";
import { UPDATED, abs } from "@/lib/seo";

/** Every indexable page. /sign-in is noindex and stays out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED.iso);
  const paths = ["/", ...STUDIOS.map((s) => s.href), ...AUDIENCES.map((a) => a.href), "/how-it-works", "/architecture", "/security", "/verify", "/roadmap", "/faq", "/early-access"];
  const priority = (p: string) => (p === "/" ? 1 : p === "/agentic" ? 0.9 : ["/how-it-works", "/early-access"].includes(p) ? 0.8 : 0.6);
  return paths.map((p) => ({ url: abs(p), lastModified, changeFrequency: "monthly", priority: priority(p) }));
}
