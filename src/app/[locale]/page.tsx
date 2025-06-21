import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';
import {getHpContent} from '@/lib/fetchData';
import CompaniesPartnersGrid from '@/components/CompaniesPartnersGrid';
import {Suspense} from 'react';

type Props = {
  params: Promise<{locale: Locale}>;
};

const CompaniesPartners = async ({locale}: {locale: string}) => {
  const mainHpData = await getHpContent(locale);
  return <CompaniesPartnersGrid mainHpData={mainHpData} />;
};

export default function IndexPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <CompaniesPartners locale={locale} />
      </Suspense>
    </>
  );
}
