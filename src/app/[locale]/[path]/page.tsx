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

export default async function DynamicPage({
  params,
}: {
  params: { path: string };
}) {
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
  const isExploreNetworkPage =
    params.path === pathMapping[locale]?.["explore-network"];

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

  if (isExploreNetworkPage) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            {t("explore-network.title")}
          </h1>
          <p className="text-lg mb-8 text-muted-foreground">
            {t("explore-network.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Venue list will go here */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Example venue cards will be rendered here */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  {t("explore-network.filter")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("explore-network.search")}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t("explore-network.search")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("explore-network.categories")}
                    </label>
                    {/* Categories filter will go here */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("explore-network.location")}
                    </label>
                    {/* Location filter will go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/${locale}`} className="text-primary hover:underline">
              ← {t("navigation.home")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return notFound();
}
