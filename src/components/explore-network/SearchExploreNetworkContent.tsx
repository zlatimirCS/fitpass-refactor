import SearchResultsExploreNetworkFiltersSection from './SearchResultsExploreNetworkFiltersSection';

const SearchExploreNetworkContent = ({
  filteredVenues,
  allCities,
}: {
  filteredVenues: any;
  allCities: any;
}) => {
  // if (!cmsDataAboutUs) {
  //   return <p>There was an error loading data</p>;
  // }
  return (
    <>
      <SearchResultsExploreNetworkFiltersSection
        data={filteredVenues}
        allCities={allCities}
      />

      {/* <EveryoneWinsHomeSection mainHpData={mainHpData} /> */}
    </>
  );
};
export default SearchExploreNetworkContent;
