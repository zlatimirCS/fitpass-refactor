"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { pathMapping, type Locale } from "@/i18n/pathMapping";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const getTranslatedPath = (path: keyof (typeof pathMapping)[Locale]) => {
    const translatedPath = pathMapping[locale]?.[path];
    if (!translatedPath) {
      console.error(
        `No translation found for path ${path} in locale ${locale}`
      );
      return path;
    }
    return translatedPath;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {t("home.title")}
          </h1>
          <p className="text-lg mb-8 text-muted-foreground">
            {t("home.description")}
          </p>

          <nav className="flex gap-4 justify-center">
            <Link
              href={`/${locale}`}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
            >
              {t("navigation.home")}
            </Link>
            <Link
              href={`/${locale}/${getTranslatedPath("about")}`}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90"
            >
              {t("navigation.about")}
            </Link>
            <Link
              href={`/${locale}/${getTranslatedPath("contact")}`}
              className="px-4 py-2 rounded-md bg-accent text-accent-foreground hover:opacity-90"
            >
              {t("navigation.contact")}
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
