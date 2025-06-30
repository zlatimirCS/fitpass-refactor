import ClubContent from '@/components/club/ClubContent';
import { getClubCards, getClubContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const Club = async ({ locale }: { locale: string }) => {
  const cmsDataClub = await getClubContent(locale);
  const data = await getClubCards();
  return <ClubContent cmsDataClub={cmsDataClub} data={data} />;
};

export default function ClubPage({ params }: Props) {
  const { locale } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p></p>}>
        <Club locale={locale} />
      </Suspense>
    </>
  );
}
