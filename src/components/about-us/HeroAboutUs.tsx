'use client';
import useDimensions from '@/hooks/useDimensions';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { memo } from 'react';
import { CmsDataAboutUs } from '../../types/types';

const HeroAboutUs = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  const screenWidth = useDimensions();
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');

  return (
    <div className='hero-about-us'>
      <div
        style={{
          backgroundImage: `url(${
            desktop
              ? cmsDataAboutUs?.sectionHeaderImageDesktop
              : tablet
                ? cmsDataAboutUs?.sectionHeaderImageTablet
                : mobile
                  ? cmsDataAboutUs?.sectionHeaderImageMobile
                  : ''
          })`,
        }}
        className='hero-about-us-hero-img-wrap'
      >
        <div className='gray-overlay'></div>

        {(screenWidth ?? 0) < 1200 && (
          <Image
            src={cmsDataAboutUs?.sectionHeroHeaderImage ?? ''}
            alt='mobile phone screen'
            className='hero-about-us-hero-img'
            width={1200}
            height={1200}
          />
        )}
      </div>
      <div className='wrapper'>
        <div className='hero-about-us__content'>
          <h1>
            <span className='bold'>
              {cmsDataAboutUs?.sectionHeaderMainHeadingPart1
                ? cmsDataAboutUs?.sectionHeaderMainHeadingPart1
                : 'One Pass'}
            </span>
            <span className='bold'>
              {cmsDataAboutUs?.sectionHeaderMainHeadingPart2
                ? cmsDataAboutUs?.sectionHeaderMainHeadingPart2
                : 'Fits All'}
            </span>
          </h1>
        </div>

        {(screenWidth ?? 0) >= 1200 && (
          <Image
            src={cmsDataAboutUs?.sectionHeroHeaderImage ?? ''}
            alt='mobile phone screen'
            className='hero-about-us-hero-img'
            width={1200}
            height={1200}
          />
        )}
      </div>
    </div>
  );
};
export default memo(HeroAboutUs);
