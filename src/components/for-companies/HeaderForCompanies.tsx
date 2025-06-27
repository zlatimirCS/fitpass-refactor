import { CmsDataForCompanies } from '@/types/types';
import HeroForCompanies from './HeroForCompanies';

const HeaderForCompanies = ({ cmsDataForCompanies }: CmsDataForCompanies) => {
  // const { mainFcData } = useAppContext();
  return (
    <header className='for-partners' style={{ minHeight: 'unset' }}>
      <HeroForCompanies cmsDataForCompanies={cmsDataForCompanies} />
    </header>
  );
};
export default HeaderForCompanies;
