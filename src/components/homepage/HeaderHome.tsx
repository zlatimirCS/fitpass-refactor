'use client';
import { memo } from 'react';

import HeroHome from './HeroHome';
import HeroHomeCustom from './HeroHomeCustom';

import useMediaQuery from '@mui/material/useMediaQuery';
import { isDesktop } from 'react-device-detect';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const Header = ({
  mainSlideshowData,
  locale,
}: {
  mainSlideshowData: any;
  locale: string;
}) => {
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');

  const calculateImageToUseForSlider = (locale: string) => {
    if (locale === 'en') {
      return [
        {
          _id: '6752e34892ae4945b8c02ad5',
          sliderBtnText: 'Explore network',
          sliderTitleLine1: 'ONE',
          sliderTitleLine2: 'app for',
          sliderTitleLine3: 'ALL',
          sliderSubTitleLine1: 'sports',
          sliderSubTitleLine2: 'activities.',
          sliderBtnUrlRedirect: `${process.env.NEXT_PUBLIC_SITE_URL}/en/explore-network`,
          url: '/assets/dummyImages/hero-custom-slider.jpg',
          positionIndex: 0,
          hideImage: false,
          firstImage: true,
        },
        ...mainSlideshowData,
      ];
    }
    if (locale === `cg` || locale === `sr`) {
      return [
        {
          _id: '6752e34892ae4945b8c02ad5',
          sliderBtnText: 'Istraži mrežu',
          sliderTitleLine1: 'JEDNA',
          sliderTitleLine2: 'aplikacija za',
          sliderTitleLine3: 'SVE',
          sliderSubTitleLine1: 'sportske',
          sliderSubTitleLine2: 'aktivnosti.',
          sliderBtnUrlRedirect: `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/istrazi-mrezu`,
          url: '/assets/dummyImages/hero-custom-slider.jpg',
          positionIndex: 0,
          hideImage: false,
          firstImage: true,
        },
        ...mainSlideshowData,
      ];
    }
    if (locale === `fr`) {
      return [
        {
          _id: '6752e34892ae4945b8c02ad5',
          sliderBtnText: 'Explorer le réseau',
          sliderTitleLine1: 'UN',
          sliderTitleLine2: 'pass pour',
          sliderTitleLine3: 'TOUS',
          sliderSubTitleLine1: 'sports',
          sliderSubTitleLine2: 'activités.',
          sliderBtnUrlRedirect: `${process.env.NEXT_PUBLIC_SITE_URL}/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/explorer-le-reseau`,
          url: '/assets/dummyImages/hero-custom-slider.jpg',
          positionIndex: 0,
          hideImage: false,
          firstImage: true,
        },
        ...mainSlideshowData,
      ];
    }
  };

  const imagesToUseForSlider = calculateImageToUseForSlider(locale);

  return (
    <header className='home'>
      <Swiper
        slidesPerView={1}
        loop={true}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: isDesktop ? 5000 : 3000,
          disableOnInteraction: false,
        }}
      >
        {imagesToUseForSlider &&
          imagesToUseForSlider?.length > 0 &&
          imagesToUseForSlider
            ?.filter(item => item.hideImage === false)
            ?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className={`home-page-slider-wrapper home-page-slider-wrapper--header ${
                      item.firstImage ? 'custom' : ''
                    }`}
                    style={{
                      backgroundImage: `${
                        !item.firstImage
                          ? `url(${
                              desktop
                                ? item.desktopImage
                                : tablet
                                  ? item.tabletImage
                                  : mobile
                                    ? item.mobileImage
                                    : null
                            })`
                          : ''
                      }`,
                    }}
                  >
                    <div
                      className={`gray-overlay gray-overlay--homeSpec`}
                    ></div>
                    {item.firstImage ? (
                      <HeroHomeCustom item={item} />
                    ) : (
                      <HeroHome item={item} />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
      {/* )} */}
    </header>
  );
};
export default memo(Header);
