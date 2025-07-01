import ForCompaniesContent from '@/components/for-companies/ForCompaniesContent';
import { getForCompaniesContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

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

export default function ForCompaniesPage({ params }: Props) {
  const { locale } = use(params);

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
