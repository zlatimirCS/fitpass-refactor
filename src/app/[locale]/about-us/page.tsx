import AboutUsContent from '@/components/AboutUsContent';
import { getAboutUsContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const About = async ({ locale }: { locale: string }) => {
  const cmsDataAboutUs = await getAboutUsContent(locale);
  return <AboutUsContent cmsDataAboutUs={cmsDataAboutUs} />;
};

export default function AboutUsPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <About locale={locale} />
      </Suspense>
    </>
  );
}
