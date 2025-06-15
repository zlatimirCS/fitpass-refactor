import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const headersList = headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
  const supportedLocales = ["en", "cg", "sr", "fr"];
  const locale = supportedLocales.includes(preferredLocale)
    ? preferredLocale
    : "en";

  redirect(`/${locale}`);
}
