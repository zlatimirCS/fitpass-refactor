'use client';

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void;
      // add other methods if needed
    };
  }
}

import { CmsDataForCompanies } from '@/types/types';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { memo, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

const HeroForCompanies = ({ cmsDataForCompanies }: CmsDataForCompanies) => {
  const t = useTranslations('ForCompanies');
  const locale = useLocale();
  const recaptchaRef = useRef<any>(null);
  const desktop = useMediaQuery('(min-width:1024px)');
  const mobile = useMediaQuery('(max-width:768px)');
  const tablet = useMediaQuery('(min-width:768px) and (max-width:1023px)');
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const [form, setForm] = useState({
    companyName: '',
    role: '',
    teamSize: '',
    companyID: '',
    address: '',
    nameSurname: '',
    email: '',
    phoneNumber: '',
    terms: false,
    newsUpdates: false,
    recaptchaToken: '',
  });

  const [formError, setFormError] = useState({
    companyName: false,
    role: false,
    teamSize: false,
    companyID: false,
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
    target: { value: any; name: any; checked?: any };
  }) => {
    const { name, value } = e.target;

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

    if (name === 'phoneNumber') {
      if (isNaN(Number(value))) {
        setFormError(prev => ({
          ...prev,
          phoneNumber: true,
        }));
      }
    }

    if (name === 'companyID') {
      if (isNaN(Number(value))) {
        setFormError(prev => ({
          ...prev,
          companyID: true,
        }));
      }
    }

    if (e.target.name === 'terms' || e.target.name === 'newsUpdates') {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const {
      companyName,
      role,
      teamSize,
      address,
      nameSurname,
      email,
      phoneNumber,
      terms,
      companyID,
    } = form;
    const fieldsToValidate = [
      'companyName',
      'companyID',
      'address',
      'nameSurname',
      'email',
      'phoneNumber',
      'role',
      'teamSize',
      'terms',
    ];
    fieldsToValidate.forEach(field => {
      if (field === 'phoneNumber') {
        setFormError(prev => ({
          ...prev,
          phoneNumber: !form.phoneNumber || isNaN(Number(form.phoneNumber)),
        }));
      } else if (field === 'companyID') {
        setFormError(prev => ({
          ...prev,
          companyID: !form.companyID || isNaN(Number(form.companyID)),
        }));
      } else {
        setFormError(prev => ({
          ...prev,
          [field]: !form[field as keyof typeof form],
        }));
      }
    });
    const emailPatternVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPatternVal.test(email)) {
      setFormError(prev => ({
        ...prev,
        email: true,
      }));
    }
    if (isNaN(Number(phoneNumber))) {
      setFormError(prev => ({
        ...prev,
        phoneNumber: true,
      }));
    }
    if (isNaN(Number(companyID))) {
      setFormError(prev => ({
        ...prev,
        companyID: true,
      }));
    }
    if (!companyName) {
      toast.error(t('requiredFieldsMessage'));
      return;
    }
    if (isNaN(Number(companyID))) {
      toast.error(t('companyNumberValid'));
      return;
    }
    if (!address || !nameSurname || !email) {
      toast.error(t('requiredFieldsMessage'));
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error(t('validEmail'));
      return;
    }
    if (!phoneNumber) {
      toast.error(t('requiredFieldsMessage'));
      return;
    }
    if (isNaN(Number(phoneNumber))) {
      toast.error(t('phoneNumberValid'));
      return;
    }
    if (!role || !teamSize) {
      toast.error(t('requiredFieldsMessage'));
      return;
    }
    if (!terms) {
      toast.error(t('acceptTerms'));
      return;
    }
    if (!form.recaptchaToken) {
      toast.error(t('recaptchaValidationError'));
      setRecaptchaError(t('recaptchaValidationError'));
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: form.companyName,
        role: form.role,
        teamSize: form.teamSize,
        companyID: form.companyID,
        address: form.address,
        nameSurname: form.nameSurname,
        email: form.email,
        phoneNumber: form.phoneNumber,
        newsUpdates: form.newsUpdates,
        language:
          process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION === 'cg'
            ? 'cnr'
            : process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION,
      }),
    })
      .then(() => {})
      .catch(() => toast.error(t('formErrorMessage')));
    toast.success(t('formSuccessMessage'));
    setForm({
      companyName: '',
      role: '',
      teamSize: '',
      companyID: '',
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
    <div className='hero-companies'>
      <div
        style={{
          backgroundImage: `url(${
            desktop
              ? cmsDataForCompanies?.section1Image1
              : tablet
                ? cmsDataForCompanies?.section1Image1
                : mobile
                  ? cmsDataForCompanies?.section1Image1
                  : ''
          })`,
        }}
        className='hero-companies-hero-img-wrap'
      >
        <div className='gray-overlay'></div>
      </div>
      {/* <div className="gray-overlay"></div> */}
      <div className='wrapper'>
        <div className='hero-companies__content'>
          <h1>
            <span>{cmsDataForCompanies?.section1MainHeadingPart1 || ''}</span>
            <span className='bold'>
              {cmsDataForCompanies?.section1MainHeadingPart2 || ''}
            </span>
          </h1>
          <div className='hero-companies__content__form'>
            <form onSubmit={handleFormSubmit} id='submitForm'>
              {/*Company name*/}
              <TextField
                id='outlined-basic'
                label={t('companyName')}
                variant='filled'
                value={form.companyName}
                name='companyName'
                onChange={handleFormChange}
                InputProps={{
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.companyName ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.companyName ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.companyName
                        ? '#ff0033'
                        : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.companyName
                        ? '#ff0033'
                        : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.companyName
                        ? '#ff0033'
                        : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.companyName ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.companyName ? '#ff0033' : '#373737',
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
              {/*Company name*/}

              {/*PIB*/}
              <TextField
                id='outlined-basic'
                label={t('companyNumber')}
                variant='filled'
                value={form.companyID}
                name='companyID'
                onChange={handleFormChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ '& > svg': { color: '#000' } }}
                      position='end'
                      title={t('pibTooltip')}
                    >
                      <Tooltip
                        enterTouchDelay={0}
                        title={t('pibTooltip')}
                        componentsProps={{
                          tooltip: {
                            sx: {
                              fontSize: '1.5rem',
                            },
                          },
                        }}
                      >
                        <HelpOutlineIcon
                          sx={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                          }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                  sx: {
                    fontFamily: 'inherit',
                    color: formError.companyID ? '#ff0033' : '#686868',
                    fontSize: '16px',
                  },
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    borderBottom: `1px solid ${
                      formError.companyID ? '#ff0033' : '#686868'
                    }`,
                    '&:before': {
                      borderBottom: 'none',
                    },
                  },
                  '& .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.companyID ? '#ff0033' : '#373737',
                    },
                    '&:after': {
                      borderColor: formError.companyID ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiFilledInput-input': {
                    paddingTop: '20px',
                  },
                  '&:hover .MuiFilledInput-underline': {
                    '&:before': {
                      borderColor: formError.companyID ? '#ff0033' : '#373737',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    color: formError.companyID ? '#ff0033' : '#373737',
                    '&.Mui-focused': {
                      color: formError.companyID ? '#ff0033' : '#373737',
                    },
                  },
                  '& .MuiInputLabel-shrink': {
                    fontSize: '18px',
                    top: '-5px',
                    color: formError.companyID ? '#ff0033' : '#373737',
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
              {/*PIB*/}

              {/*Address*/}
              <TextField
                id='outlined-basic'
                label={t('address')}
                variant='filled'
                value={form.address}
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
                label={t('nameSurname')}
                variant='filled'
                value={form.nameSurname}
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
                value={form.email}
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
                    color: formError.email ? '#ff0033' : '#373737',
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

              {/*Phone Number*/}
              <TextField
                id='outlined-basic'
                label={t('phoneNumber')}
                variant='filled'
                value={form.phoneNumber}
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
                    color: formError.phoneNumber ? '#ff0033' : '#373737',
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
              {/*Phone Number*/}

              {/*Role*/}
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
                    color: formError.role ? '#ff0033' : '#373737',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    '&.Mui-focused': {
                      color: formError.role ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                    '&:not(.Mui-focused).MuiInputLabel-shrink': {
                      color: formError.role ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                  }}
                >
                  {t('yourPosition')}
                </InputLabel>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  value={form.role}
                  name='role'
                  onChange={handleFormChange}
                  sx={{
                    '& .MuiFilledInput-input': {
                      paddingBottom: '7px',
                    },
                    '&:before': {
                      borderColor: formError.role ? '#ff0033' : '#686868',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderColor: formError.role ? '#ff0033' : '#686868',
                    },
                    '&:after': {
                      borderColor: formError.role ? '#ff0033' : '#686868',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '16px',
                      color: formError.role ? '#ff0033' : '#686868',
                    },
                    '& .MuiSelect-select': {
                      minHeight: '2rem !important',
                    },
                  }}
                >
                  <MenuItem value='cto' sx={{ fontSize: '14px' }}>
                    {'CEO'}
                  </MenuItem>
                  <MenuItem value='ceo' sx={{ fontSize: '14px' }}>
                    {'Founder/Owner'}
                  </MenuItem>
                  <MenuItem value='hrManager' sx={{ fontSize: '14px' }}>
                    {'HR Manager'}
                  </MenuItem>
                  <MenuItem value='teamLead' sx={{ fontSize: '14px' }}>
                    {'Team Lead'}
                  </MenuItem>
                  <MenuItem value='employee' sx={{ fontSize: '14px' }}>
                    {'Employee'}
                  </MenuItem>
                  <MenuItem value='other' sx={{ fontSize: '14px' }}>
                    {'Group classes'}
                  </MenuItem>
                  <MenuItem value='other' sx={{ fontSize: '14px' }}>
                    {'Other'}
                  </MenuItem>
                </Select>
              </FormControl>
              {/*Role*/}

              {/*Team size*/}
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
                    color: formError.role ? '#ff0033' : '#373737',
                    fontFamily: 'inherit',
                    fontSize: '16px',
                    '&.Mui-focused': {
                      color: formError.role ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                    '&:not(.Mui-focused).MuiInputLabel-shrink': {
                      color: formError.role ? '#ff0033' : '#373737',
                      top: '-5px',
                      fontSize: '18px',
                    },
                  }}
                >
                  {t('yourTeamSize')}
                </InputLabel>
                <Select
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  value={form.teamSize}
                  name='teamSize'
                  onChange={handleFormChange}
                  sx={{
                    '& .MuiFilledInput-input': {
                      paddingBottom: '7px',
                    },
                    '&:before': {
                      borderColor: formError.teamSize ? '#ff0033' : '#686868',
                    },
                    '&:not(.Mui-disabled):hover::before': {
                      borderColor: formError.teamSize ? '#ff0033' : '#686868',
                    },
                    '&:after': {
                      borderColor: formError.teamSize ? '#ff0033' : '#686868',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '16px',
                      color: formError.teamSize ? '#ff0033' : '#686868',
                    },
                    '& .MuiSelect-select': {
                      minHeight: '2rem !important',
                    },
                  }}
                >
                  <MenuItem value='<15' sx={{ fontSize: '14px' }}>
                    {'<15'}
                  </MenuItem>
                  <MenuItem value='15-50' sx={{ fontSize: '14px' }}>
                    {'15-50'}
                  </MenuItem>
                  <MenuItem value='50-100' sx={{ fontSize: '14px' }}>
                    {'50-100'}
                  </MenuItem>
                  <MenuItem value='100-300' sx={{ fontSize: '14px' }}>
                    {'100-300'}
                  </MenuItem>
                  <MenuItem value='300>' sx={{ fontSize: '14px' }}>
                    {'>300'}
                  </MenuItem>
                </Select>
              </FormControl>
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
              {/*Team size*/}

              <div className='form-bottom'>
                {process.env.NEXT_PUBLIC_PRIMARY_CC_EXTENSION !== 'fr' && (
                  <div className='form-bottom-flex'>
                    <input
                      type='checkbox'
                      name='terms'
                      onChange={handleFormChange}
                      checked={form.terms}
                    />
                    <p className={`links-form`}>
                      <span>
                        <span
                          className={`${formError.terms ? 'terms-error' : ''}`}
                        >
                          {t('agreeOnFitpass')}&nbsp;
                          <a
                            href='/assets/terms-of-service.pdf'
                            target='_blank'
                            className={`${formError.terms ? 'terms-error' : ''}`}
                          >
                            {t('termsAndConditions')}
                          </a>{' '}
                          {t('and')}&nbsp;
                          <a
                            href='/assets/privacy-policy.pdf'
                            target='_blank'
                            className={`${formError.terms ? 'terms-error' : ''}`}
                          >
                            {t('privacyPolicy')}
                          </a>
                          *
                        </span>
                      </span>
                    </p>
                  </div>
                )}
                <div className='form-bottom-flex'>
                  <input
                    type='checkbox'
                    name='newsUpdates'
                    onChange={handleFormChange}
                    checked={form.newsUpdates}
                  />
                  <p>
                    <span>{t('agreeToReceiveNews')}</span>
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
                  {t('submitButton')}
                </button>
                <p
                  style={{
                    textTransform: 'uppercase',
                    color: '#686868',
                    fontSize: '16px',
                    fontWeight: 800,
                  }}
                >
                  * {t('mandatoryFields')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(HeroForCompanies);
