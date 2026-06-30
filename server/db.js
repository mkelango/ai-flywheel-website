// ───────────────────────────────────────────────────────────────────────────
// Tiny file-backed datastore. Atomic writes, synchronous reads.
// Production swap: replace this module with SQLite/Postgres — the call sites
// (insert / find / findOne / update) stay the same.
// ───────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { nanoid } from 'nanoid'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
fs.mkdirSync(DATA_DIR, { recursive: true })

function file(coll) {
  return path.join(DATA_DIR, `${coll}.json`)
}

function readAll(coll) {
  try {
    return JSON.parse(fs.readFileSync(file(coll), 'utf8'))
  } catch {
    return []
  }
}

function writeAll(coll, rows) {
  const tmp = file(coll) + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(rows, null, 2))
  fs.renameSync(tmp, file(coll)) // atomic on same filesystem
}

export const db = {
  all: (coll) => readAll(coll),

  insert(coll, doc) {
    const rows = readAll(coll)
    const row = { id: nanoid(12), createdAt: new Date().toISOString(), ...doc }
    rows.push(row)
    writeAll(coll, rows)
    return row
  },

  find(coll, predicate) {
    return readAll(coll).filter(predicate)
  },

  findOne(coll, predicate) {
    return readAll(coll).find(predicate) || null
  },

  update(coll, id, patch) {
    const rows = readAll(coll)
    const i = rows.findIndex((r) => r.id === id)
    if (i === -1) return null
    rows[i] = { ...rows[i], ...patch, updatedAt: new Date().toISOString() }
    writeAll(coll, rows)
    return rows[i]
  },
}

// ── Seed a couple of verifiable demo credentials (for the verify-a-credential tool)
export function seed() {
  if (readAll('credentials').length === 0) {
    writeAll('credentials', [
      { id: 'AIF-AGT-2026-0001', holder: 'Priya Raman', cert: 'Agentic AI Engineer', issued: '2026-03-12', status: 'active', expires: '2028-03-12' },
      { id: 'AIF-FND-2026-0042', holder: 'Arun Kumar', cert: 'AI Flywheel Foundation', issued: '2026-01-20', status: 'active', expires: '2028-01-20' },
      { id: 'AIF-COR-2025-0117', holder: 'Meera Iyer', cert: 'CORE Governance Specialist', issued: '2025-11-05', status: 'expired', expires: '2026-05-05' },
    ])
  }
}
