'use client';

import { routeTranslations } from '@/lib/routeTranslations';
import Link from 'next/link';
import { Key, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SpecialCard from './SpecialCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowRightGray from '@/components/common/icons/ArrowCircleGray';
import { useLocale } from 'next-intl';

export const SpecialCardsSlider = (props: {
  title: any;
  data: any;
  id: any;
}) => {
  const { title, data, id } = props;
  const locale = useLocale();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => {
    swiper?.slideNext();
  };
  const handlePrev = () => {
    swiper?.slidePrev();
  };

  return (
    <div className='wrapper' id={id}>
      <div className='special-offer-section-slider'>
        <div className='slider-wrapper'>
          <div className='slider-title'>
            <p>
              {title.normal}&nbsp;
              <span>{title.bold}</span>
            </p>
            <div
              className={`slider-controls special-offer ${
                data.length <= 3 ? 'hide-on-desktop' : ''
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
          {/*
        <div className="slider-container">
          <div className="inner-slider">
            <Link href={"/"}>
              <SpecialCard />
            </Link>
          </div>
        </div> */}

          <div className='slider-container'>
            <div className='inner-slider'>
              <Swiper
                onSwiper={s => setSwiper(s)}
                // slidesPerView={1.4}
                spaceBetween={0}
                mousewheel={true}
                keyboard={true}
                modules={[Pagination, Keyboard]}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {data &&
                  data.length > 0 &&
                  data.map(
                    (item: { slug: any }, idx: Key | null | undefined) => {
                      return (
                        <SwiperSlide key={idx}>
                          <Link
                            href={
                              locale ===
                              `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                                ? `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}/${item.slug}`
                                : `/${locale}/explore-network/${item.slug}`
                            }
                          >
                            <SpecialCard item={item} />
                          </Link>
                        </SwiperSlide>
                      );
                    }
                  )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
