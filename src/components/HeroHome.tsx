import Link from 'next/link';
import { memo } from 'react';

const HeroHome = ({ item }: { item: any }) => {
  return (
    <div className='hero'>
      <div className='wrapper'>
        <div className='hero-top'>
          <h1>
            {item?.sliderTitleLine1 && <span>{item.sliderTitleLine1}</span>}
            {item?.sliderTitleLine2 && (
              <span className='bold'>{item.sliderTitleLine2}</span>
            )}
            {item?.sliderTitleLine3 && <span>{item.sliderTitleLine3}</span>}
          </h1>
        </div>
        <div className='hero-bottom'>
          <p
            className={`${item?.url === '/for-partners' ? 'for-partners' : ''}`}
          >
            {item?.sliderSubTitleLine1 && (
              <span>{item.sliderSubTitleLine1}</span>
            )}
            {item?.sliderSubTitleLine2 && (
              <span>{item.sliderSubTitleLine2}</span>
            )}
            {item?.sliderSubTitleLine3 && (
              <span>{item.sliderSubTitleLine3}</span>
            )}
          </p>
          {item?.sliderBtnUrlRedirect && item?.sliderBtnText && (
            <Link
              href={
                item?.sliderBtnUrlRedirect ? item?.sliderBtnUrlRedirect : '/'
              }
            >
              <button type='submit' className='btn-form btn-form-maps'>
                {item.sliderBtnText}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(HeroHome);
