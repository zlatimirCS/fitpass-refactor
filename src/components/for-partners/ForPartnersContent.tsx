import { CmsDataForPartners } from '@/types/types';
import HeaderForPartners from './HeaderForPartners';
import LocalPartnerForPartnersSection from './LocalPartnerForPartnersSection';
import MoreInfoForPartnersSection from './MoreInfoForPartnersSection';
import RevenueForPartnersSection from './RevenueForPartnersSection';

const ForPartnersContent = ({ cmsDataForPartners }: CmsDataForPartners) => {
  if (!cmsDataForPartners) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      <HeaderForPartners cmsDataForPartners={cmsDataForPartners} />
      {!cmsDataForPartners.section1Hide && (
        <RevenueForPartnersSection cmsDataForPartners={cmsDataForPartners} />
      )}
      {!cmsDataForPartners.section2Hide && (
        <LocalPartnerForPartnersSection
          cmsDataForPartners={cmsDataForPartners}
        />
      )}
      {!cmsDataForPartners.section3Hide && (
        <MoreInfoForPartnersSection cmsDataForPartners={cmsDataForPartners} />
      )}
    </>
  );
};
export default ForPartnersContent;
