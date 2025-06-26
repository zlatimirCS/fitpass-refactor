'use client';
import MobileNav from '@/components/common/MobileNav';
import { routeTranslations } from '@/lib/routeTranslations';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import HamburgerIcon from './icons/HamburgerIcon';

const NavBar = ({
  auHide,
  fpHide,
  fcHide,
  enHide,
  clHide,
  ctHide,
}: {
  auHide: boolean;
  fpHide: boolean;
  fcHide: boolean;
  enHide: boolean;
  clHide: boolean;
  ctHide: boolean;
}) => {
  const locale = useLocale();
  const t = useTranslations('Header');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleToggleMobileNav = () => {
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
      document.body.classList.remove('no-scroll');
    } else if (!isMobileNavOpen) {
      setIsMobileNavOpen(true);
      document.body.classList.add('no-scroll');
    }
  };

  return (
    <div className='navbar'>
      <MobileNav
        isMobileNavOpen={isMobileNavOpen}
        handleToggleMobileNav={handleToggleMobileNav}
        auHide={auHide}
        fpHide={fpHide}
        fcHide={fcHide}
        enHide={enHide}
        clHide={clHide}
        ctHide={ctHide}
      />
      <div className='wrapper'>
        <div className='navbar-nav'>
          <div className='navbar-nav-flex'>
            <Link
              href={`${locale === '${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}' ? '/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}' : '/en'}`}
            >
              <Image
                src='/assets/icons/logo-fitpass-secondary-svg.svg'
                alt='Fitpass'
                className='logo-fit'
                width={183}
                height={58}
              />
            </Link>
            <ul className='nav-links'>
              {!auHide && (
                <Link
                  href={`${locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}` ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['about-us']}` : '/en/about-us'}`}
                >
                  <li>{t('aboutUs')}</li>
                </Link>
              )}
              {!fcHide && (
                <Link
                  href={`${
                    locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['for-companies']}`
                      : '/en/for-companies'
                  }`}
                >
                  <li>{t('forCompanies')}</li>
                </Link>
              )}
              {!fpHide && (
                <Link
                  href={`${
                    locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['for-partners']}`
                      : '/en/for-partners'
                  }`}
                >
                  <li>{t('forPartners')}</li>
                </Link>
              )}
              {!enHide && (
                <Link
                  href={`${
                    locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                      ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}`
                      : '/en/explore-network'
                  }`}
                >
                  <li>{t('exploreNetwork')}</li>
                </Link>
              )}
              {!clHide && (
                <Link
                  href={`${locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}` ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['club']}` : '/en/club'}`}
                >
                  <li>{t('club')}</li>
                </Link>
              )}
              <Link
                href={`${locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}` ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['faq']}` : '/en/faq'}`}
              >
                <li>{t('faq')}</li>
              </Link>
              {!ctHide && (
                <Link
                  href={`${locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}` ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['contact']}` : '/en/contact'}`}
                >
                  <li>{t('contact')}</li>
                </Link>
              )}
            </ul>
          </div>
          <div className='btn-form-container'></div>
          <div className='hamburger' onClick={handleToggleMobileNav}>
            <HamburgerIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(NavBar);
