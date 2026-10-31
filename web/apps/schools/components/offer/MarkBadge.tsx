import { useId } from "react";

/** The AI Flywheel School mark: a round badge with the four-stage wheel and the level. Pure SVG. */
const ARCS = ["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"];
const LEVEL_FILL: Record<string, string> = { Aware: "#DCEBFB", Practitioner: "#FFE39A", Builder: "#D3EEEC" };

export function MarkBadge({ level = "Practitioner", year = "2027–28", className }: { level?: "Aware" | "Practitioner" | "Builder"; year?: string; className?: string }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const seg = c / 4;
  const id = `mark${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`AI Flywheel School mark, ${level} level, ${year}`}>
      <defs>
        <path id={`${id}-top`} d="M 30 100 A 70 70 0 0 1 170 100" />
        <path id={`${id}-bot`} d="M 36 108 A 64 64 0 0 0 164 108" />
      </defs>
      {/* scalloped rosette */}
      <g fill={LEVEL_FILL[level]} stroke="var(--ink)" strokeWidth="2">
        <path d={rosette(100, 100, 94, 86, 24)} />
      </g>
      <circle cx="100" cy="100" r="80" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 4" />
      <text fontFamily="var(--font-mono, monospace)" fontSize="10.5" letterSpacing="2.4" fill="var(--ink)" fontWeight="600">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          AI FLYWHEEL SCHOOL
        </textPath>
      </text>
      <text fontFamily="var(--font-mono, monospace)" fontSize="9.5" letterSpacing="2" fill="var(--muted)">
        <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">
          {`RENEWED ${year}`}
        </textPath>
      </text>
      <g transform="rotate(-90 100 92)">
        {ARCS.map((color, i) => (
          <circle key={color} cx="100" cy="92" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${seg - 9} ${c - seg + 9}`} strokeDashoffset={-i * seg} />
        ))}
      </g>
      <circle cx="100" cy="92" r="8" fill="#D9542A" />
      {/* level ribbon */}
      <rect x="54" y="128" width="92" height="24" rx="12" fill="var(--ink)" />
      <text x="100" y="144.5" textAnchor="middle" fontFamily="var(--font-display, sans-serif)" fontSize="12.5" fontWeight="600" fill="var(--bg)">
        {level}
      </text>
    </svg>
  );
}

function rosette(cx: number, cy: number, outer: number, inner: number, points: number) {
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? outer : inner;
    const a = i * step - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)} `;
  }
  return d + "Z";
}
