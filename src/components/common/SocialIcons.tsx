// stylelint-disable-next-line
import '@fortawesome/fontawesome-free/css/all.min.css';

const SocialIcons = () => {
  return (
    <div className='social social-icons'>
      <a
        href='https://www.facebook.com/people/Fitpass-Montenegro/61562000383735/?mibextid=LQQJ4d&rdid=dQHo9FflTcgGoXRT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FDp2nfn2ajTfegHda%2F%3Fmibextid%3DLQQJ4d'
        target='_blank'
        className='fb'
      >
        <i className='fab fa-facebook-f'></i>
        {/* <FbIcon /> */}
      </a>
      <a
        href='https://www.instagram.com/fitpass.montenegro/?next=%2Ffitpass.srbija%2F'
        target='_blank'
        className='instagram'
      >
        <i className='fab fa-instagram'></i>
      </a>
      <a
        href='https://www.linkedin.com/company/fitpass-montenegro/about/?viewAsMember=true'
        target='_blank'
        className='linkedin'
      >
        <i className='fab fa-linkedin-in'></i>
      </a>
    </div>
  );
};
export default SocialIcons;
