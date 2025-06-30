import dynamic from 'next/dynamic';
import Image from 'next/image';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
  loading: () => <div style={{ width: '90px', height: '18px' }}></div>,
});

const SidebarVenueCard = ({
  name,
  address,
  rating,
  thumbnail,
  setVenuesForMap,
  venue,
  setSelectedMarker,
}: any) => {
  const calculateRating = (score: number, maxScore: number) => {
    return (score / maxScore) * 5;
  };

  const maxScore = 10; // Define your maximum score here
  const venueRating = calculateRating(rating, maxScore);

  const changeMapPinBasedOnVenue = () => {
    window.scrollTo(0, 0);
    setVenuesForMap([
      {
        latLng: { lat: venue?.lat, lng: venue?.lng },
        slug: venue?.slug,
        name: venue?.name,
        photos: venue?.photos,
        address: venue?.address,
      },
    ]);
    setSelectedMarker(venue);
  };

  const maxTitleLength = 40;
  const truncatedTitle =
    name.length > maxTitleLength
      ? name.substring(0, maxTitleLength) + '...'
      : name;

  return (
    <div className='modal-single-venue-card'>
      {/* <Link
        href={`/explore-network/${slug}`}
        className="modal-single-venue-card__image-wrapper"
      > */}
      <div className='modal-single-venue-card__image-wrapper'>
        <div
          className='modal-single-venue-card__image'
          onClick={changeMapPinBasedOnVenue}
          style={{
            backgroundImage: `url(${
              thumbnail
                ? thumbnail
                : '/assets/images/modal-single-venue-placeholder-image.png'
            })`,
          }}
        ></div>
      </div>
      {/* </Link> */}
      <div className='modal-single-venue-card__content'>
        <h3
          className='modal-single-venue-card__title'
          style={{ letterSpacing: '0.5px' }}
          onClick={changeMapPinBasedOnVenue}
        >
          {truncatedTitle}
        </h3>

        <div className='location-and-rating'>
          <div className='modal-single-venue-card-item modal-single-venue-card__location'>
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

          <div className='modal-single-venue-card-item modal-single-venue-card__reviews'>
            <span className='orange'>{rating}</span>
            <span style={{ marginTop: '-2px' }}>
              <StarRatings
                rating={venueRating}
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
export default SidebarVenueCard;
