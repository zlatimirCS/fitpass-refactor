import { useTranslations } from 'next-intl';
import Image from 'next/image';

const SucessContactModal = ({
  handleModalClose,
}: {
  handleModalClose: () => void;
}) => {
  const t = useTranslations('Contact');
  return (
    <div className='sucess-contact-modal'>
      <div className='sucess-contact-modal-head'>
        <img
          src='/assets/icons/modal-close-icon.svg'
          alt='Close modal icon'
          style={{ cursor: 'pointer' }}
          onClick={handleModalClose}
        />
      </div>
      <div className='sucess-contact-modal-body'>
        <article className='modal-text'>
          <h3>{t('weGotYourMessage')}</h3>
          <p>{t('thanksForReachingOut')}</p>
          <p className='primary'>{t('stayTuned')}</p>
        </article>
        <Image
          src='/assets/icons/logo-fitpass-secondary-svg.svg'
          alt='Fitpass'
          className='logo-fit'
          width={183}
          height={58}
        />
      </div>
    </div>
  );
};
export default SucessContactModal;
