import HomepageContent from '@/components/HomepageContent';
import { getHpContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const Homepage = async ({ locale }: { locale: string }) => {
  const cmsDataHp = await getHpContent(locale);
  return <HomepageContent cmsDataHp={cmsDataHp} />;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <Homepage locale={locale} />
      </Suspense>
    </>
  );
}
