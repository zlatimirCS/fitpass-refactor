'use client';

import Link from 'next/link';
import { Key, useState } from 'react';
import WideCard from './WideCard';

import { useLocale } from 'next-intl';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowRightGray from '@/components/common/icons/ArrowCircleGray';
import { routeTranslations } from '@/lib/routeTranslations';

export const WideCardsSlider = (props: {
  title: any;
  overlay: any;
  id: any;
  data: any;
}) => {
  const locale = useLocale();
  const { title, id, data } = props;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => {
    swiper?.slideNext();
  };
  const handlePrev = () => {
    swiper?.slidePrev();
  };

  return (
    <div className='favorite-section-slider' id={id}>
      <div className='wrapper'>
        <div className='slider-wrapper'>
          <div className='slider-title'>
            <p>
              {title.normal}&nbsp;
              <span>{title.bold}</span>
            </p>
            <div
              className={`slider-controls ${
                data.length <= 5 ? 'hide-on-desktop' : ''
              }`}
            >
              <div className='swiper-button-left' onClick={handlePrev}>
                <ArrowRightGray />
              </div>
              <div className='swiper-button-right' onClick={handleNext}>
                <ArrowRightGray />
              </div>
            </div>
          </div>

          <div className='slider-container'>
            <div className='inner-slider'>
              <Swiper
                onSwiper={s => setSwiper(s)}
                slidesPerView={1.4}
                spaceBetween={20}
                mousewheel={true}
                keyboard={true}
                modules={[Pagination, Keyboard]}
                breakpoints={{
                  600: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {data &&
                  data.length > 0 &&
                  data.map((item: any, idx: Key | null | undefined) => {
                    return (
                      <SwiperSlide key={idx}>
                        <Link
                          href={
                            locale ===
                            `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                              ? `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}/${item.slug}`
                              : `/${locale}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}/${item.slug}`
                          }
                        >
                          <WideCard slide={item} />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
