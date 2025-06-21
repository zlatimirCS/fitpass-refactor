import { BtnFormProps } from '@/types/types';
import { memo } from 'react';

const BtnForm = ({
  text,
  primary,
  bigger,
  letterSpace,
  primaryBg,
  white,
  noHover,
  onClick,
}: BtnFormProps) => {
  return (
    <button
      type='submit'
      className={`btn-form ${noHover ? 'no-hover' : ''} ${
        primary ? 'primary' : 'secondary'
      } ${bigger ? 'bigger' : ''} ${letterSpace ? 'letter-space' : ''}
      ${primaryBg ? 'primary-bg' : ''}
      ${white ? 'white-bg' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default memo(BtnForm);
