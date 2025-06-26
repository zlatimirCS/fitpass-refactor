const LangSwitchArrow = ({
  fill,
  langDropdownOpen,
  onClick,
}: {
  fill: string;
  langDropdownOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      x='0px'
      y='0px'
      viewBox='0 0 15.2 14.8'
      width='15px'
      height='15px'
      className={`lang-switch-arrow ${langDropdownOpen ? 'active' : ''}`}
      onClick={onClick}
    >
      <polyline
        fill='none'
        stroke={fill}
        strokeWidth='1.375'
        strokeLinecap='round'
        strokeMiterlimit='10'
        points='12.3,5.9 7.5,10.8 2.7,5.9 '
      />
    </svg>
  );
};
export default LangSwitchArrow;
