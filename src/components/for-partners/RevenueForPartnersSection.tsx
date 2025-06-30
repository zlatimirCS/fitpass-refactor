'use client';
import Image from 'next/image';
import { memo } from 'react';
import { CmsDataForPartners } from '../../types/types';

const RevenueForPartnersSection = ({
  cmsDataForPartners,
}: CmsDataForPartners) => {
  return (
    <section className='revenue-membership'>
      <div className='wrapper'>
        <div className='revenue-membership__content'>
          <div
            style={{
              backgroundImage: `url(${
                cmsDataForPartners?.section1Image
                  ? cmsDataForPartners?.section1Image
                  : ''
              })`,
            }}
            className='revenue-left'
          >
            <Image
              src={
                cmsDataForPartners?.section1Image
                  ? cmsDataForPartners?.section1Image
                  : ''
              }
              alt='Fitpass'
              width={400}
              height={300}
            />
          </div>
          <div className='revenue-right'>
            <h2 style={{ position: 'relative' }}>
              <Image
                src='/assets/icons/eclipse-circles.png'
                alt='Fitpass logo'
                width={100}
                height={100}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  transform: 'translateY(30%)',
                  zIndex: -1,
                }}
              />
              <span>
                {cmsDataForPartners?.section1MainHeadingPart1
                  ? cmsDataForPartners?.section1MainHeadingPart1
                  : ''}
              </span>
              <span>
                {' '}
                {cmsDataForPartners?.section1MainHeadingPart2
                  ? cmsDataForPartners?.section1MainHeadingPart2
                  : ''}
              </span>
              <span className='bold'>
                {' '}
                {cmsDataForPartners?.section1MainHeadingPart3
                  ? cmsDataForPartners?.section1MainHeadingPart3
                  : ''}
              </span>
            </h2>
            <article>
              <h4>
                {cmsDataForPartners?.section1Advantage1Title
                  ? cmsDataForPartners?.section1Advantage1Title
                  : ''}
              </h4>
              <p>
                {cmsDataForPartners?.section1Advantage1Text
                  ? cmsDataForPartners?.section1Advantage1Text
                  : ''}
              </p>
            </article>
            <article>
              <h4>
                {cmsDataForPartners?.section1Advantage2Title
                  ? cmsDataForPartners?.section1Advantage2Title
                  : ''}
              </h4>
              <p>
                {cmsDataForPartners?.section1Advantage2Text
                  ? cmsDataForPartners?.section1Advantage2Text
                  : ''}
              </p>
            </article>
            <article>
              <h4>
                {cmsDataForPartners?.section1Advantage3Title
                  ? cmsDataForPartners?.section1Advantage3Title
                  : ''}
              </h4>
              <p>
                {cmsDataForPartners?.section1Advantage3Text
                  ? cmsDataForPartners?.section1Advantage3Text
                  : ''}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(RevenueForPartnersSection);
