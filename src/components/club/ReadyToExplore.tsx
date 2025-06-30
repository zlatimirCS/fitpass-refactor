'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import Card from './Card';
import ClubModal from './ClubModal';

const ReadyToExplore = ({
  categories,
  handleCategoryClick,
  slicedDiscounts,
  buttonVisible,
  handleAddMore,
  activeCategory,
}: {
  categories: any[];
  handleCategoryClick: (id: string) => void;
  slicedDiscounts: any[];
  buttonVisible: boolean;
  handleAddMore: () => void;
  activeCategory: string;
}) => {
  const t = useTranslations('Club');
  const locale = useLocale();
  const [currentActiveCard, setCurrentActiveCard] = useState(null);
  return (
    <section className='explore-club-section topBottomSpacing'>
      {/* {currentActiveCard && (
        <div className="current-active-card-modal-overlay"></div>
      )} */}
      {currentActiveCard && (
        <ClubModal
          currentActiveCard={currentActiveCard}
          setCurrentActiveCard={setCurrentActiveCard}
        />
      )}

      <div className='wrapper'>
        <div className='explore-club-section__head'>
          <h2>{t('readyToExploreDiscounts')}</h2>
          <div className='tab-chips-wrapper'>
            <div
              className={`chip ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              {t('allDiscounts')}
            </div>
            {categories &&
              categories?.length > 0 &&
              categories?.map((category, index) => {
                const joinedString =
                  locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION
                    ? category?.name
                    : category?.nameEn;
                return (
                  <div
                    key={index}
                    className={`chip ${
                      activeCategory === category.id ? 'active' : ''
                    }`}
                    onClick={() => handleCategoryClick(category?.id)}
                  >
                    {joinedString}
                  </div>
                );
              })}
          </div>
        </div>
        <div className='explore-club-section__body'>
          <div className='explore-club-section__body__cards-wrapper'>
            {slicedDiscounts &&
              slicedDiscounts?.length > 0 &&
              slicedDiscounts?.map((discount, index) => {
                return (
                  <Card
                    key={index}
                    data={discount}
                    setCurrentActiveCard={setCurrentActiveCard}
                  />
                );
              })}
          </div>
          {buttonVisible && (
            <button className='outlined-btn-white' onClick={handleAddMore}>
              {t('checkOurMore')}
            </button>
          )}
        </div>
      </div>
      {currentActiveCard && (
        <div className='current-active-card-modal-overlay'></div>
      )}
    </section>
  );
};
export default ReadyToExplore;
