import React from 'react';

const useDimensions = () => {
  const [windowSize, setWindowSize] = React.useState<number | undefined>();

  React.useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.position = 'inherit';
    }
    setWindowSize(window.innerWidth);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  const resize = () => {
    setWindowSize(window.innerWidth);
  };
  return windowSize;
};

export default useDimensions;
