import ForPartnersContent from '@/components/for-partners/ForPartnersContent';
import { getForPartnersContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const ForPartners = async ({ locale }: { locale: string }) => {
  const cmsDataForPartners = await getForPartnersContent(locale);
  return <ForPartnersContent cmsDataForPartners={cmsDataForPartners} />;
};

export default function ForPartnersPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <ForPartners locale={locale} />
      </Suspense>
    </>
  );
}
