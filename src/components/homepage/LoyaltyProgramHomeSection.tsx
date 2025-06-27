import { CmsDataHp } from '@/types/types';
import Image from 'next/image';

const LoyaltyProgramHomeSection = ({ cmsDataHp }: CmsDataHp) => {
  return (
    <section className='loyalty-home topBottomSpacing'>
      <div className='wrapper'>
        <div className='loyalty-top'>
          <h2>
            {cmsDataHp?.section3MainHeading
              ? cmsDataHp?.section3MainHeading
              : ''}
          </h2>
        </div>
        <div className='loyalty-bottom'>
          <div className='loyalty-grid'>
            {/*Card1*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card1Title
                  ? cmsDataHp?.section3Card1Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card1Subtitle
                  ? cmsDataHp?.section3Card1Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon1 ? cmsDataHp?.section3Icon1 : ''}
                alt={
                  cmsDataHp?.section3Card1Title
                    ? cmsDataHp?.section3Card1Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card1*/}
            {/*Card2*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card2Title
                  ? cmsDataHp?.section3Card2Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card2Subtitle
                  ? cmsDataHp?.section3Card2Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon2 ? cmsDataHp?.section3Icon2 : ''}
                alt={
                  cmsDataHp?.section3Card2Title
                    ? cmsDataHp?.section3Card2Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card2*/}
            {/*Card3*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card3Title
                  ? cmsDataHp?.section3Card3Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card3Subtitle
                  ? cmsDataHp?.section3Card3Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon3 ? cmsDataHp?.section3Icon3 : ''}
                alt={
                  cmsDataHp?.section3Card3Title
                    ? cmsDataHp?.section3Card3Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card3*/}
            {/*Card4*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card4Title
                  ? cmsDataHp?.section3Card4Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card4Subtitle
                  ? cmsDataHp?.section3Card4Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon4 ? cmsDataHp?.section3Icon4 : ''}
                alt={
                  cmsDataHp?.section3Card4Title
                    ? cmsDataHp?.section3Card4Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card4*/}
            {/*Card5*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card5Title
                  ? cmsDataHp?.section3Card5Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card5Subtitle
                  ? cmsDataHp?.section3Card5Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon5 ? cmsDataHp?.section3Icon5 : ''}
                alt={
                  cmsDataHp?.section3Card5Title
                    ? cmsDataHp?.section3Card5Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card5*/}
            {/*Card6*/}
            <article className='loyalty-card'>
              <p className='title'>
                {cmsDataHp?.section3Card6Title
                  ? cmsDataHp?.section3Card6Title
                  : ''}
              </p>
              <p className='subtitle'>
                {cmsDataHp?.section3Card6Subtitle
                  ? cmsDataHp?.section3Card6Subtitle
                  : ''}
              </p>
              <Image
                src={cmsDataHp?.section3Icon6 ? cmsDataHp?.section3Icon6 : ''}
                alt={
                  cmsDataHp?.section3Card6Title
                    ? cmsDataHp?.section3Card6Title
                    : ''
                }
                width={100}
                height={100}
              />
            </article>
            {/*Card6*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgramHomeSection;
