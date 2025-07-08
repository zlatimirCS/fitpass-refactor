'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <section className='topBottomSpacing'>
        <div className='wrapper'>
          <h3>{t('title')}</h3>
          <p style={{ textWrap: 'balance' }}>{t('description')}</p>
        </div>
      </section>
      {/* <div>
        {t.rich('description', {
          p: chunks => <p className='mt-4'>{chunks}</p>,
          retry: chunks => (
            <button
              className='text-white underline underline-offset-2'
              onClick={reset}
              type='button'
            >
              {chunks}
            </button>
          ),
        })}
      </div> */}
    </>
  );
}
