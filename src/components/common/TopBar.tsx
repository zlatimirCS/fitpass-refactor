'use client';
import { useAppContext } from '@/context/AppProvider';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import * as NProgress from 'nprogress';
import { memo, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import XIcon from './icons/XIcon';

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('Header');

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
      // return join the path with "/" separator starting from the 2nd element
      return path.split('/')[2] + '/' + path.split('/')[3];
    }
  };
  const routeMainPath = generateRouteMainPath(pathname);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { isNewsletterModalOpen, setIsNewsletterModalOpen } = useAppContext();
  const allOptions = ['en', `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [secondaryLanguage, setSecondaryLanguage] = useState(
    allOptions.filter(option => option !== locale)[0]
  );

  const handleToggleLangSwitchDropdown = () => {
    setLangDropdownOpen(prev => !prev);
  };

  const handleSwitch = (lang: string) => {
    if (
      pathname === '/en' ||
      pathname === `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
    ) {
      NProgress.start();
      router.push(`/${lang}`);
      return;
    }
    NProgress.start();
    router.push(`/${lang}/${routeMainPath}`);
  };

  const divRef = useRef(null);
  useClickAway(divRef, () => {
    // only if antd notification is not open
    if (document.querySelector('.ant-notification-notice') === null) {
      setIsNewsletterModalOpen(false);
    }
  });

  return (
    <div className='topbar'>
      {isNewsletterModalOpen && (
        <div className='newsletter-modal'>
          <div className='gray-overlay'></div>
          <div className='newsletter-modal-content' ref={divRef}>
            <XIcon onClick={() => setIsNewsletterModalOpen(false)} />
            {locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? (
              <iframe
                src='https://98a7d926.sibforms.com/serve/MUIFAIBb85LW9UupjKSyIVy1qkR4IyEDihFzPmr-viJmbJ_R6irIPd1WiMV4f4OEzy1rv4saBvKyuVkMNeVIp1Kh4VpOieZ_4ZV3_bLOkJoz-IVFb_YIHgPq-LI7uv_MntsOsWEPQjjftO4z40MlMHguWokpWe7gfEZCiq0NhwYy7HY0SC8EzLFvIn5s4X5AoVJJdD7HjxKaG0Jw'
                frameBorder='0'
                allowFullScreen
                allow='geolocation; microphone; camera; encrypted-media'
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '100%',
                }}
                className='iframe-newsletter-popup'
              ></iframe>
            ) : (
              <iframe
                // width="540"
                // height="305"
                src='https://98a7d926.sibforms.com/serve/MUIFAN8pxnkHzOSKilkZ_nBtLqvpCnCI29mec5xvRFe85D3ZYQbVVv8WU_5gEvjapUZOrbq6xowuBrtCwllTj32B0ddTxjHvsrioMuBLCBnWHcG1VR1p6uK6qlqKiuPym3L-XG9HXrWvd640htmu8CYuEarUugvO1FMWmEZvyYi0JSyMO0Vl-HiXbZpbiByPnHH_suF7ftv-PEZV'
                frameBorder='0'
                // scrolling="auto"
                allowFullScreen
                allow='geolocation; microphone; camera; encrypted-media'
                // style="display: block;margin-left: auto;margin-right: auto;max-width: 100%;"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxWidth: '100%',
                }}
                className='iframe-newsletter-popup'
              ></iframe>
            )}
          </div>
        </div>
      )}
      <div className='wrapper'>
        <div className='top-bar-flex'>
          <p className='hero-small'>
            {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
              <>
                {t('topBarText')}&nbsp;&nbsp;
                <span
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => setIsNewsletterModalOpen(true)}
                >
                  {t('topBarLink')}
                </span>
              </>
            )}
          </p>
          {locale && (
            <div className='top-bar-logo-lang-wrap'>
              {/* <p className="hero-small">Log in</p> */}
              <div className='lang-switch lang-switch--desktop'>
                <div
                  style={{ display: 'flex', gap: '10px', padding: '10px 0' }}
                  onClick={handleToggleLangSwitchDropdown}
                >
                  <span style={{ textTransform: 'uppercase' }}>{locale}</span>
                  <Image
                    src='/assets/icons/lang-switch-arrow.svg'
                    width={15}
                    height={15}
                    alt='lang switch arrow'
                    className={`lang-switch-arrow ${
                      langDropdownOpen ? 'active' : ''
                    }`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(TopBar);
