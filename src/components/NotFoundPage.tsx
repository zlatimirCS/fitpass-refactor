import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <section className='topBottomSpacing'>
      <div className='wrapper' style={{ textAlign: 'center' }}>
        <h2>404</h2>
        <h3>{t('title')}</h3>
        <p style={{ textWrap: 'balance' }}>{t('description')}</p>
      </div>
    </section>
  );
}
