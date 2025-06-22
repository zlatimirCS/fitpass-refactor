import { useTranslations } from 'next-intl';

const ExploreNetworkHeroSection = () => {
  const t = useTranslations('ExploreNetworkPage');
  return (
    <section className='explore-network-hero'>
      <div className='explore-network-hero__top'>
        <div className='wrapper'>
          <h1>
            <span>{t('fitpassNetworkPart1')}&nbsp;</span>
            <span className='bold'>{t('fitpassNetworkPart2')}</span>
          </h1>
          <p>{t('searchGyms')}</p>
        </div>
      </div>
    </section>
  );
};
export default ExploreNetworkHeroSection;
