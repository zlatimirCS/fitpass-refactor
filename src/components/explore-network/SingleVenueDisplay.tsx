'use client';
import htmlTruncate from 'html-truncate';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SingleVenueDisplayDesktop from './SingleVenueDisplayDesktop';
import SingleVenueDisplayMobile from './SingleVenueDisplayMobile';

const SingleVenueDisplay = ({
  data,
  // t,
  // locale,
  comments,
  aboutUs,
  // auHide,
  // fpHide,
  // fcHide,
  // clHide,
  // aboutUs,
  // ctHide,
  // nyamiActivities,
}: {
  data: any;
  comments: any;
  aboutUs: any;
}) => {
  // OVO JE DEO KODA KOJI JE BIO U KORISCEN U SLUCAJU DA SE KORISTE PREVODI, JAVLJA HYDRATATION ERROR AKO NE STAVIMO OVO
  const [isLoading, setIsLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  // const [filteredActivities, setFilteredActivities] = useState([]);

  const getDayName = (date: Date) => {
    return daysOfWeek[date.getDay()];
  };
  const selectedDayName = getDayName(selectedDate);

  const filteredActivities = data?.activities?.filter(
    (activity: { days: string | string[] }) =>
      activity?.days?.includes(selectedDayName)
  );

  const atLeastOneActivity = data?.activities?.some(
    (activity: { days: string | any[] }) => {
      return activity?.days?.length > 0;
    }
  );

  const isGeneralActivities = data?.activities?.filter(
    (activity: { isGeneral: boolean }) => {
      return activity?.isGeneral === true;
    }
  );

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  const handlePreviousDay = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const coordinates = {
    lat: data?.lat,
    lng: data?.lng,
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const readMoreTextLength = 250;

  const readMoreText = (text: any) => {
    // return text;
    return readMore
      ? text && text
      : (text && htmlTruncate(text, readMoreTextLength)) || '';
  };

  const formatLinkUrl = (url: string | URL) => {
    console.log('url example', url);
    if (!url) return '/';

    // If it's already a URL object, return its href
    if (url instanceof URL) {
      return url.href;
    }

    // If it's a string, check if it already has a protocol
    if (typeof url === 'string') {
      // If it already has http:// or https://, use URL constructor
      if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
          const formattedUrl = new URL(url);
          return formattedUrl.href;
        } catch (e: any) {
          console.log('error', e);
          return url; // Return original if URL constructor fails
        }
      } else {
        // If no protocol, prepend https://
        return `https://${url}`;
      }
    }

    return '/';
  };

  const calculateScorePercentage = (score: number) => {
    return score * 10 + '%';
  };

  const calculateRating = (score: number, maxScore: number) => {
    return (score / maxScore) * 5;
  };

  const maxScore = 10; // Define your maximum score here
  const rating = data?.rating ? calculateRating(data?.rating, maxScore) : 0;

  const imagesForCarousel =
    data && data?.photos && data?.photos?.length > 0
      ? data?.photos.map((item: { url: { large: any } }) => item.url.large)
      : [];

  const singleVenueDisplayProps = {
    coordinates,
    containerStyle,
    data,
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
    atLeastOneActivity,
    isGeneralActivities,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {/* <CookiesScreen t={t} />
      <HeaderGlobal
        noSpace={true}
        t={t}
        locale={locale}
        auHide={auHide}
        fpHide={fpHide}
        fcHide={fcHide}
        clHide={clHide}
        ctHide={ctHide}
      /> */}
      <SingleVenueDisplayDesktop
        {...singleVenueDisplayProps}
        // t={t}
        // locale={locale}
        comments={comments}
        aboutUs={aboutUs}
        isGeneralActivities={
          isGeneralActivities?.length > 0 ? isGeneralActivities : []
        }
        // auHide={auHide}
        // fpHide={fpHide}
        // fcHide={fcHide}
        // clHide={clHide}
        // ctHide={ctHide}
      />
      <SingleVenueDisplayMobile
        {...singleVenueDisplayProps}
        // t={t}
        // locale={locale}
        comments={comments}
        aboutUs={aboutUs}
        isGeneralActivities={
          isGeneralActivities?.length > 0 ? isGeneralActivities : []
        }
        // auHide={auHide}
        // fpHide={fpHide}
        // fcHide={fcHide}
        // clHide={clHide}
        // ctHide={ctHide}
      />
    </>
  );
};
export default SingleVenueDisplay;
