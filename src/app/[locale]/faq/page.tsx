import FaqContent from '@/components/faq/FaqContent';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';
import FaqDesktop from './FaqDesktop';
import FaqMobile from './FaqMobile';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: 'FaqMetaData',
  });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

export default function FaqPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <FaqContent />
        <div className='faq-desktop-only'>
          <FaqDesktop />
        </div>
        <div className='faq-mobile-only'>
          <FaqMobile />
        </div>
      </Suspense>
    </>
  );
}
