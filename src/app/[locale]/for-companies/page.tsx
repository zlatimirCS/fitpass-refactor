import ForCompaniesContent from '@/components/for-companies/ForCompaniesContent';
import {
  cmsGetIsForCompaniesHidden,
  getForCompaniesContent,
} from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: 'ForCompaniesMetaData',
  });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

const ForCompanies = async ({ locale }: { locale: string }) => {
  const cmsDataForCompanies = await getForCompaniesContent(locale);
  return <ForCompaniesContent cmsDataForCompanies={cmsDataForCompanies} />;
};

export default async function ForCompaniesPage({ params }: Props) {
  const { locale } = await params;

  const fcHide = await cmsGetIsForCompaniesHidden();
  if (fcHide) {
    redirect('/');
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <ForCompanies locale={locale} />
      </Suspense>
    </>
  );
}
