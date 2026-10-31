/**
 * Hands-and-work illustrations for the Families pages. No faces, ever.
 * Server components; motion from globals.css keyframes (reduced-motion safe).
 */

/** Two hands holding up a piece of work, with floating cards in the product colour. */
export function HandsWork({ className, color = "#B8306F", kind = "robot" }: { className?: string; color?: string; kind?: "robot" | "story" | "cards" | "bot" }) {
  return (
    <svg viewBox="0 0 400 340" className={className} aria-hidden>
      <circle cx="320" cy="64" r="40" fill="#F2B705" className="pulse-soft" />
      <path d="M20 290c50-40 100-30 140-12s100 24 140-6 70-12 80 6v62H20z" fill="#FFE39A" />
      {/* the work */}
      <g className="float-a">
        <rect x="110" y="70" width="180" height="150" rx="26" fill="#FFF7E8" stroke={color} strokeWidth="6" />
        {kind === "robot" && (
          <g>
            <rect x="160" y="105" width="80" height="62" rx="20" fill={color} />
            <circle cx="185" cy="134" r="8" fill="#FFF7E8" />
            <circle cx="215" cy="134" r="8" fill="#FFF7E8" />
            <path d="M200 105V88" stroke="#1E2A44" strokeWidth="5" strokeLinecap="round" />
            <circle cx="200" cy="84" r="8" fill="#F2B705" />
            <circle cx="175" cy="186" r="12" fill="#1E2A44" />
            <circle cx="225" cy="186" r="12" fill="#1E2A44" />
          </g>
        )}
        {kind === "story" && (
          <g>
            <rect x="136" y="96" width="60" height="48" rx="8" fill="#DCEBFB" />
            <path d="M144 136l14-14 10 9 12-10 10 15" stroke="#2F7FD8" strokeWidth="4" fill="none" strokeLinejoin="round" />
            <rect x="204" y="96" width="60" height="48" rx="8" fill={color} opacity=".25" />
            <path d="M136 164h128M136 180h96M136 196h112" stroke="#1E2A44" strokeWidth="5" strokeLinecap="round" opacity=".7" />
          </g>
        )}
        {kind === "bot" && (
          <g>
            <rect x="136" y="96" width="96" height="30" rx="15" fill={color} opacity=".3" />
            <rect x="168" y="136" width="96" height="30" rx="15" fill="#D3EEEC" />
            <rect x="136" y="176" width="72" height="26" rx="13" fill={color} opacity=".3" />
            <path d="M246 186l8 8 14-16" stroke="#13827F" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {kind === "cards" && (
          <g>
            <rect x="132" y="96" width="62" height="84" rx="10" fill={color} transform="rotate(-8 163 138)" />
            <rect x="206" y="96" width="62" height="84" rx="10" fill="#2F7FD8" transform="rotate(8 237 138)" />
            <path d="M150 130h26M150 146h20" stroke="#FFF7E8" strokeWidth="5" strokeLinecap="round" transform="rotate(-8 163 138)" />
            <circle cx="237" cy="134" r="14" fill="#FFF7E8" transform="rotate(8 237 138)" />
            <path d="M150 200h100" stroke="#1E2A44" strokeWidth="5" strokeLinecap="round" opacity=".5" />
          </g>
        )}
      </g>
      {/* hands */}
      <g fill="#C98A5E">
        <path d="M70 250c10-30 30-44 52-40l22 4c10 2 10 16 0 18l-20 2 6 10c4 8-2 16-10 14l-30-6c-10-2-18 8-20 18z" />
        <path d="M330 250c-10-30-30-44-52-40l-22 4c-10 2-10 16 0 18l20 2-6 10c-4 8 2 16 10 14l30-6c10-2 18 8 20 18z" />
      </g>
      <g fill="#E9B48A" opacity=".55">
        <rect x="118" y="212" width="26" height="10" rx="5" />
        <rect x="256" y="212" width="26" height="10" rx="5" />
      </g>
      <path d="M40 120c10-10 20 10 30 0s20 10 30 0" stroke="#3B4BA8" strokeWidth="5" fill="none" strokeLinecap="round" className="float-b" />
      <path d="M352 170l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill={color} className="spin-slow" />
    </svg>
  );
}

/** A map-pin doodle over a paper town, for the camp finder and Mission pages. */
export function TownMap({ className, color = "#B8306F" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden>
      <rect x="20" y="40" width="360" height="230" rx="28" fill="#FFF7E8" stroke="#1E2A44" strokeOpacity=".15" strokeWidth="3" />
      <path d="M40 200c60-30 100 20 160-10s110-10 160-40" stroke="#FFE39A" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M60 90h70v50H60zM160 70h60v60h-60zM250 100h80v50h-80z" fill="#DCEBFB" />
      <path d="M70 230h50v24H70zM280 210h60v34h-60z" fill="#D3EEEC" />
      <g className="float-a">
        <path d="M200 60c-24 0-40 18-40 40 0 30 40 66 40 66s40-36 40-66c0-22-16-40-40-40z" fill={color} />
        <circle cx="200" cy="100" r="14" fill="#FFF7E8" />
      </g>
      <circle cx="320" cy="60" r="10" fill="#F2B705" className="pulse-soft" />
      <circle cx="90" cy="180" r="8" fill="#2F7FD8" className="pulse-soft" />
    </svg>
  );
}
