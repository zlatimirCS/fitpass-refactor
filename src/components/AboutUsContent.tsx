import { CmsDataAboutUs } from '../types/types';
import OurStory from './OurStory';

const AboutUsContent = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  if (!cmsDataAboutUs) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      {!cmsDataAboutUs.section1Hide && (
        <OurStory cmsDataAboutUs={cmsDataAboutUs} />
      )}
      {/* <EveryoneWinsHomeSection mainHpData={mainHpData} /> */}
    </>
  );
};
export default AboutUsContent;
