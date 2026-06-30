// ───────────────────────────────────────────────────────────────────────────
// Email abstraction. Uses SMTP when configured (SMTP_HOST etc. in .env);
// otherwise writes the message to server/data/outbox/ and logs it — so the
// product is fully testable offline and "real" the moment SMTP creds are added.
// ───────────────────────────────────────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTBOX = path.join(__dirname, 'data', 'outbox')
fs.mkdirSync(OUTBOX, { recursive: true })

const FROM = process.env.MAIL_FROM || 'The AI Flywheel <hello@aiflywheel.example>'

let transport = null
if (process.env.SMTP_HOST) {
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })
}

export async function sendMail({ to, subject, html, text }) {
  if (transport) {
    const info = await transport.sendMail({ from: FROM, to, subject, html, text })
    return { delivered: true, channel: 'smtp', id: info.messageId }
  }
  // Fallback: persist to outbox so nothing is silently lost.
  const fname = `${Date.now()}-${to.replace(/[^a-z0-9]/gi, '_')}.json`
  fs.writeFileSync(path.join(OUTBOX, fname), JSON.stringify({ from: FROM, to, subject, text, html }, null, 2))
  console.log(`✉️  [outbox] ${subject} → ${to}  (configure SMTP_* in .env to deliver for real)`)
  return { delivered: true, channel: 'outbox', id: fname }
}

// ── Email templates ──────────────────────────────────────────────────────────
export function diagnosticReportEmail({ email, score, level, headline }) {
  const subject = `Your AI Flywheel diagnostic — score ${score}, ${level}`
  const text = `Your Flywheel score is ${score} (${level}).\n\n${headline}\n\nYour full roadmap and next steps are attached in your account. Welcome to the flywheel.\n\n— The AI Flywheel`
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0A131F;color:#EEF3F8;padding:32px;border-radius:16px;max-width:560px">
      <p style="color:#E6B968;letter-spacing:3px;font-size:11px;text-transform:uppercase;margin:0">Your diagnostic</p>
      <h1 style="font-size:28px;margin:8px 0 4px">Flywheel score: ${score}</h1>
      <p style="color:#9DB1C2;margin:0 0 16px">Maturity level — ${level}</p>
      <p style="font-size:17px;color:#CFE0EC">${headline}</p>
      <p style="color:#9DB1C2">Your stage-by-stage breakdown, a 90-day roadmap and the toolkit samples are in your account.</p>
      <p style="color:#E6B968;font-style:italic;margin-top:24px">"Add 1. Become the one."</p>
    </div>`
  return { to: email, subject, text, html }
}

export function welcomeEmail({ email }) {
  return {
    to: email,
    subject: 'Welcome to The AI Flywheel',
    text: 'You\'re in. Each week: one practical lesson and one landscape read. No ads, ever. — The AI Flywheel',
    html: `<div style="font-family:Inter,Arial,sans-serif;color:#0A131F"><h2>Welcome to The AI Flywheel</h2><p>One practical lesson, one landscape read — every week. No ads, ever.</p><p style="color:#9a7b2e;font-style:italic">"Add 1. Become the one."</p></div>`,
  }
}
