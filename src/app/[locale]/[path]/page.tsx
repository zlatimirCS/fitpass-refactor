"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  pathMapping,
  reversePathMapping,
  type Locale,
} from "@/i18n/pathMapping";

export default function DynamicPage({ params }: { params: { path: string } }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  // Check if the current path matches any of the expected paths for this locale
  const isValidPath = Object.values(pathMapping[locale] || {}).includes(
    params.path
  );
  if (!isValidPath) {
    notFound();
  }

  // Determine which page we're on based on the path
  const isAboutPage = params.path === pathMapping[locale]?.["about"];
  const isContactPage = params.path === pathMapping[locale]?.["contact"];

  if (isAboutPage) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              {t("about.title")}
            </h1>

            <p className="text-lg mb-8 text-muted-foreground">
              {t("about.description")}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t("about.mission")}
                </h2>
                <p className="text-muted-foreground">
                  {t("about.missionText")}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t("about.vision")}
                </h2>
                <p className="text-muted-foreground">{t("about.visionText")}</p>
              </section>
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}`}
                className="text-primary hover:underline"
              >
                ← {t("navigation.home")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isContactPage) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-foreground">
              {t("contact.title")}
            </h1>

            <p className="text-lg mb-8 text-muted-foreground">
              {t("contact.description")}
            </p>

            <div className="mt-8">
              <Link
                href={`/${locale}`}
                className="text-primary hover:underline"
              >
                ← {t("navigation.home")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return notFound();
}
