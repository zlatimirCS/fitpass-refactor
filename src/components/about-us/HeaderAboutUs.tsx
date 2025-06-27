import { CmsDataAboutUs } from '@/types/types';
import { memo } from 'react';
import HeroAboutUs from './HeroAboutUs';
// import { useAppContext } from "@/context/AppProvider";

const HeaderAboutUs = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  // const { mainAuData } = useAppContext();
  return (
    <header className='for-partners' style={{ minHeight: 'unset' }}>
      <HeroAboutUs cmsDataAboutUs={cmsDataAboutUs} />
    </header>
  );
};
export default memo(HeaderAboutUs);
