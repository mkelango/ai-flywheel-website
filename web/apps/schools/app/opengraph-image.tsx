import { ImageResponse } from "next/og";

export const alt = "AI Flywheel at Schools: Make it. Question it. Share it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ARCS = ["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"];
const C = 2 * Math.PI * 40;
const SEG = C / 4;

/** Site-wide share image: the wheel, the name and the tagline. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: 80, background: "#FFF7E8", color: "#1E2A44" }}>
        <svg width="260" height="260" viewBox="0 0 100 100">
          {ARCS.map((color, i) => (
            <circle key={color} cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${SEG - 7} ${C - SEG + 7}`} strokeDashoffset={-i * SEG} transform="rotate(-90 50 50)" />
          ))}
          <circle cx="50" cy="50" r="13" fill="#D9542A" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>AI Flywheel at Schools</div>
          <div style={{ marginTop: 20, fontSize: 40, color: "#4A5670" }}>Make it. Question it. Share it.</div>
          <div style={{ marginTop: 36, fontSize: 28, color: "#4A5670" }}>Classes 1–12 · CBSE, ICSE, State Board · Tamil and English</div>
        </div>
      </div>
    ),
    size,
  );
}
