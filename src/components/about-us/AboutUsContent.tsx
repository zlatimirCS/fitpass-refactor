import { CmsDataAboutUs } from '../../types/types';
import OurStory from '../OurStory';
import Timeline from '../Timeline';

const AboutUsContent = ({ cmsDataAboutUs }: CmsDataAboutUs) => {
  if (!cmsDataAboutUs) {
    return <p>There was an error loading data</p>;
  }
  return (
    <>
      {!cmsDataAboutUs.section1Hide && (
        <OurStory cmsDataAboutUs={cmsDataAboutUs} />
      )}
      <Timeline />
    </>
  );
};
export default AboutUsContent;
