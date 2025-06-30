'use client';
import useDimensions from '@/hooks/useDimensions';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

const Timeline = () => {
  const screenWidth = useDimensions() || 0;
  const locale = useLocale();
  const t = useTranslations('AboutUs');
  return (
    <section className='our-story-timeline'>
      {screenWidth < 1024 && (
        <div className='timeline-wrapper'>
          <div className='timeline-mobile'>
            <div className='vertical-line'>
              <Image
                src='/assets/images/about-us/linijakruziciV.svg'
                width={60}
                height={400}
                alt='line with dots'
              />
            </div>
            <div className='timeline-cards'>
              <div className='timeline-card'>
                <span className='year'>2014</span>
                <p className='text'>{t('fitpassStartsSerbia')}</p>
              </div>
              <div className='timeline-card'>
                <span className='year'>2017</span>
                <p className='text'>{t('fitpassBosnia')}</p>
              </div>
              <div className='timeline-card'>
                <span className='year'>2019</span>
                <p className='text'>{t('bigYearFitpass')}</p>
              </div>
              <div className='timeline-card'>
                <span className='year'>2024</span>
                <p className='text'>{t('fitpassCg')}</p>
              </div>
            </div>
          </div>

          <div className='map-image-wrapper'>
            <Image
              src='/assets/images/about-us/belamapa.jpg'
              alt='map picture'
              width={400}
              height={300}
            />
          </div>
        </div>
      )}

      {screenWidth >= 1024 && (
        <div className='timeline-dekstop'>
          <div className='wrapper'>
            {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION && (
              <Image
                src='/assets/images/about-us/desktop-map-timeline.jpg'
                alt='map picture'
                width={800}
                height={600}
              />
            )}
            {locale === 'en' && (
              <Image
                src='/assets/images/timeline-eng.jpg'
                alt='map picture'
                width={800}
                height={600}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Timeline);
