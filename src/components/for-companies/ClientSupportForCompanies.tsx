import { CmsDataForCompanies } from '@/types/types';
import Image from 'next/image';
import { memo } from 'react';

const ClientSupportForCompanies = ({
  cmsDataForCompanies,
}: CmsDataForCompanies) => {
  return (
    <section className='client-support'>
      <div className='wrapper'>
        <div className='client-support__content'>
          <div className='revenue-right'>
            <h2>
              <span className='bold'>
                {cmsDataForCompanies?.section2MainHeadingPart1
                  ? cmsDataForCompanies?.section2MainHeadingPart1
                  : ''}
              </span>
              <span>
                {cmsDataForCompanies?.section2MainHeadingPart2
                  ? cmsDataForCompanies?.section2MainHeadingPart2
                  : ''}
              </span>
            </h2>
            <article>
              <h4>
                {cmsDataForCompanies?.section2Advantage1Title
                  ? cmsDataForCompanies?.section2Advantage1Title
                  : ''}
              </h4>
              <p>
                {cmsDataForCompanies?.section2Advantage1Text
                  ? cmsDataForCompanies?.section2Advantage1Text
                  : ''}
              </p>
            </article>
            <article>
              <h4>
                {cmsDataForCompanies?.section2Advantage2Title
                  ? cmsDataForCompanies?.section2Advantage2Title
                  : ''}
              </h4>
              <p>
                {cmsDataForCompanies?.section2Advantage2Text
                  ? cmsDataForCompanies?.section2Advantage2Text
                  : ''}
              </p>
            </article>
            <article>
              <h4>
                {cmsDataForCompanies?.section2Advantage3Title
                  ? cmsDataForCompanies?.section2Advantage3Title
                  : ''}
              </h4>
              <p>
                {cmsDataForCompanies?.section2Advantage3Text
                  ? cmsDataForCompanies?.section2Advantage3Text
                  : ''}
              </p>
            </article>
            <article>
              <h4>
                {cmsDataForCompanies?.section2Advantage4Title
                  ? cmsDataForCompanies?.section2Advantage4Title
                  : ''}
              </h4>
              <p>
                {cmsDataForCompanies?.section2Advantage4Text
                  ? cmsDataForCompanies?.section2Advantage4Text
                  : ''}
              </p>
            </article>
          </div>
          <div
            style={{
              backgroundImage: `url(${cmsDataForCompanies?.section2Image})`,
            }}
            className='revenue-left'
          >
            <Image
              src={
                cmsDataForCompanies?.section2Image
                  ? cmsDataForCompanies?.section2Image
                  : '/assets/images/placeholder.svg'
              }
              alt='Fitpass'
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(ClientSupportForCompanies);
