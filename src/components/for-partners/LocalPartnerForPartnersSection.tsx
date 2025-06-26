'use client';
import BtnForm from '@/components/BtnForm';
import { CmsDataForPartners } from '@/types/types';
import { memo } from 'react';

const LocalPartnerForCompaniesSection = ({
  cmsDataForPartners,
}: CmsDataForPartners) => {
  const handleOnStartNow = () => {
    // scroll to the top
    const element = document.querySelector('.hero-partners__content__form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className='local-partners-for-partners'>
      <div className='wrapper'>
        <div className='local-partners-for-companies__content'>
          <article>
            <h2>
              <span>
                {cmsDataForPartners?.section2MainHeadingPart1
                  ? cmsDataForPartners?.section2MainHeadingPart1
                  : ''}
              </span>
              <span className='bold'>
                {cmsDataForPartners?.section2MainHeadingPart2
                  ? cmsDataForPartners?.section2MainHeadingPart2
                  : ''}
              </span>
              <span className='bold'>
                {cmsDataForPartners?.section2MainHeadingPart3
                  ? cmsDataForPartners?.section2MainHeadingPart3
                  : ''}
              </span>
            </h2>
            <div className='simple-steps-container'>
              <div className='simple-step'>
                <img src='/assets/icons/znakic.svg' alt='fitpass icon' />
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataForPartners?.section2Step1Title
                      ? cmsDataForPartners?.section2Step1Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataForPartners?.section2Step1Text
                      ? cmsDataForPartners?.section2Step1Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='simple-step'>
                <img src='/assets/icons/znakic.svg' alt='fitpass icon' />
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataForPartners?.section2Step2Title
                      ? cmsDataForPartners?.section2Step2Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataForPartners?.section2Step2Text
                      ? cmsDataForPartners?.section2Step2Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='simple-step'>
                <img src='/assets/icons/znakic.svg' alt='fitpass icon' />
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataForPartners?.section2Step3Title
                      ? cmsDataForPartners?.section2Step3Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataForPartners?.section2Step3Text
                      ? cmsDataForPartners?.section2Step3Text
                      : ''}
                  </p>
                </div>
              </div>
            </div>
            <BtnForm
              text={
                cmsDataForPartners?.section2ButtonText
                  ? cmsDataForPartners?.section2ButtonText
                  : ''
              }
              white
              onClick={handleOnStartNow}
            />
          </article>
          <article className='flex-article'>
            <div className='inner-flex-article'>
              <img
                src={
                  cmsDataForPartners?.section2Image
                    ? cmsDataForPartners?.section2Image
                    : ''
                }
                alt='Fitpass logo'
              />
              <p>
                {cmsDataForPartners?.section2LogoText
                  ? cmsDataForPartners?.section2LogoText
                  : ''}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
export default memo(LocalPartnerForCompaniesSection);
