import type { Locale } from "@/i18n/i18n.config";
import { i18n } from "@/i18n/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { dictionaries } from "./dictionaries";

export type Pages = keyof (typeof dictionaries)["en"];

export const getDictionary = async <K extends Pages>(
  locale: Locale,
  page: K
) => {
  return dictionaries[locale][page]() as Promise<
    (typeof dictionaries.en)[K] extends () => Promise<infer R> ? R : never
  >;
};

export type Dictionary = {
  [K in Pages]: ReturnType<(typeof dictionaries.en)[K]> extends Promise<infer R>
    ? R
    : never;
};

// export const cacheDictionary = cache(
//   async <K extends Pages>(lang: Locale, page: K) => {
//     return await getDictionary(lang, page);
//   }
// );

export function getLocale(request: Request): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error `locales` are read only
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
  } catch (error) {
    console.error(error);
    return i18n.defaultLocale;
  }
}
