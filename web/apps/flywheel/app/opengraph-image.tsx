import { ImageResponse } from "next/og";
import { WHEEL_DATA_URI } from "@/lib/brand-image";

export const alt = "AI Flywheel: Learn it. Build it. Prove it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: 96, background: "#F6F1E8", color: "#0A131F" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={WHEEL_DATA_URI} width={280} height={280} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>AI Flywheel</div>
          <div style={{ marginTop: 20, fontSize: 44, color: "#5B6472" }}>Learn it. Build it. Prove it.</div>
        </div>
      </div>
    ),
    size,
  );
}
