const XIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-6'
      width='35'
      height='35'
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18 18 6M6 6l12 12'
      />
    </svg>
  );
};
export default XIcon;
