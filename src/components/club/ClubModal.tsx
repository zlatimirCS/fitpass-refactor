'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useClickAway } from 'react-use';

const ClubModal = ({
  currentActiveCard,
  setCurrentActiveCard,
}: {
  currentActiveCard: any;
  setCurrentActiveCard: any;
}) => {
  const t = useTranslations('Club');
  const divRef = useRef(null);
  useClickAway(divRef, () => {
    setCurrentActiveCard(null);
  });
  return (
    <div className='current-active-card-modal' ref={divRef}>
      <div className='modal-inner'>
        <Image
          src='/assets/icons/close-circle-fill.svg'
          alt='close'
          className='modal-close-icon'
          onClick={() => setCurrentActiveCard(null)}
          width={1200}
          height={1200}
        />
        <div className='img-overlay'>
          <Image
            src={
              currentActiveCard?.imageUrl?.large
                ? currentActiveCard?.imageUrl?.large
                : ''
            }
            alt='card'
            width={1200}
            height={1200}
          />
        </div>
        <div className='modal-inner-content'>
          <p className='modal-title'>
            {currentActiveCard?.title ? currentActiveCard?.title : ''}
          </p>
          <p className='modal-short-desc'>
            {currentActiveCard?.shortDesc ? currentActiveCard?.shortDesc : ''}
          </p>
          {currentActiveCard?.blogLink && (
            <Link
              href={currentActiveCard?.blogLink}
              target='_blank'
              //   style={{ width: "100%" }}
            >
              <button
                type='button'
                className='card-btn card-btn-form'
                style={{ width: '100%' }}
              >
                {t('learnMore')}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClubModal;
