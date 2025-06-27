'use client';
import { CmsDataForPartners } from '@/types/types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { notification } from 'antd';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { memo, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void;
    };
  }
}

type FormType = {
  [key: string]: string | boolean;
  venueName: string;
  venueType: string;
  address: string;
  nameSurname: string;
  email: string;
  phoneNumber: string;
  terms: boolean;
  newsUpdates: boolean;
  recaptchaToken: string;
};
type FormErrorType = {
  [key: string]: boolean;
  venueName: boolean;
  venueType: boolean;
  address: boolean;
  nameSurname: boolean;
  email: boolean;
  phoneNumber: boolean;
  terms: boolean;
  newsUpdates: boolean;
};

const HeroForPartners = ({ cmsDataForPartners }: CmsDataForPartners) => {
  const t = useTranslations('ForPartners');
  const locale = useLocale();
  const recaptchaRef = useRef<any>(null);
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [form, setForm] = useState<FormType>({
    venueName: '',
    venueType: '',
    address: '',
    nameSurname: '',
    email: '',
    phoneNumber: '',
    terms: false,
    newsUpdates: false,
    recaptchaToken: '',
  });
  const [formError, setFormError] = useState<FormErrorType>({
    venueName: false,
    venueType: false,
    address: false,
    nameSurname: false,
    email: false,
    phoneNumber: false,
    terms: false,
    newsUpdates: false,
  });

  const handleValidateCaptcha = async (token: string) => {
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

  const handleRecaptcha = (token: string | null) => {
    if (!token) {
      setRecaptchaError(t('recaptchaValidationError'));
      return;
    }
    handleValidateCaptcha(token);
    setForm(prevForm => ({
      ...prevForm,
      recaptchaToken: token,
    }));
    setRecaptchaError(null);
  };

  const handleFormChange = (e: {
    target: { value: any; name: string; checked?: boolean };
  }) => {
    if (e.target.value !== '') {
      setFormError(prev => ({
        ...prev,
        [e.target.name]: false,
      }));
    } else {
      setFormError(prev => ({
        ...prev,
        [e.target.name]: true,
      }));
    }
    if (e.target.name === 'phoneNumber') {
      if (isNaN(Number(e.target.value))) {
        setFormError(prev => ({
          ...prev,
          phoneNumber: true,
        }));
      }
    }
    if (e.target.name === 'terms' || e.target.name === 'newsUpdates') {
      setForm(prevForm => ({
        ...prevForm,
        [e.target.name]: !!e.target.checked,
      }));
      return;
    }
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const {
      venueName,
      venueType,
      address,
      nameSurname,
      email,
      phoneNumber,
      terms,
    } = form;
    const fieldsToValidate = [
      'venueName',
      'venueType',
      'address',
      'nameSurname',
      'email',
      'phoneNumber',
      'terms',
    ];
    fieldsToValidate.forEach(field => {
      setFormError(prev => ({
        ...prev,
        [field]: !form[field],
      }));
    });
    if (isNaN(Number(phoneNumber))) {
      setFormError(prev => ({
        ...prev,
        phoneNumber: true,
      }));
    }
    const emailPatternVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPatternVal.test(email)) {
      setFormError(prev => ({
        ...prev,
        email: true,
      }));
    }
    if (!venueName || !venueType || !address || !nameSurname || !email) {
      notification.error({
        message: 'Please fill out all required fields.',
      });
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      notification.error({
        message: 'Please enter a valid email address.',
      });
      return;
    }
    if (!phoneNumber) {
      notification.error({
        message: 'Please fill out all required fields.',
      });
      return;
    }
    if (isNaN(Number(phoneNumber))) {
      notification.error({
        message: 'Please enter a valid phone number.',
      });
      return;
    }
    if (!terms) {
      notification.error({
        message: 'Please accept the Terms and conditions and Privacy policy.',
      });
      return;
    }
    if (!form.recaptchaToken) {
      setRecaptchaError('Please verify that you are human');
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-partners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        venueName: form.venueName,
        venueType: form.venueType,
        address: form.address,
        nameSurname: form.nameSurname,
        email: form.email,
        phoneNumber: form.phoneNumber,
        newsUpdates: form.newsUpdates,
        language: locale === 'cg' ? 'cnr' : locale,
      }),
    })
      .then(() => {})
      .catch(() =>
        notification.error({
          message: 'Something went wrong. Please try again later.',
        })
      );
    notification.success({
      message: 'Form submitted successfully!',
    });
    setForm({
      venueName: '',
      venueType: '',
      address: '',
      nameSurname: '',
      email: '',
      phoneNumber: '',
      terms: false,
      newsUpdates: false,
      recaptchaToken: '',
    });
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.reset();
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className='hero-partners'>
      <div
        style={{
          backgroundImage: `url(${
            desktop
              ? cmsDataForPartners?.section1Image
              : tablet
                ? cmsDataForPartners?.section1Image
                : mobile
                  ? cmsDataForPartners?.section1Image
                  : ''
          })`,
        }}
        className='hero-partners-hero-img-wrap'
      >
        <div className='gray-overlay'></div>
      </div>
      <div className='wrapper'>
        <div className='hero-partners__content'>
          <h1>
            <span>{cmsDataForPartners?.section1MainHeadingPart1 || ''}</span>
            <span>{cmsDataForPartners?.section1MainHeadingPart2 || ''}</span>
            <span className='bold'>
              {cmsDataForPartners?.section1MainHeadingPart3 || ''}
            </span>
          </h1>
          <div className='hero-partners__content__form'>
            <form onSubmit={handleFormSubmit} id='submitForm'>
              {/*Venue name*/}
              <TextField
                id='outlined-basic'
                label={'Venue name'}
                variant='filled'
                value={form.venueName as string}
                name='venueName'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.venueName ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.venueName ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.venueName ? '#ff0033' : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.venueName ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.venueName ? '#ff0033' : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.venueName ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.venueName ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                  '& .MuiInputLabel-focused': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                }}
              />
              {/*Venue name*/}
              {/*Venue type*/}
              <FormControl
                variant='filled'
                sx={{
                  '&.MuiFormControl-root': {
                    width: '100%',
                  },
                }}
                style={{ minWidth: '100%' }}
                fullWidth={true}
              >
                <InputLabel
                  id='demo-simple-select-filled-label'
                  sx={{
                    color: formError.venueType ? '#ff0033' : '#373737',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    '&.Mui-focused': {
                      color: formError.venueType ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                    '&:not(.Mui-focused).MuiInputLabel-shrink': {
                      color: formError.venueType ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                  }}
                >
                  {'Venue type'}
                </InputLabel>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  value={form.venueType as string}
                  name='venueType'
                  onChange={handleFormChange}
                  sx={{
                    '& .MuiFilledInput-input': {
                      paddingBottom: '7px',
                    },
                    '&:before': {
                      borderColor: formError.venueType ? '#ff0033' : '#686868',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderColor: formError.venueType ? '#ff0033' : '#686868',
                    },
                    '&:after': {
                      borderColor: formError.venueType ? '#ff0033' : '#686868',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '16px',
                      color: formError.venueType ? '#ff0033' : '#686868',
                    },
                    '& .MuiSelect-select': {
                      minHeight: '2rem !important',
                    },
                  }}
                >
                  <MenuItem value='gym' sx={{ fontSize: '14px' }}>
                    {'Gym'}
                  </MenuItem>
                  <MenuItem value='pool' sx={{ fontSize: '14px' }}>
                    {'Pool'}
                  </MenuItem>
                  <MenuItem value='spaSauna' sx={{ fontSize: '14px' }}>
                    {'Spa/Sauna'}
                  </MenuItem>
                  <MenuItem value='sportComplex' sx={{ fontSize: '14px' }}>
                    {'Sport Complex'}
                  </MenuItem>
                  <MenuItem value='kidsActivities' sx={{ fontSize: '14px' }}>
                    {'Kids Activities'}
                  </MenuItem>
                  <MenuItem value='groupClasses' sx={{ fontSize: '14px' }}>
                    {'Group Classes'}
                  </MenuItem>
                  <MenuItem value='other' sx={{ fontSize: '14px' }}>
                    {'Other'}
                  </MenuItem>
                </Select>
              </FormControl>
              {/*Venue type*/}
              {/*Address*/}
              <TextField
                id='outlined-basic'
                label={'Address'}
                variant='filled'
                value={form.address as string}
                name='address'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.address ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.address ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.address ? '#ff0033' : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.address ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.address ? '#ff0033' : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.address ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.address ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                  '& .MuiInputLabel-focused': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                }}
              />
              {/*Address*/}
              {/*Name surname*/}
              <TextField
                id='outlined-basic'
                label={'Name and surname'}
                variant='filled'
                value={form.nameSurname as string}
                name='nameSurname'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.nameSurname ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.nameSurname ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.nameSurname
                        ? '#ff0033'
                        : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.nameSurname
                        ? '#ff0033'
                        : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.nameSurname
                        ? '#ff0033'
                        : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.nameSurname ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.nameSurname ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                  '& .MuiInputLabel-focused': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                }}
              />
              {/*Name surname*/}
              {/*Email*/}
              <TextField
                id='outlined-basic'
                label={'Email*'}
                variant='filled'
                value={form.email as string}
                name='email'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.email ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.email ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.email ? '#ff0033' : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.email ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.email ? '#ff0033' : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.email ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.email ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                  '& .MuiInputLabel-focused': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                }}
              />
              {/*Email*/}
              {/*Phone number*/}
              <TextField
                id='outlined-basic'
                label={'Phone number'}
                variant='filled'
                value={form.phoneNumber as string}
                name='phoneNumber'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.phoneNumber ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.phoneNumber ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.phoneNumber
                        ? '#ff0033'
                        : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.phoneNumber
                        ? '#ff0033'
                        : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.phoneNumber
                        ? '#ff0033'
                        : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.phoneNumber ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.phoneNumber ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                  '& .MuiInputLabel-focused': {
                    fontSize: '18px',
                    top: '-5px',
                    color: '#373737',
                    fontFamily: 'inherit',
                  },
                }}
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={
                  process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ''
                }
                onChange={handleRecaptcha}
                hl={`${locale === 'en' ? 'en' : 'hr'}`}
              />
              {recaptchaError && (
                <p style={{ margin: 0, fontSize: '14px', color: '#ff0033' }}>
                  {recaptchaError}
                </p>
              )}
              <div className='form-bottom'>
                <div className='form-bottom-flex'>
                  <input
                    type='checkbox'
                    name='terms'
                    onChange={handleFormChange}
                    checked={form.terms as boolean}
                  />
                  <p className='links-form'>
                    <span>
                      {locale === 'en' ? (
                        <span
                          className={`${formError.terms ? 'terms-error' : ''}`}
                        >
                          I agree on Fitpass{' '}
                          <a
                            href='/assets/terms-of-service.pdf'
                            target='_blank'
                            className={`$${formError.terms ? 'terms-error' : ''}`}
                          >
                            Terms and conditions
                          </a>{' '}
                          and&nbsp;
                          <a
                            href='/assets/privacy-policy.pdf'
                            target='_blank'
                            className={`$${formError.terms ? 'terms-error' : ''}`}
                          >
                            Privacy&nbsp;policy
                          </a>
                          *
                        </span>
                      ) : (
                        <span
                          className={`${formError.terms ? 'terms-error' : ''}`}
                        >
                          Ovim prihvatam Fitpass{' '}
                          <a
                            href='/assets/terms-of-service.pdf'
                            target='_blank'
                            className={`$${formError.terms ? 'terms-error' : ''}`}
                          >
                            Uslove korišćenja
                          </a>{' '}
                          i&nbsp;
                          <a
                            href='/assets/privacy-policy.pdf'
                            target='_blank'
                            className={`$${formError.terms ? 'terms-error' : ''}`}
                          >
                            Politiku&nbsp;privatnosti
                          </a>
                          *
                        </span>
                      )}
                    </span>
                  </p>
                </div>
                <div className='form-bottom-flex'>
                  <input
                    type='checkbox'
                    name='newsUpdates'
                    onChange={handleFormChange}
                    checked={form.newsUpdates as boolean}
                  />
                  <p>
                    <span>
                      {t('agreeToReceiveNews') ||
                        'I agree to receive news and updates.'}
                    </span>
                  </p>
                </div>
                <button
                  className='card-btn card-btn-form'
                  style={{
                    margin: '10px 0 20px 0',
                    minWidth: '225px',
                    padding: '15px 0',
                  }}
                >
                  {'Submit'}
                </button>
                <p
                  style={{
                    textTransform: 'uppercase',
                    color: '#686868',
                    fontSize: '16px',
                    fontWeight: 800,
                  }}
                >
                  {'* Mandatory fields'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(HeroForPartners);
