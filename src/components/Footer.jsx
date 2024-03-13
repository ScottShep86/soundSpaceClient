// import { Link } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-logo">
        {/* <Link style={{ color: 'white' }} to={'https://open.spotify.com/?'}>
          <FontAwesomeIcon icon={faSpotify} />
        </Link>
        <Link style={{ color: 'white' }} to={'https://www.instagram.com/'}>
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link style={{ color: 'white' }} to={'https://discord.com/'}>
          <FontAwesomeIcon icon={faDiscord} />{' '}
        </Link>
        <Link style={{ color: 'white' }} to={'https://www.facebook.com/'}>
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link style={{ color: 'white' }} to={'https://twitter.com/'}>
          <FontAwesomeIcon icon={faTwitter} />{' '}
        </Link> */}
      </div>
      <p>
        ©{currentYear} - soundSpace - Olivier Dewulf - Rui Melo - Scott Shepherd
      </p>
    </div>
  );
}
