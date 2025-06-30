'use client';
import { CmsDataContact } from '@/types/types';
import { notification } from 'antd';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const FormSection = ({
  handleModalOpen,
  cmsDataContact,
}: {
  handleModalOpen: () => void;
  cmsDataContact: CmsDataContact['cmsDataContact'];
}) => {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [readyForCaptcha, setReadyForCaptcha] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [checkBoxes, setCheckBoxes] = useState<{
    individuals: boolean;
    employeeBenefits: boolean;
    fitpassClub: boolean;
    businessCollaborations: boolean;
    otherInquires: boolean;
  }>({
    individuals: false,
    employeeBenefits: false,
    fitpassClub: false,
    businessCollaborations: false,
    otherInquires: false,
  });

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
    recaptchaToken: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleValidateCaptcha = async (token: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/validate-captcha-token`,
        { token }
      );
      if (response.data.success) {
        return true;
      } else {
        setRecaptchaError(t('recaptchaValidationError'));
        recaptchaRef.current?.reset();
        return false;
      }
    } catch (error) {
      console.log(error);
      setRecaptchaError(t('recaptchaValidationError'));
      recaptchaRef.current?.reset();
      return false;
    }
  };

  const handleRecaptcha = (token: any) => {
    if (!token) {
      setRecaptchaError(t('recaptchaError'));
      return;
    }
    const isValid = handleValidateCaptcha(token);
    if (!isValid) {
      return;
    }
    setForm(prevForm => ({
      ...prevForm,
      recaptchaToken: token,
    }));
    setRecaptchaError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    // Create a new object with all keys set to false
    const newCheckBoxes = Object.keys(checkBoxes).reduce(
      (acc, key) => {
        acc[key as keyof typeof checkBoxes] = false;
        return acc;
      },
      {} as typeof checkBoxes
    );

    // Update the specific checkbox
    newCheckBoxes[name as keyof typeof checkBoxes] = checked;

    // Update the state
    setCheckBoxes(newCheckBoxes);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== '') {
      setFormErrors(prev => ({ ...prev, [e.target.name]: false }));
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleValidateForm = (form: typeof FormSection.prototype.form) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all form fields have values
    const formWithoutRecaptcha = {
      name: form.name,
      surname: form.surname,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    const allFieldsFilled = Object.values(formWithoutRecaptcha).every(
      value => value
    );

    // Check if at least one checkbox is selected
    const atLeastOneCheckboxSelected = Object.values(checkBoxes).some(
      value => value
    );

    // Validate email format
    const isEmailValid = emailRegex.test(form.email);

    if (!allFieldsFilled) {
      return {
        isValid: false,
        message: t('requiredFieldsMessage'),
      };
    }
    if (!isEmailValid) {
      return {
        isValid: false,
        message: t('validEmail'),
      };
    }
    if (!atLeastOneCheckboxSelected) {
      return {
        isValid: false,
        message: t('selectDepartment'),
      };
    }
    return {
      isValid: true,
    };
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleValidateForm(form);
    if (!isValid.isValid) {
      notification.error({
        message: isValid.message,
      });
      Object.keys(formErrors).forEach(key => {
        if (!form[key as keyof typeof form]) {
          setFormErrors(prev => ({ ...prev, [key]: true }));
        } else {
          setFormErrors(prev => ({ ...prev, [key]: false }));
        }
      });
      return;
    }

    if (!form.recaptchaToken) {
      setRecaptchaError(t('recaptchaError'));
      return;
    }

    let checkBoxString;
    if (checkBoxes.individuals) {
      checkBoxString = 'Individuals';
    }
    if (checkBoxes.employeeBenefits) {
      checkBoxString = 'Employee Benefits';
    }
    if (checkBoxes.fitpassClub) {
      checkBoxString = 'Fitpass Club';
    }
    if (checkBoxes.businessCollaborations) {
      checkBoxString = 'Business Collaborations';
    }
    if (checkBoxes.otherInquires) {
      checkBoxString = 'Other Inquires';
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        surname: form.surname,
        email: form.email,
        phoneNumber: form.phone,
        message: form.message,
        checkBox: checkBoxString,
        language: process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION,
      }),
    })
      .then(r => {
        if (r.status === 200) {
          setReadyForCaptcha(false);
          document.body.style.overflow = 'auto';
          setForm({
            name: '',
            surname: '',
            email: '',
            phone: '',
            message: '',
            recaptchaToken: '',
          });
          setCheckBoxes({
            individuals: false,
            employeeBenefits: false,
            fitpassClub: false,
            businessCollaborations: false,
            otherInquires: false,
          });
          window.scrollTo(0, 0);
          setTimeout(() => {
            handleModalOpen();
          }, 1000);
        }
      })
      .catch(e => {
        console.log(e);
        notification.error({
          message: t('formErrorMessage'),
        });
      });

    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
    window.scrollTo(0, 0);

    // setReadyForCaptcha(true);

    // disable scroll
    // document.body.style.overflow = "hidden";
  };

  const handleResetForm = () => {
    setForm({
      name: '',
      surname: '',
      email: '',
      phone: '',
      message: '',
      recaptchaToken: '',
    });
    setFormErrors({
      name: false,
      surname: false,
      email: false,
      phone: false,
      message: false,
    });
    setCheckBoxes({
      individuals: false,
      employeeBenefits: false,
      fitpassClub: false,
      businessCollaborations: false,
      otherInquires: false,
    });
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
    setRecaptchaError(null);
  };

  return (
    <section className='contact-page'>
      <div className='wrapper'>
        <p className='intro-text'>
          {cmsDataContact?.sectionHeaderText
            ? cmsDataContact?.sectionHeaderText
            : ''}
        </p>
        <div className='contact-wrap'>
          <aside className='contact-page-aside-checkboxes'>
            <div className='contact-page-aside-checkboxes-wrap'>
              <input
                type='checkbox'
                id='checkbox1'
                name='individuals'
                onChange={handleCheckboxChange}
                checked={checkBoxes.individuals}
              />
              <label htmlFor='checkbox1'>{t('fitpassForIndividuals')}</label>
            </div>
            <div className='contact-page-aside-checkboxes-wrap'>
              <input
                type='checkbox'
                id='checkbox2'
                name='employeeBenefits'
                onChange={handleCheckboxChange}
                checked={checkBoxes.employeeBenefits}
              />
              <label htmlFor='checkbox2'>{t('employeeBenefits')}</label>
            </div>
            <div className='contact-page-aside-checkboxes-wrap'>
              <input
                type='checkbox'
                id='checkbox4'
                name='businessCollaborations'
                onChange={handleCheckboxChange}
                checked={checkBoxes.businessCollaborations}
              />
              <label htmlFor='checkbox4'>{t('businessCollaborations')}</label>
            </div>
            <div className='contact-page-aside-checkboxes-wrap'>
              <input
                type='checkbox'
                id='checkbox4'
                name='otherInquires'
                onChange={handleCheckboxChange}
                checked={checkBoxes.otherInquires}
              />
              <label htmlFor='checkbox5'>{t('otherInquires')}</label>
            </div>
          </aside>
          <div className='contact-content'>
            <form onSubmit={handleFormSubmit}>
              <div className='form-top'>
                <input
                  type='text'
                  placeholder={t('name')}
                  name='name'
                  value={form.name}
                  onChange={handleFormChange}
                  className={`${formErrors.name ? 'error' : ''}`}
                />
                <input
                  type='text'
                  placeholder={t('surname')}
                  name='surname'
                  value={form.surname}
                  onChange={handleFormChange}
                  className={`${formErrors.surname ? 'error' : ''}`}
                />
                <input
                  type='text'
                  placeholder={t('email')}
                  name='email'
                  value={form.email}
                  onChange={handleFormChange}
                  className={`${formErrors.email ? 'error' : ''}`}
                />
                <input
                  type='text'
                  placeholder={t('phone')}
                  name='phone'
                  value={form.phone}
                  onChange={handleFormChange}
                  className={`${formErrors.phone ? 'error' : ''}`}
                />
                <textarea
                  name='message'
                  id=''
                  cols={30}
                  rows={10}
                  placeholder={t('message')}
                  value={form.message}
                  onChange={handleFormChange}
                  className={`${formErrors.message ? 'error' : ''}`}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={
                    process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ''
                  }
                  onChange={handleRecaptcha}
                  hl={locale === 'en' ? 'en' : 'hr'}
                />
              </div>
              {recaptchaError && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#ff0033',
                    textAlign: 'center',
                  }}
                >
                  {recaptchaError}
                </p>
              )}
              <div
                className='form-bottom'
                style={{ justifyContent: 'center', marginTop: '30px' }}
              >
                <button
                  type='button'
                  className='card-btn card-btn-reset'
                  onClick={handleResetForm}
                >
                  {t('reset')}
                </button>
                <button type='submit' className='card-btn card-btn-form'>
                  {t('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FormSection;
