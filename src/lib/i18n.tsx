import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'en' | 'ta'
export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
]

// i18n is enabled on key journeys (nav, hero, primary CTAs). Untranslated strings
// fall back to English. Tamil is prioritized per the brand's India-first pillar.
const DICT: Record<string, { en: string; ta: string }> = {
  'nav.framework': { en: 'Framework', ta: 'கட்டமைப்பு' },
  'nav.solutions': { en: 'Solutions', ta: 'தீர்வுகள்' },
  'nav.platform': { en: 'Platform', ta: 'தளம்' },
  'nav.learn': { en: 'Learn & Certify', ta: 'கற்க & சான்று' },
  'nav.resources': { en: 'Resources', ta: 'வளங்கள்' },
  'nav.signin': { en: 'Sign in', ta: 'உள்நுழை' },
  'nav.language': { en: 'Language', ta: 'மொழி' },
  'nav.search': { en: 'Search', ta: 'தேடு' },
  'cta.diagnostic': { en: 'Run the free diagnostic', ta: 'இலவச கணிப்பை இயக்கு' },
  'cta.explore': { en: 'Explore the framework', ta: 'கட்டமைப்பை ஆராயுங்கள்' },
  'hero.badge': { en: 'The enterprise AI framework', ta: 'நிறுவன AI கட்டமைப்பு' },
  'hero.titleA': { en: 'Turn AI into ', ta: 'AI-ஐ ' },
  'hero.titleHi': { en: 'compounding value', ta: 'கூட்டுவிளைவு மதிப்பாக' },
  'hero.titleB': { en: ' — at any scale.', ta: ' மாற்றுங்கள் — எந்த அளவிலும்.' },
  'hero.sub': {
    en: 'The AI Flywheel is the standard for making AI actually pay off. Four stages that compound, one method that turns them, and the governance that keeps it trustworthy. One framework, three scales, four actors.',
    ta: 'AI உண்மையில் பலன் தரச் செய்வதற்கான தரநிலை AI Flywheel. கூட்டுவிளைவாகும் நான்கு நிலைகள், அவற்றை இயக்கும் ஒரு முறை, அதை நம்பகமாக வைக்கும் ஆளுகை. ஒரு கட்டமைப்பு, மூன்று அளவுகள், நான்கு செயற்பாட்டாளர்கள்.',
  },
  'hero.t1': { en: 'Honest & proof-led', ta: 'நேர்மை & சான்று சார்ந்தது' },
  'hero.t2': { en: 'Versioned, quarterly-refreshed', ta: 'பதிப்பு, காலாண்டு புதுப்பிப்பு' },
  'hero.t3': { en: 'Vendor-neutral · MCP / A2A', ta: 'விற்பனையாளர்-நடுநிலை · MCP / A2A' },
  // footer chrome (shown on every page)
  'foot.news.eyebrow': { en: 'The newsletter', ta: 'செய்திமடல்' },
  'foot.news.title': { en: 'The framework, refreshed — weekly.', ta: 'கட்டமைப்பு, புதுப்பிக்கப்படுகிறது — வாரந்தோறும்.' },
  'foot.news.sub': { en: 'The model layer moves in weeks. We move with it — one practical lesson, one landscape read, every week. No ads, ever.', ta: 'மாதிரி அடுக்கு வாரங்களில் மாறுகிறது. நாங்களும் அதனுடன் நகர்கிறோம் — ஒரு நடைமுறை பாடம், ஒரு பார்வை, ஒவ்வொரு வாரமும். விளம்பரங்கள் இல்லை, எப்போதும்.' },
  'foot.subscribe': { en: 'Subscribe', ta: 'பதிவு செய்' },
  'foot.subscribed': { en: "You're subscribed — check your inbox.", ta: 'பதிவு முடிந்தது — உங்கள் அஞ்சலைச் சரிபார்க்கவும்.' },
  'foot.tagline': { en: 'The standard for turning AI into compounding value. India-rooted, built for the world. Ad-free, trust-first, audited.', ta: 'AI-ஐ கூட்டுவிளைவு மதிப்பாக மாற்றுவதற்கான தரநிலை. இந்திய வேரூன்றிய, உலகிற்காக கட்டப்பட்டது. விளம்பரமற்ற, நம்பிக்கை-முதல், தணிக்கை செய்யப்பட்டது.' },
  'foot.col.framework': { en: 'Framework', ta: 'கட்டமைப்பு' },
  'foot.col.solutions': { en: 'Solutions', ta: 'தீர்வுகள்' },
  'foot.col.platform': { en: 'Platform & Learn', ta: 'தளம் & கற்றல்' },
  'foot.col.resources': { en: 'Resources', ta: 'வளங்கள்' },
  'foot.col.company': { en: 'Company', ta: 'நிறுவனம்' },
}

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }
const Ctx = createContext<I18nCtx>(null as any)
export const useI18n = () => useContext(Ctx)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('aif_lang') as Lang) || 'en')
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('aif_lang', l) }
  const t = (k: string) => DICT[k]?.[lang] ?? DICT[k]?.en ?? k
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}
