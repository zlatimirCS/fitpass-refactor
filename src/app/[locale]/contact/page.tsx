import ContactContent from '@/components/contact/ContactContent';
import { cmsGetIsContactHidden, getContactContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'ContactMetaData' });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
  };
}

const Contact = async ({ locale }: { locale: string }) => {
  const cmsDataContact = await getContactContent(locale);
  return <ContactContent cmsDataContact={cmsDataContact} />;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  const ctHide = await cmsGetIsContactHidden();
  if (ctHide) {
    redirect('/');
  }

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
