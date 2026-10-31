/** Production origin. Used for metadataBase and structured-data URLs so they never fall back to localhost. */
export const SITE_URL = "https://aiflywheel.in";

/** Root openGraph fields. Pages that set openGraph replace the root object, so they spread this. */
export const BASE_OG = { siteName: "AI Flywheel", locale: "en_IN" } as const;
