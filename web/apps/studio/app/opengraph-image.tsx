import { ImageResponse } from "next/og";

export const alt = "AI Flywheel Studio: Sign in. Start a project.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ARCS = ["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"];
const C = 2 * Math.PI * 40;
const SEG = C / 4;

/** Site-wide share image: the wheel, the name and the tagline, on the dark Studio surface. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 64, padding: 96, background: "#07090d", color: "#eef1f6" }}>
        <svg width="260" height="260" viewBox="0 0 100 100">
          {ARCS.map((color, i) => (
            <circle key={color} cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${SEG - 7} ${C - SEG + 7}`} strokeDashoffset={-i * SEG} transform="rotate(-90 50 50)" />
          ))}
          <circle cx="50" cy="50" r="13" fill="#D9542A" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>AI Flywheel Studio</div>
          <div style={{ marginTop: 20, fontSize: 44, color: "#8b94a5" }}>Sign in. Start a project.</div>
          <div style={{ marginTop: 36, fontSize: 28, color: "#d98b0b" }}>Agentic Studio opens February 2027</div>
        </div>
      </div>
    ),
    size,
  );
}
