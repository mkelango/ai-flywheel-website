// Rasterize the OG card SVG → PNG (1200×630). Many social platforms render PNG more reliably than
// SVG for og:image. Runs in `npm run build` (prebuild) and on demand via `npm run gen:og`.
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const pub = resolve(here, '..', 'public')

const svg = readFileSync(resolve(pub, 'og-image.svg'), 'utf8')
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true } })
const png = resvg.render().asPng()
writeFileSync(resolve(pub, 'og-image.png'), png)
console.log(`og-image.png written (${(png.length / 1024).toFixed(0)} KB, 1200×630)`)
