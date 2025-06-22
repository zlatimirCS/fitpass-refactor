import { useCallback, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const VenueCarousel = ({
  imagesForCarousel,
}: {
  imagesForCarousel: string[];
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const handleSlideChange = useCallback((swiper: { realIndex: number }) => {
    setCurrentSlide(swiper.realIndex + 1);
  }, []);
  return (
    <div
      className='main-venue-image'
      style={{
        backgroundImage: `${
          imagesForCarousel.length > 0
            ? 'none'
            : 'url("/assets/images/gym-91849_1920.jpg")'
        }`,
      }}
    >
      <Swiper
        breakpoints={{
          600: { slidesPerView: 1 },
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        navigation
        style={{ height: '100%' }}
        autoplay={{ delay: 3000 }}
        onSlideChange={handleSlideChange}
      >
        {imagesForCarousel.map((img, index) => {
          return (
            <SwiperSlide key={index} style={{ height: '100%' }}>
              <div
                className='single-venue-carousel-image'
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className='swiper-counter'>
        {currentSlide} / {imagesForCarousel.length}
      </div>
    </div>
  );
};
export default VenueCarousel;
