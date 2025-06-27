import { memo } from 'react';
import HeroFaq from './HeroFaq';

const HeaderFaq = () => {
  return (
    <header className='faq' style={{ minHeight: 'unset' }}>
      <HeroFaq />
    </header>
  );
};
export default memo(HeaderFaq);
