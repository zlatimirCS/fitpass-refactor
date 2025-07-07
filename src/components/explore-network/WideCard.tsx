'use client';
import Image from 'next/image';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';

const WideCard = (props: { slide: any }) => {
  const { slide } = props;

  const [imageSrc, setImageSrc] = useState(
    slide?.photos[0]?.url?.small || '/assets/dummyImages/gym-image.jpg'
  );

  const calculateRating = (score: number, maxScore: number) => {
    return (score / maxScore) * 5;
  };

  const maxScore = 10; // Define your maximum score here
  const rating = calculateRating(slide.rating, maxScore);

  const charLimit = 50; // Define your character limit here
  const truncatedTitle =
    slide.name.length > charLimit
      ? slide.name.substring(0, charLimit) + '...'
      : slide.name;

  const handleImageError = () => {
    setImageSrc('/assets/dummyImages/gym-image.jpg');
  };

  return (
    <div className='slider-card'>
      {/* <div className="blur" style={{ backgroundColor: overlay }}></div> */}
      <div className='slider-card-data-img'>
        <Image
          src={imageSrc}
          fill
          alt='product image'
          style={{ objectFit: 'cover' }}
          sizes='100%'
          onError={handleImageError}
        />
      </div>

      <div className='slider-card-data'>
        <p className='title'>{truncatedTitle}</p>
        <div className='slider-card-ratings-wrapper'>
          <span>{slide.rating}</span>
          <span style={{ marginTop: '-2px' }}>
            <StarRatings
              rating={rating}
              starRatedColor='#e5431f'
              numberOfStars={5}
              name='rating'
              starDimension='18px'
              starSpacing='1px'
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default WideCard;
