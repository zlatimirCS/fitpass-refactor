import { CmsDataHp } from '@/types/types'; // Adjust the import path as necessary
import CompaniesPartnersGrid from './CompaniesPartnersGrid';
import EveryoneWinsHomeSection from './EveryoneWinsHomeSection';
import GetFitpassStepsHomeSection from './GetFitpassStepsHomeSection';
import LoyaltyProgramHomeSection from './LoyaltyProgramHomeSection';

const HomepageContent = ({ cmsDataHp }: CmsDataHp) => {
  if (!cmsDataHp) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      {!cmsDataHp?.section1Hide && (
        <CompaniesPartnersGrid cmsDataHp={cmsDataHp} />
      )}
      {!cmsDataHp?.section2Hide && (
        <EveryoneWinsHomeSection cmsDataHp={cmsDataHp} />
      )}
      {!cmsDataHp?.section3Hide && (
        <LoyaltyProgramHomeSection cmsDataHp={cmsDataHp} />
      )}
      {!cmsDataHp?.section4Hide && (
        <GetFitpassStepsHomeSection cmsDataHp={cmsDataHp} />
      )}
      {/* <EveryoneWinsHomeSection mainHpData={mainHpData} /> */}
    </>
  );
};
export default HomepageContent;
