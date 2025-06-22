import SearchExploreNetworkContent from '@/components/SearchExploreNetworkContent';
import { getCities, getSearchExploreNetworkContent } from '@/lib/fetchData';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SearchExploreNetwork = async ({
  searchParams,
}: {
  searchParams: any;
}) => {
  const filteredVenues = await getSearchExploreNetworkContent(searchParams);
  const allCities = await getCities();
  return (
    <SearchExploreNetworkContent
      filteredVenues={filteredVenues}
      allCities={allCities}
    />
  );
};

export default function SearchExploreNetworkPage({
  params,
  searchParams,
}: Props) {
  const { locale } = use(params);
  const resolvedSearchParams = use(searchParams);

  let querySearchParams: any = [];
  // const locale = props.searchParams.lang;
  for (const key in resolvedSearchParams) {
    querySearchParams.push(`${key}=${resolvedSearchParams[key]}`);
  }
  querySearchParams = querySearchParams.join('&');

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <SearchExploreNetwork searchParams={querySearchParams} />
      </Suspense>
    </>
  );
}
