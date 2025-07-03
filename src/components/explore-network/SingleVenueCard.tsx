'use client';
import { routeTranslations } from '@/lib/routeTranslations';
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as NProgress from 'nprogress';
import { useRef, useState } from 'react';
import VenueOpen from './VenueOpen';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
  loading: () => <div style={{ width: '110px', height: '22px' }}></div>,
});

const SingleVenueCard = ({
  title,
  redirectUrl,
  thumbnail,
  address,
  venueRating,
  isOpen,
  workHours,
  openClosed,
}: any) => {
  const arrowRef = useRef(null);
  const [workHoursTooltipVisible, setWorkHoursTooltipVisible] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('ExploreNetworkPage');
  const maxTitleLength = 50;
  const truncatedTitle =
    title.length > maxTitleLength
      ? title.substring(0, maxTitleLength) + '...'
      : title;

  const calculateRating = (score: number, maxScore: number) => {
    return (score / maxScore) * 5;
  };

  const maxScore = 10; // Define your maximum score here
  const rating = calculateRating(venueRating, maxScore);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();

  const workHoursForTooltip = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Object.entries(workHours).map(([day, time], index, array) => {
        return (
          <span
            key={day}
            style={{
              marginBottom: '2px',
              paddingBottom: '2px',
              borderBottom:
                index !== array.length - 1 ? '1px solid #bcbcbc' : 'none',

              color: day === today ? '#e6441f' : '#474244',
            }}
          >
            {capitalizeFirstLetter(`${t[day as keyof typeof t]}`)}:<br />
            <span
              style={{
                marginBottom: '2px',
                paddingBottom: '2px',
                color: day === today ? '#e6441f' : '#474244',
              }}
            >
              {time === '-' ? t('closed') : (time as string)}
            </span>
          </span>
        );
      })}
    </div>
  );

  const redirectSingleVenueView = () => {
    // if body have class fixed then remove it
    if (document.body.classList.contains('fixed')) {
      document.body.classList.remove('fixed');
    }
    NProgress.start();
    router.push(`/${locale}/explore-network/${redirectUrl}`);
  };

  return (
    <Link
      href={`/${locale}/${
        locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
          ? routeTranslations[locale as keyof typeof routeTranslations][
              'explore-network'
            ]
          : 'explore-network'
      }/${redirectUrl}`}
    >
      <div
        className='single-venue-card'
        onClick={redirectSingleVenueView}
        // onContextMenu={handleRightClick}
      >
        <div className='single-venue-card__image-wrapper'>
          <div
            className='single-venue-card__image'
            onClick={redirectSingleVenueView}
            style={{
              backgroundImage: `url(${
                thumbnail
                  ? thumbnail
                  : '/assets/images/single-venue-placeholder-image.png'
              })`,
            }}
          ></div>
          <div className='mobile-reviews-view'>
            <span className='orange'>{venueRating}</span>
            <span style={{ marginTop: '-2px' }}>
              <StarRatings
                rating={rating}
                starRatedColor='#e5431f'
                numberOfStars={5}
                name='rating'
                starDimension='22px'
                starSpacing='1px'
              />
            </span>
          </div>
        </div>
        {/* </Link> */}
        <div className='single-venue-card__content'>
          <h3
            className='single-venue-card__title'
            style={{ letterSpacing: '0.5px' }}
            onClick={redirectSingleVenueView}
          >
            {truncatedTitle}
          </h3>
          <div className='single-venue-card-item single-venue-card__reviews'>
            <span className='orange'>{venueRating}</span>
            <span style={{ marginTop: '-2px' }}>
              <StarRatings
                rating={rating}
                starRatedColor='#e5431f'
                numberOfStars={5}
                name='rating'
                starDimension='22px'
                starSpacing='1px'
              />
            </span>
          </div>
          <div className='single-venue-card-item single-venue-card__location'>
            <Image
              src='/assets/icons/venue-location-icon.svg'
              alt='location icon'
              width={20}
              height={20}
              className='large'
            />
            <span style={{ letterSpacing: '1px' }}>
              {address &&
                `${address.street} ${address.number}, ${address.city}`}
            </span>
          </div>
          <div className='single-venue-card-item single-venue-card__hours'>
            <Image
              src='/assets/icons/venue-working-hours-icon.svg'
              alt='hours icon'
              width={16}
              height={16}
              className='smaller'
            />
            <div className='inner-flex'>
              <div>
                <VenueOpen
                  isOpen={isOpen}
                  text={isOpen ? t('open') : t('closed')}
                />
              </div>
              <div
                className='inner-open-closed-hours'
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  setWorkHoursTooltipVisible(prev => !prev);
                }}
              >
                <span>{openClosed}</span>
                <Image
                  ref={arrowRef}
                  className={`work-hours-arrow ${
                    workHoursTooltipVisible ? 'active' : ''
                  }`}
                  src='/assets/icons/switch-arrow-gray.svg'
                  alt='chevron down'
                  width={16}
                  height={16}
                />
                <div
                  className={`work-hours-tooltip ${
                    workHoursTooltipVisible ? 'active' : ''
                  }`}
                >
                  {workHoursForTooltip}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SingleVenueCard;
