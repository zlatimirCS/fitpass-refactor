import { CmsDataForPartners } from '@/types/types';
import { memo } from 'react';
import HeroForPartners from './HeroForPartners';

const HeaderForPartners = ({ cmsDataForPartners }: CmsDataForPartners) => {
  return (
    <header className='for-partners' style={{ minHeight: 'unset' }}>
      <HeroForPartners cmsDataForPartners={cmsDataForPartners} />
    </header>
  );
};
export default memo(HeaderForPartners);
