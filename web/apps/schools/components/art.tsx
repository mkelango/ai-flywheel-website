/**
 * Hand-drawn-feeling SVG illustration. No photos of children: hands and work only.
 * Pure server components; motion comes from CSS keyframes in globals.css (reduced-motion safe).
 */

export function Squiggle({ className, color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden fill="none">
      <path d="M2 10c10-8 18 6 28-1s18 5 28-1 18 6 28-1 18 5 30-1" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Blob({ className, color = "var(--highlight)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        fill={color}
        d="M46.5,-58.6C59.3,-47.1,68.1,-31.3,71.6,-14.3C75.1,2.7,73.3,20.9,64.6,34.8C55.9,48.7,40.3,58.3,23.5,64.5C6.7,70.7,-11.3,73.5,-27.6,68.1C-43.9,62.7,-58.5,49.1,-66.5,32.6C-74.5,16.1,-75.9,-3.3,-69.6,-19.4C-63.3,-35.5,-49.3,-48.3,-34.4,-59.3C-19.5,-70.3,-3.7,-79.5,11.1,-77.9C25.9,-76.3,33.7,-70.1,46.5,-58.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function Sparkle({ className, color = "var(--accent)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 1c.6 5.2 2.3 8.6 11 11-8.7 2.4-10.4 5.8-11 11-.6-5.2-2.3-8.6-11-11 8.7-2.4 10.4-5.8 11-11z" fill={color} />
    </svg>
  );
}

/** Hero collage: four pieces of children's work, one per stage (Know · Make · Do · Move). */
export function WorkCollage({ className }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[520px] ${className ?? ""}`} aria-hidden>
      <Blob className="absolute -left-6 -top-6 w-[70%] opacity-80" />
      <Blob className="absolute -bottom-8 -right-4 w-[55%] rotate-90" color="color-mix(in oklab, var(--primary) 18%, transparent)" />
      <div className="absolute inset-[6%] grid grid-cols-2 gap-4">
        {/* Know: a hand-drawn bar chart from a data hunt */}
        <figure className="float-a card relative -rotate-3 p-4 shadow-[0_20px_40px_-24px_rgb(30_42_68/0.45)]">
          <span className="absolute -top-2 left-4 h-4 w-12 rotate-[-4deg] rounded-sm bg-highlight/90" />
          <svg viewBox="0 0 120 90" className="h-full w-full">
            <path d="M10 80h104M10 80V8" stroke="#1E2A44" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {[22, 44, 66, 88].map((x, i) => (
              <rect key={x} x={x} y={80 - [30, 55, 22, 44][i]} width="14" height={[30, 55, 22, 44][i]} rx="3" fill={["#3B4BA8", "#B8306F", "#D98B0B", "#13827F"][i]} />
            ))}
            <path d="M18 18c6-3 9 2 14-1" stroke="#F2B705" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
          <figcaption className="sr-only">A class bar chart</figcaption>
        </figure>
        {/* Make: a picture-card story */}
        <figure className="float-b card relative mt-8 rotate-2 bg-surface p-4 shadow-[0_20px_40px_-24px_rgb(30_42_68/0.45)]">
          <svg viewBox="0 0 120 90" className="h-full w-full">
            <rect x="6" y="6" width="50" height="38" rx="8" fill="#FBDDEA" />
            <circle cx="22" cy="20" r="6" fill="#F2B705" />
            <path d="M10 40l14-12 10 8 8-6 12 10" stroke="#B8306F" strokeWidth="3" fill="none" strokeLinejoin="round" />
            <rect x="64" y="6" width="50" height="38" rx="8" fill="#DCEBFB" />
            <path d="M74 34c6-12 12-12 18 0s10 0 14-6" stroke="#2F7FD8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M8 58h70M8 70h96M8 82h54" stroke="#C9BFAE" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </figure>
        {/* Do: a robot recipe flowchart */}
        <figure className="float-b card relative -mt-4 rotate-1 p-4 shadow-[0_20px_40px_-24px_rgb(30_42_68/0.45)]">
          <svg viewBox="0 0 120 90" className="h-full w-full">
            <rect x="38" y="4" width="44" height="18" rx="9" fill="#FFE39A" stroke="#1E2A44" strokeWidth="2" />
            <path d="M60 22v10" stroke="#1E2A44" strokeWidth="2" />
            <path d="M60 32l18 13-18 13-18-13z" fill="#FDEBC8" stroke="#D98B0B" strokeWidth="2.5" />
            <path d="M42 45H16v24M78 45h26v24" stroke="#1E2A44" strokeWidth="2" fill="none" />
            <rect x="2" y="69" width="30" height="16" rx="5" fill="#D3EEEC" stroke="#13827F" strokeWidth="2" />
            <rect x="88" y="69" width="30" height="16" rx="5" fill="#FBDDEA" stroke="#B8306F" strokeWidth="2" />
          </svg>
        </figure>
        {/* Move: a floor robot on a paper town path */}
        <figure className="float-a card relative mt-4 -rotate-2 p-4 shadow-[0_20px_40px_-24px_rgb(30_42_68/0.45)]">
          <svg viewBox="0 0 120 90" className="h-full w-full">
            <path d="M8 78c20 0 20-30 44-30s20-34 60-34" stroke="#F2B705" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".5" />
            <path d="M8 78c20 0 20-30 44-30s20-34 60-34" stroke="#1E2A44" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" fill="none" />
            <g className="robot-roll">
              <rect x="40" y="34" width="26" height="22" rx="7" fill="#13827F" />
              <circle cx="48" cy="44" r="3" fill="#fff" />
              <circle cx="58" cy="44" r="3" fill="#fff" />
              <circle cx="44" cy="58" r="4" fill="#1E2A44" />
              <circle cx="62" cy="58" r="4" fill="#1E2A44" />
            </g>
            <path d="M100 8l4 8 8 1-6 6 2 8-8-4-8 4 2-8-6-6 8-1z" fill="#D9542A" />
          </svg>
        </figure>
      </div>
      <Sparkle className="spin-slow absolute right-[8%] top-[2%] size-8" />
      <Sparkle className="spin-slow absolute bottom-[6%] left-[4%] size-5" color="var(--kids)" />
    </div>
  );
}

/** Kids illustration: a friendly helper bot, sun and paper shapes. Bright, round, no faces of children. */
export function KidsArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 360" className={className} aria-hidden>
      <circle cx="320" cy="70" r="46" fill="#F2B705" className="pulse-soft" />
      <g stroke="#F2B705" strokeWidth="6" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="320" y1="70" x2={320 + Math.cos((a * Math.PI) / 180) * 70} y2={70 + Math.sin((a * Math.PI) / 180) * 70} opacity=".55" strokeDasharray="0 52 18 200" />
        ))}
      </g>
      <path d="M30 300c40-50 90-40 120-20s90 30 130-10 90-20 110 10v80H30z" fill="#FFE39A" />
      <g className="float-a">
        <rect x="120" y="110" width="150" height="130" rx="44" fill="#B8306F" />
        <rect x="145" y="140" width="100" height="62" rx="28" fill="#FFF7E8" />
        <circle cx="175" cy="170" r="10" fill="#1E2A44" />
        <circle cx="215" cy="170" r="10" fill="#1E2A44" />
        <path d="M178 190c10 8 24 8 34 0" stroke="#1E2A44" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M195 110V82" stroke="#1E2A44" strokeWidth="6" strokeLinecap="round" />
        <circle cx="195" cy="74" r="12" fill="#F2B705" />
        <rect x="96" y="160" width="28" height="44" rx="14" fill="#D9542A" />
        <rect x="266" y="150" width="28" height="44" rx="14" fill="#D9542A" transform="rotate(-20 280 172)" />
        <rect x="150" y="240" width="28" height="34" rx="12" fill="#1E2A44" />
        <rect x="212" y="240" width="28" height="34" rx="12" fill="#1E2A44" />
      </g>
      <g className="float-b">
        <rect x="30" y="80" width="70" height="56" rx="14" fill="#DCEBFB" transform="rotate(-10 65 108)" />
        <path d="M44 112l12-12 10 9 10-7 14 12" stroke="#2F7FD8" strokeWidth="5" fill="none" strokeLinejoin="round" transform="rotate(-10 65 108)" />
      </g>
      <g className="float-a">
        <rect x="300" y="200" width="64" height="64" rx="16" fill="#D3EEEC" transform="rotate(8 332 232)" />
        <path d="M316 248v-22M332 248v-34M348 248v-14" stroke="#13827F" strokeWidth="8" strokeLinecap="round" transform="rotate(8 332 232)" />
      </g>
      <path d="M60 220c10-10 20 10 30 0s20 10 30 0" stroke="#3B4BA8" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M350 130l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="#3B4BA8" className="spin-slow" />
    </svg>
  );
}

/** A teacher-and-board doodle for the Teachers sections. */
export function TeacherArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden>
      <rect x="20" y="24" width="220" height="140" rx="18" fill="#1E2A44" />
      <path d="M48 70c20-14 36 8 56-4s30 6 50-2" stroke="#FFE39A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M48 104h90M48 126h60" stroke="#FFF7E8" strokeWidth="4" strokeLinecap="round" opacity=".7" />
      <circle cx="190" cy="110" r="22" fill="none" stroke="#F2B705" strokeWidth="4" />
      <path d="M182 110l6 6 12-12" stroke="#F2B705" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M90 164v40M170 164v40" stroke="#1E2A44" strokeWidth="6" strokeLinecap="round" />
      <g className="float-a">
        <rect x="236" y="120" width="64" height="84" rx="12" fill="#FFFFFF" stroke="#F0E2C4" strokeWidth="3" />
        <path d="M248 140h40M248 154h40M248 168h26" stroke="#2F7FD8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="282" cy="190" r="8" fill="#B8306F" />
      </g>
    </svg>
  );
}

/** A lab-room doodle: shelves, a robot arm and an offline hub. "Lab" is a room. */
export function LabArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" className={className} aria-hidden>
      <rect x="10" y="200" width="340" height="14" rx="7" fill="#1E2A44" />
      <rect x="24" y="40" width="120" height="150" rx="16" fill="#FFFFFF" stroke="#F0E2C4" strokeWidth="3" />
      <path d="M24 90h120M24 140h120" stroke="#F0E2C4" strokeWidth="3" />
      <rect x="40" y="58" width="26" height="24" rx="6" fill="#3B4BA8" />
      <rect x="74" y="62" width="22" height="20" rx="6" fill="#B8306F" />
      <circle cx="118" cy="72" r="11" fill="#F2B705" />
      <rect x="40" y="108" width="44" height="24" rx="8" fill="#13827F" />
      <rect x="92" y="112" width="36" height="20" rx="6" fill="#D98B0B" />
      <rect x="44" y="158" width="80" height="22" rx="8" fill="#DCEBFB" />
      <g className="arm-wave" style={{ transformOrigin: "236px 190px" }}>
        <rect x="222" y="170" width="28" height="30" rx="8" fill="#13827F" />
        <path d="M236 172l30-60 40 10" stroke="#1E2A44" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="266" cy="112" r="9" fill="#F2B705" />
        <path d="M306 122l14-8M306 122l14 10" stroke="#D9542A" strokeWidth="6" strokeLinecap="round" />
      </g>
      <rect x="160" y="150" width="50" height="40" rx="10" fill="#FFE39A" stroke="#1E2A44" strokeWidth="2.5" />
      <path d="M172 166c8-8 18-8 26 0M178 174c4-4 10-4 14 0" stroke="#1E2A44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
