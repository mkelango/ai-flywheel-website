import { useState, ReactNode } from 'react'
import type { Img } from '../lib/images'

type Ratio = 'square' | 'video' | 'photo' | 'portrait' | 'wide' | 'tall' | 'auto'

const RATIO: Record<Ratio, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  photo: 'aspect-[4/3]',
  portrait: 'aspect-[4/5]',
  wide: 'aspect-[16/7]',
  tall: 'aspect-[3/4]',
  auto: '',
}

/**
 * Graded image for the dark theme. One treatment so every photo reads as a
 * single art-directed set:
 *  - real colour, gentle contrast, seated into the navy ground
 *  - subtle navy→accent grade + faint top sheen for cohesion
 *  - optional `scrim` for text overlaid on the image
 *  - optional `duotone` (navy/accent) for busy or abstract frames
 *  - fade-up on load over a panel placeholder (no layout shift)
 */
export default function Figure({
  img,
  ratio = 'photo',
  className = '',
  imgClassName = '',
  rounded = 'rounded-2xl',
  accent = '#E6B968',
  duotone = false,
  scrim = 'none',
  eager = false,
  overlay,
  position = 'object-center',
}: {
  img: Img
  ratio?: Ratio
  className?: string
  imgClassName?: string
  rounded?: string
  accent?: string
  duotone?: boolean
  scrim?: 'none' | 'bottom' | 'left' | 'full' | 'soft'
  eager?: boolean
  overlay?: ReactNode
  position?: string
}) {
  const [loaded, setLoaded] = useState(false)

  const scrims: Record<string, string> = {
    none: '',
    bottom: 'bg-gradient-to-t from-ground via-ground/25 to-transparent',
    left: 'bg-gradient-to-r from-ground/85 via-ground/30 to-transparent',
    full: 'bg-ground/45',
    soft: 'bg-gradient-to-tr from-ground/55 via-transparent to-transparent',
  }

  return (
    <div className={`relative overflow-hidden ${rounded} bg-panel ${RATIO[ratio]} ${className}`}>
      <img
        src={img.src}
        alt={img.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover ${position} transition-[opacity,transform] duration-[900ms] ease-out ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
        } ${duotone ? 'grayscale contrast-[1.05] brightness-[0.9]' : 'contrast-[1.03] brightness-[0.95] saturate-[0.97]'} ${imgClassName}`}
      />

      {/* duotone navy/accent wash for abstract or busy frames */}
      {duotone && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-ground/60 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20" style={{ background: accent }} />
        </>
      )}

      {/* unified subtle grade — deepen blacks + faint accent sheen so it belongs to the theme */}
      {!duotone && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ground/45 via-transparent to-transparent" />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />

      {/* scrim for overlaid text */}
      {scrim !== 'none' && <div className={`pointer-events-none absolute inset-0 ${scrims[scrim]}`} />}

      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  )
}
