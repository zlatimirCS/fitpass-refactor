import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const defaultLocale = "en";
  const messages = (
    await import(`@/i18n/locales/${locale || defaultLocale}.json`)
  ).default;

  return {
    messages,
    locale: locale || defaultLocale,
    timeZone: "UTC",
  };
});
