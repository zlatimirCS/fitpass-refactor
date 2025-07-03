'use client';
import { useEffect, useMemo, useState } from 'react';
import Cookies from 'universal-cookie';
import CookiesComponent from './CookiesComponent';

const CookiesScreen = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  const handleSetCookies = () => {
    setCookiesAccepted(true);
    cookies.set('cookiesAccepted', true, { path: '/', maxAge: 31536000 });
  };

  useEffect(() => {
    const cookiesAccepted = cookies.get('cookiesAccepted');
    if (!cookiesAccepted) {
      setCookiesAccepted(false);
    }
  }, [cookies]);

  return (
    <>
      <CookiesComponent
        handleSetCookies={handleSetCookies}
        cookiesAccepted={cookiesAccepted}
      />
    </>
  );
};
export default CookiesScreen;
