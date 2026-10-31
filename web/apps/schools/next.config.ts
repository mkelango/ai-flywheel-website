import type { NextConfig } from "next";
import path from "node:path";

/** Studio is its own product on its own domain: /studio here always goes there. */
const STUDIO_URL = process.env.NEXT_PUBLIC_STUDIO_URL ?? (process.env.NODE_ENV === "production" ? "https://aiflywheel.studio" : "http://localhost:3002");

const dev = process.env.NODE_ENV !== "production";

/** No third-party scripts on a child-facing site: the CSP enforces what the Trust centre promises. */
const CSP = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["@flywheel/ui"],
  turbopack: { root: path.join(__dirname, "../..") },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/studio", destination: `${STUDIO_URL}/`, permanent: true },
      { source: "/studio/:path*", destination: `${STUDIO_URL}/:path*`, permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
