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
import { Toaster } from 'react-hot-toast';
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

  const t = await getTranslations({ locale, namespace: 'MetaDataGeneric' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        {
          url: '/assets/icons/favicon.png',
          href: '/assets/icons/favicon.png',
        },
      ],
    },
    openGraph: {
      type: 'website',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      site_name: t('siteName'),
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/meta-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
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
          <Toaster
            toastOptions={{
              style: {
                fontSize: '16px',
                fontWeight: '500',
                color: '#000',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '10px',
                border: '1px solid #000',
                // ⬅️ apply to all toasts
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
