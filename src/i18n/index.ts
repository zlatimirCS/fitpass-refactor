import { Locale } from "./pathMapping";

export async function getDictionary(locale: Locale) {
  const dictionary = await import(`./locales/${locale}.json`);
  return dictionary.default;
}
