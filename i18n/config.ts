export const locales = ["de", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
