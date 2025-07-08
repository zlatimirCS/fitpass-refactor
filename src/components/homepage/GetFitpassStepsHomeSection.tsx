import BtnForm from '@/components/common/BtnForm';
import { CmsDataHp } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const GetFitpassStepsHomeSection = ({ cmsDataHp }: CmsDataHp) => {
  return (
    <section className='get-fitpass-steps-section topBottomSpacing'>
      <div className='wrapper'>
        <div className='get-fitpass-steps-wrap'>
          <article className='get-fitpass-steps-video'>
            {/* <Opfa /> */}
            <Image
              src={
                cmsDataHp?.section4Image1
                  ? cmsDataHp?.section4Image1
                  : '/assets/images/placeholder.svg'
              }
              alt='Get Fitpass Steps'
              width={400}
              height={300}
              className='img-head img-3steps-intro'
            />
            <div className='fitpass-video'>
              {cmsDataHp?.section4VideoUrl && (
                <video
                  key={cmsDataHp.section4VideoUrl}
                  controls
                  playsInline
                  loop
                  id='myVideo'
                >
                  <source
                    src={
                      cmsDataHp?.section4VideoUrl
                        ? cmsDataHp?.section4VideoUrl
                        : ''
                    }
                    type='video/mp4'
                  />
                </video>
              )}
            </div>
          </article>
          <article className='get-fitpass-steps-content'>
            <div className='content-right'>
              <h2>
                <span>
                  {cmsDataHp?.section4StepsTitlePart1
                    ? cmsDataHp?.section4StepsTitlePart1
                    : ''}
                </span>
                &nbsp;
                {cmsDataHp?.section4StepsTitlePart2
                  ? cmsDataHp?.section4StepsTitlePart2
                  : ''}
              </h2>
            </div>
            <div className='simple-steps-container'>
              <div className='simple-step'>
                {cmsDataHp?.section4Step1Title && (
                  <Image
                    src='/assets/icons/znakic.svg'
                    alt='fitpass icon'
                    width={32}
                    height={32}
                  />
                )}
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataHp?.section4Step1Title
                      ? cmsDataHp?.section4Step1Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataHp?.section4Step1Text
                      ? cmsDataHp?.section4Step1Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='simple-step'>
                {cmsDataHp?.section4Step2Title && (
                  <Image
                    src='/assets/icons/znakic.svg'
                    alt='fitpass icon'
                    width={32}
                    height={32}
                  />
                )}
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataHp?.section4Step2Title
                      ? cmsDataHp?.section4Step2Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataHp?.section4Step2Text
                      ? cmsDataHp?.section4Step2Text
                      : ''}
                  </p>
                </div>
              </div>
              <div className='simple-step'>
                {cmsDataHp?.section4Step3Title && (
                  <Image
                    src='/assets/icons/znakic.svg'
                    alt='fitpass icon'
                    width={32}
                    height={32}
                  />
                )}
                <div className='simple-step-content'>
                  <h3>
                    {cmsDataHp?.section4Step3Title
                      ? cmsDataHp?.section4Step3Title
                      : ''}
                  </h3>
                  <p>
                    {cmsDataHp?.section4Step3Text
                      ? cmsDataHp?.section4Step3Text
                      : ''}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={
                cmsDataHp?.section4StepsButtonUrl
                  ? cmsDataHp?.section4StepsButtonUrl
                  : '/'
              }
            >
              <BtnForm
                text={
                  cmsDataHp?.section4StepsButtonText
                    ? cmsDataHp?.section4StepsButtonText
                    : ''
                }
                primary
              />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default GetFitpassStepsHomeSection;
