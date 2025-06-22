import { CmsDataExploreNetwork } from '@/types/types';
import ExploreNetworkHeroSection from './ExploreNetworkHeroSection';

const ExploreNetworkContent = ({
  cmsDataExploreNetwork,
}: CmsDataExploreNetwork) => {
  if (!cmsDataExploreNetwork) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      <ExploreNetworkHeroSection />
    </>
  );
};
export default ExploreNetworkContent;
