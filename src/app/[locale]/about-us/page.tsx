import AboutUsContent from '@/components/about-us/AboutUsContent';
import Loader from '@/components/common/Loader';
import { cmsGetIsAboutUsHidden, getAboutUsContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'AboutUsMetaData' });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

const About = async ({ locale }: { locale: string }) => {
  const cmsDataAboutUs = await getAboutUsContent(locale);
  return <AboutUsContent cmsDataAboutUs={cmsDataAboutUs} />;
};

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;

  const auHide = await cmsGetIsAboutUsHidden();
  if (auHide) {
    redirect('/');
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <About locale={locale} />
      </Suspense>
    </>
  );
}
