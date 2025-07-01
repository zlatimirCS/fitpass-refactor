import { routeTranslations } from '@/lib/routeTranslations';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import SocialIcons from './SocialIcons';
const Footer = ({
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
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className='footer-top'>
        <div className='wrapper'>
          <div className='footer-top--left'>
            <article>
              <ul className='links'>
                {!auHide && (
                  <Link
                    href={`${locale === process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['about-us']}` : '/en/about-us'}`}
                  >
                    <li>{t('aboutUs')}</li>
                  </Link>
                )}
                {!fcHide && (
                  <Link
                    href={`${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
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
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
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
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['explore-network']}`
                        : '/en/explore-network'
                    }`}
                  >
                    <li>{t('exploreNetwork')}</li>
                  </Link>
                )}
                {!clHide && (
                  <Link
                    href={`${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['club']}`
                        : '/en/club'
                    }`}
                  >
                    <li>{t('club')}</li>
                  </Link>
                )}
                {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
                  <Link
                    href={`${
                      locale ===
                      `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                        ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['faq']}`
                        : '/en/faq'
                    }`}
                  >
                    <li>{t('faqNav')}</li>
                  </Link>
                )}
                {!ctHide &&
                  process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
                    <Link
                      href={`${
                        locale ===
                        `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                          ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}/${routeTranslations[locale as keyof typeof routeTranslations]['contact']}`
                          : '/en/contact'
                      }`}
                    >
                      <li>{t('contact')}</li>
                    </Link>
                  )}
              </ul>
            </article>
            <article>
              {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
                <>
                  <ul className='links'>
                    <a
                      href={`${
                        locale ===
                        `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                          ? `/assets/Terms_of_Service-CNR.pdf`
                          : '/assets/Terms_of_Service-ENG.pdf'
                      }`}
                      target='_blank'
                    >
                      <li>{t('termsConditions')}</li>
                    </a>
                    <a
                      href={`${
                        locale ===
                        `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                          ? `/assets/Privacy_Policy-CNR.pdf`
                          : '/assets/Privacy_Policy-ENG.pdf'
                      }`}
                      target='_blank'
                    >
                      <li>{t('privacyPolicy')}</li>
                    </a>
                  </ul>
                </>
              )}
            </article>
            <article>
              <ul className='links contact'>
                <article>
                  <p>{t('contactUs')}</p>
                  <ul>
                    <li>Emergo Sport d.o.o</li>
                    <li>
                      E-mail:{' '}
                      <a
                        href={`mailto:${
                          locale === 'cg'
                            ? 'kontakt@fitpass.me'
                            : locale === 'sr'
                              ? 'kontakt@fitpass.me'
                              : locale === 'fr'
                                ? 'contact@fitpass.ma'
                                : ''
                        }`}
                        className='email-link'
                      >
                        {locale === 'cg'
                          ? 'kontakt@fitpass.me'
                          : locale === 'sr'
                            ? 'kontakt@fitpass.me'
                            : locale === 'fr'
                              ? 'contact@fitpass.ma'
                              : ''}
                      </a>
                    </li>
                  </ul>
                </article>
              </ul>
            </article>
          </div>
          <div className='footer-top--right'>
            <article>
              <p>{t('followUs')}</p>
              <SocialIcons />

              {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
                <div className='download-app-section'>
                  <div className='stores-icons-wrap'>
                    <a
                      href='https://apps.apple.com/us/app/fitpass-sport-and-recreation/id1444181297'
                      target='_blank'
                    >
                      <Image
                        src='/assets/icons/app-store.png'
                        alt='App Store'
                        className='store-icon'
                        width={1200}
                        height={1200}
                      />
                    </a>
                    <a
                      href='https://play.google.com/store/apps/details?id=rs.abstract.fitpass&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&pli=1'
                      target='_blank'
                    >
                      <Image
                        src='/assets/icons/google-play.png'
                        alt='Google Play'
                        className='store-icon'
                        width={1200}
                        height={1200}
                      />
                    </a>
                    <a
                      href='https://appgallery.huawei.com/#/app/C102996943?channelId=EURSMKT20201007FP&detailType=0'
                      target='_blank'
                    >
                      <Image
                        src='/assets/icons/huawei-croped.png'
                        alt='App Gallery'
                        className='store-icon'
                        width={1200}
                        height={1200}
                      />
                    </a>
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='wrapper'>
          <Link
            href={`${
              locale === `${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                ? `/${process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION}`
                : '/en'
            }`}
          >
            <Image
              src='/assets/icons/logo-fitpass-secondary-svg.svg'
              alt='Fitpass'
              className='logo-fit'
              width={210}
              height={30}
            />
          </Link>
          <span className='copyright'>
            &copy;2014 - {currentYear}. Fitpass. {t('rights')}.
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
