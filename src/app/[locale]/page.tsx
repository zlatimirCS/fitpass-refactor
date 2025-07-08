export const dynamic = 'force-dynamic';
import Loader from '@/components/common/Loader';
import HomepageContent from '@/components/homepage/HomepageContent';
import { getHpContent, getMainSlideshowData } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const Homepage = async ({ locale }: { locale: string }) => {
  const cmsDataHp = await getHpContent(locale);
  const mainSlideshowData = await getMainSlideshowData(locale);
  return (
    <HomepageContent
      cmsDataHp={cmsDataHp}
      mainSlideshowData={mainSlideshowData}
    />
  );
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Homepage locale={locale} />
      </Suspense>
    </>
  );
}
