import { useLocale } from 'next-intl';
import CompaniesPartnersGrid from './CompaniesPartnersGrid';
import EveryoneWinsHomeSection from './EveryoneWinsHomeSection';
import GetFitpassStepsHomeSection from './GetFitpassStepsHomeSection';
import HeaderHome from './HeaderHome';
import LoyaltyProgramHomeSection from './LoyaltyProgramHomeSection';

const HomepageContent = ({
  cmsDataHp,
  mainSlideshowData,
}: {
  cmsDataHp: any;
  mainSlideshowData: any;
}) => {
  if (!cmsDataHp) {
    throw new Error('Something went wrong!');
  }
  const locale = useLocale();
  return (
    <>
      <HeaderHome mainSlideshowData={mainSlideshowData} locale={locale} />
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
