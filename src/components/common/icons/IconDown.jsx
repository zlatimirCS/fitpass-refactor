const IconDown = ({ active }) => {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 42.8 35.2"
      width="20px"
      height="20px"
      className={`down-arrow ${active ? "active" : ""}`}
    >
      <polyline
        fill="none"
        stroke="#E34126"
        strokeWidth="3.8168"
        strokeLinecap="round"
        strokeMiterlimit={10}
        points="34.3,9.8 20.9,23.2 7.5,9.8 "
      />
    </svg>
  );
};
export default IconDown;
