import Image from 'next/image';

const BenefitCard = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) => {
  return (
    <article className='benefit-card'>
      <div className='benefit-card-text'>
        <p className='title'>{title}</p>
        <p className='subtitle'>{subtitle}</p>
      </div>

      <Image src={icon} alt={title} width={64} height={64} />
    </article>
  );
};
export default BenefitCard;
