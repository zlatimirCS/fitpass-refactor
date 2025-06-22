'use client';
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Tooltip from '@mui/material/Tooltip';
import StarRatings from 'react-star-ratings';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import GoogleMap from './GoogleMap';
import SingleComment from './SingleComment';
import VenueCarousel from './VenueCarousel';

const SingleVenueDisplayDesktop = ({
  data,
  coordinates,
  formatLinkUrl,
  imagesForCarousel,
  rating,
  readMore,
  readMoreTextLength,
  readMoreText,
  filteredActivities,
  handlePreviousDay,
  handleNextDay,
  calculateScorePercentage,
  selectedDate,
  setReadMore,
  t,
  locale,
  comments,
  atLeastOneActivity,
  isGeneralActivities,
  aboutUs,
  // auHide,
  // fpHide,
  // fcHide,
  // clHide,
  // ctHide,
}: any) => {
  // const [currentSlide, setCurrentSlide] = useState(1);

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // });

  const truncatedInstagram =
    data?.socialNetworks[0]?.instagram?.length > 30
      ? `${data?.socialNetworks[0]?.instagram.slice(0, 30)}...`
      : data?.socialNetworks[0]?.instagram;

  const truncatedFacebook =
    data?.socialNetworks[0]?.facebook?.length > 30
      ? `${data?.socialNetworks[0]?.facebook.slice(0, 30)}...`
      : data?.socialNetworks[0]?.facebook;

  const truncatedYoutube =
    data?.socialNetworks[0]?.youtube?.length > 30
      ? `${data?.socialNetworks[0]?.youtube.slice(0, 30)}...`
      : data?.socialNetworks[0]?.youtube;

  const truncatedTwitter =
    data?.socialNetworks[0]?.twitter?.length > 30
      ? `${data?.socialNetworks[0]?.twitter.slice(0, 30)}...`
      : data?.socialNetworks[0]?.twitter;

  const truncatedWebsite = (website: string | any[]) => {
    // data?.basic_info?.website?.length > 30
    //   ? `${data?.basic_info?.website?.slice(0, 30)}...`
    //   : data?.basic_info?.website;
    if (website?.length > 30) {
      return `${website.slice(0, 30)}...`;
    } else {
      return website;
    }
  };

  // const handleSlideChange = useCallback((swiper) => {
  //   setCurrentSlide(swiper.realIndex + 1);
  // }, []);
  const initialVenues = [
    {
      latLng: coordinates,
      title: 'Fitpass',
    },
  ];

  return (
    <main className='single-venue-view single-venue-view--desktop'>
      <div className='wrapper'>
        <section className='explore-network-single-venue-wrap explore-network-single-venue-wrap--desktop'>
          <aside>
            <div className='sidebar-top'>
              <div className='single-venue-map'>
                {initialVenues && initialVenues?.length > 0 && (
                  <GoogleMap
                    center={coordinates}
                    zoom={16}
                    initialVenues={initialVenues}
                    fullHeight={true}
                    readOnly={true}
                  />
                )}
                {/* {isLoaded && coordinates ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={coordinates}
                    zoom={12}
                  >
                    <Marker
                      position={coordinates}
                      icon={{
                        url: "/assets/icons/pin-g-map-white.svg",
                        scaledSize: { width: 50, height: 50 },
                        origin: { x: 0, y: 0 },
                        anchor: { x: 25, y: 50 },
                      }}
                    />
                  </GoogleMap>
                ) : (
                  <div>{t?.loading}</div>
                )} */}
              </div>
            </div>
            <div className='sidebar-bottom'>
              {data?.name && (
                <article>
                  <img
                    src='/assets/icons/venue-location-icon.svg'
                    alt='venue-info-address'
                  />
                  <div className='venue-info-detail'>{data?.name || ''}</div>
                </article>
              )}
              {data?.phones &&
                data?.phones.length > 0 &&
                !data?.phones.every((phone: null) => phone === null) && (
                  <article>
                    <img
                      src='/assets/icons/venue-phone-icon.svg'
                      alt='venue-info-address'
                    />
                    <div className='venue-info-detail column'>
                      {data?.phones.map((phone: any, index: any) => {
                        return phone !== null ? (
                          <span key={index}>{phone}</span>
                        ) : null;
                      })}
                    </div>
                  </article>
                )}
              {data?.website && (
                <article>
                  <img
                    src='/assets/icons/venue-website-icon.svg'
                    alt='venue-info-address'
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div className='venue-info-detail flex'>
                      <span>{truncatedWebsite(data?.website)}</span>
                      <a
                        // href={data.website ? `${data.website}` : "/"}
                        href={formatLinkUrl(data?.website)}
                        target='_blank'
                      >
                        <span style={{ display: 'inline-block' }}>
                          <img
                            src='/assets/icons/link-url-redirect-icon.svg'
                            style={{
                              width: '10px',
                              height: '10px',
                              cursor: 'pointer',
                            }}
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              )}
              {data?.socialNetworks[0]?.instagram && (
                <article>
                  <img
                    src='/assets/icons/venue-instagram-icon.svg'
                    alt='venue-info-instagram'
                  />
                  <a
                    href={formatLinkUrl(data?.socialNetworks[0]?.instagram)}
                    target='_blank'
                  >
                    <div className='venue-info-detail flex'>
                      <span>{truncatedInstagram}</span>
                      <span style={{ display: 'inline-block' }}>
                        <img
                          src='/assets/icons/link-url-redirect-icon.svg'
                          style={{
                            width: '10px',
                            height: '10px',
                            cursor: 'pointer',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </article>
              )}
              {data?.socialNetworks[0]?.facebook && (
                <article>
                  <img
                    src='/assets/icons/facebook-icon.svg'
                    alt='venue-info-facebook'
                  />
                  <a
                    href={formatLinkUrl(data?.socialNetworks[0]?.facebook)}
                    target='_blank'
                  >
                    <div className='venue-info-detail flex'>
                      <span>{truncatedFacebook}</span>
                      <span style={{ display: 'inline-block' }}>
                        <img
                          src='/assets/icons/link-url-redirect-icon.svg'
                          style={{
                            width: '10px',
                            height: '10px',
                            cursor: 'pointer',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </article>
              )}
              {data?.socialNetworks[0]?.twitter && (
                <article>
                  <img
                    src='/assets/icons/twitter-icon.svg'
                    alt='venue-info-twitter'
                  />
                  <a
                    href={formatLinkUrl(data?.socialNetworks[0]?.twitter)}
                    target='_blank'
                  >
                    <div className='venue-info-detail flex'>
                      <span>{truncatedTwitter}</span>
                      <span style={{ display: 'inline-block' }}>
                        <img
                          src='/assets/icons/link-url-redirect-icon.svg'
                          style={{
                            width: '10px',
                            height: '10px',
                            cursor: 'pointer',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </article>
              )}
              {data?.socialNetworks[0]?.youtube && (
                <article>
                  <img
                    src='/assets/icons/youtube-icon.svg'
                    alt='venue-info-youtube'
                  />
                  <a
                    href={formatLinkUrl(data?.socialNetworks[0]?.youtube)}
                    target='_blank'
                  >
                    <div className='venue-info-detail flex'>
                      <span>{truncatedYoutube}</span>
                      <span style={{ display: 'inline-block' }}>
                        <img
                          src='/assets/icons/link-url-redirect-icon.svg'
                          style={{
                            width: '10px',
                            height: '10px',
                            cursor: 'pointer',
                          }}
                        />
                      </span>
                    </div>
                  </a>
                </article>
              )}
              {data?.workHours && (
                <article className='work-hours'>
                  <img
                    src='/assets/icons/venue-working-hours-icon.svg'
                    alt='venue-info-address'
                  />
                  <div className='venue-info-detail'>
                    <div className='work-hours-title'>{t?.workHours}</div>
                    <div className='work-hours-details'>
                      <div className='work-hours-detail'>
                        <span>{t?.monday}</span>{' '}
                        {data?.workHours?.monday === '-'
                          ? t?.closed
                          : data?.workHours?.monday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.tuesday}</span>{' '}
                        {data?.workHours?.tuesday === '-'
                          ? t?.closed
                          : data?.workHours?.tuesday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.wednesday}</span>{' '}
                        {data?.workHours?.wednesday === '-'
                          ? t?.closed
                          : data?.workHours?.wednesday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.thursday}</span>{' '}
                        {data?.workHours?.thursday === '-'
                          ? t?.closed
                          : data?.workHours?.thursday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.friday}</span>{' '}
                        {data?.workHours?.friday === '-'
                          ? t?.closed
                          : data?.workHours?.friday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.saturday}</span>{' '}
                        {data?.workHours?.saturday === '-'
                          ? t?.closed
                          : data?.workHours?.saturday}
                      </div>
                      <div className='work-hours-detail'>
                        <span>{t?.sunday}</span>{' '}
                        {data?.workHours?.sunday === '-'
                          ? t?.closed
                          : data?.workHours?.sunday}
                      </div>
                    </div>
                  </div>
                </article>
              )}
              {data?.notification_message && (
                <article className='venue-notification'>
                  {data?.notification_message}
                </article>
              )}
            </div>
          </aside>
          <div className='content'>
            {/*main venue image*/}
            <VenueCarousel imagesForCarousel={imagesForCarousel} />
            {/* <div
              className="main-venue-image"
              style={{
                backgroundImage: `${
                  imagesForCarousel.length > 0
                    ? "none"
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
                style={{ height: "100%" }}
                autoplay={{ delay: 3000 }}
                onSlideChange={handleSlideChange}
              >
                {imagesForCarousel.map((img, index) => {
                  return (
                    <SwiperSlide key={index} style={{ height: "100%" }}>
                      <div
                        className="single-venue-carousel-image"
                        style={{ backgroundImage: `url(${img})` }}
                      ></div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="swiper-counter">
                {currentSlide} / {imagesForCarousel.length}
              </div>
            </div> */}
            {/*main venue image*/}
            {/*venue content*/}
            <div className='venue-content'>
              {/*venue content intro*/}
              <div className='venue-content__intro'>
                {/*intro header*/}
                <div className='intro-header'>
                  <div className='intro-header-left'>
                    {/* <img
                        src="/assets/images/venue-logo.png"
                        className="intro-header-venue-logo"
                      /> */}
                    <div className='intro-header-main'>
                      <p>{data?.name}</p>
                      <div
                        style={{
                          display: 'flex',
                          gap: '20px',
                          alignItems: 'center',
                        }}
                      >
                        <span className='graded-value'>{data?.rating}</span>
                        <span>
                          <StarRatings
                            rating={rating}
                            starRatedColor='#e5431f'
                            numberOfStars={5}
                            name='rating'
                            starDimension='24px'
                            starSpacing='1px'
                          />
                        </span>
                        <span className='rev-count'>
                          (
                          {data?.score?.num_reviews
                            ? data?.score?.num_reviews
                            : '0'}
                          )
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="intro-header-fav-star"></div> */}
                </div>
                {/*intro header*/}
                {/*intro comments anchor*/}
                {data?.total_comments > 0 && (
                  <div className='intro-comments-anchor'>
                    <a href='#comments-section-anchor'>
                      <img src='/assets/icons/comments-icon.svg' />
                    </a>
                    <a href='#comments-section-anchor'>
                      <p>
                        {t?.readComments}{' '}
                        {data?.total_comments > 0
                          ? `(${data?.total_comments})`
                          : ''}
                      </p>
                    </a>
                  </div>
                )}
                {/*intro comments anchor*/}
                {/*intro venue desc*/}
                <div className='intro-venue-desc'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: readMoreText(aboutUs?.html || ''),
                    }}
                  ></div>
                  {aboutUs?.html?.length > readMoreTextLength && !readMore && (
                    <p
                      style={{ color: '#e74410', cursor: 'pointer' }}
                      className='read-more-less'
                      onClick={() => setReadMore((prev: any) => !prev)}
                    >
                      {t?.readMore}
                    </p>
                  )}
                  {aboutUs?.html?.length > readMoreTextLength && readMore && (
                    <p
                      style={{
                        color: '#e74410',
                        cursor: 'pointer',
                      }}
                      className='read-more-less'
                      onClick={() => setReadMore((prev: any) => !prev)}
                    >
                      {t?.readLess}
                    </p>
                  )}
                </div>
                {/*intro venue desc*/}
              </div>
              {/*venue content intro*/}
              {/*venue schedule*/}
              {/* {filteredActivities && filteredActivities.length > 0 && ( */}
              {/* {filteredActivities &&
                selectedDate && ( */}
              {atLeastOneActivity && (
                <div className='venue-content__schedule'>
                  <h4>{t?.schedule}</h4>

                  <div className='activities-table'>
                    <div className='table-top'>
                      <div
                        className='prev-activity'
                        // onClick={() => handleSchedule(-1)}
                        onClick={handlePreviousDay}
                      >
                        <img
                          src='/assets/icons/switch-arrow-gray.svg'
                          alt='Previous'
                        />
                        <span>{t?.prevDay}</span>
                      </div>

                      <span className='activity-date'>
                        {/* {scheduleActivities[scheduleIndex]?.date} */}
                        {selectedDate.toLocaleDateString(
                          `${
                            locale ===
                            process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                              ? 'sr-Latn'
                              : 'en-US'
                          }`,
                          {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </span>

                      <div
                        className='next-activity'
                        // onClick={() => handleSchedule(1)}
                        onClick={handleNextDay}
                      >
                        <span>{t?.nextDay}</span>
                        <img
                          src='/assets/icons/switch-arrow-gray.svg'
                          alt='Next'
                        />
                      </div>
                    </div>

                    <div className='table-data'>
                      {filteredActivities &&
                        filteredActivities?.length > 0 &&
                        filteredActivities?.map((activity: any) => {
                          return (
                            <div className='table-row' key={activity._id}>
                              <div className='table-left-side'>
                                {activity?.startTime ? (
                                  <span className='table-activity-time'>
                                    {activity?.startTime} - {activity?.endTime}
                                  </span>
                                ) : (
                                  <span className='table-activity-time'>-</span>
                                )}

                                {activity?.name && (
                                  <span className='table-activity-name'>
                                    {
                                      activity[
                                        `${
                                          locale ===
                                          process.env
                                            .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                            ? 'name'
                                            : 'nameEn'
                                        }`
                                      ]
                                    }
                                  </span>
                                )}
                              </div>
                              <div className='table-right-side'>
                                {activity?.description && (
                                  <Tooltip
                                    enterTouchDelay={0}
                                    title={
                                      activity?.[
                                        `${
                                          locale ===
                                          process.env
                                            .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                            ? 'description'
                                            : 'descriptionEn'
                                        }`
                                      ]
                                    }
                                    componentsProps={{
                                      tooltip: {
                                        sx: {
                                          fontSize: '1.5rem',
                                        },
                                      },
                                    }}
                                  >
                                    <span className='table-activity-note'>
                                      {
                                        activity?.[
                                          `${
                                            locale ===
                                            process.env
                                              .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                              ? 'description'
                                              : 'descriptionEn'
                                          }`
                                        ]
                                      }
                                    </span>
                                  </Tooltip>
                                )}

                                {activity?.extraCharge && (
                                  <span className='table-activity-price'>
                                    {activity?.extraCharge}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {filteredActivities &&
                        filteredActivities?.length === 0 && (
                          <p className='no-activities'>{t?.noActivities}</p>
                        )}
                    </div>
                  </div>
                </div>
              )}
              {!atLeastOneActivity && isGeneralActivities?.length > 0 && (
                <div className='venue-content__schedule'>
                  <h4>{t?.schedule}</h4>
                  <div className='activities-table'>
                    <div className='table-data'>
                      {isGeneralActivities &&
                        isGeneralActivities?.length > 0 &&
                        isGeneralActivities?.map((activity: any) => {
                          return (
                            <div className='table-row' key={activity._id}>
                              <div className='table-left-side'>
                                {activity?.startTime && (
                                  <span className='table-activity-time'>
                                    {activity?.startTime} - {activity?.endTime}
                                  </span>
                                )}
                                {activity?.name && (
                                  <span className='table-activity-name'>
                                    {
                                      activity?.[
                                        `${
                                          locale ===
                                          process.env
                                            .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                            ? 'name'
                                            : 'nameEn'
                                        }`
                                      ]
                                    }
                                  </span>
                                )}
                              </div>
                              <div className='table-right-side'>
                                {activity?.description && (
                                  <Tooltip
                                    enterTouchDelay={0}
                                    title={
                                      activity?.[
                                        `${
                                          locale ===
                                          process.env
                                            .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                            ? 'description'
                                            : 'descriptionEn'
                                        }`
                                      ]
                                    }
                                    componentsProps={{
                                      tooltip: {
                                        sx: {
                                          fontSize: '1.5rem',
                                        },
                                      },
                                    }}
                                  >
                                    <span className='table-activity-note'>
                                      {
                                        activity?.[
                                          `${
                                            locale ===
                                            process.env
                                              .NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                                              ? 'description'
                                              : 'descriptionEn'
                                          }`
                                        ]
                                      }
                                    </span>
                                  </Tooltip>
                                )}

                                {activity?.extraCharge && (
                                  <span className='table-activity-price'>
                                    {activity?.extraCharge}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {/* {filteredActivities && filteredActivities?.length === 0 && (
                      <p className="no-activities">{t?.noActivities}</p>
                    )} */}
                    </div>
                  </div>
                </div>
              )}
              {/* )} */}
              {/* )} */}
              {/*venue schedule*/}
              {/*venue grades*/}
              <div className='venue-content__grades'>
                {/*venue grades top*/}
                <div className='grades-top'>
                  <h4>
                    {t?.commentsAndGrades}
                    <span>{`(${data.score.num_reviews})`}</span>
                  </h4>
                  <article>
                    <div className='grades-top-head'>
                      <span>
                        <img src='/assets/icons/star-icon-venue.svg' />
                      </span>
                      <span>{data?.rating}</span>
                    </div>
                    <div className='grades-top-grid'>
                      <div className='grades-top-grid-item'>
                        <p>
                          {t?.equipment} <span>{data.score.equipment}</span>
                        </p>
                        <div className='scale'>
                          <div
                            className='scale-fill'
                            style={{
                              width: calculateScorePercentage(
                                data.score.equipment
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className='grades-top-grid-item'>
                        <p>
                          {t?.stuff} <span>{data.score.staff}</span>
                        </p>
                        <div className='scale'>
                          <div
                            className='scale-fill'
                            style={{
                              width: calculateScorePercentage(data.score.staff),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className='grades-top-grid-item'>
                        <p>
                          {t?.hygiene} <span>{data.score.hygiene}</span>
                        </p>
                        <div className='scale'>
                          <div
                            className='scale-fill'
                            style={{
                              width: calculateScorePercentage(
                                data.score.hygiene
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className='grades-top-grid-item'>
                        <p>
                          {t?.rooms} <span>{data.score.interior}</span>
                        </p>
                        <div className='scale'>
                          <div
                            className='scale-fill'
                            style={{
                              width: calculateScorePercentage(
                                data.score.interior
                              ),
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                {/*venue grades top*/}
                {/*venue grades bottom*/}
                <div className='grades-bottom'>
                  <img src='/assets/icons/exlamation-mark.svg' />
                  <div className='grades-bottom-content'>
                    <h4>{t?.howToGrade}</h4>
                    <p>{t?.howToGradeAnswer}</p>
                  </div>
                </div>
                {/*venue grades bottom*/}
              </div>
              {/*venue grades*/}
              {/*venue comments*/}
              <div
                className='venue-content__comments'
                id='comments-section-anchor'
              >
                {comments &&
                  comments?.length > 0 &&
                  comments.map((comment: any, index: any) => {
                    return <SingleComment key={index} comment={comment} />;
                  })}
              </div>
              {/*venue comments*/}
            </div>
            {/*venue content*/}
          </div>
        </section>
      </div>
      {/* <Footer
        t={t}
        locale={locale}
        auHide={auHide}
        fpHide={fpHide}
        fcHide={fcHide}
        clHide={clHide}
        ctHide={ctHide}
      /> */}
    </main>
  );
};
export default SingleVenueDisplayDesktop;
