import { CmsDataHp } from '@/types/types';
import Link from 'next/link';

const CompaniesPartnersGrid = ({ cmsDataHp }: CmsDataHp) => {
  return (
    <>
      <section className='explore-network-coming-soon-content topBottomSpacing'>
        <section className='companies-partners'>
          <div className='wrapper'>
            <div className='companies-partners-grid'>
              <article className='companies-partners-card'>
                <div
                  style={{
                    backgroundImage: `url(${
                      cmsDataHp
                        ? cmsDataHp?.section1Card1Icon
                        : '/assets/icons/iconComp.svg'
                    })`,
                  }}
                  className='card-icon'
                ></div>
                <div>
                  <h3>
                    {cmsDataHp?.section1Card1Title
                      ? cmsDataHp?.section1Card1Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataHp?.section1Card1SubtitlePart1
                      ? cmsDataHp?.section1Card1SubtitlePart1
                      : ''}
                    <br />
                    {cmsDataHp?.section1Card1SubtitlePart2
                      ? cmsDataHp?.section1Card1SubtitlePart2
                      : ''}
                  </p>
                </div>
                <Link
                  href={
                    cmsDataHp?.section1Card1ButtonUrl
                      ? cmsDataHp?.section1Card1ButtonUrl
                      : '/'
                  }
                >
                  <button className='card-btn'>
                    {cmsDataHp?.section1Card1ButtonText
                      ? cmsDataHp?.section1Card1ButtonText
                      : ''}
                  </button>
                </Link>
              </article>
              <article className='companies-partners-card'>
                <div
                  className='card-icon'
                  style={{
                    backgroundImage: `url(${
                      cmsDataHp?.section1Card2Icon
                        ? cmsDataHp?.section1Card2Icon
                        : '/assets/icons/iconPartn.svg'
                    })`,
                  }}
                ></div>
                <div>
                  <h3>
                    {cmsDataHp?.section1Card2Title
                      ? cmsDataHp?.section1Card2Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataHp?.section1Card2SubtitlePart1
                      ? cmsDataHp?.section1Card2SubtitlePart1
                      : ''}
                    <br />
                    {cmsDataHp?.section1Card2SubtitlePart2
                      ? cmsDataHp?.section1Card2SubtitlePart2
                      : ''}
                  </p>
                </div>
                <Link
                  href={
                    cmsDataHp?.section1Card2ButtonUrl
                      ? cmsDataHp?.section1Card2ButtonUrl
                      : '/'
                  }
                >
                  <button className='card-btn'>
                    {cmsDataHp?.section1Card2ButtonText
                      ? cmsDataHp?.section1Card2ButtonText
                      : ''}
                  </button>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
export default CompaniesPartnersGrid;
