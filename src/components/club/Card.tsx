const Card = ({
  data,
  setCurrentActiveCard,
}: {
  data: any;
  setCurrentActiveCard: any;
}) => {
  const logo = data?.imageUrl?.large || 'https://via.placeholder.com/150';
  const title = data?.title || '';
  return (
    <div
      className='explore-club-section__body__card'
      onClick={() => setCurrentActiveCard(data)}
    >
      <div className='card-inner'>
        <img src={logo} alt='card' />
        <div className='card-inner-content'>
          <p>{title}</p>
          {/* <Link href={url} target="_blank" style={{ width: "100%" }}>
            <button
              type="button"
              className="card-btn card-btn-form"
              style={{ width: "100%" }}
            >
              {t?.learnMore}
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
export default Card;
