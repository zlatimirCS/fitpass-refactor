import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { AppProvider } from "@/context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "cg" },
    { locale: "sr" },
    { locale: "fr" },
  ];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
    console.log("Loaded messages for locale:", locale, messages); // Debug log
  } catch (error) {
    console.error("Failed to load messages for locale:", locale, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <header className="container mx-auto px-4 py-4 flex justify-end">
              <LanguageSwitcher />
            </header>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
