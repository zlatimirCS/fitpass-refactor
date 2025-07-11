import { CmsDataForCompanies } from '@/types/types';
import BenefitsForCompaniesSection from './BenefitsForCompaniesSection';
import ClientSupportForCompanies from './ClientSupportForCompanies';
import HeaderForCompanies from './HeaderForCompanies';
import TeamBenefits from './TeamBenefits';

const ForCompaniesContent = ({ cmsDataForCompanies }: CmsDataForCompanies) => {
  if (!cmsDataForCompanies) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      <HeaderForCompanies cmsDataForCompanies={cmsDataForCompanies} />
      {!cmsDataForCompanies.section1Hide && (
        <BenefitsForCompaniesSection
          cmsDataForCompanies={cmsDataForCompanies}
        />
      )}
      {!cmsDataForCompanies.section2Hide && (
        <ClientSupportForCompanies cmsDataForCompanies={cmsDataForCompanies} />
      )}
      {!cmsDataForCompanies.section3Hide && (
        <TeamBenefits cmsDataForCompanies={cmsDataForCompanies} />
      )}
    </>
  );
};
export default ForCompaniesContent;
