'use client';
import { useState } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Tooltip from '@mui/material/Tooltip';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import GoogleMap from './GoogleMap';
import SingleComment from './SingleComment';
import VenueCarousel from './VenueCarousel';

const SingleVenueDisplayMobile = ({
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
  setReadMore,
  selectedDate,
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
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  // });
  const t = useTranslations('ExploreNetworkPage');
  const locale = useLocale();
  const [isWorksHoursOpen, setIsWorksHoursOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const truncatedInstagram =
    data?.socialNetworks[0]?.instagram?.length > 30
      ? `${data?.socialNetworks[0]?.instagram.slice(0, 30)}...`
      : data?.socialNetworks[0]?.instagram;

  const truncatedFacebook =
    data?.socialNetworks[0]?.facebook?.length > 30
      ? `${data?.socialNetworks[0]?.facebook.slice(0, 30)}...`
      : data?.socialNetworks[0]?.facebook;

  const truncatedTwitter =
    data?.socialNetworks[0]?.twitter?.length > 30
      ? `${data?.socialNetworks[0]?.twitter.slice(0, 30)}...`
      : data?.socialNetworks[0]?.twitter;

  const truncatedYoutube =
    data?.socialNetworks[0]?.youtube?.length > 30
      ? `${data?.socialNetworks[0]?.youtube.slice(0, 30)}...`
      : data?.socialNetworks[0]?.youtube;

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

  const initialVenues = [
    {
      latLng: coordinates,
      title: 'Fitpass',
    },
  ];

  return (
    <main className='single-venue-view single-venue-view--mobile'>
      <section className='explore-network-single-venue-wrap explore-network-single-venue-wrap--mobile'>
        <div className='content'>
          {/*main venue image*/}
          <VenueCarousel imagesForCarousel={imagesForCarousel} />
          {/*main venue image*/}
          {/*venue content*/}
          <div className='venue-content'>
            {/*venue content intro*/}
            <div className='venue-content__intro'>
              <div className='wrapper'>
                {/*intro header*/}
                <div className='intro-header'>
                  <div className='intro-header-left'>
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
                      <Image
                        src='/assets/icons/comments-icon.svg'
                        width={24}
                        height={24}
                        alt='comments icon'
                      />
                    </a>
                    <a href='#comments-section-anchor'>
                      <p>
                        {t('readComments')}{' '}
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
                      {t('readMore')}
                    </p>
                  )}
                  {aboutUs?.html?.length > readMoreTextLength && readMore && (
                    <p
                      style={{ color: '#e74410', cursor: 'pointer' }}
                      className='read-more-less'
                      onClick={() => setReadMore((prev: any) => !prev)}
                    >
                      {t('readLess')}
                    </p>
                  )}
                </div>
                {/*intro venue desc*/}
              </div>
            </div>
            {/*venue content intro*/}
            {/*venue map*/}
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
            </div>
            {/*venue map*/}

            <div className='sidebar-bottom'>
              <div className='wrapper'>
                {data?.name && (
                  <article>
                    <Image
                      src='/assets/icons/venue-location-icon.svg'
                      alt='venue-info-address'
                      width={20}
                      height={20}
                    />
                    <div className='venue-info-detail'>{data?.name || ''}</div>
                  </article>
                )}
                {data?.phones &&
                  data?.phones?.length > 0 &&
                  !data?.phones?.every((phone: any) => phone === null) && (
                    <article>
                      <Image
                        src='/assets/icons/venue-phone-icon.svg'
                        alt='venue-info-address'
                        width={20}
                        height={20}
                      />
                      <div className='venue-info-detail column'>
                        {data?.phones?.map((phone: any, index: number) => {
                          return phone !== null ? (
                            <span key={index}>{phone}</span>
                          ) : null;
                        })}
                      </div>
                    </article>
                  )}
                {data?.website && (
                  <article>
                    <Image
                      src='/assets/icons/venue-website-icon.svg'
                      alt='venue-info-address'
                      width={20}
                      height={20}
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
                            <Image
                              src='/assets/icons/link-url-redirect-icon.svg'
                              width={10}
                              height={10}
                              style={{
                                width: '10px',
                                height: '10px',
                                cursor: 'pointer',
                              }}
                              alt='link url redirect icon'
                            />
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                )}
                {data?.socialNetworks[0]?.instagram && (
                  <article>
                    <Image
                      src='/assets/icons/venue-instagram-icon.svg'
                      alt='venue-info-instagram'
                      width={20}
                      height={20}
                    />
                    <a
                      href={formatLinkUrl(data?.socialNetworks[0]?.instagram)}
                      target='_blank'
                    >
                      <div className='venue-info-detail flex'>
                        <span>{truncatedInstagram}</span>
                        <span style={{ display: 'inline-block' }}>
                          <Image
                            src='/assets/icons/link-url-redirect-icon.svg'
                            width={10}
                            height={10}
                            style={{
                              width: '10px',
                              height: '10px',
                              cursor: 'pointer',
                            }}
                            alt='link url redirect icon'
                          />
                        </span>
                      </div>
                    </a>
                  </article>
                )}
                {data?.socialNetworks[0]?.facebook && (
                  <article>
                    <Image
                      src='/assets/icons/facebook-icon.svg'
                      alt='venue-info-facebook'
                      width={20}
                      height={20}
                    />
                    <a
                      href={formatLinkUrl(data?.socialNetworks[0]?.facebook)}
                      target='_blank'
                    >
                      <div className='venue-info-detail flex'>
                        <span>{truncatedFacebook}</span>
                        <span style={{ display: 'inline-block' }}>
                          <Image
                            src='/assets/icons/link-url-redirect-icon.svg'
                            width={10}
                            height={10}
                            style={{
                              width: '10px',
                              height: '10px',
                              cursor: 'pointer',
                            }}
                            alt='link url redirect icon'
                          />
                        </span>
                      </div>
                    </a>
                  </article>
                )}
                {data?.socialNetworks[0]?.twitter && (
                  <article>
                    <Image
                      src='/assets/icons/twitter-icon.svg'
                      alt='venue-info-twitter'
                      width={20}
                      height={20}
                    />
                    <a
                      href={formatLinkUrl(data?.socialNetworks[0]?.twitter)}
                      target='_blank'
                    >
                      <div className='venue-info-detail flex'>
                        <span>{truncatedTwitter}</span>
                        <span style={{ display: 'inline-block' }}>
                          <Image
                            src='/assets/icons/link-url-redirect-icon.svg'
                            width={10}
                            height={10}
                            style={{
                              width: '10px',
                              height: '10px',
                              cursor: 'pointer',
                            }}
                            alt='link url redirect icon'
                          />
                        </span>
                      </div>
                    </a>
                  </article>
                )}
                {data?.socialNetworks[0]?.youtube && (
                  <article>
                    <Image
                      src='/assets/icons/youtube-icon.svg'
                      alt='venue-info-youtube'
                      width={20}
                      height={20}
                    />
                    <a
                      href={formatLinkUrl(data?.socialNetworks[0]?.youtube)}
                      target='_blank'
                    >
                      <div className='venue-info-detail flex'>
                        <span>{truncatedYoutube}</span>
                        <span style={{ display: 'inline-block' }}>
                          <Image
                            src='/assets/icons/link-url-redirect-icon.svg'
                            width={10}
                            height={10}
                            style={{
                              width: '10px',
                              height: '10px',
                              cursor: 'pointer',
                            }}
                            alt='link url redirect icon'
                          />
                        </span>
                      </div>
                    </a>
                  </article>
                )}
              </div>
              {data?.workHours && (
                <article className='work-hours'>
                  <div className='wrapper'>
                    <div className='work-hours-head'>
                      <div className='work-hours-head--left'>
                        <Image
                          src='/assets/icons/venue-working-hours-icon.svg'
                          alt='venue-info-address'
                          width={20}
                          height={20}
                        />
                        <div className='work-hours-title'>{t('workHours')}</div>
                      </div>
                      <div className='work-hours-head--right'>
                        <Image
                          src='/assets/icons/arrow-icon.svg'
                          width={16}
                          height={16}
                          className={
                            isWorksHoursOpen
                              ? 'arrow-icon'
                              : 'arrow-icon rotate'
                          }
                          onClick={() => setIsWorksHoursOpen(prev => !prev)}
                          alt='arrow icon'
                        />
                      </div>
                    </div>
                    <div
                      className={`venue-info-detail ${
                        isWorksHoursOpen ? 'active' : ''
                      }`}
                    >
                      <div className='work-hours-details'>
                        <div className='work-hours-detail'>
                          <span>{t('monday')}</span>{' '}
                          {data?.workHours?.monday === '-'
                            ? t('closed')
                            : data?.workHours?.monday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('tuesday')}</span>{' '}
                          {data?.workHours?.tuesday === '-'
                            ? t('closed')
                            : data?.workHours?.tuesday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('wednesday')}</span>{' '}
                          {data?.workHours?.wednesday === '-'
                            ? t('closed')
                            : data?.workHours?.wednesday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('thursday')}</span>{' '}
                          {data?.workHours?.thursday === '-'
                            ? t('closed')
                            : data?.workHours?.thursday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('friday')}</span>{' '}
                          {data?.workHours?.friday === '-'
                            ? t('closed')
                            : data?.workHours?.friday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('saturday')}</span>{' '}
                          {data?.workHours?.saturday === '-'
                            ? t('closed')
                            : data?.workHours?.saturday}
                        </div>
                        <div className='work-hours-detail'>
                          <span>{t('sunday')}</span>{' '}
                          {data?.workHours?.sunday === '-'
                            ? t('closed')
                            : data?.workHours?.sunday}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )}
            </div>

            {/*venue schedule*/}
            {/* {filteredActivities && filteredActivities.length > 0 && ( */}
            {atLeastOneActivity && (
              <div className='venue-content__schedule'>
                <div className='wrapper'>
                  <div className='schedule-head'>
                    <div className='schedule-head--left'>
                      <Image
                        src='/assets/icons/schedule-icon.svg'
                        alt='schedule icon'
                        width={20}
                        height={20}
                      />
                      <div className='schedule-title'>{t('schedule')}:</div>
                    </div>
                    <div className='schedule-head--right'>
                      <Image
                        src='/assets/icons/arrow-icon.svg'
                        width={16}
                        height={16}
                        className={
                          isScheduleOpen ? 'arrow-icon' : 'arrow-icon rotate'
                        }
                        onClick={() => setIsScheduleOpen(prev => !prev)}
                        alt='arrow icon'
                      />
                    </div>
                  </div>
                  {/* <h4>Schedule</h4> */}

                  <div
                    className={`activities-table mobile ${
                      isScheduleOpen ? 'active' : ''
                    }`}
                  >
                    <div className='table-top'>
                      <div
                        className='prev-activity'
                        // onClick={() => handleSchedule(-1)}
                        onClick={handlePreviousDay}
                      >
                        <Image
                          src='/assets/icons/switch-arrow-gray.svg'
                          alt='Previous'
                          width={20}
                          height={20}
                        />
                      </div>

                      <span className='activity-date'>
                        {/* {scheduleActivities[scheduleIndex]?.date} */}
                        {selectedDate.toLocaleDateString(
                          `${locale === 'cg' ? 'sr-Latn' : 'en-US'}`,
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
                        {/* <span>{t?.nextDay}</span> */}
                        <Image
                          src='/assets/icons/switch-arrow-gray.svg'
                          alt='Next'
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>

                    <div className='table-data mobile'>
                      {filteredActivities &&
                        filteredActivities?.length > 0 &&
                        filteredActivities?.map((activity: any) => {
                          return (
                            <div className='table-row' key={activity._id}>
                              <div className='table-left-side'>
                                <div>
                                  <p>
                                    {activity?.startTime ? (
                                      <span className='table-activity-time'>
                                        {activity?.startTime}
                                      </span>
                                    ) : (
                                      <span className='table-activity-time'>
                                        -
                                      </span>
                                    )}
                                  </p>
                                  <p>
                                    {activity?.endTime ? (
                                      <span className='table-activity-time'>
                                        {activity?.endTime}
                                      </span>
                                    ) : (
                                      <span className='table-activity-time'>
                                        -
                                      </span>
                                    )}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                  }}
                                >
                                  {activity?.name && (
                                    <span className='table-activity-name'>
                                      {
                                        activity?.[
                                          `${
                                            locale === 'cg' ? 'name' : 'nameEn'
                                          }`
                                        ]
                                      }
                                    </span>
                                  )}
                                  {activity?.description && (
                                    <Tooltip
                                      enterTouchDelay={0}
                                      title={
                                        activity?.[
                                          `${
                                            locale === 'cg'
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
                                              locale === 'cg'
                                                ? 'description'
                                                : 'descriptionEn'
                                            }`
                                          ]
                                        }
                                      </span>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                              <div className='table-right-side'>
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
                          <p className='no-activities'>{t('noActivities')}</p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!atLeastOneActivity && isGeneralActivities?.length > 0 && (
              <div className='venue-content__schedule'>
                <div className='wrapper'>
                  <div className='schedule-head'>
                    <div className='schedule-head--left'>
                      <Image
                        src='/assets/icons/schedule-icon.svg'
                        alt='schedule icon'
                        width={20}
                        height={20}
                      />
                      <div className='schedule-title'>{t('schedule')}:</div>
                    </div>
                    <div className='schedule-head--right'>
                      <Image
                        src='/assets/icons/arrow-icon.svg'
                        width={16}
                        height={16}
                        className={
                          isScheduleOpen ? 'arrow-icon' : 'arrow-icon rotate'
                        }
                        onClick={() => setIsScheduleOpen(prev => !prev)}
                        alt='arrow icon'
                      />
                    </div>
                  </div>
                  <div
                    className={`activities-table mobile isGeneral ${
                      isScheduleOpen ? 'active' : ''
                    }`}
                  >
                    <div className='table-data mobile'>
                      {isGeneralActivities &&
                        isGeneralActivities?.length > 0 &&
                        isGeneralActivities?.map((activity: any) => {
                          return (
                            <div className='table-row' key={activity._id}>
                              <div className='table-left-side'>
                                <div>
                                  <p>
                                    {activity?.startTime && (
                                      <span className='table-activity-time'>
                                        {activity?.startTime}
                                      </span>
                                    )}
                                  </p>
                                  <p>
                                    {activity?.endTime && (
                                      <span className='table-activity-time'>
                                        {activity?.endTime}
                                      </span>
                                    )}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                  }}
                                >
                                  {activity?.name && (
                                    <span className='table-activity-name'>
                                      {
                                        activity?.[
                                          `${
                                            locale === 'cg' ? 'name' : 'nameEn'
                                          }`
                                        ]
                                      }
                                    </span>
                                  )}
                                  {activity?.description && (
                                    <Tooltip
                                      enterTouchDelay={0}
                                      title={
                                        activity?.[
                                          `${
                                            locale === 'cg'
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
                                              locale === 'cg'
                                                ? 'description'
                                                : 'descriptionEn'
                                            }`
                                          ]
                                        }
                                      </span>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                              <div className='table-right-side'>
                                {activity?.extraCharge && (
                                  <span className='table-activity-price'>
                                    {activity?.extraCharge}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      {/* {filteredActivities &&
                        filteredActivities?.length === 0 && (
                          <p className="no-activities">{t?.noActivities}</p>
                        )} */}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* )} */}
            {/*venue schedule*/}
            {data?.notification_message && (
              <div className='venue-content'>
                <div className='wrapper'>
                  <article className='venue-notification'>
                    {data?.notification_message}
                  </article>
                </div>
              </div>
            )}
            {/*venue grades*/}
            <div className='venue-content__grades'>
              <div className='wrapper'>
                {/*venue grades top*/}
                <div className='grades-top'>
                  <h4>
                    {t('commentsAndGrades')}
                    <span>{`(${data.score.num_reviews})`}</span>
                  </h4>
                  <article>
                    <div className='grades-top-head'>
                      <span>
                        <Image
                          src='/assets/icons/star-icon-venue.svg'
                          width={24}
                          height={24}
                          alt='star icon'
                        />
                      </span>
                      <span>{data?.rating}</span>
                    </div>
                    <div className='grades-top-grid'>
                      <div className='grades-top-grid-item'>
                        <p>
                          {t('equipment')} <span>{data.score.equipment}</span>
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
                          {t('stuff')} <span>{data.score.staff}</span>
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
                          {t('hygiene')} <span>{data.score.hygiene}</span>
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
                          {t('rooms')} <span>{data.score.interior}</span>
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
                  <div className='grades-bottom-content'>
                    <h4>{t('howToGrade')}</h4>
                    <p>{t('howToGradeAnswer')}</p>
                  </div>
                </div>
                {/*venue grades bottom*/}
              </div>
            </div>
            {/*venue grades*/}
            {/*venue comments*/}
            <div
              className='venue-content__comments'
              id='comments-section-anchor'
            >
              <div className='wrapper'>
                {comments &&
                  comments?.items?.length > 0 &&
                  comments?.items?.map((comment: any, index: number) => {
                    return <SingleComment key={index} comment={comment} />;
                  })}
              </div>
              {/*venue comments*/}
            </div>
          </div>
          {/*venue content*/}
        </div>
      </section>

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
export default SingleVenueDisplayMobile;
