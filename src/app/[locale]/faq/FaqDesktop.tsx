'use client';
import { faqCg, faqEn } from '@/data/data';
import { useLocale, useTranslations } from 'next-intl';
import { memo } from 'react';
import FaqSingleAccordionDesktop from './FaqSingleAccordionDesktop';

const FaqDesktop = () => {
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
        <div className='faq-wrap'>
          <aside>
            <div className='sticky-sidebar'>
              <p className='first'>{t('content')}</p>
              <a href='#1_section'>
                <p>1 {t('whatIsFitpass')}</p>
              </a>
              <a href='#2_section'>
                <p>2 {t('facilities')}</p>
              </a>
              <a href='#3_section'>
                <p>3 {t('howToGetFitpass')}</p>
              </a>
            </div>
          </aside>
          <div className='faq-desktop-content'>
            <article className='faq-section sectionOne' id='1_section'>
              <div className='circle-elipse'>
                <span>1</span>
              </div>
              <FaqSingleAccordionDesktop accordionData={faq.whatIsFitpass} />
            </article>
            <article className='faq-section' id='2_section'>
              <div className='circle-elipse'>
                <span>2</span>
              </div>
              <FaqSingleAccordionDesktop accordionData={faq.facilities} />
            </article>
            <article className='faq-section' id='3_section'>
              <div className='circle-elipse'>
                <span>3</span>
              </div>
              <FaqSingleAccordionDesktop accordionData={faq.fitpassCompany} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(FaqDesktop);
