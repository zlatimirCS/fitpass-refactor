'use client';
import { CmsDataContact } from '@/types/types';
import useMediaQuery from '@mui/material/useMediaQuery';

const HeroContact = ({ cmsDataContact }: CmsDataContact) => {
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
  return (
    <div className='hero-contact'>
      <div
        style={{
          backgroundImage: `url(${
            desktop
              ? cmsDataContact?.sectionHeaderImageDesktop
              : tablet
                ? cmsDataContact?.sectionHeaderImageTablet
                : mobile
                  ? cmsDataContact?.sectionHeaderImageMobile
                  : ''
          })`,
        }}
        className='hero-contact-hero-img-wrap'
      ></div>
      <div className='wrapper'>
        <div className='hero-contact__content'>
          <h1>
            <span>
              {cmsDataContact?.sectionHeaderMainHeadingPart1
                ? cmsDataContact?.sectionHeaderMainHeadingPart1
                : ''}
            </span>
          </h1>
          <p className='hide-mobile'>
            {cmsDataContact?.sectionHeaderText
              ? cmsDataContact?.sectionHeaderText
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};
export default HeroContact;
