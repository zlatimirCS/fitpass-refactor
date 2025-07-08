import { CmsDataForCompanies } from '@/types/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

const BenefitsForCompaniesSection = ({
  cmsDataForCompanies,
}: CmsDataForCompanies) => {
  const locale = useLocale();
  const t = useTranslations('ForCompanies');

  return (
    <section className='company-benefits'>
      <div className='wrapper'>
        <div className='benefit-title'>
          <h2>
            <span>
              {cmsDataForCompanies?.section1MainHeadingPart1
                ? cmsDataForCompanies?.section1MainHeadingPart1
                : ''}
            </span>
            <span className='bold'>
              {cmsDataForCompanies?.section1MainHeadingPart2
                ? cmsDataForCompanies?.section1MainHeadingPart2
                : ''}
            </span>
          </h2>
        </div>

        <div className='benefits-sections'>
          <div className='first-section'>
            <div className='statistics'>
              {' '}
              {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image1
                      ? cmsDataForCompanies?.section1Image1
                      : '/assets/images/placeholder.svg'
                  }
                  alt='25% higher perfomance'
                  width={400}
                  height={300}
                />
              )}
              {locale === 'en' && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image1
                      ? cmsDataForCompanies?.section1Image1
                      : ''
                  }
                  alt='25% higher perfomance'
                  width={400}
                  height={300}
                />
              )}
            </div>

            <div className='benefit-info'>
              <p className='benefit-text-first'>
                {cmsDataForCompanies?.section1Benefit1Text
                  ? cmsDataForCompanies?.section1Benefit1Text
                  : ''}
              </p>
              <p className='benefit-text-source'>
                {t('source')}{' '}
                <span className='bold'>
                  {cmsDataForCompanies?.section1Benefit1Resource
                    ? cmsDataForCompanies?.section1Benefit1Resource
                    : ''}
                </span>
              </p>
            </div>
          </div>
          <div className='second-section'>
            <div className='benefit-info'>
              <p className='benefit-text-first benefit-text-first--textRight'>
                {cmsDataForCompanies?.section1Benefit2Text
                  ? cmsDataForCompanies?.section1Benefit2Text
                  : ''}
              </p>
              <p className='benefit-text-source benefit-text-source--textRight'>
                {t('source')}{' '}
                <span className='bold'>
                  {cmsDataForCompanies?.section1Benefit2Resource
                    ? cmsDataForCompanies?.section1Benefit2Resource
                    : ''}
                </span>
              </p>
            </div>
            <div className='statistics'>
              {/* <img
                src={cmsDataForCompanies ? cmsDataForCompanies?.section1Image2?.url : ""}
                alt="25% higher perfomance"
              /> */}
              {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image2
                      ? cmsDataForCompanies?.section1Image2
                      : '/assets/images/placeholder.svg'
                  }
                  alt='10% increase retention rates'
                  className='left higher'
                  width={400}
                  height={300}
                />
              )}
              {locale === 'en' && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image2
                      ? cmsDataForCompanies?.section1Image2
                      : '/assets/images/placeholder.svg'
                  }
                  alt='10% increase retention rates'
                  className='left'
                  width={400}
                  height={300}
                />
              )}
            </div>
          </div>
          <div className='third-section'>
            <div className='statistics'>
              {' '}
              {/* <img
                src={cmsDataForCompanies ? cmsDataForCompanies?.section1Image3?.url : ""}
                alt="25% higher perfomance"
              /> */}
              {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image3
                      ? cmsDataForCompanies?.section1Image3
                      : '/assets/images/placeholder.svg'
                  }
                  alt='70% company recommend'
                  width={400}
                  height={300}
                />
              )}
              {locale === 'en' && (
                <Image
                  src={
                    cmsDataForCompanies?.section1Image3
                      ? cmsDataForCompanies?.section1Image3
                      : '/assets/images/placeholder.svg'
                  }
                  alt='70% company recommend'
                  width={400}
                  height={300}
                />
              )}
            </div>
            <div className='benefit-info'>
              <p className='benefit-text-first'>
                {cmsDataForCompanies?.section1Benefit3Text
                  ? cmsDataForCompanies?.section1Benefit3Text
                  : ''}
              </p>
              <p className='benefit-text-source'>
                {t('source')}{' '}
                <span className='bold'>
                  {cmsDataForCompanies?.section1Benefit3Resource
                    ? cmsDataForCompanies?.section1Benefit3Resource
                    : ''}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BenefitsForCompaniesSection);
