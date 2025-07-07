'use client';
import Image from 'next/image';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';

const SpecialCard = ({ item }: { item: any }) => {
  const [imageSrc, setImageSrc] = useState(
    item?.photos[0]?.url?.small || '/assets/dummyImages/gym-image.jpg'
  );

  const handleImageError = () => {
    setImageSrc('/assets/dummyImages/gym-image.jpg');
  };
  const charLimit = 35; // Define your character limit here
  const truncatedTitle =
    item.name.length > charLimit
      ? item.name.substring(0, charLimit) + '...'
      : item.name;

  const calculateRating = (score: number, maxScore: number) => {
    return (score / maxScore) * 5;
  };

  const maxScore = 10; // Define your maximum score here
  const rating = calculateRating(item.rating, maxScore);
  return (
    <div className='slider-card-wrap'>
      <div className='slider-card'>
        <div className='slider-card-top'>
          <div className='blur'></div>
          <Image
            src={imageSrc}
            width={600}
            height={400}
            alt='product image'
            onError={handleImageError}
          />
        </div>

        <div className='slider-card-data'>
          <p className='discount'>-20%</p>
          <p className='title'>{truncatedTitle}</p>
          <div className='slider-card-ratings-wrapper'>
            <span>{item.rating}</span>
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
    </div>
  );
};

export default SpecialCard;
