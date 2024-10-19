export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr", "pt", "jp"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const countryEnable = ["FR", "US"] as const;
