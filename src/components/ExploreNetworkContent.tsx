import { CmsDataExploreNetwork } from '@/types/types';
import ExploreNetworkFiltersSection from './ExploreNetworkFiltersSection';
import ExploreNetworkHeroSection from './ExploreNetworkHeroSection';

const ExploreNetworkContent = ({
  cmsDataExploreNetwork,
  allCities,
}: CmsDataExploreNetwork & { allCities: any }) => {
  if (!cmsDataExploreNetwork) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      <ExploreNetworkHeroSection />
      <ExploreNetworkFiltersSection allCities={allCities} />
    </>
  );
};
export default ExploreNetworkContent;
