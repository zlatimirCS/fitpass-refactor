import Image from 'next/image';
import { CmsDataClub } from '../../types/types';

const UnlockPerks = ({ cmsDataClub }: CmsDataClub) => {
  return (
    <section className='unlock-perks-club-section topBottomSpacing'>
      <div className='wrapper'>
        <div className='unlock-perks-club-section__content'>
          <article
            className='unlock-perks-club-section__content__left'
            style={{
              backgroundImage: `url(${
                cmsDataClub?.section1Image
                  ? cmsDataClub?.section1Image
                  : `/assets/images/club-phone.webp`
              })`,
            }}
          ></article>
          <article className='unlock-perks-club-section__content__right'>
            <div className='top'>
              <h3>
                {cmsDataClub?.section1MainHeading
                  ? cmsDataClub?.section1MainHeading
                  : ''}
              </h3>
            </div>
            <div className='bottom'>
              <div className='item'>
                <div className='item__icon'>
                  <Image
                    src='/assets/icons/club-icon-1.svg'
                    alt='icon'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='item__text'>
                  <h4>
                    {cmsDataClub?.sec1ListItem1Title
                      ? cmsDataClub?.sec1ListItem1Title
                      : ''}
                  </h4>
                  <p>
                    {cmsDataClub?.sec1ListItem1Text
                      ? cmsDataClub?.sec1ListItem1Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='item'>
                <div className='item__icon'>
                  <Image
                    src='/assets/icons/club-icon-2.svg'
                    alt='icon'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='item__text'>
                  <h4>
                    {cmsDataClub?.sec1ListItem2Title
                      ? cmsDataClub?.sec1ListItem2Title
                      : ''}
                  </h4>
                  <p>
                    {cmsDataClub?.sec1ListItem2Text
                      ? cmsDataClub?.sec1ListItem2Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='item'>
                <div className='item__icon'>
                  <Image
                    src='/assets/icons/club-icon-3.svg'
                    alt='icon'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='item__text'>
                  <h4>
                    {cmsDataClub?.sec1ListItem3Title
                      ? cmsDataClub?.sec1ListItem3Title
                      : ''}
                  </h4>
                  <p>
                    {cmsDataClub?.sec1ListItem3Text
                      ? cmsDataClub?.sec1ListItem3Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='item'>
                <div className='item__icon'>
                  <Image
                    src='/assets/icons/club-icon-4.svg'
                    alt='icon'
                    width={40}
                    height={40}
                  />
                </div>
                <div className='item__text'>
                  <h4>
                    {cmsDataClub?.sec1ListItem4Title
                      ? cmsDataClub?.sec1ListItem4Title
                      : ''}
                  </h4>
                  <p>
                    {cmsDataClub?.sec1ListItem4Text
                      ? cmsDataClub?.sec1ListItem4Text
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
export default UnlockPerks;
