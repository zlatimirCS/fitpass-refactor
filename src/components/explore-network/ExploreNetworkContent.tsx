import { CmsDataExploreNetwork } from '@/types/types';
import ExploreNetworkCompaniesPartnersGrid from './ExploreNetworkCompaniesPartnersGrid';
import ExploreNetworkEveryoneWins from './ExploreNetworkEveryoneWins';
import ExploreNetworkFavoritesSection from './ExploreNetworkFavoritesSection';
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
      {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION === 'sr' && (
        <ExploreNetworkFavoritesSection />
      )}
      {!cmsDataExploreNetwork?.section1Hide && (
        <ExploreNetworkCompaniesPartnersGrid
          cmsDataExploreNetwork={cmsDataExploreNetwork}
        />
      )}
      {!cmsDataExploreNetwork?.section2Hide && (
        <ExploreNetworkEveryoneWins
          cmsDataExploreNetwork={cmsDataExploreNetwork}
        />
      )}
    </>
  );
};
export default ExploreNetworkContent;
