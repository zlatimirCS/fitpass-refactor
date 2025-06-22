import moment from 'moment';
import { useLocale, useTranslations } from 'next-intl';
import SingleVenueCard from './SingleVenueCard';

interface WorkHours {
  [key: string]: string;
}

interface Venue {
  _id: string;
  name: string;
  slug: string;
  photos: Array<{ url: { medium: string } }>;
  address: any;
  rating: number;
  workHours: WorkHours;
}

interface SearchResultsVenuesProps {
  data: Venue[];
}

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
const openAt: { [key: string]: { en: string; [key: string]: string } } = {
  monday: {
    en: 'Monday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Ponedeljak u',
  },
  tuesday: {
    en: 'Tuesday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Utorak u',
  },
  wednesday: {
    en: 'Wednesday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Srijedu u',
  },
  thursday: {
    en: 'Thursday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Četvrtak u',
  },
  friday: {
    en: 'Friday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Petak u',
  },
  saturday: {
    en: 'Saturday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Subotu u',
  },
  sunday: {
    en: 'Sunday at',
    [process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION as string]: 'Nedjelju u',
  },
};
const currentDay = daysOfWeek[new Date().getDay()];
const currentTime = moment();
// at test currentTime at 23:00
// const currentTime = moment("11:00");
let venueOpenOrClosed: string;

const isVenueOpen = (workHours: WorkHours): boolean => {
  if (!workHours[currentDay]) return false;
  const [openTime, closeTime] = workHours[currentDay].split('-');
  const openMoment = moment(openTime.trim(), 'HH:mm');
  const closeMoment = moment(closeTime.trim(), 'HH:mm');
  return currentTime.isBetween(openMoment, closeMoment);
};

const findNextAvailableWorkday = (
  currentDayIndex: number,
  workHours: WorkHours
): string | null => {
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayIndex + i) % 7;
    const nextDay = daysOfWeek[nextDayIndex];
    if (workHours[nextDay] && workHours[nextDay] !== '-') {
      return nextDay;
    }
  }
  return null; // No available workday found
};

const SearchResultsVenues = ({ data }: SearchResultsVenuesProps) => {
  const t = useTranslations('SearchResultsVenues');
  const locale = useLocale();
  const openClosedVenue = (workHours: WorkHours): string => {
    if (!workHours[currentDay] || workHours[currentDay] === '-') {
      const nextAvailableWorkday = findNextAvailableWorkday(
        new Date().getDay(),
        workHours
      );
      if (nextAvailableWorkday) {
        const tomorrow = daysOfWeek[new Date().getDay() + 1];
        if (nextAvailableWorkday === tomorrow) {
          venueOpenOrClosed = `${t('openingAt')} ${workHours[
            nextAvailableWorkday
          ]
            ?.split('-')[0]
            ?.trim()}`;
        } else {
          venueOpenOrClosed = `${t('openingAt')} ${
            openAt[nextAvailableWorkday as keyof typeof openAt][
              ((locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                ? `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                : 'en') as 'en') || process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
            ]
          } ${workHours[nextAvailableWorkday]?.split('-')[0]?.trim()}`;
        }
        // venueOpenOrClosed = `${t?.openingAt} ${workHours[nextAvailableWorkday]
        //   ?.split("-")[0]
        //   ?.trim()}`;
      } else {
        venueOpenOrClosed = t('noWorkTime') || ''; // No available workday found
      }
      return venueOpenOrClosed;
    }
    const [openTime, closeTime] = workHours[currentDay].split('-');
    const openMoment = moment(openTime.trim(), 'HH:mm');
    const closeMoment = moment(closeTime.trim(), 'HH:mm');

    // if current time is before open time set venueOpenOrClosed to opening today
    if (currentTime.isBefore(openMoment)) {
      venueOpenOrClosed = `${t('openingAt')} ${openMoment.format('HH:mm')}`;
    }
    // if current time is between openMoment and closeMoment
    else if (currentTime.isBetween(openMoment, closeMoment)) {
      venueOpenOrClosed = `${t('closingAt')} ${closeMoment.format('HH:mm')}`;
    }
    // if current time is after close time set venueOpenOrClosed to opening tomorrow
    else if (currentTime.isAfter(closeMoment)) {
      const nextAvailableWorkday = findNextAvailableWorkday(
        new Date().getDay(),
        workHours
      );
      if (nextAvailableWorkday) {
        const tomorrow = daysOfWeek[new Date().getDay() + 1];
        if (nextAvailableWorkday === tomorrow) {
          venueOpenOrClosed = `${t('openingAt')} ${workHours[
            nextAvailableWorkday
          ]
            ?.split('-')[0]
            ?.trim()}`;
        } else {
          venueOpenOrClosed = `${t('openingAt')} ${
            openAt[nextAvailableWorkday as keyof typeof openAt][
              ((locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                ? `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                : 'en') as 'en') || process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
            ]
          } ${workHours[nextAvailableWorkday]?.split('-')[0]?.trim()}`;
        }
      } else {
        venueOpenOrClosed = t('noWorkTime') || ''; // No available workday found
      }
    }
    return venueOpenOrClosed;
  };
  return (
    <div className='search-results-venues'>
      <article className='search-results-grid'>
        {data && data.length > 0 ? (
          data.map((item: Venue) => {
            const isOpen = isVenueOpen(item.workHours);
            const openClosed = openClosedVenue(item.workHours);
            return (
              <SingleVenueCard
                key={item._id}
                title={item.name}
                redirectUrl={item.slug}
                thumbnail={item.photos[0].url.medium}
                address={item.address}
                venueRating={item.rating}
                isOpen={isOpen}
                workHours={item.workHours}
                openClosed={openClosed}
                t={t}
                locale={locale}
              />
            );
          })
        ) : (
          <p>{t('noSearchResults')}</p>
        )}
        {/* <SingleVenueCard title="Ronilački klub Neptune Dive 2" /> */}
      </article>
    </div>
  );
};
export default SearchResultsVenues;
