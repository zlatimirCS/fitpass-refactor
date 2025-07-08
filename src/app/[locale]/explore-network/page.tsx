import Loader from '@/components/common/Loader';
import ExploreNetworkContent from '@/components/explore-network/ExploreNetworkContent';
import { getCities, getExploreNetworkContent } from '@/lib/fetchData';
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
    namespace: 'ExploreNetworkMetaData',
  });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

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
      <Suspense fallback={<Loader />}>
        <ExploreNetwork locale={locale} />
      </Suspense>
    </>
  );
}
