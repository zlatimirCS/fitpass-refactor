import FaqContent from '@/components/faq/FaqContent';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';
import FaqDesktop from './FaqDesktop';
import FaqMobile from './FaqMobile';

type Props = {
  params: Promise<{ locale: Locale }>;
};

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
