import { Link } from 'react-router-dom';
import soundSpaceBG from '../assets/images/soundSpaceBG.jpg';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Footer from '../components/Footer';
import './HomePage.css';
import JobLogo from '../assets/images/homePage/Job.svg';
import UserLink from '../assets/images/homePage/User.svg';

export default function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <div className="homepage-container">
        <img src={soundSpaceBG} alt="soundSpace" />
        <h1>soundSpace</h1>
        {isLoggedIn ? (
          <div className="buttons-container">
            <button>
              <Link
                to={'/profile'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                PROFILE
              </Link>
            </button>
            <button>
              <Link
                to={'/jobs/all'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                ALL JOBS
              </Link>
            </button>
          </div>
        ) : (
          <div className="buttons-container">
            <button>
              <Link
                to={'/login'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                LOGIN
              </Link>
            </button>
            <button>
              <Link
                to={'/register'}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                REGISTER
              </Link>
            </button>
          </div>
        )}
      </div>
      <div className="aboutUs">
        <p>
          soundSpace is an innovative online platform designed to bring together
          individuals in the music industry, fostering a vibrant community that
          thrives on collaboration and connection.
        </p>
        <br></br>
        <p>
          Our platform serves as a dynamic hub where music professionals can
          easily post job opportunities, opening up avenues for talent discovery
          and career advancement.
        </p>
        <br></br>
        <p>
          With soundSpace, users can engage in meaningful discussions, share
          insights, and build valuable relationships with like-minded
          individuals, creating a supportive network within the music community.
        </p>
        <br></br>
        <p>
          We provide a user-friendly interface that enables seamless
          communication, empowering musicians, producers, and industry experts
          to collaborate on projects, exchange ideas, and unlock new
          opportunities.
        </p>
        <br></br>
        <p>
          Whether you are a seasoned professional or an emerging talent,
          soundSpace offers a dynamic space where you can showcase your skills,
          discover new talent, and forge connections that elevate your music
          career to new heights.
        </p>
      </div>
      <div className="link-section">
        <Link to="/jobs/all">
          <div className="link-card">
            <img src={JobLogo} />
            <p>Find your dream job with our job search feature!</p>
            <p>Explore thousands of job listings and apply with ease.</p>
            <p>
              Contact other users who have posted the jobs to learn more about
              the opportunities.
            </p>
          </div>
        </Link>
        <Link to="/profile">
          <div className="link-card">
            <img src={UserLink} />
            <p>Connect with other users to expand your professional network!</p>
            <p>Find mentors, collaborators, and opportunities to grow.</p>
            <p>
              Contact other users to discuss projects, ideas, or collaborations.
            </p>
          </div>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
