import { useState } from 'react'
import { STAGES } from '../data/content'

// ── geometry helpers ────────────────────────────────────────────────────────
const C = 300 // center
const R_OUT = 244 // outer wheel radius
const R_IN = 104 // hub radius
const GAP = 3.2 // degrees of gap between stages

function pol(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
}

// annular sector from a1 -> a2 (degrees, increasing = clockwise in screen space)
function sector(a1: number, a2: number, rOut: number, rIn: number) {
  const oS = pol(rOut, a1)
  const oE = pol(rOut, a2)
  const iE = pol(rIn, a2)
  const iS = pol(rIn, a1)
  const large = a2 - a1 > 180 ? 1 : 0
  return [
    `M ${oS.x.toFixed(2)} ${oS.y.toFixed(2)}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${oE.x.toFixed(2)} ${oE.y.toFixed(2)}`,
    `L ${iE.x.toFixed(2)} ${iE.y.toFixed(2)}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${iS.x.toFixed(2)} ${iS.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

// stage center angles (screen: 0=right, 90=down, 180=left, 270=up)
const CENTERS: Record<string, number> = { foundation: 270, generative: 0, agentic: 90, physical: 180 }
// label positions (mid-radius)
const R_LABEL = 178

interface Props {
  size?: number
  spin?: boolean
  interactive?: boolean
  className?: string
}

export default function Flywheel({ size = 600, spin = true, interactive = true, className = '' }: Props) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={`relative w-full ${className}`} style={{ maxWidth: size }}>
      <svg viewBox="0 0 600 600" className="w-full h-auto overflow-visible" role="img"
           aria-label="The AI Flywheel — four stages turning around the DRIVE hub, wrapped by CORE governance.">
        <defs>
          {STAGES.map((s) => (
            <radialGradient key={s.key} id={`fw-${s.key}`} gradientUnits="userSpaceOnUse" cx={C} cy={C} r={R_OUT}>
              <stop offset="28%" stopColor={s.color} />
              <stop offset="100%" stopColor={s.deep} />
            </radialGradient>
          ))}
          <radialGradient id="fw-hub" gradientUnits="userSpaceOnUse" cx={C} cy={C - 18} r={120}>
            <stop offset="0%" stopColor="#173049" />
            <stop offset="100%" stopColor="#0C1A29" />
          </radialGradient>
          <linearGradient id="fw-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2D49A" />
            <stop offset="100%" stopColor="#D9AE5E" />
          </linearGradient>
          <filter id="fw-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="#0A131F" floodOpacity="0.28" />
          </filter>
          <filter id="fw-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="fw-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#F2D49A" />
          </marker>
        </defs>

        {/* faint guide rings — these slowly rotate to imply the wheel turning */}
        <g className={spin ? 'animate-spin-slower' : ''} style={{ transformBox: 'view-box', transformOrigin: '300px 300px' }}>
          <circle cx={C} cy={C} r={R_OUT + 30} fill="none" stroke="var(--fw-guide)" strokeWidth="1" opacity="0.5" />
          <circle cx={C} cy={C} r={R_OUT + 56} fill="none" stroke="var(--fw-guide)" strokeWidth="1" strokeDasharray="3 10" opacity="0.45" />
          {Array.from({ length: 60 }).map((_, i) => {
            const a = i * 6
            const p1 = pol(R_OUT + 22, a), p2 = pol(R_OUT + 28, a)
            return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="var(--fw-guide)" strokeWidth="1" opacity={i % 5 === 0 ? 0.7 : 0.3} />
          })}
        </g>

        {/* CORE rim label ring */}
        <g opacity="0.9">
          <circle cx={C} cy={C} r={R_OUT + 30} fill="none" stroke="#1FA877" strokeWidth="1.5" strokeDasharray="2 6" opacity="0.55" />
          <path id="fw-ringTop" d={`M ${pol(R_OUT + 14, 200).x} ${pol(R_OUT + 14, 200).y} A ${R_OUT + 14} ${R_OUT + 14} 0 0 1 ${pol(R_OUT + 14, 340).x} ${pol(R_OUT + 14, 340).y}`} fill="none" />
          <text className="font-mono" fontSize="11" letterSpacing="3" fill="var(--fw-rim)">
            <textPath href="#fw-ringTop" startOffset="50%" textAnchor="middle">CORE · GOVERNANCE &amp; SOVEREIGNTY</textPath>
          </text>
        </g>

        {/* wheel group — static so stage labels stay aligned */}
        <g filter="url(#fw-soft)">
          {STAGES.map((s) => {
            const c = CENTERS[s.key]
            const isActive = active === s.key
            return (
              <path
                key={s.key}
                d={sector(c - 45 + GAP, c + 45 - GAP, R_OUT, R_IN)}
                fill={`url(#fw-${s.key})`}
                stroke="var(--fw-sep)"
                strokeWidth="3"
                opacity={active && !isActive ? 0.5 : 1}
                style={{ transition: 'opacity .3s', cursor: interactive ? 'pointer' : 'default' }}
                onMouseEnter={() => interactive && setActive(s.key)}
                onMouseLeave={() => interactive && setActive(null)}
              />
            )
          })}

          {/* compounding arrows (clockwise) */}
          <g fill="none" stroke="#F2D49A" strokeWidth="3" markerEnd="url(#fw-arrow)" opacity="0.95">
            {[315, 45, 135, 225].map((a) => {
              const p1 = pol(186, a + 6)
              const p2 = pol(186, a + 30)
              return <path key={a} d={`M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A 186 186 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`} />
            })}
          </g>
        </g>

        {/* stage labels (counter-rotate stays upright → kept static) */}
        <g textAnchor="middle">
          {STAGES.map((s) => {
            const p = pol(R_LABEL, CENTERS[s.key])
            return (
              <g key={s.key} style={{ pointerEvents: 'none' }}>
                <text x={p.x} y={p.y - 4} className="font-display" fontSize="15" fontWeight="700" fill="#fff">
                  <tspan fill="#F2D49A" fontWeight="800">{s.num}</tspan>  {s.name.replace(' AI', '')}
                </text>
                <text x={p.x} y={p.y + 14} fontSize="10.5" fill="#E8F0F6" opacity="0.85">{s.tagline}</text>
              </g>
            )
          })}
        </g>

        {/* DRIVE hub */}
        <circle cx={C} cy={C} r={R_IN + 6} fill="url(#fw-gold)" opacity="0.18" filter="url(#fw-glow)" />
        <circle cx={C} cy={C} r={R_IN - 2} fill="url(#fw-hub)" stroke="var(--fw-hub-stroke)" strokeWidth="2" />
        <circle cx={C} cy={C} r={R_IN - 12} fill="none" stroke="#3A536B" strokeWidth="1" opacity="0.6" />
        <text x={C} y={C - 34} textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="2.5" fill="#9DB1C2">THE OPERATING METHOD</text>
        <text x={C} y={C - 4} textAnchor="middle" className="font-display" fontSize="30" fontWeight="800" letterSpacing="2" fill="#F2D49A">DRIVE</text>
        <g textAnchor="middle" fill="#CFE0EC" fontSize="9.5">
          <text x={C} y={C + 22}>Diagnose · Resource</text>
          <text x={C} y={C + 38}>Implement · Validate</text>
          <text x={C} y={C + 54}>Expand</text>
        </g>
      </svg>
    </div>
  )
}
