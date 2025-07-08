import Loader from '@/components/common/Loader';
import ForPartnersContent from '@/components/for-partners/ForPartnersContent';
import {
  cmsGetIsForPartnersHidden,
  getForPartnersContent,
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
    namespace: 'ForPartnersMetaData',
  });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

const ForPartners = async ({ locale }: { locale: string }) => {
  const cmsDataForPartners = await getForPartnersContent(locale);
  return <ForPartnersContent cmsDataForPartners={cmsDataForPartners} />;
};

export default async function ForPartnersPage({ params }: Props) {
  const { locale } = await params;

  const fpHide = await cmsGetIsForPartnersHidden();
  if (fpHide) {
    redirect('/');
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <ForPartners locale={locale} />
      </Suspense>
    </>
  );
}
