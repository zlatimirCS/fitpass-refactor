'use client';
import { routeTranslations } from '@/lib/routeTranslations';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import LangSwitchArrow from './icons/LangSwitchArrow';
import XIcon from './icons/XIcon';

const MobileNav = ({
  isMobileNavOpen,
  handleToggleMobileNav,
  auHide,
  fpHide,
  fcHide,
  enHide,
  clHide,
  ctHide,
}: {
  isMobileNavOpen: boolean;
  handleToggleMobileNav: () => void;
  auHide: boolean;
  fpHide: boolean;
  fcHide: boolean;
  enHide: boolean;
  clHide: boolean;
  ctHide: boolean;
}) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const constructSearchPath = (searchParams: ReadonlyURLSearchParams) => {
    let searchPath = '?';
    const searchCity = searchParams.get('city');
    const searchCityArea = searchParams.get('cityArea');
    const searchDisciplines = searchParams.get('disciplines');
    const searchActivities = searchParams.get('activities');
    const searchAttributes = searchParams.get('attributes');

    if (searchCity) {
      searchPath += `city=${searchCity}`;
    }
    if (searchDisciplines) {
      searchPath += `&disciplines=${searchDisciplines}`;
    }
    if (searchCityArea) {
      searchPath += `&cityArea=${searchCityArea}`;
    }
    if (searchActivities) {
      searchPath += `&activities=${searchActivities}`;
    }
    if (searchAttributes) {
      searchPath += `&attributes=${searchAttributes}`;
    }
    return searchPath;
  };
  const generateRouteMainPath = (path: string) => {
    const splitedPath = path.split('/');
    if (splitedPath.length === 4 && splitedPath[3] === 'search') {
      // make dynamic path for search
      const returnPath =
        path.split('/')[2] +
        '/' +
        path.split('/')[3] +
        constructSearchPath(searchParams);
      return returnPath;
    }

    if (splitedPath.length === 3) {
      return path.split('/')[2];
    }
    if (splitedPath.length === 4) {
      return path.split('/')[2] + '/' + path.split('/')[3];
    }
  };
  const routeMainPath = generateRouteMainPath(pathname);
  const router = useRouter();

  const allOptions = ['en', `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`];
  const [secondaryLanguage, setSecondaryLanguage] = useState(
    allOptions.filter(option => option !== locale)[0]
  );
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const handleToggleLangSwitchDropdown = () => {
    setLangDropdownOpen(prev => !prev);
  };

  useEffect(() => {
    setSecondaryLanguage(allOptions.filter(option => option !== locale)[0]);
  }, [locale]);

  const handleOpenLinkAndCloseNav = (link: string) => {
    router.push(link);
    handleToggleMobileNav();
  };

  const handleSwitch = (lang: string) => {
    document.body.style.position = '';
    setLangDropdownOpen(false);
    handleToggleMobileNav();
    if (
      pathname === '/en' ||
      pathname === `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
    ) {
      router.push(`/${lang}`);
      return;
    }
    router.push(`/${lang}/${routeMainPath}`);
  };

  return (
    <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
      <div className='wrapper'>
        <div className='mobile-nav-wrap'>
          <div className='mobile-nav-head'>
            <Image
              src='/assets/icons/logo-fitpass-secondary-svg.svg'
              alt='Fitpass'
              className='logo-fit'
              width={210}
              height={30}
              onClick={() =>
                handleOpenLinkAndCloseNav(
                  `${
                    locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      : '/en'
                  }`
                )
              }
            />
            {/* </Link> */}
            {locale && (
              <div className='lang-switch lang-switch--mobile'>
                <div
                  style={{ display: 'flex', gap: '10px', padding: '10px 0' }}
                  onClick={handleToggleLangSwitchDropdown}
                >
                  <span style={{ textTransform: 'uppercase' }}>{locale}</span>
                  <LangSwitchArrow
                    fill='#000000'
                    langDropdownOpen={langDropdownOpen}
                    // onClick={function (): void {
                    //   throw new Error('Function not implemented.');
                    // }}
                  />
                </div>
                <ul
                  className={`lang-switch-dropdown ${
                    langDropdownOpen ? 'active' : ''
                  }`}
                >
                  <li
                    style={{ textTransform: 'uppercase' }}
                    onClick={() => handleSwitch(secondaryLanguage)}
                  >
                    {secondaryLanguage}
                  </li>
                </ul>
              </div>
            )}
            <XIcon onClick={handleToggleMobileNav} />
          </div>
          <div className='mobile-nav-links'>
            {!auHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['about-us']}`
                        : '/en/about-us'
                    }`
                  )
                }
              >
                {t('aboutUs')}
              </div>
            )}
            {!fcHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['for-companies']}`
                        : '/en/for-companies'
                    }`
                  )
                }
              >
                {t('forCompanies')}
              </div>
            )}
            {!fpHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['for-partners']}`
                        : '/en/for-partners'
                    }`
                  )
                }
              >
                {t('forPartners')}
              </div>
            )}
            {!enHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}`
                        : '/en/explore-network'
                    }`
                  )
                }
              >
                {t('exploreNetwork')}
              </div>
            )}
            {!clHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['club']}`
                        : '/en/club'
                    }`
                  )
                }
              >
                {t('club')}
              </div>
            )}
            <div
              onClick={() =>
                handleOpenLinkAndCloseNav(
                  `${
                    locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['faq']}`
                      : '/en/faq'
                  }`
                )
              }
            >
              {t('faqNav')}
            </div>
            {!ctHide && (
              <div
                onClick={() =>
                  handleOpenLinkAndCloseNav(
                    `${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['contact']}`
                        : '/en/contact'
                    }`
                  )
                }
              >
                {t('contact')}
              </div>
            )}
          </div>
          <div className='mobile-nav-footer'>
            <p>{t('followUs')}</p>
            <div className='mobile-nav-footer__icons social-icons'>
              <a
                href='https://www.facebook.com/people/Fitpass-Montenegro/61562000383735/?mibextid=LQQJ4d&rdid=dQHo9FflTcgGoXRT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FDp2nfn2ajTfegHda%2F%3Fmibextid%3DLQQJ4d'
                target='_blank'
                className='social fb'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                href='https://www.instagram.com/fitpass.montenegro/?next=%2Ffitpass.srbija%2F'
                target='_blank'
                className='social instagram'
              >
                <i className='fab fa-instagram'></i>
              </a>
              <a
                href='https://www.linkedin.com/company/fitpass-montenegro/about/?viewAsMember=true'
                target='_blank'
                className='social linkedin'
              >
                <i className='fab fa-linkedin-in'></i>
              </a>
            </div>
            <div>
              <p>{t('comingSoon')}</p>
              <div className='mobile-nav-footer__icons'>
                <a
                  href='https://apps.apple.com/us/app/fitpass-sport-and-recreation/id1444181297'
                  target='_blank'
                >
                  <img src='/assets/icons/app-store.png' alt='App Store' />
                </a>
                <a
                  href='https://play.google.com/store/apps/details?id=rs.abstract.fitpass&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pli=1'
                  target='_blank'
                >
                  <img src='/assets/icons/google-play.png' alt='Google Play' />
                </a>
                <a
                  href='https://appgallery.huawei.com/#/app/C102996943?channelId=EURSMKT20201007FP&detailType=0'
                  target='_blank'
                >
                  <img
                    src='/assets/icons/huawei-croped.png'
                    alt='App Gallery'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(MobileNav);
