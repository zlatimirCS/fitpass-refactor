'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const CookiesComponent = ({
  handleSetCookies,
  cookiesAccepted,
}: {
  handleSetCookies: () => void;
  cookiesAccepted: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const t = useTranslations('Common');
  return (
    <div
      className={`cookies-wrapper ${
        !cookiesAccepted && open ? 'not-accepted' : 'accepted'
      }`}
    >
      <div className='wrapper'>
        <div
          className='cookies-arrow-toggle'
          onClick={() => setOpen(prev => !prev)}
        >
          <Image
            src='/assets/icons/down.svg'
            alt='arrow-down'
            width={20}
            height={20}
          />
        </div>
        <article className='cookies-screen-content'>
          <div className='cookies-text-wrap'>
            <p>{t('useCookies')}</p>
            <p>{t('clickAccept')}</p>
          </div>
          <div className='btns-container'>
            <button className='btn-form orange' onClick={handleSetCookies}>
              {t('accept')}
            </button>
            <a href='/assets/terms-of-service.pdf' target='_blank'>
              <button className='btn-form secondary'>
                {t('cookiesSettings')}
              </button>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};
export default CookiesComponent;
