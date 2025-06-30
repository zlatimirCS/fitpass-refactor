import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import TopBar from '@/components/common/TopBar';
import { AppProvider } from '@/context/AppProvider';
import { routing } from '@/i18n/routing';
import {
  cmsGetIsAboutUsHidden,
  cmsGetIsContactHidden,
  cmsGetIsExploreNetworkHidden,
  cmsGetIsFitpassClubHidden,
  cmsGetIsForCompaniesHidden,
  cmsGetIsForPartnersHidden,
} from '@/lib/fetchData';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import '../../styles/main.scss';
import './styles.css';
type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const auHide = await cmsGetIsAboutUsHidden();
  const fpHide = await cmsGetIsForPartnersHidden();
  const fcHide = await cmsGetIsForCompaniesHidden();
  const enHide = await cmsGetIsExploreNetworkHidden();
  const clHide = await cmsGetIsFitpassClubHidden();
  const ctHide = await cmsGetIsContactHidden();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className='h-full' lang={locale}>
      {/* <body className={clsx(inter.className, 'flex h-full flex-col')}> */}
      <body>
        <NextIntlClientProvider>
          <AppProvider>
            <Suspense fallback={<div></div>}>
              <TopBar />
            </Suspense>
            <Suspense fallback={<div></div>}>
              <NavBar
                auHide={auHide}
                fpHide={fpHide}
                fcHide={fcHide}
                enHide={enHide}
                clHide={clHide}
                ctHide={ctHide}
              />
            </Suspense>
            <main>{children}</main>
            <Footer
              fpHide={fpHide}
              auHide={auHide}
              fcHide={fcHide}
              enHide={enHide}
              clHide={clHide}
              ctHide={ctHide}
            />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
