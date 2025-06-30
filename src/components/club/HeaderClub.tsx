import { CmsDataClub } from '@/types/types';
import { memo } from 'react';
import HeroClub from './HeroClub';

const HeaderClub = ({ cmsDataClub }: CmsDataClub) => {
  return (
    <header className='club' style={{ minHeight: 'unset' }}>
      <HeroClub cmsDataClub={cmsDataClub} />
    </header>
  );
};
export default memo(HeaderClub);
