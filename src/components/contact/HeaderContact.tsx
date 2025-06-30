import { CmsDataContact } from '@/types/types';
import { memo } from 'react';
import HeroContact from './HeroContact';

const HeaderContact = ({ cmsDataContact }: CmsDataContact) => {
  return (
    <header className='contact' style={{ minHeight: 'unset' }}>
      <HeroContact cmsDataContact={cmsDataContact} />
    </header>
  );
};
export default memo(HeaderContact);
