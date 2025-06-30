'use client';
import { CmsDataClub } from '@/types/types';
import useMediaQuery from '@mui/material/useMediaQuery';

const HeroClub = ({ cmsDataClub }: CmsDataClub) => {
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
  return (
    <div className='hero-club'>
      <div
        style={{
          backgroundImage: `url(${
            desktop
              ? cmsDataClub?.sectionHeaderImageDesktop
              : tablet
                ? cmsDataClub?.sectionHeaderImageTablet
                : mobile
                  ? cmsDataClub?.sectionHeaderImageMobile
                  : ''
          })`,
        }}
        className='hero-club-hero-img-wrap'
      ></div>
      <div className='wrapper'>
        <div className='hero-club__content'>
          <h1>
            <span>
              {cmsDataClub?.sectionHeaderMainHeadingPart1
                ? cmsDataClub?.sectionHeaderMainHeadingPart1
                : ''}
            </span>
            <span className='bold'>
              {cmsDataClub?.sectionHeaderMainHeadingPart2
                ? cmsDataClub?.sectionHeaderMainHeadingPart2
                : ''}
            </span>
          </h1>
          <p className='hide-mobile'>
            {cmsDataClub?.sectionHeaderText
              ? cmsDataClub?.sectionHeaderText
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
export default HeroClub;
