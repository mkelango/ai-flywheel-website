// ──────────────────────────────────────────────────────────────────────────
// Image registry — the single place that maps a semantic role to an asset.
// Swap any `src` for your own photography later and the whole site updates.
// All current assets are royalty-free (Unsplash license) and self-hosted in
// /public/images. `alt` text is written for accessibility + SEO.
// ──────────────────────────────────────────────────────────────────────────

export type Img = { src: string; alt: string }

const base = '/images'

export const IMG = {
  // Compute & infrastructure
  serverHall: { src: `${base}/server-hall.jpg`, alt: 'A dark hyperscale data hall with rows of cabled server racks' },
  circuit: { src: `${base}/circuit-macro.jpg`, alt: 'A macro close-up of a circuit board and processor' },

  // Agentic & physical
  robotArm: { src: `${base}/robot-arm.jpg`, alt: 'Industrial robotic arms assembling a vehicle body on a production line' },
  humanoid: { src: `${base}/automation.jpg`, alt: 'A humanoid service robot in a modern interior' },
  factoryFloor: { src: `${base}/factory-floor.jpg`, alt: 'A worker grinding metal with bright sparks on a fabrication line' },
  warehouse: { src: `${base}/warehouse.jpg`, alt: 'A large automated warehouse with racked inventory bins' },

  // Life sciences
  pharmaLab: { src: `${base}/pharma-lab.jpg`, alt: 'A pipette dispensing a reagent into a microplate array' },

  // Operations, analytics & enterprise
  analytics: { src: `${base}/analytics.jpg`, alt: 'A dark analytics dashboard with performance charts on a laptop' },
  dataViz: { src: `${base}/data-viz.jpg`, alt: 'A laptop on a desk showing a data-visualisation dashboard' },
  opsScreens: { src: `${base}/ops-screens.jpg`, alt: 'Engineers working at monitors in a modern operations space' },
  enterpriseOffice: { src: `${base}/enterprise-office.jpg`, alt: 'A bright, modern enterprise office interior' },
  boardroom: { src: `${base}/boardroom.jpg`, alt: 'A team gathered for an all-hands strategy session' },
} satisfies Record<string, Img>

export type ImgKey = keyof typeof IMG
