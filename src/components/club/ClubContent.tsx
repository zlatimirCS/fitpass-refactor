'use client';
import { CmsDataClub } from '@/types/types';
import { SetStateAction, useState } from 'react';
import HeaderClub from './HeaderClub';
import ReadyToExplore from './ReadyToExplore';
import UnlockPerks from './UnlockPerks';

const ClubContent = ({
  cmsDataClub,
  data,
}: {
  cmsDataClub: CmsDataClub['cmsDataClub'];
  data: any;
}) => {
  const [discounts, setDiscounts] = useState(
    data?.clubData?.clubComponent?.discounts || []
  );
  const categories = data?.clubData?.clubComponent?.categories || [];

  const initialCardsToShow = 12;
  const loadCards = 12;
  const [activeCategory, setActiveCategory] = useState('all');
  const [numberOfCardsToShow, setNumberOfCardsToShow] =
    useState(initialCardsToShow);

  const slicedDiscounts = discounts?.slice(0, numberOfCardsToShow) || [];
  const handleAddMore = () => {
    setNumberOfCardsToShow(numberOfCardsToShow + loadCards);
  };
  const buttonVisible = discounts?.length > numberOfCardsToShow;

  const handleCategoryClick = (id: SetStateAction<string>) => {
    const allDiscounts = data?.clubData?.clubComponent?.discounts || [];
    setNumberOfCardsToShow(initialCardsToShow);
    if (id === 'all') {
      setActiveCategory('all');
      setDiscounts(allDiscounts);
      return;
    }
    setActiveCategory(id);
    setDiscounts(
      allDiscounts.filter(
        (discount: { categoryId: SetStateAction<string> }) =>
          discount.categoryId === id
      )
    );
  };

  if (!cmsDataClub) {
    return <p>There was an error loading data</p>;
  }
  return (
    <div style={{ position: 'relative' }}>
      <HeaderClub cmsDataClub={cmsDataClub} />
      <main className='club-main'>
        <div className='wrapper'>
          <p className='intro-text'>{cmsDataClub?.sectionHeaderText}</p>
        </div>
        {/* <CarouselClub /> */}
        {!cmsDataClub?.section1Hide && (
          <UnlockPerks cmsDataClub={cmsDataClub} />
        )}
        <ReadyToExplore
          handleCategoryClick={handleCategoryClick}
          categories={categories}
          slicedDiscounts={slicedDiscounts}
          buttonVisible={buttonVisible}
          handleAddMore={handleAddMore}
          activeCategory={activeCategory}
        />
      </main>
    </div>
  );
};
export default ClubContent;
