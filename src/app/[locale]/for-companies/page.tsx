import ForCompaniesContent from '@/components/for-companies/ForCompaniesContent';
import { getForCompaniesContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const ForCompanies = async ({ locale }: { locale: string }) => {
  const cmsDataForCompanies = await getForCompaniesContent(locale);
  return <ForCompaniesContent cmsDataForCompanies={cmsDataForCompanies} />;
};

export default function ForCompaniesPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <ForCompanies locale={locale} />
      </Suspense>
    </>
  );
}
