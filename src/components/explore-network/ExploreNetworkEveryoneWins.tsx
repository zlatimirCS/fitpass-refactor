'use client';
import { CmsDataExploreNetwork } from '@/types/types';
import Image from 'next/image';
import { memo } from 'react';

const EveryoneWinsHomeSection = ({
  cmsDataExploreNetwork,
}: CmsDataExploreNetwork) => {
  return (
    <section className='everyone-wins-section topBottomSpacing'>
      <div className='wrapper'>
        <div className='everyone-wins-head'>
          <h2 className='firstHeaderTrigger'>
            {cmsDataExploreNetwork?.section2MainHeading
              ? cmsDataExploreNetwork?.section2MainHeading
              : ''}
          </h2>
        </div>
        <div className='everyone-wins-body'>
          <article>
            <ul>
              <li>
                <Image
                  src='/assets/icons/znakic.svg'
                  alt='fitpass icon'
                  width={24}
                  height={24}
                />
                {cmsDataExploreNetwork?.section2List1Item1
                  ? cmsDataExploreNetwork?.section2List1Item1
                  : ''}
              </li>
              <li>
                <Image
                  src='/assets/icons/znakic.svg'
                  alt='fitpass icon'
                  width={24}
                  height={24}
                />
                {cmsDataExploreNetwork?.section2List1Item2
                  ? cmsDataExploreNetwork?.section2List1Item2
                  : ''}
              </li>
              <li>
                <Image
                  src='/assets/icons/znakic.svg'
                  alt='fitpass icon'
                  width={24}
                  height={24}
                />
                {cmsDataExploreNetwork?.section2List1Item3
                  ? cmsDataExploreNetwork?.section2List1Item3
                  : ''}
              </li>
              <li>
                <Image
                  src='/assets/icons/znakic.svg'
                  alt='fitpass icon'
                  width={24}
                  height={24}
                />
                {cmsDataExploreNetwork?.section2List1Item4
                  ? cmsDataExploreNetwork?.section2List1Item4
                  : ''}
              </li>
            </ul>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
              className='bg-image-wrap'
            >
              {/* <Image
                src={cmsDataExploreNetwork?.section2Image1}
                alt="veselo drustvo"
                fill
                style={{ objectFit: "cover" }}
                sizes="100%"
              /> */}
              {/* <img
                src={cmsDataExploreNetwork?.section2Image1}
                alt='veselo drustvo'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              /> */}
              <Image
                src={cmsDataExploreNetwork?.section2Image1 || ''}
                alt='veselo drustvo'
                fill
                style={{ objectFit: 'cover' }}
                sizes='100%'
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
export default memo(EveryoneWinsHomeSection);
