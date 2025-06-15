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

export default function VenuePage({
  params,
}: {
  params: { path: string; slug: string };
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
  const isExploreNetworkPage =
    params.path === pathMapping[locale]?.["explore-network"];

  if (!isExploreNetworkPage) {
    notFound();
  }

  const venueName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">{venueName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Venue details will go here */}
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {t("explore-network.filter")}
              </h2>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("explore-network.categories")}
                  </label>
                  {/* Categories filter will go here */}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t("explore-network.location")}
                  </label>
                  {/* Location filter will go here */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/${params.path}`}
            className="text-primary hover:underline"
          >
            ← {t("explore-network.title")}
          </Link>
        </div>
      </main>
    </div>
  );
}
