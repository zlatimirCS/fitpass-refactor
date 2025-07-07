'use client';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SpecialCardsSlider } from './SpecialCardsSlider';
import { WideCardsSlider } from './WideCardsSlider';

const ExploreNetworkFavoritesSection = () => {
  const t = useTranslations('ExploreNetworkPage');
  const [initialFavourites, setInitialFavourites] = useState<any>({});
  const fetchInitialFavourites = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/get-favorites-venues`
      );
      if (response.status === 200) {
        setInitialFavourites(response.data);
      } else {
        console.log('No favourites found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInitialFavourites();
  }, []);

  console.log('Initial Favourites:', initialFavourites);

  return (
    <section className='explore-network-search-favorites-section'>
      <div className='wrapper'>
        <div className='title title-head'>
          <p>{t('favorites')}</p>
        </div>
      </div>
      <div>
        {initialFavourites &&
          initialFavourites.favouriteBelgrade &&
          initialFavourites.favouriteBelgrade.length > 0 && (
            <WideCardsSlider
              title={{ normal: t('in'), bold: t('belgrade') }}
              overlay={'#c8b37b'}
              id='favorites-in-belgrade'
              data={initialFavourites.favouriteBelgrade}
            />
          )}
        {initialFavourites &&
          initialFavourites.favouriteNoviSad &&
          initialFavourites.favouriteNoviSad.length > 0 && (
            <WideCardsSlider
              title={{ normal: t('in'), bold: t('noviSad') }}
              overlay={'#cd86d8'}
              id='favorites-in-novi-sad'
              data={initialFavourites.favouriteNoviSad}
            />
          )}
        {initialFavourites &&
          initialFavourites.familyFriendly &&
          initialFavourites.familyFriendly.length > 0 && (
            <WideCardsSlider
              title={{ normal: t('family'), bold: t('friendly') }}
              overlay={'#e08859'}
              id='family-friendly'
              data={initialFavourites.familyFriendly}
            />
          )}
        {initialFavourites &&
          initialFavourites.teamBuilding &&
          initialFavourites.teamBuilding.length > 0 && (
            <WideCardsSlider
              title={{
                normal: t('teamBuilding'),
                bold: t('teamBuildingActivities'),
              }}
              overlay={'#94ae62'}
              id='team-building-activities'
              data={initialFavourites.teamBuilding}
            />
          )}
      </div>

      {initialFavourites &&
        initialFavourites.specialOffer &&
        initialFavourites.specialOffer.length > 0 && (
          <SpecialCardsSlider
            title={{ normal: t('special'), bold: t('offer') }}
            id='special-offer'
            data={initialFavourites.specialOffer}
          />
        )}
    </section>
  );
};
export default ExploreNetworkFavoritesSection;
