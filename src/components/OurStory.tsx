import { CmsDataAboutUs } from '@/types/types';
import Image from 'next/image';
import { memo } from 'react';

const OurStory = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  return (
    <section className='our-story-section'>
      <div className='wrapper'>
        <div className='about-us-title'>
          <h2>
            {cmsDataAboutUs?.section1MainHeading
              ? cmsDataAboutUs?.section1MainHeading
              : ''}
          </h2>
        </div>

        <div className='about-us-sections'>
          <div className='first-section'>
            <div className='story-text'>
              <p>
                {cmsDataAboutUs?.section1Row1Text
                  ? cmsDataAboutUs?.section1Row1Text
                  : ''}
              </p>
            </div>
            <div className='story-image video-player'>
              <div className='fitpass-video'>
                {cmsDataAboutUs && cmsDataAboutUs?.section1Row1VideoUrl && (
                  <video
                    key={cmsDataAboutUs?.section1Row1VideoUrl}
                    controls
                    loop
                    playsInline
                    id='myVideo'
                  >
                    <source
                      src={
                        cmsDataAboutUs
                          ? cmsDataAboutUs?.section1Row1VideoUrl
                          : ''
                      }
                      type='video/mp4'
                    />
                  </video>
                )}
              </div>
            </div>
          </div>
          <div className='second-section'>
            <div className='story-text'>
              <p>
                {' '}
                {cmsDataAboutUs?.section1Row2Text
                  ? cmsDataAboutUs?.section1Row2Text
                  : ''}
              </p>
            </div>
            <div className='story-image'>
              <Image
                src={
                  cmsDataAboutUs?.section1Image1
                    ? cmsDataAboutUs?.section1Image1
                    : '/assets/images/about-us/pins.svg'
                }
                width={190}
                height={180}
                alt='pins icon'
              />
            </div>
          </div>
          <div className='third-section'>
            <div className='story-text'>
              <p>
                {' '}
                {cmsDataAboutUs?.section1Row3Text
                  ? cmsDataAboutUs?.section1Row3Text
                  : ''}
              </p>
            </div>
            <div className='story-image'>
              <Image
                src={
                  cmsDataAboutUs?.section1Image2
                    ? cmsDataAboutUs?.section1Image2
                    : '/assets/images/about-us/goreruke.svg'
                }
                width={190}
                height={180}
                alt='pins icon'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(OurStory);
