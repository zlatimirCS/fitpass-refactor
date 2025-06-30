import Image from 'next/image';

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
        <Image src={logo} alt='card' width={1200} height={1200} />
        <div className='card-inner-content'>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
