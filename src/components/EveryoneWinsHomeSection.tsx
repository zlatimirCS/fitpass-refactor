'use client';
import React, {useState, memo} from 'react';
import BtnForm from '@/components/BtnForm';
import {CmsDataHp} from '@/types/types';

const EveryoneWinsHomeSection = ({cmsDataHp}: CmsDataHp) => {
  const [activeTab, setActiveTab] = useState('companies');
  return (
    <section className="everyone-wins-section topBottomSpacing">
      <div className="wrapper">
        <div className="everyone-wins-head">
          <h2 className="firstHeaderTrigger">
            {cmsDataHp?.section2MainHeading
              ? cmsDataHp?.section2MainHeading
              : ''}
          </h2>
          <div className="btn-wrap">
            <div onClick={() => setActiveTab('companies')}>
              <BtnForm
                text={
                  cmsDataHp?.section2Button1Text
                    ? cmsDataHp?.section2Button1Text
                    : ''
                }
                primary={activeTab === 'companies' ? false : true}
                noHover
              />
            </div>
            <div onClick={() => setActiveTab('employees')}>
              <BtnForm
                text={
                  cmsDataHp?.section2Button2Text
                    ? cmsDataHp?.section2Button2Text
                    : ''
                }
                primary={activeTab === 'employees' ? false : true}
                noHover
              />
            </div>
          </div>
        </div>
        <div className="everyone-wins-body">
          {activeTab === 'companies' && (
            <article>
              <ul>
                {cmsDataHp?.section2List1Item1 &&
                  cmsDataHp?.section2List1Item1 && (
                    <li>
                      <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                      {cmsDataHp?.section2List1Item1
                        ? cmsDataHp?.section2List1Item1
                        : ''}
                    </li>
                  )}
                {cmsDataHp && cmsDataHp?.section2List1Item2 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List1Item2 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List1Item3 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List1Item3 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List1Item4 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List1Item4 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List1Item5 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List1Item5 : ''}
                  </li>
                )}
              </ul>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="bg-image-wrap"
              >
                <img
                  src={
                    cmsDataHp?.section2Image1
                      ? cmsDataHp?.section2Image1
                      : '/assets/images/everyone-wins-img-1.webp'
                  }
                  alt="everyone wins"
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            </article>
          )}
          {activeTab === 'employees' && (
            <article>
              <ul>
                {cmsDataHp && cmsDataHp?.section2List2Item1 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List2Item1 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List2Item2 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List2Item2 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List2Item3 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List2Item3 : ''}
                  </li>
                )}
                {cmsDataHp && cmsDataHp?.section2List2Item4 && (
                  <li>
                    <img src="/assets/icons/znakic.svg" alt="fitpass icon" />
                    {cmsDataHp ? cmsDataHp?.section2List2Item4 : ''}
                  </li>
                )}
              </ul>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="bg-image-wrap"
              >
                <img
                  src={
                    cmsDataHp?.section2Image2
                      ? cmsDataHp?.section2Image2
                      : '/assets/images/veselodrustvo.jpg'
                  }
                  alt="everyone wins"
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};
export default memo(EveryoneWinsHomeSection);
