'use client';
import { faqCg, faqEn } from '@/data/data';
import { useLocale, useTranslations } from 'next-intl';
import { memo } from 'react';
import { Element, Link as ScrollLink } from 'react-scroll';
import FaqSingleAccordionDesktop from './FaqSingleAccordionDesktop';

const FaqMobile = () => {
  const locale = useLocale();
  const t = useTranslations('Faq');
  const faq =
    locale === 'en'
      ? faqEn
      : locale === 'cg'
        ? faqCg
        : locale === 'sr'
          ? faqCg
          : faqEn;

  return (
    <section className='faq-desktop'>
      <div className='wrapper'>
        <p className='intro-text'>{t('faqHeaderText')}</p>
        <div className='faq-wrap'>
          <aside>
            <div className='sticky-sidebar'>
              <p className='first'>{t('content')}</p>
              <ScrollLink to='1_section' smooth={true} duration={500}>
                <p>1 {t('whatIsFitpass')}</p>
              </ScrollLink>
              <ScrollLink to='2_section' smooth={true} duration={500}>
                <p>2 {t('facilities')}</p>
              </ScrollLink>
              <ScrollLink to='3_section' smooth={true} duration={500}>
                <p>3 {t('howToGetFitpass')}</p>
              </ScrollLink>
            </div>
          </aside>
          <div className='faq-desktop-content'>
            <Element name='1_section' className='element'>
              <article className='faq-section sectionOne'>
                <div className='circle-elipse'>
                  <span>1</span>
                </div>
                <FaqSingleAccordionDesktop accordionData={faq.whatIsFitpass} />
              </article>
            </Element>
            <Element name='2_section' className='element'>
              <article className='faq-section' id='2_section'>
                <div className='circle-elipse'>
                  <span>2</span>
                </div>
                <FaqSingleAccordionDesktop accordionData={faq.facilities} />
              </article>
            </Element>
            <Element name='3_section' className='element'>
              <article className='faq-section' id='3_section'>
                <div className='circle-elipse'>
                  <span>3</span>
                </div>
                <FaqSingleAccordionDesktop accordionData={faq.fitpassCompany} />
              </article>
            </Element>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(FaqMobile);
