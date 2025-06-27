import { useTranslations } from 'next-intl';

const HeroFaq = () => {
  const t = useTranslations('Faq');
  return (
    <div className='hero-faq'>
      <div
        style={{
          backgroundImage: `url("/assets/images/faqHeroImage.webp")`,
        }}
        className='hero-faq-hero-img-wrap'
      ></div>
      <div className='wrapper'>
        <div className='hero-faq__content'>
          <h1>
            <span>{t('faqHeaderLine1')}</span>
            <span className='bold'>{t('faqHeaderLine2')}</span>
          </h1>
          <p className='hide-mobile'>{t('faqHeaderText')}</p>
        </div>
      </div>
    </div>
  );
};
export default HeroFaq;
