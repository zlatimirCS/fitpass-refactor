import { CmsDataExploreNetwork } from '@/types/types';
import Link from 'next/link';
import { memo } from 'react';

const ExploreNetworkCompaniesPartnersGrid = ({
  cmsDataExploreNetwork,
}: CmsDataExploreNetwork) => {
  return (
    <section className='explore-network-coming-soon-content topBottomSpacing'>
      <section className='companies-partners'>
        <div className='wrapper'>
          <div className='companies-partners-grid'>
            <article className='companies-partners-card'>
              <div
                style={{
                  backgroundImage: `url(${
                    cmsDataExploreNetwork?.section1Card1Icon
                      ? cmsDataExploreNetwork?.section1Card1Icon
                      : '/assets/icons/iconComp.svg'
                  })`,
                }}
                className='card-icon'
              ></div>
              <div>
                <h3>
                  {cmsDataExploreNetwork?.section1Card1Title
                    ? cmsDataExploreNetwork?.section1Card1Title
                    : ''}
                </h3>
                <p>
                  {cmsDataExploreNetwork?.section1Card1SubtitlePart1
                    ? cmsDataExploreNetwork?.section1Card1SubtitlePart1
                    : ''}
                  <br />
                  {cmsDataExploreNetwork?.section1Card1SubtitlePart2
                    ? cmsDataExploreNetwork?.section1Card1SubtitlePart2
                    : ''}
                </p>
              </div>
              <Link
                href={`${
                  cmsDataExploreNetwork?.section1Card1ButtonUrl
                    ? cmsDataExploreNetwork?.section1Card1ButtonUrl
                    : ''
                }`}
              >
                <button className='card-btn'>
                  {cmsDataExploreNetwork?.section1Card1ButtonText
                    ? cmsDataExploreNetwork?.section1Card1ButtonText
                    : ''}
                </button>
              </Link>
            </article>
            <article className='companies-partners-card'>
              <div
                style={{
                  backgroundImage: `url(${
                    cmsDataExploreNetwork?.section1Card2Icon
                      ? cmsDataExploreNetwork?.section1Card2Icon
                      : '/assets/icons/iconComp.svg'
                  })`,
                }}
                className='card-icon'
              ></div>
              <div>
                <h3>
                  {cmsDataExploreNetwork?.section1Card2Title
                    ? cmsDataExploreNetwork?.section1Card2Title
                    : ''}
                </h3>
                <p>
                  {cmsDataExploreNetwork?.section1Card2SubtitlePart1
                    ? cmsDataExploreNetwork?.section1Card2SubtitlePart1
                    : ''}
                  <br />
                  {cmsDataExploreNetwork?.section1Card2SubtitlePart2
                    ? cmsDataExploreNetwork?.section1Card2SubtitlePart2
                    : ''}
                </p>
              </div>
              <Link
                href={`${
                  cmsDataExploreNetwork?.section1Card2ButtonUrl
                    ? cmsDataExploreNetwork?.section1Card2ButtonUrl
                    : '/'
                }`}
              >
                <button className='card-btn'>
                  {cmsDataExploreNetwork?.section1Card2ButtonText
                    ? cmsDataExploreNetwork?.section1Card2ButtonText
                    : ''}
                </button>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
};
export default memo(ExploreNetworkCompaniesPartnersGrid);
