import { CmsDataAboutUs } from '../../types/types';
import HeaderAboutUs from './HeaderAboutUs';
import OurStory from './OurStory';
import Timeline from './Timeline';

const AboutUsContent = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  if (!cmsDataAboutUs) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      <HeaderAboutUs cmsDataAboutUs={cmsDataAboutUs} />
      {!cmsDataAboutUs.section1Hide && (
        <OurStory cmsDataAboutUs={cmsDataAboutUs} />
      )}
      {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && <Timeline />}
    </>
  );
};
export default AboutUsContent;
