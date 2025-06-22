import SingleVenueContent from '@/components/SingleVenueContent';
import { getSingleVenueData } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

const SingleVenue = async ({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) => {
  const data = await getSingleVenueData(slug);
  return (
    <SingleVenueContent
      data={data?.venue}
      comments={data?.showCommentsForVenue}
      aboutUs={
        locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
          ? data?.venue?.aboutUs
          : data?.venue?.aboutUsEn
      }
    />
  );
};

export default function SingleVenuePage({ params }: Props) {
  const { locale } = use(params);
  const { slug } = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <SingleVenue slug={slug} locale={locale} />
      </Suspense>
    </>
  );
}
