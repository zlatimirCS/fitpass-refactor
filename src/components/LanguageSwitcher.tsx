"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  pathMapping,
  reversePathMapping,
  type Locale,
} from "@/i18n/pathMapping";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      const segments = pathname.split("/");
      // segments[0] is '', segments[1] is locale, segments[2] is path
      let newPath = "";
      if (segments.length > 2 && segments[2]) {
        // Try to find the logical page key for the current path
        const currentPath = segments[2];
        const logicalKey = reversePathMapping[locale][currentPath];
        if (logicalKey && pathMapping[newLocale][logicalKey]) {
          newPath = `/${newLocale}/${pathMapping[newLocale][logicalKey]}`;
        } else {
          // fallback: just swap locale
          newPath = `/${newLocale}/${segments.slice(2).join("/")}`;
        }
      } else {
        newPath = `/${newLocale}`;
      }
      router.replace(newPath || "/");
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleLocaleChange("en")}
        className={`px-3 py-1 rounded ${
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        }`}
        disabled={isPending}
      >
        EN
      </button>
      <button
        onClick={() => handleLocaleChange("cg")}
        className={`px-3 py-1 rounded ${
          locale === "cg"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        }`}
        disabled={isPending}
      >
        CG
      </button>
      <button
        onClick={() => handleLocaleChange("sr")}
        className={`px-3 py-1 rounded ${
          locale === "sr"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        }`}
        disabled={isPending}
      >
        SR
      </button>
      <button
        onClick={() => handleLocaleChange("fr")}
        className={`px-3 py-1 rounded ${
          locale === "fr"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        }`}
        disabled={isPending}
      >
        FR
      </button>
    </div>
  );
}
