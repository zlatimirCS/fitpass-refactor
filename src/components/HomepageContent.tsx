import CompaniesPartnersGrid from './CompaniesPartnersGrid';
import EveryoneWinsHomeSection from './EveryoneWinsHomeSection';
import {CmsDataHp} from '@/types/types'; // Adjust the import path as necessary

const HomepageContent = ({cmsDataHp}: CmsDataHp) => {
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
      {/* <EveryoneWinsHomeSection mainHpData={mainHpData} /> */}
    </>
  );
};
export default HomepageContent;
