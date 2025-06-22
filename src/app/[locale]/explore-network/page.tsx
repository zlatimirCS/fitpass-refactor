import ExploreNetworkContent from '@/components/ExploreNetworkContent';
import { getCities, getExploreNetworkContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const ExploreNetwork = async ({ locale }: { locale: string }) => {
  const cmsDataExploreNetwork = await getExploreNetworkContent(locale);
  const allCities = await getCities();
  return (
    <ExploreNetworkContent
      cmsDataExploreNetwork={cmsDataExploreNetwork}
      allCities={allCities}
    />
  );
};

export default function ExploreNetworkPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <ExploreNetwork locale={locale} />
      </Suspense>
    </>
  );
}
