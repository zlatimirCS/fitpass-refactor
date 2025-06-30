import ContactContent from '@/components/contact/ContactContent';
import { getContactContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const Contact = async ({ locale }: { locale: string }) => {
  const cmsDataContact = await getContactContent(locale);
  return <ContactContent cmsDataContact={cmsDataContact} />;
};

export default function ContactPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <Contact locale={locale} />
      </Suspense>
    </>
  );
}
