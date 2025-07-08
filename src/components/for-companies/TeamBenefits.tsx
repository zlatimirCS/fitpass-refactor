import { CmsDataForCompanies } from '@/types/types';
import { memo } from 'react';
import BenefitCard from './BenefitCard';

const TeamBenefits = ({ cmsDataForCompanies }: CmsDataForCompanies) => {
  const benefitCardItems = [
    {
      title: cmsDataForCompanies?.section3Card1Title
        ? cmsDataForCompanies?.section3Card1Title
        : '',
      subtitle: cmsDataForCompanies?.section3Card1Text
        ? cmsDataForCompanies?.section3Card1Text
        : '',
      icon: cmsDataForCompanies?.section3Image1
        ? cmsDataForCompanies?.section3Image1
        : '/assets/images/placeholder.svg',
    },
    {
      title: cmsDataForCompanies?.section3Card2Title
        ? cmsDataForCompanies?.section3Card2Title
        : '',
      subtitle: cmsDataForCompanies?.section3Card2Text
        ? cmsDataForCompanies?.section3Card2Text
        : '',
      icon: cmsDataForCompanies?.section3Image2
        ? cmsDataForCompanies?.section3Image2
        : '/assets/images/placeholder.svg',
    },
    {
      title: cmsDataForCompanies?.section3Card3Title
        ? cmsDataForCompanies?.section3Card3Title
        : '',
      subtitle: cmsDataForCompanies?.section3Card3Text
        ? cmsDataForCompanies?.section3Card3Text
        : '',
      icon: cmsDataForCompanies?.section3Image3
        ? cmsDataForCompanies?.section3Image3
        : '/assets/images/placeholder.svg',
    },
    {
      title: cmsDataForCompanies?.section3Card4Title
        ? cmsDataForCompanies?.section3Card4Title
        : '',
      subtitle: cmsDataForCompanies?.section3Card4Text
        ? cmsDataForCompanies?.section3Card4Text
        : '',
      icon: cmsDataForCompanies?.section3Image4
        ? cmsDataForCompanies?.section3Image4
        : '/assets/images/placeholder.svg',
    },
  ];
  return (
    <section className='team-benefits'>
      <div className='wrapper'>
        <div className='team-benefits-top'>
          <h2>
            {cmsDataForCompanies?.section3MainHeading
              ? cmsDataForCompanies?.section3MainHeading
              : ''}
          </h2>
        </div>
        <div className='team-benefits-bottom'>
          <div className='team-benefits-grid'>
            {benefitCardItems &&
              benefitCardItems.length > 0 &&
              benefitCardItems.map((item, index) => {
                return (
                  <BenefitCard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    icon={item.icon}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(TeamBenefits);
